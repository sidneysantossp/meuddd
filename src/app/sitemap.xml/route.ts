import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const [states, cities] = await Promise.all([
    db.state.findMany({
      select: {
        slug: true,
        updatedAt: true
      }
    }),
    db.city.findMany({
      select: {
        slug: true,
        state: {
          select: {
            slug: true
          }
        },
        updatedAt: true
      }
    })
  ])

  const baseUrl = 'https://www.meuddd.com.br'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
    <priority>0.8</priority>
  </url>
  ${states.map(state => `
  <url>
    <loc>${baseUrl}/estado/${state.slug}</loc>
    <lastmod>${state.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${cities.map(city => `
  <url>
    <loc>${baseUrl}/estado/${city.state.slug}/${city.slug}</loc>
    <lastmod>${city.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}