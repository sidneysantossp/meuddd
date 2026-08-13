# Varredura SEO — achados (2026-08-13, SSR local, 12 páginas principais)

## Pontos fortes confirmados
- Titles únicos e com keyword por página (todos com "| Meu DDD").
- Descriptions únicas (50–113 caracteres).
- 1× H1 por página; hierarquia correta de headings.
- JSON-LD rico: Organization + BreadcrumbList + CollectionPage/WebPage/Article/FAQPage; municípios com 5 blocos (incl. DefinedTermSet).
- 95 links internos na /ddd/11; 683 na /estado/sp; municípios com 46–51.
- Fontes externas apenas whitelist (IBGE, ANATEL, climate-data, Google Maps).

## Oportunidades identificadas (por gravidade)
1. [CRÍTICO] **/blog retorna 404** — "Página não encontrada | Meu DDD". A rota /blog não existe no Switch do App; o menu/footer apontam para /blog. Corrigir: criar rota /blog (listagem) ou apontar nav/footer para a rota real (/guia).
2. [ALTO] **Falta canonical** em todas as páginas (nenhuma tag <link rel="canonical"> encontrada).
3. [ALTO] **Falta og:image** em todas as páginas (opengraph image ausente) — pior partilha social e AI Overviews.
4. [ALTO] **H1 de /ddd/XX é "64 cidades conectadas."** sem keyword — perder a keyword principal do DDD no H1 (ex.: "DDD 11: 64 cidades atendidas em São Paulo").
5. [MÉDIO] **Proportion texto/HTML baixa (0.4%–2.4%)** — páginas de DDD/estado/região/guia têm pouco texto visível (2–4 KB) para HTML de 400–1020 KB; mitigação: adicionar parágrafo editorial adicional (já existe mas pouco) — o principal ganho virá das tabs em massa; para DDD/região, adicionar mini-guia territorial (população, região, história da área, como funciona o DDD) sem peso enorme de HTML.
6. [MÉDIO] **Região (/regiao/sudeste)** tem só 2.1 KB de texto e 31 links internos — candidatos a bloco editorial (mapa do hub + texto sobre a região: população combinada, estados, história da área).
7. [BAIXO] **Title do /ddd/11 (45)** ótimo; municipal titles curtos (28–37) — adicionar cidade, UF, DDD, "região" para enriquecer.
8. [BAIXO] External links 0 na home/blog — natural.

## Plano de implementação
- [ ] Criar rota /blog (listagem dos guias editoriais) — resolve 404 do menu/footer
- [ ] Adicionar canonical por rota (base https://www.meuddd.com.br + path)
- [ ] Adicionar og:image (banner/hero partilhável) + twitter:card
- [ ] Melhorar H1 das páginas de DDD para incluir keyword "DDD XX"
- [ ] Adicionar mini-texto editorial nas páginas de DDD (parágrafo territorial) e /regiao — reforçar texto/HTML
- [ ] Enricher titles municipais com DDD e região
- [ ] Testes + checkpoint + commit GitHub

CORREÇÃO DA VARREDURA: canonical JÁ EXISTE (composeSsrHtml gera <link rel="canonical">; a regex do audit falhou por ordem de atributos). og:title/og:description/og:url/twitter:card JÁ EXISTEM via ssrHtml.ts. OG:TYPE article já definido para DDD/estado/município. Falta real: og:image (nenhuma imagem de partilha), /blog → 404 (acesso direto; nav/footer já apontam /guias), H1 DDD sem keyword, pouco texto em /ddd e /regiao, titles municipais curtos.

## Estado da implementação (21:50)
Facts verificados: nav/footer já apontam "Blog" → /guias (PublicNavbar.tsx linha 8, PublicFooter.tsx linha 8 — com testes que esperam /guias). O problema /blog 404 afeta acessos diretos. SSR meta tags: server/_core/ssrHtml.ts injeta title/description por rota (ver ssrHtml.ts linha 16 defaults + por rota). App.tsx usa createLoadableRoute (lazy); Redirect do wouter deve estar disponível. NÃO existe canonical/og:image/twitter em nenhuma página.

Plano em execução:
1. Adicionar redirecionamento permanente /blog → /guias no App.tsx (Redirect do wouter) — resolve 404.
2. Adicionar canonical + og:image + twitter:card em server/_core/ssrHtml.ts (gerar por rota: og:image usar o hero/brand do site — verificar se existe imagem de partilha; se não, usar VITE_APP_LOGO ou criar social share static).
3. Melhorar H1 das páginas DDD: DddDetail.tsx — mudar de "64 cidades conectadas." para "DDD 11: 64 cidades atendidas em São Paulo".
4. Adicionar mini-texto editorial em DddDetail e RegionPage para melhorar texto/HTML (população total da região, estados, contextualização).
5. Enricher titles municipais com DDD e região (MunicipalityPage SSR title).
6. Tests + checkpoint + commit GitHub (remote "github" → sidneysantossp/meuddd, main).
Nota: og:image — verificar VITE_APP_LOGO e assets existentes (/assets/) para escolher URL; usar https://www.meuddd.com.br como base do canonical.

## Progresso implementação (21:55)
FEITO:
- ssrHtml.ts: og:image genérico (/assets/blog-ddd-mapa-brasil.jpg, 1440x810) + og:image:width/height/alt. CANONICAL_ORIGIN já é https://www.meuddd.com.br.
- prefetch.ts: ogImage/ogImageAlt no HeadMeta; guia editorial passa ogImage=guide.image, ogImageAlt=guide.imageAlt.

PENDENTE:
1. /blog → 404: adicionar redirect em App.tsx (linha ~85, antes do catch-all): `<Route path="/blog">{<Redirect href="/guias" />}</Route>` OU componente BlogRedirect com useLocation/setLocation em useEffect. Verificar se wouter Redirect existe (import { Redirect } from "wouter" — existe desde 3.0).
2. H1 DddDetail.tsx linha 181: "{data.cityCount} cidades conectadas." → "DDD {data.code}: {data.cityCount} cidades atendidas" + enriquecer <p> com texto territorial (citar estado via Link interno + IBGE) — states[0].name disponível. Linha 181 é o hero; editar para incluir stateNames.
3. Enricher titles municipais: prefetch.ts linha ~113 title municipal — manter. (Opcional: adicionar DDD no title: "DDD de {name} ({uf})" já tem; adicionar região? desc já cita estado). DECISÃO: adicionar DDD ao description municipal e region ao title.
4. Mini-texto editorial /regiao: prefetch dá regionDescription; RegionPage.tsx pode ter pouco texto — verificar e adicionar parágrafo com população combinada dos estados.
5. Rodapé do plano: testes (pnpm test), screenshot, checkpoint, commit GitHub (remote "github" → sidneysantossp/meuddd main), mensagem utilizador.
Nota: remote git chamado "github"; git log github/main..HEAD para saber commits pendentes.
Nota extra: erro devserver residual "MunicipalityTabs.tsx 42:182" é de 20:49 (antes da correção) — verificar se persiste no log mais recente (não é atual).

## Problemas nos screenshots (21:48)
1. DddDetail: "em [object Object]" no parágrafo — os Links no template literal ficaram como objeto. Corrigir: usar array intercalado com JSX em vez de interpolação de objetos: construir fragmento manualmente (map → <>{sep}{<Link>...}</Link></>).
2. RegionPage: "AbrangendoEspírito Santo" falta espaço — o {' '} não foi suficiente antes do map (o JSX map renderiza como primeiro child sem espaço). Adicionar espaço entre "abrangendo" e o primeiro item: usar {' '} antes do map e garantir {' '} entre itens já existe (", "/e "). O problema: "abrangendo" diretamente seguido de <span> — o {' '} está antes do map mas no JSX o space pode ser colapsado? Ver render: "...abrangendo<span key='ES'>Espírito Santo</span>, ..." — faltou o espaço entre "abrangendo" e <span>. O {' '} está no início do map? Na verdade ' ' está entre regionStates.map( e (state. Corrigir: colocar {' '} como child fixo antes do map.
3. /guia/o-que-e-ddd deu 404 no screenshot — slug do guia está errado? Verificar editorialGuideImages: "o-que-e-ddd" mas URL tentada foi "o-que-e-ddd-entenda-os-codigos-de-area-do-brasil" (slug longo não existe). NÃO é bug — a URL de teste estava errada. Confirmar slug real em editorialGuides.ts.

## Validação final (21:48)
Todos os screenshots confirmados OK: /ddd/11 mostra "DDD 11: 64 cidades atendidas" com link interno "São Paulo" no texto; /regiao/sudeste mostra "abrangendo Espírito Santo, Minas Gerais, Rio de Janeiro e São Paulo" com links internos; /guia/o-que-e-ddd renderiza corretamente (a URL anterior da varredura estava errada); /blog redireciona para /guias. Nota: o /blog screenshot mostra /guias renderizado com redirect client-side — o SSR do /blog já serve canonical /guias. Falta: checkpoint + commit GitHub.

## Plano implementação oportunidades SEO (13/08 ~22:00)
Descobertas-chave para implementação:
1. **JSON-LD/Breadcrumbs JÁ EXISTEM!** O prefetch.ts já injeta `breadcrumbs()` + CollectionPage/WebPage/FAQPage JSON-LD em /ddd, /estado, /cidade, /regiao. Logo BreadcrumbList e Article JSON-LD já estão cobertos em grande parte. Verificar o que falta: Article @type nas páginas DDD/estado (usam CollectionPage — manter? artigo editorial → adicionar Article em /ddd e /estado), e LocalBusiness para guias (Article já existe).
2. **Ficheiros estáticos públicos**: client/public/ contém llms.txt, ads.txt, assets/ → servidos via express.static em production (server/index.ts linhas 13-23: `app.use(express.static(staticPath))` onde staticPath = dist/public). Sitemap XML pode ser ficheiro estático gerado por script (scripts/generate-sitemaps.mts) → escreve em client/public/sitemap*.xml e dist é rebuildado no build? ATENÇÃO: vite build copia publicDir → dist. Melhor abordagem: gerar sitemaps staticamente em client/public/sitemap-*.xml + sitemap.xml index, e script para regenerar quando dados mudarem. Usar SITE_URL=https://www.meuddd.com.br, lastmod do dia.
3. **Cidades vizinhas**: MunicipalityPage.tsx já tem secção de vizinhança? Verificar "cidades próximas"/IntentCluster. Município vizinho: usar ibgeCode vizinhos — dados disponíveis no catálogo (municipalities do DDD podem ser do mesmo estado). Implementar parágrafo contextual "Municípios vizinhos" com links.
4. **Medição Search Console**: documento /home/ubuntu/relatorio-variacao... (feito). Criar docs/SEARCH-CONSOLE-COBERANCA.md no repo? Sim — documento de referência de medição.
5. Estrutura JSON-LD atual por tipo (prefetch.ts):
   - /ddd/: BreadcrumbList + CollectionPage (DefinedTerm) — adicionar Article (headline, datePublished, inLanguage pt-BR, about AdministrativeArea)
   - /estado/: BreadcrumbList + CollectionPage (AdministrativeArea com population) + FAQPage — adicionar Article
   - /cidade/: BreadcrumbList + WebPage (City com geo/population) + FAQPage + DefinedTermSet (tabs) — OK
   - /regiao/: BreadcrumbList + CollectionPage — OK
   - /guia/: Article — já existe
   - / (home): a verificar (WebSite + ItemList?)
6. Site base: site = "Meu DDD"; canonical https://www.meuddd.com.br.
7. Sitemap index: sitemap.xml → sitemap-ddd.xml, sitemap-estado.xml, sitemap-cidade.xml (5.570 URLs — Google aceita até 50k), sitemap-guia.xml. Incluir também /gerador, /guias, guias principais, home, region hubs.

## Diagnóstico JSON-LD existente (confirmado via SSR local, 13/08)
- BreadcrumbList JÁ EXISTE em /ddd, /estado, /cidade, /regiao, /gerador, /guias/:slug, institucionais (função `breadcrumbs()` em prefetch.ts).
- /cidade: WebPage+City (geo, population) + FAQPage + DefinedTermSet (tabs) + BreadcrumbList — completo.
- /guia: Article + BreadcrumbList — completo.
- /gerador: WebPage + SoftwareApplication + FAQPage + BreadcrumbList — completo.
- Home (/): WebSite + Organization com @graph (URLs absolutas https://www.meuddd.com.br) — mas sem ItemList dos hubs/DDDs populares.
- /estado: CollectionPage (AdministrativeArea+population) + FAQPage + BreadcrumbList — falta Article.
- /ddd: CollectionPage (DefinedTerm) + BreadcrumbList — falta Article.
- /regiao: CollectionPage + BreadcrumbList — ok; pode ter Article.
- O SSR injecta 2 blocos ld+json: um com @graph global (Organization+WebSite, urls absolutas) e um por página (prefetch jsonLd).
- Home jsonLd atual tem url "/" relativo — ok no SSR.
- Falta implementar: (1) Article JSON-LD em /ddd e /estado; (2) sitemaps XML fracionados estáticos em client/public/; (3) parágrafo "cidades vizinhas" com links no MunicipalityPage/LocalityContext; (4) docs/SEARCH-CONSOLE.md para medição.

## Estado do trabalho "Oportunidades futuras SEO" (13/08 22:15)

### Concluído nesta fase
1. Article JSON-LD adicionado em prefetch.ts (linhas 93, 101, 126) para /ddd, /estado e /cidade (headline, inLanguage pt-BR, author/publisher Organization, about territorial, datePublished/Modified 2026-08-01). Validação curl SSR: /ddd/11 tem [Organization, BreadcrumbList, Article, CollectionPage]; /estado/sp [Organization, BreadcrumbList, CollectionPage, FAQPage, Article]; /cidade/sp/aruja [Organization, BreadcrumbList, WebPage, FAQPage, Article, DefinedTermSet].
2. Sitemaps: o projeto JÁ tinha sistema dinâmico em server/_core/app.ts (/sitemap.xml index + /sitemaps/:kind.xml: estados, ddds, cidades, cidades-{uf}, guias, regioes, institucional, imagens). ENRIQUECI com: LASTMOD="2026-08-13", <lastmod>/<changefreq>/<priority> por URL, prioridade 0.9 estados/ddds, 1.0 home, kind novo "paginas" (/, /gerador 0.7, /capitais, institucionais 0.5), cache inventário 1h (cachedInventory), guias com priority 1.0 na raiz e 0.8 por guia. seoDiscovery.test.ts atualizado (86/86 testes verdes).
3. Decisão tomada: REMOVIDOS client/public/sitemaps/ (estáticos) e scripts/generateSitemaps.mts — o sistema dinâmico enriquecido substitui (evita 5.570 URLs estáticas pesadas e mantém-se sempre atualizado).
4. Revertidos os app.use("/sitemaps") express.static adicionados a ssrStatic.ts e vite.ts (desnecessários).

### Pendente
- [ ] Adicionar parágrafo editorial contextual "Cidades vizinhas" na página de município (enriquecer o <p> da seção "Outras cidades com DDD" em MunicipalityPage.tsx linha 73 com texto contextual e links). NOTA: relatedMunicipalities (12 máx, mesma UF) já vem no retorno do byMunicipality; a seção já existe e é SSR (validado via curl /cidade/sp/aruja com 12 links cidade/sp/*).
- [ ] docs/SEARCH-CONSOLE.md (medição de cobertura).
- [ ] Checkpoint final + commit no GitHub (remote "github" → sidneysantossp/meuddd, branch main).

### Verificações feitas
- curl /sitemap.xml com Host: www.meuddd.com.br → URLs https://www.meuddd.com.br canônicas; robots.txt dinâmico aponta Sitemap ${origin}/sitemap.xml.
- /sitemaps/cidades-sp.xml 200 com lastmod/changefreq/priority.
- pnpm test: 35 arquivos, 86 testes verdes.
