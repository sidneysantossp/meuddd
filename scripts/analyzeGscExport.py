#!/usr/bin/env python3
"""Analisa o mega export do Search Console (Páginas.csv e Consultas.csv)
para priorizar ações de SEO e propor reindexação."""
import csv, json, re
from collections import Counter

def read_csv(path):
    rows = []
    with open(path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=',')
        for r in reader:
            rows.append(r)
    return rows

paginas = read_csv('/home/ubuntu/upload/Páginas.csv')
consultas = read_csv('/home/ubuntu/upload/Consultas.csv')

print(f"Páginas: {len(paginas)} | Consultas: {len(consultas)}")
print(f"Colunas páginas: {list(paginas[0].keys()) if paginas else 'vazio'}")
print(f"Colunas consultas: {list(consultas[0].keys()) if consultas else 'vazio'}")

# Top páginas por impressões
def num(v):
    try:
        return float(str(v).replace(',', '.'))
    except ValueError:
        return 0.0

key_page = next((k for k in paginas[0].keys() if 'ágina' in k or 'Página' in k or 'URL' in k or 'uery' in k or 'Consulta' in k), None)
impr_col = next((k for k in paginas[0].keys() if 'mpress' in k), None)
click_col = next((k for k in paginas[0].keys() if 'lique' in k or 'ick' in k.lower()), None)
ctr_col = next((k for k in paginas[0].keys() if 'CTR' in k), None)
print(f"Colunas usadas: página={key_page} impressões={impr_col} cliques={click_col} ctr={ctr_col}")

top = sorted(paginas, key=lambda r: num(r[impr_col]), reverse=True)[:40]
print("\n== TOP 40 PÁGINAS POR IMPRESSÕES ==")
for r in top:
    print(f"{int(num(r[impr_col])):>8} imp  {int(num(r[click_col])):>6} cli  ctr={num(r[ctr_col])*100:>5.1f}%  {r[key_page]}")

# Distribuição por seção
sections = Counter()
for r in paginas:
    url = r[key_page]
    m = re.match(r'https?://[^/]+(/[^?]*)', url)
    path = (m.group(1) if m else url).rstrip('/')
    if path == '':
        sec = '/'
    else:
        parts = path.split('/')
        sec = '/' + parts[1] if len(parts) > 1 else path
    sections[sec] += num(r[impr_col])

print("\n== IMPRESSÕES POR SEÇÃO ==")
for sec, total in sections.most_common(20):
    print(f"{int(total):>10} imp  {sec}")

# Consultas: ranking e volume
q_col = next((k for k in consultas[0].keys() if 'onsulta' in k or 'uery' in k or k.strip().startswith('Q')), None)
print(f"\nColuna consulta: {q_col}")
top_q = sorted(consultas, key=lambda r: num(r.get(impr_col, 0)), reverse=True)[:50]
print("== TOP 50 CONSULTAS ==")
for r in top_q:
    print(f"{int(num(r.get(impr_col,0))):>7} imp  {int(num(r.get(click_col,0))):>5} cli  {r.get(q_col,'')[:60]}")

# Guardar resumo
resumo = {
    'n_paginas': len(paginas),
    'n_consultas': len(consultas),
    'top_paginas': [{'url': r[key_page], 'imp': int(num(r[impr_col])), 'clicks': int(num(r[click_col])), 'ctr': round(num(r[ctr_col])*100, 2)} for r in top],
    'secoes': {k: int(v) for k, v in sections.most_common()},
    'top_consultas': [{'q': r.get(q_col, ''), 'imp': int(num(r.get(impr_col, 0))), 'clicks': int(num(r.get(click_col, 0)))} for r in top_q],
}
with open('/home/ubuntu/ddd-brasil/docs/gsc-megaexport-analise.json', 'w', encoding='utf-8') as f:
    json.dump(resumo, f, ensure_ascii=False, indent=2)
print("\nResumo guardado em docs/gsc-megaexport-analise.json")
