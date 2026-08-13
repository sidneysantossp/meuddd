# Validação — recuperação SEO DDD 63/96, gerador e mapa

**Data:** 13 de agosto de 2026

| Área validada | Evidência | Resultado |
|---|---|---|
| `/ddd/63` | Renderização desktop completa com guia territorial, cartões de ação, FAQ e ligações internas. | Aprovado |
| `/ddd/96` | Renderização desktop completa com conteúdo específico do Amapá, FAQ e ligações internas. | Aprovado |
| `/gerador` | Renderização desktop do simulador, explicação de uso responsável, links territoriais e perguntas frequentes. | Aprovado |
| Mapa na página inicial | O recurso GeoJSON carregou com HTTP 200; a captura em viewport confirmou os pontos coral pulsantes no centro das conexões entre estados. | Aprovado |
| Produção simulada | `pnpm run build:vercel` e verificação SSR sem `DATABASE_URL` concluídos com sucesso. | Aprovado |

As animações não essenciais respeitam a preferência de movimento reduzido, e os marcadores têm rótulo acessível para não depender exclusivamente do efeito visual.
