import type { HeadMeta } from "../../client/src/ssr/prefetch";

const escapeHtml = (value: string) => value.replace(/[&<>\"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
const CANONICAL_ORIGIN = "https://www.meuddd.com.br";

const urlKeys = new Set(["@id", "item", "url", "urlTemplate", "mainEntityOfPage"]);
function absolutizeJsonLd(value: unknown, origin: string, key?: string): unknown {
  if (typeof value === "string") return key && urlKeys.has(key) && value.startsWith("/") ? new URL(value, origin).toString() : value;
  if (Array.isArray(value)) return value.map(item => absolutizeJsonLd(item, origin));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [entryKey, absolutizeJsonLd(entryValue, origin, entryKey)]));
  return value;
}

export function composeSsrHtml(template: string, html: string, dehydratedState: unknown, head: HeadMeta, origin: string) {
  const canonicalOrigin = origin.startsWith(CANONICAL_ORIGIN) ? origin : CANONICAL_ORIGIN;
  const canonical = new URL(head.canonicalPath, canonicalOrigin).toString();
  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:title" content="${escapeHtml(head.title)}">`,
    `<meta property="og:description" content="${escapeHtml(head.description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="${head.ogType ?? "website"}">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    head.noindex ? `<meta name="robots" content="noindex,follow">` : "",
    ...(head.jsonLd ?? []).map(item => `<script type="application/ld+json">${safeJson(absolutizeJsonLd(item, canonicalOrigin))}</script>`),
  ].join("");
  const stateScript = `<script>window.__RQ_STATE__=${safeJson(dehydratedState)}</script>`;
  return template.replace("<!--app-head-->", tags).replace("<!--app-html-->", html).replace("</body>", `${stateScript}</body>`);
}
