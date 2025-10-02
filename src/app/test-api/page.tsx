'use client';

import { useEffect, useState } from 'react';

interface State {
  id: string;
  name: string;
  slug: string;
  code: string;
  region: string;
  population: number | null;
  area: number | null;
  capital: string | null;
  dddCodes: Array<{
    id: string;
    code: string;
    description: string | null;
  }>;
}

export default function TestApiPage() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch('/api/ddd/states');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStates(data);
        console.log('API Response:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Testando API...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro na API</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="text-blue-600 hover:underline">Voltar para home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de API</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Status da API</h2>
          <div className="space-y-2">
            <p><strong>Estados encontrados:</strong> {states.length}</p>
            <p><strong>Status:</strong> <span className="text-green-600">✓ Online</span></p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Primeiros 5 Estados</h2>
          <div className="space-y-4">
            {states.slice(0, 5).map((state) => (
              <div key={state.id} className="border-b pb-4">
                <h3 className="font-semibold">{state.name} ({state.code})</h3>
                <p className="text-sm text-gray-600">Slug: {state.slug}</p>
                <p className="text-sm text-gray-600">Região: {state.region}</p>
                <p className="text-sm text-gray-600">Capital: {state.capital}</p>
                <p className="text-sm text-gray-600">DDD: {state.dddCodes.map(d => d.code).join(', ')}</p>
                <a 
                  href={`/estado/${state.slug}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Testar página do estado →
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:underline">Voltar para home</a>
        </div>
      </div>
    </div>
  );
}