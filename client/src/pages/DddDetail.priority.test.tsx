import { describe, expect, it } from "vitest";
import { PRIORITY_DDD_EDITORIAL } from "./DddDetail";

describe("conteúdo editorial dos DDDs prioritários", () => {
  it("mantém respostas territoriais específicas para os DDDs 63 e 96", () => {
    expect(PRIORITY_DDD_EDITORIAL["63"]).toMatchObject({ state: "Tocantins", uf: "TO" });
    expect(PRIORITY_DDD_EDITORIAL["96"]).toMatchObject({ state: "Amapá", uf: "AP" });
  });
});
