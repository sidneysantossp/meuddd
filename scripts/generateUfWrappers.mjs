/* Gera wrappers ESM estáticos por UF em shared/localityTabs/_gen/ (e,
   opcionalmente, numa cópia de produção via --out-dir=<raiz>) para
   dist/server/_gen/. Cada wrapper (uf-{uf}.js) carrega o catálogo
   compilado do município (dist/server/tabs/{uf}.cjs em produção;
   shared/localityTabs/{uf}.ts como reserva em tsx/dev) através de
   createRequire(import.meta.url), com cache partilhado pelo require
   cache do Node.

   Isto evita que o esbuild (vite build --ssr e bundle Express) resolva
   os glob imports dinâmicos e inline os 51+ MB do catálogo editorial,
   o que fazia o processo de deploy ultrapassar 512 MiB.

   Uso: node scripts/generateUfWrappers.mjs [--out-dir=<raiz>]
   Executa também no `build` antes do vite build --ssr. */
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const genDir = path.join(projectRoot, "shared", "localityTabs", "_gen");

/* --out-dir=<raiz>: escreve também uma variante do wrapper cujo
   import.meta.dirname aponta para <raiz>/dist/server/_gen, ajustando
   o número de níveis ".." para resolver a raiz do projeto. */
const outArg = process.argv.find((a) => a.startsWith("--out-dir="));
const outRoot = outArg ? outArg.split("=")[1] : null;
const extraDirs = [];
if (outRoot) {
  const outGenDir = path.join(outRoot, "dist", "server", "_gen");
  fs.mkdirSync(outGenDir, { recursive: true });
  if (fs.existsSync(outGenDir)) {
    for (const f of fs.readdirSync(outGenDir)) fs.unlinkSync(path.join(outGenDir, f));
  }
  extraDirs.push({ dir: outGenDir, depth: 4 });
}

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
];

if (fs.existsSync(genDir)) {
  for (const f of fs.readdirSync(genDir)) fs.unlinkSync(path.join(genDir, f));
} else {
  fs.mkdirSync(genDir, { recursive: true });
}
function wrapperContents(uf, depth) {
  const ups = Array.from({ length: depth }, () => "\"..\"").join(", ");
  return `// Wrapper gerado por scripts/generateUfWrappers.mjs — não editar à mão.
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const requireUf = createRequire(import.meta.url);
const base = path.resolve(import.meta.dirname, ${ups});
const candidates = [
  path.resolve(base, "dist", "server", "tabs", "${uf}.cjs"),
  path.resolve(base, "dist", "server", "tabs", "${uf}.js"),
  path.resolve(base, "shared", "localityTabs", "${uf}.ts"),
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
`;
}

for (const uf of UF_LIST) {
  fs.writeFileSync(path.join(genDir, `uf-${uf}.js`), wrapperContents(uf, 2));
  for (const { dir, depth } of extraDirs) {
    fs.writeFileSync(path.join(dir, `uf-${uf}.js`), wrapperContents(uf, depth));
  }
}

const indexContents = (rel, depth) => {
  const imports = UF_LIST.map(uf => `import * as uf_${uf} from "${rel}/uf-${uf}.js";`).join("\n");
  return `// Wrapper index gerado por scripts/generateUfWrappers.mjs — não editar à mão.
${imports}

export const ufModules = {
  ${UF_LIST.map(uf => `"${uf}": uf_${uf},`).join("\n  ")}
};
export default ufModules;
`;
};

// index.js reexporta o mapa de wrappers (usado pelo loader do browser/SSR)
fs.writeFileSync(
  path.join(genDir, "index.js"),
  indexContents(".", 2)
);
for (const { dir } of extraDirs) {
  fs.writeFileSync(path.join(dir, "index.js"), indexContents(".", 4));
}

console.log(
  "Wrappers gerados: " + (UF_LIST.length + 1) + " ficheiros em " + genDir +
  (outRoot ? " (e cópia de produção em " + outRoot + "/dist/server/_gen)" : "")
);
