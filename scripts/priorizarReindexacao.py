#!/usr/bin/env python3
"""Prioriza URLs para reindexação no GSC com base no mega export:
- URLs com impressões históricas que hoje respondem 301/404 (corrigir -> solicitar indexação da nova URL)
- URLs vivas com impressões (validar presença da página atual e priorizar)
Gera docs/prioridade-reindexacao.md com a lista ordenada."""
import csv, json, re
import subprocess
from urllib.parse import urlparse

def num(v):
    try:
        return float(str(v).replace(',', '.'))
    except ValueError:
        return 0.0

def check_url(url):
    try:
        r = subprocess.run(
            ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code} %{redirect_url}', '--max-time', '15', url],
            capture_output=True, text=True, timeout=20)
        out = r.stdout.strip().split()
        code = out[0] if out else '?'
        redir = out[1] if len(out) > 1 else ''
        return code, redir
    except Exception as e:
        return 'ERR', str(e)

rows = []
with open('/home/ubuntu/upload/Páginas.csv', newline='', encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        rows.append(r)

# URLs relevantes (com impressões significativas)
relevant = [r for r in rows if num(r['Impressões']) >= 30]
relevant.sort(key=lambda r: num(r['Impressões']), reverse=True)

out = []
for r in relevant:
    url = r['Páginas principais']
    code, redir = check_url(url)
    status = 'ok'
    target = ''
    if code == '200':
        status = 'viva'
    elif code == '301':
        status = '301→'
        target = redir
    elif code == '404':
        status = '404'
    out.append({
        'url': url,
        'imp': int(num(r['Impressões'])),
        'cli': int(num(r['Cliques'])),
        'posicao': float(r['Posição'].replace(',', '.')) if r['Posição'] else None,
        'status_http': code,
        'status': status,
        'redirect': target,
    })
    print(f"{int(num(r['Impressões'])):>5} imp  pos={r['Posição']:>6}  {code} {status} {target[:60]}  {url}")

with open('/home/ubuntu/ddd-brasil/docs/reindexacao-check.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

# Gerar markdown de prioridade
lines = [
    '# Prioridade de Reindexação — GSC',
    '',
    f'Baseado no mega export (1.000 páginas, {sum(int(num(r["Impressões"])) for r in rows):,} impressões).',
    '',
    '## Estratégia',
    '',
    '- URLs que hoje respondem 301: solicitar indexação da **nova URL destino** (o 301 transfere a autoridade automaticamente).',
    '- URLs 404 ainda vivas no GSC: solicitar remoção (URL Removal) se não houver destino.',
    '- URLs vivas (200): já otimizadas com tabs editoriais — apenas monitorar.',
    '- URLs com `uf` por extenso (/cidade/minas-gerais/...) e sem UF: redirecionadas para /cidade/{uf}/{slug}.',
    '',
    '## Lista prioritária (>=30 impressões)',
    '',
    '| Impressões | Posição | Status HTTP | Situação | URL |',
    '|---|---|---|---|---|',
]
for o in out:
    situacao = o['redirect'] if o['redirect'] else ('monitorar' if o['status'] == 'viva' else 'revisar')
    lines.append(f"| {o['imp']} | {o['posicao'] or '—'} | {o['status_http']} | {situacao} | {o['url']} |")

with open('/home/ubuntu/ddd-brasil/docs/prioridade-reindexacao.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')
print('\nListas salvas: docs/prioridade-reindexacao.md e docs/reindexacao-check.json')
