import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { listSitemapPaths } from "../db";
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

async function startServer() {
  const app = express();
  const server = createServer(app);
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
    const maps = ["estados", "ddds", "cidades", "guias"]
      .map(name => `<sitemap><loc>${new URL(`/sitemaps/${name}.xml`, origin).toString()}</loc></sitemap>`)
      .join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${maps}</sitemapindex>`);
  });
  app.get("/sitemaps/:kind.xml", async (req, res, next) => {
    try {
      const allPaths = await listSitemapPaths();
      const kind = req.params.kind;
      const selected = kind === "estados"
        ? allPaths.filter(path => path.startsWith("/estado/"))
        : kind === "ddds"
          ? allPaths.filter(path => path.startsWith("/ddd/"))
          : kind === "cidades"
            ? allPaths.filter(path => path.startsWith("/cidade/"))
            : kind === "guias"
              ? allPaths.filter(path => path.startsWith("/guia/"))
            : null;
      if (!selected) return res.status(404).type("text/plain").send("Sitemap não encontrado.");
      res.type("application/xml").send(sitemapXml(selected, requestOrigin(req)));
    } catch (error) {
      next(error);
    }
  });
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

startServer().catch(console.error);
