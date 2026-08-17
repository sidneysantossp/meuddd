import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShareActions } from "./ShareActions";

const toastSuccess = vi.hoisted(() => vi.fn());
const toastError = vi.hoisted(() => vi.fn());

vi.mock("sonner", () => ({
  toast: { success: toastSuccess, error: toastError },
}));

describe("ShareActions", () => {
  let container: HTMLDivElement;
  let root: Root;
  const open = vi.fn();
  const writeText = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("open", open);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    window.history.replaceState({}, "", "/ddd/11");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    writeText.mockResolvedValue(undefined);
    act(() =>
      root.render(
        <ShareActions
          path="/ddd/11"
          title="DDD 11: cidades e estados abrangidos"
        />
      )
    );
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("gera destinos corretos para WhatsApp, LinkedIn e X", () => {
    const click = (label: string) =>
      (
        container.querySelector(`[aria-label="${label}"]`) as HTMLButtonElement
      ).click();
    act(() => click("Partilhar no WhatsApp"));
    act(() => click("Partilhar no LinkedIn"));
    act(() => click("Partilhar no X"));

    expect(open).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("wa.me/?text="),
      "_blank",
      "noopener,noreferrer"
    );
    expect(open).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(
        encodeURIComponent(`${window.location.origin}/ddd/11`)
      ),
      "_blank",
      "noopener,noreferrer"
    );
    expect(open).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("linkedin.com/sharing/share-offsite"),
      "_blank",
      "noopener,noreferrer"
    );
    expect(open).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining("x.com/intent/post"),
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("copia o URL absoluto e anuncia o sucesso", async () => {
    const button = container.querySelector(
      '[aria-label="Copiar link de partilha"]'
    ) as HTMLButtonElement;
    await act(async () => {
      button.click();
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/ddd/11`);
    expect(button.textContent).toContain("Copiado");
    expect(
      container.querySelector('[aria-live="polite"]')?.textContent
    ).toContain("Link copiado com sucesso");
    expect(toastSuccess).toHaveBeenCalledWith("Link copiado", {
      description: "A rota está pronta para partilhar.",
    });
  });
});
