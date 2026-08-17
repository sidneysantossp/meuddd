# Varredura SEO — Páginas Principais da Plataforma

**Data:** 13 de agosto de 2026
**Escopo:** Home, páginas de DDD (`/ddd/11`, `/ddd/21`), página de estado (`/estado/sp`), páginas de município (`/cidade/sp/osasco`, `/cidade/sp/aracariguama`), hub regional (`/regiao/sudeste`) e guias editoriais (`/guia/o-que-e-ddd`).

## 1. O que já estava bem implementado

A varredura confirmou que a base de SEO on-page já está sólida nas páginas principais:

| Elemento                                              | Estado | Observação                                                                                 |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `<title>` único por página                            | Bom    | Padrão "DDD 11 — São Paulo", "Araxá — MG", etc.                                            |
| Meta description                                      | Bom    | Gerada por página com foco na palavra-chave local                                          |
| Canonical                                             | Bom    | Já existia em todas as páginas principais (o `<link rel="canonical">` é injetado pelo SSR) |
| JSON-LD (FAQPage, LocalBusiness, Article, ItemList)   | Bom    | Presente nas páginas de estado, município e guias                                          |
| Heading hierarchy (H1 único + H2s)                    | Bom    | Revisada e reforçada                                                                       |
| Links internos (malha cidade → estado → DDD → região) | Bom    | Reforçado nesta sessão com 4+ links internos por página municipal                          |
| Links externos de autoridade                          | Bom    | IBGE, ANATEL, climate-data.org, Google Maps filtrado                                       |
| Performance                                           | Bom    | HTML leve (~130 KB reduzido com setas tipográficas), ativos estáticos em `/assets/`        |

## 2. Oportunidades identificadas e implementadas

### 2.1. Falta de `og:image` nas páginas (impacto alto — redes sociais)

Nenhuma página tinha imagem de partilha Open Graph, o que prejudica a exibição quando o link é partilhado no WhatsApp, X, Facebook ou LinkedIn. **Corrigido:**

- Imagem de partilha genérica (1440×810, padrão recomendado do Open Graph) aplicada a **todas as páginas** via SSR.
- Cada guia editorial passou a ter a sua própria imagem de partilha (hero do artigo) quando existe.

### 2.2. URL `/blog` devolvia 404 (impacto médio — tráfego direto e menções)

O menu e o footer usam a palavra "Blog", mas a rota real é `/guias`. Acessos diretos a `/blog` (de utilizadores, menções ou bots) caíam em página não encontrada. **Corrigido:**

- Redirecionamento interno `/blog → /guias`.
- Canonical de `/blog` aponta para `/guias`, consolidando o sinal para os motores de busca.

### 2.3. H1 e texto editorial das páginas de DDD (impacto médio — relevância de palavra-chave)

O H1 era genérico e o parágrafo de abertura não ligava ao estado. **Melhorado:**

- H1 agora inclui o número de cidades: "DDD 11: 64 cidades atendidas" (estrutura "DDD + quantidade" alinhada com buscas).
- Texto de abertura com link interno para o pilar estadual ("São Paulo" → `/estado/sp`).

### 2.4. Hub regional sem links internos nos estados (impacto médio — autoridade)

O parágrafo da região listava os estados sem links. **Melhorado:**

- Cada estado do hub regional (ex.: `/regiao/sudeste`) agora linka diretamente para o respetivo pilar estadual.

## 3. Oportunidades ainda não exploradas (para o futuro)

| Oportunidade                                                                                                              | Benefício                                                                                                            | Esforço    |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Sitemap XML fracionado** — dividir o sitemap em sitemaps por tipo (DDD, estado, município, guia) com `lastmod` dinâmico | Indexação mais rápida das páginas novas; os motores de busca priorizam sitemaps menores e frequentemente atualizados | Médio      |
| **Schema `BreadcrumbList`** em todas as páginas                                                                           | Rich snippets de breadcrumb na SERP                                                                                  | Baixo      |
| **Sitemaps `index` com `image`** nos guias editoriais                                                                     | Indexação de imagens dos artigos                                                                                     | Baixo      |
| **`<link rel="alternate" hreflang="pt-BR">`** se houver expansão regional (PT-PT atual)                                   | Sinalização correta do público-alvo brasileiro                                                                       | Baixo      |
| **Conteúdo long-form nas páginas de município pendentes** — aguardar a geração em massa (14/08 06:00 BRT)                 | Resolver as ~5.500 páginas com baixa proporção texto/HTML apontadas pela Semrush                                     | Automático |
| **Links internos "cidades vizinhas"** nas páginas de município                                                            | Malha de vizinhança geográfica já existe nos cartões; pode ser reforçada com parágrafo contextual                    | Baixo      |
| **Monitorização de cobertura no Search Console** após a reindexação                                                       | Medir a recuperação de impressões dos termos históricos (março)                                                      | Baixo      |
| **`Article` JSON-LD nas páginas DDD e estado**                                                                            | Consistência de sinal editorial para AI Overviews                                                                    | Baixo      |

## 4. Validação

- **Testes:** 86 testes a passar, TypeScript sem erros.
- **SSR verificado via HTTP:** `og:image`, canonical e og:description presentes em `/ddd/11` e `/blog`; imagem de partilha servida com 200.
- **Visual:** screenshots de `/ddd/11`, `/regiao/sudeste`, `/guia/o-que-e-ddd` e `/blog` confirmados.
- **Publicação:** checkpoint 2d08030 auto-publicado em produção; commit `5cc9177` no GitHub (branch main).
