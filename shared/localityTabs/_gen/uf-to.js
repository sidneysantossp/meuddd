// Wrapper gerado por scripts/generateUfWrappers.mjs — não editar à mão.
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const requireUf = createRequire(import.meta.url);
const base = path.resolve(import.meta.dirname, "..", "..");
const candidates = [
  path.resolve(base, "dist", "server", "tabs", "to.cjs"),
  path.resolve(base, "dist", "server", "tabs", "to.js"),
  path.resolve(base, "shared", "localityTabs", "to.ts"),
];

function loadCatalog() {
  for (const candidate of candidates) {
    try {
      const mod = requireUf(candidate);
      const catalog = mod?.catalog ?? mod?.default?.catalog ?? mod?.default ?? null;
      if (catalog) return catalog;
    } catch { /* tentar próximo candidato */ }
  }
  return {};
}

let cached = null;
export function getUfCatalog() {
  if (cached) return cached;
  cached = loadCatalog();
  return cached;
};
