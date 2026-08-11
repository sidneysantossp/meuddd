import { describe, expect, it } from "vitest";
import { __testables } from "./db";

const rows = [
  { ibgeCode: 3550308, name: "São Paulo", stateName: "São Paulo", region: "Sudeste", uf: "SP", ddd: "11" },
  { ibgeCode: 2927408, name: "Salvador", stateName: "Bahia", region: "Nordeste", uf: "BA", ddd: "71" },
] as Parameters<typeof __testables.fuzzyFilterMunicipalities>[0];

describe("pesquisa territorial normalizada", () => {
  it("remove diacríticos sem alterar o significado da consulta", () => {
    expect(__testables.normalizeSearch("São Luís")).toBe("sao luis");
  });

  it("encontra uma cidade sem acentos e com pequeno erro ortográfico", () => {
    expect(__testables.fuzzyFilterMunicipalities(rows, "Sao Paolo").map(row => row.name)).toContain("São Paulo");
  });

  it("tolera uma grafia aproximada do nome do estado", () => {
    expect(__testables.fuzzyFilterMunicipalities(rows, "Baia").map(row => row.name)).toContain("Salvador");
  });
});
