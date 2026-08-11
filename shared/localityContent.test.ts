import { describe, expect, it } from "vitest";
import { getLocalityContent, mapSearchUrl } from "./localityContent";

describe("conteúdo local verificável", () => {
  it("expõe o contexto institucional de Barueri sem depender da capitalização da URL", () => {
    const content = getLocalityContent("SP", "Barueri");
    expect(content?.history?.source.url).toContain("portal.barueri.sp.gov.br");
    expect(content?.parks).toHaveLength(3);
    expect(content?.mobility?.body).toContain("Linha 8-Diamante");
  });

  it("mantém conteúdo atribuído e mobilidade contextualizada nas capitais prioritárias", () => {
    const capitals = [
      ["MG", "Belo-Horizonte", "portalbelohorizonte.com.br"],
      ["PR", "Curitiba", "curitiba.pr.gov.br"],
      ["RS", "Porto-Alegre", "destinopoa.com.br"],
      ["BA", "Salvador", "secult.salvador.ba.gov.br"],
      ["PE", "Recife", "recife.pe.gov.br"],
      ["CE", "Fortaleza", "fortaleza.ce.gov.br"],
    ] as const;
    for (const [uf, slug, sourceDomain] of capitals) {
      const content = getLocalityContent(uf, slug);
      expect(content?.history?.source.url).toContain(sourceDomain);
      expect(content?.parks?.length).toBeGreaterThan(0);
      expect(content?.mobility?.href).toMatch(/^https:\/\//);
      expect(content?.municipalServices?.length).toBeGreaterThan(0);
    }
  });

  it("mantém a mesma estrutura rica nas três capitais solicitadas", () => {
    const capitals = [["MG", "Belo-Horizonte"], ["BA", "Salvador"], ["PR", "Curitiba"]] as const;
    for (const [uf, slug] of capitals) {
      const content = getLocalityContent(uf, slug);
      expect(content?.history?.body).toBeTruthy();
      expect(content?.heritage?.length).toBeGreaterThan(0);
      expect(content?.parks?.length).toBeGreaterThan(0);
      expect(content?.mobility?.href).toMatch(/^https:\/\//);
      expect(content?.municipalServices?.length).toBeGreaterThan(0);
    }
  });

  it("mantém turismo, património, parques, mobilidade e serviços nas fichas de Porto Alegre, Recife e Fortaleza", () => {
    const capitals = [["RS", "Porto-Alegre"], ["PE", "Recife"], ["CE", "Fortaleza"]] as const;
    for (const [uf, slug] of capitals) {
      const content = getLocalityContent(uf, slug);
      expect(content?.history?.body).toBeTruthy();
      expect(content?.heritage?.length).toBeGreaterThan(0);
      expect(content?.parks?.length).toBeGreaterThan(0);
      expect(content?.mobility?.href).toMatch(/^https:\/\//);
      expect(content?.municipalServices?.length).toBeGreaterThan(0);
    }
  });

  it("mantém fontes institucionais e estrutura local completa em Manaus, Belém e Goiânia", () => {
    const capitals = [
      ["AM", "Manaus", "manaus.am.gov.br"],
      ["PA", "Belem", "prefeitura.belem.pa.gov.br"],
      ["GO", "Goiania", "goiania.go.gov.br"],
    ] as const;
    for (const [uf, slug, sourceDomain] of capitals) {
      const content = getLocalityContent(uf, slug);
      expect(content?.history?.source.url).toContain(sourceDomain);
      expect(content?.heritage?.length).toBeGreaterThan(0);
      expect(content?.parks?.length).toBeGreaterThan(0);
      expect(content?.mobility?.href).toMatch(/^https:\/\//);
      expect(content?.municipalServices?.length).toBeGreaterThan(0);
    }
  });

  it("devolve apenas um URL de pesquisa de mapa devidamente codificado", () => {
    expect(mapSearchUrl("Bares e restaurantes em Barueri, SP")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Bares%20e%20restaurantes%20em%20Barueri%2C%20SP",
    );
  });
});
