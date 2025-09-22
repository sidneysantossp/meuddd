import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function GET() {
  const baseUrl = 'https://www.meuddd.com.br';
  
  try {
    console.log('Iniciando geração do sitemap...');
    
    // Buscar todos os estados
    const states = await db.state.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    console.log(`Estados encontrados: ${states.length}`);

    // Buscar algumas cidades principais para incluir no sitemap
    const cities = await db.city.findMany({
      include: {
        state: true
      },
      orderBy: {
        population: 'desc'
      },
      take: 100 // Limitar para não sobrecarregar o sitemap
    });
    console.log(`Cidades encontradas: ${cities.length}`);

    const urls: SitemapUrl[] = [
      // Página principal
      {
        loc: baseUrl,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0
      },
      // Página de validação
      {
        loc: `${baseUrl}/validar-ddd`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      },
      // Página do gerador
      {
        loc: `${baseUrl}/gerador-numeros`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      },
      // Página de busca por voz
      {
        loc: `${baseUrl}/busca-por-voz`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      }
    ];

    // Adicionar páginas de estados
    states.forEach(state => {
      urls.push({
        loc: `${baseUrl}/estado/${state.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      });
    });

    // Adicionar páginas de cidades
    cities.forEach(city => {
      urls.push({
        loc: `${baseUrl}/estado/${city.state.slug}/cidade/${city.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      });
    });

    console.log(`Total de URLs geradas: ${urls.length}`);

    // Gerar o XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate'
      }
    });

  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    console.error('Stack trace:', error.stack);
    
    // Retornar um sitemap básico em caso de erro
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
}