# Diagnóstico de recuperação orgânica — Meu DDD

**Data:** 12 de agosto de 2026  
**Base analisada:** `Consultas.csv`, export de consultas do Google Search Console fornecido pelo responsável do site  
**Conclusão executiva:** há uma oportunidade real de recuperação; não é perda de tempo. O ficheiro mostra que o Google já associou o site a consultas de DDD e de geração de números, e que uma parcela material da procura ficou nas posições 7–20. A recuperação, contudo, não é automática nem pode ser prometida: deve ser tratada como uma revalidação de disponibilidade, indexação e relevância das URLs que já tinham sinais de procura.

> O ficheiro não contém dimensão de data, página, dispositivo, país ou série diária. Portanto, ele comprova procura histórica e posições agregadas, mas **não permite medir diretamente** a queda em março, a duração da indisponibilidade ou a velocidade de recuperação. Essas leituras devem ser extraídas no Search Console por comparação de períodos.

## Leitura do histórico de consultas

Depois de consolidar variações ortográficas e de acentos, o conjunto contém **928 consultas normalizadas**, que somaram **219.406 impressões**, **626 cliques**, CTR agregado de **0,29%** e posição média ponderada **10,69**. Isso é um sinal importante: o domínio não parte do zero. Já houve descoberta e ranking para consultas de procura real, mas a maior parte delas estava próxima do limiar da primeira página ou já no início da segunda página.

| Indicador do ficheiro              |     Resultado | Interpretação estratégica                                                                  |
| ---------------------------------- | ------------: | ------------------------------------------------------------------------------------------ |
| Consultas originais / normalizadas |   1.000 / 928 | Há variações relevantes a consolidar, sem depender de criar páginas duplicadas.            |
| Impressões / cliques               | 219.406 / 626 | A procura histórica é suficiente para justificar um plano de recuperação.                  |
| CTR agregado                       |         0,29% | Existe forte espaço para melhorar o encaixe entre resultado, intenção e página de destino. |
| Posição média ponderada            |         10,69 | Muitas consultas estavam na fronteira entre a primeira e a segunda página.                 |
| Consultas nas posições 7–20        |           577 | Concentraram 153.288 impressões, ou **69,86%** do total.                                   |

O sinal mais favorável é a distribuição de ranking. Apenas oito consultas estavam em posições 1–3, mas já produziam 104 cliques. Em contraste, 577 consultas nas faixas 7–20 tinham grande visibilidade, mas CTR muito baixo. Isto não é uma garantia de ganho; é, porém, um diagnóstico claro de que o trabalho deve começar nas URLs e intenções que o Google já testou, em vez de dispersar esforço em milhares de páginas sem procura comprovada.

| Faixa de posição | Consultas | Impressões | Cliques |   CTR |
| ---------------- | --------: | ---------: | ------: | ----: |
| 1–3              |         8 |      1.253 |     104 | 8,30% |
| 4–6              |        20 |      2.608 |      78 | 2,99% |
| 7–10             |       303 |     92.240 |     252 | 0,27% |
| 11–20            |       274 |     61.048 |      26 | 0,04% |
| 20+              |        93 |      7.124 |       9 | 0,13% |

## O que os dados sugerem — e o que não sugerem

As duas famílias territoriais — **cauda longa de DDD/estado/cidade** e **consulta e descoberta de DDD** — reuniram 189.356 impressões, ou **86,30%** do conjunto, mas apenas 93 cliques. A posição média de ambas ficou pouco acima de 11. Isto é consistente com um site que já foi elegível para aparecer, mas não consolidou a resposta mais útil ou não manteve estabilidade suficiente para sustentar o ranking. A indisponibilidade pode ter agravado esta situação, mas o CSV, isoladamente, não identifica causalidade.

| Cluster de intenção                        | Impressões | Cliques |   CTR | Posição média | Prioridade                   |
| ------------------------------------------ | ---------: | ------: | ----: | ------------: | ---------------------------- |
| Cauda longa territorial e outras consultas |    105.521 |      44 | 0,04% |         11,08 | Muito alta                   |
| Consulta e descoberta de DDD               |     83.835 |      49 | 0,06% |         11,28 | Muito alta                   |
| Gerador de números                         |     21.572 |     358 | 1,66% |          7,80 | Alta                         |
| Marca e descoberta do próprio DDD          |      4.474 |     142 | 3,17% |          3,72 | Proteger                     |
| Números válidos e simulação                |      2.138 |      33 | 1,54% |          7,74 | Média, com cautela editorial |
| Consulta genérica `ddd`                    |      1.915 |       2 | 0,10% |         15,49 | Baixa no curto prazo         |

O componente de marca é saudável: consultas relacionadas com “meu ddd” obtiveram posição média 3,72 e CTR de 3,17%. Isto indica reconhecimento anterior do domínio e torna a recuperação plausível se a disponibilidade e as URLs canónicas se mantiverem estáveis. O cluster de gerador também trouxe **57,18% dos cliques** do ficheiro, mas exige posicionamento responsável: a página deve continuar a declarar que produz **números simulados**, sem prometer disponibilidade, titularidade ou validade de linhas reais.

## Prioridades de recuperação

A prioridade não é pedir indexação para todo o acervo nem reenviar sitemaps repetidamente. O Search Console já mostra o índice de sitemaps e os inventários de cidades, estados, DDDs e guias como processados. O Google descreve sitemaps como sugestões para descoberta, não como garantia de rastreamento ou indexação imediatos, e desaconselha reenviar sitemaps inalterados várias vezes por dia. [1] [2]

| Ordem | Grupo inicial                                                  | Evidência no CSV                                  | Intervenção recomendada                                                                                                                         | Critério de sucesso                                                      |
| ----: | -------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
|     1 | `ddd 63`, `ddd63`, `ddd 63 qual estado`                        | 28.658 impressões; posições 8,61–9,86; 0 cliques  | Auditar a URL canónica do DDD 63 e reforçar resposta direta: “DDD 63 é de Tocantins”, cidades atendidas, ligações para Tocantins e FAQ visível. | Aumento sustentado de impressões, cliques e posição média em 28 dias.    |
|     2 | `ddd 96`, `ddd 86 qual estado`, `ddd tocantins`, `ddd alagoas` | 9.857 impressões combinadas e CTR próximo de zero | Rever títulos, H1, resposta rápida e enlaces internos das páginas DDD/estado correspondentes; preservar conteúdo territorial específico.        | Saída gradual da faixa 7–20 e CTR superior à linha de base.              |
|     3 | `gerador de telefone` e variações                              | 3.511 impressões; posição 8,13; CTR 0,63%         | Ajustar snippet e conteúdo para “simulador de número para testes”, DDD selecionável e aviso visível; não usar alegações de número “válido”.     | Maior CTR sem induzir expectativa incorreta.                             |
|     4 | Páginas territoriais com impressões, sem clique                | 189.356 impressões nos dois clusters principais   | Criar um backlog por oportunidade observada, não por volume bruto de municípios.                                                                | Número de URLs prioritárias indexadas e melhoria de cliques por cluster. |

As três variações de DDD 63, sozinhas, representam **13,06%** das impressões do ficheiro. Um cenário de priorização conservador, baseado apenas num CTR de referência por faixa de posição, aponta para aproximadamente 1.002 cliques incrementais no período de origem dessas consultas. Esta estimativa serve para ordenar trabalho; **não é previsão**, pois SERP, sazonalidade, concorrência e período do CSV não estão disponíveis.

## Plano de recuperação em 90 dias

Nas primeiras duas semanas, o objetivo é eliminar qualquer dúvida técnica. Deve ser inspecionada uma amostra de URLs: página inicial, DDD 63, DDD 96, um estado, uma cidade, `/gerador`, `/capitais` e um guia. Em cada uma, confirmar HTTP 200, URL canónica HTTPS, ausência de `noindex`, HTML SSR com conteúdo principal e “URL está no Google” ou motivo explícito de exclusão. A ferramenta de inspeção mostra a versão indexada e permite testar a URL publicada; o teste em tempo real e a versão indexada devem ser comparados, pois não representam necessariamente o mesmo estado. [3]

| Janela     | Objetivo                               | Ações                                                                                                                                                                                      | Métricas de controlo                                                                   |
| ---------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Dias 0–14  | Restabelecer confiança de rastreamento | Monitorizar disponibilidade, inspecionar a amostra prioritária, corrigir canónicos/redirecionamentos se houver divergência e solicitar indexação apenas para URLs estratégicas corrigidas. | Erros de servidor, estado de indexação e última data de rastreamento.                  |
| Dias 15–45 | Recuperar intenções já validadas       | Atualizar páginas de DDD com maior procura, fortalecer resposta rápida e ligações contextuais e rever snippets de gerador.                                                                 | Impressões, posição e CTR por grupo de consultas.                                      |
| Dias 46–90 | Escalar o que comprovou resposta       | Expandir para DDDs e estados escolhidos pelo relatório, manter conteúdo local atribuído e obter referências editoriais legítimas.                                                          | Cliques em janela móvel de 28 dias, páginas indexadas e distribuição de posições 1–10. |

O acompanhamento deve comparar **últimos 28 dias vs. 28 dias anteriores** no Search Console, segmentando pelo menos cinco grupos: marca, DDD 63, DDD 96/86/Alagoas/Tocantins, gerador e cauda longa territorial. Para separar efeito de recuperação de simples flutuação, a decisão de ampliar uma pauta deve exigir duas leituras consecutivas com sinais positivos — impressão, posição ou clique — e não apenas um dia isolado.

## Recomendação profissional

**A recuperação é viável e vale o investimento**, desde que o plano seja disciplinado. Há evidência de que o site já aparecia para uma procura ampla; as posições 7–20 mostram uma base de relevância sobre a qual é possível trabalhar. O pior caminho seria responder à queda com páginas quase idênticas, pedidos massivos de indexação ou alterações de URL desnecessárias. O melhor caminho é preservar a arquitetura atual, manter disponibilidade estável e concentrar melhorias factuais nas consultas com impressões históricas e intenção inequívoca.

O Google destaca que disponibilidade insuficiente reduz a capacidade de rastreamento e que novas ou atualizadas páginas normalmente levam dias — e, por vezes, mais — a ser percebidas. Também reforça que a indexação não é garantida apenas por sitemap: conteúdo útil, URLs rastreáveis e ligações internas continuam determinantes. [1] [2] [4] Por isso, o primeiro objetivo não deve ser “voltar exatamente ao número de março” numa data fixa, mas observar a retomada progressiva de impressões nas consultas já reconhecidas e transformar essa visibilidade em cliques com melhor resposta, contexto territorial e snippet.

## Dados adicionais necessários para fechar o prognóstico

Para transformar este diagnóstico em uma estimativa de recuperação por período, exportar do Search Console: **Desempenho** com dimensão diária para 16 meses, **Consultas + Páginas**, e o relatório **Indexação → Páginas** com motivos de exclusão. É importante incluir a janela antes da indisponibilidade, a janela de queda e os dias posteriores ao retorno. Sem esses três cortes, qualquer projeção de tráfego seria especulativa.

## Referências

[1]: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors "Google Search Central — Troubleshoot crawling errors"
[2]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview "Google Search Central — Learn about sitemaps"
[3]: https://support.google.com/webmasters/answer/9012289?hl=pt-BR "Google Search Console — Relatório e teste de inspeção de URL"
[4]: https://support.google.com/webmasters/answer/7451184?hl=pt-BR "Google — Guia de SEO para iniciantes"
