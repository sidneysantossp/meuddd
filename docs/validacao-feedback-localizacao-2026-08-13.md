# Validação de feedback da localização — 13 de agosto de 2026

## Evidências verificadas

| Verificação | Resultado |
| --- | --- |
| Página inicial em desktop | A pesquisa, o controlo de localização e a navegação territorial mantêm a composição Atlas Vivo. |
| Página inicial em 375 px | O botão de localização, a mensagem de privacidade e a pesquisa manual permanecem legíveis e sem sobreposição. |
| Carregamento | O estado de pedido/resolução inclui ícone rotativo e painel com texto anunciado por `role="status"`. |
| Limpeza | A regressão automatizada confirma que o controlo remove DDD, UF e mensagem de sugestão. |
| Movimento reduzido | A animação complementar respeita a regra global de movimento reduzido. |

## Validações técnicas

Foram aprovados 74 testes automatizados, a verificação TypeScript, o build Vercel e a verificação SSR sem `DATABASE_URL`.
