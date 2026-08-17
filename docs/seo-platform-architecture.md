# Arquitetura programática — DDD Brasil

## 1. Objetivo editorial

O DDD Brasil deve responder a uma dúvida territorial concreta com informação rastreável, verificável e navegável: **qual é o DDD de uma cidade, que cidades pertencem a um DDD e quais DDDs existem num estado**. O crescimento não será baseado na multiplicação de variações de palavras-chave, mas em páginas com entidades e dados distintos, ligações internas úteis e fontes declaradas.

> A unidade de publicação é uma entidade territorial ou de telefonia real, e não uma combinação artificial de termos de pesquisa.

| Entidade      | URL canónica           | Intenção principal                       | Fonte-base                 | Estado de indexação          |
| ------------- | ---------------------- | ---------------------------------------- | -------------------------- | ---------------------------- |
| Portal        | `/`                    | Encontrar um DDD ou município            | Base territorial           | Indexável                    |
| Estado        | `/estados/{uf}`        | Explorar DDDs e municípios de uma UF     | IBGE + base de DDD         | Indexável                    |
| Município     | `/cidades/{uf}/{slug}` | Identificar o DDD e o contexto local     | IBGE + base de DDD         | Indexável                    |
| DDD           | `/ddd/{codigo}`        | Ver área de numeração, estados e cidades | Base de DDD                | Indexável                    |
| Guia temático | `/guias/{slug}`        | Responder a uma dúvida de telefonia      | Conteúdo editorial revisto | Indexável                    |
| Busca/filtro  | `/?q={consulta}`       | Consulta transitória                     | Base territorial           | `noindex`, canónica para `/` |

## 2. Camadas de dados

| Camada             | Dados                                                          | Regra de qualidade                                                                                               |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Núcleo territorial | Código IBGE, município, UF, região, coordenadas, fuso e DDD    | Importação reexecutável, código IBGE como chave, validação de cobertura e duplicidade                            |
| Estatística        | População estimada e ano de referência; área quando disponível | Valor, data de referência e URL da fonte armazenados junto com o dado                                            |
| Contexto editorial | Clima, pontos de interesse, síntese local e notas de telefonia | Apenas conteúdos com fonte, revisão e data de atualização; ausência de dado não é substituída por texto genérico |
| Descoberta         | Títulos, descrições, ligações, breadcrumbs, sitemap e JSON-LD  | Derivados da entidade e auditáveis por rota                                                                      |

O dado populacional deve usar a tabela municipal do IBGE com ano de referência explícito. Dados de clima e turismo são editoriais: serão apresentados apenas quando houver fonte municipal, estadual, federal ou técnica disponível para aquela entidade.

## 3. Componentes por tipo de página

### Página de estado

1. H1 descritivo: “DDD de {Estado}: códigos e cidades”.
2. Resumo factual: UF, região, população, ano e fonte.
3. Mapa interativo da UF e seleção de municípios.
4. Índice completo e paginado de municípios, com hiperligações HTML.
5. Índice de DDDs presentes no estado, com respetivas páginas.
6. Secção de contexto territorial, apenas com fontes editoriais verificadas.
7. Perguntas frequentes visíveis sobre DDD e telefonia local.
8. Breadcrumb, data de atualização e fontes.

### Página de município

1. H1 descritivo: “DDD de {Município} ({UF})”.
2. Resposta direta no primeiro bloco: código DDD e ligação para o índice do DDD.
3. Ficha local: estado, região, coordenadas, fuso, população e referência.
4. Mapa com ponto geográfico e ligação ao mapa do estado.
5. Ligações para o estado, cidades vizinhas no mesmo DDD e guia de telefonia relevante.
6. Contexto editorial local e FAQ somente quando houver conteúdo específico e aprovado.

### Página de DDD

1. H1 descritivo: “DDD {Código}: cidades e estados atendidos”.
2. Estados abrangidos e total de municípios.
3. Índice completo de municípios, agrupado por UF.
4. Mapa e ligação aos pilares estaduais.
5. FAQ de telefonia baseado em resposta editorial comum, mas com referências locais no corpo.

## 4. SEO técnico e rastreabilidade

As rotas indexáveis serão servidas por SSR com conteúdo, título, descrição, `rel=canonical`, Open Graph e JSON-LD presentes na primeira resposta HTML. A hidratação acrescenta interatividade, mas não é necessária para ler a resposta central, os links ou a ficha territorial.

Cada rota terá um único URL canónico e consistência entre `canonical`, Open Graph, breadcrumbs, links internos e sitemap. Filtros de interface, sugestões de pesquisa e variantes com parâmetros não criam páginas indexáveis. Todas as páginas prioritárias serão acessíveis por ligações `<a>` HTML a partir de pelo menos uma página de índice.

O sitemap será segmentado por entidade: índice principal, estados, DDDs, municípios e guias. O `robots.txt` referenciará somente o índice de sitemap e não bloqueará recursos essenciais de renderização.

## 5. Dados estruturados por página

| Página    | JSON-LD principal          | JSON-LD complementar                                                        |
| --------- | -------------------------- | --------------------------------------------------------------------------- |
| Portal    | `WebSite` + `Organization` | `SearchAction` apenas se a ação de pesquisa for funcional e pública         |
| Estado    | `WebPage`                  | `BreadcrumbList`, `ItemList`, `Dataset` para a coleção territorial visível  |
| Município | `WebPage` + `Place`        | `BreadcrumbList`, `Dataset`; `FAQPage` apenas para FAQ visível e específica |
| DDD       | `WebPage`                  | `BreadcrumbList`, `ItemList`, `Dataset`; `FAQPage` quando aplicável         |
| Guia      | `Article`                  | `BreadcrumbList`, `FAQPage` se a secção estiver visível                     |

Os dados estruturados descrevem apenas conteúdo visível, com valores provenientes da base ou de fontes declaradas. A marcação `FAQPage` não será usada como promessa de resultado aprimorado: a política atual do Google já não exibe esse recurso de forma geral, mas o conteúdo de perguntas continua útil para visitantes.[1]

## 6. Processo editorial e de atualização

1. **Importar** dados territoriais e estatísticos com data e fonte.
2. **Gerar um rascunho factual** a partir de campos existentes, sem alegações não comprovadas.
3. **Enriquecer** apenas páginas com fontes e revisão editorial, atribuindo autor, fonte e data.
4. **Publicar** páginas com validação de HTML, metadados, JSON-LD e resposta SSR.
5. **Monitorizar** cobertura, indexação, consultas e páginas sem tráfego no Search Console.
6. **Atualizar** população e fatos territoriais conforme novas séries oficiais; preservar `dateModified` real.

## 7. Critérios de qualidade para lançamento programático

- A entidade existe, tem identificador estável e tem pelo menos uma resposta útil.
- A página contém dados próprios, não uma troca mecânica de nomes em texto idêntico.
- O título, H1, descrição, lista de ligações, mapa e dados estruturados representam a mesma entidade.
- Nenhuma página contém avaliações, testemunhos, atrações turísticas ou estatísticas inventadas.
- O conteúdo editorial tem fontes e explica como foi produzido quando houver automação significativa.
- Páginas sem valor editorial específico continuam acessíveis como ficha de DDD, mas não simulam um guia turístico ou climático.

## Referência

[1]: https://developers.google.com/search/docs/appearance/structured-data/faqpage?hl=pt-br "Atualizações da documentação de FAQPage — Google Search Central"
