import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import InstitutionalPage from "./InstitutionalPage";

describe("páginas institucionais", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.history.pushState({}, "", "/");
  });

  it("disponibiliza o kit de marca e estatísticas na página de imprensa", () => {
    window.history.pushState({}, "", "/imprensa");
    act(() => root.render(<InstitutionalPage />));

    expect(container.textContent).toContain("Kit de marca");
    expect(container.textContent).toContain("Em números");
    const kitHref = container.querySelector('a[download]')?.getAttribute("href") ?? "";
    expect(kitHref).toContain("meu-ddd-kit-de-marca-2026");
    // O proxy manus-storage com chave antiga devolvia HTTP 500 no domínio publicado;
    // a entrega deve usar apenas ativos republicados com chaves estáveis.
    expect(kitHref).not.toContain("a8693944");
    expect(kitHref).not.toMatch(/manus-storage\/(blog-consultar-ddd-cidade_0819cb9e|blog-ddd-mapa-brasil_57876089|blog-ligacao-entre-estados_42079c98|meu-ddd-kit-de-marca-2026_a8693944)/);
  });

  it("valida os campos obrigatórios do formulário de contacto", () => {
    window.history.pushState({}, "", "/contato");
    act(() => root.render(<InstitutionalPage />));

    expect(container.querySelector('input[type="email"]')).toBeTruthy();
    expect(container.querySelector("textarea")).toBeTruthy();
    const form = container.querySelector("form") as HTMLFormElement;
    act(() => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));

    expect(container.textContent).toContain("Informe o seu nome.");
    expect(container.textContent).toContain("Informe um email válido.");
    expect(container.textContent).toContain("pelo menos 10 caracteres");
  });
});
