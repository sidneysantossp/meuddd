/* Acesso on-demand ao catálogo de tabs editorial por município.
   Um módulo por UF mantém o bundle leve (as 27 unidades são carregadas só
   quando a respetiva página de município pede o conteúdo).

   Estratégia de carregamento (o bundle SSR não pode transformar os 27 módulos
   UF — 51 MB de texto —, por isso a resolução dos catálogos acontece em
   runtime, sem qualquer `import` estático destes módulos neste ficheiro):

   - Em Node (SSR em produção ou dev), os módulos UF já estão compilados em
     `dist/server/tabs/*.js` e são carregados com `require()` de caminho
     construído em runtime (o bundler não os resolve).
   - No browser, o mesmo catálogo é servido pelos módulos TS importados
     dinamicamente (code-split pelo bundler).
*/
import path from "node:path";
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const cache = new Map<string, LocalityTabsCatalog>();

/** Detetar ambiente Node (SSR e dev) para carregar os módulos compilados. */
function isNodeRuntime(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null &&
    typeof require === "function"
  );
}

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
] as const;

/** Carregar o catálogo UF compilado via require() (Node/runtime). */
function loadCompiledUf(ufLower: string): LocalityTabsCatalog | null {
  try {
    const req = require as NodeJS.Require;
    const cwd = process.cwd();
    // Caminhos absolutos baseados no cwd, que em produção é `dist/server`
    // (o index.ts bundleado corre a partir de dist/server/entry-server.js).
    const candidates = [
      path.join(cwd, "tabs", `${ufLower}.cjs`),
      path.join(cwd, "tabs", `${ufLower}.js`),
      path.join(path.dirname(cwd), "server", "tabs", `${ufLower}.cjs`),
      path.join(path.dirname(cwd), "server", "tabs", `${ufLower}.js`),
    ];
    for (const candidate of candidates) {
      try {
        const mod = req(candidate) as { catalog?: LocalityTabsCatalog };
        if (mod?.catalog) return mod.catalog;
      } catch {
        continue;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/* No browser, o mesmo catálogo é servido pelos módulos TS importados
   dinamicamente. O specifier é construído em runtime (`./${uf}`) para o
   bundler NÃO analisar estaticamente os 27 módulos UF (51 MB) durante o
   build SSR — cada UF é code-split apenas quando realmente pedida. */
const loaders: Record<string, () => Promise<LocalityTabsCatalog>> = Object.fromEntries(
  UF_LIST.map((uf) => [
    uf,
    () =>
      // @vite-ignore — specifier não literal; o bundler não pré-resolve.
      import(/* @vite-ignore */ `./${uf}` as string).then(
        (m: { catalog: LocalityTabsCatalog }) => m.catalog
      ),
  ])
);

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

/** Carregar o catálogo da UF (importa o módulo da UF; cacheia). */
export async function loadMunicipalityTabs(
  uf: string
): Promise<LocalityTabsCatalog> {
  const lower = uf.toLowerCase();
  const cached = cache.get(lower);
  if (cached) return cached;
  // Em runtime Node (SSR em produção), os módulos UF estão compilados como
  // CommonJS e são carregados com require() de caminho construído em
  // runtime — o bundle SSR não os resolve nem transforma.
  if (isNodeRuntime()) {
    const compiled = loadCompiledUf(lower);
    if (compiled) {
      cache.set(lower, compiled);
      return compiled;
    }
  }
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

export type UF = (typeof UF_LIST)[number];
