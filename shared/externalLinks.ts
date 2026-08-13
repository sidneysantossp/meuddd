/* Política de links externos da plataforma: apenas fontes governamentais
   (gov.br) e sites de grande autoridade editorial (IBGE, ANATEL, climate-data.org
   para clima). Nunca linkar portais comerciais de turismo/franquia de terceiros.
   Os links internos usam a navegação do site; os externos abrem em nova aba. */

export const ALLOWED_EXTERNAL_HOSTS = [
  /\.gov\.br$/,              // qualquer domínio governamental brasileiro
  /^www\.google\.com$/,      // Google Maps
  /^en\.climate-data\.org$/, // Climate-Data.org (clima, grande autoridade)
  /^pt\.climate-data\.org$/,
] as const;

export function isAllowedExternal(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return ALLOWED_EXTERNAL_HOSTS.some(re => re.test(host));
  } catch {
    return false;
  }
}

/* Sanitiza ficheiros JSON/TS gerados: remove hrefs de domínios fora da whitelist. */
export function sanitizeExternalLinks(value: unknown): unknown {
  if (typeof value === "string") {
    // remove markdown links [texto](url) cujo url é proibido
    return value.replace(/\[([^\]]*)\]\((https?:\/\/[^)\s"']+)\)/g, (match, text, url) => {
      if (isAllowedExternal(url)) return match;
      return text;
    });
  }
  if (Array.isArray(value)) return value.map(sanitizeExternalLinks);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === "mapHref" || k === "href") {
        if (typeof v === "string" && isAllowedExternal(v)) out[k] = v;
        // href proibido: omitir a propriedade por completo
      } else if (k === "source" && v !== null && typeof v === "object" && !Array.isArray(v)) {
        // "source" é um objeto {label, href}; omitir por completo se o href for proibido
        const inner = v as Record<string, unknown>;
        const href = inner.href;
        if (typeof href === "string" && isAllowedExternal(href)) out[k] = sanitizeExternalLinks(v);
      } else {
        out[k] = sanitizeExternalLinks(v);
      }
    }
    return out;
  }
  return value;
}

/* URLs oficiais governamentais reutilizadas nas páginas. */
export const OFFICIAL_URLS = {
  ibgeCity: (uf: string, slug: string) =>
    `https://cidades.ibge.gov.br/v4/brasil/${uf.toLowerCase()}/${slug}/panorama`,
  ibgeStates: "https://www.ibge.gov.br/cidades-e-estados.html",
  anatelNumeracao: "https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro",
  anatelEmergency: "https://www.gov.br/anatel/pt-br/regulado/numeracao/codigos-nacionais/servicos-de-utilidade-publica-e-de-emergencia",
  climateData: (uf: string, city: string) =>
    `https://pt.climate-data.org/america-do-sul/brasil/${uf.toLowerCase()}/${encodeURIComponent(city)}/`,
} as const;

/* Converte markdown links [texto](url) em <a> (externos só se na whitelist).
   Use no dangerouslySetInnerHTML dos textos editoriais. */
export function renderMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]*)\]\((https?:\/\/[^)\s"']+)\)/g, (match, t, url) => {
    if (!isAllowedExternal(url)) return t;
    return `<a href="${url}" target="_blank" rel="noreferrer" class="underline decoration-[#f06a4d]/60 underline-offset-4 hover:text-[#f06a4d]">${t}</a>`;
  });
}
