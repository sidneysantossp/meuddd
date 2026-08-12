import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PUBLIC_NAV_ITEMS, PublicNavbar } from "./PublicNavbar";

describe("navbar pública", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<PublicNavbar />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("mantém os mesmos destinos prioritários em todas as páginas públicas", () => {
    expect(PUBLIC_NAV_ITEMS).toEqual([
      { href: "/#buscar", label: "Buscar DDD" },
      { href: "/#mapa", label: "Mapa interativo" },
      { href: "/guias", label: "Guias" },
      { href: "/gerador", label: "Gerar número" },
    ]);
  });

  it("expõe a navegação e o acionador de menu móvel de forma acessível", () => {
    expect(container.querySelector('nav[aria-label="Navegação principal"]')).toBeTruthy();
    expect(Array.from(container.querySelectorAll("a")).find(link => link.textContent === "Gerar número")?.getAttribute("href")).toBe("/gerador");
    const toggle = container.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe("public-mobile-navigation");

    act(() => toggle.click());

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector("#public-mobile-navigation")?.textContent).toContain("Gerar número");
  });

  it("preserva uma ação contextual, como a partilha, dentro do menu móvel", () => {
    act(() => root.render(<PublicNavbar endSlot={<button type="button">Partilhar página</button>} />));

    const toggle = container.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    act(() => toggle.click());

    expect(container.querySelector("#public-mobile-navigation")?.textContent).toContain("Partilhar página");
  });
});
