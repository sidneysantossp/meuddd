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

  if (!response.ok || !robots.includes("Sitemap:")) {
    throw new Error(`O entrypoint Vercel não respondeu robots.txt corretamente (HTTP ${response.status}).`);
  }

  console.log("Entrada Vercel carregada com sucesso e robots.txt respondeu HTTP 200.");
} finally {
  await new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
}
