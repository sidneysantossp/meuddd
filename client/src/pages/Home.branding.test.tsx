import { describe, expect, it } from "vitest";
import { HERO_TITLE_CLASS } from "./Home";

describe("identidade do herói Meu DDD", () => {
  it("mantém espaçamento positivo entre letras no título principal", () => {
    expect(HERO_TITLE_CLASS).toContain("tracking-[0.012em]");
  });
});
