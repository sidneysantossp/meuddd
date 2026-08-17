# Publicação na Vercel com DNS Cloudflare

## Motivo da configuração

Esta aplicação utiliza **React com SSR, Express e tRPC**. O ficheiro `dist/index.js` é o servidor Node compilado; não é um ficheiro público. Se a Vercel receber `dist` como diretório de saída estático, pode expor o código JavaScript do servidor no domínio em vez de executar a aplicação.

O ficheiro `vercel.json` do projeto define o `server.ts` como aplicação Express e cria, durante a compilação, uma cópia dos recursos estáticos em `public/`. A função inclui também o módulo SSR compilado e renderiza as páginas públicas no servidor.

## Configuração do projeto Vercel

No projeto ligado ao repositório `sidneysantossp/meuddd`, confirme que a **Root Directory** aponta para a raiz do repositório. A predefinição de framework deve ser **Express** e o comando de compilação é lido do `vercel.json`.

Remova qualquer valor manual em **Output Directory**, sobretudo `dist` ou `dist/index.js`. Este projeto não deve ser publicado como um diretório estático: a Vercel deve executar a aplicação `server.ts` e publicar os ficheiros gerados em `public/` como recursos CDN.

Defina na Vercel, sem os expor no repositório, os valores necessários para os ambientes Preview e Production:

| Variável                                            | Finalidade                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`                                      | Acesso à base de dados territorial e às funcionalidades administrativas. |
| `JWT_SECRET`                                        | Assinatura das sessões.                                                  |
| `VITE_APP_ID`                                       | Identificador da integração de autenticação.                             |
| `OAUTH_SERVER_URL`                                  | Serviço de autenticação usado pelo projeto.                              |
| `VITE_OAUTH_PORTAL_URL`                             | Portal de autenticação usado no cliente.                                 |
| `OWNER_OPEN_ID`                                     | Identificador do proprietário para as permissões administrativas.        |
| `BUILT_IN_FORGE_API_URL` e `BUILT_IN_FORGE_API_KEY` | Serviços de infraestrutura usados pelo servidor, quando aplicável.       |

Depois de guardar as variáveis, faça um novo deployment a partir do branch `main`. Valide a página inicial, uma rota municipal, `robots.txt`, `sitemap.xml` e uma consulta por DDD antes de promover a versão para produção.

## Configuração do domínio na Cloudflare

No DNS da Cloudflare, use o destino CNAME apresentado pela Vercel para o domínio ou subdomínio. Durante o primeiro reconhecimento do domínio e emissão do certificado, mantenha o registo como **DNS only**. Depois de o domínio estar validado na Vercel, o proxy da Cloudflare pode ser ativado se for necessário, com SSL/TLS em **Full (strict)**.

O apontamento DNS e a validação do certificado são geridos nas contas Vercel e Cloudflare; nenhuma credencial deve ser adicionada a este repositório.
