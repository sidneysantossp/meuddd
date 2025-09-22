'use client';

import { DDDSearch } from '@/components/ddd/DDDSearch';
import { StateCard } from '@/components/ddd/StateCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Search, Info } from 'lucide-react';
import Link from 'next/link';
import { WebsiteStructuredData } from '@/components/seo/WebsiteStructuredData';
import { OrganizationStructuredData } from '@/components/seo/OrganizationStructuredData';
import { useEffect, useState } from 'react';

// Dados estáticos dos estados para evitar problemas de pré-renderização
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
  },
  {
    id: '3',
    name: 'Minas Gerais',
    code: 'MG',
    slug: 'minas-gerais',
    region: 'Sudeste',
    population: 21292666,
    area: 586522.122,
    capital: 'Belo Horizonte',
    dddCodes: [
      { id: '6', code: '31', description: 'Região Metropolitana de Belo Horizonte' },
      { id: '7', code: '32', description: 'Zona da Mata e Sul de Minas' }
    ]
  },
  {
    id: '4',
    name: 'Bahia',
    code: 'BA',
    slug: 'bahia',
    region: 'Nordeste',
    population: 14873064,
    area: 564733.177,
    capital: 'Salvador',
    dddCodes: [
      { id: '8', code: '71', description: 'Região Metropolitana de Salvador' },
      { id: '9', code: '73', description: 'Sul da Bahia' }
    ]
  }
];

const regions = [
  { name: 'Norte', color: 'bg-blue-100 text-blue-800' },
  { name: 'Nordeste', color: 'bg-green-100 text-green-800' },
  { name: 'Centro-Oeste', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Sudeste', color: 'bg-red-100 text-red-800' },
  { name: 'Sul', color: 'bg-purple-100 text-purple-800' }
];

export default function Home() {
  const [states, setStates] = useState(staticStates);
  const [baseUrl, setBaseUrl] = useState('https://meuddd.com.br');

  useEffect(() => {
    // Tentar carregar dados dinâmicos após o componente montar
    const loadStates = async () => {
      try {
        const response = await fetch('/api/ddd/states');
        if (response.ok) {
          const dynamicStates = await response.json();
          setStates(dynamicStates);
        }
      } catch (error) {
        console.log('Usando dados estáticos');
      }
    };

    setBaseUrl(process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br');
    loadStates();
  }, []);

  return (
    <>
      <WebsiteStructuredData url={baseUrl} />
      <OrganizationStructuredData url={baseUrl} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre o Código DDD que Você Precisa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Busque por estado, cidade ou código DDD. Temos informações de todos os 27 estados brasileiros com códigos telefônicos atualizados.
          </p>
          <DDDSearch />
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">27</div>
              <div className="text-sm text-gray-600">Estados Brasileiros</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">65+</div>
              <div className="text-sm text-gray-600">Códigos DDD</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">5000+</div>
              <div className="text-sm text-gray-600">Cidades Cadastradas</div>
            </CardContent>
          </Card>
        </div>

        {/* Region Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Filtrar por Região</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((region) => (
              <Badge key={region.name} className={`${region.color} hover:opacity-80 cursor-pointer`}>
                {region.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consulte o DDD de Todos os Estados Brasileiros
            </h2>
            <p className="text-lg text-gray-600">
              Clique em um estado para ver detalhes dos códigos DDD e cidades. Encontre o código telefônico que você precisa para fazer suas ligações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {states.map((state) => (
              <StateCard key={state.id} state={state} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que usar nossa plataforma?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Busca Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Encontre códigos DDD rapidamente por estado, cidade ou número. 
                  Nossa busca é otimizada para resultados precisos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Cobertura Nacional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Informações atualizadas de todos os 27 estados brasileiros 
                  e milhares de cidades com seus respectivos códigos DDD.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Info className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Informações Detalhadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Além do código DDD, oferecemos informações sobre 
                  regiões de cobertura e dados demográficos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}