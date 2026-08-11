# Validação visual do conteúdo local

## Recife e Fortaleza

Em 11 de agosto de 2026, foram verificadas as rotas municipais `/cidade/pe/recife` e `/cidade/ce/fortaleza` no ambiente de desenvolvimento. Em ambas, o bloco **Guia local verificável** é renderizado imediatamente após o cartão de mapa e inclui uma nota histórica atribuída, mobilidade, parques, património ou cultura, cartões de turismo, bares e restaurantes, transportes, telefones nacionais de emergência e o controlo de sugestão local.

| Rota | DDD | Elementos confirmados |
|---|---:|---|
| `/cidade/pe/recife` | 81 | História, Grande Recife, parques e lazer, cultura e roteiros, serviços, telefones úteis e sugestão de alteração. |
| `/cidade/ce/fortaleza` | 85 | História, mobilidade, Parque do Cocó, Parque Rachel de Queiroz, património, serviços, telefones úteis e sugestão de alteração. |

As ligações externas apresentadas permanecem atribuídas às respetivas fontes institucionais documentadas em `docs/local-content-sources.md`.

## Renderização SSR

Também foi inspecionado o HTML entregue por `http://localhost:3000/cidade/pe/recife` e `http://localhost:3000/cidade/ce/fortaleza`. As duas respostas incluíram o texto **“além do DDD”** antes da hidratação do cliente, confirmando que a secção de contexto local é disponibilizada pelo SSR.

## Manaus, Belém e Goiânia

As fichas municipais de Manaus, Belém e Goiânia foram revistas visualmente abaixo do cartão de mapa. Todas apresentaram a estrutura de história, mobilidade, parques, património, pontos turísticos, restauração, telefones úteis e ligações atribuídas. O HTML SSR de `cidade/am/manaus`, `cidade/pa/belem` e `cidade/go/goiania` também incluiu o título **“além do DDD”** antes da hidratação do cliente.
