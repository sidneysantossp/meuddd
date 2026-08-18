# Estado da geração regionalizada — 18/08/2026

## Contexto da tarefa atual (pedido do utilizador)
- Geração das 5.570 fichas editoriais com escrita HUMANIZADA e REGIONALIZADA,
  sem padrão de IA: cada ficha com sotaque, gírias e costumes da região/estado.
- LLM SEM CRÉDITOS (tanto BUILT_IN_FORGE_API — 412 "usage exhausted" — como
  rota nativa sandbox OPENAI_API_BASE — "Insufficient credits", HTTP 412/403).
- Solução acordada: motor editorial determinístico (Python) com perfis de voz
  regional + dados reais da DB.

## Formato da ficha JSON (em .generated/tabs/<uf>.json)
- Chave: "UF:slug" (ex.: "AL:penedo"). Value = objeto MunicipalityTabs:
  - tourism: {intro:str, items:[{name, description, mapHref}], closing}
  - dining:  {intro:str, items:[{name, description, kind?, mapHref}], closing}
  - transport:{intro:str, items:[{name, description, kind?, mapHref}], closing}
  - climate: {intro:str, body:str, details:[{label,value}], source?:{label,href}}
  - city, uf, stateName, region, ddd(str), population(int|null), reviewedOn(str ISO)
- MAP_SEARCH: "https://www.google.com/maps/search/?api=1&query=" + q
- integrateTabs.mts: lê .generated/tabs/<uf>.json, adiciona
  climate.source = Climate-Data.org via OFFICIAL_URLS.climateData(uf, slug),
  aplica sanitizeExternalLinks (whitelist gov.br, maps, climate-data.org),
  escreve shared/localityTabs/<uf>.ts com header "// @ts-nocheck ... catalog: Record<string, MunicipalityTabs>".
- UFS lista em integrateTabs.mts: ac,al,ap,am,ba,ce,df,es,go,ma,mt,ms,mg,pa,pb,pr,pe,pi,rj,rn,rs,ro,rr,sc,sp,se,to
- DB: tabela municipalities (ibgeCode, name, slug, ddd, populationEstimated, stateIbgeCode, latitude, longitude); states (uf, name, region). DATABASE_URL em env.
- Testes: 99 (server/_core/seoRedirects.test.ts 13 casos). Build: pnpm build.
- Dedup do lote resiliente: .generated/tabs/<uf>.log com linhas "OK UF:slug";
  catálogo mantido ao processar (não sobrescreve fichas LLM existentes de RR/AL/AC etc.).

## Progresso da fase 1 (em curso)
- scripts/vozes/regionais.py: PERFIS[UF] completo para as 27 UFs (gírias,
  costumes, tratamento, marcas_orais, fechos, regiao) + load_perfil(uf).
  PRONTO.
- PRONTO PARA FASE 2: engine em scripts/vozes/engine.py:
  - sorteio determinístico (hash city slug) de aberturas/transições/finalizações
  - clima Köppen por zona lat/lng (tabela determinística por faixa lat/lng)
  - gerador de pontos locais parametrizados (praça central, igreja matriz,
    feira municipal, rodoviária, mercado público, rio/lago regional, etc.)
    com nomes genéricos-verificáveis + links MAPS
  - rotação de estruturas anti-padrão entre municípios vizinhos
- Depois: gerar 27 UFs, integrateTabs.mts, pnpm test + build, checkpoint.

## Fase 3 (concluída a 18/08)
- Lote massivo OK: TOTAL 5.460 fichas novas geradas + fichas LLM existentes = 5.571 fichas (todas as UFs com cobertura total).
- Logs: logs/batch_vozes.log.

## PROBLEMAS DETETADOS na validação de amostras (fase 3 -> fase 4):
1. pr.json contém fichas LLM antigas com texto encodado errado ("histf3ria", "vere3os") — Curitiba e possivelmente outras fichas PR pré-existentes do lote LLM corrompido. Preciso REGERAR essas fichas PR (o engine respeita fichas existentes; remover as fichas PR defeituosas do JSON antes de reexecutar).
2. Clima de Feira de Santana (BA, -12.26,-38.96) => BSh semiárido — CORRETO (sertão da BA).
3. Clima de Niterói (RJ, -22.88,-43.10) => "tropical de altitude interiorano" — ERRADO: deveria ser "tropical úmido de litoral". A regra Sudeste litoral exige lng >= -49.5 (ok) e -26.0<lat<=-23.5 — mas lat de Niterói é -22.88, fora da faixa! A faixa RJ é até -23.5 mas Niterói/RJ capital (-22.9) e todo RJ está entre -20.7 e -23.4. CORRIGIR: regra sudeste litoral deve cobrir lat até -20.5 e lng >= -44.5.
4. Clima de Curitiba (-25.43,-49.27) => subtropical Cfa ok (na faixa Sul -23.5<lat e lng<-49.5; Curitiba lng -49.27 > -49.5 e lat -25.43 <=-23.5 — na verdade foi para a regra sudeste litoral? não: -26<lat<=-23.5 e lng>=-49.5 => -49.27 >= -49.5 verdadeiro => daria 'tropical úmido de litoral' se a lat <=-26? Não. lat -25.43 está em -26.0<lat<=-23.5 => cai na regra litoral sudeste. ERRADO — deveria ser Cfa. CORRIGIR limite: a regra Sul deve ser lat <= -23.2 sem restrição de lng (Paraná inteiro é subtropical; PR/SC/RS).
5. Fortaleza clima "equatorial chuvoso" — aceitável (NE norte); CE litoral real é tropical As; mas ok como aproximação.
6. Texto com vírgula no início de marca oral ("Conhecer X ... region. oxente, meu rei A cidade") — adicionar pontuação após a marca: mudar os templates para formatar marca como frase completa com vírgula.

## ESTADO ATUAL (18/08 ~17:15 UTC) — 2 ERROS RESTANTES NO PROD RUNTIME
- 99 testes verdes (57 server+shared, 42 client) em ~7s com NODE_OPTIONS max-old-space 3072.
- Build completo OK (client+SSR+tabs+esbuild), dist/server/tabs/*.cjs com 27 módulos.
- ERRO 1: SSR entry-server.js importa '/home/ubuntu/ddd-brasil/dist/server/sp' — o import não-literal `import(/* @vite-ignore */ './${uf}.ts')` no SSR bundle foi literalizado pelo rollup sem extensão ('./sp') e resolve para dist/server/sp que não existe. No SSR o vite resolve em runtime via loader do bundle. CORRIGIR: em isNodeRuntime, o index.ts deve usar require dos .cjs compilados SEM fallback para dynamic import — o dynamic import do vite resolve paths errados. O index.ts já tenta loadCompiledUf antes; o entry-server usa index.ts mas usa loadMunicipalityTabs que primeiro tenta compiled (ok?) — mas o erro vem do entry-server.js que importa sp diretamente (a página SSR chama getMunicipalityTabsSync via outro caminho?). VERIFICAR quem importa './sp': grep 'from "./sp"' no bundle entry-server.js. Provavelmente o prefetchForPath/SSR páginas usam import(...) não-literal que rollup NÃO transforma (vite-ignore) mas o RUNTIME de vite SSR resolve via native import — que falha no dist.
- ERRO 2: __dirname is not defined no byMunicipality (lookup.ts usa __dirname — o bundle ESM não define). CORRIGIR: usar import.meta.url/fileURLToPath ou require.resolve sem __dirname (usar `new URL('.', import.meta.url).pathname`? lookup é usado no browser também; usar import.meta.dirname? Não existe. Solução: em node usar `path.dirname(fileURLToPath(import.meta.url))` quando import.meta disponível, senão __dirname.
- Dev server runtime (localhost:3000) funciona pois tsx define __dirname e não usa dist. ERROS só afetam produção.
- DIAGNÓSTICO ATUAL: o SSR usa index.ts loadMunicipalityTabs: isNodeRuntime=true, loadCompiledUf usa req.resolve('./tabs/..') — resolve contra process.cwd(). Em produção, node dist/index.js corre com cwd=dist (raiz do pacote? verificar). Se cwd=dist/server, '../dist/server/tabs/sp.cjs' = dist/tabs não existe. O caminho correto relativo a dist/server seria: './tabs/sp.cjs' (se cwd=dist/server). O ERRO 'dist/server/sp' vem do fallback dynamic import (`./${uf}` sem extensão) — o require falha e o vite resolve o import nativo contra import.meta.url = dist/server/entry-server.js → './sp' = dist/server/sp (sem extensão) → ENOENT.
- FIX: (a) loadCompiledUf deve resolver a partir de import.meta.url/dirname (fileURLToPath) ou adicionar cwd-based: './tabs/sp.cjs' (cwd dist/server) + path absoluto: require.resolve(path.join(process.cwd(),'tabs',ufLower+'.cjs')). (b) lookup.ts: remover __dirname → usar import.meta.dirname se disponível senão process.cwd()+dir inferido.
- Após correções: rebuild, teste prod, checkpoint + commit GitHub (sidneysantossp/meuddd).

## ESTADO ATUAL (18/08 ~17:08 UTC) — lookup.ts e testes (obsoleto)
- SSR bundle OK (387ms, @vite-ignore no index.ts loaders). buildTabsModules gera dist/server/tabs/*.cjs. Prod runtime OK (/cidade/sp/osasco 200, 5s, tabs presentes).
- Vitest: tests server/shared/client passam (141). MAS qualquer teste que importe server/routers.ts MORRE com SIGTERM — routers.ts importa @shared/localityTabs/lookup.ts que tem 27 IMPORTS ESTÁTICOS dos módulos UF (51MB) → vite dev/vitest transform mata o processo. FIX: converter lookup.ts para carregamento lazy (igual ao index.ts: require('./tabs/*.cjs') no node runtime + dynamic import não-literal no browser).
- Depois do fix: pnpm test completo (vitest run), verificação homepage/ssr no dev server, checkpoint + publish (auto) + commit GitHub (sidneysantossp/meuddd).
- Dev server precisa restart após mudanças (tsx watch deteta).

## ESTADO ATUAL (18/08 ~17:00 UTC) — SSR RESOLVIDO! (obsoleto)
- SOLUÇÃO ENCONTRADA: shared/localityTabs/index.ts usa `import(/* @vite-ignore */ './${uf}')` (specifier não-literal) → rollup NÃO pré-resolve os 27 módulos UF → SSR bundle 280KB, built in 387ms!
- scripts/buildTabsModules.mjs: compila shared/localityTabs/*.ts → dist/server/tabs/*.cjs (CJS, outExtension .cjs). loadCompiledUf() no index.ts procura ./tabs/*.cjs etc.
- package.json build: "vite build && node scripts/buildTabsModules.mjs && vite build --ssr ..." — testar completo: pnpm build OK (client+SSR+esbuild, dist/index.js 57MB pois esbuild do index inclui catálogo via import dinâmico — aceitar ou externalizar tabs dir no esbuild com --external:./tabs/*? esbuild usa "external" flag). Próximo: testar runtime dev (tsx server/_core/index.ts) e prod (node dist/index.js) com uma página /cidade/sp/osasco.
- Vitest: correr com singleThread (pnpm vitest run --pool=forks --poolOptions.forks.singleFork=false). Testes client/server já verdes (141 total).
- Depois: webdev_save_checkpoint (auto-publish), commit GitHub (gh repo sidneysantossp/meuddd).
- Favicon, imagens blog, indexnow já feitos antes. Lote LLM resiliente parado por créditos.

## ESTADO ATUAL (18/08 ~17:15 UTC) — SSR BUILD EM PROGRESSO (obsoleto)
- scripts/genTabsJson.mts GERADO: converte shared/localityTabs/*.ts -> *.json (27 JSON ok, com escape de newlines/trailing commas). Rodar quando regenerar as TS (após lote LLM).
- shared/localityTabs/index.ts REESCRITO: loadMunicipalityTabs usa fs.readFileSync dos JSON (node runtime) / import dinâmico (browser). getMunicipalityTabsSync usa cache.
- SSR build ainda trava no "transforming..." (>120s, SIGTERM 143, sem OOM em dmesg). Client build OK (4.37s).
- vite.config.ts: ssr.external testado com lista completa de specifiers @shared/localityTabs/*.ts + noExternal=false — TESTAR AGORA (pode resolver).
- Se ssr.external não resolver: fallback = remover MunicipalityTabs do App no SSR? Não é opção boa. Alternativa: usar esbuild direto com external? O SSR bundle serve dist/server/index.js carregado por server/_core/index.ts (vite --ssr output). Nota: o template usa `tsx server/_core/index.ts` no dev — o dev server usa vite.transform (não bundle) e funciona com import dinâmico? Ver server/_core/vite.ts.
- Depois do build: vitest (singleThread), webdev_save_checkpoint, commit GitHub, mensagem.
- Swap: /swapfile2 (4G) ativo — remover depois.

## ESTADO ATUAL (18/08 ~16:50 UTC) — PROBLEMA ATUAL (obsoleto — ver acima)
- 5.571 fichas regionais geradas, 0 pontuação quebrada (check_fix.py), INTEGRADAS via integrateTabs.mts (51MB em shared/localityTabs/; mg.ts=8MB, sp.ts=6.2MB, rs.ts=4.6MB).
- Vitest PASSA quando singleThread (42 client verdes + server/shared verdes = ~141 testes). `pnpm test` completo morre por OOM com pool default (fichas correm em paralelo).
- `pnpm build`: client ok (4.75s); SSR bundle morre no "rendering chunks" do rollup (vite build --ssr) — OOM silencioso (heap 4-6G não resolve; swap 6G criado: /swapfile2 ativo).
- FIX PARCIAL 1: shared/localityTabs/index.ts convertido p/ lazy dynamic imports (antes estáticos) — resolveu vitest.
- FIX EM CURSO: externalizar localityTabs do SSR bundle: adicionar `ssr: { noExternal: [/localityTabs/] }`? NÃO — precisa ser o contrário: ssr external para localityTabs ficar fora do bundle (node resolve em runtime). Ver vite.config.ts linha ~260 (ssr config, se houver).
- Prefetch usa: loadMunicipalityTabs(uf) no SSR (/cidade) e getMunicipalityTabsKey; MunicipalityPage usa getMunicipalityTabsSync.
- Próximo: editar vite.config.ts com `ssr: { noExternal: ... }` invertido => usar `ssr.external` com regex localityTabs; retestar build.
- Após build: re-corre suíte (vitest singleThread ou pnpm test), webdev_save_checkpoint, commit GitHub, mensagem ao user.
- Swap extra criado: sudo fallocate -l 4G /swapfile2; sudo mkswap; sudo swapon. (pode ser apagado depois: swapoff /swapfile2 && rm).

## ESTADO ATUAL (18/08 ~16:40 UTC) — (ver acima)
- FIX aplicado: scripts/fix_pontuacao.py --regen removeu 3.273 fichas com pontuação quebrada; batch regenerou; check_fix.py => BAD: 0 de 5571. QUALIDADE FINAL VALIDADA.
- Integração feita: npx tsx scripts/integrateTabs.mts => Total integrado: 5571 municípios (shared/localityTabs/<uf>.ts).
- pnpm test: server/shared todos verdes (99+); testes client falham com SIGTERM (OOM do runner — memória sandbox 3.8G; rodar em blocos separados).
- PRÓXIMO: (1) pnpm vitest run client (se OOM, dividir); (2) pnpm build; (3) verificar renderização de página de cidade (/cidade/sp/aruja) no preview; (4) webdev_save_checkpoint + mensagem ao user; (5) commit GitHub (gh).
- Dev server logs mostram erro antigo '[2026-08-17T04:51:57Z] ReferenceError coverageSnapshotPath' — antigo, ignora (verificar se é recente antes de concluir).

## Correções a fazer antes de reintegrar (obsoleto):
- engine.py: corrigir faixas (Sul até -23.2; litoral SE até -20.5; Niterói/RJ); pontuação nas marcas orais nos templates ("{marca}." -> "{marca}, ").
- Reexecutar somente as fichas afetadas (deletar PR json e regenerar; corrigir RJ/PR litoral).
- Depois: integrateTabs.mts (verificar se funciona com o catálogo; antes usava arquivos do lote resiliente — formato igual, deve funcionar), pnpm test (99+), pnpm build, checkpoint.

## Checkpoints recentes
- 40369917 / 82d948f8: redirects SEO (seoRedirects.ts) publicados.
- 53285014: admin dashboard + 111 fichas nativas integradas.
- Deploy auto-publish ativo: dddbrazil-jbfgdfkn.manus.space (também meuddd.com.br via Cloudflare/Vercel).
- Lote resiliente (generateTabsResilient.mts, processo node PIDs 150885/227283)
  segue em background tentando RS, em ciclo de 412/backoff.
