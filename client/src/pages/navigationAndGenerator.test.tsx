import { describe, expect, it } from "vitest";
import { MAIN_NAV_ITEMS } from "./Home";
import { GENERATOR_SIMULATION_NOTICE } from "./Generator";

describe("navegação e aviso do gerador", () => {
  it("expõe o gerador como destino da navegação principal", () => {
    expect(MAIN_NAV_ITEMS).toContainEqual({ href: "/gerador", label: "Gerar número" });
  });

  it("explica que os exemplos não possuem vínculo com telefones reais", () => {
    expect(GENERATOR_SIMULATION_NOTICE).toMatch(/simulação e testes/i);
    expect(GENERATOR_SIMULATION_NOTICE).toMatch(/vínculo com números reais/i);
  });
});
