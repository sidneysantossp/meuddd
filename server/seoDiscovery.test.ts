import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");

describe("artefactos de descoberta SEO/GEO", () => {
  it("mantém RSS, sitemaps suplementares e origem HTTPS canónica no servidor público", () => {
    const appSource = fs.readFileSync(path.join(projectRoot, "server/_core/app.ts"), "utf8");

    expect(appSource).toContain('const PUBLIC_SITE_ORIGIN = "https://www.meuddd.com.br"');
    expect(appSource).toContain('app.get("/feed.xml"');
    expect(appSource).toContain('"/sitemaps/regioes.xml"');
    expect(appSource).toContain('"/sitemaps/paginas.xml"');
    expect(appSource).toContain('"/sitemaps/guias.xml"');
    expect(appSource).toContain('"/sitemaps/imagens.xml"');
    expect(appSource).toContain('"/sitemaps/cidades.xml"');
    expect(appSource).toContain('const LASTMOD');
    expect(appSource).toContain("cachedInventory");
    expect(appSource).toContain('kind === "paginas"');
    expect(appSource).toContain("<lastmod>");
    expect(appSource).toContain("<changefreq>");
    expect(appSource).toContain("<priority>");
    expect(appSource).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(appSource).toContain('regionHubs.map(region => ({ path: `/regiao/${region.slug}`');
    expect(appSource).toContain('"/capitais"');
  });

  it("publica Organization, WebSite e SearchAction em todas as respostas SSR", () => {
    const ssrSource = fs.readFileSync(path.join(projectRoot, "server/_core/ssrHtml.ts"), "utf8");

    expect(ssrSource).toContain('"@type": "Organization"');
    expect(ssrSource).toContain('"@type": "WebSite"');
    expect(ssrSource).toContain('"@type": "SearchAction"');
    expect(ssrSource).toContain('target: `${CANONICAL_ORIGIN}/?q={search_term_string}`');
  });
});
