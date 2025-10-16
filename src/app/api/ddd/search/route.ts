import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface SearchResult {
  type: 'state' | 'ddd';
  title: string;
  description: string;
  url: string;
  dddCode?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''

    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0, query })
    }

    const results: SearchResult[] = []

    // Search by state name or code
    const states = await db.state.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            code: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            capital: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        dddCodes: true,
        _count: {
          select: {
            cities: true
          }
        }
      }
    })

    states.forEach(state => {
      results.push({
        type: 'state',
        title: state.name,
        description: `${state.code} • ${state.capital} • ${state._count.cities} cidades • DDDs: ${state.dddCodes.map(d => d.code).join(', ')}`,
        url: `/estado/${state.slug}`,
        dddCode: state.dddCodes.length > 0 ? state.dddCodes[0].code : undefined
      })
    })

    // Search by DDD code
    if (/^\d{2,3}$/.test(query)) {
      const dddStates = await db.state.findMany({
        where: {
          dddCodes: {
            some: {
              code: query
            }
          }
        },
        include: {
          dddCodes: {
            where: {
              code: query
            }
          },
          _count: {
            select: {
              cities: true
            }
          }
        }
      })

      dddStates.forEach(state => {
        results.push({
          type: 'ddd',
          title: `DDD ${query} - ${state.name}`,
          description: `Código DDD ${query} cobre ${state._count.cities} cidades em ${state.name}`,
          url: `/estado/${state.slug}`,
          dddCode: query
        })
      })
    }

    // Search by city name
    const cities = await db.city.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        state: {
          include: {
            dddCodes: true
          }
        },
        cityDddCodes: {
          include: {
            dddCode: true
          }
        }
      },
      take: 10
    })

    cities.forEach(city => {
      const dddList = city.cityDddCodes.map(cd => cd.dddCode.code).join(', ')
      results.push({
        type: 'state',
        title: `${city.name} - ${city.state.name}`,
        description: `${city.isCapital ? 'Capital' : 'Cidade'} • ${city.state.code} • DDDs: ${dddList}`,
        url: `/estado/${city.state.slug}/${city.slug}`,
        dddCode: city.cityDddCodes.length > 0 ? city.cityDddCodes[0].dddCode.code : undefined
      })
    })

    // Remove duplicates and sort by relevance
    const uniqueResults = results.filter((result, index, self) =>
      index === self.findIndex((r) => r.url === result.url)
    )

    // Sort: exact matches first, then by type priority
    uniqueResults.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(query.toLowerCase())
      const bExact = b.title.toLowerCase().includes(query.toLowerCase())
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      // Priority: state > ddd
      if (a.type === 'state' && b.type === 'ddd') return -1
      if (a.type === 'ddd' && b.type === 'state') return 1
      
      return a.title.localeCompare(b.title)
    })

    return NextResponse.json({
      results: uniqueResults.slice(0, 10),
      total: uniqueResults.length,
      query
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}