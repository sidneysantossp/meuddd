/* Snapshot da cobertura editorial: conta quantos municípios já têm fichas
   integradas em shared/localityTabs (por UF) a partir dos catálogos JSON.
   Usado pelo dashboard de inteligência em /admin e por monitorizações. */
import fs from "node:fs";
import path from "node:path";

const TABS_DIR = path.resolve(import.meta.dirname, "../.generated/tabs");

export function getCount() {
  if (!fs.existsSync(TABS_DIR)) return 0;
  let total = 0;
  const byUf = {};
  for (const file of fs.readdirSync(TABS_DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const catalog = JSON.parse(
        fs.readFileSync(path.join(TABS_DIR, file), "utf-8")
      );
      let n = 0;
      for (const entry of Object.values(catalog)) {
        const e = entry;
        if (Array.isArray(e?.tourism?.items) && e.tourism.items.length > 0) n++;
      }
      total += n;
      byUf[file.replace(".json", "")] = n;
    } catch {
      // ficheiro inválido é ignorado na contagem
    }
  }
  return total;
}

export function getByUf() {
  if (!fs.existsSync(TABS_DIR)) return {};
  const out = {};
  for (const file of fs.readdirSync(TABS_DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const catalog = JSON.parse(
        fs.readFileSync(path.join(TABS_DIR, file), "utf-8")
      );
      let n = 0;
      for (const entry of Object.values(catalog)) {
        const e = entry;
        if (Array.isArray(e?.tourism?.items) && e.tourism.items.length > 0) n++;
      }
      out[file.replace(".json", "")] = n;
    } catch {
      out[file.replace(".json", "")] = 0;
    }
  }
  return out;
}
