#!/usr/bin/env python3
"""Mapeia as URLs do mega export do GSC (Páginas.csv) que não têm
equivalente vivo no site atual e agrupa-as por padrão de URL legado,
com as respetivas métricas (impressões, cliques), para orientar os
redirects 301 a implementar em server/_core/seoRedirects.ts."""
import csv
import re
from collections import defaultdict

INPUT = "/home/ubuntu/upload/Páginas.csv"

rows = []
with open(INPUT, encoding="utf-8-sig") as f:
    reader = csv.reader(f, delimiter=",")
    header = next(reader)
    for row in reader:
        if not row or not row[0].strip():
            continue
        rows.append(row)

# Colunas típicas do mega export GSC pt-BR:
# URL, Cliques, Impressões, CTR, Posição
def parse_num(s):
    s = s.strip().replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0

patterns = defaultdict(lambda: {"urls": set(), "imps": 0.0, "clicks": 0.0})

for row in rows:
    url = row[0].strip()
    if not url.startswith("https://www.meuddd.com.br"):
        continue
    p = url[len("https://www.meuddd.com.br"):].split("?")[0]
    imps = parse_num(row[2]) if len(row) > 2 else 0
    clicks = parse_num(row[1]) if len(row) > 1 else 0

    m = None
    pattern = None
    if p == "/" or p == "":
        pattern = "HOME"
    elif m := re.match(r"^/ddd/(\d+)(?:/.*)?$", p):
        pattern = f"DDD code={m.group(1)}"
    elif m := re.match(r"^/cidade/([a-z]{2}|[a-z-]+)/([^/]+)(?:/.*)?$", p):
        pattern = f"CIDADE uf/city={m.group(1)}/{m.group(2)}"
    elif m := re.match(r"^/estado/([a-z]{2})(?:/.*)?$", p):
        pattern = f"ESTADO uf={m.group(1)}"
    elif re.match(r"^/regiao/", p):
        pattern = "REGIAO"
    elif re.match(r"^/blog/", p):
        segs = p.strip("/").split("/")
        if len(segs) >= 4 and segs[0] == "blog":
            base = f"blog/{segs[1]}/{segs[2]}/{{suffix}}"
            suffix = "/".join(segs[3:])
            # normalizar sufixo para padrões conhecidos
            if "plano-internet-barato" in suffix:
                suffix = "plano-internet-barato"
            elif "melhor-internet-fibra" in suffix:
                suffix = "melhor-internet-fibra"
            elif "plano-empresarial" in suffix:
                suffix = "plano-empresarial"
            else:
                suffix = f"outro:{suffix}"
            pattern = f"{base}/{suffix}"
        else:
            pattern = "BLOG-OUTRO"
    elif re.match(r"^/guia/", p):
        slug = p.strip("/").split("/")[-1]
        pattern = f"GUIA slug={slug}"
    elif re.match(r"^/gerador", p):
        pattern = "GERADOR"
    elif re.match(r"^/capitais", p):
        pattern = "CAPITAIS"
    elif re.match(r"^/api/", p):
        pattern = "API"
    else:
        pattern = f"OUTRO: {p[:80]}"

    patterns[pattern]["urls"].add(url)
    patterns[pattern]["imps"] += imps
    patterns[pattern]["clicks"] += clicks

# Ordenar por impressões desc
print(f"TOTAL páginas no export: {len(rows)}\n")
for pat, data in sorted(patterns.items(), key=lambda kv: -kv[1]["imps"]):
    top = sorted(data["urls"], reverse=True)[:3]
    print(f"PADRÃO: {pat}")
    print(f"  páginas: {len(data['urls'])} | impressões: {data['imps']:.0f} | cliques: {data['clicks']:.0f}")
    for u in top:
        print(f"    exemplo: {u}")
    print()
