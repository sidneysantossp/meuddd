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
});
