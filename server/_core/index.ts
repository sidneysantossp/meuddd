import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { pathToFileURL } from "url";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { listSitemapInventory } from "../db";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

function requestOrigin(req: express.Request) {
  return `${req.protocol}://${req.get("host") ?? "localhost"}`;
}

function sitemapXml(paths: string[], origin: string) {
  const entries = paths.map(path => `<url><loc>${new URL(path, origin).toString()}</loc></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

function sitemapIndexXml(paths: string[], origin: string) {
  const entries = paths.map(path => `<sitemap><loc>${new URL(path, origin).toString()}</loc></sitemap>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`;
}

export function createApp() {
  const app = express();
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
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
    res.type("application/xml").send(sitemapIndexXml(["/sitemaps/estados.xml", "/sitemaps/ddds.xml", "/sitemaps/cidades.xml", "/sitemaps/guias.xml"], origin));
  });
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
            : cityMatch ? inventory.citiesByUf[cityMatch[1]] ?? null
              : null;
      if (!selected) return res.status(404).type("text/plain").send("Sitemap não encontrado.");
      res.type("application/xml").send(sitemapXml(selected, requestOrigin(req)));
    } catch (error) {
      next(error);
    }
  });
  return app;
}

async function startServer() {
  const app = createApp();
  const server = createServer(app);

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

const isDirectExecution = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectExecution) {
  startServer().catch(console.error);
}
