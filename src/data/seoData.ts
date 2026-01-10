/**
 * Dados de SEO para todas as páginas do site
 * Títulos com até 60 caracteres e descrições com até 160 caracteres
 */

import type { SEOProps } from '@/components/common/SEOHead';

export interface PageSEO extends Omit<SEOProps, 'structuredData'> {
  path: string;
}

/**
 * SEO da Página Inicial
 */
export const homePageSEO: PageSEO = {
  path: '/',
  title: 'Consulta de Códigos DDD do Brasil | MEU DDD',
  description: 'Consulte códigos DDD de todos os estados e cidades do Brasil. Informações atualizadas sobre os 27 estados brasileiros com mais de 730 cidades cadastradas.',
  keywords: [
    'DDD Brasil',
    'código DDD',
    'consulta DDD',
    'telefone Brasil',
    'código telefônico',
    'DDD estados',
    'DDD cidades',
  ],
  canonical: 'https://www.meuddd.com.br/',
  ogType: 'website',
};

/**
 * SEO da Página de Estados
 */
export const statesPageSEO: PageSEO = {
  path: '/estados',
  title: 'Todos os Estados do Brasil | Códigos DDD por Estado',
  description: 'Lista completa dos 27 estados brasileiros com seus respectivos códigos DDD. Consulte informações detalhadas sobre cada estado e suas cidades.',
  keywords: [
    'estados Brasil',
    'DDD por estado',
    'códigos telefônicos estados',
    'lista estados DDD',
    'consulta estados',
  ],
  canonical: 'https://www.meuddd.com.br/estados',
  ogType: 'website',
};

/**
 * SEO da Página Sobre
 */
export const aboutPageSEO: PageSEO = {
  path: '/sobre',
  title: 'Sobre o MEU DDD | Plataforma de Consulta de Códigos',
  description: 'Conheça o MEU DDD, a plataforma completa para consulta de códigos DDD do Brasil. Nossa missão é facilitar o acesso a informações telefônicas atualizadas.',
  keywords: [
    'sobre MEU DDD',
    'plataforma DDD',
    'consulta telefônica',
    'informações DDD',
  ],
  canonical: 'https://www.meuddd.com.br/sobre',
  ogType: 'website',
};

/**
 * SEO da Página de Contato
 */
export const contactPageSEO: PageSEO = {
  path: '/contato',
  title: 'Entre em Contato | MEU DDD',
  description: 'Entre em contato com a equipe do MEU DDD. Tire suas dúvidas, envie sugestões ou reporte problemas. Estamos aqui para ajudar!',
  keywords: [
    'contato MEU DDD',
    'fale conosco',
    'suporte DDD',
    'ajuda consulta DDD',
  ],
  canonical: 'https://www.meuddd.com.br/contato',
  ogType: 'website',
};

/**
 * SEO da Página de Validação de DDD
 */
export const validateDDDPageSEO: PageSEO = {
  path: '/validar-ddd',
  title: 'Validar Código DDD | Verificador Online Gratuito',
  description: 'Valide códigos DDD online de forma rápida e gratuita. Verifique se um código DDD é válido e descubra a qual estado e região ele pertence.',
  keywords: [
    'validar DDD',
    'verificar DDD',
    'DDD válido',
    'checar código DDD',
    'validador DDD online',
  ],
  canonical: 'https://www.meuddd.com.br/validar-ddd',
  ogType: 'website',
};

/**
 * SEO da Página de Gerador de Telefone
 */
export const generatorPageSEO: PageSEO = {
  path: '/gerador-numeros',
  title: 'Gerador de Números de Telefone | MEU DDD',
  description: 'Gere números de telefone válidos para testes. Ferramenta gratuita para desenvolvedores e testadores que precisam de números fictícios.',
  keywords: [
    'gerador telefone',
    'gerar número telefone',
    'número teste',
    'telefone fictício',
    'gerador DDD',
  ],
  canonical: 'https://www.meuddd.com.br/gerador-numeros',
  ogType: 'website',
};

/**
 * SEO da Página de Busca por Voz
 */
export const voiceSearchPageSEO: PageSEO = {
  path: '/busca-por-voz',
  title: 'Busca por Voz de Códigos DDD | Consulta Rápida',
  description: 'Use sua voz para consultar códigos DDD de forma rápida e prática. Tecnologia de reconhecimento de voz para facilitar sua busca.',
  keywords: [
    'busca por voz DDD',
    'consulta voz',
    'DDD por voz',
    'reconhecimento voz',
    'busca falada',
  ],
  canonical: 'https://www.meuddd.com.br/busca-por-voz',
  ogType: 'website',
};

/**
 * SEO da Página do Blog
 */
export const blogPageSEO: PageSEO = {
  path: '/blog',
  title: 'Blog MEU DDD | Notícias e Dicas sobre Telefonia',
  description: 'Acompanhe as últimas notícias, dicas e informações sobre códigos DDD, telefonia e telecomunicações no Brasil. Conteúdo atualizado regularmente.',
  keywords: [
    'blog DDD',
    'notícias telefonia',
    'dicas DDD',
    'telecomunicações Brasil',
    'artigos telefonia',
  ],
  canonical: 'https://www.meuddd.com.br/blog',
  ogType: 'website',
};

/**
 * Gera SEO para página de estado
 */
export function generateStateSEO(state: {
  name: string;
  slug: string;
  abbreviation: string;
  capital: string;
  population: string;
  ddds: string[];
  region: string;
  citiesCount: number;
}): PageSEO {
  const dddList = state.ddds.join(', ');
  const dddCount = state.ddds.length;
  
  return {
    path: `/estado/${state.slug}`,
    title: `Códigos DDD de ${state.name} | Consulta Completa`,
    description: `Consulte todos os ${dddCount} código${dddCount > 1 ? 's' : ''} DDD de ${state.name}: ${dddList}. Lista com ${state.citiesCount} cidades, capital ${state.capital} e informações detalhadas.`,
    keywords: [
      `DDD ${state.name}`,
      `código ${state.abbreviation}`,
      `DDD ${state.capital}`,
      `telefone ${state.name}`,
      `cidades ${state.abbreviation}`,
      ...state.ddds.map(ddd => `DDD ${ddd}`),
    ],
    canonical: `https://www.meuddd.com.br/estado/${state.slug}`,
    ogType: 'website',
  };
}

/**
 * Gera SEO para página de cidade
 */
export function generateCitySEO(city: {
  name: string;
  state: string;
  stateAbbreviation: string;
  ddd: string;
  population?: string;
  isCapital?: boolean;
}): PageSEO {
  const capitalText = city.isCapital ? 'capital de ' : '';
  const populationText = city.population ? ` com ${city.population} habitantes` : '';
  
  return {
    path: `/cidade/${city.stateAbbreviation.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: `DDD de ${city.name} - ${city.stateAbbreviation} | Código ${city.ddd}`,
    description: `Código DDD de ${city.name}, ${capitalText}${city.state}${populationText}. Consulte operadoras, cobertura e informações telefônicas completas.`,
    keywords: [
      `DDD ${city.name}`,
      `código ${city.name}`,
      `DDD ${city.ddd}`,
      `telefone ${city.name}`,
      `${city.name} ${city.stateAbbreviation}`,
    ],
    canonical: `https://www.meuddd.com.br/cidade/${city.stateAbbreviation.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
    ogType: 'website',
  };
}

/**
 * Gera SEO para post do blog
 */
export function generateBlogPostSEO(post: {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  keywords?: string[];
}): PageSEO {
  return {
    path: `/blog/${post.id}`,
    title: `${post.title} | Blog MEU DDD`,
    description: post.excerpt,
    keywords: post.keywords || [
      post.category,
      'DDD Brasil',
      'telefonia',
      'telecomunicações',
    ],
    canonical: `https://www.meuddd.com.br/blog/${post.id}`,
    ogType: 'article',
    author: post.author,
    publishedTime: post.date,
    section: post.category,
  };
}

/**
 * SEO padrão para páginas não encontradas
 */
export const notFoundPageSEO: PageSEO = {
  path: '/404',
  title: 'Página Não Encontrada | MEU DDD',
  description: 'A página que você está procurando não foi encontrada. Volte para a página inicial e continue sua consulta de códigos DDD.',
  keywords: ['404', 'página não encontrada', 'erro'],
  canonical: 'https://www.meuddd.com.br/404',
  ogType: 'website',
  noindex: true,
  nofollow: true,
};

/**
 * Lista de todos os estados com seus dados de SEO
 */
export const statesSEOData = {
  ac: {
    name: 'Acre',
    abbreviation: 'AC',
    slug: 'acre',
    capital: 'Rio Branco',
    population: '894.470',
    ddds: ['68'],
    region: 'Norte',
    citiesCount: 22,
  },
  al: {
    name: 'Alagoas',
    abbreviation: 'AL',
    slug: 'alagoas',
    capital: 'Maceió',
    population: '3.374.114',
    ddds: ['82'],
    region: 'Nordeste',
    citiesCount: 102,
  },
  ap: {
    name: 'Amapá',
    abbreviation: 'AP',
    slug: 'amapa',
    capital: 'Macapá',
    population: '877.613',
    ddds: ['96'],
    region: 'Norte',
    citiesCount: 16,
  },
  am: {
    name: 'Amazonas',
    abbreviation: 'AM',
    slug: 'amazonas',
    capital: 'Manaus',
    population: '4.269.995',
    ddds: ['92', '97'],
    region: 'Norte',
    citiesCount: 62,
  },
  ba: {
    name: 'Bahia',
    abbreviation: 'BA',
    slug: 'bahia',
    capital: 'Salvador',
    population: '14.985.284',
    ddds: ['71', '73', '74', '75', '77'],
    region: 'Nordeste',
    citiesCount: 417,
  },
  ce: {
    name: 'Ceará',
    abbreviation: 'CE',
    slug: 'ceara',
    capital: 'Fortaleza',
    population: '9.240.580',
    ddds: ['85', '88'],
    region: 'Nordeste',
    citiesCount: 184,
  },
  df: {
    name: 'Distrito Federal',
    abbreviation: 'DF',
    slug: 'distrito-federal',
    capital: 'Brasília',
    population: '3.094.325',
    ddds: ['61'],
    region: 'Centro-Oeste',
    citiesCount: 1,
  },
  es: {
    name: 'Espírito Santo',
    abbreviation: 'ES',
    slug: 'espirito-santo',
    capital: 'Vitória',
    population: '4.108.508',
    ddds: ['27', '28'],
    region: 'Sudeste',
    citiesCount: 78,
  },
  go: {
    name: 'Goiás',
    abbreviation: 'GO',
    slug: 'goias',
    capital: 'Goiânia',
    population: '7.206.589',
    ddds: ['62', '64'],
    region: 'Centro-Oeste',
    citiesCount: 246,
  },
  ma: {
    name: 'Maranhão',
    abbreviation: 'MA',
    slug: 'maranhao',
    capital: 'São Luís',
    population: '7.153.262',
    ddds: ['98', '99'],
    region: 'Nordeste',
    citiesCount: 217,
  },
  mt: {
    name: 'Mato Grosso',
    abbreviation: 'MT',
    slug: 'mato-grosso',
    capital: 'Cuiabá',
    population: '3.567.234',
    ddds: ['65', '66'],
    region: 'Centro-Oeste',
    citiesCount: 141,
  },
  ms: {
    name: 'Mato Grosso do Sul',
    abbreviation: 'MS',
    slug: 'mato-grosso-do-sul',
    capital: 'Campo Grande',
    population: '2.839.188',
    ddds: ['67'],
    region: 'Centro-Oeste',
    citiesCount: 79,
  },
  mg: {
    name: 'Minas Gerais',
    abbreviation: 'MG',
    slug: 'minas-gerais',
    capital: 'Belo Horizonte',
    population: '21.411.923',
    ddds: ['31', '32', '33', '34', '35', '37', '38'],
    region: 'Sudeste',
    citiesCount: 853,
  },
  pa: {
    name: 'Pará',
    abbreviation: 'PA',
    slug: 'para',
    capital: 'Belém',
    population: '8.777.124',
    ddds: ['91', '93', '94'],
    region: 'Norte',
    citiesCount: 144,
  },
  pb: {
    name: 'Paraíba',
    abbreviation: 'PB',
    slug: 'paraiba',
    capital: 'João Pessoa',
    population: '4.059.905',
    ddds: ['83'],
    region: 'Nordeste',
    citiesCount: 223,
  },
  pr: {
    name: 'Paraná',
    abbreviation: 'PR',
    slug: 'parana',
    capital: 'Curitiba',
    population: '11.597.484',
    ddds: ['41', '42', '43', '44', '45', '46'],
    region: 'Sul',
    citiesCount: 399,
  },
  pe: {
    name: 'Pernambuco',
    abbreviation: 'PE',
    slug: 'pernambuco',
    capital: 'Recife',
    population: '9.674.793',
    ddds: ['81', '87'],
    region: 'Nordeste',
    citiesCount: 185,
  },
  pi: {
    name: 'Piauí',
    abbreviation: 'PI',
    slug: 'piaui',
    capital: 'Teresina',
    population: '3.289.290',
    ddds: ['86', '89'],
    region: 'Nordeste',
    citiesCount: 224,
  },
  rj: {
    name: 'Rio de Janeiro',
    abbreviation: 'RJ',
    slug: 'rio-de-janeiro',
    capital: 'Rio de Janeiro',
    population: '17.463.349',
    ddds: ['21', '22', '24'],
    region: 'Sudeste',
    citiesCount: 92,
  },
  rn: {
    name: 'Rio Grande do Norte',
    abbreviation: 'RN',
    slug: 'rio-grande-do-norte',
    capital: 'Natal',
    population: '3.560.903',
    ddds: ['84'],
    region: 'Nordeste',
    citiesCount: 167,
  },
  rs: {
    name: 'Rio Grande do Sul',
    abbreviation: 'RS',
    slug: 'rio-grande-do-sul',
    capital: 'Porto Alegre',
    population: '11.466.630',
    ddds: ['51', '53', '54', '55'],
    region: 'Sul',
    citiesCount: 497,
  },
  ro: {
    name: 'Rondônia',
    abbreviation: 'RO',
    slug: 'rondonia',
    capital: 'Porto Velho',
    population: '1.815.278',
    ddds: ['69'],
    region: 'Norte',
    citiesCount: 52,
  },
  rr: {
    name: 'Roraima',
    abbreviation: 'RR',
    slug: 'roraima',
    capital: 'Boa Vista',
    population: '652.713',
    ddds: ['95'],
    region: 'Norte',
    citiesCount: 15,
  },
  sc: {
    name: 'Santa Catarina',
    abbreviation: 'SC',
    slug: 'santa-catarina',
    capital: 'Florianópolis',
    population: '7.338.473',
    ddds: ['47', '48', '49'],
    region: 'Sul',
    citiesCount: 295,
  },
  sp: {
    name: 'São Paulo',
    abbreviation: 'SP',
    slug: 'sao-paulo',
    capital: 'São Paulo',
    population: '46.649.132',
    ddds: ['11', '12', '13', '14', '15', '16', '17', '18', '19'],
    region: 'Sudeste',
    citiesCount: 645,
  },
  se: {
    name: 'Sergipe',
    abbreviation: 'SE',
    slug: 'sergipe',
    capital: 'Aracaju',
    population: '2.338.474',
    ddds: ['79'],
    region: 'Nordeste',
    citiesCount: 75,
  },
  to: {
    name: 'Tocantins',
    abbreviation: 'TO',
    slug: 'tocantins',
    capital: 'Palmas',
    population: '1.607.363',
    ddds: ['63'],
    region: 'Norte',
    citiesCount: 139,
  },
};
