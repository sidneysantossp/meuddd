import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { createSsrPrefetch } from "../ssrPrefetch";
import { composeSsrHtml } from "./ssrHtml";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const clientTemplate = path.resolve(projectRoot, "client", "index.html");
const originFor = (req: express.Request) =>
  `${req.protocol}://${req.get("host") ?? "localhost"}`;

export async function setupVite(app: Express, server: Server) {
  const resolvedViteConfig =
    typeof viteConfig === "function"
      ? await viteConfig({
          command: "serve",
          mode: "development",
          isSsrBuild: false,
          isPreview: false,
        })
      : viteConfig;
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...resolvedViteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/entry-client.tsx"`,
        `src="/src/entry-client.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const rendered = await render(url, createSsrPrefetch());
      res
        .status(rendered.head.notFound ? 404 : 200)
        .set({ "Content-Type": "text/html" })
        .end(
          composeSsrHtml(
            page,
            rendered.html,
            rendered.dehydratedState,
            rendered.head,
            originFor(req)
          )
        );
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
