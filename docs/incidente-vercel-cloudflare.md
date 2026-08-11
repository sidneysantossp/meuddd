# Registo de incidente: Vercel e Cloudflare

## Achados verificados

Em 11 de agosto de 2026, os resolvedores públicos indicaram que a zona `meuddd.com.br` era autoritativa na Cloudflare, mas inicialmente não publicava um registo A no ápice e devolvia `NXDOMAIN` para `www`. Depois foram configurados A no ápice e CNAME em `www`, ambos em modo DNS-only, e a Vercel passou a indicar `www.meuddd.com.br` como configuração válida.

O deployment posterior devolveu `FUNCTION_INVOCATION_FAILED`. O registo de runtime da Vercel confirma a causa exata: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/server/_core/index' imported from /var/task/server.js`, com a sugestão do Node para importar `./server/_core/index.js`. Isto ocorreu porque o builder compilou o entrypoint ESM sem extensão e o runtime Node não aplica a resolução TypeScript do ambiente de desenvolvimento.

A correção passa a fazer o entrypoint importar estaticamente `dist/index.js`, o bundle ESM de produção gerado antes da função, e inclui esse bundle e o SSR no pacote da função. Isto evita que o runtime tente resolver módulos TypeScript não compilados em `/var/task`.

Após o envio do commit de correção `42a333f`, o domínio de produção ainda respondeu temporariamente com o mesmo `ERR_MODULE_NOT_FOUND`. A validação deve, portanto, confirmar no painel de Deployments que essa revisão específica foi concluída e promovida para Production antes de atribuir uma nova resposta 500 ao código corrigido.

Além da separação entre a entrega SSR de produção (`server/_core/ssrStatic.ts`) e o middleware Vite de desenvolvimento, o projeto inclui agora `pnpm run verify:vercel-runtime`. A verificação arranca o mesmo `server.ts` sob `VERCEL=1`, responde `robots.txt` com HTTP 200 e confirma que o bundle e os ficheiros SSR necessários estão resolvíveis antes da publicação.

## Referências oficiais

- [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain): o domínio de ápice usa registo A e subdomínios usam CNAME; os valores exatos devem ser copiados do cartão de domínio da Vercel.
- [Vercel — A record and CAA with Vercel](https://vercel.com/kb/guide/a-record-and-caa-with-vercel): recomenda configurar o ápice com o IP indicado pelo projeto e `www` com o CNAME indicado, deixando a Cloudflare em DNS-only durante a validação de SSL.
