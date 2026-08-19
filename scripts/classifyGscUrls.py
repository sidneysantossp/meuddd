#!/usr/bin/env python3
"""Classifica as URLs do mega export do GSC pelo comportamento atual
do site (viva 200, redirect 301, 404) e agrupa por padrão para
orientar novos redirects 301.
Requer: pycurl ou requests; usa requests com sessão keep-alive."""
import csv
import re
import sys
from collections import defaultdict

import requests

INPUT = "/home/ubuntu/upload/Páginas.csv"
SITE = "https://www.meuddd.com.br"

rows = []
with open(INPUT, encoding="utf-8-sig") as f:
    reader = csv.reader(f, delimiter=",")
    next(reader)
    for row in reader:
        if row and row[0].strip().startswith("https://www.meuddd.com.br"):
            rows.append(row)


def parse_num(s):
    try:
        return float(s.strip().replace(".", "").replace(",", "."))
    except ValueError:
        return 0.0


def classify(url):
    try:
        r = requests.get(url, timeout=15, allow_redirects=False)
        if r.status_code == 301 or r.status_code == 302:
            return "REDIRECT", r.headers.get("Location", "")
        if r.status_code == 200:
            # distinguir HTML vivo de fallback — se o body contém o title do NotFound é 404 do SSR
            title = re.search(r"<title>([^<]*)</title>", r.text)
            if title and ("não encontr" in title.group(1).lower()):
                return "SOFT404", ""
            return "VIVA", ""
        return f"HTTP{r.status_code}", ""
    except Exception as e:  # noqa: BLE001
        return f"ERR:{e.__class__.__name__}", ""


results = []
session = requests.Session()
old_get = session.get

errors = []
for i, row in enumerate(rows):
    url = row[0].strip()
    path = url[len(SITE):].split("?")[0]
    status, loc = classify(url)
    results.append((url, path, status, loc))
    if (i + 1) % 100 == 0:
        print(f"{i+1}/{len(rows)}", flush=True)

# Ajustar: classificar por padrão
groups = defaultdict(lambda: {"count": 0, "imps": 0.0, "by_status": defaultdict(int), "examples": []})
for url, path, status, loc in results:
    imps = parse_num("")
    # re-ler métricas
    key = (url,)
    # (simples: percorrer rows novamente pelo índice — usar dict)
groups = {}
res_by_url = {r[0]: r for r in results}

for row in rows:
    url = row[0].strip()
    imps = parse_num(row[2]) if len(row) > 2 else 0
    clicks = parse_num(row[1]) if len(row) > 1 else 0
    _, path, status, loc = res_by_url[url]
    if path.startswith("/blog/"):
        pat = "BLOG"
    elif re.match(r"^/cidade/([a-z]{2}|[a-z-]+)/[^/]+$", path):
        pat = "CIDADE_UF"
    elif re.match(r"^/cidade/[a-z-]+$", path):
        pat = "CIDADE_NOME"
    elif re.match(r"^/index.html$", path):
        pat = "INDEX_HTML"
    elif re.match(r"^/ddd/\d+$", path):
        pat = "DDD"
    elif re.match(r"^/estado/", path):
        pat = "ESTADO"
    elif re.match(r"^/guia/", path):
        pat = "GUIA"
    else:
        pat = "OUTRO"
    g = groups.setdefault(pat, {"count": 0, "imps": 0.0, "clicks": 0.0, "by_status": defaultdict(int), "examples": set()})
    g["count"] += 1
    g["imps"] += imps
    g["clicks"] += clicks
    g["by_status"][status] += 1
    if status != "VIVA":
        g["examples"].add(f"{status} {url}")

print(f"\n{'PADRÃO':<14} {'URLs':>5} {'Impressões':>11} {'Cliques':>8}  ESTADOS")
for pat, g in sorted(groups.items(), key=lambda kv: -kv[1]["imps"]):
    st = ", ".join(f"{s}={c}" for s, c in g["by_status"].items())
    print(f"{pat:<14} {g['count']:>5} {g['imps']:>11.0f} {g['clicks']:>8.0f}  {st}")

print("\nEXEMPLOS NÃO-VIVOS (até 30 por padrão):")
for pat, g in sorted(groups.items(), key=lambda kv: -kv[1]["imps"]):
    ex = sorted(g["examples"])
    print(f"\n## {pat} ({len(ex)} exemplos)")
    for e in ex[:30]:
        print(" ", e)
