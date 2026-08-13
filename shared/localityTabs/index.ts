/* Acesso on-demand ao catálogo de tabs editorial por município.
   Um módulo por UF mantém o bundle leve (as 27 unidades são carregadas só
   quando a respetiva página de município pede o conteúdo). */
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const loaders: Record<string, () => Promise<LocalityTabsCatalog>> = {
  ac: () => import("./ac").then(m => m.default),
  al: () => import("./al").then(m => m.default),
  ap: () => import("./ap").then(m => m.default),
  am: () => import("./am").then(m => m.default),
  ba: () => import("./ba").then(m => m.default),
  ce: () => import("./ce").then(m => m.default),
  df: () => import("./df").then(m => m.default),
  es: () => import("./es").then(m => m.default),
  go: () => import("./go").then(m => m.default),
  ma: () => import("./ma").then(m => m.default),
  mt: () => import("./mt").then(m => m.default),
  ms: () => import("./ms").then(m => m.default),
  mg: () => import("./mg").then(m => m.default),
  pa: () => import("./pa").then(m => m.default),
  pb: () => import("./pb").then(m => m.default),
  pr: () => import("./pr").then(m => m.default),
  pe: () => import("./pe").then(m => m.default),
  pi: () => import("./pi").then(m => m.default),
  rj: () => import("./rj").then(m => m.default),
  rn: () => import("./rn").then(m => m.default),
  rs: () => import("./rs").then(m => m.default),
  ro: () => import("./ro").then(m => m.default),
  rr: () => import("./rr").then(m => m.default),
  sc: () => import("./sc").then(m => m.default),
  sp: () => import("./sp").then(m => m.default),
  se: () => import("./se").then(m => m.default),
  to: () => import("./to").then(m => m.default),
};

const cache = new Map<string, LocalityTabsCatalog>();

/** Obter as tabs editoriais de um município (SSR-safe; síncrono quando já em cache). */
export function getMunicipalityTabsSync(uf: string, slug: string): MunicipalityTabs | undefined {
  const key = `${uf.toLowerCase()}:${slug.toLowerCase()}`;
  const catalog = cache.get(uf.toLowerCase());
  return catalog?.[key];
}

export function getMunicipalityTabsKey(uf: string, slug: string): string {
  return `${uf.toLowerCase()}:${slug.toLowerCase()}`;
}

/** Carregar o catálogo da UF (importa o módulo da UF; cacheia). */
export async function loadMunicipalityTabs(uf: string): Promise<LocalityTabsCatalog> {
  const lower = uf.toLowerCase();
  const cached = cache.get(lower);
  if (cached) return cached;
  const loader = loaders[lower];
  if (!loader) return {};
  const catalog = await loader();
  cache.set(lower, catalog);
  return catalog;
}

/** Carregar e devolver as tabs de um município específico. */
export async function getMunicipalityTabs(uf: string, slug: string): Promise<MunicipalityTabs | undefined> {
  const catalog = await loadMunicipalityTabs(uf);
  return catalog[getMunicipalityTabsKey(uf, slug)];
}

/** Link de pesquisa direta no Google Maps com coordenadas reais do ponto. */
export function mapPointUrl(query: string, latitude?: number | string | null, longitude?: number | string | null): string {
  const coords = latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined
    ? ` ${latitude},${longitude}`
    : "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + coords)}`;
}
