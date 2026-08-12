/* Atlas Vivo: moldura clara e silenciosa para que território, tipografia e busca tenham prioridade. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, type ComponentType } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { PublicFooter } from "./components/PublicFooter";
import { BlogHighlights } from "./components/BlogHighlights";

type RouteModule = { default: ComponentType<any> };

function createLoadableRoute(loader: () => Promise<RouteModule>) {
  let resolved: ComponentType<any> | undefined;
  let loading: Promise<void> | undefined;
  const preload = () => {
    loading ??= loader().then(module => { resolved = module.default; });
    return loading;
  };
  const LazyRoute = lazy(async () => {
    await preload();
    return { default: resolved! };
  });
  const RouteComponent = (props: any) => {
    const ResolvedRoute = resolved;
    return ResolvedRoute ? <ResolvedRoute {...props} /> : <Suspense fallback={<RouteLoadingFallback />}><LazyRoute {...props} /></Suspense>;
  };
  return { RouteComponent, preload };
}

function RouteLoadingFallback() {
  return <main className="min-h-screen bg-[#faf3e5]" aria-busy="true" aria-label="A carregar página" />;
}

const stateRoute = createLoadableRoute(() => import("./pages/StatePage"));
const municipalityRoute = createLoadableRoute(() => import("./pages/MunicipalityPage"));
const guidesRoute = createLoadableRoute(() => import("./pages/GuidesIndexPage"));
const generatorRoute = createLoadableRoute(() => import("./pages/Generator"));
const guideRoute = createLoadableRoute(() => import("./pages/DddGuidePage"));
const dddRoute = createLoadableRoute(() => import("./pages/DddDetail"));
const searchInsightsRoute = createLoadableRoute(() => import("./pages/SearchInsightsPage"));
const suggestionsRoute = createLoadableRoute(() => import("./pages/SuggestionModerationPage"));
const institutionalRoute = createLoadableRoute(() => import("./pages/InstitutionalPage"));
const regionRoute = createLoadableRoute(() => import("./pages/RegionPage"));

export function preloadRouteForPath(pathname: string) {
  if (/^\/estado\/[a-z]{2}$/i.test(pathname)) return stateRoute.preload();
  if (/^\/cidade\/[a-z]{2}\//i.test(pathname)) return municipalityRoute.preload();
  if (pathname === "/guias") return guidesRoute.preload();
  if (pathname === "/gerador") return generatorRoute.preload();
  if (/^\/guia\//.test(pathname)) return guideRoute.preload();
  if (/^\/ddd\//.test(pathname)) return dddRoute.preload();
  if (/^\/regiao\//.test(pathname)) return regionRoute.preload();
  if (pathname === "/admin/pesquisas") return searchInsightsRoute.preload();
  if (pathname === "/admin/sugestoes") return suggestionsRoute.preload();
  if (["/sobre", "/contato", "/politica-de-privacidade", "/termos-de-uso", "/lgpd", "/imprensa"].includes(pathname)) return institutionalRoute.preload();
  return Promise.resolve();
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/estado/:uf" component={stateRoute.RouteComponent} />
      <Route path="/cidade/:uf/:slug" component={municipalityRoute.RouteComponent} />
      <Route path="/guias" component={guidesRoute.RouteComponent} />
      <Route path="/gerador" component={generatorRoute.RouteComponent} />
      <Route path="/guia/:slug" component={guideRoute.RouteComponent} />
      <Route path="/ddd/:code" component={dddRoute.RouteComponent} />
      <Route path="/regiao/:slug" component={regionRoute.RouteComponent} />
      <Route path="/admin/pesquisas" component={searchInsightsRoute.RouteComponent} />
      <Route path="/admin/sugestoes" component={suggestionsRoute.RouteComponent} />
      <Route path="/sobre" component={institutionalRoute.RouteComponent} />
      <Route path="/contato" component={institutionalRoute.RouteComponent} />
      <Route path="/politica-de-privacidade" component={institutionalRoute.RouteComponent} />
      <Route path="/termos-de-uso" component={institutionalRoute.RouteComponent} />
      <Route path="/lgpd" component={institutionalRoute.RouteComponent} />
      <Route path="/imprensa" component={institutionalRoute.RouteComponent} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PublicBottom() {
  const [location] = useLocation();
  if (location.startsWith("/admin")) return null;
  return <><BlogHighlights /><PublicFooter /></>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
          <PublicBottom />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
