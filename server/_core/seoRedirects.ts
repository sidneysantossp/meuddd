/* Redirects permanentes (301) para preservar autoridade de SEO de URLs
   herdadas do Google: formato antigo sem UF, nome de estado no lugar da
   sigla, /index.html, rotas antigas do gerador e conteúdos editoriais
   migrados de /blog para /guia. */
import type { Express } from "express";
import { editorialGuides } from "../../shared/editorialGuides";
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
const EDITORIAL_GUIDE_SLUGS = new Set(editorialGuides.map(guide => guide.slug));

/* O formato histórico /cidade/<slug> perde a UF. Alguns nomes existem em
   mais de um estado. Só mantemos override quando o GSC histórico identifica
   inequivocamente qual entidade a URL antiga representava. Sem evidência,
   um slug duplicado não deve ser 301 para a primeira ocorrência do dataset. */
const LEGACY_CITY_SLUG_OVERRIDES: Record<string, string> = {
  cascavel: "CE",
  "campo-grande": "MS",
  valenca: "BA",
};

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

function requestQuerySuffix(url: string): string {
  return url.includes("?") ? url.slice(url.indexOf("?")) : "";
}

/* Lookup offline por slug de município. Slugs nacionais únicos são seguros.
   Slugs duplicados só são resolvidos quando há override histórico validado;
   caso contrário devolvemos null para impedir consolidação de autoridade na
   cidade errada. */
function findMunicipalityBySlug(slug: string): {
  uf: string;
  slug: string;
} | null {
  const matches = staticTerritory.filter(
    (row: StaticMunicipalityRecord) => row.slug === slug
  );
  if (matches.length === 0) return null;

  const historicalUf = LEGACY_CITY_SLUG_OVERRIDES[slug];
  if (historicalUf) {
    const historicalMatch = matches.find(row => row.uf === historicalUf);
    if (historicalMatch?.slug) {
      return { uf: historicalMatch.uf, slug: historicalMatch.slug };
    }
  }

  if (matches.length !== 1) return null;
  const [found] = matches;
  if (!found.slug) return null;
  return { uf: found.uf, slug: found.slug };
}

export function registerSeoRedirects(app: Express): void {
  app.get(["/index.html", "/index.htm"], (req, res) => {
    res.redirect(301, "/");
  });

  /* URL que concentrou tráfego orgânico antes da migração. A ferramenta
     equivalente continua publicada em /gerador, portanto a transferência de
     sinais deve ser permanente e 1:1. */
  app.get("/gerador-numeros", (req, res) => {
    res.redirect(301, `/gerador${requestQuerySuffix(req.url)}`);
  });

  /* As antigas rotas de validação eram usadas por buscas de consulta de DDD.
     A funcionalidade equivalente hoje vive na busca principal da home. */
  app.get(["/validar", "/validar-ddd"], (req, res) => {
    res.redirect(301, `/${requestQuerySuffix(req.url)}`);
  });

  /* A arquitetura antiga usava o nome completo do estado na URL
     (/estado/sao-paulo, /estado/tocantins...). A atual usa a UF. */
  app.get("/estado/:state", (req, res, next) => {
    const segment = req.params.state;
    if (!segment || isLikelyUf(segment)) return next();
    const uf = STATE_NAME_TO_UF[normalizeKey(segment)];
    if (!uf) return next();
    return res.redirect(
      301,
      `/estado/${uf.toLowerCase()}${requestQuerySuffix(req.url)}`
    );
  });

  app.get("/blog", (req, res) => {
    res.redirect(301, `/guias${requestQuerySuffix(req.url)}`);
  });

  app.get("/blog/*", (req, res) => {
    const legacyPath = req.path.replace(/^\/blog\/+/, "");
    /* Conteúdo editorial real que mudou apenas de estrutura mantém 301 1:1. */
    if (!legacyPath.includes("/") && EDITORIAL_GUIDE_SLUGS.has(legacyPath)) {
      return res.redirect(
        301,
        `/guia/${legacyPath}${requestQuerySuffix(req.url)}`
      );
    }
    /* Milhares de URLs programáticas antigas de internet/fibra não possuem
       equivalente semântico na plataforma atual. Redirecioná-las em massa
       para /guias cria soft-404 e mistura sinais. 410 explicita a remoção. */
    return res.status(410).type("text/plain").send("Gone");
  });

  /* /cidade/<segmento-1> e /cidade/<segmento-1>/<segmento-2> */
  app.get("/cidade/:a", (req, res) => {
    const segment = req.params.a;
    if (!segment) return res.status(404).type("text/plain").send("Not found");
    /* URL literal /cidade/undefined vinda de bug client antigo → 404 normal. */
    if (segment === "undefined")
      return res.status(404).type("text/plain").send("Not found");
    const resolved = findMunicipalityBySlug(segment);
    if (!resolved)
      return res.status(404).type("text/plain").send("Not found");
    const target = `/cidade/${resolved.uf.toLowerCase()}/${resolved.slug}`;
    return res.redirect(301, `${target}${requestQuerySuffix(req.url)}`);
  });

  app.get("/cidade/:a/:b", (req, res, next) => {
    const first = req.params.a;
    const slug = req.params.b;
    if (!first || !slug) return next();
    /* /cidade/undefined/<slug>: bug client antigo. Só redirecionamos quando
       o slug resolve de modo seguro; ambiguidades não podem herdar a primeira
       cidade encontrada no catálogo. */
    if (first === "undefined") {
      const resolved = findMunicipalityBySlug(slug);
      if (resolved) {
        const query = requestQuerySuffix(req.url);
        return res.redirect(
          301,
          `/cidade/${resolved.uf.toLowerCase()}/${resolved.slug}${query}`
        );
      }
      return res.status(404).type("text/plain").send("Not found");
    }
    if (slug === "undefined")
      return res.status(404).type("text/plain").send("Not found");
    /* Se o primeiro segmento é um nome de estado, usar a UF correspondente. */
    const ufFromName = STATE_NAME_TO_UF[normalizeKey(first)];
    if (ufFromName && !isLikelyUf(first)) {
      const target = `/cidade/${ufFromName.toLowerCase()}/${slug}`;
      const query = requestQuerySuffix(req.url);
      return res.redirect(301, `${target}${query}`);
    }
    /* DF: verificar se o slug corresponde a um município real (só Brasília).
       Regiões administrativas (taguatinga, ceilândia, gama, etc.) não são
       municípios IBGE — redirect para a página do estado. */
    if (first.toUpperCase() === "DF") {
      const isRealMunicipality = staticTerritory.some(
        (row: StaticMunicipalityRecord) =>
          row.uf === "DF" && row.slug === slug
      );
      if (!isRealMunicipality) {
        const query = requestQuerySuffix(req.url);
        return res.redirect(301, `/estado/df${query}`);
      }
      /* Município real do DF (Brasília) → seguir para SSR. */
      return next();
    }

    /* UF válida → /cidade/<UF>/<slug> segue para o SSR renderizar a página. */
    if (isLikelyUf(first)) return next();
    /* Primeiro segmento inválido → 404. */
    return res.status(404).type("text/plain").send("Not found");
  });
}
