# Auditoria inicial de indexação — URLs prioritárias

**Data:** 12 de agosto de 2026  
**Objetivo:** separar a disponibilidade técnica atual da presença efetiva no índice Google para as URLs sugeridas pelas consultas históricas.

## Evidência técnica pública

Em consulta HTTP direta ao domínio canónico, as URLs abaixo responderam com **HTTP 200**, `<title>`, `canonical` HTTPS autorreferente e sem sinal `noindex` na resposta entregue. Isto confirma que são candidatas recuperáveis e não devem ser recriadas noutra URL.

| Consulta histórica                      | URL canónica atual                    | Evidência técnica                       |
| --------------------------------------- | ------------------------------------- | --------------------------------------- |
| `ddd 63`, `ddd 63 qual estado`, `ddd63` | `https://www.meuddd.com.br/ddd/63`    | HTTP 200; canónica autêntica; indexável |
| `ddd 96`                                | `https://www.meuddd.com.br/ddd/96`    | HTTP 200; canónica autêntica; indexável |
| `ddd 86 qual estado`                    | `https://www.meuddd.com.br/ddd/86`    | HTTP 200; canónica autêntica; indexável |
| `ddd tocantins`                         | `https://www.meuddd.com.br/estado/to` | HTTP 200; canónica autêntica; indexável |
| `ddd alagoas`                           | `https://www.meuddd.com.br/estado/al` | HTTP 200; canónica autêntica; indexável |
| `gerador de telefone`                   | `https://www.meuddd.com.br/gerador`   | HTTP 200; canónica autêntica; indexável |

As formas `/estado/tocantins` e `/estado/alagoas` devolvem 404 com `noindex,follow`; não são as URLs canónicas da plataforma e não devem ser promovidas ou recriadas. As páginas estaduais usam a UF: `/estado/to` e `/estado/al`.

## Sinal público do Google

As consultas exatas no Google por `site:www.meuddd.com.br/ddd/63` e `site:www.meuddd.com.br/gerador`, realizadas no navegador autenticado da propriedade, não devolveram resultados em 12 de agosto de 2026. Isto é um sinal forte de que estas URLs podem não estar indexadas atualmente, mas uma consulta `site:` não substitui a inspeção de URL no Search Console.

| URL        | Resultado da consulta `site:`   | Conclusão segura                                              |
| ---------- | ------------------------------- | ------------------------------------------------------------- |
| `/ddd/63`  | Nenhum documento correspondente | Indício de ausência no índice; confirmar por Inspeção de URL. |
| `/gerador` | Nenhum documento correspondente | Indício de ausência no índice; confirmar por Inspeção de URL. |

Foi tentado um deep link para a Inspeção de URL da propriedade de domínio, mas a rota devolveu 404 no serviço do Google. Este resultado não diz respeito à URL auditada; a confirmação deve ser feita na interface: abrir **Inspeção de URL**, colar a URL canónica e ler o estado “A URL está no Google” ou o motivo de exclusão.

## Inspeção de URL confirmada no Search Console

Na interface autenticada da propriedade de domínio, as inspeções realizadas em **12 de agosto de 2026** mostraram que as duas URLs com maior prioridade ainda não estão no índice. A disponibilidade pública atual continua correta; portanto, estes estados refletem o histórico que o Google conserva, e não uma razão para recriar a página noutra rota.

| URL        | Estado informado pelo Search Console                                | Sinal de rastreamento                                                                                                              | Leitura operacional                                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/ddd/63`  | “A página não está indexada: O Google não reconhece o URL”          | Sem sitemap ou página de referência detetados; último rastreamento N/D                                                             | A URL deve receber enlaces internos contextuais e ser solicitada para indexação somente após revisão material.                                                                        |
| `/ddd/96`  | “A página não está indexada: O Google não reconhece o URL”          | Sem sitemap ou página de referência detetados; último rastreamento N/D                                                             | Aplicar o mesmo tratamento: conteúdo útil, enlaces internos e solicitação de indexação posterior à atualização.                                                                       |
| `/gerador` | “A página não está indexada: Bloqueada devido a outro problema 4xx” | Último rastreamento em 4 de julho de 2026 por Googlebot Smartphone; teste atual devolveu erro temporário no próprio Search Console | O 4xx é histórico. Como a URL pública responde HTTP 200 hoje, não a recriar; confirmar novamente o teste publicado quando o serviço do Google normalizar e então solicitar indexação. |

O teste em tempo real do `/gerador` devolveu “Ocorreu um erro” em 12 de agosto de 2026. Este resultado não prova um novo 4xx no domínio: a consulta HTTP pública do mesmo momento devolveu HTTP 200. A ação correta é aguardar e repetir o teste do URL publicado, em vez de interpretar o erro temporário do Search Console como falha do conteúdo.

## Decisão operacional provisória

Não recriar estas páginas. As rotas corretas já existem, entregam HTML SSR indexável e preservam canonicais estáveis. O procedimento recomendado é melhorar a utilidade do conteúdo na URL atual, inspecioná-la no Search Console e solicitar indexação **somente depois** de publicar uma alteração material e útil. A confirmação final de indexação necessita da dimensão **Páginas** do Search Console ou da inspeção das URLs individuais.
