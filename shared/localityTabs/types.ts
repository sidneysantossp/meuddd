/* Tipos do catálogo de conteúdo editorial em tabs por município.
   Cobertura por município: turismo, gastronomia, transporte e clima/região,
   com links de geolocalização do Google Maps e ficha de autoridade para a
   página pilar do estado. */

export interface TourismTab {
  intro: string;
  items: { name: string; description: string; mapHref: string }[];
  closing?: string;
}

export interface DiningTab {
  intro: string;
  items: { name: string; kind: string; description: string; mapHref: string }[];
  closing?: string;
}

export interface TransportTab {
  intro: string;
  items: { name: string; kind: string; description: string; mapHref?: string }[];
  closing?: string;
}

export interface ClimateTab {
  intro: string;
  details: { label: string; value: string }[];
  body: string;
  /** Fonte de autoridade climática (ex.: climate-data.org) com link externo. */
  source?: { label: string; href: string };
}

export interface MunicipalityTabs {
  tourism: TourismTab;
  dining: DiningTab;
  transport: TransportTab;
  climate: ClimateTab;
  city: string;
  uf: string;
  stateName: string;
  region: string;
  ddd: string;
  population: number | null;
  reviewedOn: string;
}

export type LocalityTabsCatalog = Record<string, MunicipalityTabs>;
