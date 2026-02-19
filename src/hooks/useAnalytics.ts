import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initScrollTracking } from '@/utils/analytics';

/**
 * Hook para rastrear automaticamente pageviews quando a rota muda
 * 
 * Uso:
 * ```tsx
 * function App() {
 *   usePageTracking();
 *   return <Router>...</Router>
 * }
 * ```
 */
export const usePageTracking = () => {
  let location: any = { pathname: '/', search: '' };
  try {
    location = useLocation();
  } catch (e) {
    // Silently fail if not in router context (e.g. during build)
  }

  useEffect(() => {
    // Verifica se estamos no browser antes de acessar document
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Rastreia pageview quando a rota muda
      trackPageView(location.pathname + location.search, document.title);
    }
  }, [location]);
};

/**
 * Hook para rastrear scroll da página automaticamente
 * 
 * Uso:
 * ```tsx
 * function MyPage() {
 *   useScrollTracking();
 *   return <div>...</div>
 * }
 * ```
 */
export const useScrollTracking = () => {
  useEffect(() => {
    // Verifica se estamos no browser
    if (typeof window !== 'undefined') {
      const cleanup = initScrollTracking();
      return cleanup;
    }
  }, []);
};

/**
 * Hook para rastrear tempo de permanência na página
 * 
 * Uso:
 * ```tsx
 * function MyPage() {
 *   useTimeOnPage();
 *   return <div>...</div>
 * }
 * ```
 */
export const useTimeOnPage = () => {
  let location: any = { pathname: '/', search: '' };
  try {
    location = useLocation();
  } catch (e) {
    // Silently fail if not in router context
  }

  useEffect(() => {
    // Verifica se estamos no browser
    if (typeof window !== 'undefined') {
      const startTime = Date.now();

      return () => {
        const endTime = Date.now();
        const timeInSeconds = Math.round((endTime - startTime) / 1000);

        // Só rastreia se o usuário ficou mais de 5 segundos
        if (timeInSeconds >= 5) {
          import('@/utils/analytics').then(({ trackTimeOnPage }) => {
            trackTimeOnPage(location.pathname, timeInSeconds);
          });
        }
      };
    }
  }, [location]);
};

/**
 * Hook combinado que rastreia pageview, scroll e tempo na página
 * 
 * Uso:
 * ```tsx
 * function App() {
 *   useAnalytics();
 *   return <Router>...</Router>
 * }
 * ```
 */
export const useAnalytics = () => {
  usePageTracking();
  useScrollTracking();
  useTimeOnPage();
};
