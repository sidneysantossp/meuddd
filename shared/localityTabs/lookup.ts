/* Acesso fiável ao catálogo de tabs editorial por município.
   O carregamento dos 27 catálogos estaduais é feito de forma lazy para que
   o transform do vite (dev, SSR e vitest) nunca tenha de processar 51 MB de
   dados de uma só vez:
   - em node (tsx dev / produção SSR com módulos compilados): `require()` dos
     ficheiros UF compilados, sem passar pelo vite;
   - no browser: dynamic import com specifier construído em runtime, que o
     rollup não pré-resolve. */
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
] as const;

type UfKey = (typeof UF_LIST)[number];

let _nodeCatalogs: Record<string, LocalityTabsCatalog | undefined> | null = null;

function requireNode(): NodeRequire {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require as NodeRequire;
  } catch {
    throw new Error("[localityTabs] require indisponível neste runtime");
  }
}

/** Carrega em node via require() dos módulos UF compilados (ou .ts via tsx). */
function loadNodeCatalogs(): Record<string, LocalityTabsCatalog | undefined> {
  if (_nodeCatalogs) return _nodeCatalogs;
  const catalogs: Record<string, LocalityTabsCatalog | undefined> = {};
  const req = requireNode();
  for (const uf of UF_LIST) {
    const candidates = [
      `${__dirname}/tabs/${uf}.cjs`,
      `${__dirname}/tabs/${uf}.js`,
      `${__dirname}/${uf}.ts`,
      `${__dirname}/${uf}.js`,
    ];
    let loaded: { catalog: LocalityTabsCatalog } | undefined;
    for (const candidate of candidates) {
      try {
        const maybe = req(candidate);
        loaded = maybe?.default ?? maybe;
        if (loaded?.catalog) break;
        loaded = undefined;
      } catch {
        loaded = undefined;
      }
    }
    catalogs[uf] = loaded?.catalog;
  }
  _nodeCatalogs = catalogs;
  return catalogs;
}

// Cache de promises de dynamic import no browser (evita re-fetch).
const _browserCache: Record<string, Promise<LocalityTabsCatalog>> = {};

function loadBrowserCatalog(uf: UfKey): Promise<LocalityTabsCatalog> {
  const existing = _browserCache[uf];
  if (existing) return existing;
  const promise = (
    import(/* @vite-ignore */ `./${uf}.ts`) as Promise<{ catalog: LocalityTabsCatalog }>
  ).then(mod => mod.catalog);
  _browserCache[uf] = promise;
  return promise;
}

const ufs: Record<string, LocalityTabsCatalog | undefined> = {};

function loadSyncIfNeeded(uf: string): void {
  if (ufs[uf]) return;
  if (typeof process !== "undefined" && process.versions?.node) {
    ufs[uf] = loadNodeCatalogs()[uf.toLowerCase()];
  } else {
    ufs[uf] = undefined;
  }
}

/** Obter as tabs editoriais de um município (síncrono no servidor, undefined no browser sem load prévio). */
export function getMunicipalityTabsByUf(
  uf: string,
  slug: string
): MunicipalityTabs | undefined {
  const key = uf.toLowerCase();
  loadSyncIfNeeded(key);
  return ufs[key]?.[slug.toLowerCase()];
}

/** Carrega o catálogo de um estado no browser (assíncrono); no servidor é síncrono. */
export async function loadMunicipalityTabsCatalog(
  uf: string
): Promise<LocalityTabsCatalog> {
  const key = uf.toLowerCase();
  if (!ufs[key]) {
    if (typeof process !== "undefined" && process.versions?.node) {
      ufs[key] = loadNodeCatalogs()[key];
    } else {
      ufs[key] = await loadBrowserCatalog(key as UfKey);
    }
  }
  return ufs[key] ?? {};
}

export function getMunicipalityTabsUfCatalog(uf: string): LocalityTabsCatalog {
  loadSyncIfNeeded(uf.toLowerCase());
  return ufs[uf.toLowerCase()] ?? {};
}
