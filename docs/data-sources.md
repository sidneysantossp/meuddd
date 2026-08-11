# Fontes de dados — DDD Brasil

## Municípios e DDDs

A aplicação importa a tabela pública [`municipios.csv`](https://raw.githubusercontent.com/kelvins/municipios-brasileiros/main/csv/municipios.csv) do repositório [kelvins/municipios-brasileiros](https://github.com/kelvins/municipios-brasileiros), disponibilizado sob licença MIT. O ficheiro reúne código IBGE, município, coordenadas, código da UF, DDD e fuso horário.

Na importação de 11 de agosto de 2026, o ficheiro foi validado e carregado com **5 571 municípios**, **27 UFs** e **67 DDDs distintos**, sem registos inválidos. A validação de origem também encontrou **0 duplicidades por código IBGE** e **0 duplicidades por nome de município dentro da mesma UF**. A cobertura dos códigos coincide com as 67 áreas de numeração indicadas pela [Anatel](https://sistemas.anatel.gov.br/anexar-api/publico/anexos/download/7c51a53e26edf77426cb85e42f1080de). A página de dados abertos da Anatel também descreve as condições de dados abertos e as bases territoriais públicas disponíveis.

Os nomes e os códigos municipais serão guardados pelo código IBGE para permitir rastreabilidade e atualização futura. O DDD armazenado corresponde ao código presente no ficheiro de origem e deve ser revisto sempre que a Anatel publicar alterações de numeração.

## Camada cartográfica

O mapa usa a camada GeoJSON de limites estaduais do projeto público [Click That ’Hood](https://github.com/codeforgermany/click_that_hood), com os códigos de UF em cada polígono, para permitir seleção visual. A interface trata a geometria apenas como navegação: o resultado de DDD e municípios continua a ser sempre consultado na base relacional acima.

## População estimada

As fichas territoriais vão usar a tabela de [Estimativas de População 2025 do IBGE](https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/POP2025_20260113.xls), com data de referência em **1 de julho de 2025** e atualização publicada em **13 de janeiro de 2026**. O valor será persistido com o respetivo ano, em vez de ser apresentado como população atual sem qualificação temporal. A documentação metodológica e os ficheiros oficiais estão disponíveis na página de [Estimativas da População do IBGE](https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html).
