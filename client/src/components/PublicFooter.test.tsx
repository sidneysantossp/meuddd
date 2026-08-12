import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PublicFooter } from "./PublicFooter";

describe("footer público", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<PublicFooter />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("expõe navegação institucional, legal, utilitária e social sem repetir o diretório de UFs", () => {
    expect(container.textContent).toContain("© 2026 Meu DDD");
    expect(Array.from(container.querySelectorAll("a")).find(link => link.textContent === "Gerador de número")?.getAttribute("href")).toBe("/gerador");
    expect(Array.from(container.querySelectorAll("a")).find(link => link.textContent === "Blog")?.getAttribute("href")).toBe("/guias");
    expect(Array.from(container.querySelectorAll("a")).find(link => link.textContent === "LGPD")?.getAttribute("href")).toBe("/lgpd");
    expect(container.querySelectorAll('a[target="_blank"]').length).toBe(3);
    expect(container.textContent).not.toContain("Acre");
  });
});
