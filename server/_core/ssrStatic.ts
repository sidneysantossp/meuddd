import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { createSsrPrefetch } from "../ssrPrefetch";
import { composeSsrHtml } from "./ssrHtml";

function originFor(req: express.Request) {
  return `${req.protocol}://${req.get("host") ?? "localhost"}`;
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.VERCEL
      ? path.resolve(process.cwd(), "public")
      : process.env.NODE_ENV === "development"
        ? path.resolve(import.meta.dirname, "../..", "dist", "public")
        : path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error("Could not find the build directory: ${distPath}, make sure to build the client first");
  }

  // O index.html precisa passar pelo handler abaixo para receber HTML, metadados e JSON-LD de SSR.
  // Os demais assets continuam a ser servidos diretamente deste diretório.
  app.use(express.static(distPath, { index: false }));
  app.use("*", async (req, res, next) => {
    try {
      const template = await fs.promises.readFile(path.resolve(distPath, "index.html"), "utf-8");
      const entryPath = process.env.VERCEL
        ? path.resolve(process.cwd(), "dist", "server", "entry-server.js")
        : path.resolve(import.meta.dirname, "server", "entry-server.js");
      const { render } = await import(pathToFileURL(entryPath).href);
      const rendered = await render(req.originalUrl, createSsrPrefetch());
      res.status(rendered.head.notFound ? 404 : 200)
        .set({ "Content-Type": "text/html" })
        .end(composeSsrHtml(template, rendered.html, rendered.dehydratedState, rendered.head, originFor(req)));
    } catch (error) {
      next(error);
    }
  });
}
