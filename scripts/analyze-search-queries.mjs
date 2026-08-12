import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  throw new Error("Uso: node scripts/analyze-search-queries.mjs <consultas.csv> <analise.json>");
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      current.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      current.push(value);
      if (current.some(cell => cell.trim() !== "")) rows.push(current);
      current = [];
      value = "";
    } else {
      value += character;
    }
  }
  current.push(value);
  if (current.some(cell => cell.trim() !== "")) rows.push(current);
  return rows;
}

function number(value) {
  return Number(String(value).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cluster(query) {
  const normalized = normalize(query);
  if (/^meu d{1,3}$/.test(normalized) || /qual .* meu ddd|meu ddd/.test(normalized)) return "Marca e descoberta do próprio DDD";
  if (/gerador|gerar/.test(normalized) && /(numero|telefone|celular|ddd)/.test(normalized)) return "Gerador de números";
  if (/numero.*valido|celular.*valido|telefone.*valido/.test(normalized)) return "Números válidos e simulação";
  if (/(como|qual|descobrir|consulta|consultar).*(ddd|codigo)|ddd.*(de|brasil|estado|cidade)/.test(normalized)) return "Consulta e descoberta de DDD";
  if (/^ddd$/.test(normalized)) return "Consulta genérica de DDD";
  return "Cauda longa territorial e outras consultas";
}

function aggregate(rows, keyFn) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    const current = groups.get(key) ?? { key, clicks: 0, impressions: 0, positionSum: 0, rows: 0 };
    current.clicks += row.clicks;
    current.impressions += row.impressions;
    current.positionSum += row.position * row.impressions;
    current.rows += 1;
    groups.set(key, current);
  }
  return [...groups.values()].map(group => ({
    ...group,
    ctr: group.impressions ? group.clicks / group.impressions : 0,
    position: group.impressions ? group.positionSum / group.impressions : 0,
  }));
}

const matrix = parseCsv(fs.readFileSync(inputPath, "utf8"));
const headers = matrix.shift().map(header => normalize(header));
const index = {
  query: headers.findIndex(header => header.includes("top consultas") || header.includes("consultas")),
  clicks: headers.findIndex(header => header.includes("cliques")),
  impressions: headers.findIndex(header => header.includes("impressoes")),
  ctr: headers.findIndex(header => header === "ctr"),
  position: headers.findIndex(header => header.includes("posicao")),
};

const rawRows = matrix
  .filter(row => row[index.query])
  .map(row => ({
    query: row[index.query].trim(),
    normalized: normalize(row[index.query]),
    clicks: number(row[index.clicks]),
    impressions: number(row[index.impressions]),
    ctr: number(row[index.ctr]) / 100,
    position: number(row[index.position]),
  }));

const normalizedRows = aggregate(rawRows, row => row.normalized)
  .map(row => ({
    ...row,
    query: rawRows.find(source => source.normalized === row.key)?.query ?? row.key,
    cluster: cluster(row.key),
  }));

const totals = normalizedRows.reduce((sum, row) => ({
  clicks: sum.clicks + row.clicks,
  impressions: sum.impressions + row.impressions,
}), { clicks: 0, impressions: 0 });
const weightedPosition = normalizedRows.reduce((sum, row) => sum + row.position * row.impressions, 0);

const clusters = aggregate(normalizedRows, row => row.cluster)
  .sort((left, right) => right.impressions - left.impressions)
  .map(row => ({ ...row, cluster: row.key }));

const ctrBenchmarks = {
  top3: 0.18,
  positions4to6: 0.07,
  positions7to10: 0.035,
  positions11to20: 0.012,
};

function targetCtr(position) {
  if (position <= 3) return ctrBenchmarks.top3;
  if (position <= 6) return ctrBenchmarks.positions4to6;
  if (position <= 10) return ctrBenchmarks.positions7to10;
  return ctrBenchmarks.positions11to20;
}

const opportunities = normalizedRows
  .filter(row => row.impressions >= 100 && row.position >= 3 && row.position <= 20)
  .map(row => {
    const benchmarkCtr = targetCtr(row.position);
    return {
      ...row,
      benchmarkCtr,
      estimatedAdditionalClicks: Math.max(0, Math.round(row.impressions * (benchmarkCtr - row.ctr))),
      opportunityScore: Math.max(0, row.impressions * (benchmarkCtr - row.ctr)),
    };
  })
  .filter(row => row.estimatedAdditionalClicks > 0)
  .sort((left, right) => right.opportunityScore - left.opportunityScore)
  .slice(0, 30);

const topQueries = [...normalizedRows]
  .sort((left, right) => right.impressions - left.impressions)
  .slice(0, 30);

const positionBuckets = [
  { label: "1–3", min: 1, max: 3 },
  { label: "4–6", min: 4, max: 6 },
  { label: "7–10", min: 7, max: 10 },
  { label: "11–20", min: 11, max: 20 },
  { label: "20+", min: 20.00001, max: Infinity },
].map(bucket => {
  const items = normalizedRows.filter(row => row.position >= bucket.min && row.position <= bucket.max);
  const totals = items.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), { clicks: 0, impressions: 0 });
  return { ...bucket, queries: items.length, ...totals, ctr: totals.impressions ? totals.clicks / totals.impressions : 0 };
});

const exactBrand = normalizedRows.filter(row => /meu ddd|qual .*meu ddd|meu dd/.test(row.key));
const report = {
  source: path.basename(inputPath),
  rows: { original: rawRows.length, normalized: normalizedRows.length },
  totals: { ...totals, ctr: totals.impressions ? totals.clicks / totals.impressions : 0, position: totals.impressions ? weightedPosition / totals.impressions : 0 },
  clusters,
  positionBuckets,
  topQueries,
  opportunities,
  brand: {
    clicks: exactBrand.reduce((sum, row) => sum + row.clicks, 0),
    impressions: exactBrand.reduce((sum, row) => sum + row.impressions, 0),
    position: (() => {
      const impressions = exactBrand.reduce((sum, row) => sum + row.impressions, 0);
      return impressions ? exactBrand.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions : 0;
    })(),
  },
  notes: [
    "O ficheiro não inclui dimensões de data, página ou país; a análise mede a distribuição agregada de consultas, não uma série temporal de queda/recuperação.",
    "As estimativas de ganho usam patamares conservadores de CTR por posição exclusivamente para priorização; não são previsões de tráfego.",
  ],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ rows: report.rows, totals: report.totals, clusters: report.clusters, opportunities: report.opportunities.slice(0, 10) }, null, 2));
