# Estado real da cobertura das tabs editoriais (13/08 15:5x BRT)

## Bug reportado pelo utilizador
Página municipal (ex.: /cidade/sp/aracariguama) mostra apenas os cartões do LocalityContext com links do Google Maps — sem conteúdo editorial das tabs.

## Diagnóstico
- O MECANISMO funciona: /cidade/sp/osasco mostra MunicipalityTabs no SSR (174 ocorrências de "MunicipalityTabs", título "Pontos turísticos").
- A página /cidade/sp/aracariguama mostra o fallback porque o SP tem apenas 1 ficha integrada (osasco).
- Cobertura integrada atual (módulos TS por UF): AC 2 (cruzeiro-do-sul, tarauaca), AL 1, AM 1, BA 1, CE 1, GO 1, MA 1, MG 1, MS 1, MT 1, PA 1, PE 1, PI 1, PR 1, RJ 1, RN 1, RO 1, RS 1, SC 2, SE 1, SP 1, TO 1 ≈ 24 fichas de 5.570 municípios.
- AP, DF, ES, PB, RR: catálogo TS vazio (JSON sem fichas).
- Os JSONs gerados foram interrompidos por quota LLM esgotada (412 usage exhausted) — a geração em massa só completou parcialmente.
- A tarefa agendada (PW66RMcon4WDl815DcI966, 14/08 06:00 BRT) deve retomar com --only-empty, mas hoje a quota continua esgotada.

## Implicação
Não é um bug de código — é a falta de dados gerados. A expectativa do utilizador é de conteúdo editorial em todas as 5.570 páginas municipais, e ele está a ver o fallback. Precisa de:
1. Garantir que a geração em massa de hoje (14/08 06:00) corre com sucesso (verificar quota ao amanhecer).
2. Opcional: melhorar o fallback para ser mais útil/informativo até haver ficha (texto intermédio que explica que o guia local está em construção).
3. Após a integração completa, re-executar integrateTabs e checkpoint.

## Teste de navegação em produção (13/08 17:40 BRT)
A página /cidade/sp/osasco (produção Manus) renderiza o conteúdo editorial completo: secção "Osasco em detalhe" com as 4 tabs (Pontos turísticos, Bares e restaurantes, Transporte, Clima e região), introdução editorial, 6 pontos turísticos com links Google Maps, cartão de autoridade cidade→estado ("Ver São Paulo" → /estado/sp), FAQ 10 perguntas, navegação por intenção e links internos DDD/estado/região. Sem erros. SSR correto.

Tab "Bares e restaurantes" testada: conteúdo troca corretamente (gastronomia de Osasco, Mercado Municipal 1953, feiras livres, fonte osasco.sp.gov.br). A seguir testar Transporte e Clima, o fallback sem ficha (Araçariguama), e navegação interna cidade→estado.

Tab "Transporte" validada: troca corretamente (CMTO, Terminal Rodoviário Alfredo Thomaz, Estação Osasco CPTM linhas 8/9, aeroporto Congonhas, fontes sinart/osasco.sp.gov.br/metrocptm). Falta testar tab Clima e o fallback sem ficha (Araçariguama).

## Teste de navegação completo (13/08 17:41 BRT, produção dddbrazil-jbfgdfkn.manus.space)

### Cenário A — município COM ficha editorial (/cidade/sp/osasco)
A página renderiza SSR completo: título "DDD de Osasco (SP)", 759.524 habitantes (IBGE 2025), DDD 11, mapa da localidade, secção "Osasco em detalhe" com as 4 tabs funcionais. Tab "Pontos turísticos": 6 pontos com texto e links Google Maps (Parque Chico Mendes, Parque da FITO, Museu Dimitri Sensaud de Lavaud, Catedral de Santo Antônio, SESC Osasco, fonte ibge.gov.br). Tab "Bares e restaurantes": gastronomia, Mercado Municipal 1953, feiras livres, fonte osasco.sp.gov.br. Tab "Transporte": CMTO, Terminal Rodoviário Alfredo Thomaz, Estação Osasco CPTM 8-Diamante/9-Esmeralda, aeroporto Congonhas, fontes sinart/osasco.sp.gov.br/metrocptm. Cartão de autoridade "Ver São Paulo" → /estado/sp, emergência (190/192/193), FAQ 10 perguntas, Navegue por intenção (DDD 11, Cidades do DDD 11, DDD de São Paulo), Território ligado com lista de cidades vizinhas.

### Cenário B — município SEM ficha (/cidade/sp/aracariguama) — EXATO screenshot do utilizador
Comportamento confirmado: mostra "Araçariguama além do DDD" com 3 cartões de atalhos Google Maps (Pontos turísticos, Bares e restaurantes, Transporte público), Códigos nacionais de emergência + Sugerir alteração local, 190/192/193, FAQ 10 perguntas e Navegue por intenção. É o fallback correto do LocalityContext enquanto não há ficha. 22.314 habitantes, DDD 11, sem erros de hidratação/renderização.

### Conclusão do teste
Tudo funciona como desenhado. O utilizador viu o Cenário B porque Araçariguama ainda não tem ficha editorial — das 5.570 cidades, apenas ~24 têm fichas (AC 2, SC 2, AL/AM/BA/CE/GO/MA/MG/MS/MT/PA/PE/PI/PR/RJ/RN/RO/RS/SE/SP/TO 1 cada). A geração em massa para amanhã 06:00 BRT (tarefa PW66RMcon4WDl815DcI966) quando a quota repor.

### Pendente
Tab "Clima e região" não testada por cliques devido a erros transitórios do browser (mas está no catálogo e renderiza pelo mesmo caminho do SSR, já verificada em screenshots anteriores: Köppen, temperatura, precipitação, bioma). Fallback não tinha nota "em construção" — oferecido ao utilizador como melhoria.

Tab "Clima e região" validada com sucesso: Köppen Cfa (Húmido subtropical), temperatura média 19,4 °C, precipitação 1.356 mm, observação regional, fontes ibge.gov.br e climate-data.org.

TESTE DE NAVEGAÇÃO COMPLETO E VALIDADO — 4/4 tabs funcionais (Pontos turísticos, Bares e restaurantes, Transporte, Clima e região), fallback sem ficha confirmado (Araçariguama), navegação interna cidade→estado /ddd/11 /estado/sp OK. Pronto para resposta ao utilizador.

## Plano de enriquecimento de links (pedido utilizador 13/08)
Política: links externos APENAS governamentais (gov.br, IBGE, ANATEL) + grandes autoridades (climate-data.org p/ clima). NUNCA terceiros fracos (sinart.com.br, rome2rio.com, metrocptm.com.br). Internos: termos territoriais ("São Paulo" → /estado/sp, DDD → /ddd/XX, região → /regiao/XX).

Componentes a alterar:
1. client/src/components/MunicipalityTabs.tsx — renderiza tabs; precisa de: (a) intro/body com termos linkáveis (stateName, "IBGE", "ANATEL", "Região Sudeste"); (b) link climate-data.org na tab clima; (c) ficha: já tem mapHref nos items (pontos turísticos → Google Maps query OK).
2. shared/localityTabs/types.ts — campos novos opcionais (regionHref?, climateSourceHref?, ibgeHref?, anatelHref?, stateHref?) ou enriquecer via props computadas.
3. MunicipalityPage.tsx — texto topo "Osasco é um município de São Paulo. O código... DDD 11" → linkar São Paulo (estado) e DDD; "habitantes · IBGE 2025" → link IBGE.
4. generateTabs.mts — whitelist de fontes permitidas no prompt (bloquear sinart/rome2rio/metrocptm) — ajustar system prompt p/ novas fichas.
5. integrateTabs.mts — sanitizar fichas existentes: remover mapHref/URLs com domínios fora da whitelist (permitir: google.com/maps, gov.br, ibge.gov.br, anatel, climate-data.org).
6. Página de estado (StatePage) e DDD page: linkar termos de região/municípios/intro.

Fonte clima: https://en.climate-data.org (climate-data.org) — autoridade grande, aceitável p/ clima.

## Progresso enriquecimento links (13/08, em curso)
FEITO:
- shared/externalLinks.ts criado: ALLOWED_EXTERNAL_HOSTS (gov.br, google.com/maps, en/pt.climate-data.org), isAllowedExternal, sanitizeExternalLinks (remove hrefs/mapHref proibidos), OFFICIAL_URLS (ibgeCity(uf,slug), ibgeStates, anatelNumeracao, anatelEmergency, climateData(uf,city)=pt.climate-data.org/america-do-sul/brasil/{uf}/{city}/).
- shared/localityTabs/types.ts: ClimateTab ganhou `source?: { label, href }`.
- MunicipalityTabs.tsx: tab Transporte tem link ANATEL; tab Clima renderiza `tabs.climate.source` (Climate-Data) quando allowed; import OK. AINDA FALTA no componente: não usado `linkRegion`/`linkState` nem `linkIbge` — decidir formato (usar dangerouslySetInnerHTML ou <Link>).

A FAZER:
1. MunicipioTabs: linkar termo do estado ("São Paulo") no texto topo → <Link href={`/estado/${uf}`} className=underline>; link "IBGE, 2025" → ibge.gov.br cidades; link estado na card autoridade já existe.
2. MunicipalityPage.tsx linha 67: substituir o parágrafo topo para incluir <Link href={`/estado/${uf}`} > por "São Paulo" e link IBGE no badge de habitantes.
3. integrateTabs.mts: adicionar sanitizeExternalLinks a todos os catálogos ANTES de escrever; adicionar climate.source = { "Climate-Data.org", OFFICIAL_URLS.climateData(uf, city) } para fichas com intro/body de clima.
4. generateTabs.mts: prompt com whitelist de fontes (apenas gov.br, ibge.gov.br, anatel, climate-data.org; NUNCA sinart/rome2rio/metrocptm/buson/tripadvisor/climatempo/weatherspark); adicionar climate.source no schema (objeto {label,href}).
5. StatePage.tsx: link IBGE no badge habitantes (https://www.ibge.gov.br/cidades-e-estados.html), link região no breadcrumb (hub regional /regiao/{região-slug} se existir — verificar rota; se não, linkar texto), linkar nome do estado na intro.
6. DddDetail.tsx: PRIORITY_DDD_EDITORIAL já tem link IBGE; linkar o nome do estado no summary → Link interno /estado/{uf} (transformar string? usar render de React nos cards de curiosidade já tem link IBGE).
7. LocalityContext.tsx: já linka gov.br/ANATEL; mapa com query regional OK.
8. Testes: verificar isAllowedExternal + sanitizeExternalLinks; testes de hidratação com MunicipalityTabs com source; TypeScript; 82+ testes.
9. Checkpoint.

FONTE-TERCEIROS-ATUAIS-PROIBIDAS nos TS: sinart.com.br, rome2rio.com, metrocptm.com.br, climatempo.com.br, weatherspark.com, buson.com.br, visitealagoas.com.br, viagensecaminhos.com, tripadvisor.com.br, ipatrimonio.org, even3.com.br, britannica.com, aenabrasil.com.br, tarauaca.ac.gov.br (gov municipal OK! manter .ac.gov.br/.sp.gov.br/.al.gov.br = gov.br), penedo.al.gov.br (manter), osasco.sp.gov.br (manter), dados.al.gov.br (manter), rodoviaria.de (remover), reportermaceio.com.br (remover), destinopenedo.com.br (remover), tripsardou.com (remover), g1.globo.com (remover), pt.wikipedia.org (remover? é grande autoridade mas não gov — remover para segurança), ibge.gov.br/cidades.ibge.gov.br (manter), en.climate-data.org (manter).
REGRA FINAL: manter APENAS *.gov.br, google.com/maps, ibge.gov.br, anatel e climate-data.org. Tudo o resto remove-se (o sanitizeExternalLinks deve aceitar regex /\.gov\.br$/ que já cobre ac/sp/al + ibge/anatel... ATENÇÃO: regex /\.gov\.br$/ já cobre ibge.gov.br e anatel.gov.br — ok).
g1.globo.com e wikipedia: remover via regex.

## Estado enriquecimento links (20:47 13/08)
FEITO ATÉ AGORA:
- shared/externalLinks.ts: whitelist gov.br+google.com/maps+en/pt.climate-data.org; isAllowedExternal; sanitizeExternalLinks; OFFICIAL_URLS (ibgeCity(uf,slug), ibgeStates, anatelNumeracao, anatelEmergency, climateData(uf,city)).
- types.ts: ClimateTab.source?: {label,href}.
- MunicipalityTabs.tsx: link ANATEL na tab Transporte; render de tabs.climate.source (Climate-Data) quando allowed. (Nota: linkRegion definido mas NÃO usado — remover ou usar.)
- MunicipalityPage.tsx: links internos no parágrafo topo (nome do estado e região → /estado/{uf}; DDD → /ddd/{ddd}); badge habitantes → ibge.gov.br cidades-e-estados.
- StatePage.tsx: link ANATEL na intro; badge habitantes → ibge.gov.br.
- integrateTabs.mts: enrich climate.source (Climate-Data.org, pt.climate-data.org/america-do-sul/brasil/{uf}/{slug}/) + sanitizeExternalLinks sobre valores; regenerou os 24 municípios. RESULTADO: fontes agora só gov.br, google.com/maps, ibge.gov.br, climate-data.org — confirmado por grep.
- generateTabs.mts: schema exige climate.source {label,href}; PROMPT com regra de fontes (apenas gov.br, ibge.gov.br, climate-data.org; NUNCA rome2rio/tripadvisor/climatempo/sinart/weatherspark/wikipedia/g1/buson/aenabrasil).
- server/externalLinks.test.ts: 4 testes — 3 passam, 1 falha (sanitize com source proibido foi PRESERVADO — bug: sanitizeExternalLinks trata obj com k="source" como genérico e recursa; não remove "source" com href proibido porque só omite quando k==="href" ou k==="mapHref"). CORRIGIR: no sanitize, se o valor é um objeto com chave href e a chave atual for "source", tratar igual a href.

AINDA A FAZER:
1. Corrigir sanitizeExternalLinks (source é um objeto {label,href} — o href interno não é omitido). Testar de novo.
2. Remover linkRegion não usado de MunicipalityTabs (ou aplicar underline ao termo estado nos bodies — decisão: remover, não usar, manter simples).
3. Reintegrar catálogos após correção (pnpm tsx scripts/integrateTabs.mts).
4. Correr todos os testes pnpm test + npx tsc --noEmit.
5. Validar SSR /cidade/sp/osasco (tabs com fontes novas) e /estado/sp.
6. Checkpoint + resultado ao utilizador.
Geração em massa agendada p/ 14/08 06:00 BRT continua de pé (regenera só municípios --only-empty com novo schema? ATENÇÃO: o generateTabs --only-empty usa catalog existente; JSON antigo dos 24 não tem climate.source — o generateTabs precisa tolerar ausência de source nos JSONs antigos (adicionar cleanArtifacts/merge não é problema pois o campo só é exigido no RESPOSTA nova; JSON antigo não vai a LLM). OK.

## Estado (20:50 13/08) — renderização dos links markdown no corpo
PROBLEMA ATUAL: o body/intro das tabs vem com links em formato markdown literal "[ibge.gov.br](url)" porque o MunicípioTabs renderiza {text} como texto literal (não como markdown). No browser apareceu "( [ibge.gov.br](https://...) )" como texto feio.
SOLUÇÃO EM ANDAMENTO: criar função renderMarkdownLinks(text) em externalLinks.ts (ou no MunicípioTabs) que converte [t](url) → <a href="url" target=_blank rel=noreferrer className="underline decoration-[#f06a4d]/60 underline-offset-4 hover:text-[#f06a4d]">t</a> quando url permitida; aplicá-la ANTES do linkRegion nos dangerouslySetInnerHTML das intros/closings/bodies E nas descriptions dos items (linhas 50, 70, 90).
Linhas MunicípioTabs: 42, 50, 56, 61, 70, 76, 81, 90, 102, 108, 117.
linkRegion usa replace de primeira ocorrência do stateName no texto — se aplicá-la após renderMarkdownLinks, OK.
RESTANTE: aplicar, testes (86 passando), tsc, screenshot, checkpoint.
URL dev preview: https://3000-ime81yg4uucc1zjxbudoc-3afe6446.us3.manus.computer
URL prod Manus: https://dddbrazil-jbfgdfkn.manus.space
meuddd.com.br é Vercel (build antigo).
