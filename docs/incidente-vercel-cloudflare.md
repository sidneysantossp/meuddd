# Registo de incidente: Vercel e Cloudflare

## Achados verificados

Em 11 de agosto de 2026, os resolvedores públicos indicaram que a zona `meuddd.com.br` era autoritativa na Cloudflare, mas inicialmente não publicava um registo A no ápice e devolvia `NXDOMAIN` para `www`. Depois foram configurados A no ápice e CNAME em `www`, ambos em modo DNS-only, e a Vercel passou a indicar `www.meuddd.com.br` como configuração válida.

O deployment posterior devolveu `FUNCTION_INVOCATION_FAILED`. A correção de código separa a entrega SSR de produção (`server/_core/ssrStatic.ts`) das importações do middleware Vite de desenvolvimento, evitando que a função serverless carregue dependências de desenvolvimento durante a invocação.

## Referências oficiais

- [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain): o domínio de ápice usa registo A e subdomínios usam CNAME; os valores exatos devem ser copiados do cartão de domínio da Vercel.
- [Vercel — A record and CAA with Vercel](https://vercel.com/kb/guide/a-record-and-caa-with-vercel): recomenda configurar o ápice com o IP indicado pelo projeto e `www` com o CNAME indicado, deixando a Cloudflare em DNS-only durante a validação de SSL.
