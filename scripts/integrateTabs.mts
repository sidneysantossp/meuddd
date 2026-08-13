/* Converte os catálogos JSON gerados em .generated/tabs/<uf>.json
   nos módulos TypeScript partilhados em shared/localityTabs/<uf>.ts,
   que alimentam o SSR (prefetch) e o componente MunicipalityTabs. */
import fs from "node:fs";
import path from "node:path";

const GEN_DIR = path.resolve(import.meta.dirname, "../../ddd-brasil/.generated/tabs");
const OUT_DIR = path.resolve(import.meta.dirname, "../../ddd-brasil/shared/localityTabs");

const UFS = ["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"];

function toTs(value: unknown, indent = 2): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const inner = value.map(v => " ".repeat(indent) + toTs(v, indent + 2)).join(",\n");
    return `[\n${inner},\n${" ".repeat(indent - 2)}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return "{}";
    const inner = entries.map(([k, v]) => " ".repeat(indent) + (JSON.stringify(k)) + ": " + toTs(v, indent + 2)).join(",\n");
    return `{\n${inner},\n${" ".repeat(indent - 2)}}`;
  }
  return String(value);
}

const header = `/* Catálogo editorial gerado — NÃO EDITAR manualmente.
   Fonte: .generated/tabs/<uf>.json (regerar com pnpm tsx scripts/generateTabs.mts e depois pnpm tsx scripts/integrateTabs.mts) */
// @ts-nocheck
import type { MunicipalityTabs } from "./types";
export const catalog: Record<string, MunicipalityTabs> = `;

let total = 0;
let missing = 0;
for (const uf of UFS) {
  const gen = path.join(GEN_DIR, `${uf}.json`);
  const out = path.join(OUT_DIR, `${uf}.ts`);
  if (!fs.existsSync(gen)) { missing++; continue; }
  const catalog = JSON.parse(fs.readFileSync(gen, "utf-8"));
  const normalized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(catalog)) {
    const [, slug] = key.split(":");
    normalized[slug] = value;
  }
  const ts = header + toTs(normalized) + " as Record<string, MunicipalityTabs>;\n";
  fs.writeFileSync(out, ts);
  total += Object.keys(normalized).length;
  console.log(`${uf.toUpperCase()}: ${Object.keys(normalized).length} municípios → ${uf}.ts`);
}
console.log(`\nTotal integrado: ${total} municípios. UFs sem dados: ${missing}.`);
