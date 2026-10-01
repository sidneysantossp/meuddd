# Recuperação técnica de SEO — 30/09/2026

Base: main e9dbd4c. Branch: fix/seo-audit-recovery.

## Escopo

- Cards de DDD populares com links HTML canônicos.
- Navegação por estados e capitais na home; links prioritários no rodapé aproveitados da branch fix/seo-recovery-internal-links-p1.
- Redirects permanentes para variantes de caixa e barra final nas famílias territoriais/editoriais, mantendo parâmetros.
- URLs arbitrárias de cidades do DF retornam 404; aliases conhecidos mantêm o comportamento legado.
- Corrigidos caminhos dos wrappers editoriais e lookup da API; falha de carregamento deixa de produzir catálogo vazio silencioso.
- Consulta municipal usa a chave slug existente no catálogo.
- SSR hidrata apenas a consulta tRPC do município, sem serializar o catálogo estadual inteiro.
- Schema editorial depende de conteúdo realmente carregado. Removidas datas fixas não rastreáveis de DDDs, estados e municípios.
- Validação do bundle de produção exige abas no HTML, dados na API e limite de tamanho do documento em três estados.

## Critérios de aceite

1. Home contém links para DDDs prioritários, estados e capitais sem execução de JavaScript.
2. /estado/TO redireciona para /estado/to; /ddd/63/ para /ddd/63.
3. /cidade/df/nao-existe-auditoria retorna 404.
4. São Paulo, Palmas e Belo Horizonte têm abas no HTML e resposta municipal na API.
5. HTML municipal contém uma consulta editorial municipal e não o catálogo estadual; orçamento de teste de 350 KB sem compressão.
6. Typecheck, testes, build e verificação do runtime de produção aprovados.

## Limites e publicação

Correções técnicas não comprovam a causa integral da queda nem garantem posições. Falta comparar exports atuais do Search Console, datas de queda, páginas/consultas, indexação, ações manuais, segurança e estatísticas de rastreamento. Core Web Vitals de campo e backlinks não foram medidos.

Após publicar, repetir os critérios de aceite no domínio público e inspecionar URLs prioritárias no Search Console. Registrar a data de deploy e acompanhar cliques e impressões por grupo em janelas comparáveis. Manter as URLs atuais e evitar novas migrações simultâneas.

As abas existentes foram restauradas tecnicamente; isso não constitui verificação editorial de todos os textos ou fontes dos catálogos. Revisar relevância e precisão antes de ampliar conteúdo programático.

## Verificação de catálogo

Os 5.571 registros municipais passaram pela checagem estrutural dos campos usados na renderização: introduções e itens de turismo, gastronomia e transporte, além de texto e detalhes climáticos. Essa verificação detecta riscos de quebra do componente; não valida a veracidade editorial. Os carregadores SSR e API resolveram São Paulo, Palmas e Belo Horizonte a partir dos arquivos-fonte.

## Resultado da validação

- TypeScript: aprovado (`pnpm check`).
- Testes: 153 aprovados, em 40 arquivos (`pnpm test`).
- Build: aprovado (`pnpm run build`).
- Runtime Vercel local: aprovado, incluindo HTML e API municipal.
- Pacote isolado: aprovado executando apenas dist, dependências e o verificador, sem arquivos-fonte e sem loader TypeScript.
- HTML descomprimido: São Paulo 118.222 bytes; Palmas 118.838 bytes; Belo Horizonte 124.955 bytes.
- O verificador antigo procurava um nome desatualizado do kit de marca; agora verifica o href real do arquivo publicado.
- OAuth não configurado no ambiente local: as verificações acima são das rotas públicas, não do login administrativo.

Publicação em produção permanece separada desta validação local.
