import { describe, expect, it } from "vitest";
import { geolocationFailure, stateSelection, territorySelection } from "./territoryDiscovery";

describe("descoberta territorial", () => {
  it("limpa a consulta e aplica a UF ao selecionar um badge", () => {
    expect(stateSelection("BA")).toEqual({ query: "", uf: "BA" });
  });

  it("preenche DDD e UF com a sugestão territorial recebida após consentimento", () => {
    expect(territorySelection({ municipalityName: "Salvador", stateName: "Bahia", uf: "BA", ddd: "71", distanceKm: 1.2 })).toEqual({
      query: "71",
      uf: "BA",
      label: "Localização aproximada: Salvador · BA. Sugerimos o DDD 71.",
    });
  });

  it("mantém uma alternativa de pesquisa manual quando a permissão é recusada", () => {
    expect(geolocationFailure(1)).toEqual({
      status: "denied",
      label: "Permissão não concedida. Você pode pesquisar por cidade, UF ou DDD.",
    });
  });
});
