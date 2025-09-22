import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const states = await db.state.findMany({
      include: {
        dddCodes: {
          orderBy: {
            code: 'asc'
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(states);
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    
    // Retornar dados estáticos em caso de erro
    const staticStates = [
      {
        id: '1',
        name: 'São Paulo',
        code: 'SP',
        slug: 'sao-paulo',
        region: 'Sudeste',
        population: 46289333,
        area: 248219.481,
        capital: 'São Paulo',
        dddCodes: [
          { id: '1', code: '11', description: 'Grande São Paulo' },
          { id: '2', code: '12', description: 'Vale do Paraíba e Litoral Norte' },
          { id: '3', code: '13', description: 'Baixada Santista' }
        ]
      },
      {
        id: '2',
        name: 'Rio de Janeiro',
        code: 'RJ',
        slug: 'rio-de-janeiro',
        region: 'Sudeste',
        population: 17366189,
        area: 43780.172,
        capital: 'Rio de Janeiro',
        dddCodes: [
          { id: '4', code: '21', description: 'Região Metropolitana do Rio de Janeiro' },
          { id: '5', code: '22', description: 'Região dos Lagos e Norte Fluminense' }
        ]
      }
    ];

    return NextResponse.json(staticStates);
  }
}