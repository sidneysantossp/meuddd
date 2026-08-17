/* Acesso on-demand ao catálogo de tabs editorial por município.
   Um módulo por UF mantém o bundle leve (as 27 unidades são carregadas só
   quando a respetiva página de município pede o conteúdo). */
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

import { catalog as AC } from "./ac";
import { catalog as AL } from "./al";
import { catalog as AM } from "./am";
import { catalog as AP } from "./ap";
import { catalog as BA } from "./ba";
import { catalog as CE } from "./ce";
import { catalog as DF } from "./df";
import { catalog as ES } from "./es";
import { catalog as GO } from "./go";
import { catalog as MA } from "./ma";
import { catalog as MG } from "./mg";
import { catalog as MS } from "./ms";
import { catalog as MT } from "./mt";
import { catalog as PA } from "./pa";
import { catalog as PB } from "./pb";
import { catalog as PE } from "./pe";
import { catalog as PI } from "./pi";
import { catalog as PR } from "./pr";
import { catalog as RJ } from "./rj";
import { catalog as RN } from "./rn";
import { catalog as RO } from "./ro";
import { catalog as RR } from "./rr";
import { catalog as RS } from "./rs";
import { catalog as SC } from "./sc";
import { catalog as SE } from "./se";
import { catalog as SP } from "./sp";
import { catalog as TO } from "./to";
const loaders: Record<string, () => Promise<LocalityTabsCatalog>> = {
  ac: () => Promise.resolve(AC),
  al: () => Promise.resolve(AL),
  am: () => Promise.resolve(AM),
  ap: () => Promise.resolve(AP),
  ba: () => Promise.resolve(BA),
  ce: () => Promise.resolve(CE),
  df: () => Promise.resolve(DF),
  es: () => Promise.resolve(ES),
  go: () => Promise.resolve(GO),
  ma: () => Promise.resolve(MA),
  mg: () => Promise.resolve(MG),
  ms: () => Promise.resolve(MS),
  mt: () => Promise.resolve(MT),
  pa: () => Promise.resolve(PA),
  pb: () => Promise.resolve(PB),
  pe: () => Promise.resolve(PE),
  pi: () => Promise.resolve(PI),
  pr: () => Promise.resolve(PR),
  rj: () => Promise.resolve(RJ),
  rn: () => Promise.resolve(RN),
  ro: () => Promise.resolve(RO),
  rr: () => Promise.resolve(RR),
  rs: () => Promise.resolve(RS),
  sc: () => Promise.resolve(SC),
  se: () => Promise.resolve(SE),
  sp: () => Promise.resolve(SP),
  to: () => Promise.resolve(TO),
};
const cache = new Map<string, LocalityTabsCatalog>();

/** Obter as tabs editoriais de um município (SSR-safe; síncrono quando já em cache). */
export function getMunicipalityTabsSync(
  uf: string,
  slug: string
): MunicipalityTabs | undefined {
  const key = slug.toLowerCase();
  const catalog = cache.get(uf.toLowerCase());
  return catalog?.[key];
}

export function getMunicipalityTabsKey(uf: string, slug: string): string {
  return `${uf.toLowerCase()}:${slug.toLowerCase()}`;
}

/** Carregar o catálogo da UF (importa o módulo da UF; cacheia). */
export async function loadMunicipalityTabs(
  uf: string
): Promise<LocalityTabsCatalog> {
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
export async function getMunicipalityTabs(
  uf: string,
  slug: string
): Promise<MunicipalityTabs | undefined> {
  const catalog = await loadMunicipalityTabs(uf);
  return catalog[getMunicipalityTabsKey(uf, slug)];
}

/** Link de pesquisa direta no Google Maps com coordenadas reais do ponto. */
export function mapPointUrl(
  query: string,
  latitude?: number | string | null,
  longitude?: number | string | null
): string {
  const coords =
    latitude !== null &&
    latitude !== undefined &&
    longitude !== null &&
    longitude !== undefined
      ? ` ${latitude},${longitude}`
      : "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + coords)}`;
}
