import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatesPage from './pages/StatesPage';
import StateDetailPage from './pages/StateDetailPage';
import ValidateDDDPage from './pages/ValidateDDDPage';
import BlogPage from './pages/BlogPage';
import RedirectPage from './pages/RedirectPage';
import type { ComponentType } from 'react';

// Lazy load less critical pages for better initial load performance
const CityDetailPage = lazy(() => import('./pages/CityDetailPage'));
const VoiceSearchPage = lazy(() => import('./pages/VoiceSearchPage'));
const GeneratorPage = lazy(() => import('./pages/GeneratorPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const MapaXmlPage = lazy(() => import('./pages/MapaXmlPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'));

// Redirect component for /gerador -> /gerador-numeros
const GeradorRedirect = () => <RedirectPage to="/gerador-numeros" />;

// Redirect component for /sitemap -> /mapa-do-site
const SitemapRedirect = () => <RedirectPage to="/mapa-do-site" />;

// Redirect component for /estados/:stateId -> /estado/:stateId
const EstadosRedirect = () => {
  const { stateId } = useParams<{ stateId: string }>();
  return <RedirectPage to={`/estado/${stateId}`} />;
};

interface RouteConfig {
  name: string;
  path: string;
  component: ComponentType;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Início',
    path: '/',
    component: HomePage
  },
  {
    name: 'Estados',
    path: '/estados',
    component: StatesPage
  },
  {
    name: 'Estados Redirect',
    path: '/estados/:stateId',
    component: EstadosRedirect,
    visible: false
  },
  {
    name: 'Detalhes do Estado',
    path: '/estado/:stateId',
    component: StateDetailPage,
    visible: false
  },
  {
    name: 'Detalhes da Cidade',
    path: '/cidade/:cityName',
    component: CityDetailPage,
    visible: false
  },
  {
    name: 'Validar DDD',
    path: '/validar',
    component: ValidateDDDPage
  },
  {
    name: 'Busca por Voz',
    path: '/busca-voz',
    component: VoiceSearchPage
  },
  {
    name: 'Gerador Redirect',
    path: '/gerador',
    component: GeradorRedirect,
    visible: false
  },
  {
    name: 'Gerador',
    path: '/gerador-numeros',
    component: GeneratorPage
  },
  {
    name: 'Blog',
    path: '/blog',
    component: BlogPage,
    visible: false
  },
  {
    name: 'Artigo do Blog',
    path: '/blog/:stateSlug/:citySlug/:postSlug',
    component: BlogPostPage,
    visible: false
  },
  {
    name: 'Sobre',
    path: '/sobre',
    component: AboutPage
  },
  {
    name: 'Sobre Nós',
    path: '/sobre-nos',
    component: AboutUsPage,
    visible: false
  },
  {
    name: 'Contato',
    path: '/contato',
    component: ContactPage
  },
  {
    name: 'Sitemap Redirect',
    path: '/sitemap',
    component: SitemapRedirect,
    visible: false
  },
  {
    name: 'Mapa do Site',
    path: '/mapa-do-site',
    component: SitemapPage,
    visible: false
  },
  {
    name: 'Mapa XML',
    path: '/mapa.xml',
    component: MapaXmlPage,
    visible: false
  },
  {
    name: 'Políticas de Privacidade',
    path: '/politicas-de-privacidade',
    component: PrivacyPolicyPage,
    visible: false
  },
  {
    name: 'Termos de Uso',
    path: '/termos-de-uso',
    component: TermsOfUsePage,
    visible: false
  }
];

export default routes;
