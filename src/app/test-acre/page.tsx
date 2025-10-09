'use client';

import { useEffect, useState } from 'react';

interface City {
  id: string;
  name: string;
  slug: string;
  population: number | null;
  isCapital: boolean;
  dddCodes: any[];
}

interface State {
  id: string;
  name: string;
  slug: string;
  code: string;
  region: string;
  population: number | null;
  area: number | null;
  capital: string | null;
  cities: City[];
  dddCodes: any[];
}

export default function TestAcrePage() {
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAcreData = async () => {
      try {
        const response = await fetch('/api/ddd/states');
        const states = await response.json();
        
        const acre = states.find((s: State) => s.slug === 'acre');
        
        if (acre) {
          setState(acre);
          console.log('Acre data:', {
            name: acre.name,
            citiesCount: acre.cities.length,
            cities: acre.cities.map((c: City) => c.name)
          });
        } else {
          console.error('Acre not found');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAcreData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!state) {
    return <div>Estado não encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste - Dados do Acre</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Informações do Estado</h2>
        <p><strong>Nome:</strong> {state.name}</p>
        <p><strong>Código:</strong> {state.code}</p>
        <p><strong>Região:</strong> {state.region}</p>
        <p><strong>População:</strong> {state.population?.toLocaleString('pt-BR')}</p>
        <p><strong>Capital:</strong> {state.capital}</p>
        <p><strong>Número de Cidades:</strong> {state.cities.length}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Lista de Cidades ({state.cities.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.cities.map((city) => (
            <div key={city.id} className="border p-4 rounded">
              <h3 className="font-medium">{city.name}</h3>
              <p className="text-sm text-gray-600">
                População: {city.population?.toLocaleString('pt-BR') || 'N/A'}
              </p>
              {city.isCapital && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                  Capital
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Códigos DDD</h2>
        <div className="flex gap-2">
          {state.dddCodes.map((ddd) => (
            <span key={ddd.id} className="bg-green-100 text-green-800 px-3 py-1 rounded">
              {ddd.code}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}