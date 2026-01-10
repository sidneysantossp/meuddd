import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import routes from './routes';
import StateDetailPageSkeleton from '@/components/skeletons/StateDetailPageSkeleton';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFoundPage from '@/pages/NotFoundPage';

// import Header from '@/components/common/Header';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';
import { useAnalytics } from '@/hooks/useAnalytics';
import CookieConsent from '@/components/common/CookieConsent';

// Componente interno para usar hooks do React Router
const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Rastreia automaticamente pageviews, scroll e tempo na página
  useAnalytics();

  // Se for a rota /mapa.xml, renderizar sem layout
  const isMapaXml = location.pathname === '/mapa.xml';

  if (isMapaXml) {
    return (
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Component />}
            />
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <>
      {/*<AuthProvider>*/}
      {/*<RouteGuard>*/}
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          {/*<Header />*/}
          <main className="flex-grow">
            <Routes>
            {routes.map((route, index) => {
              const Component = route.component;
              // Adiciona Suspense para todas as rotas lazy-loaded
              const element = (
                <Suspense fallback={<StateDetailPageSkeleton />}>
                  <Component />
                </Suspense>
              );
              
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={element}
                />
              );
            })}
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
        <Toaster />
        <CookieConsent />
      </ErrorBoundary>
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
