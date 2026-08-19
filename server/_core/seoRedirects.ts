/* Redirects permanentes (301) para preservar autoridade de SEO de URLs
   herdadas do Google: formato antigo sem UF, nome de estado no lugar da
   sigla, /index.html e /blog/* (conteúdo real vive em /guia e /guias). */
import type { Express } from "express";
import type { StaticMunicipalityRecord } from "../territoryFallback";
import { staticTerritory } from "../territoryFallback";

/* Nomes de estado (com e sem acento, maiúsculas/minúsculas) → UF. */
const STATE_NAME_TO_UF: Record<string, string> = {
  acre: "AC",
  ac: "AC",
  alagoas: "AL",
  al: "AL",
  amapa: "AP",
  ap: "AP",
  amazonas: "AM",
  am: "AM",
  bahia: "BA",
  ba: "BA",
  ceara: "CE",
  "ceará": "CE",
  ce: "CE",
  "distrito federal": "DF",
  df: "DF",
  "espirito santo": "ES",
  "espírito santo": "ES",
  es: "ES",
  goias: "GO",
  goiás: "GO",
  go: "GO",
  maranhao: "MA",
  maranhão: "MA",
  ma: "MA",
  "mato grosso": "MT",
  mt: "MT",
  "mato grosso do sul": "MS",
  ms: "MS",
  "minas gerais": "MG",
  "minas-gerais": "MG",
  mg: "MG",
  para: "PA",
  pa: "PA",
  paraiba: "PB",
  paraíba: "PB",
  pb: "PB",
  parana: "PR",
  paraná: "PR",
  pr: "PR",
  pernambuco: "PE",
  pe: "PE",
  piaui: "PI",
  piauí: "PI",
  pi: "PI",
  "rio de janeiro": "RJ",
  rj: "RJ",
  "rio grande do norte": "RN",
  rn: "RN",
  "rio grande do sul": "RS",
  rs: "RS",
  rondonia: "RO",
  rondônia: "RO",
  ro: "RO",
  roraima: "RR",
  rr: "RR",
  "santa catarina": "SC",
  sc: "SC",
  "sao paulo": "SP",
  "são paulo": "SP",
  sp: "SP",
  sergipe: "SE",
  se: "SE",
  tocantins: "TO",
  to: "TO",
};

const VALID_UFS = new Set(Object.values(STATE_NAME_TO_UF));

function isLikelyUf(segment: string): boolean {
  return VALID_UFS.has(segment.toUpperCase()) && segment.length === 2;
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-\s_]+/g, " ");
}

/* Lookup offline por slug de município (fallback quando a DB não está
   disponível; usado pelos redirects sem depender de runtime async). */
function findMunicipalityBySlug(slug: string): {
  uf: string;
  slug: string;
} | null {
  const found = staticTerritory.find(
    (row: StaticMunicipalityRecord) => row.slug === slug
  );
  if (!found) return null;
  return { uf: found.uf, slug: found.slug! };
}

export function registerSeoRedirects(app: Express): void {
  app.get(["/index.html", "/index.htm"], (req, res) => {
    res.redirect(301, "/");
  });

  app.get("/blog", (req, res) => {
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    res.redirect(301, `/guias${query}`);
  });

  app.get("/blog/*", (req, res) => {
    res.redirect(301, "/guias");
  });

  /* /cidade/<segmento-1> e /cidade/<segmento-1>/<segmento-2> */
  app.get("/cidade/:a", (req, res, next) => {
    const segment = req.params.a;
    if (!segment) return res.status(404).type("text/plain").send("Not found");
    /* URL literal /cidade/undefined vinda de bug client antigo → 404 normal. */
    if (segment === "undefined")
      return res.status(404).type("text/plain").send("Not found");
    const resolved = findMunicipalityBySlug(segment);
    if (!resolved)
      return res.status(404).type("text/plain").send("Not found");
    const target = `/cidade/${resolved.uf.toLowerCase()}/${resolved.slug}`;
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    res.redirect(301, `${target}${query}`);
  });

  app.get("/cidade/:a/:b", (req, res, next) => {
    const first = req.params.a;
    const slug = req.params.b;
    if (!first || !slug) return next();
    /* /cidade/undefined/<slug>: bug client antigo — redirecionar 301 para a
       página canónica /cidade/<UF>/<slug> (resolvendo a UF pelo slug). */
    if (first === "undefined") {
      const resolved = findMunicipalityBySlug(slug);
      if (resolved) {
        const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
        return res.redirect(301, `/cidade/${resolved.uf.toLowerCase()}/${resolved.slug}${query}`);
      }
      return res.status(404).type("text/plain").send("Not found");
    }
    if (slug === "undefined") return res.status(404).type("text/plain").send("Not found");
    /* Se o primeiro segmento é um nome de estado, usar a UF correspondente. */
    const ufFromName = STATE_NAME_TO_UF[normalizeKey(first)];
    if (ufFromName && !isLikelyUf(first)) {
      const target = `/cidade/${ufFromName.toLowerCase()}/${slug}`;
      const query = req.url.includes("?")
        ? req.url.slice(req.url.indexOf("?"))
        : "";
      return res.redirect(301, `${target}${query}`);
    }
    /* UF válida → /cidade/<UF>/<slug> segue para o SSR renderizar a página. */
    if (isLikelyUf(first)) return next();
    /* Primeiro segmento inválido → 404. */
    res.status(404).type("text/plain").send("Not found");
  });
}
