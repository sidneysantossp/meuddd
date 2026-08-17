import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/PublicNavbar", () => ({
  PublicNavbar: () => <nav>Meu DDD</nav>,
}));
vi.mock("@/components/TerritoryTrustPanel", () => ({
  TerritoryTrustPanel: () => <aside>Fontes territoriais</aside>,
}));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    ddd: {
      capitals: {
        useQuery: () => ({
          isLoading: false,
          data: [
            {
              ibgeCode: 1501402,
              name: "Belém",
              slug: "belem",
              ddd: "91",
              populationEstimated: 1392711,
              populationReferenceYear: 2025,
              stateName: "Pará",
              uf: "PA",
              region: "Norte",
            },
            {
              ibgeCode: 3550308,
              name: "São Paulo",
              slug: "sao-paulo",
              ddd: "11",
              populationEstimated: 11904961,
              populationReferenceYear: 2025,
              stateName: "São Paulo",
              uf: "SP",
              region: "Sudeste",
            },
            {
              ibgeCode: 3205309,
              name: "Vitória",
              slug: "vitoria",
              ddd: "27",
              populationEstimated: 343378,
              populationReferenceYear: 2025,
              stateName: "Espírito Santo",
              uf: "ES",
              region: "Sudeste",
            },
          ],
        }),
      },
    },
  },
}));

import CapitalsIndexPage from "./CapitalsIndexPage";

describe("índice de capitais", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<CapitalsIndexPage />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("lista capitais com DDD e filtra o índice por região", async () => {
    expect(container.textContent).toContain("DDDs das capitais do Brasil");
    expect(container.textContent).toContain("Belém");
    expect(container.textContent).toContain("DDD");
    expect(container.textContent).toContain("91");

    const southeast = Array.from(container.querySelectorAll("button")).find(
      button => button.textContent === "Sudeste"
    ) as HTMLButtonElement;
    await act(async () => {
      southeast.click();
    });

    expect(container.textContent).toContain("São Paulo");
    expect(container.textContent).toContain("Vitória");
    expect(container.textContent).not.toContain("Belém");
    expect(southeast.getAttribute("aria-pressed")).toBe("true");
  });
});
