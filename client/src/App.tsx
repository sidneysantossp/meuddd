/* Atlas Vivo: moldura clara e silenciosa para que território, tipografia e busca tenham prioridade. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DddDetail from "./pages/DddDetail";
import Home from "./pages/Home";
import StatePage from "./pages/StatePage";
import MunicipalityPage from "./pages/MunicipalityPage";
import DddGuidePage from "./pages/DddGuidePage";
import GuidesIndexPage from "./pages/GuidesIndexPage";
import SearchInsightsPage from "./pages/SearchInsightsPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/estado/:uf" component={StatePage} />
      <Route path="/cidade/:uf/:slug" component={MunicipalityPage} />
      <Route path="/guias" component={GuidesIndexPage} />
      <Route path="/guia/:slug" component={DddGuidePage} />
      <Route path="/ddd/:code" component={DddDetail} />
      <Route path="/admin/pesquisas" component={SearchInsightsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
