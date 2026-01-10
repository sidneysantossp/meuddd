import type { State } from '@/types';

// Dados expandidos para SEO com informações detalhadas de cada estado
export interface StateDetailedInfo {
  area: string;
  municipalities: number;
  urbanCoverage: string;
  mainOperators: Array<{
    name: string;
    coverage: string;
    services: string[];
  }>;
  regionInfo: {
    description: string;
    characteristics: string[];
  };
  highlights: string[];
  telephonyTips: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedStates: Array<{
    name: string;
    abbreviation: string;
    ddds: string[];
  }>;
  authorityLinks: Array<{
    name: string;
    url: string;
    description: string;
  }>;
}

// Informações detalhadas por estado para SEO
export const stateDetailedInfo: Record<string, StateDetailedInfo> = {
  ac: {
    area: '164.123,04 km²',
    municipalities: 22,
    urbanCoverage: '95%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'A maior região do Brasil em área, cobrindo a Amazônia e conhecida por sua biodiversidade e riqueza natural.',
      characteristics: ['Floresta Amazônica', 'Recursos naturais', 'Biodiversidade', 'Cultura indígena']
    },
    highlights: [
      'Estado com importância estratégica no desenvolvimento nacional',
      'Contribuição significativa para a economia brasileira',
      'Preservação ambiental e desenvolvimento sustentável'
    ],
    telephonyTips: [
      'Verifique sempre o DDD correto antes de fazer a ligação',
      'Algumas cidades podem ter mais de um DDD dependendo da região',
      'O DDD 68 atende principalmente o Acre',
      'Para ligações internacionais, use +55 68 + número do telefone'
    ],
    faqs: [
      {
        question: 'Qual o DDD do Acre?',
        answer: 'O código DDD do Acre é 68, que atende todas as 22 cidades do estado, incluindo a capital Rio Branco.'
      },
      {
        question: 'Como fazer ligação para Rio Branco?',
        answer: 'Para ligar para Rio Branco do Acre, disque 0 + código da operadora + 68 + número do telefone. Para ligações de celular, pode discar direto 68 + número.'
      },
      {
        question: 'Quais operadoras funcionam no Acre?',
        answer: 'As principais operadoras que funcionam no Acre são Vivo, Claro, TIM e Oi, todas com cobertura 4G nas principais cidades.'
      },
      {
        question: 'O DDD 68 atende quais cidades?',
        answer: 'O DDD 68 atende todas as cidades do Acre, incluindo Rio Branco, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó e outras 17 cidades.'
      }
    ],
    relatedStates: [
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] },
      { name: 'Rondônia', abbreviation: 'RO', ddds: ['69'] }
    ],
    authorityLinks: [
      {
        name: 'ANATEL - Agência Nacional de Telecomunicações',
        url: 'https://www.gov.br/anatel/pt-br',
        description: 'Órgão regulador das telecomunicações no Brasil'
      },
      {
        name: 'Governo do Estado do Acre',
        url: 'https://www.ac.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Acre',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=ac',
        description: 'Dados oficiais e estatísticas do estado'
      }
    ]
  },
  al: {
    area: '27.843,29 km²',
    municipalities: 102,
    urbanCoverage: '92%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G', 'Fibra óptica', 'TIM Live']
      }
    ],
    regionInfo: {
      description: 'Alagoas (AL) é um estado brasileiro localizado na região Nordeste do Brasil, conhecido por suas belas praias, cultura rica e economia baseada na agricultura, turismo e indústria. O DDD de Alagoas é o código 82, utilizado em todas as cidades do estado. Se você está se perguntando "82 é de qual estado?" ou "de onde é o DDD 82?", a resposta é: Alagoas. O prefixo 82 é exclusivo deste estado nordestino, abrangendo desde a capital Maceió até cidades como Arapiraca e Maragogi. Quando você vê um número com DDD 82, pode ter certeza de que a ligação vem de Alagoas.',
      characteristics: [
        'Litoral paradisíaco com praias de águas cristalinas',
        'Forte tradição cultural e artesanal',
        'Economia diversificada com destaque para turismo e agricultura',
        'Patrimônio histórico colonial preservado',
        'Gastronomia típica nordestina',
        'DDD 82 atende todas as 102 cidades do estado',
        'Código de área 82 exclusivo de Alagoas no Brasil'
      ]
    },
    highlights: [
      'Capital Maceió (AL) com 1.031.597 habitantes usando DDD 82',
      '102 municípios com código DDD 82 - único código do estado',
      'População total de 3.374.114 habitantes em Alagoas',
      'Cobertura 4G/5G nas principais cidades com prefixo 82',
      'Região Nordeste do Brasil - DDD 82 é nordeste',
      'DDD Maceió: 82 para toda a capital alagoana',
      'Arapiraca e todas as cidades usam o mesmo DDD de Alagoas'
    ],
    telephonyTips: [
      'Para ligar de outro estado para Alagoas: 0 + código da operadora + 82 + número do telefone',
      'Para ligar dentro de Alagoas: apenas o número (8 ou 9 dígitos) - não precisa discar o DDD 82',
      'Todas as 102 cidades de Alagoas usam exclusivamente o código DDD 82',
      'O DDD 82 é de Alagoas, estado do Nordeste brasileiro',
      'Cobertura móvel excelente na capital Maceió (DDD 82) e principais cidades',
      'Fibra óptica disponível nas áreas urbanas de Alagoas (AL)',
      'DDD Maceió Alagoas: use o código 82 para ligar para a capital',
      'O prefixo 82 pertence exclusivamente ao estado de Alagoas'
    ],
    faqs: [
      {
        question: 'Qual é o DDD de Alagoas?',
        answer: 'O DDD de Alagoas é 82. Este é o código de área telefônico utilizado em todas as 102 cidades do estado de Alagoas, incluindo a capital Maceió, Arapiraca, Maragogi e todas as demais localidades. Quando alguém pergunta "qual o DDD de Alagoas?" ou "qual é o código de Alagoas?", a resposta é sempre: 82.'
      },
      {
        question: 'DDD 82 é de qual estado?',
        answer: 'O DDD 82 é de Alagoas (AL), estado localizado na região Nordeste do Brasil. Se você recebeu uma ligação com o prefixo 82 ou está se perguntando "82 é de qual estado?", "de onde é o DDD 82?" ou "código 82 é de qual estado?", saiba que este número vem de Alagoas. O DDD 82 é exclusivo deste estado e atende todas as suas cidades.'
      },
      {
        question: 'De onde é o DDD 82?',
        answer: 'O DDD 82 é de Alagoas, estado do Nordeste brasileiro. Muitas pessoas perguntam "de onde é o DDD 82?", "082 é de onde?" ou "82 DDD de qual estado?". A resposta é: o código 82 pertence a Alagoas (AL). Este prefixo telefônico cobre todo o território alagoano, desde Maceió até as cidades do interior como Arapiraca.'
      },
      {
        question: 'Qual o DDD de Maceió?',
        answer: 'O DDD de Maceió é 82, o mesmo código usado em todo o estado de Alagoas. Se você precisa ligar para Maceió (AL), use o DDD 82. Muitos buscam "DDD Maceió", "DDD Maceió AL" ou "qual o DDD de Maceió Alagoas" - em todos os casos, o código é 82. A capital alagoana compartilha o mesmo DDD com todas as outras cidades do estado.'
      },
      {
        question: 'DDD 82 é de qual cidade?',
        answer: 'O DDD 82 não é de uma cidade específica, mas sim de todo o estado de Alagoas. Quando perguntam "DDD 82 é de qual cidade?" ou "82 DDD de qual cidade?", é importante saber que o código 82 atende todas as 102 cidades alagoanas, incluindo Maceió (capital), Arapiraca, Maragogi, União dos Palmares e muitas outras. O prefixo 82 é o código de área de Alagoas.'
      },
      {
        question: 'Como fazer ligações para Alagoas?',
        answer: 'Para ligar de outro estado para Alagoas, disque: 0 + código da operadora (21 para Vivo, 31 para TIM, 41 para Claro) + 82 + número do telefone. Se você está em Alagoas ligando para outro número dentro do estado, basta discar o número direto. O DDD 82 é necessário apenas para ligações de fora de Alagoas.'
      },
      {
        question: 'Quantas cidades tem Alagoas?',
        answer: 'Alagoas possui 102 municípios, todos atendidos pelo código DDD 82. Entre as principais cidades estão Maceió (capital), Arapiraca, Maragogi, União dos Palmares, Penedo e Rio Largo. Todas essas cidades compartilham o mesmo DDD de Alagoas: 82.'
      },
      {
        question: 'DDD 82 é Nordeste?',
        answer: 'Sim, o DDD 82 é da região Nordeste do Brasil. Alagoas, estado que usa o código 82, está localizado no Nordeste brasileiro. Quando perguntam "DDD 82 é nordeste?" ou "DDD 82 é de qual região?", a resposta é: sim, o código 82 pertence a Alagoas, estado nordestino.'
      },
      {
        question: 'Qual o código de área de Alagoas?',
        answer: 'O código de área de Alagoas é 82. Este também é chamado de código DDD, prefixo telefônico ou código de discagem. Se você busca "código de área 82", "codigo de area Alagoas" ou "qual o código de Alagoas", a resposta é sempre 82. Este é o único código de área usado em todo o estado de Alagoas (AL).'
      },
      {
        question: 'Qual o DDD de Arapiraca?',
        answer: 'O DDD de Arapiraca é 82, o mesmo código usado em todo o estado de Alagoas. Arapiraca, segunda maior cidade de Alagoas, compartilha o DDD 82 com Maceió e todas as outras cidades alagoanas. Se você precisa saber "DDD Arapiraca Alagoas" ou "qual o DDD de Arapiraca", a resposta é: 82.'
      },
      {
        question: 'Quais operadoras têm cobertura em Alagoas?',
        answer: 'As principais operadoras com cobertura em Alagoas (DDD 82) são Vivo, Claro e TIM, oferecendo serviços de telefonia móvel 4G/5G e internet fibra óptica. Todas essas operadoras atendem a capital Maceió e as principais cidades do estado com o código de área 82.'
      },
      {
        question: 'O que significa 082?',
        answer: 'O código 082 é outra forma de escrever o DDD 82 de Alagoas. Algumas pessoas buscam "082 DDD", "DDD 082" ou "082 é de qual estado?" - em todos os casos, refere-se ao mesmo código de Alagoas. O zero à esquerda (082) era usado antigamente em ligações interurbanas, mas hoje o padrão é usar apenas 82.'
      }
    ],
    relatedStates: [
      { name: 'Pernambuco', abbreviation: 'PE', ddds: ['81', '87'] },
      { name: 'Sergipe', abbreviation: 'SE', ddds: ['79'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] }
    ],
    authorityLinks: [
      {
        name: 'ANATEL - Agência Nacional de Telecomunicações',
        url: 'https://www.gov.br/anatel/pt-br',
        description: 'Órgão regulador das telecomunicações no Brasil'
      },
      {
        name: 'Governo do Estado de Alagoas',
        url: 'https://www.alagoas.al.gov.br',
        description: 'Portal oficial do governo estadual de Alagoas (AL)'
      },
      {
        name: 'IBGE - Alagoas',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=al',
        description: 'Dados oficiais e estatísticas do estado de Alagoas'
      }
    ]
  },
  ap: {
    area: '142.470,76 km²',
    municipalities: 16,
    urbanCoverage: '88%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G', 'Fibra óptica', 'TIM Live']
      }
    ],
    regionInfo: {
      description: 'Amapá é um estado brasileiro localizado na região Norte, conhecido por sua vasta floresta amazônica, biodiversidade única e localização estratégica na fronteira com a Guiana Francesa. O estado possui o código DDD 96 para todas as suas cidades.',
      characteristics: [
        'Maior parte do território coberto pela Floresta Amazônica',
        'Fronteira internacional com a Guiana Francesa',
        'Economia baseada em extrativismo e mineração',
        'Forte presença de comunidades indígenas e ribeirinhas',
        'Biodiversidade amazônica preservada'
      ]
    },
    highlights: [
      'Capital Macapá com 512.902 habitantes',
      '16 municípios com código DDD 96',
      'População total de 877.613 habitantes',
      'Cobertura 4G/5G na capital e principais cidades',
      'Região Norte do Brasil'
    ],
    telephonyTips: [
      'Para ligar de outro estado para Amapá: 0 + código da operadora + 96 + número',
      'Para ligar dentro de Amapá: apenas o número (8 ou 9 dígitos)',
      'Todas as cidades de Amapá usam o código DDD 96',
      'Cobertura móvel excelente na capital Macapá',
      'Fibra óptica disponível nas principais áreas urbanas'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD do Amapá?',
        answer: 'O código DDD do Amapá é 96, utilizado em todas as 16 cidades do estado, incluindo a capital Macapá.'
      },
      {
        question: 'Como fazer ligações para o Amapá de outros estados?',
        answer: 'Para ligar de outro estado para o Amapá, disque: 0 + código da operadora (21 para Vivo, 31 para TIM, 41 para Claro) + 96 + número do telefone.'
      },
      {
        question: 'Quantas cidades tem o Amapá?',
        answer: 'O Amapá possui 16 municípios, todos atendidos pelo código DDD 96.'
      },
      {
        question: 'Quais operadoras têm cobertura no Amapá?',
        answer: 'As principais operadoras com cobertura no Amapá são Vivo, Claro e TIM, oferecendo serviços de telefonia móvel 4G/5G e internet fibra óptica.'
      },
      {
        question: 'Qual é a capital do Amapá?',
        answer: 'A capital do Amapá é Macapá, com população de aproximadamente 512.902 habitantes.'
      }
    ],
    relatedStates: [
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] },
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] },
      { name: 'Roraima', abbreviation: 'RR', ddds: ['95'] }
    ],
    authorityLinks: [
      {
        name: 'ANATEL - Agência Nacional de Telecomunicações',
        url: 'https://www.gov.br/anatel/pt-br',
        description: 'Órgão regulador das telecomunicações no Brasil'
      },
      {
        name: 'Governo do Estado do Amapá',
        url: 'https://www.portal.ap.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Amapá',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=ap',
        description: 'Dados oficiais e estatísticas do estado'
      }
    ]
  },
  mg: {
    area: '586.521,12 km²',
    municipalities: 853,
    urbanCoverage: '92%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Minas Gerais é o segundo estado mais populoso do Brasil e possui a maior quantidade de municípios do país, com 853 cidades distribuídas em 7 códigos DDD diferentes.',
      characteristics: ['Maior número de municípios do Brasil', 'Economia diversificada', 'Patrimônio histórico e cultural', 'Turismo religioso e histórico']
    },
    highlights: [
      'Estado com o maior número de municípios do Brasil (853 cidades)',
      'Segundo estado mais populoso do país com mais de 21 milhões de habitantes',
      'Importante polo industrial, agrícola e de mineração',
      'Patrimônio histórico preservado com cidades coloniais',
      'Referência em educação superior e pesquisa'
    ],
    telephonyTips: [
      'Minas Gerais possui 7 códigos DDD: 31, 32, 33, 34, 35, 37 e 38',
      'DDD 31 atende Belo Horizonte e região metropolitana',
      'DDD 32 atende Juiz de Fora e Zona da Mata',
      'DDD 33 atende Governador Valadares e Vale do Rio Doce',
      'DDD 34 atende Uberlândia, Uberaba e Triângulo Mineiro',
      'DDD 35 atende Poços de Caldas, Varginha e Sul de Minas',
      'DDD 37 atende Divinópolis e Centro-Oeste de Minas',
      'DDD 38 atende Montes Claros e Norte de Minas',
      'Para ligações internacionais, use +55 + DDD + número do telefone'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD de Minas Gerais?',
        answer: 'Minas Gerais possui 7 códigos DDD: 31 (Belo Horizonte e região metropolitana), 32 (Juiz de Fora e Zona da Mata), 33 (Governador Valadares e Vale do Rio Doce), 34 (Uberlândia, Uberaba e Triângulo Mineiro), 35 (Poços de Caldas, Varginha e Sul de Minas), 37 (Divinópolis e Centro-Oeste) e 38 (Montes Claros e Norte de Minas).'
      },
      {
        question: 'Qual o DDD de Belo Horizonte?',
        answer: 'O código DDD de Belo Horizonte, capital de Minas Gerais, é 31. Este código também atende toda a região metropolitana, incluindo Contagem, Betim, Ribeirão das Neves, Santa Luzia e outras cidades próximas.'
      },
      {
        question: 'Como fazer ligação para Minas Gerais?',
        answer: 'Para ligar para Minas Gerais de outro estado, disque 0 + código da operadora + DDD da cidade + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem Minas Gerais?',
        answer: 'Minas Gerais possui 853 municípios, sendo o estado brasileiro com o maior número de cidades. Essas cidades estão distribuídas em 7 códigos DDD diferentes, cobrindo todo o território mineiro.'
      },
      {
        question: 'Qual DDD usar para ligar para Juiz de Fora?',
        answer: 'Para ligar para Juiz de Fora, use o DDD 32. Este código também atende outras cidades da Zona da Mata Mineira, como Muriaé, Cataguases, Ubá, Santos Dumont e Leopoldina.'
      },
      {
        question: 'Quais operadoras funcionam em Minas Gerais?',
        answer: 'As principais operadoras que funcionam em Minas Gerais são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G nas principais cidades e fibra óptica disponível em áreas urbanas.'
      }
    ],
    relatedStates: [
      { name: 'São Paulo', abbreviation: 'SP', ddds: ['11', '12', '13', '14', '15', '16', '17', '18', '19'] },
      { name: 'Rio de Janeiro', abbreviation: 'RJ', ddds: ['21', '22', '24'] },
      { name: 'Espírito Santo', abbreviation: 'ES', ddds: ['27', '28'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] },
      { name: 'Goiás', abbreviation: 'GO', ddds: ['62', '64'] }
    ],
    authorityLinks: [
      {
        name: 'Governo de Minas Gerais',
        url: 'https://www.mg.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Minas Gerais',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=mg',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa de Minas Gerais',
        url: 'https://www.almg.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Belo Horizonte',
        url: 'https://prefeitura.pbh.gov.br',
        description: 'Portal oficial da capital mineira'
      }
    ]
  },
  pa: {
    area: '1.245.870,71 km²',
    municipalities: 144,
    urbanCoverage: '88%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Pará é o segundo maior estado do Brasil em área territorial e possui 144 municípios distribuídos em 3 códigos DDD, abrangendo a região amazônica com sua rica biodiversidade.',
      characteristics: ['Maior biodiversidade do Brasil', 'Economia baseada em mineração e agropecuária', 'Patrimônio natural amazônico', 'Importantes hidrelétricas']
    },
    highlights: [
      'Segundo maior estado do Brasil em área territorial',
      'Possui 144 municípios distribuídos em 3 códigos DDD',
      'Importante polo de mineração (Carajás)',
      'Hidrelétrica de Tucuruí, uma das maiores do Brasil',
      'Porta de entrada para a Amazônia'
    ],
    telephonyTips: [
      'O Pará possui 3 códigos DDD: 91, 93 e 94',
      'DDD 91 atende Belém e região metropolitana',
      'DDD 93 atende Santarém e oeste do estado',
      'DDD 94 atende Marabá e sudeste do estado',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Algumas áreas remotas podem ter cobertura limitada',
      'Verifique a cobertura da operadora antes de viajar para o interior'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD do Pará?',
        answer: 'O Pará possui 3 códigos DDD: 91 (Belém e região metropolitana), 93 (Santarém e oeste do estado) e 94 (Marabá e sudeste do estado).'
      },
      {
        question: 'Qual o DDD de Belém?',
        answer: 'O código DDD de Belém, capital do Pará, é 91. Este código também atende toda a região metropolitana, incluindo Ananindeua, Marituba, Benevides, Castanhal e outras cidades próximas.'
      },
      {
        question: 'Como fazer ligação para o Pará?',
        answer: 'Para ligar para o Pará de outro estado, disque 0 + código da operadora + DDD da cidade + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem o Pará?',
        answer: 'O Pará possui 144 municípios distribuídos em 3 códigos DDD diferentes, cobrindo todo o território paraense, que é o segundo maior estado do Brasil em área.'
      },
      {
        question: 'Qual DDD usar para ligar para Santarém?',
        answer: 'Para ligar para Santarém, use o DDD 93. Este código também atende outras cidades do oeste do Pará, como Altamira, Itaituba, Oriximiná e Óbidos.'
      },
      {
        question: 'Quais operadoras funcionam no Pará?',
        answer: 'As principais operadoras que funcionam no Pará são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G nas principais cidades. Em áreas remotas, a cobertura pode ser limitada.'
      }
    ],
    relatedStates: [
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] },
      { name: 'Amapá', abbreviation: 'AP', ddds: ['96'] },
      { name: 'Maranhão', abbreviation: 'MA', ddds: ['98', '99'] },
      { name: 'Tocantins', abbreviation: 'TO', ddds: ['63'] },
      { name: 'Mato Grosso', abbreviation: 'MT', ddds: ['65', '66'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Pará',
        url: 'https://www.pa.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Pará',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=pa',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Pará',
        url: 'https://www.alepa.pa.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Belém',
        url: 'https://www.belem.pa.gov.br',
        description: 'Portal oficial da capital paraense'
      }
    ]
  },
  pb: {
    area: '56.467,242 km²',
    municipalities: 223,
    urbanCoverage: '85%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'A Paraíba possui 223 municípios distribuídos em um único código DDD (83), abrangendo todo o território estadual com suas belezas naturais e rica cultura nordestina.',
      characteristics: ['Litoral paradisíaco', 'Economia diversificada', 'Patrimônio histórico colonial', 'Ponto mais oriental das Américas']
    },
    highlights: [
      'Possui 223 municípios com código DDD único (83)',
      'Ponto mais oriental das Américas (Ponta do Seixas)',
      'Litoral com praias paradisíacas',
      'Importante polo tecnológico em Campina Grande',
      'Rica tradição cultural nordestina'
    ],
    telephonyTips: [
      'A Paraíba possui apenas 1 código DDD: 83',
      'O DDD 83 atende todo o estado da Paraíba',
      'Para ligações de outros estados, disque 0 + operadora + 83 + número',
      'Para ligações internacionais, use +55 83 + número do telefone',
      'Todas as cidades paraibanas usam o mesmo código DDD',
      'Boa cobertura de telefonia móvel em todo o estado'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD da Paraíba?',
        answer: 'A Paraíba possui apenas um código DDD: 83, que atende todos os 223 municípios do estado, incluindo a capital João Pessoa, Campina Grande, Santa Rita, Patos e todas as demais cidades.'
      },
      {
        question: 'Qual o DDD de João Pessoa?',
        answer: 'O código DDD de João Pessoa, capital da Paraíba, é 83. Este mesmo código atende todo o estado, facilitando as ligações entre as cidades paraibanas.'
      },
      {
        question: 'Como fazer ligação para a Paraíba?',
        answer: 'Para ligar para a Paraíba de outro estado, disque 0 + código da operadora + 83 + número do telefone. Para ligações de celular, pode discar direto 83 + número. Para ligações internacionais, use +55 83 + número.'
      },
      {
        question: 'Quantas cidades tem a Paraíba?',
        answer: 'A Paraíba possui 223 municípios, todos atendidos pelo código DDD 83. As principais cidades são João Pessoa (capital), Campina Grande, Santa Rita, Patos, Bayeux, Sousa e Cajazeiras.'
      },
      {
        question: 'Por que a Paraíba tem apenas um DDD?',
        answer: 'A Paraíba possui apenas um código DDD (83) devido ao tamanho do estado e à quantidade de linhas telefônicas. Isso facilita as ligações dentro do estado, pois todas as cidades usam o mesmo código.'
      },
      {
        question: 'Quais operadoras funcionam na Paraíba?',
        answer: 'As principais operadoras que funcionam na Paraíba são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G nas principais cidades e boa cobertura em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'Pernambuco', abbreviation: 'PE', ddds: ['81', '87'] },
      { name: 'Rio Grande do Norte', abbreviation: 'RN', ddds: ['84'] },
      { name: 'Ceará', abbreviation: 'CE', ddds: ['85', '88'] },
      { name: 'Alagoas', abbreviation: 'AL', ddds: ['82'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado da Paraíba',
        url: 'https://www.paraiba.pb.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Paraíba',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=pb',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa da Paraíba',
        url: 'https://www.al.pb.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de João Pessoa',
        url: 'https://www.joaopessoa.pb.gov.br',
        description: 'Portal oficial da capital paraibana'
      }
    ]
  },
  pr: {
    area: '199.307,985 km²',
    municipalities: 399,
    urbanCoverage: '87%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Paraná possui 399 municípios distribuídos em 6 códigos DDD (41, 42, 43, 44, 45, 46), abrangendo todo o território estadual com forte economia agroindustrial e turismo diversificado.',
      characteristics: ['Economia diversificada', 'Polo tecnológico', 'Turismo natural (Foz do Iguaçu)', 'Agricultura forte']
    },
    highlights: [
      'Possui 399 municípios distribuídos em 6 códigos DDD',
      'Curitiba é referência em planejamento urbano',
      'Foz do Iguaçu abriga as Cataratas do Iguaçu',
      'Forte polo agroindustrial e tecnológico',
      'Região Sul com clima subtropical'
    ],
    telephonyTips: [
      'O Paraná possui 6 códigos DDD: 41, 42, 43, 44, 45, 46',
      'DDD 41 atende Curitiba e Região Metropolitana',
      'DDD 42 atende Ponta Grossa e região central',
      'DDD 43 atende Londrina e norte do estado',
      'DDD 44 atende Maringá e noroeste',
      'DDD 45 atende Cascavel e Foz do Iguaçu',
      'DDD 46 atende Francisco Beltrão e sudoeste',
      'Para ligações de outros estados, disque 0 + operadora + DDD + número',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Excelente cobertura 4G/5G nas principais cidades'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD do Paraná?',
        answer: 'O Paraná possui 6 códigos DDD: 41 (Curitiba e Região Metropolitana), 42 (Ponta Grossa e região), 43 (Londrina e norte), 44 (Maringá e noroeste), 45 (Cascavel e Foz do Iguaçu) e 46 (Francisco Beltrão e sudoeste).'
      },
      {
        question: 'Qual o DDD de Curitiba?',
        answer: 'O código DDD de Curitiba, capital do Paraná, é 41. Este código também atende toda a Região Metropolitana, incluindo São José dos Pinhais, Colombo, Araucária, Pinhais e outras cidades próximas.'
      },
      {
        question: 'Como fazer ligação para o Paraná?',
        answer: 'Para ligar para o Paraná de outro estado, disque 0 + código da operadora + DDD (41, 42, 43, 44, 45 ou 46) + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem o Paraná?',
        answer: 'O Paraná possui 399 municípios distribuídos em 6 códigos DDD. As principais cidades são Curitiba (capital), Londrina, Maringá, Ponta Grossa, Cascavel, Foz do Iguaçu, São José dos Pinhais e Colombo.'
      },
      {
        question: 'Qual o DDD de Foz do Iguaçu?',
        answer: 'O código DDD de Foz do Iguaçu é 45, o mesmo código que atende Cascavel, Toledo, Medianeira e outras cidades do oeste paranaense.'
      },
      {
        question: 'Quais operadoras funcionam no Paraná?',
        answer: 'As principais operadoras que funcionam no Paraná são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G nas principais cidades e excelente cobertura em todo o estado, incluindo áreas rurais.'
      }
    ],
    relatedStates: [
      { name: 'São Paulo', abbreviation: 'SP', ddds: ['11', '12', '13', '14', '15', '16', '17', '18', '19'] },
      { name: 'Santa Catarina', abbreviation: 'SC', ddds: ['47', '48', '49'] },
      { name: 'Mato Grosso do Sul', abbreviation: 'MS', ddds: ['67'] },
      { name: 'Rio Grande do Sul', abbreviation: 'RS', ddds: ['51', '53', '54', '55'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Paraná',
        url: 'https://www.pr.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Paraná',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=pr',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Paraná',
        url: 'https://www.assembleia.pr.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Curitiba',
        url: 'https://www.curitiba.pr.gov.br',
        description: 'Portal oficial da capital paranaense'
      }
    ]
  },
  pe: {
    area: '98.067,881 km²',
    municipalities: 185,
    urbanCoverage: '89%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Pernambuco possui 185 municípios distribuídos em 2 códigos DDD (81, 87), abrangendo desde a Região Metropolitana do Recife até o Sertão do São Francisco, com forte economia baseada em serviços, turismo, tecnologia e agricultura.',
      characteristics: ['Polo tecnológico (Porto Digital)', 'Turismo histórico e cultural', 'Carnaval de Olinda e Recife', 'Agricultura irrigada (Vale do São Francisco)']
    },
    highlights: [
      'Possui 185 municípios distribuídos em 2 códigos DDD',
      'Recife é a capital e maior cidade do estado',
      'Porto Digital é um dos maiores parques tecnológicos do Brasil',
      'Petrolina é polo de fruticultura irrigada',
      'Olinda é Patrimônio Mundial da UNESCO'
    ],
    telephonyTips: [
      'Pernambuco possui 2 códigos DDD: 81 e 87',
      'DDD 81 atende Recife, Região Metropolitana e Zona da Mata',
      'DDD 87 atende Petrolina, Serra Talhada e Sertão',
      'Para ligações de outros estados, disque 0 + operadora + DDD + número',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Excelente cobertura 4G/5G na Região Metropolitana do Recife',
      'Cobertura 4G expandida no Sertão e Vale do São Francisco',
      'Fernando de Noronha usa DDD 81'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD de Pernambuco?',
        answer: 'Pernambuco possui 2 códigos DDD: 81 (Recife, Região Metropolitana, Zona da Mata e Agreste) e 87 (Petrolina, Serra Talhada e Sertão do São Francisco).'
      },
      {
        question: 'Qual o DDD de Recife?',
        answer: 'O código DDD de Recife, capital de Pernambuco, é 81. Este código também atende toda a Região Metropolitana, incluindo Jaboatão dos Guararapes, Olinda, Paulista, Cabo de Santo Agostinho, Camaragibe e outras cidades próximas.'
      },
      {
        question: 'Qual o DDD de Petrolina?',
        answer: 'O código DDD de Petrolina é 87, o mesmo código que atende Serra Talhada, Araripina, Ouricuri, Salgueiro e outras cidades do Sertão pernambucano.'
      },
      {
        question: 'Como fazer ligação para Pernambuco?',
        answer: 'Para ligar para Pernambuco de outro estado, disque 0 + código da operadora + DDD (81 ou 87) + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem Pernambuco?',
        answer: 'Pernambuco possui 185 municípios distribuídos em 2 códigos DDD. As principais cidades são Recife (capital), Jaboatão dos Guararapes, Olinda, Caruaru, Petrolina, Paulista, Cabo de Santo Agostinho e Camaragibe.'
      },
      {
        question: 'Quais operadoras funcionam em Pernambuco?',
        answer: 'As principais operadoras que funcionam em Pernambuco são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G na Região Metropolitana do Recife e excelente cobertura em todo o estado, incluindo o Sertão.'
      }
    ],
    relatedStates: [
      { name: 'Paraíba', abbreviation: 'PB', ddds: ['83'] },
      { name: 'Ceará', abbreviation: 'CE', ddds: ['85', '88'] },
      { name: 'Alagoas', abbreviation: 'AL', ddds: ['82'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] },
      { name: 'Piauí', abbreviation: 'PI', ddds: ['86', '89'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado de Pernambuco',
        url: 'https://www.pe.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Pernambuco',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=pe',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa de Pernambuco',
        url: 'https://www.alepe.pe.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura do Recife',
        url: 'https://www.recife.pe.gov.br',
        description: 'Portal oficial da capital pernambucana'
      }
    ]
  },
  pi: {
    area: '251.755,485 km²',
    municipalities: 224,
    urbanCoverage: '75%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Piauí possui 224 municípios distribuídos em 2 códigos DDD (86, 89), abrangendo desde o litoral até o cerrado e a caatinga, com economia baseada em agricultura, pecuária, turismo e serviços.',
      characteristics: ['Delta do Parnaíba (único das Américas)', 'Parque Nacional Serra da Capivara (Patrimônio Mundial)', 'Produção de mel e caju', 'Turismo ecológico']
    },
    highlights: [
      'Possui 224 municípios distribuídos em 2 códigos DDD',
      'Teresina é a única capital do Nordeste fora do litoral',
      'Delta do Parnaíba é o único delta em mar aberto das Américas',
      'Serra da Capivara possui o maior acervo de arte rupestre do mundo',
      'Parnaíba é importante polo turístico e comercial'
    ],
    telephonyTips: [
      'O Piauí possui 2 códigos DDD: 86 e 89',
      'DDD 86 atende Teresina, Parnaíba e norte do estado',
      'DDD 89 atende Picos, Floriano e sul do estado',
      'Para ligações de outros estados, disque 0 + operadora + DDD + número',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Cobertura 4G/5G em Teresina e principais cidades',
      'Cobertura expandida no interior do estado'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD do Piauí?',
        answer: 'O Piauí possui 2 códigos DDD: 86 (Teresina, Parnaíba e norte do estado) e 89 (Picos, Floriano, Oeiras e sul do estado).'
      },
      {
        question: 'Qual o DDD de Teresina?',
        answer: 'O código DDD de Teresina, capital do Piauí, é 86. Este código também atende Parnaíba, Piripiri, Campo Maior, Barras, Altos, José de Freitas, Esperantina e outras cidades do norte do estado.'
      },
      {
        question: 'Qual o DDD de Picos?',
        answer: 'O código DDD de Picos é 89, o mesmo código que atende Floriano, Oeiras, São Raimundo Nonato, Paulistana e outras cidades do sul do Piauí.'
      },
      {
        question: 'Como fazer ligação para o Piauí?',
        answer: 'Para ligar para o Piauí de outro estado, disque 0 + código da operadora + DDD (86 ou 89) + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem o Piauí?',
        answer: 'O Piauí possui 224 municípios distribuídos em 2 códigos DDD. As principais cidades são Teresina (capital), Parnaíba, Picos, Floriano, Piripiri, Campo Maior, Barras e Altos.'
      },
      {
        question: 'Quais operadoras funcionam no Piauí?',
        answer: 'As principais operadoras que funcionam no Piauí são Vivo, Claro, TIM e Oi, todas com cobertura 4G/5G em Teresina e principais cidades, e boa cobertura no interior do estado.'
      }
    ],
    relatedStates: [
      { name: 'Maranhão', abbreviation: 'MA', ddds: ['98', '99'] },
      { name: 'Ceará', abbreviation: 'CE', ddds: ['85', '88'] },
      { name: 'Pernambuco', abbreviation: 'PE', ddds: ['81', '87'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] },
      { name: 'Tocantins', abbreviation: 'TO', ddds: ['63'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Piauí',
        url: 'https://www.pi.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Piauí',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=pi',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Piauí',
        url: 'https://www.alepi.pi.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Teresina',
        url: 'https://www.teresina.pi.gov.br',
        description: 'Portal oficial da capital piauiense'
      }
    ]
  },
  rj: {
    area: '43.750,423 km²',
    municipalities: 92,
    urbanCoverage: '97%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Rio de Janeiro possui 92 municípios distribuídos em 3 códigos DDD (21, 22, 24), abrangendo desde a capital até as regiões serranas, litorâneas e do Vale do Paraíba, com economia baseada em petróleo, turismo, serviços e indústria.',
      characteristics: ['Cristo Redentor (Maravilha do Mundo)', 'Pão de Açúcar e praias famosas', 'Polo de petróleo e gás (Macaé)', 'Turismo internacional']
    },
    highlights: [
      'Possui 92 municípios distribuídos em 3 códigos DDD',
      'Rio de Janeiro é a segunda maior metrópole do Brasil',
      'Cristo Redentor é uma das Sete Maravilhas do Mundo Moderno',
      'Macaé é a capital nacional do petróleo',
      'Angra dos Reis possui mais de 365 ilhas'
    ],
    telephonyTips: [
      'O Rio de Janeiro possui 3 códigos DDD: 21, 22 e 24',
      'DDD 21 atende Rio de Janeiro (capital) e Região Metropolitana',
      'DDD 22 atende Campos dos Goytacazes, Macaé e Região dos Lagos',
      'DDD 24 atende Petrópolis, Volta Redonda e Região Serrana',
      'Para ligações de outros estados, disque 0 + operadora + DDD + número',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Cobertura 5G em Rio de Janeiro, Niterói e principais cidades',
      'Excelente cobertura 4G em todo o estado'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD do Rio de Janeiro?',
        answer: 'O Rio de Janeiro possui 3 códigos DDD: 21 (Rio de Janeiro capital e Região Metropolitana), 22 (Campos dos Goytacazes, Macaé e Região dos Lagos) e 24 (Petrópolis, Volta Redonda e Região Serrana).'
      },
      {
        question: 'Qual o DDD da cidade do Rio de Janeiro?',
        answer: 'O código DDD da cidade do Rio de Janeiro (capital) é 21. Este código também atende São Gonçalo, Duque de Caxias, Nova Iguaçu, Niterói, Belford Roxo, São João de Meriti e outras cidades da Região Metropolitana.'
      },
      {
        question: 'Qual o DDD de Campos dos Goytacazes?',
        answer: 'O código DDD de Campos dos Goytacazes é 22, o mesmo código que atende Macaé, Cabo Frio, Rio das Ostras, Araruama e outras cidades do norte fluminense e Região dos Lagos.'
      },
      {
        question: 'Como fazer ligação para o Rio de Janeiro?',
        answer: 'Para ligar para o Rio de Janeiro de outro estado, disque 0 + código da operadora + DDD (21, 22 ou 24) + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem o Rio de Janeiro?',
        answer: 'O Rio de Janeiro possui 92 municípios distribuídos em 3 códigos DDD. As principais cidades são Rio de Janeiro (capital), São Gonçalo, Duque de Caxias, Nova Iguaçu, Niterói, Campos dos Goytacazes, Petrópolis e Volta Redonda.'
      },
      {
        question: 'Quais operadoras funcionam no Rio de Janeiro?',
        answer: 'As principais operadoras que funcionam no Rio de Janeiro são Vivo, Claro, TIM e Oi, todas com cobertura 5G na capital e principais cidades, e excelente cobertura 4G em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'São Paulo', abbreviation: 'SP', ddds: ['11', '12', '13', '14', '15', '16', '17', '18', '19'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] },
      { name: 'Espírito Santo', abbreviation: 'ES', ddds: ['27', '28'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Rio de Janeiro',
        url: 'https://www.rj.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Rio de Janeiro',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=rj',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Rio de Janeiro',
        url: 'https://www.alerj.rj.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura do Rio de Janeiro',
        url: 'https://www.rio.rj.gov.br',
        description: 'Portal oficial da capital fluminense'
      }
    ]
  },
  rn: {
    area: '52.811,110 km²',
    municipalities: 167,
    urbanCoverage: '78%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Rio Grande do Norte possui 167 municípios com código DDD único (84), abrangendo desde o litoral paradisíaco até o sertão, com economia baseada em turismo, petróleo, fruticultura, sal marinho e carcinicultura.',
      characteristics: ['Maior produtor de sal marinho do Brasil', 'Cajueiro de Pirangi (maior do mundo)', 'Praias paradisíacas e dunas', 'Polo de fruticultura irrigada']
    },
    highlights: [
      'Possui 167 municípios com código DDD único (84)',
      'Natal é conhecida como Cidade do Sol',
      'Maior produtor de sal marinho do Brasil',
      'Cajueiro de Pirangi é o maior cajueiro do mundo',
      'Mossoró é importante polo de petróleo e sal'
    ],
    telephonyTips: [
      'O Rio Grande do Norte possui código DDD único: 84',
      'Todas as 167 cidades do estado usam o mesmo DDD',
      'Para ligações de outros estados, disque 0 + operadora + 84 + número',
      'Para ligações internacionais, use +55 + 84 + número do telefone',
      'Cobertura 5G em Natal e principais cidades',
      'Boa cobertura 4G em todo o estado',
      'DDD 84 facilita ligações dentro do estado'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD do Rio Grande do Norte?',
        answer: 'O Rio Grande do Norte possui código DDD único: 84. Todas as 167 cidades do estado usam o mesmo código, incluindo Natal, Mossoró, Parnamirim, São Gonçalo do Amarante, Macaíba e todas as demais.'
      },
      {
        question: 'Qual o DDD de Natal?',
        answer: 'O código DDD de Natal, capital do Rio Grande do Norte, é 84. Este é o mesmo código usado por todas as cidades do estado, facilitando as ligações locais.'
      },
      {
        question: 'Qual o DDD de Mossoró?',
        answer: 'O código DDD de Mossoró é 84, o mesmo código que atende todas as cidades do Rio Grande do Norte. Mossoró é a segunda maior cidade do estado.'
      },
      {
        question: 'Como fazer ligação para o Rio Grande do Norte?',
        answer: 'Para ligar para o Rio Grande do Norte de outro estado, disque 0 + código da operadora + 84 + número do telefone. Para ligações de celular, pode discar direto 84 + número. Para ligações internacionais, use +55 + 84 + número.'
      },
      {
        question: 'Quantas cidades tem o Rio Grande do Norte?',
        answer: 'O Rio Grande do Norte possui 167 municípios, todos com o mesmo código DDD (84). As principais cidades são Natal (capital), Mossoró, Parnamirim, São Gonçalo do Amarante, Macaíba, Ceará-Mirim e Caicó.'
      },
      {
        question: 'Quais operadoras funcionam no Rio Grande do Norte?',
        answer: 'As principais operadoras que funcionam no Rio Grande do Norte são Vivo, Claro, TIM e Oi, todas com cobertura 5G em Natal e principais cidades, e boa cobertura 4G em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'Paraíba', abbreviation: 'PB', ddds: ['83'] },
      { name: 'Ceará', abbreviation: 'CE', ddds: ['85', '88'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Rio Grande do Norte',
        url: 'https://www.rn.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Rio Grande do Norte',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=rn',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Rio Grande do Norte',
        url: 'https://www.al.rn.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Natal',
        url: 'https://www.natal.rn.gov.br',
        description: 'Portal oficial da capital potiguar'
      }
    ]
  },
  rs: {
    area: '281.707,156 km²',
    municipalities: 497,
    urbanCoverage: '85%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'O Rio Grande do Sul possui 497 municípios distribuídos em 4 códigos DDD (51, 53, 54, 55), sendo o estado mais meridional do Brasil, com forte influência da cultura gaúcha, economia diversificada e infraestrutura de telecomunicações moderna.',
      characteristics: ['Maior produtor de arroz do Brasil', 'Forte tradição gaúcha e cultura do chimarrão', 'Polo industrial e tecnológico', 'Vinícolas da Serra Gaúcha']
    },
    highlights: [
      'Possui 497 municípios distribuídos em 4 códigos DDD',
      'Porto Alegre é a capital e maior cidade do Sul do Brasil',
      'Serra Gaúcha é famosa por Gramado, Canela e vinícolas',
      'Maior produtor de arroz, trigo e soja do país',
      'Fronteira com Argentina e Uruguai'
    ],
    telephonyTips: [
      'O Rio Grande do Sul possui 4 códigos DDD: 51, 53, 54 e 55',
      'DDD 51 atende Porto Alegre e Região Metropolitana',
      'DDD 53 atende Pelotas, Rio Grande e Região Sul',
      'DDD 54 atende Caxias do Sul, Passo Fundo e Região Serrana',
      'DDD 55 atende Santa Maria, Uruguaiana e Região das Missões',
      'Para ligações de outros estados, disque 0 + operadora + DDD + número',
      'Para ligações internacionais, use +55 + DDD + número do telefone',
      'Cobertura 5G em Porto Alegre, Caxias do Sul e principais cidades',
      'Excelente cobertura 4G em todo o estado'
    ],
    faqs: [
      {
        question: 'Quais são os códigos DDD do Rio Grande do Sul?',
        answer: 'O Rio Grande do Sul possui 4 códigos DDD: 51 (Porto Alegre e Região Metropolitana), 53 (Pelotas e Região Sul), 54 (Caxias do Sul e Região Serrana) e 55 (Santa Maria e Região das Missões).'
      },
      {
        question: 'Qual o DDD de Porto Alegre?',
        answer: 'O código DDD de Porto Alegre, capital do Rio Grande do Sul, é 51. Este código também atende toda a Região Metropolitana, incluindo Canoas, Gravataí, Viamão, Novo Hamburgo e São Leopoldo.'
      },
      {
        question: 'Qual o DDD de Caxias do Sul?',
        answer: 'O código DDD de Caxias do Sul é 54, o mesmo código que atende Gramado, Canela, Bento Gonçalves, Passo Fundo, Erechim e toda a Região Serrana e Norte do estado.'
      },
      {
        question: 'Como fazer ligação para o Rio Grande do Sul?',
        answer: 'Para ligar para o Rio Grande do Sul de outro estado, disque 0 + código da operadora + DDD (51, 53, 54 ou 55) + número do telefone. Para ligações de celular, pode discar direto DDD + número. Para ligações internacionais, use +55 + DDD + número.'
      },
      {
        question: 'Quantas cidades tem o Rio Grande do Sul?',
        answer: 'O Rio Grande do Sul possui 497 municípios, distribuídos em 4 códigos DDD. As principais cidades são Porto Alegre (capital), Caxias do Sul, Pelotas, Canoas, Santa Maria, Gravataí, Viamão, Novo Hamburgo e São Leopoldo.'
      },
      {
        question: 'Quais operadoras funcionam no Rio Grande do Sul?',
        answer: 'As principais operadoras que funcionam no Rio Grande do Sul são Vivo, Claro, TIM e Oi, todas com cobertura 5G em Porto Alegre, Caxias do Sul e principais cidades, e excelente cobertura 4G em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'Santa Catarina', abbreviation: 'SC', ddds: ['47', '48', '49'] },
      { name: 'Paraná', abbreviation: 'PR', ddds: ['41', '42', '43', '44', '45', '46'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado do Rio Grande do Sul',
        url: 'https://www.rs.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Rio Grande do Sul',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=rs',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa do Rio Grande do Sul',
        url: 'https://www.al.rs.gov.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Porto Alegre',
        url: 'https://www2.portoalegre.rs.gov.br',
        description: 'Portal oficial da capital gaúcha'
      }
    ]
  },
  ro: {
    area: '237.765,347 km²',
    municipalities: 52,
    urbanCoverage: '73%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Rondônia possui 52 municípios com código DDD único (69), localizado na Região Norte do Brasil, com economia baseada em agropecuária, mineração e extrativismo, sendo importante polo de desenvolvimento da Amazônia Ocidental.',
      characteristics: ['Fronteira com Bolívia', 'Hidrelétrica de Santo Antônio', 'Estrada de Ferro Madeira-Mamoré', 'Polo agropecuário da Amazônia']
    },
    highlights: [
      'Possui 52 municípios com código DDD único (69)',
      'Porto Velho é a capital e maior cidade do estado',
      'Fronteira internacional com a Bolívia',
      'Hidrelétrica de Santo Antônio no Rio Madeira',
      'Estrada de Ferro Madeira-Mamoré (patrimônio histórico)'
    ],
    telephonyTips: [
      'Rondônia possui código DDD único: 69',
      'Todas as 52 cidades do estado usam o mesmo DDD',
      'Para ligações de outros estados, disque 0 + operadora + 69 + número',
      'Para ligações internacionais, use +55 + 69 + número do telefone',
      'Cobertura 5G em Porto Velho e principais cidades',
      'Boa cobertura 4G nas principais rodovias',
      'DDD 69 facilita ligações dentro do estado'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD de Rondônia?',
        answer: 'Rondônia possui código DDD único: 69. Todas as 52 cidades do estado usam o mesmo código, incluindo Porto Velho, Ji-Paraná, Ariquemes, Vilhena, Cacoal e todas as demais.'
      },
      {
        question: 'Qual o DDD de Porto Velho?',
        answer: 'O código DDD de Porto Velho, capital de Rondônia, é 69. Este é o mesmo código usado por todas as cidades do estado, facilitando as ligações locais.'
      },
      {
        question: 'Qual o DDD de Ji-Paraná?',
        answer: 'O código DDD de Ji-Paraná é 69, o mesmo código que atende todas as cidades de Rondônia. Ji-Paraná é a segunda maior cidade do estado.'
      },
      {
        question: 'Como fazer ligação para Rondônia?',
        answer: 'Para ligar para Rondônia de outro estado, disque 0 + código da operadora + 69 + número do telefone. Para ligações de celular, pode discar direto 69 + número. Para ligações internacionais, use +55 + 69 + número.'
      },
      {
        question: 'Quantas cidades tem Rondônia?',
        answer: 'Rondônia possui 52 municípios, todos com o mesmo código DDD (69). As principais cidades são Porto Velho (capital), Ji-Paraná, Ariquemes, Vilhena, Cacoal, Jaru e Rolim de Moura.'
      },
      {
        question: 'Quais operadoras funcionam em Rondônia?',
        answer: 'As principais operadoras que funcionam em Rondônia são Vivo, Claro, TIM e Oi, todas com cobertura 5G em Porto Velho e principais cidades, e boa cobertura 4G nas principais rodovias do estado.'
      }
    ],
    relatedStates: [
      { name: 'Acre', abbreviation: 'AC', ddds: ['68'] },
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] },
      { name: 'Mato Grosso', abbreviation: 'MT', ddds: ['65', '66'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado de Rondônia',
        url: 'https://www.rondonia.ro.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Rondônia',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=ro',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa de Rondônia',
        url: 'https://www.ale.ro.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Porto Velho',
        url: 'https://www.portovelho.ro.gov.br',
        description: 'Portal oficial da capital rondoniense'
      }
    ]
  },
  se: {
    area: '21.938,188 km²',
    municipalities: 75,
    urbanCoverage: '74%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Sergipe possui 75 municípios com código DDD único (79), sendo o menor estado brasileiro em extensão territorial, mas com rica história colonial e belas praias no litoral.',
      characteristics: ['Menor estado do Brasil', 'Praias paradisíacas', 'Patrimônio histórico colonial', 'Rio São Francisco']
    },
    highlights: [
      'Possui 75 municípios com código DDD único (79)',
      'Aracaju é a capital e maior cidade do estado',
      'Menor estado brasileiro em extensão territorial',
      'Rio São Francisco marca a divisa com Alagoas',
      'Laranjeiras é patrimônio histórico nacional'
    ],
    telephonyTips: [
      'Sergipe possui código DDD único: 79',
      'Todas as 75 cidades do estado usam o mesmo DDD',
      'Para ligações de outros estados, disque 0 + operadora + 79 + número',
      'Para ligações internacionais, use +55 + 79 + número do telefone',
      'Cobertura 5G em Aracaju e principais cidades',
      'Boa cobertura 4G em todo o estado',
      'DDD 79 facilita ligações dentro do estado',
      'Operadoras oferecem planos regionais com vantagens'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD de Sergipe?',
        answer: 'Sergipe possui código DDD único: 79. Todas as 75 cidades do estado utilizam este mesmo código telefônico.'
      },
      {
        question: 'Qual o DDD de Aracaju?',
        answer: 'O código DDD de Aracaju, capital de Sergipe, é 79. Este é o mesmo código usado em todo o estado.'
      },
      {
        question: 'Qual o DDD de Lagarto?',
        answer: 'O código DDD de Lagarto é 79, o mesmo código que atende todas as cidades sergipanas.'
      },
      {
        question: 'Como fazer ligação para Sergipe?',
        answer: 'Para ligar para Sergipe de outro estado, disque 0 + código da operadora + 79 + número do telefone. Para ligações de celular, pode discar direto 79 + número. Para ligações internacionais, use +55 + 79 + número.'
      },
      {
        question: 'Quantas cidades tem Sergipe?',
        answer: 'Sergipe possui 75 municípios, todos com o código DDD 79. As principais cidades são Aracaju (capital), Nossa Senhora do Socorro, Lagarto, Itabaiana, São Cristóvão e Estância.'
      },
      {
        question: 'Quais operadoras funcionam em Sergipe?',
        answer: 'As principais operadoras que funcionam em Sergipe são Vivo, Claro, TIM e Oi, todas com cobertura 5G em Aracaju e principais cidades, e boa cobertura 4G em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'Alagoas', abbreviation: 'AL', ddds: ['82'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado de Sergipe',
        url: 'https://www.se.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Sergipe',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=se',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa de Sergipe',
        url: 'https://www.al.se.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Aracaju',
        url: 'https://www.aracaju.se.gov.br',
        description: 'Portal oficial da capital sergipana'
      }
    ]
  },
  to: {
    area: '277.620,914 km²',
    municipalities: 139,
    urbanCoverage: '79%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Tocantins possui 139 municípios com código DDD único (63), sendo o estado mais jovem do Brasil, criado em 1988. Destaca-se pelo ecoturismo, com o Jalapão e a Ilha do Bananal.',
      characteristics: ['Estado mais jovem do Brasil', 'Jalapão - paraíso do ecoturismo', 'Ilha do Bananal', 'Rio Tocantins']
    },
    highlights: [
      'Possui 139 municípios com código DDD único (63)',
      'Palmas é a capital e cidade mais planejada do Brasil',
      'Estado mais jovem do Brasil, criado em 1988',
      'Jalapão é um dos principais destinos de ecoturismo',
      'Ilha do Bananal é a maior ilha fluvial do mundo'
    ],
    telephonyTips: [
      'Tocantins possui código DDD único: 63',
      'Todas as 139 cidades do estado usam o mesmo DDD',
      'Para ligações de outros estados, disque 0 + operadora + 63 + número',
      'Para ligações internacionais, use +55 + 63 + número do telefone',
      'Cobertura 5G em Palmas e principais cidades',
      'Boa cobertura 4G em todo o estado',
      'DDD 63 facilita ligações dentro do estado',
      'Operadoras oferecem planos regionais com vantagens'
    ],
    faqs: [
      {
        question: 'Qual é o código DDD de Tocantins?',
        answer: 'Tocantins possui código DDD único: 63. Todas as 139 cidades do estado utilizam este mesmo código telefônico.'
      },
      {
        question: 'Qual o DDD de Palmas?',
        answer: 'O código DDD de Palmas, capital de Tocantins, é 63. Este é o mesmo código usado em todo o estado.'
      },
      {
        question: 'Qual o DDD de Araguaína?',
        answer: 'O código DDD de Araguaína é 63, o mesmo código que atende todas as cidades tocantinenses.'
      },
      {
        question: 'Como fazer ligação para Tocantins?',
        answer: 'Para ligar para Tocantins de outro estado, disque 0 + código da operadora + 63 + número do telefone. Para ligações de celular, pode discar direto 63 + número. Para ligações internacionais, use +55 + 63 + número.'
      },
      {
        question: 'Quantas cidades tem Tocantins?',
        answer: 'Tocantins possui 139 municípios, todos com o código DDD 63. As principais cidades são Palmas (capital), Araguaína, Gurupi, Porto Nacional, Paraíso do Tocantins e Colinas do Tocantins.'
      },
      {
        question: 'Quais operadoras funcionam em Tocantins?',
        answer: 'As principais operadoras que funcionam em Tocantins são Vivo, Claro, TIM e Oi, todas com cobertura 5G em Palmas e principais cidades, e boa cobertura 4G em todo o estado.'
      }
    ],
    relatedStates: [
      { name: 'Goiás', abbreviation: 'GO', ddds: ['62', '64'] },
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] },
      { name: 'Maranhão', abbreviation: 'MA', ddds: ['98', '99'] },
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Estado de Tocantins',
        url: 'https://www.to.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'IBGE - Tocantins',
        url: 'https://www.ibge.gov.br/estadosat/perfil.php?sigla=to',
        description: 'Dados oficiais e estatísticas do estado'
      },
      {
        name: 'Assembleia Legislativa de Tocantins',
        url: 'https://www.al.to.leg.br',
        description: 'Portal da Assembleia Legislativa'
      },
      {
        name: 'Prefeitura de Palmas',
        url: 'https://www.palmas.to.gov.br',
        description: 'Portal oficial da capital tocantinense'
      }
    ]
  },
  am: {
    area: '1.559.167,88 km²',
    municipalities: 62,
    urbanCoverage: '88%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Amazonas (AM) é o maior estado brasileiro em extensão territorial, localizado na região Norte do Brasil. Conhecido mundialmente pela Floresta Amazônica e pela capital Manaus, o estado utiliza os códigos DDD 92 e 97 para suas comunicações telefônicas. O DDD 92 atende principalmente Manaus e região metropolitana, enquanto o DDD 97 cobre o interior do estado.',
      characteristics: [
        'Maior estado do Brasil em área territorial',
        'Floresta Amazônica e biodiversidade única',
        'Polo Industrial de Manaus (Zona Franca)',
        'Rios navegáveis como principal via de transporte',
        'Cultura indígena preservada',
        'DDD 92 para Manaus e região metropolitana',
        'DDD 97 para interior e municípios do interior'
      ]
    },
    highlights: [
      'Capital Manaus com 2.255.903 habitantes usando DDD 92',
      '62 municípios distribuídos entre DDD 92 e 97',
      'População total de 4.269.995 habitantes',
      'Zona Franca de Manaus - polo tecnológico e industrial',
      'Teatro Amazonas - patrimônio histórico e cultural',
      'Encontro das Águas - fenômeno natural único',
      'Cobertura 4G/5G em Manaus e principais cidades'
    ],
    telephonyTips: [
      'DDD 92 para Manaus, Iranduba, Manacapuru e região metropolitana',
      'DDD 97 para interior: Parintins, Itacoatiara, Tefé e outras cidades',
      'Para ligar de outro estado: 0 + operadora + 92/97 + número',
      'Cobertura móvel excelente em Manaus (DDD 92)',
      'Interior pode ter sinal limitado em áreas remotas',
      'Fibra óptica disponível em Manaus e principais cidades'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs do Amazonas?',
        answer: 'O Amazonas possui dois códigos DDD: 92 e 97. O DDD 92 atende Manaus e região metropolitana, enquanto o DDD 97 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de Manaus?',
        answer: 'O DDD de Manaus é 92. A capital do Amazonas e sua região metropolitana utilizam exclusivamente o código 92 para ligações telefônicas.'
      },
      {
        question: 'DDD 92 é de qual estado?',
        answer: 'O DDD 92 é do Amazonas (AM), estado da região Norte do Brasil. Este código atende principalmente Manaus e municípios da região metropolitana.'
      },
      {
        question: 'DDD 97 atende quais cidades?',
        answer: 'O DDD 97 atende as cidades do interior do Amazonas, incluindo Parintins, Itacoatiara, Tefé, Coari, Tabatinga e outros municípios do interior do estado.'
      }
    ],
    relatedStates: [
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] },
      { name: 'Roraima', abbreviation: 'RR', ddds: ['95'] },
      { name: 'Acre', abbreviation: 'AC', ddds: ['68'] },
      { name: 'Rondônia', abbreviation: 'RO', ddds: ['69'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Amazonas',
        url: 'https://www.amazonas.am.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Manaus',
        url: 'https://www.manaus.am.gov.br',
        description: 'Portal oficial da capital amazonense'
      },
      {
        name: 'Anatel Amazonas',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  ba: {
    area: '564.733,18 km²',
    municipalities: 417,
    urbanCoverage: '91%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Bahia (BA) é um estado brasileiro localizado na região Nordeste, conhecido por sua rica cultura, praias paradisíacas e importância histórica. O estado utiliza cinco códigos DDD: 71 (Salvador e região metropolitana), 73 (Ilhéus e sul), 74 (Juazeiro e norte), 75 (Feira de Santana e região) e 77 (Vitória da Conquista e sudoeste).',
      characteristics: [
        'Maior estado do Nordeste em território',
        'Salvador - primeira capital do Brasil',
        'Cultura afro-brasileira e patrimônio histórico',
        'Praias paradisíacas e turismo intenso',
        'Economia diversificada: turismo, agricultura e indústria',
        'Cinco códigos DDD cobrindo 417 municípios',
        'Carnaval de Salvador - maior festa popular do mundo'
      ]
    },
    highlights: [
      'Capital Salvador com 2.900.319 habitantes usando DDD 71',
      '417 municípios - maior número de cidades do Nordeste',
      'População total de 14.985.284 habitantes',
      'DDD 71: Salvador e região metropolitana',
      'DDD 73: Ilhéus, Itabuna e litoral sul',
      'DDD 74: Juazeiro, Paulo Afonso e norte',
      'DDD 75: Feira de Santana, Alagoinhas e região',
      'DDD 77: Vitória da Conquista, Barreiras e sudoeste'
    ],
    telephonyTips: [
      'DDD 71 para Salvador e região metropolitana',
      'DDD 73 para Ilhéus, Itabuna e litoral sul',
      'DDD 74 para Juazeiro, Paulo Afonso e região norte',
      'DDD 75 para Feira de Santana, Alagoinhas e entorno',
      'DDD 77 para Vitória da Conquista, Barreiras e sudoeste',
      'Cobertura 4G/5G excelente em Salvador e principais cidades',
      'Interior bem atendido por todas as operadoras'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs da Bahia?',
        answer: 'A Bahia possui cinco códigos DDD: 71, 73, 74, 75 e 77. Cada código atende uma região específica do estado, cobrindo os 417 municípios baianos.'
      },
      {
        question: 'Qual o DDD de Salvador?',
        answer: 'O DDD de Salvador é 71. A capital da Bahia e sua região metropolitana utilizam o código 71 para ligações telefônicas.'
      },
      {
        question: 'DDD 71 é de qual estado?',
        answer: 'O DDD 71 é da Bahia (BA), estado do Nordeste brasileiro. Este código atende Salvador e região metropolitana.'
      },
      {
        question: 'Qual DDD de Feira de Santana?',
        answer: 'O DDD de Feira de Santana é 75. A segunda maior cidade da Bahia utiliza o código 75, que também atende Alagoinhas e região.'
      }
    ],
    relatedStates: [
      { name: 'Sergipe', abbreviation: 'SE', ddds: ['79'] },
      { name: 'Alagoas', abbreviation: 'AL', ddds: ['82'] },
      { name: 'Pernambuco', abbreviation: 'PE', ddds: ['81', '87'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] }
    ],
    authorityLinks: [
      {
        name: 'Governo da Bahia',
        url: 'https://www.ba.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Salvador',
        url: 'https://www.salvador.ba.gov.br',
        description: 'Portal oficial da capital baiana'
      },
      {
        name: 'Anatel Bahia',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  ce: {
    area: '148.894,44 km²',
    municipalities: 184,
    urbanCoverage: '93%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Ceará (CE) é um estado brasileiro localizado na região Nordeste, famoso por suas praias deslumbrantes, cultura rica e economia em crescimento. O estado utiliza dois códigos DDD: 85 (Fortaleza e região metropolitana) e 88 (interior, incluindo Juazeiro do Norte e Sobral).',
      characteristics: [
        'Praias paradisíacas e turismo de sol e mar',
        'Fortaleza - quinta maior capital do Brasil',
        'Economia diversificada: turismo, indústria e serviços',
        'Cultura nordestina autêntica',
        'Juazeiro do Norte - centro religioso importante',
        'DDD 85 para Fortaleza e região metropolitana',
        'DDD 88 para interior e principais cidades'
      ]
    },
    highlights: [
      'Capital Fortaleza com 2.703.391 habitantes usando DDD 85',
      '184 municípios distribuídos entre DDD 85 e 88',
      'População total de 9.240.580 habitantes',
      'DDD 85: Fortaleza, Caucaia, Maracanaú e região metropolitana',
      'DDD 88: Juazeiro do Norte, Sobral, Crato e interior',
      'Cobertura 4G/5G excelente em Fortaleza',
      'Interior bem atendido por todas as operadoras'
    ],
    telephonyTips: [
      'DDD 85 para Fortaleza e região metropolitana',
      'DDD 88 para Juazeiro do Norte, Sobral, Crato e interior',
      'Para ligar de outro estado: 0 + operadora + 85/88 + número',
      'Cobertura móvel excelente em Fortaleza (DDD 85)',
      'Interior tem boa cobertura nas principais cidades',
      'Fibra óptica disponível em Fortaleza e cidades maiores'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs do Ceará?',
        answer: 'O Ceará possui dois códigos DDD: 85 e 88. O DDD 85 atende Fortaleza e região metropolitana, enquanto o DDD 88 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de Fortaleza?',
        answer: 'O DDD de Fortaleza é 85. A capital do Ceará e sua região metropolitana utilizam o código 85 para ligações telefônicas.'
      },
      {
        question: 'DDD 85 é de qual estado?',
        answer: 'O DDD 85 é do Ceará (CE), estado da região Nordeste do Brasil. Este código atende Fortaleza e municípios da região metropolitana.'
      },
      {
        question: 'Qual o DDD de Juazeiro do Norte?',
        answer: 'O DDD de Juazeiro do Norte é 88. Esta importante cidade do interior do Ceará utiliza o código 88, assim como Sobral, Crato e outras cidades do interior.'
      }
    ],
    relatedStates: [
      { name: 'Piauí', abbreviation: 'PI', ddds: ['86', '89'] },
      { name: 'Rio Grande do Norte', abbreviation: 'RN', ddds: ['84'] },
      { name: 'Paraíba', abbreviation: 'PB', ddds: ['83'] },
      { name: 'Pernambuco', abbreviation: 'PE', ddds: ['81', '87'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Ceará',
        url: 'https://www.ceara.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Fortaleza',
        url: 'https://www.fortaleza.ce.gov.br',
        description: 'Portal oficial da capital cearense'
      },
      {
        name: 'Anatel Ceará',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  df: {
    area: '5.760,78 km²',
    municipalities: 1,
    urbanCoverage: '98%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Distrito Federal (DF) é a unidade federativa brasileira que abriga Brasília, a capital do país. Localizado na região Centro-Oeste, o DF utiliza o código DDD 61 para todas as suas comunicações telefônicas. Com infraestrutura moderna e cobertura de telecomunicações de excelência, o DF possui a melhor conectividade do Brasil.',
      characteristics: [
        'Sede do governo federal brasileiro',
        'Brasília - capital federal e patrimônio da humanidade',
        'Arquitetura modernista de Oscar Niemeyer',
        'Infraestrutura de telecomunicações de primeira linha',
        'Cobertura 5G ampla e moderna',
        'DDD 61 único para todo o território',
        'Centro político e administrativo do Brasil'
      ]
    },
    highlights: [
      'Brasília com 3.094.325 habitantes usando DDD 61',
      'Única unidade federativa com apenas um código DDD',
      'Cobertura 5G mais ampla do Brasil',
      'Infraestrutura de fibra óptica em todo o território',
      'Sede dos três poderes: Executivo, Legislativo e Judiciário',
      'Patrimônio Cultural da Humanidade pela UNESCO',
      'Melhor conectividade e velocidade de internet do país'
    ],
    telephonyTips: [
      'DDD 61 atende todo o Distrito Federal',
      'Cobertura 5G disponível em praticamente todo o território',
      'Fibra óptica disponível em todas as regiões administrativas',
      'Para ligar de outro estado: 0 + operadora + 61 + número',
      'Excelente qualidade de sinal em todo o DF',
      'Todas as operadoras oferecem serviços premium'
    ],
    faqs: [
      {
        question: 'Qual o DDD do Distrito Federal?',
        answer: 'O DDD do Distrito Federal é 61. Este código único atende toda a capital federal Brasília e suas regiões administrativas.'
      },
      {
        question: 'Qual o DDD de Brasília?',
        answer: 'O DDD de Brasília é 61. A capital federal utiliza exclusivamente o código 61 para todas as ligações telefônicas.'
      },
      {
        question: 'DDD 61 é de qual estado?',
        answer: 'O DDD 61 é do Distrito Federal (DF), unidade federativa que abriga Brasília, a capital do Brasil. Este código atende todo o território do DF.'
      },
      {
        question: 'O Distrito Federal tem quantos DDDs?',
        answer: 'O Distrito Federal possui apenas um código DDD: 61. Este é o único código que atende todo o território do DF, incluindo Brasília e todas as regiões administrativas.'
      }
    ],
    relatedStates: [
      { name: 'Goiás', abbreviation: 'GO', ddds: ['62', '64'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Distrito Federal',
        url: 'https://www.df.gov.br',
        description: 'Portal oficial do governo do DF'
      },
      {
        name: 'Câmara Legislativa do DF',
        url: 'https://www.cl.df.gov.br',
        description: 'Portal da Câmara Legislativa'
      },
      {
        name: 'Anatel DF',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  es: {
    area: '46.074,45 km²',
    municipalities: 78,
    urbanCoverage: '94%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Espírito Santo (ES) é um estado brasileiro localizado na região Sudeste, conhecido por suas belas praias, montanhas capixabas e economia diversificada. O estado utiliza dois códigos DDD: 27 (Vitória, Vila Velha e região metropolitana) e 28 (Cachoeiro de Itapemirim, Colatina e interior).',
      characteristics: [
        'Praias paradisíacas e turismo de natureza',
        'Vitória - capital insular com qualidade de vida',
        'Economia forte: portos, indústria e turismo',
        'Montanhas capixabas e clima agradável',
        'Cultura italiana e pomerana preservada',
        'DDD 27 para região metropolitana',
        'DDD 28 para interior e sul do estado'
      ]
    },
    highlights: [
      'Capital Vitória com 365.855 habitantes usando DDD 27',
      '78 municípios distribuídos entre DDD 27 e 28',
      'População total de 4.108.508 habitantes',
      'DDD 27: Vitória, Vila Velha, Serra e região metropolitana',
      'DDD 28: Cachoeiro de Itapemirim, Colatina, Linhares e interior',
      'Cobertura 4G/5G excelente na Grande Vitória',
      'Interior bem atendido por todas as operadoras'
    ],
    telephonyTips: [
      'DDD 27 para Vitória, Vila Velha, Serra e região metropolitana',
      'DDD 28 para Cachoeiro, Colatina, Linhares e interior',
      'Para ligar de outro estado: 0 + operadora + 27/28 + número',
      'Cobertura móvel excelente na Grande Vitória (DDD 27)',
      'Interior tem boa cobertura nas principais cidades',
      'Fibra óptica disponível em Vitória e cidades maiores'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs do Espírito Santo?',
        answer: 'O Espírito Santo possui dois códigos DDD: 27 e 28. O DDD 27 atende Vitória e região metropolitana, enquanto o DDD 28 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de Vitória?',
        answer: 'O DDD de Vitória é 27. A capital do Espírito Santo e sua região metropolitana (incluindo Vila Velha e Serra) utilizam o código 27.'
      },
      {
        question: 'DDD 27 é de qual estado?',
        answer: 'O DDD 27 é do Espírito Santo (ES), estado da região Sudeste do Brasil. Este código atende Vitória e municípios da região metropolitana.'
      },
      {
        question: 'Qual o DDD de Cachoeiro de Itapemirim?',
        answer: 'O DDD de Cachoeiro de Itapemirim é 28. Esta importante cidade do sul do Espírito Santo utiliza o código 28, assim como Colatina, Linhares e outras cidades do interior.'
      }
    ],
    relatedStates: [
      { name: 'Bahia', abbreviation: 'BA', ddds: ['71', '73', '74', '75', '77'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] },
      { name: 'Rio de Janeiro', abbreviation: 'RJ', ddds: ['21', '22', '24'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Espírito Santo',
        url: 'https://www.es.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Vitória',
        url: 'https://www.vitoria.es.gov.br',
        description: 'Portal oficial da capital capixaba'
      },
      {
        name: 'Anatel Espírito Santo',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  go: {
    area: '340.242,85 km²',
    municipalities: 246,
    urbanCoverage: '92%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Goiás (GO) é um estado brasileiro localizado na região Centro-Oeste, conhecido por sua forte economia agropecuária, cultura sertaneja e proximidade com Brasília. O estado utiliza dois códigos DDD: 62 (Goiânia e região metropolitana) e 64 (interior, incluindo Anápolis e Rio Verde).',
      characteristics: [
        'Forte economia agropecuária e agroindustrial',
        'Goiânia - capital planejada e moderna',
        'Cultura sertaneja e festivais de música',
        'Proximidade estratégica com Brasília',
        'Turismo religioso e ecológico',
        'DDD 62 para Goiânia e região metropolitana',
        'DDD 64 para Anápolis, Rio Verde e interior'
      ]
    },
    highlights: [
      'Capital Goiânia com 1.555.626 habitantes usando DDD 62',
      '246 municípios distribuídos entre DDD 62 e 64',
      'População total de 7.206.589 habitantes',
      'DDD 62: Goiânia, Aparecida de Goiânia e região metropolitana',
      'DDD 64: Anápolis, Rio Verde, Luziânia e interior',
      'Cobertura 4G/5G excelente em Goiânia',
      'Interior bem atendido por todas as operadoras'
    ],
    telephonyTips: [
      'DDD 62 para Goiânia e região metropolitana',
      'DDD 64 para Anápolis, Rio Verde, Luziânia e interior',
      'Para ligar de outro estado: 0 + operadora + 62/64 + número',
      'Cobertura móvel excelente em Goiânia (DDD 62)',
      'Interior tem boa cobertura nas principais cidades',
      'Fibra óptica disponível em Goiânia e cidades maiores'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs de Goiás?',
        answer: 'Goiás possui dois códigos DDD: 62 e 64. O DDD 62 atende Goiânia e região metropolitana, enquanto o DDD 64 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de Goiânia?',
        answer: 'O DDD de Goiânia é 62. A capital de Goiás e sua região metropolitana utilizam o código 62 para ligações telefônicas.'
      },
      {
        question: 'DDD 62 é de qual estado?',
        answer: 'O DDD 62 é de Goiás (GO), estado da região Centro-Oeste do Brasil. Este código atende Goiânia e municípios da região metropolitana.'
      },
      {
        question: 'Qual o DDD de Anápolis?',
        answer: 'O DDD de Anápolis é 64. Esta importante cidade industrial de Goiás utiliza o código 64, assim como Rio Verde, Luziânia e outras cidades do interior.'
      }
    ],
    relatedStates: [
      { name: 'Distrito Federal', abbreviation: 'DF', ddds: ['61'] },
      { name: 'Mato Grosso', abbreviation: 'MT', ddds: ['65', '66'] },
      { name: 'Tocantins', abbreviation: 'TO', ddds: ['63'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] }
    ],
    authorityLinks: [
      {
        name: 'Governo de Goiás',
        url: 'https://www.goias.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Goiânia',
        url: 'https://www.goiania.go.gov.br',
        description: 'Portal oficial da capital goiana'
      },
      {
        name: 'Anatel Goiás',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  ma: {
    area: '329.642,18 km²',
    municipalities: 217,
    urbanCoverage: '89%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Maranhão (MA) é um estado brasileiro localizado na região Nordeste, conhecido por sua rica cultura, patrimônios históricos e belezas naturais como os Lençóis Maranhenses. O estado utiliza dois códigos DDD: 98 (São Luís e região metropolitana) e 99 (interior, incluindo Imperatriz e Caxias).',
      characteristics: [
        'Lençóis Maranhenses - paisagem única no mundo',
        'São Luís - centro histórico patrimônio da humanidade',
        'Cultura afro-brasileira e bumba-meu-boi',
        'Economia baseada em agricultura e indústria',
        'Litoral extenso com praias paradisíacas',
        'DDD 98 para São Luís e região metropolitana',
        'DDD 99 para Imperatriz, Caxias e interior'
      ]
    },
    highlights: [
      'Capital São Luís com 1.115.932 habitantes usando DDD 98',
      '217 municípios distribuídos entre DDD 98 e 99',
      'População total de 7.153.262 habitantes',
      'DDD 98: São Luís, São José de Ribamar e região metropolitana',
      'DDD 99: Imperatriz, Caxias, Codó e interior',
      'Cobertura 4G/5G em São Luís e principais cidades',
      'Interior bem atendido nas cidades maiores'
    ],
    telephonyTips: [
      'DDD 98 para São Luís e região metropolitana',
      'DDD 99 para Imperatriz, Caxias, Codó e interior',
      'Para ligar de outro estado: 0 + operadora + 98/99 + número',
      'Cobertura móvel excelente em São Luís (DDD 98)',
      'Interior tem boa cobertura nas principais cidades',
      'Fibra óptica disponível em São Luís e cidades maiores'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs do Maranhão?',
        answer: 'O Maranhão possui dois códigos DDD: 98 e 99. O DDD 98 atende São Luís e região metropolitana, enquanto o DDD 99 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de São Luís?',
        answer: 'O DDD de São Luís é 98. A capital do Maranhão e sua região metropolitana utilizam o código 98 para ligações telefônicas.'
      },
      {
        question: 'DDD 98 é de qual estado?',
        answer: 'O DDD 98 é do Maranhão (MA), estado da região Nordeste do Brasil. Este código atende São Luís e municípios da região metropolitana.'
      },
      {
        question: 'Qual o DDD de Imperatriz?',
        answer: 'O DDD de Imperatriz é 99. Esta importante cidade do interior do Maranhão utiliza o código 99, assim como Caxias, Codó e outras cidades do interior.'
      }
    ],
    relatedStates: [
      { name: 'Piauí', abbreviation: 'PI', ddds: ['86', '89'] },
      { name: 'Tocantins', abbreviation: 'TO', ddds: ['63'] },
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Maranhão',
        url: 'https://www.ma.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de São Luís',
        url: 'https://www.saoluis.ma.gov.br',
        description: 'Portal oficial da capital maranhense'
      },
      {
        name: 'Anatel Maranhão',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  ms: {
    area: '357.145,53 km²',
    municipalities: 79,
    urbanCoverage: '93%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Mato Grosso do Sul (MS) é um estado brasileiro localizado na região Centro-Oeste, conhecido pelo Pantanal, turismo ecológico e forte economia agropecuária. O estado utiliza um único código DDD: 67, que atende todos os 79 municípios sul-mato-grossenses.',
      characteristics: [
        'Pantanal - maior planície alagada do mundo',
        'Bonito - capital do ecoturismo brasileiro',
        'Forte economia agropecuária e agroindustrial',
        'Fronteira com Paraguai e Bolívia',
        'Biodiversidade rica e preservada',
        'DDD 67 único para todo o estado',
        'Turismo de natureza e aventura'
      ]
    },
    highlights: [
      'Capital Campo Grande com 916.001 habitantes usando DDD 67',
      '79 municípios todos atendidos pelo DDD 67',
      'População total de 2.839.188 habitantes',
      'Código DDD 67 exclusivo do Mato Grosso do Sul',
      'Bonito - destino turístico internacional',
      'Pantanal - patrimônio natural da humanidade',
      'Cobertura 4G/5G em Campo Grande e principais cidades'
    ],
    telephonyTips: [
      'DDD 67 atende todo o Mato Grosso do Sul',
      'Para ligar de outro estado: 0 + operadora + 67 + número',
      'Cobertura móvel excelente em Campo Grande',
      'Principais cidades têm boa cobertura 4G',
      'Fibra óptica disponível em Campo Grande e cidades maiores',
      'Interior pode ter sinal limitado em áreas rurais'
    ],
    faqs: [
      {
        question: 'Qual o DDD do Mato Grosso do Sul?',
        answer: 'O DDD do Mato Grosso do Sul é 67. Este código único atende todos os 79 municípios do estado, incluindo a capital Campo Grande, Dourados, Três Lagoas e Corumbá.'
      },
      {
        question: 'Qual o DDD de Campo Grande?',
        answer: 'O DDD de Campo Grande é 67. A capital do Mato Grosso do Sul utiliza o código 67, o mesmo de todo o estado.'
      },
      {
        question: 'DDD 67 é de qual estado?',
        answer: 'O DDD 67 é do Mato Grosso do Sul (MS), estado da região Centro-Oeste do Brasil. Este código atende todo o território sul-mato-grossense.'
      },
      {
        question: 'Quantos DDDs tem o Mato Grosso do Sul?',
        answer: 'O Mato Grosso do Sul possui apenas um código DDD: 67. Este código atende todas as cidades do estado, de Campo Grande a Bonito, Dourados e Corumbá.'
      }
    ],
    relatedStates: [
      { name: 'Mato Grosso', abbreviation: 'MT', ddds: ['65', '66'] },
      { name: 'Goiás', abbreviation: 'GO', ddds: ['62', '64'] },
      { name: 'São Paulo', abbreviation: 'SP', ddds: ['11', '12', '13', '14', '15', '16', '17', '18', '19'] },
      { name: 'Paraná', abbreviation: 'PR', ddds: ['41', '42', '43', '44', '45', '46'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Mato Grosso do Sul',
        url: 'https://www.ms.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Campo Grande',
        url: 'https://www.campogrande.ms.gov.br',
        description: 'Portal oficial da capital sul-mato-grossense'
      },
      {
        name: 'Anatel Mato Grosso do Sul',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  mt: {
    area: '903.207,05 km²',
    municipalities: 141,
    urbanCoverage: '90%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Mato Grosso (MT) é um estado brasileiro localizado na região Centro-Oeste, conhecido por sua forte economia agropecuária, Pantanal e Chapada dos Guimarães. O estado utiliza dois códigos DDD: 65 (Cuiabá e região metropolitana) e 66 (interior, incluindo Rondonópolis e Sinop).',
      characteristics: [
        'Maior produtor de grãos do Brasil',
        'Pantanal mato-grossense - biodiversidade única',
        'Chapada dos Guimarães - belezas naturais',
        'Economia forte baseada no agronegócio',
        'Fronteira agrícola em expansão',
        'DDD 65 para Cuiabá e região metropolitana',
        'DDD 66 para Rondonópolis, Sinop e interior'
      ]
    },
    highlights: [
      'Capital Cuiabá com 623.614 habitantes usando DDD 65',
      '141 municípios distribuídos entre DDD 65 e 66',
      'População total de 3.567.234 habitantes',
      'DDD 65: Cuiabá, Várzea Grande e região metropolitana',
      'DDD 66: Rondonópolis, Sinop, Cáceres e interior',
      'Cobertura 4G/5G em Cuiabá e principais cidades',
      'Interior bem atendido nas cidades maiores'
    ],
    telephonyTips: [
      'DDD 65 para Cuiabá, Várzea Grande e região metropolitana',
      'DDD 66 para Rondonópolis, Sinop, Cáceres e interior',
      'Para ligar de outro estado: 0 + operadora + 65/66 + número',
      'Cobertura móvel excelente em Cuiabá (DDD 65)',
      'Interior tem boa cobertura nas principais cidades',
      'Fibra óptica disponível em Cuiabá e cidades maiores'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs do Mato Grosso?',
        answer: 'O Mato Grosso possui dois códigos DDD: 65 e 66. O DDD 65 atende Cuiabá e região metropolitana, enquanto o DDD 66 cobre as cidades do interior do estado.'
      },
      {
        question: 'Qual o DDD de Cuiabá?',
        answer: 'O DDD de Cuiabá é 65. A capital do Mato Grosso e sua região metropolitana utilizam o código 65 para ligações telefônicas.'
      },
      {
        question: 'DDD 65 é de qual estado?',
        answer: 'O DDD 65 é do Mato Grosso (MT), estado da região Centro-Oeste do Brasil. Este código atende Cuiabá e municípios da região metropolitana.'
      },
      {
        question: 'Qual o DDD de Rondonópolis?',
        answer: 'O DDD de Rondonópolis é 66. Esta importante cidade do interior do Mato Grosso utiliza o código 66, assim como Sinop, Cáceres e outras cidades do interior.'
      }
    ],
    relatedStates: [
      { name: 'Mato Grosso do Sul', abbreviation: 'MS', ddds: ['67'] },
      { name: 'Goiás', abbreviation: 'GO', ddds: ['62', '64'] },
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] },
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] }
    ],
    authorityLinks: [
      {
        name: 'Governo do Mato Grosso',
        url: 'https://www.mt.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Cuiabá',
        url: 'https://www.cuiaba.mt.gov.br',
        description: 'Portal oficial da capital mato-grossense'
      },
      {
        name: 'Anatel Mato Grosso',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  rr: {
    area: '224.273,83 km²',
    municipalities: 15,
    urbanCoverage: '87%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'Roraima (RR) é um estado brasileiro localizado na região Norte, conhecido por sua natureza exuberante, Monte Roraima e cultura indígena preservada. O estado utiliza um único código DDD: 95, que atende todos os 15 municípios roraimenses.',
      characteristics: [
        'Monte Roraima - formação geológica única',
        'Fronteira com Venezuela e Guiana',
        'Cultura indígena forte e preservada',
        'Natureza amazônica e biodiversidade',
        'Boa Vista - capital planejada',
        'DDD 95 único para todo o estado',
        'Estado mais setentrional do Brasil'
      ]
    },
    highlights: [
      'Capital Boa Vista com 436.591 habitantes usando DDD 95',
      '15 municípios todos atendidos pelo DDD 95',
      'População total de 652.713 habitantes',
      'Código DDD 95 exclusivo de Roraima',
      'Monte Roraima - ponto tríplice Brasil-Venezuela-Guiana',
      'Cobertura 4G em Boa Vista e principais cidades',
      'Estado com menor população da região Norte'
    ],
    telephonyTips: [
      'DDD 95 atende todo o estado de Roraima',
      'Para ligar de outro estado: 0 + operadora + 95 + número',
      'Cobertura móvel excelente em Boa Vista',
      'Interior pode ter sinal limitado em áreas remotas',
      'Fibra óptica disponível em Boa Vista',
      'Principais cidades têm cobertura 4G'
    ],
    faqs: [
      {
        question: 'Qual o DDD de Roraima?',
        answer: 'O DDD de Roraima é 95. Este código único atende todos os 15 municípios do estado, incluindo a capital Boa Vista, Rorainópolis e Caracaraí.'
      },
      {
        question: 'Qual o DDD de Boa Vista?',
        answer: 'O DDD de Boa Vista é 95. A capital de Roraima utiliza o código 95, o mesmo de todo o estado.'
      },
      {
        question: 'DDD 95 é de qual estado?',
        answer: 'O DDD 95 é de Roraima (RR), estado da região Norte do Brasil. Este código atende todo o território roraimense.'
      },
      {
        question: 'Quantos DDDs tem Roraima?',
        answer: 'Roraima possui apenas um código DDD: 95. Este código atende todas as cidades do estado, de Boa Vista a Rorainópolis e Caracaraí.'
      }
    ],
    relatedStates: [
      { name: 'Amazonas', abbreviation: 'AM', ddds: ['92', '97'] },
      { name: 'Pará', abbreviation: 'PA', ddds: ['91', '93', '94'] }
    ],
    authorityLinks: [
      {
        name: 'Governo de Roraima',
        url: 'https://www.rr.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Boa Vista',
        url: 'https://www.boavista.rr.gov.br',
        description: 'Portal oficial da capital roraimense'
      },
      {
        name: 'Anatel Roraima',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  sc: {
    area: '95.730,69 km²',
    municipalities: 295,
    urbanCoverage: '95%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      }
    ],
    regionInfo: {
      description: 'Santa Catarina (SC) é um estado brasileiro localizado na região Sul, conhecido por sua qualidade de vida, praias paradisíacas, cultura europeia e economia diversificada. O estado utiliza três códigos DDD: 47 (Joinville e norte), 48 (Florianópolis e Grande Florianópolis) e 49 (Chapecó e oeste).',
      characteristics: [
        'Melhor IDH do Brasil',
        'Praias paradisíacas e turismo de verão',
        'Cultura alemã e italiana preservada',
        'Economia forte e diversificada',
        'Oktoberfest de Blumenau - maior festa alemã das Américas',
        'DDD 47 para Joinville e norte',
        'DDD 48 para Florianópolis e litoral',
        'DDD 49 para Chapecó e oeste'
      ]
    },
    highlights: [
      'Capital Florianópolis com 516.524 habitantes usando DDD 48',
      '295 municípios distribuídos entre DDD 47, 48 e 49',
      'População total de 7.338.473 habitantes',
      'DDD 47: Joinville, Blumenau, Itajaí e norte',
      'DDD 48: Florianópolis, São José, Palhoça e Grande Florianópolis',
      'DDD 49: Chapecó, Lages, Criciúma e oeste',
      'Cobertura 5G em Florianópolis e principais cidades'
    ],
    telephonyTips: [
      'DDD 47 para Joinville, Blumenau, Itajaí e região norte',
      'DDD 48 para Florianópolis e Grande Florianópolis',
      'DDD 49 para Chapecó, Lages, Criciúma e oeste',
      'Para ligar de outro estado: 0 + operadora + 47/48/49 + número',
      'Cobertura 5G em Florianópolis e principais cidades',
      'Excelente infraestrutura de fibra óptica em todo o estado'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs de Santa Catarina?',
        answer: 'Santa Catarina possui três códigos DDD: 47, 48 e 49. O DDD 47 atende o norte (Joinville, Blumenau), o DDD 48 atende Florianópolis e região, e o DDD 49 atende o oeste (Chapecó, Lages).'
      },
      {
        question: 'Qual o DDD de Florianópolis?',
        answer: 'O DDD de Florianópolis é 48. A capital de Santa Catarina e a Grande Florianópolis utilizam o código 48 para ligações telefônicas.'
      },
      {
        question: 'DDD 47 é de qual estado?',
        answer: 'O DDD 47 é de Santa Catarina (SC), estado da região Sul do Brasil. Este código atende Joinville, Blumenau, Itajaí e região norte do estado.'
      },
      {
        question: 'Qual o DDD de Joinville?',
        answer: 'O DDD de Joinville é 47. A maior cidade de Santa Catarina utiliza o código 47, assim como Blumenau, Itajaí e outras cidades do norte catarinense.'
      }
    ],
    relatedStates: [
      { name: 'Paraná', abbreviation: 'PR', ddds: ['41', '42', '43', '44', '45', '46'] },
      { name: 'Rio Grande do Sul', abbreviation: 'RS', ddds: ['51', '53', '54', '55'] }
    ],
    authorityLinks: [
      {
        name: 'Governo de Santa Catarina',
        url: 'https://www.sc.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de Florianópolis',
        url: 'https://www.pmf.sc.gov.br',
        description: 'Portal oficial da capital catarinense'
      },
      {
        name: 'Anatel Santa Catarina',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  },
  sp: {
    area: '248.219,48 km²',
    municipalities: 645,
    urbanCoverage: '97%',
    mainOperators: [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        services: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        services: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        services: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ],
    regionInfo: {
      description: 'São Paulo (SP) é o estado mais populoso e economicamente desenvolvido do Brasil, localizado na região Sudeste. Conhecido como a locomotiva do país, SP utiliza nove códigos DDD distribuídos por suas regiões: 11 (capital e Grande SP), 12 (Vale do Paraíba), 13 (Baixada Santista), 14 (Bauru), 15 (Sorocaba), 16 (Ribeirão Preto), 17 (São José do Rio Preto), 18 (Presidente Prudente) e 19 (Campinas).',
      characteristics: [
        'Estado mais populoso do Brasil',
        'Maior economia da América Latina',
        'São Paulo - maior metrópole do hemisfério sul',
        'Centro financeiro e cultural do país',
        'Infraestrutura de telecomunicações mais avançada',
        'Nove códigos DDD cobrindo 645 municípios',
        'Cobertura 5G mais ampla do Brasil'
      ]
    },
    highlights: [
      'Capital São Paulo com 12.396.372 habitantes usando DDD 11',
      '645 municípios - maior número de cidades do Brasil',
      'População total de 46.649.132 habitantes',
      'DDD 11: São Paulo capital e Grande São Paulo',
      'DDD 12: São José dos Campos, Taubaté e Vale do Paraíba',
      'DDD 13: Santos, São Vicente e Baixada Santista',
      'DDD 14: Bauru, Marília e região centro-oeste',
      'DDD 15: Sorocaba, Itapetininga e região',
      'DDD 16: Ribeirão Preto, Araraquara e região',
      'DDD 17: São José do Rio Preto e noroeste',
      'DDD 18: Presidente Prudente e oeste paulista',
      'DDD 19: Campinas, Piracicaba e região'
    ],
    telephonyTips: [
      'DDD 11 para São Paulo capital e Grande São Paulo',
      'DDD 12 para Vale do Paraíba (São José dos Campos)',
      'DDD 13 para Baixada Santista (Santos)',
      'DDD 14 para região de Bauru',
      'DDD 15 para região de Sorocaba',
      'DDD 16 para região de Ribeirão Preto',
      'DDD 17 para região de São José do Rio Preto',
      'DDD 18 para região de Presidente Prudente',
      'DDD 19 para região de Campinas',
      'Cobertura 5G ampla em todo o estado',
      'Melhor infraestrutura de fibra óptica do Brasil'
    ],
    faqs: [
      {
        question: 'Quais são os DDDs de São Paulo?',
        answer: 'São Paulo possui nove códigos DDD: 11, 12, 13, 14, 15, 16, 17, 18 e 19. Cada código atende uma região específica do estado, cobrindo os 645 municípios paulistas.'
      },
      {
        question: 'Qual o DDD da capital São Paulo?',
        answer: 'O DDD da capital São Paulo é 11. A cidade de São Paulo e a Grande São Paulo utilizam o código 11 para ligações telefônicas.'
      },
      {
        question: 'DDD 11 é de qual estado?',
        answer: 'O DDD 11 é de São Paulo (SP), estado da região Sudeste do Brasil. Este código atende a capital São Paulo e região metropolitana.'
      },
      {
        question: 'Qual o DDD de Campinas?',
        answer: 'O DDD de Campinas é 19. Esta importante cidade do interior paulista utiliza o código 19, assim como Piracicaba, Limeira e região.'
      },
      {
        question: 'Qual o DDD de Santos?',
        answer: 'O DDD de Santos é 13. A principal cidade da Baixada Santista utiliza o código 13, assim como São Vicente, Guarujá e região litorânea.'
      }
    ],
    relatedStates: [
      { name: 'Rio de Janeiro', abbreviation: 'RJ', ddds: ['21', '22', '24'] },
      { name: 'Minas Gerais', abbreviation: 'MG', ddds: ['31', '32', '33', '34', '35', '37', '38'] },
      { name: 'Paraná', abbreviation: 'PR', ddds: ['41', '42', '43', '44', '45', '46'] },
      { name: 'Mato Grosso do Sul', abbreviation: 'MS', ddds: ['67'] }
    ],
    authorityLinks: [
      {
        name: 'Governo de São Paulo',
        url: 'https://www.sp.gov.br',
        description: 'Portal oficial do governo estadual'
      },
      {
        name: 'Prefeitura de São Paulo',
        url: 'https://www.capital.sp.gov.br',
        description: 'Portal oficial da capital paulista'
      },
      {
        name: 'Anatel São Paulo',
        url: 'https://www.gov.br/anatel',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  }
};

// Função para gerar meta tags SEO
export const generateStateSEO = (state: State) => {
  const info = stateDetailedInfo[state.id];
  const dddList = state.dddCodes.join(', ');
  const cityList = state.cities.slice(0, 5).map(c => c.name).join(', ');
  const primaryDDD = state.dddCodes[0]; // Primeiro DDD para o título padronizado
  
  return {
    title: `DDD ${primaryDDD} ${state.name} - Saiba Como Funciona!`,
    description: `✅ Descubra tudo sobre o DDD ${primaryDDD} do ${state.name}! Consulte códigos de ${info?.municipalities || state.cities.length} cidades, operadoras disponíveis e como fazer ligações. Acesse agora e encontre o DDD que você precisa!`,
    keywords: [
      `DDD ${state.name}`,
      `DDD ${state.abbreviation}`,
      ...state.dddCodes.map(ddd => `DDD ${ddd}`),
      ...state.cities.map(city => `DDD ${city.name}`),
      ...state.cities.map(city => `${city.ddd} ${city.name}`),
      `código telefônico ${state.name}`,
      `telefone ${state.capital}`,
      `operadoras ${state.name}`,
      `como ligar para ${state.name}`
    ],
    canonical: `/estado/${state.slug}`,
    ogTitle: `DDD ${primaryDDD} ${state.name} - Saiba Como Funciona!`,
    ogDescription: `✅ Descubra tudo sobre o DDD ${primaryDDD} do ${state.name}! Consulte códigos de ${info?.municipalities || state.cities.length} cidades, operadoras disponíveis e como fazer ligações. Acesse agora!`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: info?.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      })) || []
    }
  };
};
