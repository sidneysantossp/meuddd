/* Produtor de conteúdo editorial em massa para as tabs locais dos municípios.
   Usa o LLM built-in (gpt-5-nano) com resposta estruturada JSON para gerar
   fichas de turismo, gastronomia, transporte e clima por município, ancoradas
   nos dados factuais da base (nome, DDD, população, coordenadas, região).

   Uso:
     pnpm tsx scripts/generateTabs.mts                  // todas as UFs
     pnpm tsx scripts/generateTabs.mts --uf sp          // só SP
     pnpm tsx scripts/generateTabs.mts --limit 5        // piloto
     pnpm tsx scripts/generateTabs.mts --only-empty     // retoma a partir dos logs
*/
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import { invokeLLM } from "../server/_core/llm";

const OUT_DIR = path.resolve(import.meta.dirname, "../.generated/tabs");
const REVIEWED_ON = "13 de agosto de 2026";

const args = process.argv.slice(2);
const onlyUf = args.find(a => a.startsWith("--uf"))?.split("=")[1];
const limit = Number(args.find(a => a.startsWith("--limit"))?.split("=")[1] ?? 0);
const onlyEmpty = args.includes("--only-empty");

const MAP_SEARCH = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Remove artefactos de auto-correção de modelos com raciocínio (ex.: "2.1 milímetros de milímetros?; na prática...").
function cleanArtifacts(text: string): string {
  return text
    .replace(/\w{10,120}\??\s*;\s*na pr[áa]tica[^.]{0,200}\./gi, "(ver dados oficiais).")
    .replace(/\w{8,80}\??\s*; na verdade[^.]{0,200}\./gi, "(ver dados oficiais).")
    .replace(/\((?:ou seja|isto é|melhor dizendo)[^)]{0,120}\)/gi, "");
}

const SCHEMA = {
  type: "object",
  properties: {
    tourism: {
      type: "object",
      properties: {
        intro: { type: "string", description: "Introdução de 140 a 220 palavras sobre o turismo da cidade e seus arredores, com contexto geográfico e histórico breve." },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nome do ponto turístico ou atração (público, verificável ou geográfico)." },
              description: { type: "string", description: "Descrição factual de 2 a 4 frases, com contexto prático (visita, época, significado local)." },
            },
            required: ["name", "description"],
            additionalProperties: false,
          },
          minItems: 6,
          maxItems: 10,
        },
        closing: { type: "string", description: "Fecho de 1 a 2 frases com dica prática para o visitante." },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    dining: {
      type: "object",
      properties: {
        intro: { type: "string", description: "Introdução de 90 a 140 palavras sobre a gastronomia típica da região e seus hábitos alimentares locais." },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nome do tipo de prato, tradição ou local gastronômico." },
              kind: { type: "string", description: "Categoria curta, ex.: 'Prato típico', 'Mercado', 'Feira regional'." },
              description: { type: "string", description: "Descrição factual de 1 a 3 frases." },
            },
            required: ["name", "kind", "description"],
            additionalProperties: false,
          },
          minItems: 5,
          maxItems: 8,
        },
        closing: { type: "string", description: "Fecho curto com recomendação prática." },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    transport: {
      type: "object",
      properties: {
        intro: { type: "string", description: "Introdução de 80 a 120 palavras sobre como chegar à cidade e como se deslocar dentro dela (ônibus municipal, rodoviária, aeroporto, ferrovias quando existentes)." },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nome do serviço ou infraestrutura de transporte (rodoviária, aeroporto, terminal, serviço municipal)." },
              kind: { type: "string", description: "Categoria, ex.: 'Rodoviária', 'Aeroporto', 'Ônibus municipal'." },
              description: { type: "string", description: "Descrição factual de 1 a 3 frases." },
            },
            required: ["name", "kind", "description"],
            additionalProperties: false,
          },
          minItems: 3,
          maxItems: 6,
        },
        closing: { type: "string", description: "Fecho curto com dica de mobilidade urbana." },
      },
      required: ["intro", "items", "closing"],
      additionalProperties: false,
    },
    climate: {
      type: "object",
      properties: {
        intro: { type: "string", description: "Introdução de 60 a 100 palavras sobre o clima da região." },
        details: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string", description: "Rótulo curto, ex.: 'Classificação Köppen', 'Temperatura média anual'." },
              value: { type: "string", description: "Valor factual curto." },
            },
            required: ["label", "value"],
            additionalProperties: false,
          },
          minItems: 4,
          maxItems: 6,
        },
        body: { type: "string", description: "Texto de 100 a 160 palavras sobre estação chuvosa, melhor época para visitar e o que esperar do clima ao longo do ano." },
        source: { type: "object", description: "Fonte de autoridade climática: {label: \"Climate-Data.org\", href: \"https://pt.climate-data.org/america-do-sul/brasil/{uf}/<cidade-estilo-slug>/\"}." },
      },
      required: ["intro", "details", "body", "source"],
      additionalProperties: false,
    },
  },
  required: ["tourism", "dining", "transport", "climate"],
  additionalProperties: false,
};

const PROMPT = (m: any) => `Você é um redator editorial especializado em cidades brasileiras. Escreva o guia local do município de ${m.name}, no estado de ${m.stateName} (${m.stateUf}), região ${m.region} do Brasil, com DDD ${m.ddd} e população estimada de ${m.populationEstimated !== null ? new Intl.NumberFormat("pt-BR").format(m.populationEstimated as number) : "dados não divulgados"} habitantes${m.capital ? " — capital do estado" : ""}.

Regras obrigatórias:
- Use APENAS fatos reais e verificáveis sobre a cidade, a região e o estado. Não invente estabelecimentos comerciais privados com nomes específicos que não possam ser verificados; prefira locais públicos, monumentos, feiras, mercados municipais, atrações naturais e tradições regionais comprovadas.
- Não use superlativos de marketing ("o melhor", "imperdível"). Tom informativo, sóbrio e útil, em português do Brasil.
- O clima deve refletir a região real: Amazônia (equatorial, Af), Nordeste litorâneo (tropical úmido, As), Sertão (semiárido, BSh), Centro-Oeste e Sudeste de planalto (tropical, Aw), Sul (subtropical, Cfa/Cfb), serras do Sudeste (Cwb).
- Transporte: mencione a rodoviária municipal, o sistema de ônibus, o aeroporto mais próximo (o da própria cidade ou da maior cidade vizinha) e ferrovias/metropolitano apenas quando existem de fato.
- Responda em português brasileiro.
- FONTES E LINKS EXTERNOS: cite APENAS fontes governamentais (domínios *.gov.br, como prefeituras municipais/estaduais e portais federais), o IBGE (ibge.gov.br) e o Climate-Data.org (climate-data.org) para dados climáticos. NUNCA cite ou invente links de portais comerciais ou de terceiros (ex.: rome2rio, tripadvisor, climatempo, sinart, weatherspark, wikipedia, g1, buson, aenabrasil). No texto, pode referir "segundo dados do IBGE" ou "segundo o Climate-Data.org"; inclua os links apenas dentro de parênteses no formato markdown [label](url) usando exclusivamente esses domínios autorizados.`;

async function main() {
  const pool = mysql.createPool(process.env.DATABASE_URL!);
  const [rows] = await pool.execute(`
    SELECT m.ibgeCode, m.name, m.slug, m.ddd, m.capital, m.latitude, m.longitude,
           m.populationEstimated, m.timezone, s.name AS stateName, s.uf AS stateUf, s.region
    FROM municipalities m
    JOIN states s ON s.ibgeCode = m.stateIbgeCode
    ORDER BY s.uf, m.populationEstimated DESC, m.name
  `) as any[];

  const done = onlyEmpty ? loadDone() : new Set<string>();
  console.log(`-- onlyUf=${onlyUf ?? "(todas)"} onlyEmpty=${onlyEmpty} done.size=${done.size}`);
  const sample = rows.slice(0, 3).map((r: any) => ({ uf: r.stateUf, name: r.name }));
  console.log("-- amostra rows:", JSON.stringify(sample));

  const ufFilter = onlyUf ? onlyUf.toUpperCase() : null;
  const target = ufFilter
    ? rows.filter((r: any) => r.stateUf === ufFilter)
    : rows;
  console.log(`-- target=${target.length}`);
  const queue = target.filter((r: any) => {
    const slug = r.slug ?? normalizeSlug(r.name);
    return !done.has(`${r.stateUf}:${slug}`);
  });
  const work = limit > 0 ? queue.slice(0, limit) : queue;

  console.log(`Total na base: ${rows.length}. Na fila: ${queue.length}. A processar agora: ${work.length}.`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let completed = 0;
  let failed = 0;
  const CONC = 3;
  const chunks = chunk(work, CONC);
  for (const batch of chunks) {
    await Promise.all(batch.map(async (r: any) => {
      const slug = r.slug ?? normalizeSlug(r.name);
      const key = `${r.stateUf}:${slug}`;
      const uf = r.stateUf.toLowerCase();
      const file = path.join(OUT_DIR, `${uf}.json`);
      const catalog = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf-8")) : {};
      try {
        const res = await invokeLLM({
          model: "gpt-5-nano",
          messages: [
            { role: "system", content: "Você escreve guias editoriais factuais e sóbrios sobre municípios brasileiros, retornando JSON estruturado." },
            { role: "user", content: PROMPT(r) },
          ],
          response_format: { type: "json_schema", json_schema: { name: "locality_tabs", strict: true, schema: SCHEMA } },
        });
        const content = (res as any).choices?.[0]?.message?.content;
        if (!content) throw new Error("resposta vazia");
        const parsed = JSON.parse(typeof content === "string" ? content : String(content));
        for (const sec of ["tourism", "dining", "transport"]) {
          if (parsed[sec]?.intro) parsed[sec].intro = cleanArtifacts(parsed[sec].intro);
          if (parsed[sec]?.closing) parsed[sec].closing = cleanArtifacts(parsed[sec].closing);
          for (const item of parsed[sec]?.items ?? []) for (const k of ["description"]) item[k] = cleanArtifacts(item[k] ?? "");
        }
        if (parsed.climate?.intro) parsed.climate.intro = cleanArtifacts(parsed.climate.intro);
        if (parsed.climate?.body) parsed.climate.body = cleanArtifacts(parsed.climate.body);
        for (const d of parsed.climate?.details ?? []) { d.label = cleanArtifacts(d.label); d.value = cleanArtifacts(d.value); }
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
        for (const item of catalog[key].tourism.items) item.mapHref = MAP_SEARCH(`${item.name}, ${r.name}, ${r.stateUf}`);
        for (const item of catalog[key].dining.items) item.mapHref = MAP_SEARCH(`${item.name}, ${r.name}, ${r.stateUf}`);
        for (const item of catalog[key].transport.items) item.mapHref = MAP_SEARCH(`${item.name}, ${r.name}, ${r.stateUf}`);
        fs.writeFileSync(file, JSON.stringify(catalog, null, 2) + "\n");
        appendLog(uf, `OK ${key}`);
        completed++;
      } catch (e) {
        failed++;
        appendLog(uf, `FAIL ${key}: ${(e as Error).message.slice(0, 200)}`);
      }
    }));
    for (const r of batch) {
      const slug = r.slug ?? normalizeSlug(r.name);
      done.add(`${r.stateUf}:${slug}`);
    }
  }
  console.log(`Concluído. ${completed} fichas geradas, ${failed} falhas.`);
  await pool.end();
}

function normalizeSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\u0301/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function loadDone(): Set<string> {
  const done = new Set<string>();
  if (!fs.existsSync(OUT_DIR)) return done;
  for (const entry of fs.readdirSync(OUT_DIR)) {
    if (entry.endsWith(".log")) {
      for (const line of fs.readFileSync(path.join(OUT_DIR, entry), "utf-8").split("\n")) {
        const m = line.match(/^OK ([A-Z]{2}:.+)$/);
        if (m) done.add(m[1]);
      }
    }
  }
  return done;
}

function appendLog(uf: string, msg: string) {
  fs.appendFileSync(path.join(OUT_DIR, `${uf}.log`), `${new Date().toISOString()} ${msg}\n`);
}

main().catch(e => { console.error(e); process.exit(1); });
