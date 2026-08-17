import { describe, expect, it } from "vitest";
import { PRIORITY_DDD_EDITORIAL } from "./DddDetail";

describe("conteúdo editorial dos DDDs prioritários", () => {
  it("mantém respostas territoriais específicas para os DDDs prioritários", () => {
    expect(PRIORITY_DDD_EDITORIAL["63"]).toMatchObject({
      state: "Tocantins",
      uf: "TO",
    });
    expect(PRIORITY_DDD_EDITORIAL["96"]).toMatchObject({
      state: "Amapá",
      uf: "AP",
    });
    expect(PRIORITY_DDD_EDITORIAL["82"]).toMatchObject({
      state: "Alagoas",
      uf: "AL",
    });
    expect(PRIORITY_DDD_EDITORIAL["68"]).toMatchObject({
      state: "Acre",
      uf: "AC",
    });
    expect(PRIORITY_DDD_EDITORIAL["86"]).toMatchObject({
      state: "Piauí",
      uf: "PI",
    });
    expect(PRIORITY_DDD_EDITORIAL["27"]).toMatchObject({
      state: "Espírito Santo",
      uf: "ES",
    });
    expect(PRIORITY_DDD_EDITORIAL["61"]).toMatchObject({
      state: "Distrito Federal",
      uf: "DF",
    });
  });
});
