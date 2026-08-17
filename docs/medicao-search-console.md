# Medição de cobertura orgânica — Meu DDD

**Propriedade prioritária:** `meuddd.com.br` (propriedade de domínio no Google Search Console)  
**Cobertura:** domínio sem `www`, `www`, HTTP e HTTPS  
**Estado verificado em 12 de agosto de 2026:** propriedade de domínio e propriedade `https://www.meuddd.com.br/` já verificadas por provedor de domínio. Não criar um novo TXT ou uma metatag apenas para repetir essa validação.

> A propriedade de domínio é a referência operacional porque agrega protocolos e subdomínios. O Google mantém a verificação enquanto consegue validar o token; remover o método de verificação pode fazer as permissões expirarem. [1]

## Inventário de descoberta a submeter

Na secção **Sitemaps** da propriedade `meuddd.com.br`, submeter `https://www.meuddd.com.br/sitemap.xml`. O índice já referencia os inventários programáticos de estados, DDDs, municípios, guias, regiões, páginas institucionais, imagens e capitais.

## Evidência observada no Search Console

Em **12 de agosto de 2026**, a captura fornecida pelo responsável da propriedade confirmou que a submissão já havia sido feita e que os registos abaixo estavam no estado **Processado**, com última leitura na mesma data. Não foi efetuado um reenvio redundante.

| Sitemap                 | Estado observado | Páginas encontradas |
| ----------------------- | ---------------: | ------------------: |
| `/sitemap.xml`          |       Processado |                 126 |
| `/sitemaps/cidades.xml` |       Processado |               5.571 |
| `/sitemaps/ddds.xml`    |       Processado |                  67 |
| `/sitemaps/estados.xml` |       Processado |                  27 |
| `/sitemaps/guias.xml`   |       Processado |                  32 |

Os inventários adicionais de regiões, institucional, imagens e capitais permanecem publicados no índice. Devem ser acompanhados na leitura seguinte do Search Console, sem necessidade de criar uma nova propriedade ou de adicionar mecanismos de verificação duplicados.

| Artefacto                       | Objetivo de medição                                                  | Sinal a observar                                          |
| ------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| `/sitemap.xml`                  | Ponto de entrada único da descoberta                                 | Estado de leitura e última data de processamento          |
| Sitemaps territoriais           | Cobertura dos pilares de estado, DDD, municípios, regiões e capitais | URLs descobertas e páginas indexadas                      |
| Sitemap editorial/institucional | Cobertura de guias, blog e transparência institucional               | URLs indexadas e impressões por conteúdo                  |
| `/feed.xml`                     | Descoberta complementar das atualizações do Blog                     | Presença em rastreamentos externos; não substitui sitemap |
| Chave IndexNow                  | Aviso a motores participantes sobre URLs efetivamente alteradas      | Resposta da submissão e auditoria de URLs enviadas        |

## Rotina de acompanhamento

Na primeira semana após a submissão, confirmar se o Search Console apresenta o sitemap como lido e se começa a reportar URLs descobertas. É normal que os dados de uma propriedade iniciem a acumulação apenas depois de alguns dias. [1]

| Frequência                | Relatório               | Leitura recomendada                                       | Ação orientada por evidência                                       |
| ------------------------- | ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| Semanal                   | **Indexação → Páginas** | Motivos de exclusão, páginas rastreadas e indexadas       | Corrigir apenas erros reproduzíveis; não forçar indexação em massa |
| Semanal                   | **Sitemaps**            | Estado, leitura e erros por inventário                    | Confirmar que cada sitemap segmentado continua acessível em HTTPS  |
| Quinzenal                 | **Desempenho**          | Cliques, impressões, CTR e posição por consulta/página    | Identificar clusters de intenção com muitas impressões e CTR baixo |
| Mensal                    | **Inspeção de URL**     | Páginas-pilar de DDD, estado, município, região e capital | Validar a URL canónica, renderização e última rastreabilidade      |
| Após publicação relevante | Índice + IndexNow       | Atualização da URL e receção pelo endpoint                | Submeter somente URLs que foram criadas ou alteradas de facto      |

## Segmentos recomendados

Para obter leituras acionáveis, comparar páginas por tipo: `/ddd/`, `/estado/`, `/cidade/`, `/regiao/`, `/capitais`, `/blog/` e páginas institucionais. Em cada segmento, separar **consultas de navegação**, **consultas factuais** e **consultas informacionais**. Isto evita comparar páginas de intenção diferente e ajuda a priorizar melhoras de título, resposta rápida, ligações internas e conteúdo local atribuído.

O painel deve conservar uma linha de base do primeiro mês, em vez de inferir conclusões a partir de poucos dias de dados. A inspeção individual deve concentrar-se nas páginas que o sitemap efetivamente declara e que respondem com `200`, URL canónica HTTPS e HTML SSR.

## Referências

[1]: https://support.google.com/webmasters/answer/9008080?hl=pt-BR "Google Search Console — O que é a verificação de propriedade?"
