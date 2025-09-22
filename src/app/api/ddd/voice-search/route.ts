import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface VoiceSearchResult {
  type: 'state' | 'city' | 'ddd' | 'instruction';
  title: string;
  description: string;
  url: string;
  confidence: number;
  dddCode?: string;
  state?: string;
}

// Função para normalizar texto e remover acentos
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '');
};

// Função para extrair padrões de busca
const extractSearchPatterns = (query: string): {
  dddNumbers: string[];
  stateNames: string[];
  cityNames: string[];
  actions: string[];
} => {
  const normalized = normalizeText(query);
  
  // Extrair números DDD (2-3 dígitos)
  const dddNumbers = normalized.match(/\b\d{2,3}\b/g) || [];
  
  // Lista de estados brasileiros para matching
  const states = [
    'sao paulo', 'rio de janeiro', 'minas gerais', 'espirito santo', 'bahia',
    'pernambuco', 'ceara', 'paraiba', 'rio grande do norte', 'alagoas',
    'sergipe', 'piaui', 'maranhao', 'tocantins', 'para', 'amapa',
    'rondonia', 'acre', 'amazonas', 'roraima', 'paraiba', 'parana',
    'santa catarina', 'rio grande do sul', 'mato grosso', 'mato grosso do sul',
    'goias', 'distrito federal'
  ];
  
  // Extrair nomes de estados
  const stateNames = states.filter(state => 
    normalized.includes(state)
  );
  
  // Extrair possíveis nomes de cidades (palavras que não são estados ou ações)
  const words = normalized.split(' ').filter(word => 
    word.length > 2 && 
    !states.some(state => state.includes(word)) &&
    !['ddd', 'codigo', 'qual', 'como', 'onde', 'quando', 'porque', 'para', 'telefone', 'ligar', 'discar'].includes(word)
  );
  
  // Extrair ações/intenções
  const actions = [];
  if (normalized.includes('qual') || normalized.includes('codigo')) actions.push('find_code');
  if (normalized.includes('como') || normalized.includes('ligar')) actions.push('how_to_call');
  if (normalized.includes('onde') || normalized.includes('estado')) actions.push('find_state');
  if (normalized.includes('cidade') || normalized.includes('cidades')) actions.push('find_cities');
  
  return {
    dddNumbers,
    stateNames,
    cityNames: words,
    actions
  };
};

// Função para calcular confiança do resultado
const calculateConfidence = (
  query: string,
  result: any,
  patterns: any
): number => {
  let confidence = 0;
  
  // Confiança baseada em correspondência exata de DDD
  if (patterns.dddNumbers.length > 0 && result.dddCode) {
    if (patterns.dddNumbers.includes(result.dddCode)) {
      confidence += 0.8;
    }
  }
  
  // Confiança baseada em correspondência de estado
  if (patterns.stateNames.length > 0 && result.state) {
    const normalizedState = normalizeText(result.state);
    if (patterns.stateNames.some(state => normalizedState.includes(state))) {
      confidence += 0.6;
    }
  }
  
  // Confiança baseada em correspondência de cidade
  if (patterns.cityNames.length > 0 && result.title) {
    const normalizedTitle = normalizeText(result.title);
    if (patterns.cityNames.some(city => normalizedTitle.includes(city))) {
      confidence += 0.4;
    }
  }
  
  // Confiança baseada em ações
  if (patterns.actions.length > 0) {
    confidence += 0.2;
  }
  
  return Math.min(confidence, 1.0);
};

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query inválida' },
        { status: 400 }
      );
    }

    const patterns = extractSearchPatterns(query);
    const results: VoiceSearchResult[] = [];

    // Busca por DDD específico
    if (patterns.dddNumbers.length > 0) {
      for (const dddNumber of patterns.dddNumbers) {
        const dddResults = await db.dddCode.findMany({
          where: {
            code: dddNumber
          },
          include: {
            state: true
          }
        });

        for (const ddd of dddResults) {
          const confidence = calculateConfidence(query, ddd, patterns);
          
          results.push({
            type: 'ddd',
            title: `DDD ${ddd.code}`,
            description: `${ddd.state.name} - ${ddd.description || 'Código DDD'}`,
            url: `/estado/${ddd.state.slug}`,
            confidence,
            dddCode: ddd.code,
            state: ddd.state.name
          });
        }
      }
    }

    // Busca por estado
    if (patterns.stateNames.length > 0) {
      for (const stateName of patterns.stateNames) {
        const stateResults = await db.state.findMany({
          where: {
            OR: [
              { name: { contains: stateName, mode: 'insensitive' } },
              { slug: { contains: stateName, mode: 'insensitive' } }
            ]
          },
          include: {
            dddCodes: true
          }
        });

        for (const state of stateResults) {
          const confidence = calculateConfidence(query, state, patterns);
          
          results.push({
            type: 'state',
            title: state.name,
            description: `${state.region} • ${state.dddCodes.length} códigos DDD`,
            url: `/estado/${state.slug}`,
            confidence,
            state: state.name
          });
        }
      }
    }

    // Busca por cidade
    if (patterns.cityNames.length > 0) {
      for (const cityName of patterns.cityNames) {
        const cityResults = await db.city.findMany({
          where: {
            name: { contains: cityName, mode: 'insensitive' }
          },
          include: {
            state: true,
            dddCodes: true
          },
          take: 5
        });

        for (const city of cityResults) {
          const confidence = calculateConfidence(query, city, patterns);
          const dddCodes = city.dddCodes.map(d => d.code).join(', ');
          
          results.push({
            type: 'city',
            title: city.name,
            description: `${city.state.name} • DDD: ${dddCodes}`,
            url: `/estado/${city.state.slug}/cidade/${city.slug}`,
            confidence,
            state: city.state.name,
            dddCode: dddCodes
          });
        }
      }
    }

    // Adicionar resultados instrucionais baseados em ações
    if (patterns.actions.includes('how_to_call')) {
      results.push({
        type: 'instruction',
        title: 'Como ligar usando DDD',
        description: 'Aprenda a fazer chamadas usando códigos DDD',
        url: '/validar-ddd',
        confidence: 0.5
      });
    }

    // Ordenar por confiança e limitar resultados
    const sortedResults = results
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 10)
      .filter(result => result.confidence > 0.2);

    // Se não encontrou resultados, adicionar sugestões
    if (sortedResults.length === 0) {
      results.push({
        type: 'instruction',
        title: 'Não encontrado',
        description: 'Tente buscar por nome de estado, cidade ou código DDD',
        url: '/',
        confidence: 0.1
      });
    }

    return NextResponse.json({
      results: sortedResults.length > 0 ? sortedResults : results.slice(0, 3),
      patterns,
      query: query
    });

  } catch (error) {
    console.error('Erro na busca por voz:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Query não informada' }, { status: 400 });
  }
  
  // Simular POST request para GET
  const body = { query };
  return POST({ ...request, json: () => Promise.resolve(body) } as NextRequest);
}