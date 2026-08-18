// Plugin esbuild para o bundle Express do servidor: impede que os 27
// módulos UF de shared/localityTabs/*.ts (51+ MB de catálogo editorial)
// sejam resolvidos e inline no bundle - caso contrário o processo
// ultrapassa o limite de 512 MiB da plataforma de deploy.
//
// O que faz:
// - marca como externo o import dinâmico glob dentro de
//   shared/localityTabs/index.ts e shared/localityTabs/lookup.ts;
// - substitui esses módulos por um wrapper ESM que carrega os catálogos
//   compilados em CommonJS (dist/server/tabs/*.cjs) através de
//   createRequire(import.meta.url) no momento do pedido (lazy, 1 UF de
//   cada vez, partilhado pelo require cache do Node).

const UF_LIST = [
  "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
  "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
  "se", "sp", "to",
];

function tabsExternalPlugin() {
  return {
    name: "external-tabs-ssr",
    setup(build) {
      build.onResolve({ filter: /^\.\/\*\*\/\*/ }, args => {
        // Glob import de index.ts: `import(\`./${uf}\`)`
        if (args.importer.endsWith("shared/localityTabs/index.ts")) {
          return { path: `uf-tab:${args.path}`, namespace: "uf-tab" };
        }
        return undefined;
      });

      build.onResolve({ filter: /^\.\/\*\*\/\*\.ts$/ }, args => {
        // Glob import de lookup.ts: `import(\`./${uf}.ts\`)`
        if (args.importer.endsWith("shared/localityTabs/lookup.ts")) {
          return { path: `uf-tab-ts:${args.path}`, namespace: "uf-tab" };
        }
        return undefined;
      });

      build.onLoad({ filter: /.*/, namespace: "uf-tab" }, args => {
        const ufs = UF_LIST.map(
          uf => `"${uf}": () => loadUf("${uf}")`
        ).join(",\n    ");
        const contents = `
import { createRequire } from "node:module";
import path from "node:path";
const requireUf = createRequire(import.meta.url);
const cache = new Map();
function loadUf(uf) {
  if (cache.has(uf)) return cache.get(uf);
  const candidates = [
    path.resolve(process.cwd(), "tabs", uf + ".cjs"),
    path.resolve(process.cwd(), "tabs", uf + ".js"),
    path.resolve(process.cwd(), "shared", "localityTabs", uf + ".ts"),
  ];
  let catalog = null;
  for (const candidate of candidates) {
    try {
      const mod = requireUf(candidate);
      catalog = mod?.catalog ?? mod?.default?.catalog ?? mod?.default ?? null;
      if (catalog) break;
    } catch { /* tentar próximo candidato */ }
  }
  cache.set(uf, catalog ?? {});
  return catalog ?? {};
}
export const ufModules = {
    ${ufs}
};
export default ufModules;
`;
        return { contents, loader: "js" };
      });
    },
  };
}

export default tabsExternalPlugin;
