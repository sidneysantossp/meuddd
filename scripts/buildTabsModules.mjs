// Compilar os 27 módulos UF do catálogo editorial (shared/localityTabs/*.ts)
// para dist/server/tabs/*.js (CJS, sem bundle) — o bundle SSR carrega-os com
// require() de caminho construído em runtime, sem transformar os 51 MB.
import { build } from "esbuild";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const srcDir = path.join(root, "shared", "localityTabs");
const outDir = path.join(root, "dist", "server", "tabs");

const files = readdirSync(srcDir).filter((f) => /^[a-z]{2}\.ts$/.test(f));

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
