# Fontes de integração: IndexNow e Google Search Console

## IndexNow

O protocolo exige a prova de controlo do host através de um ficheiro de texto servido na raiz do domínio. A documentação descreve a submissão de URLs adicionadas, atualizadas ou removidas por chave de proprietário, em chamadas individuais ou em lote.

- Documentação: [IndexNow — Documentation](https://www.indexnow.org/documentation)
- FAQ: [IndexNow — FAQ](https://www.indexnow.org/faq)

## Google Search Console

O Google descreve a Search Console como a ferramenta para medir tráfego e desempenho de pesquisa, resolver problemas de indexação e acompanhar a presença do site. A API disponibiliza acesso programático aos relatórios e ações principais, mas requer uma propriedade verificada e autorização explícita.

- Produto: [Google Search Console](https://search.google.com/search-console/about)
- API: [Search Console API](https://developers.google.com/webmaster-tools)
- Verificação: [Meta tag verification](https://developers.google.com/search/blog/2006/05/more-about-meta-tag-verification)

## Decisão de implementação

O IndexNow pode ser preparado sem segredo de terceiro: a chave é gerada pelo projeto e o ficheiro de verificação é exposto no domínio. Já a leitura de métricas da Search Console depende de uma propriedade Google verificada e de credenciais autorizadas pelo proprietário; a plataforma deve ficar pronta para receber essas credenciais como segredo, sem as armazenar no código ou no repositório.
