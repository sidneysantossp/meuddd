import { describe, expect, it } from "vitest";
import { __testables } from "./db";

describe("agregação de DDDs", () => {
  it("agrupa municípios pelo DDD, preserva estados únicos e oferece amostra de cidades", () => {
    const summaries = __testables.groupDddRows([
      { ibgeCode: 1, name: "Brasília", ddd: "61", latitude: "0", longitude: "0", capital: true, timezone: "America/Sao_Paulo", stateName: "Distrito Federal", uf: "DF", region: "Centro-Oeste" },
      { ibgeCode: 2, name: "Goiânia", ddd: "62", latitude: "0", longitude: "0", capital: true, timezone: "America/Sao_Paulo", stateName: "Goiás", uf: "GO", region: "Centro-Oeste" },
      { ibgeCode: 3, name: "Anápolis", ddd: "62", latitude: "0", longitude: "0", capital: false, timezone: "America/Sao_Paulo", stateName: "Goiás", uf: "GO", region: "Centro-Oeste" },
    ]);

    expect(summaries).toEqual([
      expect.objectContaining({ code: "61", cityCount: 1, sampleCities: ["Brasília"] }),
      expect.objectContaining({ code: "62", cityCount: 2, sampleCities: ["Goiânia", "Anápolis"] }),
    ]);
    expect(summaries[1]?.states).toEqual([{ name: "Goiás", uf: "GO", region: "Centro-Oeste" }]);
  });
});

describe("reserva territorial para SSR", () => {
  it("mantém o catálogo nacional consultável quando a ligação de base de dados não está disponível", () => {
    const ddd11 = __testables.staticMunicipalities({ ddd: "11" });
    const saoPaulo = __testables.staticMunicipalities({ uf: "SP", slug: "sao-paulo" });

    expect(ddd11.length).toBeGreaterThan(1);
    expect(ddd11.every(item => item.ddd === "11")).toBe(true);
    expect(saoPaulo).toHaveLength(1);
    expect(saoPaulo[0]).toMatchObject({ name: "São Paulo", uf: "SP", ddd: "11" });
  });
});
