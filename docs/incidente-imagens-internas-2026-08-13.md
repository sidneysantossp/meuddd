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
