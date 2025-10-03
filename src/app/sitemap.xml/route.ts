import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function GET() {
  const baseUrl = 'https://meuddd.com';
  
  try {
    // Buscar todos os estados
    const states = await db.state.findMany({
      include: {
        cities: {
          orderBy: {
            name: 'asc'
          },
          take: 200 // Aumentado para incluir mais cidades no sitemap
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    const urls: SitemapUrl[] = [
      // Página principal
      {
        loc: baseUrl,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0
      },
      
      // Página de estados
      {
        loc: `${baseUrl}/estados`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      },
      
      // Página de DDD
      {
        loc: `${baseUrl}/validar-ddd`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8
      },
      
      // Gerador de números
      {
        loc: `${baseUrl}/gerador-numeros`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      },
      
      // Busca por voz
      {
        loc: `${baseUrl}/busca-por-voz`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      },
      
      // Sobre o autor
      {
        loc: `${baseUrl}/sobre-o-autor`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6
      },
      
      // Autor
      {
        loc: `${baseUrl}/autor`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6
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
      
      // Adicionar páginas de cidades
      if (state.cities && Array.isArray(state.cities)) {
        state.cities.forEach(city => {
          urls.push({
            loc: `${baseUrl}/estado/${state.slug}/${city.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: 0.8
          });
        });
      }
    });

    // Gerar o XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate'
      }
    });

  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    
    // Retornar um sitemap básico em caso de erro
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/estados</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate'
      }
    });
  }
}