import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Buscar o estado
    const state = await db.state.findUnique({
      where: { slug },
      include: {
        cities: {
          orderBy: {
            name: 'asc'
          }
        },
        dddCodes: true
      }
    });

    if (!state) {
      return NextResponse.json({ error: 'Estado não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      state: {
        id: state.id,
        name: state.name,
        slug: state.slug,
        code: state.code,
        region: state.region,
        population: state.population,
        area: state.area,
        capital: state.capital
      },
      citiesCount: state.cities.length,
      cities: state.cities.map(city => ({
        id: city.id,
        name: city.name,
        slug: city.slug,
        population: city.population,
        isCapital: city.isCapital
      })),
      dddCodes: state.dddCodes.map(ddd => ({
        id: ddd.id,
        code: ddd.code,
        description: ddd.description
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar estado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}