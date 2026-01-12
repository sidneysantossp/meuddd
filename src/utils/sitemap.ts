// Utilitário para gerar sitemap.xml
import { brazilianStates } from '@/data/states';
import { allBlogPosts } from '@/data/blogPosts';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://www.meuddd.com.br'; // Domínio padrão com www

// Função para formatar data no formato ISO 8601
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Função para normalizar nome de cidade para URL
const normalizeCityName = (cityName: string): string => {
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
};

// Gera todas as URLs do sitemap
export const generateSitemapUrls = (): SitemapUrl[] => {
  const today = formatDate(new Date());
  const urls: SitemapUrl[] = [];

  // 1. Página Inicial
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0
  });

  // 2. Página de Estados
  urls.push({
    loc: `${BASE_URL}/estados`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.9
  });

  // 3. Páginas de Detalhes de Estados
  brazilianStates.forEach(state => {
    urls.push({
      loc: `${BASE_URL}/estado/${state.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // 4. Páginas de Cidades (todas as cidades de todos os estados)
  brazilianStates.forEach(state => {
    state.cities.forEach(city => {
      const citySlug = normalizeCityName(city.name);
      urls.push({
        loc: `${BASE_URL}/cidade/${citySlug}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6
      });
    });
  });

  // 5. Página de Validação de DDD
  urls.push({
    loc: `${BASE_URL}/validar`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.7
  });

  // 6. Página de Busca por Voz
  urls.push({
    loc: `${BASE_URL}/busca-voz`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.7
  });

  // 7. Página do Gerador
  urls.push({
    loc: `${BASE_URL}/gerador-numeros`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.7
  });

  // 8. Página do Blog
  urls.push({
    loc: `${BASE_URL}/blog`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.8
  });

  // 9. Artigos do Blog
  allBlogPosts.forEach(post => {
    urls.push({
      loc: `${BASE_URL}/blog/${post.state.slug}/${post.city.slug}/${post.slug}`,
      lastmod: post.updatedDate || post.publishedDate,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // 10. Página Sobre
  urls.push({
    loc: `${BASE_URL}/sobre`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.5
  });

  // 11. Página de Contato
  urls.push({
    loc: `${BASE_URL}/contato`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.5
  });

  // 12. Página de Políticas de Privacidade
  urls.push({
    loc: `${BASE_URL}/politicas-de-privacidade`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.4
  });

  // 13. Página de Termos de Uso
  urls.push({
    loc: `${BASE_URL}/termos-de-uso`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.4
  });

  // 14. Página de Políticas de Cookies
  urls.push({
    loc: `${BASE_URL}/politicas-de-cookies`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.4
  });

  // 15. Página de Imprensa
  urls.push({
    loc: `${BASE_URL}/imprensa`,
    lastmod: today,
    changefreq: 'yearly',
    priority: 0.3
  });

  // 16. Página Trabalhe Conosco
  urls.push({
    loc: `${BASE_URL}/trabalhe-conosco`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.3
  });

  return urls;
};

// Gera o XML do sitemap
export const generateSitemapXML = (): string => {
  const urls = generateSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Estatísticas do sitemap
export const getSitemapStats = () => {
  const urls = generateSitemapUrls();
  
  return {
    total: urls.length,
    pages: urls.filter(u => u.priority >= 0.7).length,
    states: brazilianStates.length,
    cities: brazilianStates.reduce((acc, state) => acc + state.cities.length, 0),
    blogPosts: allBlogPosts.length
  };
};
