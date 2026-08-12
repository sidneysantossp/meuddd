import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BlogHighlights } from "./BlogHighlights";

describe("secção Blog em destaque", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<BlogHighlights />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("apresenta três artigos reais com imagem, data, leitura e CTA de conteúdo", () => {
    expect(container.querySelector("h2")?.textContent).toBe("Blog");
    expect(container.querySelectorAll("article")).toHaveLength(3);
    expect(container.querySelectorAll("img")).toHaveLength(3);
    expect(Array.from(container.querySelectorAll("time"))).toHaveLength(3);
    expect(Array.from(container.querySelectorAll("a")).filter(link => link.textContent?.includes("Ler mais"))).toHaveLength(3);
    expect(Array.from(container.querySelectorAll("a")).find(link => link.textContent?.includes("Ver mais conteúdo"))?.getAttribute("href")).toBe("/guias");
  });
});
