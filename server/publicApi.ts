import express from "express";
import type { Request, Response } from "express";
import type { AppRouter } from "./routers";

export type { AppRouter };
export { appRouter } from "./routers";

/**
 * API pública REST de consulta DDD — aberta a desenvolvedores, assistentes de
 * IA e agentes de busca generativa. Apenas GET, idempotente, com rate limit
 * leve por IP e CORS de leitura.
 */

// ---------- rate limit simples por IP (memória; reabastece a cada 60s) -----
interface Bucket {
  tokens: number;
  lastRefill: number;
}
const buckets = new Map<string, Bucket>();
const BUCKET_CAPACITY = 60;
const REFILL_INTERVAL_MS = 60_000;

function consumeBucket(ip: string): boolean {
  let bucket = buckets.get(ip);
  const now = Date.now();
  if (!bucket || now - bucket.lastRefill >= REFILL_INTERVAL_MS) {
    bucket = { tokens: BUCKET_CAPACITY - 1, lastRefill: now };
    buckets.set(ip, bucket);
    return true;
  }
  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    return true;
  }
  return false;
}

function clientIp(req: Request): string {
  const forwarded = req.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

function rateLimit(handler: express.RequestHandler): express.RequestHandler {
  return (req, res, next) => {
    if (!consumeBucket(clientIp(req))) {
      return res
        .status(429)
        .type("application/json")
        .send({
          error: "rate_limit_exceeded",
          message:
            "Limite de 60 pedidos por minuto excedido. Aguarde e tente novamente.",
        });
    }
    return handler(req, res, next);
  };
}

// ---------- helpers de resposta -------------------------------------------
function notFound(res: Response, message: string) {
  return res
    .status(404)
    .type("application/json")
    .send({ error: "not_found", message });
}

function jsonOk(res: Response, payload: unknown) {
  return res.type("application/json").send(payload);
}

// ---------- dependências do db --------------------------------------------
import {
  getDddDetails,
  getStateDetails,
  getMunicipalityDetails,
  listStateSummaries,
  selectMunicipalities,
  groupDddRows,
} from "./db";

/** Lista de todos os DDDs com estado/região — deriva do mesmo dataset dos
 *  detalhes para manter coerência com a UI. */
async function listAllDdds() {
  const rows = await selectMunicipalities({});
  const seen = new Set<string>();
  const entries: {
    code: string;
    state: string;
    uf: string;
    region: string;
    cityCount: number;
  }[] = [];
  for (const row of rows) {
    if (seen.has(row.ddd)) continue;
    seen.add(row.ddd);
    entries.push({
      code: row.ddd,
      state: row.stateName,
      uf: row.uf,
      region: row.region,
      cityCount: rows.filter(item => item.ddd === row.ddd).length,
    });
  }
  return entries.sort((left, right) => Number(left.code) - Number(right.code));
}

/** Resumo dos 27 estados com contagem de cidades. */
async function listAllStates() {
  const summaries = await listStateSummaries();
  return summaries.map(summary => ({
    name: summary.name,
    uf: summary.uf,
    region: summary.region,
    cityCount: summary.cityCount,
    dddCount: summary.dddCount,
    populationEstimated: summary.populationEstimated,
    populationReferenceYear: summary.populationReferenceYear,
  }));
}

/** Hubs regionais com estados e DDDs. */
async function listRegionHubs() {
  const { regionHubs } = await import("../shared/territorialSeo");
  return regionHubs;
}

// ---------- rotas ---------------------------------------------------------
export function registerPublicApi(app: express.Express): void {
  const prefix = "/api/public";

  // CORS de leitura para qualquer origem (API só GET)
  app.options(`${prefix}/*`, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).end();
  });

  // GET /api/public/ddds — lista todos os DDDs com estado e região
  app.get(
    `${prefix}/ddds`,
    rateLimit(async (_req, res) => {
      const entries = await listAllDdds().catch(() => null);
      if (!entries) {
        return notFound(res, "Dados temporariamente indisponíveis.");
      }
      return jsonOk(res, { count: entries.length, ddds: entries });
    }),
  );

  // GET /api/public/ddds/:code — detalhes de um DDD com municípios
  app.get(
    `${prefix}/ddds/:code`,
    rateLimit(async (req, res) => {
      const code = String(req.params.code);
      if (!/^\d{2}$/.test(code)) {
        return notFound(res, `Código DDD inválido: ${code}.`);
      }
      const details = await getDddDetails(code).catch(() => null);
      if (!details) return notFound(res, `Nenhum DDD encontrado: ${code}.`);
      return jsonOk(res, details);
    }),
  );

  // GET /api/public/estados — resumo dos 27 estados
  app.get(
    `${prefix}/estados`,
    rateLimit(async (_req, res) => {
      const entries = await listAllStates().catch(() => null);
      if (!entries) {
        return notFound(res, "Dados temporariamente indisponíveis.");
      }
      return jsonOk(res, { count: entries.length, states: entries });
    }),
  );

  // GET /api/public/estados/:uf — detalhes do estado com DDDs e municípios
  app.get(
    `${prefix}/estados/:uf`,
    rateLimit(async (req, res) => {
      const uf = String(req.params.uf).toUpperCase();
      if (!/^[A-Z]{2}$/.test(uf)) {
        return notFound(res, `UF inválida: ${uf}.`);
      }
      const details = await getStateDetails(uf).catch(() => null);
      if (!details) return notFound(res, `Nenhum estado encontrado: ${uf}.`);
      return jsonOk(res, details);
    }),
  );

  // GET /api/public/cidade/:uf/:slug — detalhes de uma cidade
  app.get(
    `${prefix}/cidade/:uf/:slug`,
    rateLimit(async (req, res) => {
      const uf = String(req.params.uf).toUpperCase();
      const slug = String(req.params.slug);
      if (!/^[A-Z]{2}$/.test(uf) || slug.length < 1 || slug.length > 160) {
        return notFound(res, "Parâmetros inválidos.");
      }
      const details = await getMunicipalityDetails(uf, slug).catch(() => null);
      if (!details) {
        return notFound(res, `Nenhuma cidade encontrada: ${uf}/${slug}.`);
      }
      return jsonOk(res, details);
    }),
  );

  // GET /api/public/regioes — hubs regionais com estados
  app.get(
    `${prefix}/regioes`,
    rateLimit(async (_req, res) => {
      const hubs = await listRegionHubs().catch(() => null);
      if (!hubs) return notFound(res, "Dados temporariamente indisponíveis.");
      return jsonOk(res, { count: hubs.length, regions: hubs });
    }),
  );
}
