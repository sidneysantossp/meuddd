import React, { act } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import App, { preloadRouteForPath } from "./App";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    ddd: {
      states: { useQuery: () => ({ data: [], isLoading: false }) },
      search: { useQuery: () => ({ data: [], isLoading: false }) },
      recordUnmatchedSearch: { useMutation: () => ({ mutate: vi.fn() }) },
      resolveNearbyTerritory: { useMutation: () => ({ mutate: vi.fn() }) },
      byCode: { useQuery: () => ({ data: undefined, isLoading: false }) },
      byState: { useQuery: () => ({ data: undefined, isLoading: false }) },
      byMunicipality: {
        useQuery: () => ({ data: undefined, isLoading: false }),
      },
    },
    localityTabs: {
      byMunicipality: {
        useQuery: () => ({ data: undefined, isLoading: false }),
      },
    },
  },
}));

const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function RouteTree({
  path,
  server = false,
}: {
  path: string;
  server?: boolean;
}) {
  const [pathname, ssrSearch = ""] = path.split("?");
  return (
    <QueryClientProvider client={testQueryClient}>
      <Router
        ssrPath={server ? pathname : undefined}
        ssrSearch={server ? ssrSearch : undefined}
      >
        <App />
      </Router>
    </QueryClientProvider>
  );
}

async function expectHydrationFor(path: string) {
  window.history.replaceState({}, "", path);
  await preloadRouteForPath(new URL(path, window.location.origin).pathname);
  const serverHtml = renderToString(<RouteTree path={path} server />);
  document.body.innerHTML = `<div id="root">${serverHtml}</div>`;
  const container = document.getElementById("root")!;
  const recoverableErrors: string[] = [];
  let root: Root;
  await act(async () => {
    root = hydrateRoot(container, <RouteTree path={path} />, {
      onRecoverableError: error => recoverableErrors.push(String(error)),
    });
    await Promise.resolve();
  });
  expect(recoverableErrors).toEqual([]);
  await act(async () => root!.unmount());
}

describe("hidratação das rotas públicas", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    document.head.innerHTML = "";
    testQueryClient.clear();
  });

  it.each([
    "/",
    "/?uf=PA",
    "/ddd/11",
    "/estado/sp",
    "/cidade/sp/sao-paulo",
    "/guias",
    "/guia/o-que-e-ddd",
    "/guia/portabilidade-numerica",
    "/guia/ddd-11-cidades-e-cobertura",
  ])("hidrata %s sem divergências recuperáveis", async path => {
    await expectHydrationFor(path);
  });
});
