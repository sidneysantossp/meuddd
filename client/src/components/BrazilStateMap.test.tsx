import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrazilStateMap } from "./BrazilStateMap";

const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const geojson = {
  features: UFS.map((uf, index) => {
    const longitude = -74 + (index % 9);
    const latitude = -5 - Math.floor(index / 9);
    return {
      properties: { sigla: uf },
      geometry: { type: "Polygon" as const, coordinates: [[[longitude, latitude], [longitude + 0.8, latitude], [longitude + 0.8, latitude - 0.8], [longitude, latitude - 0.8], [longitude, latitude]]] },
    };
  }),
};

describe("BrazilStateMap", () => {
  let container: HTMLDivElement;
  let root: Root;
  let observeMap: ((entries: IntersectionObserverEntry[]) => void) | undefined;
  const onStateSelect = vi.fn();

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => geojson }));
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: (entries: IntersectionObserverEntry[]) => void) { observeMap = callback; }
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
      readonly root = null;
      readonly rootMargin = "240px 0px";
      readonly thresholds = [];
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("desenha um limite carregado e seleciona o estado quando o utilizador clica", async () => {
    await act(async () => {
      root.render(<BrazilStateMap states={[{ name: "São Paulo", uf: "SP", region: "Sudeste", cityCount: 645, dddCount: 10 }]} onStateSelect={onStateSelect} />);
    });
    expect(fetch).not.toHaveBeenCalled();

    await act(async () => {
      observeMap?.([{ isIntersecting: true } as IntersectionObserverEntry]);
      vi.advanceTimersByTime(450);
      await Promise.resolve();
      await Promise.resolve();
    });

    const state = container.querySelector('[aria-label="Selecionar São Paulo, SP"]') as SVGPathElement;
    expect(state).toBeTruthy();
    expect(container.querySelectorAll('path[role="listitem"]')).toHaveLength(27);
    expect(container.querySelectorAll(".state-connection-midpoint")).toHaveLength(6);
    act(() => state.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(onStateSelect).toHaveBeenCalledWith("SP");
  });
});
