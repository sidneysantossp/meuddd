# Análise de cobertura — lista de keywords do utilizador (13/08/2026)

Fonte: /home/ubuntu/upload/pasted_content.txt (99 keywords extraídas do ficheiro de 1345 linhas;
o cabeçalho refere 208.131 keywords / 5.935.460 volume total — a amostra visível cobre o topo).

## Classificação das 99 keywords (parser em /tmp/classify_kw.py)
| Categoria | N | Volume | KD médio |
|---|---|---|---|
| direta ("ddd 31") | 63 | 1.907.300 | 22 |
| reversa ("31 ddd") | 16 | 181.400 | 22 |
| qual estado ("ddd 31 qual estado") | 18 | 237.200 | 23 |
| operadora ("ddd claro", "ddd vivo") | 2 | 32.900 | 42 |
| **Total amostra** | **99** | **2.358.800** | — |

Top: ddd 31 (74k), ddd 81 (74k), ddd 19/41/51/61/62 (60,5k), ddd 21/47/71/85/91 (49,5k).
Palavra isolada "ddd" (vol 40.500, KD 35) — aparece uma vez no ficheiro mas fora do padrão parseado.

## Cobertura atual do site (verificada)
- /ddd/NN existe para todos os 67 códigos → cobre "direta" e "reversa" (mesma página responde ambas as intenções; URL canónica única).
- H1 do /ddd/31 = "DDD 31: 139 cidades atendidas" — o estado NÃO aparece no H1!
- "qual estado": o FAQ buildDddFaq tem pergunta "Como descobrir em qual cidade está o DDD 11?" mas NÃO "qual estado" literal (grep 0 no SSR) — resposta no texto existe mas não otimizada para a keyword exata.
- Operadora: FAQ inclui "Um número com DDD 11 pertence a qual operadora?" → cobertura parcial; mas não há página "ddd claro/vivo" dedicada.
- Home: title "Meu DDD — Consulte DDDs de todo o Brasil" — keyword "ddd" isolada parcialmente coberta.

## Lacunas identificadas
1. Estado ausente do H1/URL das páginas DDD — concorrentes rankeiam "ddd 31 qual estado" com títulos como "DDD 31: Qual estado? | Guia". 
2. Keyword reversa "31 ddd" — mesma página, OK, mas título não contém variação.
3. Operadoras: KD alto (38-45); sem página dedicada para "ddd claro"/"ddd vivo".
4. Intenção de cidade ("qual ddd de X") e cidade+ddd não aparecem nesta lista específica, mas são o core do site (5.570 cidades).
5. Conteúdo curto nas páginas DDD vs volume: 63 keywords diretas com ~1,9M volume — conteúdo editorial atual do DDD é o menor do cluster (cidade/estado têm tabs).

## Recomendações priorizadas
A. Incluir o nome do estado no H1, título e meta das páginas /ddd/NN (ex.: "DDD 31: Minas Gerais — 139 cidades").
B. Adicionar pergunta explícita "Qual estado é o DDD X?" no buildDddFaq (18 keywords, 237k vol, KD 23).
C. Página "Operadoras por DDD" ou seção dedicada + schema FAQ responde "ddd claro/vivo" (KD alto, mais difícil).
D. Conteúdo editorial nas páginas DDD de maior volume (63 de maior vol) — tabs como nas cidades.
E. Manter canonical única /ddd/NN para absorver "direta" e "reversa".

## Estado do todo.md
- Itens pendentes restantes do todo: geração em massa 5.570 cidades (14/08 06:00 BRT) e ilustrações do blog (quota imagem).
- Último checkpoint: 4c2a57f1 (chevron FAQ). GitHub: main → 4c2a57f.

---

# Análise 2 — Keywords de perguntas (13/08/2026)

Fonte: /home/ubuntu/upload/pasted_content_2.txt (98 keywords extraídas; cabeçalho: 36.192 palavras, 388.740 vol, KD 19).

| Cluster | N | Volume | KD médio |
|---|---|---|---|
| definição ("o que é ddd", "significado", "qual é o ddd de são paulo"*) | 25 | 41.060 | 26 |
| operadora (claro/vivo/tim) | 15 | 37.940 | 35 |
| qual ddd de (estado/cidade) | 30 | 37.510 | 21 |
| ddd de onde ("o ddd 31 é de onde", "onde fica o ddd 51") | 18 | 20.530 | 16 |
| internacional ("estados unidos", "portugal", "do brasil") | 7 | 5.800 | 24 |
| como ligar | 3 | 5.390 | 27 |

*Nota: "qual é o ddd de são paulo" classifica-se entre definição por "qual é o ddd" mas a intenção real é "qual o DDD de SP".

## Cobertura atual verificada
- Guia /guia/o-que-e-ddd: title "O que é DDD? Entenda os códigos de área do Brasil | Meu DDD", H1 "O que é DDD" → cobre cluster definição.
- "qual ddd de são paulo/rio/minas": a busca do site resolve texto→cidade→DDD; página /estado/sp cobre; mas NÃO há artigo específico "Qual o DDD de São Paulo".
- "o ddd 31 é de onde" / "onde fica o ddd 51": responde pelo H1 das páginas DDD (após correção Lacuna A) + FAQ "Como descobrir em qual cidade está o DDD 11?".
- Operadoras: sem página dedicada (Lacuna C do relatório anterior).
- Internacional: sem conteúdo dedicado (EUA/Portugal; DDI já coberto pelo guia DDD vs DDI? verificar).
- "como ligar para outro ddd": guia existente "Como ligar para outro estado: DDD e número de destino" (/guia/como-ligar-para-outro-estado) cobre.

## Lacunas desta lista
1. "qual é o ddd de são paulo/rio/minas/bahia/SC" (~20k/mês, KD 20-30): falta artigos/landing específicas por estado com essa keyword exata no H1/title — hoje só resolve via busca. Custo baixo: criar seções otimizadas por estado ou 10 artigos "Qual o DDD de X".
2. Operadoras 37.940 vol (KD 35): guia "ddd de claro/vivo/tim" (Lacuna C anterior, agora confirmada pelo volume).
3. "qual o ddd do brasil/dos estados unidos/portugal" (5.800 vol): falta artigo DDI básico ou tabela de códigos internacionais (ex.: Brasil 55, EUA/Canadá +1).
4. Estados no H1 das páginas DDD (Lacuna A): agora confirmada também pelas queries "o ddd 31 é de onde" (KD 16, fácil!).

---

# Estado técnico — implementação do plano consolidado (iniciado 13/08 noite)

## DddDetail.tsx (chave para a fase 1)
- Linhas 13-116: `PRIORITY_DDD_EDITORIAL: Record<ddd, {state, uf, title, summary, curiosity}>` — cobre 16 DDDs (63,96,82,68,86,27,61,94,28,93,64,83,87,53,79...).
- Linha 178: `const faqs = buildDddFaq({ dddCode: data.code, cityCount: data.cityCount, stateNames: states.map(s => s.name) })`
- Linha 209: `<FaqSection id="faq-ddd-{code}" heading="Perguntas frequentes" subheading="Sobre o DDD {code}" faqs={faqs} />`
- H1 atual: aparece antes da linha 178 (secção hero com código + "DDD NN: {cityCount} cidades atendidas"). A renderização usa SSR; title/meta vêm do prefetch.ts (bloqueos DDD).
- `states` vem de `data` (byCode retorna {municipalities, states}) — cada estado tem name, uf.

## Fase 1 — plano de edição
1. DddDetail: H1 novo = "DDD {code} é de qual estado? {state.name} — {cityCount} municípios" (usar states[0].name como estado principal; lista curta "e {n} outros" quando multi-estado).
2. prefetch.ts: bloco DDD — title/meta "DDD {code}: qual estado? Cidades de {estado} — {n} municípios | Meu DDD".
3. buildDddFaq (shared/territorialFaq.ts): adicionar pergunta "Qual estado é o DDD {code}?" (resposta: estado(s) atendidos) — 11ª pergunta.
4. Erro transiente de log às 02:35 (Failed query listStateSummaries) — rotas respondem 200; sem ação necessária.

## Fases seguintes
- Fase 2 (StatePage): adicionar <h2> "Qual é o DDD de {estado}?" com parágrafo-resposta (lista dos DDDs do estado com links /ddd/NN).
- Fase 3 (guias): adicionar 2 entradas ao catálogo editorial (shared/editorialGuides?): qual-o-ddd-da-claro-vivo-e-tim (guia desambiguação operadora) e codigos-internacionais-ddi (tabela +55/+1/+351). Seguir o padrão dos 19 guias existentes (Article JSON-LD no prefetch, hero image via editorialGuideImages, links internos aos hubs).
- Validação: pnpm test (86/86), tsc, curl SSR /ddd/31 e /estado/sp, screenshot.

---

# Estado — 14/08/2026 (pedido sequencial de relanço das tabs em massa)

## Fase 2 do plano de keywords (H2 estado) — FEITA, faltava validar SSR
- StatePage.tsx: nova seção "Qual é o DDD de {estado}?" (H2 #ddd-de-{uf}-h2, parágrafo-resposta com lista dos DDDs, pills de links /ddd/NN) inserida após TerritoryQuickAnswer.
- Falta: curl SSR /estado/sp "Qual é o DDD de São Paulo?", pnpm test, screenshot, depois checkpoint+github.

## Fases 3 do plano de keywords (guias Claro/Vivo/TIM e DDI) — PENDENTES
- Falta criar 2 guias editoriais no catálogo (ver padrão dos 19 em shared/editorialGuides ou similar; Article JSON-LD no prefetch.ts bloco guia; hero /assets/ se disponível; links internos aos hubs DDD/estado).
- Slugs propostos: qual-o-ddd-da-claro-vivo-e-tim e codigos-internacionais-ddi.

## Pedido do utilizador (14/08): relanço em massa sequencial das tabs editoriais
Comando pedido:
```
cd /home/ubuntu/ddd-brasil && for uf in ac al ap am ba ce df es go ma mt ms mg pa pb pr pe pi rj rn rs ro rr sc sp se to; do pnpm tsx scripts/generateTabs.mts --uf=$uf --only-empty >> .generated/tabs/$uf.main.log 2>&1; done
```
Monitorizar: `grep -c OK .generated/tabs/*.main.log` e re-tentar UFs com falhas (ex.: grep -i "usage exhausted\|error" .generated/tabs/*.main.log).
Depois: `pnpm tsx scripts/integrateTabs.mts`, `pnpm format`, `pnpm test` (80+), tsc sem erros, screenshot /cidade/ac/cruzeiro-do-sul (4 tabs + cartão cidade→estado), webdev_save_checkpoint (descrever conclusão do lote), git push github main.
Diretório de logs: .generated/tabs/*.main.log.
Estado prévio: piloto AC integrado; scripts/generateTabs.mts (CONC=3, --uf/--limit/--only-empty, json_schema strict) e scripts/integrateTabs.mts existem.
Auto-publish ATIVADO: checkpoint salva = publica.

## Itens pendentes no todo.md (plano keywords)
- [x] H1/title/meta DDD + FAQ "qual estado" (validado SSR /ddd/31: title "DDD 31 é de qual estado? Minas Gerais — 139 cidades | Meu DDD", FAQPage 11 perguntas)
- [ ] H2 "Qual é o DDD de X?" nas 27 páginas de estado (feito no código, falta validar SSR + checkpoint)
- [ ] Guia Claro/Vivo/TIM com FAQPage
- [ ] Guia códigos internacionais DDI com tabela e FAQPage

---

# Estado — 14/08/2026 02:55 (plano de keywords quase concluído)

## Feito e VALIDADO
- Fase 1: H1/title/meta DDD com estado ("DDD 31 é de qual estado? Minas Gerais — 139 cidades | Meu DDD") no prefetch.ts (linhas dddTitle/dddDesc/dddTitle) + FAQ 11ª pergunta "Qual estado é o DDD X?" no buildDddFaq — validado SSR /ddd/31.
- Fase 2: H2 "Qual é o DDD de {estado}?" (id ddd-de-{uf}-h2) + pills /ddd/NN na StatePage após TerritoryQuickAnswer — validado SSR /estado/sp.
- Fase 3: Guias novos em shared/newGuides.ts ("qual-o-ddd-da-claro-vivo-e-tim" e "codigos-internacionais-ddi"), push no catálogo em editorialGuides.ts (linha 536-538, import no topo), FAQPage JSON-LD para guias no prefetch.ts linha 77 (spread `...(guide.faqs && guide.faqs.length ? [faqPageJsonLd(guide.faqs)] : [])]`). VALIDADO: SSR dos 2 guias com 4 blocos JSON-LD (BreadcrumbList, Article, FAQPage 10 perguntas) + 86 testes verdes + tsc 0 erros.
- Falta nesta fase 2: screenshot /guia/qual-o-ddd-da-claro-vivo-e-tim, checkpoint webdev_save_checkpoint (descrever plano de keywords), git add/push github main.

## Depois: relanço sequencial das tabs (pedido do utilizador, agora com prioridade após keywords)
Comando:
cd /home/ubuntu/ddd-brasil && for uf in ac al ap am ba ce df es go ma mt ms mg pa pb pr pe pi rj rn rs ro rr sc sp se to; do pnpm tsx scripts/generateTabs.mts --uf=$uf --only-empty >> .generated/tabs/$uf.main.log 2>&1; done
Monitorizar: grep -c OK .generated/tabs/*.main.log; re-tentar UFs com falhas (grep -i "usage exhausted\|error" .generated/tabs/*.main.log).
Depois: pnpm tsx scripts/integrateTabs.mts; pnpm format; pnpm test (86+); tsc; screenshot /cidade/ac/cruzeiro-do-sul (4 tabs + cartão cidade→estado); checkpoint + git push github main.
Logs: .generated/tabs/*.main.log. Piloto AC já integrado antes.
Auto-publish ATIVADO.

## Estado do lote de tabs em massa — 14/08 02:58 UTC
- Plano de keywords CONCLUÍDO e publicado: checkpoint 57e51fa4, GitHub github/main sincronizado, commit 57e51fa.
- Lote sequencial 27 UFs (nohup, session tabs-batch, PID 63691): relançado às 02:54 UTC conforme pedido do utilizador (relançar geração em massa).
- PROBLEMA: quota LLM ainda esgotada ("your account has hit a usage exhausted" 412). Run AC de hoje: 0 geradas, 22 falhas. AC tinha apenas ~3-4 fichas OK reais de 13/08 (o reset do sandbox apagou os JSONs; os logs .log sobreviveram, o script resilient usa logs p/ dedup).
- Criei scripts/generateTabsResilient.mts: por-UF, respeita .generated/tabs/{uf}.json + logs de OK (dedup loadDone), CONC=3, espera 5 min quando 412 (MAX_QUOTA_WAITS=12), retries 4x/município. Usa mysql2/promise como o original (camelCase).
- PRÓXIMO PASSO: aguardar quota repor (meia-noite UTC? ou agendada 06:00 BRT = 09:00 UTC) e relançar o lote com o script resiliente: for uf em ac al ap am ba ce df es go ma mt ms mg pa pb pr pe pi rj rn rs ro rr sc sp se to; do pnpm tsx scripts/generateTabsResilient.mts --uf=$uf; done. Depois: pnpm tsx scripts/integrateTabs.mts, pnpm format, pnpm test, screenshot /cidade/ac/cruzeiro-do-sul (4 tabs + cartão cidade->estado), checkpoint + push github.
- Monitor: grep -c OK .generated/tabs/*.log e python3 contar JSONs ({uf}.json é dict).
- Logs: .generated/tabs/{uf}.log (formato: ISO FAIL AC:capixaba: ... ou OK AC:capixaba).
