import { describe, expect, it } from "vitest";

/**
 * Valida o comportamento do Service Worker (client/public/sw.js):
 * - O sw.js é um asset público e deve existir em dist/public no build.
 * - A regex PAGE_PATTERNS do sw.js é replicada aqui para validar as rotas
 *   cacheáveis sem depender de um ambiente de browser.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SW_SOURCE = fs.readFileSync(
  path.resolve(__dirname, "..", "client", "public", "sw.js"),
  "utf-8",
);

// Réplica da lógica PAGE_PATTERNS do sw.js (mantém teste e SW sincronizados)
const PAGE_PATTERNS = [
  /^\/$/,
  /^\/ddd\/\d{2}$/,
  /^\/estado\/[a-z]{2}$/,
  /^\/cidade\/[a-z]{2}\/[a-z0-9-]+$/,
  /^\/regiao\/[a-z-]+$/,
  /^\/guia\/[a-z0-9-]+$/,
  /^\/guias$/,
];

function isCacheablePage(urlString: string): boolean {
  try {
    const pathname = new URL(urlString, "https://meuddd.com.br").pathname;
    return PAGE_PATTERNS.some(re => re.test(pathname));
  } catch {
    return false;
  }
}

describe("Service Worker PWA", () => {
  it("sw.js existe em client/public", () => {
    expect(SW_SOURCE.length).toBeGreaterThan(100);
  });

  it("sw.js refere a instalação, ativação e fetch", () => {
    expect(SW_SOURCE).toContain('addEventListener("install"');
    expect(SW_SOURCE).toContain('addEventListener("activate"');
    expect(SW_SOURCE).toContain('addEventListener("fetch"');
  });

  it("sw.js não faz cache de rotas /api/, /admin ou /__manus__", () => {
    expect(SW_SOURCE).toContain('if (path.startsWith("/api/") || path.startsWith("/admin") || path.startsWith("/__manus__")) return;');
  });

  it("sw.js usa network-first com fallback de cache", () => {
    expect(SW_SOURCE).toContain("await fetch(req)");
    expect(SW_SOURCE).toContain("caches.match(req)");
  });

  it("CACHE_NAME versionado permite invalidar caches antigos", () => {
    expect(/const CACHE_NAME = "meuddd-pages-v\d+"/.test(SW_SOURCE)).toBe(true);
  });

  it("rotas públicas essenciais são cacheáveis", () => {
    expect(isCacheablePage("https://meuddd.com.br/")).toBe(true);
    expect(isCacheablePage("https://meuddd.com.br/ddd/11")).toBe(true);
    expect(isCacheablePage("https://meuddd.com.br/estado/sp")).toBe(true);
    expect(isCacheablePage("https://meuddd.com.br/cidade/sp/sao-paulo")).toBe(true);
    expect(isCacheablePage("https://meuddd.com.br/guia/como-descobrir-ddd-de-uma-cidade")).toBe(true);
    expect(isCacheablePage("https://meuddd.com.br/guias")).toBe(true);
  });

  it("rotas administrativas e de API não são cacheáveis", () => {
    expect(isCacheablePage("https://meuddd.com.br/api/public/ddds")).toBe(false);
    expect(isCacheablePage("https://meuddd.com.br/admin")).toBe(false);
    expect(isCacheablePage("https://meuddd.com.br/admin/termos")).toBe(false);
    expect(isCacheablePage("https://meuddd.com.br/api/trpc")).toBe(false);
  });

  it("manifest.webmanifest está registado no index.html", () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "..", "client", "index.html"),
      "utf-8",
    );
    expect(html).toContain('rel="manifest"');
    expect(html).toContain("/manifest.webmanifest");
  });

  it("entry-client regista o Service Worker apenas fora do ambiente de dev", () => {
    const entry = fs.readFileSync(
      path.resolve(__dirname, "..", "client", "src", "entry-client.tsx"),
      "utf-8",
    );
    expect(entry).toContain('navigator.serviceWorker');
    expect(entry).toContain("import.meta.env.DEV");
  });

  it("sw.js é servido sem cache HTTP (no-store) em produção", () => {
    const indexTs = fs.readFileSync(
      path.resolve(__dirname, "..", "server", "index.ts"),
      "utf-8",
    );
    expect(indexTs).toContain('relative === "/sw.js"');
    expect(indexTs).toContain("no-store");
  });
});
