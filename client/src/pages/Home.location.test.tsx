import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

type Territory = { municipalityName: string; stateName: string; uf: string; ddd: string; distanceKm: number };

const mocks = vi.hoisted(() => ({
  onNearbySuccess: undefined as undefined | ((territory: Territory) => void),
}));

vi.mock("wouter", () => ({
  Link: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <a {...props}>{children}</a>,
  useLocation: () => ["/", vi.fn()],
  useSearch: () => "",
}));

vi.mock("@/components/BrazilStateMap", () => ({ BrazilStateMap: () => <div data-testid="state-map" /> }));
vi.mock("@/components/PublicNavbar", () => ({ PUBLIC_NAV_ITEMS: [], PublicNavbar: () => <nav /> }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn(), message: vi.fn() } }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    ddd: {
      states: { useQuery: () => ({ data: [{ name: "São Paulo", uf: "SP" }], isLoading: false }) },
      search: { useQuery: () => ({ data: [], isLoading: false, isSuccess: true }) },
      recordUnmatchedSearch: { useMutation: () => ({ mutate: vi.fn() }) },
      resolveNearbyTerritory: { useMutation: () => ({ mutate: (_input: unknown, options: { onSuccess: (territory: Territory) => void }) => { mocks.onNearbySuccess = options.onSuccess; } }) },
    },
  },
}));

describe("feedback de localização na página inicial", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    mocks.onNearbySuccess = undefined;
    container = document.createElement("div");
    document.body.appendChild(container);
    window.requestAnimationFrame = callback => { callback(0); return 0; };
    Element.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition: (success: (position: GeolocationPosition) => void) => success({ coords: { latitude: -23.55, longitude: -46.63 } } as GeolocationPosition) },
    });
  });

  afterEach(async () => {
    await act(async () => root?.unmount());
    container.remove();
  });

  it("exibe o progresso enquanto resolve o território e permite limpar a sugestão", async () => {
    await act(async () => {
      root = createRoot(container);
      root.render(<Home />);
    });

    const locateButton = Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Usar localização aproximada"));
    expect(locateButton).toBeTruthy();
    expect(Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Aproximada (recomendada)"))?.getAttribute("aria-pressed")).toBe("true");

    await act(async () => locateButton?.click());

    const status = container.querySelector('[role="status"]');
    expect(status?.textContent).toContain("A identificar o território mais próximo");
    expect(locateButton?.disabled).toBe(true);

    await act(async () => mocks.onNearbySuccess?.({ municipalityName: "São Paulo", stateName: "São Paulo", uf: "SP", ddd: "11", distanceKm: 0.8 }));

    expect(container.textContent).toContain("Localização aproximada: São Paulo · SP. Sugerimos o DDD 11.");
    const clearButton = Array.from(container.querySelectorAll("button")).find(button => button.textContent?.includes("Limpar sugestão"));
    expect(clearButton).toBeTruthy();

    await act(async () => clearButton?.click());

    expect(container.textContent).not.toContain("Localização aproximada: São Paulo · SP. Sugerimos o DDD 11.");
    expect((container.querySelector("input") as HTMLInputElement).value).toBe("");
    expect((container.querySelector("select") as HTMLSelectElement).value).toBe("");
  });
});
