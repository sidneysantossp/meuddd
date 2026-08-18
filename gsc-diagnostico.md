# Diagnóstico GSC (17/08)

## Dados enviados pelo utilizador
- Páginas.csv (1001 linhas), Consultas.csv (484 linhas) em /home/ubuntu/upload/

## Padrões identificados nas páginas com erro (GSC)
1. URLs /blog/<uf>/<cidade>/internet... (ex.: /blog/bahia/iuiu/melhor-internet-fibra-iuiu) → TODAS 404 (~445 impressões agregadas). NÃO existem no site. Conteúdo de parasite SEO/scraper. O blog real é /guia/:slug e /guias.
2. URLs formato antigo /cidade/<slug> sem UF (36 URLs, ~1.300 impressões): hoje rotas exigem /cidade/:uf/:slug.
3. Slug de estado no lugar da UF (ex.: /cidade/goias/goias, vem de buscas "goiás ddd") → 404 porque a query exige UF maiúscula (GO).
4. /cidade/undefined → 404 (bug client antigo).
5. /index.html → 200 (duplicada da home, 40 impressões).
6. /cidade/mg/sao-paulo → 404 real (não existe; sem ação).

## Testes de produção (curl)
- 200: /cidade/go/goias, /cidade/mg/belo-horizonte, /cidade/sp/campinas, /ddd/45, /guia/*, /estado/pr, /blog (client redirect), robots.txt, sitemap.xml, /index.html (duplicada).
- 404: /cidade/goias/goias, /cidade/corumba, /cidade/undefined, /blog/*, /blog.
- Página 404: canonical próprio + noindex,follow (correto).
- robots.txt: Allow: / + Sitemap OK. Sitemap válido (~27 por UF + guias/paginas, lastmod 13/08).
- /blog → BlogRedirect client-side (setLocation /guias) — NÃO é 301 HTTP.

## Plano de correção (middleware Express, antes do SSR)
1. GET /index.html → 301 → /
2. GET /blog/:any → 301 → /guias
3. GET /cidade/<nome-estado>/<slug> (nome-estado ∈ map nomes→UF, ex. "goias"→GO) → 301 → /cidade/<uf>/<slug>
4. GET /cidade/<slug> (1 segmento) → lookup slug (staticMunicipalities) → 301 → /cidade/<uf>/<slug>
5. /cidade/undefined → permanece 404 noindex.
6. Verificar server/_core/app.ts para injetar o middleware.

## Screenshot GSC
- "A solicitação de indexação foi recusada" no live test de /cidade/goias/goias → esperado (404 → Google recusa). Após redirects, URLs legítimas passam.

## Estado da implementação (fase 2)
- CRIADO: server/_core/seoRedirects.ts — middleware com STATE_NAME_TO_UF (27 UFs + nomes acentuados), findMunicipalityBySlug via staticTerritory, rotas GET: /index.html→301/, /blog→301 /guias, /blog/*→301 /guias, /cidade/:a→lookup+301, /cidade/:a/:b→nome-estado→301 com UF (undefined→404, UF inválida→404, UF válida→404 para cair no SSR com resposta normal — na verdade retorna 404: pares válidos vão ao SSR depois do middleware; ver teste "não redireciona pares válidos" status 404 no app isolado porque não tem serveStatic/SSR; na app real com serveStatic seguem para SSR).
- EDITADO: server/_core/app.ts — registado registerSeoRedirects(app) antes de registerStorageProxy.
- CRIADO: server/_core/seoRedirects.test.ts — 13 testes (vitest, app Express isolado).
- ATENÇÃO: no app real, /cidade/<uf>/<slug> válido deve seguir para o SSR (não devolver 404) — o middleware só responde quando há redirect ou caso inválido; para UF válida, a rota app.get("/cidade/:a/:b") responde 404 sempre! BUG: preciso mudar para next() quando UF válida. CORREÇÃO PENDENTE.
- Falta: correr pnpm test, validar em produção (curl), checkpoint, commit, informe ao utilizador.
