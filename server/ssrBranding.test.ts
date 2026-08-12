import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { prefetchForPath } from "../client/src/ssr/prefetch";

describe("metadados SSR da marca Meu DDD", () => {
  it("expõe a nova marca no título e no Website Schema.org da página inicial", async () => {
    const head = await prefetchForPath("/", new QueryClient(), {
      states: async () => [],
      search: async () => [],
      byCode: async () => null,
      byState: async () => null,
      byMunicipality: async () => null,
    });

    expect(head.title).toBe("Meu DDD — Consulte DDDs de todo o Brasil");
    expect(head.jsonLd?.[0]).toMatchObject({
      "@type": "WebSite",
      name: "Meu DDD",
    });
  });

  it("descreve o gerador de número móvel com URL canónica e dados estruturados próprios", async () => {
    const head = await prefetchForPath("/gerador", new QueryClient(), {
      states: async () => [],
      search: async () => [],
      byCode: async () => null,
      byState: async () => null,
      byMunicipality: async () => null,
    });

    expect(head).toMatchObject({
      title: "Gerador de número de celular por DDD | Meu DDD",
      canonicalPath: "/gerador",
      ogType: "website",
    });
    expect(head.jsonLd?.[1]).toMatchObject({
      "@type": "WebPage",
      name: "Gerador de número de celular por DDD",
      url: "/gerador",
    });
  });
});
