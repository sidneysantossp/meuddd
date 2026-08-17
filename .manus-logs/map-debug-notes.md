# Diagnóstico — Mapa interativo "A carregar mapa dos estados" (13/08)

## Achados

1. O componente BrazilStateMap carrega via IntersectionObserver (rootMargin 240px) + setTimeout 450ms. Se o observador nunca disparar (ex.: página aberta com scroll abaixo, ou ambiente que não suporta IO), mostra "Mapa pronto para navegar" e NUNCA carrega → stuck em "A carregar" só se shouldLoad=true e fetch pendurar/falhar silenciosamente.
2. Logs de rede mostram geojson 200 OK (153ms, 32139 bytes) — carrega corretamente no dev preview desktop e mobile.
3. Produção ddddbrazil-jbfgdfkn.manus.space/assets/brazil-states.geojson → 200 OK. meuddd.com.br → 308 → www.meuddd.com.br 200 OK.
4. Screenshots desktop/mobile/full-page: mapa renderiza OK no preview dev.

## Hipótese do utilizador

O utilizador reportou mapa preso em "A carregar mapa dos estados" — isto acontece quando:

- shouldLoad=true mas o fetch demora (rede lenta em produção) sem timeout de carregamento longo → utilizador vê loading infinito.
- A mensagem "A carregar mapa dos estados" persiste sem fallback visual após tempo prolongado.

## Correção planeada

1. Adicionar timeout (8s) ao fetch; se exceder, mostrar fallback (loadError) com re-tentativa manual via botão.
2. Adicionar fallback imediato (1,2s) caso shouldLoad e ainda sem features — mostrar mensagem "A desenhar limites estaduais…" com spinner, para evitar percepção de travamento.
3. Fallback caso IntersectionObserver não dispare em N tempo (3s): carregar diretamente.
