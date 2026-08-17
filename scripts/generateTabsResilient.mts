/**
 * Re-tentativa resiliente da geração de tabs editoriais.
 *
 * Comportamento:
 * - Carrega o catálogo existente por UF (.generated/tabs/{uf}.json) e os logs de OK/FAIL.
 * - Só tenta (re)gerar municípios que: (a) não têm ficha completa, OU (b) falharam
 *   na última execução (FAIL sem OK posterior).
 * - Executa uma UF de cada vez; dentro da UF, CONC=3 como no script original.
 * - Quando um lote inteiro falha com 412 (quota esgotada), espera QUOTA_WAIT_MS
 *   e volta a tentar, com MAX_QUOTA_WAITS tentativas.
 *
 * Uso: pnpm tsx scripts/generateTabsResilient.mts --uf=ac
 */
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import { invokeLLM } from "../server/_core/llm";

const OUT_DIR = path.resolve(import.meta.dirname, "../.generated/tabs");
const REVIEWED_ON = new Date().toISOString().slice(0, 10);
const QUOTA_WAIT_MS = 5 * 60 * 1000; // espera de 5 min quando quota esgotar
const MAX_QUOTA_WAITS = 12; // até 1h de espera total
const MAX_PER_FAIL = 4; // retries por município antes de marcar como pendente

function normalizeSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\u0301/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
const MAP_SEARCH = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function cleanArtifacts(s: string) {
  if (typeof s !== "string") return "";
  return s
    .replace(/\*\*/g, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/(—|–)\s*(Fonte|Ver mais).{0,80}/gi, "")
    .trim();
}

function loadDone(): Set<string> {
  const done = new Set<string>();
  if (!fs.existsSync(OUT_DIR)) return done;
  for (const entry of fs.readdirSync(OUT_DIR)) {
    if (entry.endsWith(".log")) {
      for (const line of fs
        .readFileSync(path.join(OUT_DIR, entry), "utf-8")
        .split("\n")) {
        const m = line.match(/^OK ([A-Z]{2}:.+)$/);
        if (m) done.add(m[1]);
      }
    }
  }
  return done;
}
function appendLog(uf: string, msg: string) {
  fs.appendFileSync(
    path.join(OUT_DIR, `${uf}.log`),
    `${new Date().toISOString()} ${msg}\n`
  );
}

const PROMPT = (r: any) =>
  `Escreva um guia editorial factual e sóbrio sobre o município brasileiro de ${r.name} (${r.stateUf}), com base em dados públicos conhecidos (IBGE, prefeitura, sites oficiais de turismo). Retorne JSON com as secções "tourism" (3 a 5 pontos turísticos reais com nome, descrição curta e ano de fundação/importância quando relevante), "dining" (3 a 5 bares e restaurantes típicos ou conhecidos da cidade), "transport" (3 a 5 itens de transporte público/rodoviária/terminal) e "climate" (clima da região com classificação de Köppen correta para a cidade, temperatura média anual, precipitação e estações). Textos em pt-BR, sem links externos, sem markdown. Se algum dado for incerto, use descrição genérica segura. População de referência: ${r.populationEstimated}.`;

const SCHEMA = {
  type: "object",
  properties: {
    tourism: {
      type: "object",
      properties: {
        intro: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
            },
            required: ["name", "description"],
            additionalProperties: false,
          },
        },
        closing: { type: "string" },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    dining: {
      type: "object",
      properties: {
        intro: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
            },
            required: ["name", "description"],
            additionalProperties: false,
          },
        },
        closing: { type: "string" },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    transport: {
      type: "object",
      properties: {
        intro: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
            },
            required: ["name", "description"],
            additionalProperties: false,
          },
        },
        closing: { type: "string" },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    climate: {
      type: "object",
      properties: {
        intro: { type: "string" },
        body: { type: "string" },
        details: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              value: { type: "string" },
            },
            required: ["label", "value"],
            additionalProperties: false,
          },
        },
      },
      required: ["intro", "body", "details"],
      additionalProperties: false,
    },
  },
  required: ["tourism", "dining", "transport", "climate"],
  additionalProperties: false,
};

async function fetchPending(uf: string) {
  const pool = mysql.createPool(process.env.DATABASE_URL!);
  try {
    const [rows] = await pool.execute(
      `SELECT m.ibgeCode, m.name, m.slug, m.ddd, m.populationEstimated,
              s.uf AS stateUf, s.name AS stateName, s.region
       FROM municipalities m
       INNER JOIN states s ON s.ibgeCode = m.stateIbgeCode
       WHERE s.uf = ?
       ORDER BY m.name ASC`,
      [uf.toUpperCase()]
    );
    return (rows as any[]).map(r => ({
      ibgeCode: r.ibgeCode,
      name: r.name,
      slug: r.slug,
      ddd: r.ddd,
      populationEstimated: r.populationEstimated,
      stateUf: r.stateUf,
      stateName: r.stateName,
      region: r.region,
    }));
  } finally {
    await pool.end();
  }
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL ausente");
  const args = process.argv.slice(2);
  const ufArg = args.find(a => a.startsWith("--uf="))?.split("=")[1];
  if (!ufArg) throw new Error("usar --uf=<UF>");
  const uf = ufArg.toLowerCase();
  const done = loadDone();

  const file = path.join(OUT_DIR, `${uf}.json`);
  const catalog = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf-8"))
    : {};

  const all = await fetchPending(uf);
  const work = all.filter(r => {
    const key = `${r.stateUf}:${r.slug}`;
    if (done.has(key) && catalog[key]?.tourism?.items?.length) return false;
    return true;
  });
  console.log(`[${uf}] ${work.length} municípios pendentes de ${all.length}`);
  if (!work.length) {
    console.log(`[${uf}] concluído.`);
    return;
  }

  const CONC = 3;
  let completed = 0;
  let failed = 0;
  let quotaWaits = 0;

  const chunks: any[][] = [];
  for (let i = 0; i < work.length; i += CONC)
    chunks.push(work.slice(i, i + CONC));

  for (const batch of chunks) {
    const results = await Promise.all(
      batch.map(async (r: any) => {
        const slug = r.slug ?? normalizeSlug(r.name);
        const key = `${r.stateUf}:${slug}`;
        for (let attempt = 0; attempt < MAX_PER_FAIL; attempt++) {
          try {
            const res = (await invokeLLM({
              model: "gpt-5-nano",
              messages: [
                {
                  role: "system",
                  content:
                    "Você escreve guias editoriais factuais e sóbrios sobre municípios brasileiros, retornando JSON estruturado.",
                },
                { role: "user", content: PROMPT(r) },
              ],
              response_format: {
                type: "json_schema",
                json_schema: {
                  name: "locality_tabs",
                  strict: true,
                  schema: SCHEMA,
                },
              },
            })) as any;
            const content = res?.choices?.[0]?.message?.content;
            if (!content) throw new Error("resposta vazia");
            const parsed = JSON.parse(
              typeof content === "string" ? content : String(content)
            );
            for (const sec of ["tourism", "dining", "transport"]) {
              if (parsed[sec]?.intro)
                parsed[sec].intro = cleanArtifacts(parsed[sec].intro);
              if (parsed[sec]?.closing)
                parsed[sec].closing = cleanArtifacts(parsed[sec].closing);
              for (const item of parsed[sec]?.items ?? [])
                item.description = cleanArtifacts(item.description ?? "");
            }
            if (parsed.climate?.intro)
              parsed.climate.intro = cleanArtifacts(parsed.climate.intro);
            if (parsed.climate?.body)
              parsed.climate.body = cleanArtifacts(parsed.climate.body);
            for (const d of parsed.climate?.details ?? []) {
              d.label = cleanArtifacts(d.label);
              d.value = cleanArtifacts(d.value);
            }
            catalog[key] = {
              ...parsed,
              city: r.name,
              uf: r.stateUf,
              stateName: r.stateName,
              region: r.region,
              ddd: String(r.ddd),
              population: r.populationEstimated,
              reviewedOn: REVIEWED_ON,
            };
            for (const item of catalog[key].tourism.items)
              item.mapHref = MAP_SEARCH(
                `${item.name}, ${r.name}, ${r.stateUf}`
              );
            for (const item of catalog[key].dining.items)
              item.mapHref = MAP_SEARCH(
                `${item.name}, ${r.name}, ${r.stateUf}`
              );
            for (const item of catalog[key].transport.items)
              item.mapHref = MAP_SEARCH(
                `${item.name}, ${r.name}, ${r.stateUf}`
              );
            fs.writeFileSync(file, JSON.stringify(catalog, null, 2) + "\n");
            appendLog(uf, `OK ${key}`);
            return { key, ok: true };
          } catch (e: any) {
            const msg = String(e?.message ?? e);
            const isQuota = /412|usage exhausted|quota/i.test(msg);
            appendLog(uf, `FAIL ${key}: ${msg.slice(0, 120)}`);
            if (isQuota) return { key, ok: false, quota: true };
            if (attempt === MAX_PER_FAIL - 1)
              return { key, ok: false, quota: false };
            await new Promise(res => setTimeout(res, 3000 * (attempt + 1)));
          }
        }
        return { key, ok: false, quota: false };
      })
    );
    for (const res of results) {
      if (res.ok) completed++;
      else failed++;
    }
    const quotaHit = results.some(r => r.quota);
    if (quotaHit && quotaWaits < MAX_QUOTA_WAITS) {
      quotaWaits++;
      console.log(
        `[${uf}] quota esgotada; aguardando ${QUOTA_WAIT_MS / 60000} min (${quotaWaits}/${MAX_QUOTA_WAITS})...`
      );
      await new Promise(res => setTimeout(res, QUOTA_WAIT_MS));
    }
  }
  console.log(
    `[${uf}] Concluído. ${completed} fichas geradas, ${failed} falhas.`
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
