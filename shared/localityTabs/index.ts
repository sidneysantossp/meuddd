/* Acesso on-demand ao catálogo de tabs editorial por município.
   Cada UF tem um wrapper de ~1 KB em `_gen/uf-{uf}.js` que só carrega o
   catálogo real quando solicitado:

   - Em Node (SSR em produção ou dev tsx), o wrapper carrega os módulos
     compilados `dist/server/tabs/*.cjs` (ou `shared/localityTabs/{uf}.ts`
     como reserva em desenvolvimento) via `createRequire(import.meta.url)`.
   - No browser, o wrapper delega ao dynamic import do módulo TS
     (`shared/localityTabs/{uf}.ts`) — o vite code-splits por UF.

   Como os wrappers não contêm texto editorial, o bundler (esbuild do bundle
   Express e vite build --ssr) nunca inline os 51 MB do catálogo — sem isso
   o processo ultrapassaria o limite de 512 MiB da plataforma de deploy. */
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const cache = new Map<string, LocalityTabsCatalog>();

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
] as const;

/** Obter as tabs editoriais de um município (SSR-safe; síncrono quando já em cache). */
export function getMunicipalityTabsSync(
  uf: string,
  slug: string
): MunicipalityTabs | undefined {
  const catalog = cache.get(uf.toLowerCase());
  return catalog?.[slug.toLowerCase()];
}

export function getMunicipalityTabsKey(uf: string, slug: string): string {
  return `${uf.toLowerCase()}:${slug.toLowerCase()}`;
}

/** Carregar o catálogo da UF (wrapper lazy; cacheia). */
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

/* Loaders por UF: cada wrapper é um módulo de ~1 KB importado dinamicamente.
   O specifier literal por UF permite ao bundler code-split por estado sem
   analisar o conteúdo editorial dos módulos originais. */
const loaders: Record<string, () => Promise<LocalityTabsCatalog>> = Object.fromEntries(
  UF_LIST.map((uf) => [
    uf,
    () =>
      import(/* @vite-ignore */ `./_gen/uf-${uf}.js` as string).then(
        (m: { getUfCatalog: () => LocalityTabsCatalog }) => m.getUfCatalog()
      ),
  ])
);

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

export type UF = (typeof UF_LIST)[number];
