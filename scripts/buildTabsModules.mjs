// Compilar os 27 módulos UF do catálogo editorial (shared/localityTabs/*.ts)
// para dist/server/tabs/*.cjs (CJS, sem bundle) — o bundle SSR carrega-os com
// require() de caminho construído em runtime, sem transformar os 51 MB.
//
// Também gera os wrappers de produção em dist/server/_gen/ (módulos ESM de
// ~1 KB cujo import.meta.dirname aponta para dist/server/_gen; resolvem a
// raiz do projeto com quatro níveis ".." e carregam dist/server/tabs/{uf}.cjs).
// Isto garante que o import dinâmico `./_gen/uf-{uf}.js` do bundle SSR resolva
// em produção (sem o ERR_MODULE_NOT_FOUND observado nos logs de deploy).
import { build } from "esbuild";
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const srcDir = path.join(root, "shared", "localityTabs");
const outDir = path.join(root, "dist", "server", "tabs");

const files = readdirSync(srcDir).filter((f) => /^[a-z]{2}\.ts$/.test(f));
const UF_LIST = files.map((f) => f.replace(/\.ts$/, ""));

const result = await build({
  entryPoints: files.map((f) => path.join(srcDir, f)),
  outdir: outDir,
  outExtension: { ".js": ".cjs" },
  platform: "node",
  format: "cjs",
  target: "node22",
  logLevel: "warning",
  metafile: false,
});

if (result.errors.length > 0) {
  console.error("ERRO ao compilar tabs:", result.errors);
  process.exit(1);
}

const fsOut = readdirSync(outDir).filter((f) => f.endsWith(".cjs"));
console.log(`Compilados ${fsOut.length} módulos UF em ${outDir}`);
if (fsOut.length !== files.length) {
  console.error(`Esperado ${files.length}, gerados ${fsOut.length}`);
  process.exit(1);
}

/* Gerar os wrappers de produção em dist/server/_gen/. Depth 4 porque o
   módulo vive em <raiz>/dist/server/_gen/ e resolve a raiz do projeto com
   quatro níveis "..", encontrando <raiz>/dist/server/tabs/{uf}.cjs. */
const genOut = path.join(root, "dist", "server", "_gen");
mkdirSync(genOut, { recursive: true });
for (const f of readdirSync(genOut).filter((x) => x !== "index.js")) {
  unlinkSync(path.join(genOut, f));
}
for (const uf of UF_LIST) {
  const contents = `// Wrapper gerado por scripts/buildTabsModules.mjs — não editar à mão.
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const requireUf = createRequire(import.meta.url);
const base = path.resolve(import.meta.dirname, "..", "..", "..", "..");
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
}
`;
  writeFileSync(path.join(genOut, `uf-${uf}.js`), contents);
}
writeFileSync(
  path.join(genOut, "index.js"),
  `// Wrapper index gerado por scripts/buildTabsModules.mjs — não editar à mão.
${UF_LIST.map((uf) => `import * as uf_${uf} from "./uf-${uf}.js";`).join("\n")}

export const ufModules = {
  ${UF_LIST.map((uf) => `"${uf}": uf_${uf},`).join("\n  ")}
};
export default ufModules;
`
);
console.log(`Gerados ${UF_LIST.length} wrappers de produção em ${genOut}`);
