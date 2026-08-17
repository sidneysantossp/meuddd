# Auditoria de descoberta e dados estruturados

## Regras verificadas

O índice de sitemaps deve ficar na raiz, usar URLs absolutas e listar apenas URLs canónicas, indexáveis e realmente úteis. Um sitemap individual pode conter até 50 000 URLs ou 50 MB não comprimidos; para uma plataforma territorial, os ficheiros devem ser segmentados por tipo de página e, quando necessário, por UF ou por intervalo de código IBGE. O campo `lastmod` só será emitido quando refletir uma modificação verificável no conteúdo da página. O Google ignora `priority` e `changefreq`. [1]

Para recursos generativos do Google, não existe um markup Schema.org especial nem requisito de `llms.txt`. A elegibilidade depende de conteúdo rastreável, indexável, não duplicado, útil e com uma estrutura técnica clara. A arquitetura deve evitar a geração de páginas quase idênticas para variações de consulta. [2]

`LocalBusiness` descreve um negócio local real, com propriedades como endereço, horários e telefone. O DDD Brasil não deve marcar cada cidade, estado ou DDD como `LocalBusiness`, pois essas páginas são guias informacionais e não perfis de empresas locais. Esse tipo só será apropriado numa página institucional do próprio DDD Brasil caso a organização tenha presença comercial local verificável. [3]

Embora as perguntas frequentes visíveis continuem úteis para leitores, a documentação do Google retirou o recurso de rich results de FAQ em 2026. Por isso, as FAQs permanecem em HTML semanticamente organizado, mas a plataforma não deve depender de `FAQPage` como estratégia de resultados avançados ou de AI Overviews. [4]

## Estrutura recomendada

| Índice                       | Conteúdo                             | Particionamento de escala                                               |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `/sitemap.xml`               | Índice-raiz, apenas ficheiros filhos | Um índice por tipo de conteúdo                                          |
| `/sitemaps/estados.xml`      | 27 páginas-pilar estaduais           | Um único ficheiro                                                       |
| `/sitemaps/ddds.xml`         | Páginas de códigos DDD               | Um único ficheiro enquanto permanecer abaixo do limite                  |
| `/sitemaps/cidades-{uf}.xml` | Páginas municipais                   | Um ficheiro por UF; dividir novamente por faixa de IBGE acima do limite |
| `/sitemaps/guias.xml`        | Guias e artigos editoriais           | Um ficheiro por tipo ou ano quando crescer                              |

Cada URL listada deve responder com `200`, incluir `rel=canonical` para si própria, não ter `noindex` e apresentar no HTML inicial o título, o conteúdo principal e o JSON-LD correspondente. Páginas de erro, pesquisa interna e combinações de filtros não entram no sitemap.

## Marcação recomendada por rota

| Tipo de página | JSON-LD principal                | Complementos                                                                                                    |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Estado         | `CollectionPage` ou `WebPage`    | `BreadcrumbList`, `ItemList` para DDDs e municípios de destaque, `AdministrativeArea` como entidade territorial |
| Município      | `WebPage`                        | `BreadcrumbList`, `City` ou `AdministrativeArea`, `GeoCoordinates` e `DefinedTerm` para o DDD                   |
| DDD            | `DefinedTerm` + `CollectionPage` | `BreadcrumbList`, `ItemList` de municípios e referência aos estados cobertos                                    |
| Guia editorial | `Article`                        | `BreadcrumbList`, `Speakable` apenas se o conteúdo atender às condições da propriedade e for validado           |

As entidades devem conter apenas factos visíveis e verificáveis. Para população, clima ou turismo, a página deve conservar fonte, data e período de referência; os mesmos dados podem aparecer no JSON-LD apenas se também estiverem explícitos no conteúdo visível.

## Resultado da validação local

Em 11 de agosto de 2026, a validação direta do servidor confirmou uma hierarquia com **4 sitemaps de primeiro nível**, um índice de municípios com **27 sitemaps por UF** e **645 URLs municipais no ficheiro de São Paulo**. As rotas `/estado/sp`, `/cidade/sp/sao-paulo` e `/ddd/11` responderam com título, canonical, JSON-LD e ligações HTML para as respetivas páginas relacionadas. A verificação de tipo, os testes unitários e o build SSR também foram concluídos sem erros.

As FAQs continuam visíveis nas páginas, mas o JSON-LD foi simplificado para refletir a depreciação de FAQ rich results. As rotas territoriais passam a usar `CollectionPage` ou `WebPage`, `BreadcrumbList`, `AdministrativeArea` ou `City`, e `DefinedTerm` para códigos DDD; todos os identificadores e URLs desse JSON-LD são serializados como URLs absolutas no HTML SSR.

## Referências

[1] [Google Search Central — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

[2] [Google Search Central — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

[3] [Google Search Central — Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

[4] [Google Search Central — Documentation updates: depreciação de FAQ rich results](https://developers.google.com/search/updates)
