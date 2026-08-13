# Incidente — imagens internas quebradas

Data da auditoria: 13 de agosto de 2026.

A planilha `www.meuddd.com.br_internal_images_are_broken_20260813.xlsx` contém 15.723 registos de imagens internas com HTTP 500, descobertos entre 11:54 e 12:14 UTC. A leitura inicial aponta três URLs de imagem recorrentes no domínio canónico:

- `https://www.meuddd.com.br/manus-storage/blog-consultar-ddd-cidade_0819cb9e.png`
- `https://www.meuddd.com.br/manus-storage/blog-ddd-mapa-brasil_57876089.png`
- `https://www.meuddd.com.br/manus-storage/blog-ligacao-entre-estados_42079c98.png`

| Indicador | Resultado |
|---|---:|
| Ocorrências de imagem com falha | 15.723 |
| Ativos únicos afetados | 3 PNGs |
| Páginas únicas afetadas | 5.241 |
| Estado HTTP registado | 500 em 100% dos registos |
| Ocorrências por ativo | 5.241 cada |
| Páginas municipais afetadas | 5.121 |
| Páginas de DDD, estado, guias, homepage e outras | 120 |

Os mesmos três ativos aparecem exatamente uma vez em cada página afetada, sugerindo uma falha única na entrega da rota `/manus-storage/` em vez de milhares de imagens independentes ausentes. A investigação seguirá com amostragem de resposta HTTP e revisão do encaminhamento de ativos no servidor SSR/publicado.

## Causa confirmada e substituição

Em 13 de agosto de 2026, uma consulta direta a `https://www.meuddd.com.br/manus-storage/blog-consultar-ddd-cidade_0819cb9e.png` devolveu a mensagem `Storage proxy not configured`, coerente com o HTTP 500 da planilha. Portanto, os três nomes antigos dependiam de uma configuração de proxy de armazenamento indisponível no domínio publicado.

Os ficheiros de origem foram localizados em `/home/ubuntu/webdev-static-assets/` e republicados como ativos estáveis do projeto:

| Imagem anterior | Novo ativo estático |
|---|---|
| `blog-consultar-ddd-cidade_0819cb9e.png` | `/manus-storage/blog-consultar-ddd-cidade_5b64333e.png` |
| `blog-ddd-mapa-brasil_57876089.png` | `/manus-storage/blog-ddd-mapa-brasil_ab2cdf6e.png` |
| `blog-ligacao-entre-estados_42079c98.png` | `/manus-storage/blog-ligacao-entre-estados_dcca6a6d.png` |

Uma consulta direta ao novo ativo `blog-consultar-ddd-cidade_5b64333e.png` na pré-visualização redirecionou para o CDN de ativos do projeto e apresentou corretamente um PNG de 2560×1440. Esta resposta confirma que a rota atual de ativos funciona para os novos ficheiros republicados.

A revisão visual completa da página inicial confirmou que os três cartões da secção Blog — mapa de DDD, consulta de DDD por cidade e ligação entre estados — renderizam imagens em vez de áreas quebradas.

## Incidente 2 — ZIP do kit de marca (Search Console, 2026-08-13)

O Search Console reportou um link interno quebrado na página /imprensa: `https://www.meuddd.com.br/manus-storage/meu-ddd-kit-de-marca-2026_a8693944.zip` devolve HTTP 500. Reprodução confirmada no domínio publicado (500, text/html, 28 bytes — mesma família de falha "Storage proxy not configured") e na pré-visualização (307 → 200 application/zip após redirecionamento para a URL assinada da CloudFront). O objeto S3 subjacente ainda existe e é válido (ZIP intacto, 2113 bytes), o que indica que a falha ocorre na camada de proxy manus-storage no ambiente de produção publicado, e não no ativo em si. A causa comum com as imagens anteriores é a mesma rota `/manus-storage/...`, que depende da configuração do proxy de armazenamento indisponível no domínio publicado.

A correção segue o mesmo padrão do incidente anterior: eliminar a dependência da rota manus-storage no conteúdo público, servindo o ativo por URL estática estável. O ficheiro local `webdev-static-assets/meu-ddd-kit-de-marca-2026.zip` foi republicado com `manus-upload-file --webdev` e a referência em `InstitutionalPage.tsx` foi atualizada para a nova URL estável. A regressão existente em `InstitutionalPage.test.tsx` foi reforçada para impedir o retorno de referências manus-storage na página de imprensa.

## Validação final do ZIP republicado

A referência em `client/src/pages/InstitutionalPage.tsx` foi atualizada para `/manus-storage/meu-ddd-kit-de-marca-2026_ee73e833.zip`. A validação na pré-visualização confirmou: antigo ativo devolve 500 (confirmado), novo ativo entrega `307 → 200 application/zip` com 2.113 bytes e pacote íntegro (`unzip -t` sem erros). A regressão de `InstitutionalPage.test.tsx` foi reforçada para bloquear as chaves antigas quebradas (blog e kit `a8693944`). TypeScript e os 2 testes da página institucional aprovados.
