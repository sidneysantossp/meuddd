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
- Ou seja: /estado/* e /regiao/* funcionam client-side; apenas a rota /cidade/:uf/:slug quebra na navegação client-side em produção. (No acesso direto por URL, o SSR funciona.)
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
