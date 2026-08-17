import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { prefetchForPath } from "../client/src/ssr/prefetch";
import { editorialGuides } from "../shared/editorialGuides";

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
      mainEntity: expect.arrayContaining([
        expect.objectContaining({
          name: "O número gerado é real ou está disponível?",
        }),
      ]),
    });
  });

  it("resolve o guia canónico de como descobrir o DDD de uma cidade por SSR", async () => {
    const path = "/guia/como-descobrir-ddd-de-uma-cidade";
    const head = await prefetchForPath(path, new QueryClient(), {
      states: async () => [],
      search: async () => [],
      byCode: async () => null,
      byState: async () => null,
      byMunicipality: async () => null,
      capitals: async () => [],
    });

    expect(head).toMatchObject({
      title: "Como descobrir o DDD de uma cidade brasileira | Meu DDD",
      canonicalPath: path,
      ogType: "article",
    });
    expect(head.notFound).not.toBe(true);
    expect(head.jsonLd).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Article",
          headline: "Como descobrir o DDD de uma cidade brasileira",
        }),
      ])
    );
  });

  it("resolve todos os slugs editoriais por rota direta com metadados SSR", async () => {
    const prefetch = {
      states: async () => [],
      search: async () => [],
      byCode: async () => null,
      byState: async () => null,
      byMunicipality: async () => null,
      capitals: async () => [],
    };
    const heads = await Promise.all(
      editorialGuides.map(guide =>
        prefetchForPath(`/guia/${guide.slug}`, new QueryClient(), prefetch)
      )
    );

    expect(heads).toHaveLength(editorialGuides.length);
    heads.forEach((head, index) => {
      const guide = editorialGuides[index];
      expect(head).toMatchObject({
        title: `${guide.title} | Meu DDD`,
        canonicalPath: `/guia/${guide.slug}`,
        ogType: "article",
      });
      expect(head.notFound).not.toBe(true);
      expect(head.jsonLd).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": "Article",
            headline: guide.title,
          }),
        ])
      );
    });
  });

  it("inclui o FAQPage de dez perguntas dinâmicas nas rotas de estado e município", async () => {
    const stateHead = await prefetchForPath("/estado/sp", new QueryClient(), {
      states: async () => [],
      search: async () => [],
      byCode: async () => null,
      byState: async () =>
        ({
          state: {
            name: "São Paulo",
            uf: "SP",
            region: "Sudeste",
            populationEstimated: 11_000_000,
            populationReferenceYear: 2025,
          },
          cityCount: 645,
          ddds: [
            {
              code: "11",
              cityCount: 39,
              sampleCities: ["São Paulo", "Guarulhos"],
            },
          ],
          municipalities: [],
        }) as never,
      byMunicipality: async () => null,
    });
    const municipalityHead = await prefetchForPath(
      "/cidade/sp/sao-paulo",
      new QueryClient(),
      {
        states: async () => [],
        search: async () => [],
        byCode: async () => null,
        byState: async () => null,
        byMunicipality: async () =>
          ({
            municipality: {
              name: "São Paulo",
              ddd: "11",
              populationEstimated: 11_000_000,
              latitude: -23.55,
              longitude: -46.63,
            },
            state: {
              name: "São Paulo",
              uf: "SP",
              region: "Sudeste",
              populationEstimated: 11_000_000,
              populationReferenceYear: 2025,
            },
            ddd: {
              code: "11",
              cityCount: 39,
              sampleCities: ["São Paulo", "Guarulhos"],
            },
            relatedMunicipalities: [],
          }) as never,
      }
    );

    const stateFaq = stateHead.jsonLd?.find(
      entry => entry["@type"] === "FAQPage"
    );
    const municipalityFaq = municipalityHead.jsonLd?.find(
      entry => entry["@type"] === "FAQPage"
    );

    expect(stateFaq).toMatchObject({
      mainEntity: expect.arrayContaining([
        expect.objectContaining({
          name: "Como ligar de outro estado para São Paulo?",
        }),
      ]),
    });
    expect(stateFaq?.mainEntity as unknown[]).toHaveLength(10);
    expect(municipalityFaq).toMatchObject({
      mainEntity: expect.arrayContaining([
        expect.objectContaining({
          name: "Como formatar um número de telefone de São Paulo?",
        }),
      ]),
    });
    expect(municipalityFaq?.mainEntity as unknown[]).toHaveLength(10);
  });
});
