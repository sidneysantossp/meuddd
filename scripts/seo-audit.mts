/* Varredura SEO das páginas principais: meta tags, canonical, JSON-LD, headings,
   links internos/externos, proporção texto/HTML. Uso: pnpm tsx scripts/seo-audit.mts */
import { writeFileSync } from "fs";
import { execSync } from "child_process";

const BASE = "http://localhost:3000";

const pages = [
  { path: "/", name: "Home" },
  { path: "/ddd/11", name: "DDD 11" },
  { path: "/ddd/21", name: "DDD 21" },
  { path: "/ddd/85", name: "DDD 85" },
  { path: "/estado/sp", name: "Estado SP" },
  { path: "/estado/pa", name: "Estado PA" },
  { path: "/cidade/sp/osasco", name: "Município Osasco (com tabs)" },
  { path: "/cidade/sp/aracariguama", name: "Município Araçariguama (sem tabs)" },
  { path: "/cidade/ac/cruzeiro-do-sul", name: "Município Cruzeiro do Sul (com tabs)" },
  { path: "/regiao/sudeste", name: "Região Sudeste" },
  { path: "/guia/como-descobrir-ddd-de-uma-cidade", name: "Guia editorial" },
  { path: "/blog", name: "Blog" },
];

function fetchHtml(path: string): string {
  try {
    return execSync(`curl -s -m 30 "${BASE}${path}"`, { maxBuffer: 10 * 1024 * 1024 }).toString();
  } catch {
    return "";
  }
}

function extractMeta(html: string, attr: string, value: string, tagAttr: string): string {
  const re = new RegExp(`<${tagAttr}[^>]*${attr}=["']${value}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(`<${tagAttr}[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${value}["'][^>]*>`, "i");
  const m2 = html.match(re2);
  return m2 ? m2[1] : "";
}

function findHeadings(html: string): { level: string; text: string }[] {
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out: { level: string; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text) out.push({ level: `h${m[1]}`, text });
  }
  return out;
}

function findLinks(html: string): { internal: string[]; external: string[]; nofollow: number } {
  const re = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
  const internal: string[] = [];
  const external: string[] = [];
  let nofollow = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const tag = m[0];
    if (tag.includes("rel=\"nofollow\"")) nofollow++;
    if (href.startsWith("http")) {
      if (!href.includes("meuddd.com.br") && !href.startsWith("http://localhost")) external.push(href);
    } else if (href.startsWith("/")) {
      internal.push(href);
    }
  }
  return { internal, external, nofollow };
}

function textHtmlRatio(html: string): number {
  const withoutTags = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return Math.round((withoutTags.length / html.length) * 1000) / 10;
}

function textLength(html: string): number {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

const results: {
  path: string;
  name: string;
  htmlSizeKB: number;
  status: "ok" | "empty";
  title: string;
  titleLen: number;
  description: string;
  descLen: number;
  canonical: string;
  ogImage: string;
  jsonLdCount: number;
  jsonLdTypes: string[];
  h1Count: number;
  h2Count: number;
  headingsFirst5: string[];
  internalLinks: number;
  externalLinks: number;
  nofollowLinks: number;
  textRatio: number;
  textChars: number;
}[] = [];

for (const page of pages) {
  const html = fetchHtml(page.path);
  if (!html) {
    results.push({ path: page.path, name: page.name, htmlSizeKB: 0, status: "empty", title: "", titleLen: 0, description: "", descLen: 0, canonical: "", ogImage: "", jsonLdCount: 0, jsonLdTypes: [], h1Count: 0, h2Count: 0, headingsFirst5: [], internalLinks: 0, externalLinks: 0, nofollowLinks: 0, textRatio: 0, textChars: 0 });
    continue;
  }
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  const description = extractMeta(html, "name", "description", "meta") || extractMeta(html, "property", "og:description", "meta");
  const canonical = extractMeta(html, "rel", "canonical", "link");
  const ogImage = extractMeta(html, "property", "og:image", "meta");
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/gi)];
  const jsonLdTypes = scripts
    .map(s => s[0].match(/"@type":\s*"?([^",\]]+)"?/))
    .filter(Boolean)
    .map(m => m![1]);
  const headings = findHeadings(html);
  const links = findLinks(html);
  results.push({
    path: page.path,
    name: page.name,
    htmlSizeKB: Math.round(html.length / 1024),
    status: "ok",
    title,
    titleLen: title.length,
    description,
    descLen: description.length,
    canonical,
    ogImage: ogImage ? "sim" : "nao",
    jsonLdCount: scripts.length,
    jsonLdTypes: [...new Set(jsonLdTypes)],
    h1Count: headings.filter(h => h.level === "h1").length,
    h2Count: headings.filter(h => h.level === "h2").length,
    headingsFirst5: headings.slice(0, 5).map(h => `${h.level}: ${h.text.slice(0, 70)}`),
    internalLinks: links.internal.length,
    externalLinks: links.external.length,
    nofollowLinks: links.nofollow,
    textRatio: textHtmlRatio(html),
    textChars: textLength(html),
  });
}

writeFileSync(".manus-logs/seo-audit-results.json", JSON.stringify(results, null, 2));
console.log("OK — resultados gravados em .manus-logs/seo-audit-results.json");
for (const r of results) {
  console.log(`\n=== ${r.name} (${r.path}) ===`);
  console.log(`HTML: ${r.htmlSizeKB}KB | status: ${r.status} | title[${r.titleLen}]: ${r.title.slice(0, 90)}`);
  console.log(`desc[${r.descLen}]: ${r.description.slice(0, 110)} | canonical: ${r.canonical || "(none)"} | ogImage: ${r.ogImage} | jsonLd: ${r.jsonLdCount} (${r.jsonLdTypes.join(",")})`);
  for (const h of r.headingsFirst5) console.log(`   ${h}`);
  console.log(`h1: ${r.h1Count} | h2: ${r.h2Count} | internal: ${r.internalLinks} | external: ${r.externalLinks} | nofollow: ${r.nofollowLinks} | textRatio: ${r.textRatio}% | textChars: ${r.textChars}`);
}
