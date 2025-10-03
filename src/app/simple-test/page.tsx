'use client';

import { useState, useEffect } from 'react';

export default function SimpleTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando busca de dados...');
        const response = await fetch('/api/ddd/states');
        console.log('Status da resposta:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const states = await response.json();
        console.log('Dados recebidos:', states.length, 'estados');
        
        const acre = states.find((s: any) => s.slug === 'acre');
        if (acre) {
          console.log('Acre encontrado:', acre.name, 'com', acre.cities.length, 'cidades');
          setData(acre);
        } else {
          setError('Acre não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!data) {
    return <div>Nenhum dado encontrado</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Teste Simples - Acre</h1>
      <p><strong>Nome:</strong> {data.name}</p>
      <p><strong>Número de Cidades:</strong> {data.cities.length}</p>
      
      <h2>Primeiras 5 cidades:</h2>
      <ul>
        {data.cities.slice(0, 5).map((city: any) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
      
      <p><em>Verifique o console do navegador para mais detalhes.</em></p>
    </div>
  );
}