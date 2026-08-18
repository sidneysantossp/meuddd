/* Acesso fiável ao catálogo de tabs editorial por município.
   O carregamento dos 27 catálogos estaduais é lazy por design: os módulos
   UF `./_gen/uf-{uf}.js` são wrappers de ~1 KB que só carregam o catálogo
   real quando solicitado — em node via require() dos módulos compilados
   (dist/server/tabs/*.cjs em produção; shared/localityTabs/{uf}.ts em
   desenvolvimento tsx), no browser via dynamic import do módulo TS.

   Como os wrappers não contêm texto editorial, o bundler (esbuild SSR e
   vite build --ssr) não inline os 51 MB do catálogo — sem isso o processo
   ultrapassaria o limite de 512 MiB da plataforma de deploy. */
import { createRequire } from "node:module";
import path from "node:path";
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const ufRequire = createRequire(import.meta.url);

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
] as const;

type UfKey = (typeof UF_LIST)[number];

const ufs: Record<string, LocalityTabsCatalog | undefined> = {};

/** Carrega em node os módulos UF compilados (CommonJS) via createRequire. */
function loadNodeCatalog(uf: UfKey): LocalityTabsCatalog | undefined {
  const tabsDir = path.resolve(import.meta.dirname, "..", "dist", "server", "tabs");
  const candidates = [
    path.join(tabsDir, `${uf}.cjs`),
    path.join(tabsDir, `${uf}.js`),
    path.resolve(import.meta.dirname, `${uf}.ts`),
  ];
  for (const candidate of candidates) {
    try {
      const maybe = ufRequire(candidate) as {
        catalog?: LocalityTabsCatalog;
        default?: { catalog?: LocalityTabsCatalog } | LocalityTabsCatalog;
      };
      const catalog = maybe?.catalog ?? maybe?.default;
      const resolved =
        catalog && typeof catalog === "object" && !(catalog as { catalog?: unknown }).catalog
          ? (catalog as LocalityTabsCatalog)
          : ((catalog as { catalog?: LocalityTabsCatalog })?.catalog ?? undefined);
      if (resolved) return resolved;
    } catch {
      continue;
    }
  }
  return undefined;
}

// Cache de promises de dynamic import no browser (evita re-fetch).
const _browserCache: Record<string, Promise<LocalityTabsCatalog>> = {};

function loadBrowserCatalog(uf: UfKey): Promise<LocalityTabsCatalog> {
  const existing = _browserCache[uf];
  if (existing) return existing;
  const promise = import(
    /* @vite-ignore */ `./_gen/uf-${uf}.js` as string
  ).then(mod => mod.getUfCatalog());
  _browserCache[uf] = promise;
  return promise;
}

/** Obter as tabs editoriais de um município (síncrono no servidor, undefined no browser sem load prévio). */
export function getMunicipalityTabsByUf(
  uf: string,
  slug: string
): MunicipalityTabs | undefined {
  const key = uf.toLowerCase();
  if (!ufs[key] && typeof process !== "undefined" && process.versions?.node) {
    ufs[key] = loadNodeCatalog(key as UfKey);
  }
  return ufs[key]?.[slug.toLowerCase()];
}

/** Carrega o catálogo de um estado no browser (assíncrono); no servidor é síncrono. */
export async function loadMunicipalityTabsCatalog(
  uf: string
): Promise<LocalityTabsCatalog> {
  const key = uf.toLowerCase();
  if (!ufs[key]) {
    if (typeof process !== "undefined" && process.versions?.node) {
      ufs[key] = loadNodeCatalog(key as UfKey);
    } else {
      ufs[key] = await loadBrowserCatalog(key as UfKey);
    }
  }
  return ufs[key] ?? {};
}

export function getMunicipalityTabsUfCatalog(uf: string): LocalityTabsCatalog {
  const key = uf.toLowerCase();
  if (!ufs[key] && typeof process !== "undefined" && process.versions?.node) {
    ufs[key] = loadNodeCatalog(key as UfKey);
  }
  return ufs[key] ?? {};
}
