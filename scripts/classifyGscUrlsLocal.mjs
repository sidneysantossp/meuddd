/* Classifica as URLs do mega export GSC pelo comportamento atual do site.
   Testa no servidor local http://localhost:3000 (rápido; mesmo código do
   domínio de produção) e agrupa por padrão com métricas. */
import { createReadStream } from "fs";
import { csvToArray } from "./_classify.mjs";

const SITE = "http://localhost:3000";

const rows = csvToArray("/home/ubuntu/upload/Páginas.csv").filter(
  r => r[0] && r[0].trim().startsWith("https://www.meuddd.com.br"),
);

function parseNum(s) {
  const n = parseFloat(s?.trim().replace(/\./g, "").replace(",", ".") || "0");
  return Number.isFinite(n) ? n : 0;
}

function classify(path) {
  // redirect detection: fetch with redirect manual
  return fetch(SITE + path, { redirect: "manual", headers: { "Accept": "text/html" } })
    .then(async res => {
      if (res.status === 301 || res.status === 302) {
        return { status: "REDIRECT", loc: res.headers.get("location") || "" };
      }
      if (res.status === 200) {
        const body = await res.text();
        const m = body.match(/<title>([^<]*)<\/title>/);
        if (m && /não encontr/i.test(m[1])) return { status: "SOFT404", loc: "" };
        return { status: "VIVA", loc: "" };
      }
      return { status: `HTTP${res.status}`, loc: "" };
    })
    .catch(e => ({ status: `ERR:${e.message.slice(0, 40)}`, loc: "" }));
}

const classified = [];
for (let i = 0; i < rows.length; i++) {
  const url = rows[i][0].trim();
  const path = url.slice("https://www.meuddd.com.br".length).split("?")[0];
  const result = await classify(path);
  classified.push({ url, path, ...result });
  if ((i + 1) % 200 === 0) console.error(`${i + 1}/${rows.length}`);
}

// Agrupar por padrão
const groups = new Map();
for (const c of classified) {
  const row = rows.find(r => r[0].trim() === c.url);
  const imps = parseNum(row[2]);
  const clicks = parseNum(row[1]);
  let pat;
  const p = c.path;
  if (p.startsWith("/blog/")) {
    const segs = p.split("/").filter(Boolean);
    if (segs.length >= 3) pat = `BLOG/${segs[1]}/${segs[2]}/<tema>`;
    else pat = "BLOG/raiz";
  } else if (/^\/cidade\/([a-z]{2})\/[^/]+$/.test(p)) pat = "CIDADE_UF";
  else if (/^\/cidade\/[a-z-]+$/.test(p)) pat = "CIDADE_NOME";
  else if (/^\/cidade\/[a-z-]+\/[^/]+\/.*$/.test(p)) pat = "CIDADE_UF/sufixo";
  else if (p === "/index.html") pat = "INDEX_HTML";
  else if (/^\/ddd\/\d+\/\d/.test(p)) pat = "DDD_DUPLICADO";
  else if (/^\/ddd\/\d+/.test(p)) pat = "DDD";
  else if (/^\/estado/.test(p)) pat = "ESTADO";
  else if (/^\/guia\//.test(p)) pat = "GUIA";
  else if (/^\/regiao\//.test(p)) pat = "REGIAO";
  else if (p.startsWith("/api/")) pat = "API";
  else pat = `OUTRO: ${p.slice(0, 60)}`;
  const g = groups.get(pat) || { count: 0, imps: 0, clicks: 0, by: {}, ex: [] };
  g.count++; g.imps += imps; g.clicks += clicks;
  g.by[c.status] = (g.by[c.status] || 0) + 1;
  if (c.status !== "VIVA" && g.ex.length < 8) g.ex.push(`${c.status} ${c.path}${c.loc ? " -> " + c.loc : ""}`);
  groups.set(pat, g);
}

console.log("\nPATRÃO | URLs | IMP | CL | ESTADOS");
for (const [pat, g] of [...groups.entries()].sort((a, b) => b[1].imps - a[1].imps)) {
  const st = Object.entries(g.by).map(([k, v]) => `${k}=${v}`).join(", ");
  console.log(`${pat} | ${g.count} | ${g.imps.toFixed(0)} | ${g.clicks.toFixed(0)} | ${st}`);
  for (const e of g.ex) console.log(`    ${e}`);
}

// JSON para consulta posterior
import { writeFileSync } from "fs";
writeFileSync(
  "/tmp/gsc_classified.json",
  JSON.stringify({ total: classified.length, classified, groups: Object.fromEntries(groups) }, null, 1),
);
console.error("\nDone:", classified.length);
