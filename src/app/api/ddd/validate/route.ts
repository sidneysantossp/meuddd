import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface ValidationResult {
  isValid: boolean;
  dddCode?: string;
  state?: string;
  region?: string;
  cities?: string[];
  description?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dddParam = searchParams.get('ddd')?.trim();

    if (!dddParam) {
      return NextResponse.json({
        isValid: false,
        description: 'Código DDD não informado'
      });
    }

    // Limpar o DDD - remover não dígitos
    const cleanDDD = dddParam.replace(/\D/g, '');

    // Validar formato - deve ter 2 ou 3 dígitos
    if (!/^\d{2,3}$/.test(cleanDDD)) {
      return NextResponse.json({
        isValid: false,
        description: 'Código DDD deve ter 2 ou 3 dígitos'
      });
    }

    // Buscar o código DDD no banco de dados
    const dddCode = await db.dddCode.findFirst({
      where: {
        code: cleanDDD
      },
      include: {
        state: {
          include: {
            cities: {
              orderBy: {
                population: 'desc'
              },
              take: 10 // Limitar para não sobrecarregar
            }
          }
        }
      }
    });

    if (!dddCode) {
      return NextResponse.json({
        isValid: false,
        description: `O código DDD ${cleanDDD} não foi encontrado em nossa base de dados`
      });
    }

    // Buscar cidades que usam este DDD
    const citiesWithDDD = await db.city.findMany({
      where: {
        dddCodes: {
          some: {
            id: dddCode.id
          }
        }
      },
      orderBy: {
        population: 'desc'
      },
      take: 20
    });

    const result: ValidationResult = {
      isValid: true,
      dddCode: dddCode.code,
      state: dddCode.state.name,
      region: dddCode.state.region,
      cities: citiesWithDDD.map(city => city.name),
      description: dddCode.description || `Código DDD para região de ${dddCode.state.name}`
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erro na validação de DDD:', error);
    return NextResponse.json(
      { 
        isValid: false, 
        description: 'Erro interno do servidor ao validar o código DDD' 
      },
      { status: 500 }
    );
  }
}