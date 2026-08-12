export const TERRITORIAL_REVIEW_DATE = "2026-08-12";

export const officialTerritorialSources = {
  anatel: {
    name: "Anatel — Plano de Numeração Brasileiro",
    shortName: "ANATEL",
    url: "https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro",
    purpose: "Referência para a organização nacional de códigos de área e numeração.",
  },
  ibge: {
    name: "IBGE — Cidades e Estados",
    shortName: "IBGE",
    url: "https://www.ibge.gov.br/cidades-e-estados.html",
    purpose: "Referência para população estimada, identificação e contexto territorial.",
  },
} as const;

export const regionHubs = [
  { slug: "centro-oeste", name: "Centro-Oeste" },
  { slug: "nordeste", name: "Nordeste" },
  { slug: "norte", name: "Norte" },
  { slug: "sudeste", name: "Sudeste" },
  { slug: "sul", name: "Sul" },
] as const;

export type RegionHub = (typeof regionHubs)[number];

export function regionSlug(region: string) {
  return region
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findRegionHub(slug: string) {
  return regionHubs.find(region => region.slug === slug);
}
