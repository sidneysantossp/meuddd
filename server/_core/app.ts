import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerSeoRedirects } from "./seoRedirects";
import { registerStorageProxy } from "./storageProxy";
import { registerPublicApi } from "../publicApi";
import { appRouter } from "../routers";
import { listSitemapInventory } from "../db";
import { createContext } from "./context";
import { serveStatic } from "./ssrStatic";
import { editorialGuides } from "../../shared/editorialGuides";
import { regionHubs } from "../../shared/territorialSeo";

const PUBLIC_SITE_ORIGIN = "https://www.meuddd.com.br";
const INSTITUTIONAL_PATHS = [
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/lgpd",
  "/imprensa",
  "/capitais",
];
const EDITORIAL_IMAGES: Record<
  string,
  { src: string; title: string; caption: string }
> = {
  "o-que-e-ddd": {
    src: "/assets/blog-ddd-mapa-brasil.jpg",
    title: "O que é DDD",
    caption: "Mapa do Brasil, telefone e marcador de localização.",
  },
  "como-descobrir-ddd-de-uma-cidade": {
    src: "/assets/blog-consultar-ddd-cidade.jpg",
    title: "Como descobrir o DDD de uma cidade",
    caption: "Malha urbana, mapa dobrado e marcador de localização.",
  },
  "como-ligar-para-outro-estado": {
    src: "/assets/blog-ligacao-entre-estados.jpg",
    title: "Como ligar para outro estado",
    caption: "Regiões conectadas por uma ligação telefónica.",
  },
};

function requestOrigin(req: express.Request) {
  const host = req.get("host") ?? "localhost";
  return host.includes("meuddd.com.br")
    ? PUBLIC_SITE_ORIGIN
    : `${req.protocol}://${host}`;
}

const LASTMOD = "2026-08-13";

function sitemapXml(
  entries: { path: string; priority?: string; changefreq?: string }[],
  origin: string
) {
  const blocks = entries
    .map(
      ({ path, priority = "0.8", changefreq = "weekly" }) =>
        `<url><loc>${new URL(path, origin).toString()}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${blocks}</urlset>`;
}

function sitemapIndexXml(paths: string[], origin: string) {
  const entries = paths
    .map(
      path =>
        `<sitemap><loc>${new URL(path, origin).toString()}</loc><lastmod>${LASTMOD}</lastmod></sitemap>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`;
}

/** Inventário de sitemap em cache (1 hora) para não sobrecarregar a base em cada pedido do Googlebot. */
let inventoryCache: {
  data: Awaited<ReturnType<typeof listSitemapInventory>> | null;
  at: number;
} = { data: null, at: 0 };
async function cachedInventory(): Promise<
  Awaited<ReturnType<typeof listSitemapInventory>>
> {
  if (inventoryCache.data && Date.now() - inventoryCache.at < 3_600_000)
    return inventoryCache.data;
  const data = await listSitemapInventory().catch(() => null);
  inventoryCache = { data, at: Date.now() };
  return data!;
}

function escapeXml(value: string) {
  return value.replace(
    /[<>&'\"]/g,
    character =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character
  );
}

function imageSitemapXml(origin: string) {
  const entries = Object.entries(EDITORIAL_IMAGES)
    .map(
      ([slug, image]) =>
        `<url><loc>${new URL(`/guia/${slug}`, origin).toString()}</loc><image:image><image:loc>${new URL(image.src, origin).toString()}</image:loc><image:title>${escapeXml(image.title)}</image:title><image:caption>${escapeXml(image.caption)}</image:caption></image:image></url>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;
}

function rssXml(origin: string) {
  const publicationDate = new Date("2026-08-12T12:00:00Z").toUTCString();
  const items = editorialGuides
    .map(
      guide =>
        `<item><title>${escapeXml(guide.title)}</title><link>${new URL(`/guia/${guide.slug}`, origin).toString()}</link><guid isPermaLink="true">${new URL(`/guia/${guide.slug}`, origin).toString()}</guid><description>${escapeXml(guide.description)}</description><pubDate>${publicationDate}</pubDate><category>${escapeXml(guide.eyebrow)}</category></item>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Meu DDD</title><link>${origin}</link><description>Guias práticos sobre DDD, chamadas e telefonia brasileira.</description><language>pt-BR</language><lastBuildDate>${publicationDate}</lastBuildDate>${items}</channel></rss>`;
}

/**
 * Cria apenas as rotas de aplicação. Este módulo não importa Vite e pode ser
 * empacotado de forma segura para o runtime serverless da Vercel.
 */
export function createApp() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerSeoRedirects(app);
  registerStorageProxy(app);
  registerPublicApi(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get("/robots.txt", (req, res) => {
    const origin = requestOrigin(req);
    res
      .type("text/plain")
      .send(
        `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\nSitemap: ${origin}/sitemap-updates.xml\n`,
      );
  });
  app.get("/sitemap.xml", async (req, res) => {
    const origin = requestOrigin(req);
    const inventory = await cachedInventory();
    const cityKinds = inventory
      ? Object.keys(inventory.citiesByUf)
          .sort()
          .map(uf => `/sitemaps/cidades-${uf}.xml`)
      : ["/sitemaps/cidades.xml"];
    res
      .type("application/xml")
      .send(
        sitemapIndexXml(
          [
            "/sitemaps/guias.xml",
            "/sitemaps/paginas.xml",
            ...cityKinds,
            "/sitemaps/estados.xml",
            "/sitemaps/ddds.xml",
            "/sitemaps/regioes.xml",
            "/sitemaps/imagens.xml",
          ],
          origin
        )
      );
  });
  app.get("/feed.xml", (req, res) =>
    res.type("application/rss+xml").send(rssXml(requestOrigin(req)))
  );
  /** Páginas mais recentemente publicadas/atualizadas — sinaliza ao Google o
   *  conteúdo novo (guias, pilares e amostra nacional de cidades) sem esperar
   *  pelo crawl completo do sitemap index. */
  app.get("/sitemap-updates.xml", async (req, res) => {
    const origin = requestOrigin(req);
    const inventory = await cachedInventory();
    const today = new Date().toISOString().slice(0, 10);
    const blocks: string[] = [];
    if (inventory) {
      blocks.push(
        ...(inventory.guides ?? [])
          .slice(0, 40)
          .map(
            path =>
              `<url><loc>${new URL(path, origin).toString()}</loc><lastmod>${today}</lastmod><priority>0.8</priority><changefreq>weekly</changefreq></url>`,
          ),
        ...(inventory.states ?? [])
          .slice(0, 27)
          .map(
            path =>
              `<url><loc>${new URL(path, origin).toString()}</loc><lastmod>${today}</lastmod><priority>0.9</priority><changefreq>weekly</changefreq></url>`,
          ),
        ...(inventory.ddds ?? [])
          .slice(0, 30)
          .map(
            path =>
              `<url><loc>${new URL(path, origin).toString()}</loc><lastmod>${today}</lastmod><priority>0.9</priority><changefreq>weekly</changefreq></url>`,
          ),
      );
      // Amostra nacional equilibrada das cidades: as primeiras de cada UF.
      const ufs = Object.keys(inventory.citiesByUf).sort();
      for (const uf of ufs) {
        blocks.push(
          ...(inventory.citiesByUf[uf] ?? [])
            .slice(0, 4)
            .map(
              path =>
                `<url><loc>${new URL(path, origin).toString()}</loc><lastmod>${today}</lastmod><priority>0.7</priority><changefreq>weekly</changefreq></url>`,
            ),
        );
      }
    }
    res
      .type("application/xml")
      .send(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${blocks.join("")}</urlset>`,
      );
  });
  app.get("/sitemaps/:kind.xml", async (req, res, next) => {
    try {
      const origin = requestOrigin(req);
      const inventory = await cachedInventory();
      const kind = req.params.kind;
      if (kind === "cidades") {
        const cityMaps = inventory
          ? Object.keys(inventory.citiesByUf)
              .sort()
              .map(uf => `/sitemaps/cidades-${uf}.xml`)
          : [];
        return res
          .type("application/xml")
          .send(sitemapIndexXml(cityMaps, origin));
      }
      const cityMatch = kind.match(/^cidades-([a-z]{2})$/);
      type SitemapEntry = {
        path: string;
        priority?: string;
        changefreq?: string;
      };
      const selected: SitemapEntry[] | null =
        kind === "estados"
          ? (inventory?.states.map(path => ({ path, priority: "0.9" })) ?? null)
          : kind === "ddds"
            ? (inventory?.ddds.map(path => ({ path, priority: "0.9" })) ?? null)
            : kind === "guias"
              ? (inventory?.guides.map(path => ({
                  path,
                  priority: path.startsWith("/guia/") ? "0.8" : "1.0",
                  changefreq: "weekly",
                })) ?? null)
              : kind === "paginas"
                ? [
                    { path: "/", priority: "1.0" },
                    {
                      path: "/gerador",
                      priority: "0.7",
                      changefreq: "monthly",
                    },
                    { path: "/capitais", priority: "0.8" },
                    ...INSTITUTIONAL_PATHS.filter(
                      path => path !== "/capitais"
                    ).map(path => ({
                      path,
                      priority: "0.5",
                      changefreq: "monthly",
                    })),
                  ]
                : kind === "regioes"
                  ? regionHubs.map(region => ({
                      path: `/regiao/${region.slug}` as string,
                      priority: "0.8",
                      changefreq: "monthly",
                    }))
                  : kind === "institucional"
                    ? INSTITUTIONAL_PATHS.map(path => ({
                        path,
                        priority: "0.5",
                        changefreq: "monthly",
                      }))
                    : cityMatch
                      ? (inventory?.citiesByUf[cityMatch[1]] ?? []).map(
                          path => ({ path, priority: "0.8" })
                        )
                      : null;
      if (kind === "imagens")
        return res.type("application/xml").send(imageSitemapXml(origin));
      if (!selected)
        return res
          .status(404)
          .type("text/plain")
          .send("Sitemap não encontrado.");
      res.type("application/xml").send(sitemapXml(selected, origin));
    } catch (error) {
      next(error);
    }
  });
  return app;
}

export { serveStatic };
