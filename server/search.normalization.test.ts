import { describe, expect, it } from "vitest";
import { __testables } from "./db";

const rows = [
  {
    ibgeCode: 3550308,
    name: "São Paulo",
    stateName: "São Paulo",
    region: "Sudeste",
    uf: "SP",
    ddd: "11",
  },
  {
    ibgeCode: 2927408,
    name: "Salvador",
    stateName: "Bahia",
    region: "Nordeste",
    uf: "BA",
    ddd: "71",
  },
] as Parameters<typeof __testables.fuzzyFilterMunicipalities>[0];

describe("pesquisa territorial normalizada", () => {
  it("remove diacríticos sem alterar o significado da consulta", () => {
    expect(__testables.normalizeSearch("São Luís")).toBe("sao luis");
  });

  it("encontra uma cidade sem acentos e com pequeno erro ortográfico", () => {
    expect(
      __testables
        .fuzzyFilterMunicipalities(rows, "Sao Paolo")
        .map(row => row.name)
    ).toContain("São Paulo");
  });

  it("tolera uma grafia aproximada do nome do estado", () => {
    expect(
      __testables.fuzzyFilterMunicipalities(rows, "Baia").map(row => row.name)
    ).toContain("Salvador");
  });

  it("prepara uma pesquisa sem resultado para agregação sem dados pessoais", () => {
    expect(
      __testables.prepareUnmatchedSearch({ query: "  Sao Paolo  ", uf: "sp" })
    ).toEqual({
      normalizedQuery: "sao paolo",
      latestQuery: "Sao Paolo",
      selectedUf: "SP",
    });
  });

  it("não regista termos demasiado curtos ou apenas códigos numéricos", () => {
    expect(__testables.prepareUnmatchedSearch({ query: "a" })).toBeNull();
    expect(__testables.prepareUnmatchedSearch({ query: "11" })).toBeNull();
  });

  it("prepara sugestões locais moderáveis sem dados de contacto", () => {
    expect(
      __testables.prepareLocalitySuggestion({
        municipalityIbgeCode: 3550308,
        topic: "mobility",
        note: "  O link oficial de horários foi atualizado.  ",
      })
    ).toEqual({
      municipalityIbgeCode: 3550308,
      topic: "mobility",
      note: "O link oficial de horários foi atualizado.",
    });
    expect(
      __testables.prepareLocalitySuggestion({
        municipalityIbgeCode: 3550308,
        topic: "mobility",
        note: "curta",
      })
    ).toBeNull();
  });
});
