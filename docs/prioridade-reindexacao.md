# Prioridade de Reindexação — GSC

Baseado no mega export (1.000 páginas, 8,139 impressões).

## Estratégia

- URLs que hoje respondem 301: solicitar indexação da **nova URL destino** (o 301 transfere a autoridade automaticamente).
- URLs 404 ainda vivas no GSC: solicitar remoção (URL Removal) se não houver destino.
- URLs vivas (200): já otimizadas com tabs editoriais — apenas monitorar.
- URLs com `uf` por extenso (/cidade/minas-gerais/...) e sem UF: redirecionadas para /cidade/{uf}/{slug}.

## Conclusão da verificação HTTP (19/08/2026)

Das 56 URLs prioritárias verificadas por HTTP, 55 respondem 301 e 1 está viva (a home). **Não existe nenhuma URL prioritária em 404** — toda a autoridade histórica registrada no GSC está preservada via 301. O Google já recebe os redirects corretamente; a única ação necessária é acelerar o recrawl das URLs de destino.

### Procedimento recomendado no Search Console

1. Copiar a coluna "Situação" (URLs de destino dos 301) desta lista.
2. Em **Inspeção de URL**, inserir cada destino e clicar em **Solicitar indexação** (começar pelos destinos com mais impressões: janauba, itumbiara, uruguaiana, sao-joao-del-rei, goias).
3. Submeter também o **sitemap.xml** novamente em Sitemaps para forçar o recrawl do inventário completo.
4. Monitorizar o relatório **Cobertura/Páginas** nas próximas 2–4 semanas: as páginas /cidade/{uf}/{slug} devem absorver as impressões dos destinos redirecionados.

## Lista prioritária (>=30 impressões)

| Impressões | Posição | Status HTTP | Situação | URL |
|---|---|---|---|---|
| 799 | 17.43 | 200 | monitorar | https://www.meuddd.com.br/ |
| 164 | 8.21 | 301 | https://www.meuddd.com.br/cidade/mg/janauba | https://www.meuddd.com.br/cidade/minas-gerais/janauba |
| 137 | 10.11 | 301 | https://www.meuddd.com.br/cidade/go/itumbiara | https://www.meuddd.com.br/cidade/goias/itumbiara |
| 116 | 9.53 | 301 | https://www.meuddd.com.br/cidade/rs/uruguaiana | https://www.meuddd.com.br/cidade/rio-grande-do-sul/uruguaiana |
| 116 | 9.87 | 301 | https://www.meuddd.com.br/cidade/mg/sao-joao-del-rei | https://www.meuddd.com.br/cidade/minas-gerais/sao-joao-del-rei |
| 104 | 11.67 | 301 | https://www.meuddd.com.br/cidade/go/goias | https://www.meuddd.com.br/cidade/goias/goias |
| 100 | 9.16 | 301 | https://www.meuddd.com.br/cidade/go/anapolis | https://www.meuddd.com.br/cidade/goias/anapolis |
| 98 | 10.6 | 301 | https://www.meuddd.com.br/cidade/sp/araraquara | https://www.meuddd.com.br/cidade/araraquara |
| 92 | 9.03 | 301 | https://www.meuddd.com.br/cidade/rs/bage | https://www.meuddd.com.br/cidade/rio-grande-do-sul/bage |
| 89 | 8.7 | 301 | https://www.meuddd.com.br/cidade/rs/santa-rosa | https://www.meuddd.com.br/cidade/rio-grande-do-sul/santa-rosa |
| 87 | 7.57 | 301 | https://www.meuddd.com.br/cidade/go/anapolis | https://www.meuddd.com.br/cidade/anapolis |
| 73 | 9.77 | 301 | https://www.meuddd.com.br/cidade/sp/olimpia | https://www.meuddd.com.br/cidade/sao-paulo/olimpia |
| 68 | 10.37 | 301 | https://www.meuddd.com.br/cidade/go/trindade | https://www.meuddd.com.br/cidade/goias/trindade |
| 64 | 9.36 | 301 | https://www.meuddd.com.br/cidade/mg/santa-luzia | https://www.meuddd.com.br/cidade/minas-gerais/santa-luzia |
| 62 | 9.94 | 301 | https://www.meuddd.com.br/cidade/rn/mossoro | https://www.meuddd.com.br/cidade/rio-grande-do-norte/mossoro |
| 61 | 9.03 | 301 | https://www.meuddd.com.br/cidade/ms/corumba | https://www.meuddd.com.br/cidade/corumba |
| 60 | 8.03 | 301 | https://www.meuddd.com.br/cidade/rs/taquara | https://www.meuddd.com.br/cidade/rio-grande-do-sul/taquara |
| 58 | 9.07 | 301 | https://www.meuddd.com.br/cidade/sc/campos-novos | https://www.meuddd.com.br/cidade/santa-catarina/campos-novos |
| 58 | 9.6 | 301 | https://www.meuddd.com.br/cidade/rs/pelotas | https://www.meuddd.com.br/cidade/rio-grande-do-sul/pelotas |
| 57 | 8.53 | 301 | https://www.meuddd.com.br/cidade/pr/sarandi | https://www.meuddd.com.br/cidade/parana/sarandi |
| 57 | 8.88 | 301 | https://www.meuddd.com.br/cidade/mg/jaiba | https://www.meuddd.com.br/cidade/minas-gerais/jaiba |
| 57 | 9.98 | 301 | https://www.meuddd.com.br/cidade/ba/feira-de-santana | https://www.meuddd.com.br/cidade/bahia/feira-de-santana |
| 53 | 9.75 | 301 | https://www.meuddd.com.br/cidade/mt/campo-verde | https://www.meuddd.com.br/cidade/mato-grosso/campo-verde |
| 52 | 8.42 | 301 | https://www.meuddd.com.br/cidade/ce/tiangua | https://www.meuddd.com.br/cidade/ceara/tiangua |
| 47 | 9.68 | 301 | https://www.meuddd.com.br/cidade/rs/cachoeirinha | https://www.meuddd.com.br/cidade/rio-grande-do-sul/cachoeirinha |
| 47 | 37.45 | 301 | https://www.meuddd.com.br/cidade/pb/passagem | https://www.meuddd.com.br/cidade/paraiba/passagem |
| 46 | 9.67 | 301 | https://www.meuddd.com.br/cidade/sp/praia-grande | https://www.meuddd.com.br/cidade/sao-paulo/praia-grande |
| 46 | 10.04 | 301 | https://www.meuddd.com.br/cidade/go/aguas-lindas-de-goias | https://www.meuddd.com.br/cidade/goias/aguas-lindas-de-goias |
| 45 | 8.93 | 301 | https://www.meuddd.com.br/cidade/mg/claudio | https://www.meuddd.com.br/cidade/minas-gerais/claudio |
| 45 | 12.27 | 301 | https://www.meuddd.com.br/cidade/pe/caruaru | https://www.meuddd.com.br/cidade/pernambuco/caruaru |
| 42 | 8.67 | 301 | https://www.meuddd.com.br/cidade/pe/igarassu | https://www.meuddd.com.br/cidade/pernambuco/igarassu |
| 42 | 8.95 | 301 | https://www.meuddd.com.br/cidade/rr/pacaraima | https://www.meuddd.com.br/cidade/roraima/pacaraima |
| 41 | 9.44 | 301 | https://www.meuddd.com.br/cidade/rs/santo-angelo | https://www.meuddd.com.br/cidade/rio-grande-do-sul/santo-angelo |
| 41 | 9.85 | 301 | https://www.meuddd.com.br/cidade/to/araguaina | https://www.meuddd.com.br/cidade/tocantins/araguaina |
| 40 | 9.28 | 301 | https://www.meuddd.com.br/cidade/pa/xinguara | https://www.meuddd.com.br/cidade/para/xinguara |
| 40 | 9.28 | 301 | https://www.meuddd.com.br/cidade/rs/ijui | https://www.meuddd.com.br/cidade/rio-grande-do-sul/ijui |
| 40 | 9.32 | 301 | https://www.meuddd.com.br/cidade/ba/camacari | https://www.meuddd.com.br/cidade/bahia/camacari |
| 40 | 10.15 | 301 | https://www.meuddd.com.br/cidade/sc/chapeco | https://www.meuddd.com.br/cidade/santa-catarina/chapeco |
| 40 | 43.92 | 301 | https://www.meuddd.com.br/ | https://www.meuddd.com.br/index.html |
| 39 | 8.85 | 301 | https://www.meuddd.com.br/cidade/rj/sao-goncalo | https://www.meuddd.com.br/cidade/rio-de-janeiro/sao-goncalo |
| 38 | 8.92 | 301 | https://www.meuddd.com.br/cidade/mg/campina-verde | https://www.meuddd.com.br/cidade/minas-gerais/campina-verde |
| 38 | 9.0 | 301 | https://www.meuddd.com.br/cidade/ba/ilheus | https://www.meuddd.com.br/cidade/ilheus |
| 38 | 9.5 | 301 | https://www.meuddd.com.br/cidade/rj/nova-friburgo | https://www.meuddd.com.br/cidade/rio-de-janeiro/nova-friburgo |
| 38 | 9.66 | 301 | https://www.meuddd.com.br/cidade/mg/pocos-de-caldas | https://www.meuddd.com.br/cidade/minas-gerais/pocos-de-caldas |
| 36 | 9.28 | 301 | https://www.meuddd.com.br/cidade/rj/armacao-dos-buzios | https://www.meuddd.com.br/cidade/armacao-dos-buzios |
| 35 | 8.14 | 301 | https://www.meuddd.com.br/cidade/mg/andradas | https://www.meuddd.com.br/cidade/andradas |
| 33 | 3.3 | 301 | https://www.meuddd.com.br/cidade/pr/francisco-alves | https://www.meuddd.com.br/cidade/parana/francisco-alves |
| 33 | 10.27 | 301 | https://www.meuddd.com.br/cidade/mg/uberlandia | https://www.meuddd.com.br/cidade/minas-gerais/uberlandia |
| 32 | 9.28 | 301 | https://www.meuddd.com.br/cidade/ba/remanso | https://www.meuddd.com.br/cidade/bahia/remanso |
| 32 | 11.12 | 301 | https://www.meuddd.com.br/cidade/mt/gaucha-do-norte | https://www.meuddd.com.br/cidade/mato-grosso/gaucha-do-norte |
| 31 | 10.42 | 301 | https://www.meuddd.com.br/cidade/ma/alto-parnaiba | https://www.meuddd.com.br/cidade/maranhao/alto-parnaiba |
| 30 | 10.37 | 301 | https://www.meuddd.com.br/cidade/al/arapiraca | https://www.meuddd.com.br/cidade/alagoas/arapiraca |
| 30 | 7.2 | 301 | https://www.meuddd.com.br/cidade/rj/armacao-dos-buzios | https://www.meuddd.com.br/cidade/rio-de-janeiro/armacao-dos-buzios |
| 30 | 8.07 | 301 | https://www.meuddd.com.br/cidade/pr/quedas-do-iguacu | https://www.meuddd.com.br/cidade/parana/quedas-do-iguacu |
| 30 | 8.27 | 301 | https://www.meuddd.com.br/cidade/pa/jacunda | https://www.meuddd.com.br/cidade/para/jacunda |
| 30 | 8.97 | 301 | https://www.meuddd.com.br/cidade/rj/arraial-do-cabo | https://www.meuddd.com.br/cidade/arraial-do-cabo |
