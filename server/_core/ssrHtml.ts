import type { HeadMeta } from "../../client/src/ssr/prefetch";

/** Imagem de partilha genérica do site (1440×810, servida como ativo estático). */
const DEFAULT_SHARE_IMAGE = "/assets/blog-ddd-mapa-brasil.jpg";
const shareImage = (ogImage?: string) =>
  new URL(ogImage ?? DEFAULT_SHARE_IMAGE, CANONICAL_ORIGIN).toString();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>\"]/g,
    character =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ??
      character
  );
const safeJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
const CANONICAL_ORIGIN = "https://www.meuddd.com.br";
const SITE_ID = `${CANONICAL_ORIGIN}/#website`;
const ORGANIZATION_ID = `${CANONICAL_ORIGIN}/#organization`;
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Meu DDD",
      url: CANONICAL_ORIGIN,
      description:
        "Plataforma brasileira para consultar códigos DDD por cidade, estado e região.",
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: "Meu DDD",
      url: CANONICAL_ORIGIN,
      inLanguage: "pt-BR",
      publisher: { "@id": ORGANIZATION_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: `${CANONICAL_ORIGIN}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const urlKeys = new Set([
  "@id",
  "item",
  "url",
  "urlTemplate",
  "mainEntityOfPage",
]);
function absolutizeJsonLd(
  value: unknown,
  origin: string,
  key?: string
): unknown {
  if (typeof value === "string")
    return key && urlKeys.has(key) && value.startsWith("/")
      ? new URL(value, origin).toString()
      : value;
  if (Array.isArray(value))
    return value.map(item => absolutizeJsonLd(item, origin));
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        absolutizeJsonLd(entryValue, origin, entryKey),
      ])
    );
  return value;
}

export function composeSsrHtml(
  template: string,
  html: string,
  dehydratedState: unknown,
  head: HeadMeta,
  origin: string
) {
  const canonicalOrigin = origin.startsWith(CANONICAL_ORIGIN)
    ? origin
    : CANONICAL_ORIGIN;
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
    `<meta property="og:image" content="${escapeHtml(shareImage(head.ogImage))}">`,
    `<meta property="og:image:width" content="1440">`,
    `<meta property="og:image:height" content="810">`,
    `<meta property="og:image:alt" content="${escapeHtml(head.ogImageAlt ?? "Meu DDD — consulta de códigos de área de todo o Brasil")}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    head.noindex ? `<meta name="robots" content="noindex,follow">` : "",
    `<script type="application/ld+json">${safeJson(siteJsonLd)}</script>`,
    ...(head.jsonLd ?? []).map(
      item =>
        `<script type="application/ld+json">${safeJson(absolutizeJsonLd(item, canonicalOrigin))}</script>`
    ),
  ].join("");
  const stateScript = `<script>window.__RQ_STATE__=${safeJson(dehydratedState)}</script>`;
  return template
    .replace("<!--app-head-->", tags)
    .replace("<!--app-html-->", html)
    .replace("</body>", `${stateScript}</body>`);
}
