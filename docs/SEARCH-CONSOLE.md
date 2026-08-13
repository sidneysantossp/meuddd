# Medição de Cobertura no Google Search Console

**Plataforma:** Meu DDD (https://www.meuddd.com.br)
**Data de preparação:** 13 de agosto de 2026
**Propriedade principal:** `www.meuddd.com.br` (verificada com prefixo, via Cloudflare)
**Propriedade de domínio:** `meuddd.com.br` (verificada por DNS — adicionar como secundária se necessário)

---

## 1. Porquê medir a cobertura

O objetivo da plataforma é transformar-se no principal recurso de busca de DDD do Brasil, cobrindo os **5.570 municípios**, os **27 estados** e os **67 códigos DDD**. A medição de cobertura no Search Console (GSC) é o único mecanismo oficial do Google para confirmar que estas páginas estão realmente a ser descobertas, rastreadas e indexadas. Sem medição, qualquer esforço de SEO em massa fica invisível e impossível de priorizar.

> Definição prática: **cobertura = páginas válidas indexadas ÷ páginas publicadas**. O relatório "Páginas" do GSC mostra, para cada URL, se está indexada, rastreada sem indexação, com erro de rastreamento ou excluída.

## 2. O que foi publicado para aceleração da indexação

| Artefacto | URL | Função |
|---|---|---|
| Sitemap index | `https://www.meuddd.com.br/sitemap.xml` | Índice principal apontado pelo `robots.txt` (`Sitemap: …/sitemap.xml`) |
| Sitemaps por tipo | `/sitemaps/estados.xml`, `ddds.xml`, `cidades-{uf}.xml` (27), `guias.xml`, `paginas.xml`, `regioes.xml`, `imagens.xml` | Fracionamento que permite ao Google rastrear cada cluster separadamente e medir cobertura por tipo |
| Sitemap de imagens | `/sitemaps/imagens.xml` | Indexação das ilustrações dos guias editoriais |
| Dados estruturados | Article, CollectionPage, FAQPage, BreadcrumbList, City, WebSite, SoftwareApplication (por rota, SSR) | Rich results e entendimento semântico por bots e plataformas de busca generativa |
| llms.txt | `/llms.txt` | Descoberta por crawlers de modelos generativos (ChatGPT, Gemini, Perplexity, Copilot) |
| Redirecionamentos | `/blog → /guias` (301-style client + canonical) | Consolidação de autoridade, evita páginas 404 |

## 3. Protocolo de medição (a executar 1 vez por semana)

1. **Enviar o sitemap**: no GSC, abrir a propriedade `www.meuddd.com.br` → "Sitemaps" → inserir `sitemaps/sitemap-index.xml` (o `sitemap.xml` na raiz funciona igualmente). Confirmar "Estado: êxito" e a contagem de URLs descobertas.
2. **Acompanhar "Páginas" (Cobertura)**:
   - Verificar o total de **Válidas** semanalmente.
   - Separar o relatório por filtro de prefixo para medir cada cluster: `/cidade/`, `/estado/`, `/ddd/`, `/guia/`, `/regiao/`.
   - Meta de curto prazo: >90% das 5.570 URLs de cidades válidas em 60 dias após o preenchimento editorial em massa.
3. **Monitorizar exclusões**:
   - "Página rastreada sem indexação": normal nas primeiras semanas; se persistir após 4 semanas, submeter URLs via API de Inspeção.
   - "Página com redirecionamento": deve ser ~0 (o único redirecionamento aceite é `/blog → /guias`).
   - "Erro de servidor (5xx)" ou "Página não encontrada (404)": corrigir de imediato.
4. **Verificar dados estruturados**: relatório "Aprimoramentos" → validar `FAQPage` e `Article` sem erros de validação; as rotas `/ddd/` e `/estado/` devem aparecer com rich results elegíveis.
5. **Desempenho**: correlacionar impressões com os clusters por URL ("Páginas" no separador Desempenho) para identificar quais municípios/estados geram procura real.

## 4. Estratégia de reindexação após queda de tráfego

O histórico do site mostra tráfego relevante em março de 2026 seguido de período offline. Para recuperar:

1. **Comparar antes/depois**: no GSC antigo (ou via export), identificar as URLs/queries que geravam mais impressões e cliques (o relatório apontou que grande parte do volume vinha de termos do gerador de números).
2. **Confirmar indexação**: pesquisar `site:meuddd.com.br/gerador` e `site:meuddd.com.br/ddd/11` no Google. Se não estiverem indexadas, submeter manualmente em "Inspeção de URL" → "Pedir indexação".
3. **Reforço de autoridade**: cada página de cidade já aponta para o pilar do estado (link interno obrigatório), e os sitemaps fracionados aceleram o rastreamento por cluster.
4. **IndexNow**: já autorizado via Cloudflare para notificação imediata de URLs novas/atualizadas (Bing + parceiros); o Google ignora o protocolo, dependendo do sitemap + "Pedir indexação".
5. **Não recriar conteúdo**: as páginas foram reconstruídas com os mesmos slugs. O Google reconhece o URL e o histórico da página é preservado; o esforço deve focar-se na aceleração do re-crawl, não na recriação.

## 5. Indicadores-alvo (dashboard semanal)

| Indicador | Meta 30 dias | Meta 90 dias |
|---|---|---|
| URLs válidas indexadas (todas) | 1.500 | 5.900+ |
| URLs de cidades indexadas | 800 | 5.570 |
| Cliques totais | +100% vs. baseline atual | recuperação do pico de março |
| Impressões em rich results (FAQ/Article) | presença confirmada | 20% das páginas com rich result |
| Páginas rastreadas sem indexação | <30% do total rastreado | <5% |

## 6. Avisos operacionais

- A propriedade principal do GSC é **com prefixo `www`**; todas as URLs dos sitemaps usam `https://www.meuddd.com.br` (canónica configurada no servidor). Não misturar propriedades.
- O servidor resolve o domínio canónico por `Host`: em produção o sitemap serve sempre URLs `https://www.meuddd.com.br`.
- O inventário do sitemap tem cache de 1 hora no servidor (`cachedInventory` em `server/_core/app.ts`); mudanças na base de dados podem demorar até 1 hora a refletir no sitemap.
- Depois da geração em massa dos municípios (agendada 14/08 06:00 BRT), voltar ao passo 1 deste protocolo e submeter o sitemap actualizado.
