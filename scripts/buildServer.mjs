/* Build do servidor Express (bundle Express + handler Vercel).
   Os catálogos UF são carregados por wrappers lazy em
   shared/localityTabs/_gen/ (módulos de ~1 KB que só lêem os .cjs
   compilados via createRequire em runtime) — o bundle nunca inline os
   51 MB do catálogo editorial, mantendo o processo abaixo do limite
   de 512 MiB da plataforma de deploy.

   Uso: node scripts/buildServer.mjs */
import { build } from "esbuild";

await build({
  entryPoints: ["server/_core/index.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outdir: "dist",
});
await build({
  entryPoints: ["server/vercel.handler.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outfile: "dist/vercel/handler.js",
});
console.log("server bundle OK");
