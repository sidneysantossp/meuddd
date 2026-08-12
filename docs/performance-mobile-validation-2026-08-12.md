# Validação pós-otimização de desempenho móvel

Em 12 de agosto de 2026, o build público do Meu DDD foi validado após separar a instrumentação exclusiva da pré-visualização Manus do bundle de produção. A mudança mantém os recursos de diagnóstico quando o Vite é iniciado em desenvolvimento e deixa de injetar no HTML público os scripts de runtime e recolha de depuração que não são necessários aos visitantes.

| Verificação | Resultado |
| --- | --- |
| HTML base de produção (`dist/public/index.html`) | **453 bytes** sem compressão e **290 bytes** gzip |
| Script `manus-runtime` no HTML público | Ausente |
| Referência ao coletor de depuração | Ausente |
| Atributos `data-loc` no HTML público | 0 |
| SSR Vercel sem `DATABASE_URL` | HTTP 200 em `/`, `/ddd/11`, `/estado/sp`, `/cidade/sp/sao-paulo`, `robots.txt` e sitemap de DDDs |
| Segurança do bundle serverless | A verificação falha caso detete Vite, Rollup ou Lightning CSS no handler |

A validação visual foi efetuada após reiniciar o servidor SSR de desenvolvimento, na resolução móvel **375 × 812 px**. A homepage manteve a marca Meu DDD, o título e o mapa por estados; as rotas `/ddd/11`, `/estado/sp` e `/cidade/sp/sao-paulo` renderizaram conteúdo e navegação sem erro. A homepage foi também confirmada visualmente em desktop após o reinício.

> A redução refere-se ao documento HTML base: o JavaScript da aplicação continua a ser carregado em ficheiros separados e a ser objeto de divisão por rota. O build ainda assinala um chunk inicial de aproximadamente 686 kB, já identificado como próxima oportunidade de otimização, mas a injeção de cerca de 367 kB do runtime de instrumentação deixou de bloquear o HTML de produção.

## Comandos de validação

```bash
pnpm run check
pnpm test
NODE_OPTIONS=--max-old-space-size=4096 pnpm run build:vercel
env -u DATABASE_URL pnpm run verify:vercel-runtime
```

O último comando agora verifica explicitamente o HTML SSR das rotas principal, DDD, estado e município no artefacto de build Vercel.
