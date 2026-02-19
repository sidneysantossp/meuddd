import { brazilianStates } from "@/data/states";

// Transform index for fast lookup
const estadosLookup = brazilianStates.reduce((acc, estado) => {
  acc[estado.slug] = {
    nome: estado.name,
    sigla: estado.abbreviation,
    ddd: estado.dddCodes[0], // Using primary DDD for main display
    capital: estado.capital,
    regiao: estado.region,
    populacao: estado.population.toLocaleString('pt-BR'),
    area: "Informação Geográfica", // Placeholder if not in main data
    cidades: estado.cities.map(c => c.name)
  };
  return acc;
}, {} as Record<string, any>);

export const estadosBrasil = estadosLookup;

export const getEstadoBySlug = (slug: string) => {
  const estadoKey = slug.toLowerCase();
  return estadosLookup[estadoKey];
};

export const getEstadoByDDD = (ddd: string) => {
  return brazilianStates.find(e => e.dddCodes.includes(ddd)) || null;
};

export const getAllEstadoSlugs = () => {
  return brazilianStates.map(e => e.slug);
};