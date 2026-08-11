# Pesquisa de referência — SEO e pesquisa generativa

## Princípios técnicos que orientam a plataforma

As páginas territoriais devem ser renderizadas com HTML completo e ter um objetivo editorial distinto. A orientação do Google para conteúdo útil prioriza informação original, substancial, verificável, orientada a pessoas e com autoria e fontes claras; criação em escala sem valor adicional deve ser evitada. A escala programática só será usada quando cada página tiver dados territoriais, ligações e respostas específicas que resolvam uma intenção real.[1]

Para recursos de IA generativa da Pesquisa Google, as práticas fundamentais de SEO continuam aplicáveis. O guia recomenda conteúdo exclusivo e bem organizado, estrutura técnica rastreável, boa experiência de página, redução de duplicações e páginas elegíveis a snippets. Não há uma marcação isolada que garanta visibilidade em sistemas de IA.[2]

Os dados estruturados serão emitidos em JSON-LD, no HTML da página a que se aplicam, sempre correspondendo ao conteúdo visível e verificável. A implementação privilegiará tipos amplamente compreendidos, como `WebSite`, `Organization`, `WebPage`, `BreadcrumbList`, `ItemList`, `Dataset` e, quando aplicável ao conteúdo visível, `FAQPage`. A documentação oficial esclarece que propriedades devem ser completas e verdadeiras e que a marcação não é garantia de recurso aprimorado.[3] [4]

Em junho de 2026, o Google removeu a documentação e o recurso de pesquisa aprimorada de FAQ. Assim, a secção de perguntas frequentes continua útil para leitores e para entendimento semântico, mas não será tratada como um atalho de rich results. O JSON-LD `FAQPage` só será emitido para perguntas e respostas visíveis, editoriais e específicas de cada página.[5]

Para a descoberta das milhares de URLs, serão criados sitemaps segmentados e uma malha de ligações internas: páginas de estado ligam a municípios e DDDs, páginas de município apontam para o estado e o DDD, e cada DDD mostra estados e municípios abrangidos. O Google indica que sitemaps podem melhorar o rastreio de sites grandes e que ligações internas adequadas continuam essenciais.[6]

URLs com filtros e parâmetros não serão páginas indexáveis por defeito. Cada página editorial terá URL canónico próprio, enquanto variantes de pesquisa apontarão para a página representativa. A documentação do Google explica que a indicação canónica é um sinal, não uma garantia; a consistência entre ligações internas, sitemap, conteúdo e `rel=canonical` reduz ambiguidades.[7]

## Fontes

[1]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=pt-br "Como criar conteúdo útil, confiável e que prioriza as pessoas — Google Search Central"
[2]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=pt-br "Otimizar seu site para recursos de IA generativa na Pesquisa Google"
[3]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=pt-br "Introdução à marcação de dados estruturados — Google Search Central"
[4]: https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=pt-br "Diretrizes gerais de dados estruturados — Google Search Central"
[5]: https://developers.google.com/search/docs/appearance/structured-data/faqpage?hl=pt-br "Atualizações da documentação de FAQPage — Google Search Central"
[6]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=pt-br "Saiba mais sobre sitemaps — Google Search Central"
[7]: https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=pt-br "O que é canonização? — Google Search Central"
