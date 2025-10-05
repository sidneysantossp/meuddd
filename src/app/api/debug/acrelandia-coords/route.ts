import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Buscar o estado do Acre
    const acreState = await db.state.findUnique({
      where: {
        slug: 'acre'
      },
      include: {
        cities: {
          where: {
            slug: 'acrelandia'
          }
        }
      }
    });

    if (!acreState) {
      return NextResponse.json({ error: 'Estado Acre não encontrado' }, { status: 404 });
    }

    const acrelandia = acreState.cities[0];
    
    if (!acrelandia) {
      return NextResponse.json({ error: 'Cidade Acrelândia não encontrada' }, { status: 404 });
    }

    return NextResponse.json({
      city: acrelandia.name,
      latitude: acrelandia.latitude,
      longitude: acrelandia.longitude,
      hasCoordinates: acrelandia.latitude !== null && acrelandia.longitude !== null
    });

  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}