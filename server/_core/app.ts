import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { listSitemapInventory } from "../db";
import { createContext } from "./context";
import { serveStatic } from "./ssrStatic";
import { editorialGuides } from "../../shared/editorialGuides";
import { regionHubs } from "../../shared/territorialSeo";

const PUBLIC_SITE_ORIGIN = "https://www.meuddd.com.br";
const INSTITUTIONAL_PATHS = ["/sobre", "/contato", "/politica-de-privacidade", "/termos-de-uso", "/lgpd", "/imprensa", "/capitais"];
const EDITORIAL_IMAGES: Record<string, { src: string; title: string; caption: string }> = {
  "o-que-e-ddd": { src: "/manus-storage/blog-ddd-mapa-brasil_57876089.png", title: "O que é DDD", caption: "Mapa do Brasil, telefone e marcador de localização." },
  "como-descobrir-ddd-de-uma-cidade": { src: "/manus-storage/blog-consultar-ddd-cidade_0819cb9e.png", title: "Como descobrir o DDD de uma cidade", caption: "Malha urbana, mapa dobrado e marcador de localização." },
  "como-ligar-para-outro-estado": { src: "/manus-storage/blog-ligacao-entre-estados_42079c98.png", title: "Como ligar para outro estado", caption: "Regiões conectadas por uma ligação telefónica." },
};

function requestOrigin(req: express.Request) {
  const host = req.get("host") ?? "localhost";
  return host.includes("meuddd.com.br") ? PUBLIC_SITE_ORIGIN : `${req.protocol}://${host}`;
}

function sitemapXml(paths: string[], origin: string) {
  const entries = paths.map(path => `<url><loc>${new URL(path, origin).toString()}</loc></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

function sitemapIndexXml(paths: string[], origin: string) {
  const entries = paths.map(path => `<sitemap><loc>${new URL(path, origin).toString()}</loc></sitemap>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] ?? character);
}

function imageSitemapXml(origin: string) {
  const entries = Object.entries(EDITORIAL_IMAGES).map(([slug, image]) => `<url><loc>${new URL(`/guia/${slug}`, origin).toString()}</loc><image:image><image:loc>${new URL(image.src, origin).toString()}</image:loc><image:title>${escapeXml(image.title)}</image:title><image:caption>${escapeXml(image.caption)}</image:caption></image:image></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;
}

function rssXml(origin: string) {
  const publicationDate = new Date("2026-08-12T12:00:00Z").toUTCString();
  const items = editorialGuides.map(guide => `<item><title>${escapeXml(guide.title)}</title><link>${new URL(`/guia/${guide.slug}`, origin).toString()}</link><guid isPermaLink="true">${new URL(`/guia/${guide.slug}`, origin).toString()}</guid><description>${escapeXml(guide.description)}</description><pubDate>${publicationDate}</pubDate><category>${escapeXml(guide.eyebrow)}</category></item>`).join("");
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
  registerStorageProxy(app);
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
    res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  });
  app.get("/sitemap.xml", (req, res) => {
    const origin = requestOrigin(req);
    res.type("application/xml").send(sitemapIndexXml(["/sitemaps/estados.xml", "/sitemaps/ddds.xml", "/sitemaps/cidades.xml", "/sitemaps/guias.xml", "/sitemaps/regioes.xml", "/sitemaps/institucional.xml", "/sitemaps/imagens.xml"], origin));
  });
  app.get("/feed.xml", (req, res) => res.type("application/rss+xml").send(rssXml(requestOrigin(req))));
  app.get("/sitemaps/:kind.xml", async (req, res, next) => {
    try {
      const inventory = await listSitemapInventory();
      const kind = req.params.kind;
      if (kind === "cidades") {
        const cityMaps = Object.keys(inventory.citiesByUf).sort().map(uf => `/sitemaps/cidades-${uf}.xml`);
        return res.type("application/xml").send(sitemapIndexXml(cityMaps, requestOrigin(req)));
      }
      const cityMatch = kind.match(/^cidades-([a-z]{2})$/);
      const selected = kind === "estados" ? inventory.states
        : kind === "ddds" ? inventory.ddds
          : kind === "guias" ? inventory.guides
            : kind === "regioes" ? regionHubs.map(region => `/regiao/${region.slug}`)
              : kind === "institucional" ? INSTITUTIONAL_PATHS
            : cityMatch ? inventory.citiesByUf[cityMatch[1]] ?? null
              : null;
      if (kind === "imagens") return res.type("application/xml").send(imageSitemapXml(requestOrigin(req)));
      if (!selected) return res.status(404).type("text/plain").send("Sitemap não encontrado.");
      res.type("application/xml").send(sitemapXml(selected, requestOrigin(req)));
    } catch (error) {
      next(error);
    }
  });
  return app;
}

export { serveStatic };
