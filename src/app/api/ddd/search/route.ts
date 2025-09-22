import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface SearchResult {
  type: 'state' | 'ddd';
  title: string;
  description: string;
  url: string;
  dddCode?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const results: SearchResult[] = [];

    // Busca por estado (nome ou sigla)
    const states = await db.state.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { code: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        dddCodes: true
      }
    });

    for (const state of states) {
      results.push({
        type: 'state',
        title: state.name,
        description: `${state.region} • ${state.dddCodes.length} códigos DDD`,
        url: `/estado/${state.slug}`
      });
    }

    // Busca por código DDD
    if (/^\d{2,3}$/.test(query)) {
      const dddResults = await db.dddCode.findMany({
        where: {
          code: { contains: query }
        },
        include: {
          state: true
        }
      });

      for (const ddd of dddResults) {
        results.push({
          type: 'ddd',
          title: `DDD ${ddd.code}`,
          description: `${ddd.state.name} • ${ddd.description || 'Código DDD'}`,
          url: `/estado/${ddd.state.slug}`,
          dddCode: ddd.code
        });
      }
    }

    // Busca por cidade
    const cities = await db.city.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' }
      },
      include: {
        state: true,
        dddCodes: true
      },
      take: 10 // Limitar resultados para não sobrecarregar
    });

    for (const city of cities) {
      const dddCodes = city.dddCodes.map(d => d.code).join(', ');
      results.push({
        type: 'state',
        title: city.name,
        description: `${city.state.name} • DDD: ${dddCodes}`,
        url: `/estado/${city.state.slug}`
      });
    }

    // Remover duplicados e limitar resultados
    const uniqueResults = results.filter((result, index, self) =>
      index === self.findIndex(r => r.url === result.url)
    ).slice(0, 10);

    return NextResponse.json({ results: uniqueResults });
  } catch (error) {
    console.error('Erro na busca de DDD:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}