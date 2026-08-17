import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./LocalitySuggestionDialog", () => ({
  LocalitySuggestionDialog: () => (
    <button type="button">Sugerir alteração local</button>
  ),
}));

import { LocalityContext } from "./LocalityContext";

describe("contexto local", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() =>
      root.render(
        <LocalityContext
          name="Boa Vista do Ramos"
          stateName="Amazonas"
          uf="AM"
          slug="boa-vista-do-ramos"
          municipalityIbgeCode={1300688}
        />
      )
    );
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("apresenta a sugestão local depois do link de códigos de emergência", () => {
    const emergencyLink = Array.from(container.querySelectorAll("a")).find(
      link => link.textContent?.includes("Códigos nacionais de emergência")
    );
    const suggestionButton = Array.from(
      container.querySelectorAll("button")
    ).find(button => button.textContent?.includes("Sugerir alteração local"));

    expect(emergencyLink).toBeTruthy();
    expect(suggestionButton).toBeTruthy();
    expect(emergencyLink?.compareDocumentPosition(suggestionButton!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
