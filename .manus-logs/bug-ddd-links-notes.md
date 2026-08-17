# Bug reportado 2026-08-13 — links das páginas de DDD (produção)

## Reprodução

1. Abrir https://www.meuddd.com.br/ddd/11 (produção). Página renderiza OK com links <a href="/cidade/sp/aruja"> etc.
2. Clicar no link do município Arujá → URL muda para /cidade/sp/aruja mas a SPA (client-side) mostra "An unexpected error occurred" com **React error #310** ("useEffect is not defined / Hooks can only be called inside the body of a function component").

## Observação

- React #310 = "useEffect called from a non-function component / hooks mismatch". Stack: useEffect → useQuery (tanstack/react-query) → página do município (MunicipalityPage.tsx) / trpc query dentro do lazy route.
- No preview dev os links funcionam (SPA client-side OK). Em produção (bundle Vite index-DxgGAdMz.js), a navegação client-side para /cidade/:uf/:slug quebra.
- Hipótese: múltiplas cópias de react/react-query no bundle de produção, ou o RouteLoadingFallback/Suspense + lazy faz com que o componente renderizado pelo cliente tenha hooks de um contexto diferente (duplicated react?); outra hipótese: SSR hydrate + lazy import order causa #310 no React 19 quando um hook é chamado após um erro de import (módulo parcialmente carregado → componente vira objeto não-função?).
- O bundle de produção serve assets via /assets/ em meuddd.com.br — funciona para imagens (blog renderizou).
- Verificar: logs de produção com manus-webdev-logs; testar navegação /estado/sp e /regiao/sudeste a partir de /ddd/11; ver se o mesmo acontece com links do Estado→DDD.

## Resultados do teste em produção (13/08)

- /ddd/11 → clicar Arujá (/cidade/sp/aruja): SPA cai em "An unexpected error occurred" React #310 (useEffect/useQuery). Reprodutível.
- /ddd/11 → clicar "DDD de São Paulo" (/estado/sp): navega e renderiza CORRETAMENTE (mostra "A localizar o estado SP" loading e depois a página completa com FAQ, DDDs e municípios).
- Ou seja: /estado/_ e /regiao/_ funcionam client-side; apenas a rota /cidade/:uf/:slug quebra na navegação client-side em produção. (No acesso direto por URL, o SSR funciona.)
- Causa provável: MunicipalityPage.tsx usa hooks (useEffect/useQuery) dentro do lazy-loaded route; possivelmente erro no módulo Municipal… ou no prefetch SSR com hydration do localityTabs. Investigar MunicipalityPage.tsx (efeitos, geolocalização?) e testes de hidratação da rota.

## Estado dos links (SSR HTML OK)

- Links no HTML SSR de /ddd/11 corretos: /cidade/sp/<slug>, /estado/sp, /regiao/sudeste.
- Problema é apenas na navegação client-side (wouter Link + lazy routes) em produção.

## Achado importante (13/08)

- O HTML de https://www.meuddd.com.br/ (versão dce741d8) referencia APENAS assets/index-DxgGAdMz.js.
- Quando navegámos de /ddd/11 (HTML antigo, hash DxgGAdMz) para /estado/sp, a SPA carregou bem; mas ao clicar em Arujá (/cidade/sp/aruja) deu erro #310.
- Nota: /estado/sp em produção mostra "A localizar o estado SP" → SPA carrega a página. Mas no console do erro de Arujá, a stack refere index-DxgGAdMz.js módulo 18 (hooks) e 58 (tanstack query).
- Próximo passo: verificar no browser os requests de rede após o clique (possível chunk JS lazy com hash antigo 404 → erro de carregamento de módulo → o componente falha com #310). O erro #310 aparece tipicamente quando um chunk falha e o módulo exportado não é uma função componente.

## Ficheiros relevantes

- client/src/App.tsx (createLoadableRoute, lazy + Suspense)
- client/src/pages/MunicipalityPage.tsx (usa useEffect + useQuery localityTabs.byMunicipality)
- client/src/components/IntentCluster.tsx (Link href)
- DDD detail: client/src/pages/DddDetail.tsx

## ESTADO APÓS CHECKPOINT 7b5ed1b3 (18:46)

- Produção Manus (dddbrazil-jbfgdfkn.manus.space) JÁ SERVE o novo bundle `index-D0q8_lC6.js` do checkpoint 7b5ed1b3 → a minha correção NÃO resolveu o #310. O erro continua.
- Stack: Fe (error boundary render) → xs → Yu [as useEffect] → xe.useEffect → Lv → Oo → H1 → useQuery (tanstack) → apply.
- A stack passa por lv (8488), Oo (10258), H1 (10981) antes do useQuery: sugere que o componente com hook problemático NÃO é a página em si mas algo chamado DURANTE o render da página — possivelmente ShareActions/TerritoryTrustPanel/TerritoryQuickAnswer/IntentCluster ou o ErrorBoundary, OU o problema é que o chunk lazy MunicipalityPage-kNWHKs2v.js (module id) está a ser executado como componente e contém hooks condicionais noutro ficheiro partilhado.
- Próximo passo: procurar TODOS os hooks condicionais no fluxo da rota /cidade/: lazy component (App.tsx) → pagina → componentes filhos; ver se algum child tem useEffect/useQuery dentro de branch condicional. Ver também se createLoadableRoute em App.tsx muda a ordem de hooks entre renders (Suspense boundaries).

## Análise da stack persistente (18:47)

O MunicipalityPage já tem TODOS os hooks no topo (52-57), logo a minha correção deveria ter resolvido. O erro persiste → o componente que dispara o #310 NÃO é o MunicipalityPage de topo. A stack passa por dois frames (Lv, Oo) entre useEffect e useQuery, indicando DOIS componentes de renderização entre eles. Possível origem: um dos componentes filhos tem hook condicional — investigar ShareActions (copy/share), TerritoryTrustPanel, TerritoryQuickAnswer, IntentCluster, e especialmente o createLoadableRoute do App.tsx (wrapper entre o lazy import e a rota pode alterar ordem de hooks entre renders se usa estado/suspense dinâmico). Nota: /estado/_ e /regiao/_ funcionam na navegação — as rotas lazy dessas páginas não colapsam; apenas /cidade colapsa. Diferença estrutural: /cidade é a única rota que combina lazy + hooks + early return loading + query aninhada? Verificar a rota no App.tsx.

## Hipótese refinada (18:50)

O createLoadableRoute NÃO deve mudar entre renders quando `resolved` já está definido — a partir do 2º render, ResolvedRoute é sempre o mesmo componente. Isso não causa #310 por si.
MASSSS: a stack mostra DOIS frames entre useEffect e useQuery → há um useQuery DENTRO de um componente que usa useEffect antes dele?? Ou o useQuery é chamado dentro de um useCallback? NÃO: o useQuery está no topo do MunicipalityPage.
Hipótese nova: o MunicípioPage em produção D0q8_lC6 ainda NÃO inclui a minha edição — o checkpoint 7b5ed1b3 foi salvo ~18:43 e produção propagou ~18:45 com D0q8_lC6. Mas a edição foi feita 18:41-18:43. Pode ser que o bundle compilado seja do momento do checkpoint, que INCLUI a edição.
Outra pista: o erro #310 em React 19 também ocorre quando um componente é renderizado FORA de um contexto de render — por exemplo, se `resolved` é o objeto default export mas o módulo contém hooks no nível de módulo? Não.
DECISÃO: reproduzir localmente com o build de produção (pnpm build + preview) para reproduzir sem depender do browser de teste; usar Playwright real via curl é insuficiente. Alternativa: adicionar teste de hidratação+navegação SPA para /cidade com React Testing Library + wouter no mesmo teste que valida a navegação client-side completa (montar /ddd/11 e clicar no link → esperar página município). Isso reproduz o fluxo SPA real com os mesmos bundles de teste (mais próximos do production build).

## Bundle de produção CONFIRMA correção (18:48)

- dist/public/assets/MunicipalityPage-Lf7pBzbx.js (do build 18:47): função `Ke` = MunicipalityTabsSection com useQuery localityTabs no topo (linha 43 do fonte); função `oi` = página com useRoute/useLocation/useQueryClient/useQuery(byMunicipality) TODOS no topo, só depois early return isLoading.
- Conclusão: o MunicípioPage NÃO é o culpado. O erro #310 vem de outro módulo com hooks condicionais executado DURANTE o render da página (stack: useEffect → useQuery, com 2 frames entre eles no módulo 18 do index).
- Verificar candidatos: ShareActions (copy com useEffect?), TerritoryTrustPanel, TerritoryQuickAnswer, IntentCluster, BlogHighlights/PublicBottom (usam useLocation — sem problema), e o SSR prefetch client-side (createSsrPrefetch em main.tsx?). Possivelmente um useQuery dentro de useEffect (callback), que em React 19 strict mode duplo-trigger pode causar #310? Não exatamente.
- O React 19 error #310 = "Tried to access a context (or hooks) outside render" — o padrão típico: chamar useQuery() dentro de um callback de useEffect ou dentro de renderização de children como função. Procurar no índice "useQuery(" fora de componentes-função de topo.

## RESOLVIDO no domínio Manus (18:49)

A navegação client-side /estado/sp → /cidade/sp/aruja RENDERIZOU COMPLETAMENTE no bundle mais recente `index-PLKgepEg.js` (checkpoint 7b5ed1b3 publicado). A página mostra título, DDD, tabs editoriais, FAQ, território ligado, etc. A confirmação anterior com falha foi cache da sessão do browser (ainda a usar D0q8_lC6 da página anterior).
CONCLUSÃO: a correção está VALIDADA em produção no domínio Manus (dddbrazil-jbfgdfkn.manus.space). O domínio meuddd.com.br continua com o build antigo DxgGAdMz porque é servido por deploy externo (Vercel + Cloudflare) — o utilizador precisa re-deployar no Vercel para propagar. Vou comunicar isso claramente e testar mais cenários de navegação no domínio Manus (a partir de /ddd/11).

## Validação final (18:50)

No cenário exato do utilizador (clique em Arujá a partir de /ddd/11) no domínio de produção Manus, a página primeiro mostra "A LOCALIZAR MUNICÍPIO" (loading correto — significa que o render loading funciona sem colapsar) e de seguida renderiza a página completa: DDD de Arujá, 90.273 habitantes, mapa, tabs editoriais, emergência, FAQ 10 perguntas, território ligado. O #310 já NÃO ocorre no bundle mais recente (PLKgepEg). BUG RESOLVIDO no domínio Manus. O domínio meuddd.com.br (Vercel/Cloudflare externo) ainda serve build antigo DxgGAdMz — utilizador precisa re-deployar lá.
