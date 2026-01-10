/**
 * Script para gerar sitemap.xml completo com todas as URLs da plataforma MEU DDD
 * 
 * Inclui:
 * - Página inicial
 * - Páginas principais (estados, validar, gerador, busca por voz, blog, sobre, contato)
 * - 27 páginas de estados
 * - 730+ páginas de cidades
 * - Posts do blog
 */

import { brazilianStates } from './src/data/states';
import { blogPosts } from './src/data/blog';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Configurações
const BASE_URL = 'https://www.meuddd.com.br';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Função para normalizar nome de cidade para URL
function normalizeForURL(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

// Interface para URL do sitemap
interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Gerar URLs do sitemap
const sitemapURLs: SitemapURL[] = [];

// 1. Página Inicial
sitemapURLs.push({
  loc: `${BASE_URL}/`,
  lastmod: CURRENT_DATE,
  changefreq: 'daily',
  priority: 1.0,
});

// 2. Páginas Principais
const mainPages = [
  { path: '/estados', changefreq: 'weekly' as const, priority: 0.9 },
  { path: '/validar', changefreq: 'monthly' as const, priority: 0.7 },
  { path: '/busca-voz', changefreq: 'monthly' as const, priority: 0.7 },
  { path: '/gerador', changefreq: 'monthly' as const, priority: 0.7 },
  { path: '/blog', changefreq: 'weekly' as const, priority: 0.8 },
  { path: '/sobre', changefreq: 'monthly' as const, priority: 0.5 },
  { path: '/contato', changefreq: 'monthly' as const, priority: 0.5 },
];

mainPages.forEach(page => {
  sitemapURLs.push({
    loc: `${BASE_URL}${page.path}`,
    lastmod: CURRENT_DATE,
    changefreq: page.changefreq,
    priority: page.priority,
  });
});

// 3. Páginas de Estados (27 estados)
brazilianStates.forEach(state => {
  sitemapURLs.push({
    loc: `${BASE_URL}/estado/${state.id}`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: 0.8,
  });
});

// 4. Páginas de Cidades (730+ cidades)
let totalCities = 0;
brazilianStates.forEach(state => {
  state.cities.forEach(city => {
    const citySlug = normalizeForURL(city.name);
    sitemapURLs.push({
      loc: `${BASE_URL}/cidade/${citySlug}`,
      lastmod: CURRENT_DATE,
      changefreq: 'monthly',
      priority: 0.6,
    });
    totalCities++;
  });
});

// 5. Posts do Blog
blogPosts.forEach(post => {
  sitemapURLs.push({
    loc: `${BASE_URL}/blog/${post.id}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.7,
  });
});

// Gerar XML do sitemap
function generateSitemapXML(urls: SitemapURL[]): string {
  const urlEntries = urls
    .map(
      url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

// Gerar sitemap
const sitemapXML = generateSitemapXML(sitemapURLs);

// Salvar arquivo
const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, sitemapXML, 'utf-8');

// Estatísticas
console.log('✅ Sitemap.xml gerado com sucesso!');
console.log('');
console.log('📊 Estatísticas:');
console.log(`   • Total de URLs: ${sitemapURLs.length}`);
console.log(`   • Página inicial: 1`);
console.log(`   • Páginas principais: ${mainPages.length}`);
console.log(`   • Páginas de estados: ${brazilianStates.length}`);
console.log(`   • Páginas de cidades: ${totalCities}`);
console.log(`   • Posts do blog: ${blogPosts.length}`);
console.log('');
console.log(`📁 Arquivo salvo em: ${outputPath}`);
console.log('');
console.log('🔗 URLs por prioridade:');
console.log(`   • Prioridade 1.0: ${sitemapURLs.filter(u => u.priority === 1.0).length} URLs`);
console.log(`   • Prioridade 0.9: ${sitemapURLs.filter(u => u.priority === 0.9).length} URLs`);
console.log(`   • Prioridade 0.8: ${sitemapURLs.filter(u => u.priority === 0.8).length} URLs`);
console.log(`   • Prioridade 0.7: ${sitemapURLs.filter(u => u.priority === 0.7).length} URLs`);
console.log(`   • Prioridade 0.6: ${sitemapURLs.filter(u => u.priority === 0.6).length} URLs`);
console.log(`   • Prioridade 0.5: ${sitemapURLs.filter(u => u.priority === 0.5).length} URLs`);
console.log('');
console.log('📝 Próximos passos:');
console.log('   1. Verifique o sitemap.xml em /public/sitemap.xml');
console.log('   2. Teste o sitemap em: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
console.log('   3. Envie para o Google Search Console');
console.log('   4. Adicione a URL do sitemap no robots.txt');
