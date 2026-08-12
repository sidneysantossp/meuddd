import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const handlerBundle = await readFile(resolve("dist/vercel/handler.js"), "utf8");
const forbiddenRuntimeReferences = [/\b(?:vite|rollup|lightningcss)\b/i, /server\/_core\/vite\.ts/i];
const forbiddenReference = forbiddenRuntimeReferences.find(pattern => pattern.test(handlerBundle));
if (forbiddenReference) {
  throw new Error(`O bundle serverless não pode conter dependências de desenvolvimento: ${forbiddenReference}.`);
}

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
  const dddResponse = await fetch(`http://127.0.0.1:${address.port}/ddd/11`);
  const dddHtml = await dddResponse.text();
  const stateResponse = await fetch(`http://127.0.0.1:${address.port}/estado/sp`);
  const stateHtml = await stateResponse.text();
  const municipalityResponse = await fetch(`http://127.0.0.1:${address.port}/cidade/sp/sao-paulo`);
  const municipalityHtml = await municipalityResponse.text();
  const guidesResponse = await fetch(`http://127.0.0.1:${address.port}/guias`);
  const guidesHtml = await guidesResponse.text();
  const institutionalRoutes = [
    ["/sobre", "Sobre o Meu DDD"],
    ["/contato", "Fale sobre o Meu DDD"],
    ["/politica-de-privacidade", "Política de privacidade"],
    ["/termos-de-uso", "Termos de uso"],
    ["/lgpd", "LGPD e transparência"],
    ["/imprensa", "Informações para imprensa"],
  ];
  const institutionalPages = await Promise.all(institutionalRoutes.map(async ([path, marker]) => {
    const pageResponse = await fetch(`http://127.0.0.1:${address.port}${path}`);
    return { path, marker, status: pageResponse.status, ok: pageResponse.ok, html: await pageResponse.text() };
  }));
  const sitemapResponse = await fetch(`http://127.0.0.1:${address.port}/sitemaps/ddds.xml`);
  const sitemapXml = await sitemapResponse.text();

  if (!response.ok || !robots.includes("Sitemap:")) {
    throw new Error(`O entrypoint Vercel não respondeu robots.txt corretamente (HTTP ${response.status}).`);
  }

  const prefetchRuntimeError = "createSsrPrefetch is not defined";
  if (homeResponse.status >= 500 || homeHtml.includes(prefetchRuntimeError)) {
    throw new Error(`A rota SSR principal falhou em runtime (HTTP ${homeResponse.status}): ${homeHtml.slice(0, 600)}`);
  }

  if (!homeResponse.ok || !homeHtml.includes('id="root"') || !homeHtml.includes("window.__RQ_STATE__") || !homeHtml.includes("Blog") || !homeHtml.includes("Ver mais conteúdo") || homeHtml.includes("<!--app-html-->")) {
    throw new Error(`O entrypoint Vercel não renderizou SSR na rota principal (HTTP ${homeResponse.status}): ${homeHtml.slice(0, 600)}`);
  }

  if (!dddResponse.ok || !dddHtml.includes("DDD 11: cidades e estados atendidos") || !dddHtml.includes('id="public-mobile-navigation"') || !dddHtml.includes("Copiar link")) {
    throw new Error(`A reserva territorial não renderizou a rota programática /ddd/11 (HTTP ${dddResponse.status}): ${dddHtml.slice(0, 600)}`);
  }

  if (!stateResponse.ok || !stateHtml.includes("DDD de São Paulo")) {
    throw new Error(`A reserva territorial não renderizou a rota programática /estado/sp (HTTP ${stateResponse.status}): ${stateHtml.slice(0, 600)}`);
  }

  if (!municipalityResponse.ok || !municipalityHtml.includes("DDD de São Paulo (SP) | Meu DDD") || !municipalityHtml.includes('id="public-mobile-navigation"') || !municipalityHtml.includes("Copiar link")) {
    throw new Error(`A reserva territorial não renderizou a rota programática /cidade/sp/sao-paulo (HTTP ${municipalityResponse.status}): ${municipalityHtml.slice(0, 600)}`);
  }

  if (!guidesResponse.ok || !guidesHtml.includes("Guias de telefonia") || !guidesHtml.includes('id="public-mobile-navigation"')) {
    throw new Error(`A rota editorial /guias não renderizou a navbar pública via SSR (HTTP ${guidesResponse.status}): ${guidesHtml.slice(0, 600)}`);
  }

  const invalidInstitutionalPage = institutionalPages.find(page => !page.ok || !page.html.includes(page.marker) || !page.html.includes("© 2026 Meu DDD"));
  if (invalidInstitutionalPage) {
    throw new Error(`A rota institucional ${invalidInstitutionalPage.path} não renderizou o conteúdo ou footer via SSR (HTTP ${invalidInstitutionalPage.status}): ${invalidInstitutionalPage.html.slice(0, 600)}`);
  }

  const contactPage = institutionalPages.find(page => page.path === "/contato");
  if (!contactPage?.html.includes("Validar mensagem") || !contactPage.html.includes("Como podemos ajudar?")) {
    throw new Error(`A página de contacto não renderizou o formulário validável via SSR: ${contactPage?.html.slice(0, 600)}`);
  }

  const pressPage = institutionalPages.find(page => page.path === "/imprensa");
  if (!pressPage?.html.includes("Kit de marca") || !pressPage.html.includes("Em números") || !pressPage.html.includes("meu-ddd-kit-de-marca-2026")) {
    throw new Error(`A página de imprensa não renderizou kit de marca e estatísticas via SSR: ${pressPage?.html.slice(0, 600)}`);
  }

  if (!sitemapResponse.ok || !sitemapXml.includes("/ddd/11")) {
    throw new Error(`A reserva territorial não gerou o sitemap de DDDs (HTTP ${sitemapResponse.status}): ${sitemapXml.slice(0, 600)}`);
  }

  console.log("Entrada Vercel carregada com sucesso; robots.txt, Blog, contacto, imprensa, rotas DDD/estado/município/guias/institucionais, footer, partilha e sitemap responderam HTTP 200.");
} finally {
  await new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
}

// O cliente de dados pode manter sockets ociosos no processo local; a função Vercel não abre este servidor auxiliar.
process.exit(0);
