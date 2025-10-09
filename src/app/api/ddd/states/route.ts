import { NextRequest, NextResponse } from 'next/server';

// Dados estáticos como fallback para produção
const staticStates = [
  {
    id: '1',
    name: 'Acre',
    code: 'AC',
    slug: 'acre',
    region: 'Norte',
    population: 894470,
    area: 164123.040,
    capital: 'Rio Branco',
    createdAt: new Date(),
    updatedAt: new Date(),
    dddCodes: [
      { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
    ],
    cities: [
      {
        id: '1',
        name: 'Rio Branco',
        slug: 'rio-branco',
        population: 419452,
        area: 9222.58,
        latitude: -9.9747,
        longitude: -67.8203,
        isCapital: true,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '2',
        name: 'Cruzeiro do Sul',
        slug: 'cruzeiro-do-sul',
        population: 87817,
        area: 7925.93,
        latitude: -7.6403,
        longitude: -72.6722,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '3',
        name: 'Sena Madureira',
        slug: 'sena-madureira',
        population: 45079,
        area: 4251.78,
        latitude: -9.0692,
        longitude: -68.6589,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '4',
        name: 'Tarauacá',
        slug: 'tarauaca',
        population: 41234,
        area: 15333.54,
        latitude: -8.1536,
        longitude: -70.7819,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '5',
        name: 'Feijó',
        slug: 'feijo',
        population: 33222,
        area: 24202.78,
        latitude: -8.1639,
        longitude: -66.1458,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '6',
        name: 'Brasiléia',
        slug: 'brasileia',
        population: 25736,
        area: 4365.49,
        latitude: -11.0203,
        longitude: -68.7397,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '7',
        name: 'Mâncio Lima',
        slug: 'mancio-lima',
        population: 17746,
        area: 4672.19,
        latitude: -7.6089,
        longitude: -72.8953,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '8',
        name: 'Bujari',
        slug: 'bujari',
        population: 13773,
        area: 3468.31,
        latitude: -10.0519,
        longitude: -67.8289,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '9',
        name: 'Epitaciolândia',
        slug: 'epitaciolandia',
        population: 11723,
        area: 1659.27,
        latitude: -11.0058,
        longitude: -68.8167,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '10',
        name: 'Xapuri',
        slug: 'xapuri',
        population: 11597,
        area: 5251.27,
        latitude: -10.6619,
        longitude: -68.5156,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '11',
        name: 'Rodrigues Alves',
        slug: 'rodrigues-alves',
        population: 16600,
        area: 3284.09,
        latitude: -7.7428,
        longitude: -72.6758,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '12',
        name: 'Plácido de Castro',
        slug: 'placido-de-castro',
        population: 17472,
        area: 2045.89,
        latitude: -10.2728,
        longitude: -67.1531,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '13',
        name: 'Acrelândia',
        slug: 'acrelandia',
        population: 13907,
        area: 1575.87,
        latitude: -9.8253,
        longitude: -66.8806,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '14',
        name: 'Porto Acre',
        slug: 'porto-acre',
        population: 16087,
        area: 2205.19,
        latitude: -9.5883,
        longitude: -67.5417,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '15',
        name: 'Assis Brasil',
        slug: 'assis-brasil',
        population: 7035,
        area: 4974.18,
        latitude: -10.9364,
        longitude: -69.5625,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '16',
        name: 'Capixaba',
        slug: 'capixaba',
        population: 10168,
        area: 1702.58,
        latitude: -10.9667,
        longitude: -68.9833,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '17',
        name: 'Marechal Thaumaturgo',
        slug: 'marechal-thaumaturgo',
        population: 5439,
        area: 8134.36,
        latitude: -7.7875,
        longitude: -72.9258,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '18',
        name: 'Porto Walter',
        slug: 'porto-walter',
        population: 9163,
        area: 6179.87,
        latitude: -8.2583,
        longitude: -72.4917,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '19',
        name: 'Santa Rosa do Purus',
        slug: 'santa-rosa-do-purus',
        population: 5680,
        area: 9549.28,
        latitude: -9.9278,
        longitude: -70.4556,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '20',
        name: 'Jordão',
        slug: 'jordao',
        population: 6542,
        area: 5429.08,
        latitude: -9.85,
        longitude: -72.7667,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '21',
        name: 'Manoel Urbano',
        slug: 'manoel-urbano',
        population: 8987,
        area: 9386.78,
        latitude: -8.8147,
        longitude: -66.9114,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      },
      {
        id: '22',
        name: 'Iñapari',
        slug: 'inapari',
        population: 2100,
        area: 2945.27,
        latitude: -11.05,
        longitude: -69.5,
        isCapital: false,
        stateId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dddCodes: [
          { id: '1', code: '68', description: 'Acre', stateId: '1', createdAt: new Date(), updatedAt: new Date() }
        ]
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log('Static API /api/ddd/states called');
    
    // Em produção, retornar dados estáticos
    if (process.env.NODE_ENV === 'production') {
      console.log('Production environment - returning static data');
      return NextResponse.json(staticStates);
    }
    
    // Em desenvolvimento, tentar usar o banco de dados
    try {
      const { db } = await import('@/lib/db');
      const states = await db.state.findMany({
        include: {
          dddCodes: {
            orderBy: {
              code: 'asc'
            }
          },
          cities: {
            orderBy: {
              name: 'asc'
            },
            include: {
              dddCodes: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      console.log(`Found ${states.length} states in database`);
      return NextResponse.json(states);
    } catch (dbError) {
      console.error('Database error, falling back to static data:', dbError);
      return NextResponse.json(staticStates);
    }
  } catch (error) {
    console.error('Error in /api/ddd/states:', error);
    return NextResponse.json(staticStates);
  }
}