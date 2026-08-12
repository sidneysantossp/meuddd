import { describe, expect, it } from "vitest";
import { STATE_CONNECTIONS } from "./BrazilStateMap";

describe("conexões do mapa estadual", () => {
  it("mantém conexões decorativas entre estados distintos", () => {
    expect(STATE_CONNECTIONS).toHaveLength(6);
    expect(STATE_CONNECTIONS.every(([from, to]) => from !== to)).toBe(true);
    expect(STATE_CONNECTIONS).toContainEqual(["SP", "RJ"]);
  });
});
