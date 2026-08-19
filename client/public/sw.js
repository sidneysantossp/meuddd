/* Meu DDD — Service Worker
 * Estratégia: Network-first com fallback para cache das páginas consultadas.
 * As páginas visitadas (rotas públicas) ficam em cache para consulta offline,
 * com limpeza de cache antigo em cada instalação.
 */

const CACHE_NAME = "meuddd-pages-v1";
const SHELL_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
];

// Rotas públicas que podem ser cacheadas em cache separado
const PAGE_PATTERNS = [
  /^\/$/,
  /^\/ddd\/\d{2}$/,
  /^\/estado\/[a-z]{2}$/,
  /^\/cidade\/[a-z]{2}\/[a-z0-9-]+$/,
  /^\/regiao\/[a-z-]+$/,
  /^\/guia\/[a-z0-9-]+$/,
  /^\/guias$/,
];

// Rotas que nunca devem entrar no cache (API, admin, trpc, assets hashados do vite usam outro mecanismo)
function isCacheablePage(url) {
  try {
    const pathname = new URL(url).pathname;
    return PAGE_PATTERNS.some(re => re.test(pathname));
  } catch {
    return false;
  }
}

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(SHELL_ASSETS).catch(() => {
        // Falha parcial não impede a instalação; o shell é reposto na primeira visita.
      });
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // Apenas GET, mesmo origem, documentos e imagem de origem
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) return;

  // Ignorar trpc, api pública (dados frescos), admin e assets versionados do vite
  const path = url.pathname;
  if (path.startsWith("/api/") || path.startsWith("/admin") || path.startsWith("/__manus__")) return;
  if (/\.[a-f0-9]{8}\.(js|css)$/.test(path)) return;

  const looksLikeDocument = req.headers.get("accept")?.includes("text/html");

  if (looksLikeDocument && isCacheablePage(url.toString())) {
    // Network-first: tenta rede, faz cache da resposta válida; em offline, serve cache.
    event.respondWith(
      (async () => {
        try {
          const networkRes = await fetch(req);
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(async cache => {
                await cache.put(req, clone);
              }),
            );
          }
          return networkRes;
        } catch {
          const cached = await caches.match(req);
          return cached || new Response("Você está offline e esta página ainda não foi consultada.", {
            status: 503,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      })(),
    );
    return;
  }

  // Assets estáticos (JS/CSS/fontes): cache-first
  if (/\.(js|css|woff2?|png|svg|ico)$/.test(path)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const res = await fetch(req);
          if (res && res.ok) {
            const clone = res.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(async cache => {
                await cache.put(req, clone);
              }),
            );
          }
          return res;
        } catch {
          return cached || new Response("", { status: 503 });
        }
      })(),
    );
  }
});
