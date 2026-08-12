# Plano de recuperação das URLs prioritárias — Meu DDD

**Decisão editorial:** não recriar `/ddd/63`, `/ddd/96` ou `/gerador`. As rotas canónicas existentes respondem com HTTP 200 e são a base correta para a retomada. A inspeção do Search Console mostrou que `/ddd/63` e `/ddd/96` não são atualmente reconhecidas no índice, enquanto `/gerador` conserva um problema 4xx histórico do último rastreamento em 4 de julho de 2026. A recuperação deve ocorrer nas próprias URLs, depois de uma melhoria material e verificável de conteúdo.

> A extensão do texto, por si só, não é um fator de recuperação. O trabalho deve resolver a intenção da consulta com informação específica, verificável e bem ligada ao restante do site. O Google recomenda conteúdo útil, centrado nas pessoas, em vez de páginas criadas principalmente para manipular rankings. [1]

## Limite dos dados atuais

O export enviado contém a dimensão **Consultas**, não **Páginas**. Assim, ele identifica quais intenções tiveram maior procura, mas não permite afirmar com rigor qual URL gerou mais cliques ou impressões no período. A associação abaixo é uma hipótese operacional baseada na arquitetura actual das rotas; a confirmação exige exportar o relatório **Desempenho → Páginas** do Search Console, no mesmo intervalo do CSV.

| Consulta ou grupo | URL candidata | Evidência atual | Decisão |
|---|---|---|---|
| `ddd 63`, `ddd63`, `ddd 63 qual estado` | `/ddd/63` | Maior grupo individual de impressões; a URL não é reconhecida no índice atual. | Recuperar a URL existente com resposta direta e malha interna. |
| `ddd 96` | `/ddd/96` | Consulta prioritária; a URL não é reconhecida no índice atual. | Recuperar a URL existente com conteúdo territorial específico. |
| `ddd tocantins` | `/estado/to` | URL atual responde 200; não usar `/estado/tocantins`, que devolve 404. | Fortalecer a página estadual existente. |
| `ddd alagoas` | `/estado/al` | URL atual responde 200; não usar `/estado/alagoas`, que devolve 404. | Fortalecer a página estadual existente. |
| `gerador de telefone` e variações | `/gerador` | Maior cluster de cliques históricos; há 4xx histórico na inspeção. | Atualizar a página existente e validar a resposta publicada antes de solicitar indexação. |

## Estrutura editorial recomendada para `/gerador`

A página já responde a uma intenção clara, por isso deve receber uma **camada editorial de apoio**, não um “supertexto” genérico. O objetivo é explicar o simulador, reduzir ambiguidade e cobrir perguntas adjacentes que uma pessoa realmente faria antes ou depois de gerar um número.

| Bloco | Objetivo de busca e utilizador | Requisito de qualidade |
|---|---|---|
| Resposta curta após o H1 | Explicar, em 40–70 palavras, que a ferramenta cria combinações simuladas por DDD. | Declarar que não verifica disponibilidade, titularidade ou existência de linha real. |
| Como funciona | Explicar DDD, nono dígito e a seleção de estado/DDD. | Usar exemplos claramente fictícios e nunca alegar “número válido”. |
| Escolher o DDD | Ligar para páginas de DDD com maior procura, começando por 63, 96, 86 e estados de Tocantins/Alagoas. | Links contextuais, com texto âncora descritivo. |
| Usos adequados | Testes de formulário, protótipos, maquetes e dados de demonstração. | Não incentivar uso para cadastro, fraude, spam ou contacto com terceiros. |
| FAQ curto | Responder perguntas sobre simulação, DDD, formato e privacidade. | Respostas factuais, sem repetir palavras-chave artificialmente. |
| Fontes e atualizações | Referenciar o plano geral de numeração da Anatel quando se explicar a estrutura. | Manter data de revisão visível. |

Uma extensão razoável é **600–900 palavras úteis**, além da própria ferramenta e da FAQ. Não é uma meta de ranking; é um limite editorial para responder sem diluir a funcionalidade. Antes de publicar, o texto deve ser revisado para não prometer que um número funciona em WhatsApp, chamadas, cadastro ou qualquer serviço externo.

## Estrutura de recuperação para DDD 63, DDD 96 e páginas estaduais

As páginas de DDD devem ser melhores do que uma lista: precisam dar a resposta em destaque, demonstrar o vínculo territorial e oferecer o próximo clique lógico. A base já existente de proveniência Anatel/IBGE, respostas rápidas, clusters de intenção e ligações territoriais permite fazer isso sem repetir parágrafos entre páginas.

| Elemento | Aplicação em DDD 63 e DDD 96 | Aplicação em `/estado/to` e `/estado/al` |
|---|---|---|
| Primeira resposta | “O DDD 63 é usado no Tocantins” / “O DDD 96 é usado no Amapá”, com data de revisão. | Responder quantos DDDs atendem ao estado e direcionar ao respetivo código. |
| Cobertura verificável | Municípios atendidos, em lista navegável e sem inventar abrangência. | DDDs do estado, cidades e hubs regionais. |
| Contexto local | Breve explicação territorial, ligações para estado, municípios e região. | Contexto sobre a região e ligações para municípios e DDDs mais consultados. |
| Perguntas frequentes | “DDD 63 é de qual estado?”, “Como ligar para DDD 63?” e variações naturais. | Perguntas sobre códigos, discagem e distribuição territorial. |
| Ligação interna | Do gerador para DDDs prioritários e entre estado, DDD e cidades. | Links de hubs para DDDs e municípios, sem blocos artificiais repetidos. |

## Sequência operacional segura

Primeiro, publicar uma alteração material numa única URL piloto: `/gerador` ou `/ddd/63`. Em seguida, confirmar HTTP 200, canonical HTTPS, HTML SSR e presença no sitemap. Só então repetir o **Teste do URL publicado** no Search Console. Se o teste voltar a responder corretamente, solicitar indexação uma vez para a URL alterada; o pedido é uma sugestão, não uma garantia de inclusão. [2]

Depois de sete a catorze dias, comparar a inspeção e o relatório de desempenho dessa URL com a linha de base. Se houver rastreamento ou melhoria de impressões, aplicar o mesmo padrão a `/ddd/96`, `/estado/to` e `/estado/al`. Esta progressão permite separar uma recuperação real de uma alteração que apenas aumentou texto sem melhorar a descoberta.

## Dados que ainda faltam

O próximo artefacto necessário é um CSV do Search Console com dimensão **Páginas**, no mesmo período do relatório atual, contendo pelo menos **URL, cliques, impressões, CTR e posição**. Com esse ficheiro, a priorização deixa de ser inferida e passa a mostrar as URLs que, de facto, receberam tráfego. Não se deve decidir recriar URLs a partir de consultas agregadas: as URLs canónicas atuais são tecnicamente válidas e já devem ser preservadas.

## Referências

[1]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content "Google Search Central — Creating helpful, reliable, people-first content"

[2]: https://support.google.com/webmasters/answer/9012289?hl=pt-BR "Google Search Console — Ferramenta de inspeção de URL"
