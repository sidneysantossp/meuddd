import type { Region } from '@/types';

// Dados LITE dos estados - SEM cidades para carregamento inicial rápido
// Tamanho: ~5KB vs 354KB do states.ts completo

export interface StateLite {
  id: string;
  name: string;
  slug: string;
  abbreviation: string;
  region: Region;
  capital: string;
  population: number;
  dddCodes: string[];
  citiesCount: number;
}

export const brazilianStatesLite: StateLite[] = [
  { id: 'ac', name: 'Acre', slug: 'acre', abbreviation: 'AC', region: 'Norte', capital: 'Rio Branco', population: 894470, dddCodes: ['68'], citiesCount: 22 },
  { id: 'al', name: 'Alagoas', slug: 'alagoas', abbreviation: 'AL', region: 'Nordeste', capital: 'Maceió', population: 3374114, dddCodes: ['82'], citiesCount: 102 },
  { id: 'ap', name: 'Amapá', slug: 'amapa', abbreviation: 'AP', region: 'Norte', capital: 'Macapá', population: 877613, dddCodes: ['96'], citiesCount: 16 },
  { id: 'am', name: 'Amazonas', slug: 'amazonas', abbreviation: 'AM', region: 'Norte', capital: 'Manaus', population: 4269995, dddCodes: ['92', '97'], citiesCount: 62 },
  { id: 'ba', name: 'Bahia', slug: 'bahia', abbreviation: 'BA', region: 'Nordeste', capital: 'Salvador', population: 14985284, dddCodes: ['71', '73', '74', '75', '77'], citiesCount: 417 },
  { id: 'ce', name: 'Ceará', slug: 'ceara', abbreviation: 'CE', region: 'Nordeste', capital: 'Fortaleza', population: 9240580, dddCodes: ['85', '88'], citiesCount: 184 },
  { id: 'df', name: 'Distrito Federal', slug: 'distrito-federal', abbreviation: 'DF', region: 'Centro-Oeste', capital: 'Brasília', population: 3094325, dddCodes: ['61'], citiesCount: 1 },
  { id: 'es', name: 'Espírito Santo', slug: 'espirito-santo', abbreviation: 'ES', region: 'Sudeste', capital: 'Vitória', population: 4108508, dddCodes: ['27', '28'], citiesCount: 78 },
  { id: 'go', name: 'Goiás', slug: 'goias', abbreviation: 'GO', region: 'Centro-Oeste', capital: 'Goiânia', population: 7206589, dddCodes: ['62', '64'], citiesCount: 246 },
  { id: 'ma', name: 'Maranhão', slug: 'maranhao', abbreviation: 'MA', region: 'Nordeste', capital: 'São Luís', population: 7153262, dddCodes: ['98', '99'], citiesCount: 217 },
  { id: 'mt', name: 'Mato Grosso', slug: 'mato-grosso', abbreviation: 'MT', region: 'Centro-Oeste', capital: 'Cuiabá', population: 3567234, dddCodes: ['65', '66'], citiesCount: 141 },
  { id: 'ms', name: 'Mato Grosso do Sul', slug: 'mato-grosso-do-sul', abbreviation: 'MS', region: 'Centro-Oeste', capital: 'Campo Grande', population: 2839188, dddCodes: ['67'], citiesCount: 79 },
  { id: 'mg', name: 'Minas Gerais', slug: 'minas-gerais', abbreviation: 'MG', region: 'Sudeste', capital: 'Belo Horizonte', population: 21411923, dddCodes: ['31', '32', '33', '34', '35', '37', '38'], citiesCount: 853 },
  { id: 'pa', name: 'Pará', slug: 'para', abbreviation: 'PA', region: 'Norte', capital: 'Belém', population: 8777124, dddCodes: ['91', '93', '94'], citiesCount: 144 },
  { id: 'pb', name: 'Paraíba', slug: 'paraiba', abbreviation: 'PB', region: 'Nordeste', capital: 'João Pessoa', population: 4059905, dddCodes: ['83'], citiesCount: 223 },
  { id: 'pr', name: 'Paraná', slug: 'parana', abbreviation: 'PR', region: 'Sul', capital: 'Curitiba', population: 11597484, dddCodes: ['41', '42', '43', '44', '45', '46'], citiesCount: 399 },
  { id: 'pe', name: 'Pernambuco', slug: 'pernambuco', abbreviation: 'PE', region: 'Nordeste', capital: 'Recife', population: 9674793, dddCodes: ['81', '87'], citiesCount: 185 },
  { id: 'pi', name: 'Piauí', slug: 'piaui', abbreviation: 'PI', region: 'Nordeste', capital: 'Teresina', population: 3289290, dddCodes: ['86', '89'], citiesCount: 224 },
  { id: 'rj', name: 'Rio de Janeiro', slug: 'rio-de-janeiro', abbreviation: 'RJ', region: 'Sudeste', capital: 'Rio de Janeiro', population: 17503660, dddCodes: ['21', '22', '24'], citiesCount: 92 },
  { id: 'rn', name: 'Rio Grande do Norte', slug: 'rio-grande-do-norte', abbreviation: 'RN', region: 'Nordeste', capital: 'Natal', population: 3560903, dddCodes: ['84'], citiesCount: 167 },
  { id: 'rs', name: 'Rio Grande do Sul', slug: 'rio-grande-do-sul', abbreviation: 'RS', region: 'Sul', capital: 'Porto Alegre', population: 11466630, dddCodes: ['51', '53', '54', '55'], citiesCount: 497 },
  { id: 'ro', name: 'Rondônia', slug: 'rondonia', abbreviation: 'RO', region: 'Norte', capital: 'Porto Velho', population: 1815278, dddCodes: ['69'], citiesCount: 52 },
  { id: 'rr', name: 'Roraima', slug: 'roraima', abbreviation: 'RR', region: 'Norte', capital: 'Boa Vista', population: 652713, dddCodes: ['95'], citiesCount: 15 },
  { id: 'sc', name: 'Santa Catarina', slug: 'santa-catarina', abbreviation: 'SC', region: 'Sul', capital: 'Florianópolis', population: 7338473, dddCodes: ['47', '48', '49'], citiesCount: 295 },
  { id: 'sp', name: 'São Paulo', slug: 'sao-paulo', abbreviation: 'SP', region: 'Sudeste', capital: 'São Paulo', population: 46649132, dddCodes: ['11', '12', '13', '14', '15', '16', '17', '18', '19'], citiesCount: 645 },
  { id: 'se', name: 'Sergipe', slug: 'sergipe', abbreviation: 'SE', region: 'Nordeste', capital: 'Aracaju', population: 2338474, dddCodes: ['79'], citiesCount: 75 },
  { id: 'to', name: 'Tocantins', slug: 'tocantins', abbreviation: 'TO', region: 'Norte', capital: 'Palmas', population: 1607363, dddCodes: ['63'], citiesCount: 139 },
];

// Funções de busca otimizadas para dados lite
export const getStateLiteBySlug = (slug: string): StateLite | undefined => {
  return brazilianStatesLite.find(s => s.slug === slug);
};

export const getStateLiteById = (id: string): StateLite | undefined => {
  return brazilianStatesLite.find(s => s.id === id);
};

// Normalização de texto para busca
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

// Busca rápida em dados lite
export const searchStatesLite = (searchTerm: string): StateLite[] => {
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) return brazilianStatesLite;
  
  // Verifica se é código DDD
  const cleaned = term.replace(/\D/g, '');
  if (cleaned.length === 2) {
    const found = brazilianStatesLite.filter(s => s.dddCodes.includes(cleaned));
    if (found.length > 0) return found;
  }
  
  const normalized = normalizeText(term);
  
  return brazilianStatesLite.filter(state => {
    if (normalizeText(state.name).includes(normalized)) return true;
    if (normalizeText(state.abbreviation).includes(normalized)) return true;
    if (normalizeText(state.capital).includes(normalized)) return true;
    if (state.dddCodes.some(ddd => ddd.includes(cleaned))) return true;
    return false;
  });
};

// Estatísticas calculadas
export const getStatisticsLite = () => ({
  totalStates: 27,
  totalDDDCodes: 67,
  totalCities: brazilianStatesLite.reduce((sum, s) => sum + s.citiesCount, 0),
});

// Filtra por região
export const getStatesByRegionLite = (region: string): StateLite[] => {
  if (!region || region === 'Todos') return brazilianStatesLite;
  return brazilianStatesLite.filter(s => s.region === region);
};
