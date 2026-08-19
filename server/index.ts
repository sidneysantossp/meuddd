import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

    // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");
  // Long-lived cache for hashed assets (JS/CSS with content hash in filename,
  // fonts, images, SVG map and favicons) — improves Core Web Vitals (LCP) by
  // letting browsers/CDN keep a cached copy for a year.
  const hashedAssetRegex = /\/[\w-]+\.[\w]{8,}\.([a-zA-Z]|ico|svg)$/;
  app.use(
    express.static(staticPath, {
      setHeaders(res, filePath) {
        const relative = filePath.replace(staticPath, "");
        if (hashedAssetRegex.test(relative)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (relative === "/sw.js") {
          // O Service Worker nunca deve ficar em cache HTTP — cada pedido deve
          // trazer a versão mais recente para atualização correcta do cache.
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        } else if (
          /\.(woff2?|ttf|otf)$/.test(relative) ||
          /\.(png|jpe?g|webp|gif|svg|ico|webmanifest)$/.test(relative)
        ) {
          res.setHeader("Cache-Control", "public, max-age=2592000, stale-while-revalidate=604800");
        }
      },
    })
  );
  // HTML documents are never aggressively cached — content updates must be
  // visible quickly for SEO recrawl.
  app.use(
    express.static(staticPath, {
      extensions: ["html"],
      setHeaders(res) {
        res.setHeader(
          "Cache-Control",
          "public, max-age=0, must-revalidate, stale-while-revalidate=300",
        );
      },
    }),
  );

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
