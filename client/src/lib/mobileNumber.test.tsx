import { describe, expect, it } from "vitest";
import { createMobileSubscriber, formatMobileNumber, sanitizeMobileSubscriber } from "./mobileNumber";

describe("simulador de número móvel", () => {
  it("normaliza a parte móvel para nove dígitos", () => {
    expect(sanitizeMobileSubscriber("9 8765-4321abc")).toBe("987654321");
  });

  it("gera um exemplo que inicia no nono dígito móvel", () => {
    expect(createMobileSubscriber(() => 0.12345678)).toBe("912345678");
  });

  it("formata o exemplo com DDD e separadores brasileiros", () => {
    expect(formatMobileNumber("11", "987654321")).toBe("(11) 98765-4321");
  });
});
