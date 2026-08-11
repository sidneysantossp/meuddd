import { createServer } from "node:http";

const { default: app } = await import(new URL("../server.ts", import.meta.url));
const server = createServer(app);

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

try {
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("A função Vercel não abriu uma porta de verificação local.");
  }

  const response = await fetch(`http://127.0.0.1:${address.port}/robots.txt`);
  const robots = await response.text();
  const homeResponse = await fetch(`http://127.0.0.1:${address.port}/`);
  const homeHtml = await homeResponse.text();

  if (!response.ok || !robots.includes("Sitemap:")) {
    throw new Error(`O entrypoint Vercel não respondeu robots.txt corretamente (HTTP ${response.status}).`);
  }

  const prefetchRuntimeError = "createSsrPrefetch is not defined";
  if (homeResponse.status >= 500 || homeHtml.includes(prefetchRuntimeError)) {
    throw new Error(`A rota SSR principal falhou em runtime (HTTP ${homeResponse.status}): ${homeHtml.slice(0, 600)}`);
  }

  if (!homeResponse.ok || !homeHtml.includes('id="root"') || !homeHtml.includes("window.__RQ_STATE__") || homeHtml.includes("<!--app-html-->")) {
    throw new Error(`O entrypoint Vercel não renderizou SSR na rota principal (HTTP ${homeResponse.status}): ${homeHtml.slice(0, 600)}`);
  }

  console.log("Entrada Vercel carregada com sucesso; robots.txt e a rota SSR principal responderam HTTP 200.");
} finally {
  await new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
}

// O cliente de dados pode manter sockets ociosos no processo local; a função Vercel não abre este servidor auxiliar.
process.exit(0);
