import { describe, expect, it } from "vitest";
import { ALLOWED_EXTERNAL_HOSTS, isAllowedExternal, sanitizeExternalLinks, OFFICIAL_URLS } from "../shared/externalLinks";

describe("política de links externos", () => {
  it("permite domínios governamentais, Google Maps e climate-data.org", () => {
    expect(isAllowedExternal("https://www.gov.br/anatel/pt-br")).toBe(true);
    expect(isAllowedExternal("https://osasco.sp.gov.br/feiras-livres/")).toBe(true);
    expect(isAllowedExternal("https://penedo.al.gov.br/x")).toBe(true);
    expect(isAllowedExternal("https://www.ibge.gov.br/cidades-e-estados/sp.html")).toBe(true);
    expect(isAllowedExternal("https://cidades.ibge.gov.br/v4/brasil/sp/osasco/panorama")).toBe(true);
    expect(isAllowedExternal("https://www.google.com/maps/search/?api=1&query=x")).toBe(true);
    expect(isAllowedExternal("https://pt.climate-data.org/america-do-sul/brasil/sp/osasco/")).toBe(true);
    expect(isAllowedExternal("https://en.climate-data.org/south-america/brazil/sp/osasco-1/")).toBe(true);
  });

  it("rejeita portais comerciais e de terceiros", () => {
    expect(isAllowedExternal("https://www.rome2rio.com/pt/")).toBe(false);
    expect(isAllowedExternal("https://www.tripadvisor.com.br/")).toBe(false);
    expect(isAllowedExternal("https://www.climatempo.com.br/")).toBe(false);
    expect(isAllowedExternal("https://weatherspark.com/y/1/")).toBe(false);
    expect(isAllowedExternal("https://www.sinart.com.br/x")).toBe(false);
    expect(isAllowedExternal("https://www.metrocptm.com.br/linha-9/")).toBe(false);
    expect(isAllowedExternal("https://pt.wikipedia.org/x")).toBe(false);
    expect(isAllowedExternal("https://g1.globo.com/x")).toBe(false);
    expect(isAllowedExternal("https://www.buson.com.br/x")).toBe(false);
    expect(isAllowedExternal("https://visitealagoas.com.br/x")).toBe(false);
    expect(isAllowedExternal("https://rodoviaria.de/x")).toBe(false);
    expect(isAllowedExternal("javascript:alert(1)")).toBe(false);
  });

  it("sanitizeExternalLinks remove hrefs e mapHrefs proibidos e preserva os permitidos", () => {
    const input = {
      tourism: { items: [{ name: "Praça", description: "[site oficial](https://osasco.sp.gov.br/x)" }] },
      transport: { items: [{ name: "Aeroporto", description: "perto", mapHref: "https://www.google.com/maps/search/?api=1&query=x" }] },
      climate: { body: "[clima](https://pt.climate-data.org/america-do-sul/brasil/sp/osasco/)", source: { label: "Climatempo", href: "https://www.climatempo.com.br/" } },
    };
    const out = sanitizeExternalLinks(input) as any;
    expect(out.tourism.items[0].description).toContain("site oficial");
    expect(out.transport.items[0].mapHref).toBe("https://www.google.com/maps/search/?api=1&query=x");
    expect(out.climate.body).toContain("clima");
    expect(out.climate.source).toBeUndefined();
  });

  it("OFFICIAL_URLS gera URLs válidas por UF e cidade", () => {
    expect(OFFICIAL_URLS.ibgeCity("SP", "osasco")).toBe("https://cidades.ibge.gov.br/v4/brasil/sp/osasco/panorama");
    expect(OFFICIAL_URLS.climateData("SP", "osasco")).toContain("pt.climate-data.org/america-do-sul/brasil/sp/osasco");
    expect(ALLOWED_EXTERNAL_HOSTS.length).toBeGreaterThan(0);
  });
});
