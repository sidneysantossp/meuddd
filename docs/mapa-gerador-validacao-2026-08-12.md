# Validação — mapa conectado e gerador

**Data:** 12 de agosto de 2026

## Alterações verificadas

| Área | Evidência |
| --- | --- |
| Mapa de navegação | As 27 siglas estaduais são renderizadas sobre o SVG; seis conexões decorativas interligam pares de UFs. As linhas e nós usam `pointer-events="none"`, preservando o clique nos estados. |
| Movimento acessível | As conexões usam animação apenas sob `prefers-reduced-motion: no-preference`; sem preferência de movimento, permanecem estáticas e legíveis. |
| Navegação | A homepage expõe o destino **Gerar número** no menu principal, incluindo a versão móvel. |
| Gerador | O aviso visível esclarece que os números são aleatórios e simulados, sem consulta, identificação, reserva ou vínculo com linhas, titulares ou operadoras reais. |

## Validação técnica

| Verificação | Resultado |
| --- | --- |
| TypeScript | `pnpm exec tsc --noEmit` aprovado. |
| Testes | `pnpm test` aprovado: 19 ficheiros e 48 testes. |
| Build de produção | `pnpm run build:vercel` aprovado. |
| SSR Vercel sem `DATABASE_URL` | `pnpm run verify:vercel-runtime` aprovado, com HTTP 200 para robots, sitemap, homepage e rotas programáticas. |
| Interface | Validação visual em desktop e telemóvel da homepage, mapa, navegação e página `/gerador`; sem erros novos no servidor ou consola após reinício. |
