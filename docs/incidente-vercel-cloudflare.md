# Registo de incidente: Vercel e Cloudflare

## Achados verificados

Em 11 de agosto de 2026, os resolvedores públicos indicaram que a zona `meuddd.com.br` era autoritativa na Cloudflare, mas inicialmente não publicava um registo A no ápice e devolvia `NXDOMAIN` para `www`. Depois foram configurados A no ápice e CNAME em `www`, ambos em modo DNS-only, e a Vercel passou a indicar `www.meuddd.com.br` como configuração válida.

O deployment posterior devolveu `FUNCTION_INVOCATION_FAILED`. O registo de runtime da Vercel confirma a causa exata: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/server/_core/index' imported from /var/task/server.js`, com a sugestão do Node para importar `./server/_core/index.js`. Isto ocorreu porque o builder compilou o entrypoint ESM sem extensão e o runtime Node não aplica a resolução TypeScript do ambiente de desenvolvimento.

A correção passa a fazer o entrypoint importar estaticamente `dist/index.js`, o bundle ESM de produção gerado antes da função, e inclui esse bundle e o SSR no pacote da função. Isto evita que o runtime tente resolver módulos TypeScript não compilados em `/var/task`.

Após o envio do commit de correção `42a333f`, o domínio de produção ainda respondeu temporariamente com o mesmo `ERR_MODULE_NOT_FOUND`. A validação deve, portanto, confirmar no painel de Deployments que essa revisão específica foi concluída e promovida para Production antes de atribuir uma nova resposta 500 ao código corrigido.

O deployment seguinte, commit `6fba372`, foi iniciado com a correção do esquema `functions.server.ts.includeFiles` para o padrão único `dist/**`. No painel da Vercel, esta revisão encontrava-se em estado `Building`; a validação de produção só será registada após o estado final estar disponível.

O deployment `6fba372` foi concluído em estado `Ready` no ambiente `Production`, com duração de 1 minuto e 11 segundos. A revisão foi atribuída a `www.meuddd.com.br`, ao domínio de produção Git e ao URL específico do deployment. Falta validar a resposta HTTP efetiva e o HTML SSR a partir do domínio público.

Ao invocar a revisão `6fba372`, a Vercel devolveu `FUNCTION_INVOCATION_FAILED` e os logs filtrados pelo deployment `dpl_4Qv3bkVVkwJYvknWJ5BdrAHz3B2E` registaram repetidamente: `Error: Cannot find module @rollup/rollup-linux-x64-gnu`. O erro aponta para `node_modules/.pnpm/rollup@4.52.4`, incluindo a rota `/` e ficheiros de favicon. Isto mostra que o runtime serverless ainda carrega uma dependência de desenvolvimento Vite/Rollup durante a importação do bundle, mesmo sem executar o middleware de desenvolvimento. A próxima correção deve remover a importação estática desse módulo do caminho de produção, deixando-o sob importação dinâmica exclusiva do arranque local.

A importação de `./vite` no entrypoint foi alterada para `await import("./vite")` exclusivamente dentro do ramo `NODE_ENV === "development"`. Assim, a função Vercel pode importar o bundle de produção sem carregar `vite` nem a dependência opcional nativa do Rollup. O contrato automatizado de publicação passou a bloquear uma importação estática de `./vite` no entrypoint principal.

Além da separação entre a entrega SSR de produção (`server/_core/ssrStatic.ts`) e o middleware Vite de desenvolvimento, o projeto inclui agora `pnpm run verify:vercel-runtime`. A verificação arranca o mesmo `server.ts` sob `VERCEL=1`, responde `robots.txt` com HTTP 200 e confirma que o bundle e os ficheiros SSR necessários estão resolvíveis antes da publicação.

Após reiniciar o servidor local e reproduzir a rota `/`, foi identificado que a referência de prefetch tinha de permanecer disponível durante a transformação SSR do Vite. A correção foi aplicada em `server/ssrPrefetch.ts`: `createSsrPrefetch` passou de constante-arrow para uma exportação de função explícita. A disponibilidade da factory é coberta em `server/ssrPrefetch.test.ts`. Além disso, `scripts/verify-vercel-runtime.mjs` passou a falhar explicitamente se `/` devolver HTTP 500 ou se o HTML contiver `createSsrPrefetch is not defined`; a execução limpa devolveu HTTP 200, estado de hidratação e ausência dessa exceção.

A revisão `452270f` foi enviada ao branch `main` para o deployment Vercel. No primeiro acompanhamento, a Vercel apresentava a revisão em ambiente Production, ainda com estado `Queued`; após aproximadamente três minutos, o estado permanecia `Queued`, sem log de compilação ou erro adicional. A validação externa permanece pendente até ao estado final e à resposta dos domínios públicos.

Na revisão pública `452270f`, anterior ao novo handler dedicado, o URL específico do deployment devolveu HTTP 500 em 11 de agosto de 2026, às 19:32 UTC-3. Os logs da Vercel registaram a mensagem exata `Cannot find module '../lightningcss.linux-x64-gnu.node'`, com a cadeia de carregamento `/var/task/node_modules/.pnpm/lightningcss@1.30.1/node_modules/lightningcss/node/index.js`, seguida de `Node.js process exited with exit status: 1`. Isto demonstra que a função publicada ainda alcançava uma dependência nativa de desenvolvimento. A correção local cria um handler serverless dedicado; a verificação `verify:vercel-runtime` bloqueia referências a `vite`, `rollup`, `lightningcss` e ao antigo módulo `server/_core/vite.ts` no handler compilado antes da próxima publicação.

### Transcrição do erro de runtime da revisão 452270f

```text
Cannot find module '../lightningcss.linux-x64-gnu.node'

Require stack:
- /var/task/node_modules/.pnpm/lightningcss@1.30.1/node_modules/lightningcss/node/index.js

Did you forget to add it to "dependencies" in `package.json`?

Node.js process exited with exit status: 1.
The logs above can help with debugging the issue.
```

O painel da Vercel associou esta exceção a `GET /` e `GET /favicon.ico` no host `meuddd-e4po0iyrq-admsuisso-1633s-projects.vercel.app`, ambos com HTTP 500 e código `FUNCTION_INVOCATION_FAILED`. Como a exceção não expôs frames adicionais além do `Require stack` acima, essa cadeia representa o stack trace completo disponibilizado pelo runtime.

### Revisão com handler isolado em promoção

Em 11 de agosto de 2026, a revisão `958552f`, com o handler serverless dedicado sem Vite, Rollup ou Lightning CSS, foi enviada ao branch `main` e entrou na fila de produção da Vercel. O URL único apresentado pelo painel é `https://meuddd-cjvq6r4do-admsuisso-1633s-projects.vercel.app`. A validação pública deve ocorrer apenas depois de o estado mudar de `Queued` para `Ready`.

O painel de deployments da Vercel passou a indicar a revisão `958552f` como `Ready` em Production, com duração de build de 55 segundos. A próxima validação deve consultar o URL único desta revisão e os domínios configurados, para confirmar a execução da função e o HTML SSR.

O URL único `https://meuddd-cjvq6r4do-admsuisso-1633s-projects.vercel.app` respondeu `Internal Server Error` após a revisão ter ficado `Ready`. A página de logs da Vercel passou a exigir autenticação novamente antes de expor a exceção correspondente; é necessário restabelecer a sessão da Vercel e recolher o novo stack trace antes de concluir a causa de runtime desta revisão.

## Referências oficiais

- [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain): o domínio de ápice usa registo A e subdomínios usam CNAME; os valores exatos devem ser copiados do cartão de domínio da Vercel.
- [Vercel — A record and CAA with Vercel](https://vercel.com/kb/guide/a-record-and-caa-with-vercel): recomenda configurar o ápice com o IP indicado pelo projeto e `www` com o CNAME indicado, deixando a Cloudflare em DNS-only durante a validação de SSL.
