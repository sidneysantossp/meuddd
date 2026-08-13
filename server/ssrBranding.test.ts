import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
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

  it("omite a pesquisa territorial vazia do estado SSR, mas mantém a consulta quando há uma UF na URL", async () => {
    const search = vi.fn(async () => []);
    const prefetch = {
      states: async () => [],
      search,
      byCode: async () => null,
      byState: async () => null,
      byMunicipality: async () => null,
    };

    await prefetchForPath("/", new QueryClient(), prefetch);
    expect(search).not.toHaveBeenCalled();

    await prefetchForPath("/?uf=PA", new QueryClient(), prefetch);
    expect(search).toHaveBeenCalledWith({ query: undefined, uf: "PA" });
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
    expect(head.jsonLd?.[2]).toMatchObject({
      "@type": "SoftwareApplication",
      isAccessibleForFree: true,
    });
    expect(head.jsonLd?.[3]).toMatchObject({
      "@type": "FAQPage",
      mainEntity: expect.arrayContaining([expect.objectContaining({ name: "O número gerado é real ou está disponível?" })]),
    });
  });
});
