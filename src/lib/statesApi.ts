import { supabase } from '@/lib/supabase';
import type { State, City } from '@/types';

// Cache para armazenar dados e evitar requisições repetidas
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Buscar todos os estados (dados básicos)
 */
export async function getAllStates(): Promise<State[]> {
  const cacheKey = 'all_states';
  const cached = getCachedData<State[]>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('states')
    .select('id, name, slug, abbreviation, region, capital, population, ddd_codes, area, municipalities')
    .order('name');

  if (error) {
    console.error('Erro ao buscar estados:', error);
    throw error;
  }

  const states: State[] = (data || []).map(state => ({
    id: state.id,
    name: state.name,
    slug: state.slug,
    abbreviation: state.abbreviation,
    region: state.region,
    capital: state.capital,
    population: state.population,
    dddCodes: state.ddd_codes,
    cities: [], // Será carregado sob demanda
  }));

  setCachedData(cacheKey, states);
  return states;
}

/**
 * Buscar um estado específico por slug
 */
export async function getStateBySlug(slug: string): Promise<State | null> {
  const cacheKey = `state_${slug}`;
  const cached = getCachedData<State>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('states')
    .select('id, name, slug, abbreviation, region, capital, population, ddd_codes, area, municipalities')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erro ao buscar estado:', error);
    return null;
  }

  if (!data) return null;

  const state: State = {
    id: data.id,
    name: data.name,
    slug: data.slug,
    abbreviation: data.abbreviation,
    region: data.region,
    capital: data.capital,
    population: data.population,
    dddCodes: data.ddd_codes,
    cities: [], // Será carregado separadamente
  };

  setCachedData(cacheKey, state);
  return state;
}

/**
 * Buscar cidades de um estado específico
 */
export async function getCitiesByStateId(stateId: string): Promise<City[]> {
  const cacheKey = `cities_${stateId}`;
  const cached = getCachedData<City[]>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('cities')
    .select('name, ddd, population')
    .eq('state_id', stateId)
    .order('name');

  if (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
  }

  const cities: City[] = (data || []).map(city => ({
    name: city.name,
    ddd: city.ddd,
    population: city.population,
  }));

  setCachedData(cacheKey, cities);
  return cities;
}

/**
 * Buscar estados por região
 */
export async function getStatesByRegion(region: string): Promise<State[]> {
  const cacheKey = `states_region_${region}`;
  const cached = getCachedData<State[]>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('states')
    .select('id, name, slug, abbreviation, region, capital, population, ddd_codes, area, municipalities')
    .eq('region', region)
    .order('name');

  if (error) {
    console.error('Erro ao buscar estados por região:', error);
    throw error;
  }

  const states: State[] = (data || []).map(state => ({
    id: state.id,
    name: state.name,
    slug: state.slug,
    abbreviation: state.abbreviation,
    region: state.region,
    capital: state.capital,
    population: state.population,
    dddCodes: state.ddd_codes,
    cities: [],
  }));

  setCachedData(cacheKey, states);
  return states;
}

/**
 * Buscar cidades por DDD
 */
export async function getCitiesByDDD(ddd: string): Promise<Array<City & { state_name: string }>> {
  const cacheKey = `cities_ddd_${ddd}`;
  const cached = getCachedData<Array<City & { state_name: string }>>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('cities')
    .select(`
      name,
      ddd,
      population,
      states!inner(name)
    `)
    .eq('ddd', ddd)
    .order('name');

  if (error) {
    console.error('Erro ao buscar cidades por DDD:', error);
    throw error;
  }

  const cities = (data || []).map(city => ({
    name: city.name,
    ddd: city.ddd,
    population: city.population,
    state_name: (city.states as any).name,
  }));

  setCachedData(cacheKey, cities);
  return cities;
}

/**
 * Buscar cidade específica
 */
export async function searchCities(query: string, limit: number = 10): Promise<Array<City & { state_name: string; state_slug: string }>> {
  const cacheKey = `search_${query}_${limit}`;
  const cached = getCachedData<Array<City & { state_name: string; state_slug: string }>>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('cities')
    .select(`
      name,
      ddd,
      population,
      states!inner(name, slug)
    `)
    .ilike('name', `%${query}%`)
    .order('population', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
  }

  const cities = (data || []).map(city => ({
    name: city.name,
    ddd: city.ddd,
    population: city.population,
    state_name: (city.states as any).name,
    state_slug: (city.states as any).slug,
  }));

  setCachedData(cacheKey, cities);
  return cities;
}

/**
 * Limpar cache (útil para desenvolvimento)
 */
export function clearCache(): void {
  cache.clear();
}
