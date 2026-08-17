import { describe, expect, it, vi } from "vitest";
import { addRecentDdd, readRecentDdds, saveRecentDdds } from "./recentDdds";

describe("histórico local de DDDs", () => {
  it("mantém no máximo cinco DDDs distintos, com o mais recente primeiro", () => {
    expect(addRecentDdd(["11", "21", "31", "41", "51"], "61")).toEqual([
      "61",
      "11",
      "21",
      "31",
      "41",
    ]);
    expect(addRecentDdd(["11", "21"], "11")).toEqual(["11", "21"]);
  });

  it("persiste apenas códigos de dois dígitos e permite limpar o dispositivo", () => {
    const storage = {
      getItem: vi.fn(() => '["11","abc","21"]'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    expect(readRecentDdds(storage)).toEqual(["11", "21"]);

    saveRecentDdds(storage, ["11", "21"]);
    expect(storage.setItem).toHaveBeenCalledWith(
      "meu-ddd:recent-ddds:v1",
      '["11","21"]'
    );

    saveRecentDdds(storage, []);
    expect(storage.removeItem).toHaveBeenCalledWith("meu-ddd:recent-ddds:v1");
  });
});
