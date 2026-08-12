import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { installAnalytics } from "@/lib/analytics";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import App, { preloadRouteForPath } from "./App";
import { startLogin } from "./const";
import "./index.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } });
const redirectToLoginIfUnauthorized = (error: unknown) => { if (error instanceof TRPCClientError && error.message === UNAUTHED_ERR_MSG) startLogin(); };
queryClient.getQueryCache().subscribe(event => { if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.query.state.error); });
queryClient.getMutationCache().subscribe(event => { if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.mutation.state.error); });
const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson, headers() { try { const raw = sessionStorage.getItem("manus-cookie"); const pair = raw?.split(";").find(item => item.trim().startsWith(`${COOKIE_NAME}=`)); const token = pair?.trim().slice(`${COOKIE_NAME}=`.length); return token ? { Authorization: `Bearer ${token}` } : {}; } catch { return {}; } }, fetch(input, init) { return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" }); } })] });
const rawState = (window as Window & { __RQ_STATE__?: unknown }).__RQ_STATE__;
// O servidor injeta o resultado de dehydrate() como JSON seguro; não é um payload serializado pelo SuperJSON.
const dehydratedState = rawState as DehydratedState | undefined;
const hydrateApplication = () => {
  hydrateRoot(document.getElementById("root")!, <trpc.Provider client={trpcClient} queryClient={queryClient}><QueryClientProvider client={queryClient}><HydrationBoundary state={dehydratedState}><Router><App /></Router></HydrationBoundary></QueryClientProvider></trpc.Provider>);
  const install = () => installAnalytics(document, import.meta.env.VITE_ANALYTICS_ENDPOINT, import.meta.env.VITE_ANALYTICS_WEBSITE_ID);
  const requestIdle = (window as Window & { requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback;
  if (requestIdle) requestIdle(install, { timeout: 2_000 });
  else window.setTimeout(install, 1_200);
};

void preloadRouteForPath(window.location.pathname).finally(hydrateApplication);
