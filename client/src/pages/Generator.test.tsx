import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const toastSuccess = vi.hoisted(() => vi.fn());

vi.mock("sonner", () => ({ toast: { success: toastSuccess, error: vi.fn() } }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    ddd: {
      states: { useQuery: () => ({ data: [{ uf: "SP", name: "São Paulo" }, { uf: "RJ", name: "Rio de Janeiro" }], isLoading: false, isError: false }) },
      byState: { useQuery: ({ uf }: { uf: string }) => ({ data: { ddds: uf === "RJ" ? [{ code: "21", cityCount: 24 }] : [{ code: "11", cityCount: 64 }] }, isLoading: false, isError: false }) },
    },
  },
}));

import Generator from "./Generator";

describe("página do gerador", () => {
  let container: HTMLDivElement;
  let root: Root;
  const writeText = vi.fn();

  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    writeText.mockResolvedValue(undefined);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<Generator />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("permite selecionar UF/DDD, gerar, copiar e explica que o resultado é uma simulação", async () => {
    const stateSelect = container.querySelector('[aria-label="Selecionar estado"]') as HTMLSelectElement;
    await act(async () => {
      stateSelect.value = "RJ";
      stateSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect((container.querySelector('[aria-label="Selecionar DDD"]') as HTMLSelectElement).value).toBe("21");

    vi.spyOn(Math, "random").mockReturnValue(0.12345678);
    await act(async () => { (Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Gerar novo")) as HTMLButtonElement).click(); });
    expect(container.querySelector("output")?.textContent).toBe("(21) 91234-5678");

    await act(async () => { (Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Copiar")) as HTMLButtonElement).click(); await Promise.resolve(); });
    expect(writeText).toHaveBeenCalledWith("(21) 91234-5678");
    expect(toastSuccess).toHaveBeenCalledWith("Número simulado copiado.");
    expect(container.textContent).toContain("Não confirma se o número existe");
    expect(container.textContent).toContain("vínculo com números reais");
  });
});
