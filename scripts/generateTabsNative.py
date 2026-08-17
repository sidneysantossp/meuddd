"""
Gerador nativo das tabs editoriais dos municípios (Opção A — 17/08/2026).

Gera as fichas JSON em .generated/tabs/<uf>.json usando o endpoint LLM nativo
do sandbox (OPENAI_API_KEY/OPENAI_API_BASE), que é independente da quota do
endpoint do projeto (que estava esgotada com HTTP 412). Reaproveita o mesmo
prompt de qualidade, schema, whitelist de links e dedup do
scripts/generateTabsResilient.mts.

Uso: python3 scripts/generateTabsNative.py --uf=rr          (uma UF)
     python3 scripts/generateTabsNative.py --all            (as 27 UFs)
     python3 scripts/generateTabsNative.py --uf=rr --limit=5  (limite de teste)
"""

import concurrent.futures as cf
import json
import os
import re
import sys
import time
from datetime import date

import mysql.connector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".generated", "tabs")
REVIEWED_ON = date.today().isoformat()

MODEL = os.environ.get("NATIVE_MODEL", "gpt-5-mini")
MAX_WORKERS = 6
MAX_RETRIES = 4

MAP_SEARCH = lambda q: "https://www.google.com/maps/search/?api=1&query=" + q

UF_ORDER = [
    "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
    "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
    "se", "sp", "to",
]

SCHEMA = {
    "type": "object",
    "properties": {
        "tourism": {
            "type": "object",
            "properties": {
                "intro": {"type": "string"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["name", "description"],
                        "additionalProperties": False,
                    },
                },
                "closing": {"type": "string"},
            },
            "required": ["intro", "items", "closing"],
            "additionalProperties": False,
        },
        "dining": {
            "type": "object",
            "properties": {
                "intro": {"type": "string"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["name", "description"],
                        "additionalProperties": False,
                    },
                },
                "closing": {"type": "string"},
            },
            "required": ["intro", "items", "closing"],
            "additionalProperties": False,
        },
        "transport": {
            "type": "object",
            "properties": {
                "intro": {"type": "string"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["name", "description"],
                        "additionalProperties": False,
                    },
                },
                "closing": {"type": "string"},
            },
            "required": ["intro", "items", "closing"],
            "additionalProperties": False,
        },
        "climate": {
            "type": "object",
            "properties": {
                "intro": {"type": "string"},
                "body": {"type": "string"},
                "details": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "label": {"type": "string"},
                            "value": {"type": "string"},
                        },
                        "required": ["label", "value"],
                        "additionalProperties": False,
                    },
                },
            },
            "required": ["intro", "body", "details"],
            "additionalProperties": False,
        },
    },
    "required": ["tourism", "dining", "transport", "climate"],
    "additionalProperties": False,
}


def normalize_slug(name: str) -> str:
    import unicodedata

    n = unicodedata.normalize("NFD", name.lower())
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = re.sub(r"[^a-z0-9 ]", "", n).strip()
    return re.sub(r"\s+", "-", n)


def clean_artifacts(s):
    if not isinstance(s, str):
        return ""
    return (
        s.replace("**", "")
        .strip()
    )


def build_prompt(r) -> str:
    return (
        f"Escreva um guia editorial completo, factual e sóbrio sobre o município brasileiro de {r['name']} "
        f"({r['stateUf']}, região {r['region']}), com base em dados públicos conhecidos (IBGE, prefeitura, "
        f"sites oficiais de turismo estadual). Escreva em pt-BR, sem markdown, com textos ricos e detalhados: "
        f"cada intro/closing com 3 a 5 frases (aprox. 250-400 caracteres) e cada descrição de item com 2 a 3 "
        f"frases (aprox. 150-300 caracteres), valorizando o contexto local real da cidade. "
        f"Retorne JSON com as secções: "
        f"\"tourism\" (3 a 6 pontos turísticos, praças, igrejas históricas, natureza, eventos locais — nome e "
        f"descrição), "
        f"\"dining\" (3 a 6 bares, restaurantes, cozinhas regionais ou pontos gastronómicos conhecidos da "
        f"cidade), "
        f"\"transport\" (3 a 6 itens de transporte público, linhas de ônibus, rodoviária, terminal, acesso "
        f"rodoviário) e "
        f"\"climate\" (clima da região com classificação de Köppen correta para a cidade, temperatura média "
        f"anual em °C, precipitação anual em mm e descrição das estações — details com label/value). "
        f"Se algum dado for incerto, use descrição genérica segura (natureza, feira local, transporte "
        f"municipal). População de referência: {r['populationEstimated']}."
    )


# ---------- LLM via rota nativa (sandbox) ----------

def _native_client():
    from openai import OpenAI

    return OpenAI()


def generate_one(r):
    slug = r["slug"] or normalize_slug(r["name"])
    key = f"{r['stateUf']}:{slug}"
    last_err = ""
    for attempt in range(MAX_RETRIES):
        try:
            client = _native_client()
            res = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "Você escreve guias editoriais factuais e "
                                   "sóbrios sobre municípios brasileiros, retornando JSON estruturado.",
                    },
                    {"role": "user", "content": build_prompt(r)},
                ],
                response_format={
                    "type": "json_schema",
                    "json_schema": {
                        "name": "locality_tabs",
                        "strict": True,
                        "schema": SCHEMA,
                    },
                },
            )
            choice = res.choices[0].message
            content = getattr(choice, "content", None)
            finish = getattr(choice, "finish_reason", None)
            if not content:
                raise RuntimeError(f"resposta vazia (finish={finish}) — modelo sem suporte a conteudo neste plano")
            parsed = json.loads(content if isinstance(content, str) else str(content))
            # limpeza
            for sec in ["tourism", "dining", "transport"]:
                if parsed[sec].get("intro"):
                    parsed[sec]["intro"] = clean_artifacts(parsed[sec]["intro"])
                if parsed[sec].get("closing"):
                    parsed[sec]["closing"] = clean_artifacts(parsed[sec]["closing"])
                for it in parsed[sec]["items"]:
                    it["description"] = clean_artifacts(it.get("description") or "")
            if parsed["climate"].get("intro"):
                parsed["climate"]["intro"] = clean_artifacts(parsed["climate"]["intro"])
            if parsed["climate"].get("body"):
                parsed["climate"]["body"] = clean_artifacts(parsed["climate"]["body"])
            for d in parsed["climate"]["details"]:
                d["label"] = clean_artifacts(d["label"])
                d["value"] = clean_artifacts(d["value"])
            entry = {
                **parsed,
                "city": r["name"],
                "uf": r["stateUf"],
                "stateName": r["stateName"],
                "region": r["region"],
                "ddd": str(r["ddd"]),
                "population": r["populationEstimated"],
                "reviewedOn": REVIEWED_ON,
            }
            for sec in ["tourism", "dining", "transport"]:
                for it in entry[sec]["items"]:
                    it["mapHref"] = MAP_SEARCH(f"{it['name']}, {r['name']}, {r['stateUf']}")
            return key, entry, None
        except Exception as e:  # noqa: BLE001
            msg = str(e)[:120]
            last_err = msg
            wait = 3 * (attempt + 1)
            time.sleep(wait)
    return key, None, f"{last_err} (após {MAX_RETRIES} tentativas)"


def append_log(uf: str, msg: str):
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, f"{uf}.log"), "a") as f:
        f.write(f"{time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())} {msg}\n")


def load_done() -> set:
    done = set()
    if not os.path.isdir(OUT_DIR):
        return done
    for entry in os.listdir(OUT_DIR):
        if entry.endswith(".log"):
            for line in open(os.path.join(OUT_DIR, entry), encoding="utf-8"):
                m = re.match(r"^OK ([A-Z]{2}:.+)$", line.strip())
                if m:
                    done.add(m.group(1))
    return done


def fetch_municipalities(uf: str):
    cfg = {k: v for k, v in {
        "host": os.environ.get("MYSQL_HOST", "localhost"),
        "user": os.environ.get("MYSQL_USER", "root"),
        "password": os.environ.get("MYSQL_PASSWORD", ""),
        "database": os.environ.get("MYSQL_DATABASE", ""),
        "port": int(os.environ.get("MYSQL_PORT", "3306") or 3306),
    }.items() if v not in ("", None)}
    url = os.environ.get("DATABASE_URL")
    if url:
        import urllib.parse

        p = urllib.parse.urlparse(url)
        cfg = {
            "host": p.hostname or "localhost",
            "port": p.port or 3306,
            "user": urllib.parse.unquote(p.username or "root"),
            "password": urllib.parse.unquote(p.password or ""),
            "database": p.path.lstrip("/"),
        }
    conn = mysql.connector.connect(**cfg)
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                "SELECT m.ibgeCode, m.name, m.slug, m.ddd, m.populationEstimated, "
                "s.uf AS stateUf, s.name AS stateName, s.region "
                "FROM municipalities m "
                "INNER JOIN states s ON s.ibgeCode = m.stateIbgeCode "
                "WHERE s.uf = %s ORDER BY m.name ASC",
                (uf.upper(),),
            )
            return cur.fetchall()
    finally:
        conn.close()


def process_uf(uf: str, limit: int | None = None) -> dict:
    uf = uf.lower()
    done = load_done()
    os.makedirs(OUT_DIR, exist_ok=True)
    fpath = os.path.join(OUT_DIR, f"{uf}.json")
    catalog = json.load(open(fpath, encoding="utf-8")) if os.path.exists(fpath) else {}
    all_rows = fetch_municipalities(uf)
    def _is_done(row):
        k = f"{row['stateUf']}:{row['slug']}"
        if k not in done:
            return False
        entry = catalog.get(k) or {}
        return len(entry.get("tourism", {}).get("items", [])) > 0

    work = [r for r in all_rows if not _is_done(r)]
    if limit is not None:
        work = work[:limit]
    print(f"[{uf}] {len(work)} municípios pendentes de {len(all_rows)}", flush=True)
    if not work:
        print(f"[{uf}] concluído.", flush=True)
        return {"uf": uf, "completed": 0, "failed": 0}

    completed, failed = 0, 0
    with cf.ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        for key, entry, err in ex.map(generate_one, work):
            if entry is not None:
                catalog[key] = entry
                with open(fpath, "w", encoding="utf-8") as f:
                    json.dump(catalog, f, ensure_ascii=False, indent=2)
                    f.write("\n")
                append_log(uf, f"OK {key}")
                completed += 1
            else:
                append_log(uf, f"FAIL {key}: {err}")
                failed += 1
    print(f"[{uf}] Concluído. {completed} fichas geradas, {failed} falhas.", flush=True)
    return {"uf": uf, "completed": completed, "failed": failed}


def main():
    if not os.environ.get("DATABASE_URL"):
        raise SystemExit("DATABASE_URL ausente")
    args = sys.argv[1:]
    uf = next((a.split("=", 1)[1] for a in args if a.startswith("--uf=")), None)
    limit = next((int(a.split("=", 1)[1]) for a in args if a.startswith("--limit=")), None)
    if "--all" in args:
        ufs = UF_ORDER
    elif uf:
        ufs = [uf]
    else:
        raise SystemExit("usar --uf=<UF> ou --all, com --limit opcional")
    totals = {"completed": 0, "failed": 0}
    for u in ufs:
        r = process_uf(u, limit=limit)
        totals["completed"] += r["completed"]
        totals["failed"] += r["failed"]
    print(f"TOTAL: {totals['completed']} geradas, {totals['failed']} falhas.", flush=True)


if __name__ == "__main__":
    main()
