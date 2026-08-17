import {
  dehydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import App, { preloadRouteForPath } from "./App";
import {
  prefetchForPath,
  type HeadMeta,
  type SsrPrefetch,
} from "./ssr/prefetch";

export type RenderResult = {
  html: string;
  dehydratedState: unknown;
  head: HeadMeta;
};
export async function render(
  url: string,
  prefetch: SsrPrefetch
): Promise<RenderResult> {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });
  const i = url.indexOf("?");
  const ssrPath = i === -1 ? url : url.slice(0, i);
  const ssrSearch = i === -1 ? "" : url.slice(i + 1);
  await preloadRouteForPath(ssrPath);
  const head = await prefetchForPath(url, queryClient, prefetch);
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );
  return { html, dehydratedState: dehydrate(queryClient), head };
}
