# Diagnóstico móvel — PageSpeed Insights

**Fonte:** relatório fornecido para `https://www.meuddd.com.br/`, criado em 11 de agosto de 2026 às 23:16:21. O teste foi executado no perfil móvel, com Moto G Power emulado e Lighthouse 13.4.1.

| Indicador                | Valor observado |
| ------------------------ | --------------: |
| Desempenho               |              77 |
| Acessibilidade           |              94 |
| Práticas recomendadas    |              77 |
| SEO                      |             100 |
| First Contentful Paint   |           4,0 s |
| Largest Contentful Paint |           4,0 s |
| Speed Index              |           4,0 s |
| Total Blocking Time      |            0 ms |
| Cumulative Layout Shift  |           0,023 |

O primeiro recorte indica que a prioridade é reduzir o tempo até o primeiro e maior conteúdo visível. O bloqueio de thread e a estabilidade visual já estão em patamar favorável na medição apresentada.

## Oportunidades verificadas

| Auditoria                                 | Evidência observada                     | Prioridade técnica |
| ----------------------------------------- | --------------------------------------- | ------------------ |
| Solicitações que bloqueiam a renderização | Economia estimada de 1.700 ms           | Alta               |
| CSS principal                             | `/assets/index-…css`, 22,0 KiB e 480 ms | Alta               |
| Google Fonts                              | folha CSS de 1,4 KiB e 780 ms           | Alta               |
| Reflow forçado                            | 46 ms sem atribuição detalhada          | Média              |
| Latência máxima do caminho crítico        | 1.960 ms                                | Alta               |

O relatório confirma que a principal hipótese de otimização é remover fontes externas e reduzir ou adiar CSS não crítico antes da primeira pintura, sem priorizar reduções de bloqueio de thread, que já mede 0 ms.

## Recursos e práticas adicionais

| Diagnóstico              | Evidência observada                                                      | Ação prevista                                                                            |
| ------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Cadeia crítica de fontes | Google Fonts e duas fontes `woff2` do Google consumiram até 1.280 ms     | Auto-hospedar ou usar pilha de fontes local com `font-display` apropriado                |
| GeoJSON do mapa          | Recurso de limites estaduais apareceu na cadeia crítica com até 1.960 ms | Adiar a leitura do mapa até a proximidade/interação e preservar uma reserva de interface |
| JavaScript não usado     | Economia estimada de 150 KiB; bundle próprio de 189,2 KiB                | Separar componentes de menor prioridade e reduzir dependências carregadas na raiz        |
| Tarefas longas           | Quatro tarefas reportadas                                                | Verificar após a separação de código, sem substituir o SSR                               |
| Zoom móvel               | `maximum-scale=1` no viewport                                            | Remover a restrição para permitir ampliação por pessoas com baixa visão                  |

## Preservações necessárias

O recorte final de práticas recomendadas indica um aviso de API obsoleta, erros de console e mapas de origem ausentes no JavaScript principal; estes itens devem ser verificados sem sacrificar a experiência principal. A auditoria de SEO permaneceu em **100**, com dados estruturados válidos; a otimização não deve remover o SSR ou alterar o contrato de metadados.

A última secção confirma também **2/2** em navegação agêntica. Nenhuma recomendação adicional de desempenho legível foi apresentada após essa secção.
