import { DDDSearch } from '@/components/ddd/DDDSearch';
import { StateCard } from '@/components/ddd/StateCard';
import { db } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Search, Info } from 'lucide-react';
import Link from 'next/link';
import { WebsiteStructuredData } from '@/components/seo/WebsiteStructuredData';
import { OrganizationStructuredData } from '@/components/seo/OrganizationStructuredData';

async function getStates() {
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
  return states;
}

const regions = [
  { name: 'Norte', color: 'bg-blue-100 text-blue-800' },
  { name: 'Nordeste', color: 'bg-green-100 text-green-800' },
  { name: 'Centro-Oeste', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Sudeste', color: 'bg-red-100 text-red-800' },
  { name: 'Sul', color: 'bg-purple-100 text-purple-800' }
];

export default async function Home() {
  const states = await getStates();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';

  return (
    <>
      <WebsiteStructuredData url={baseUrl} />
      <OrganizationStructuredData url={baseUrl} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MEU DDD</h1>
                <p className="text-sm text-gray-600">Encontre códigos de área telefônica por estado e cidade</p>
              </div>
            </div>
            <nav className="flex space-x-4">
              <Link href="/sobre" className="text-gray-600 hover:text-gray-900">
                Sobre
              </Link>
              <Link href="/contato" className="text-gray-600 hover:text-gray-900">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre o Código DDD que Você Precisa
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Busque por estado, cidade ou código DDD. Temos informações de todos os 27 estados brasileiros.
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
              Estados Brasileiros
            </h2>
            <p className="text-lg text-gray-600">
              Clique em um estado para ver detalhes dos códigos DDD e cidades
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre</h3>
              <p className="text-gray-400 text-sm">
                Plataforma completa para consulta de códigos DDD do Brasil, 
                com informações atualizadas e detalhadas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="text-gray-400 hover:text-white">Sobre Nós</Link></li>
                <li><Link href="/contato" className="text-gray-400 hover:text-white">Contato</Link></li>
                <li><Link href="/privacidade" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Regiões</h3>
              <ul className="space-y-2 text-sm">
                {regions.map((region) => (
                  <li key={region.name}>
                    <Link href={`/regiao/${region.name.toLowerCase()}`} className="text-gray-400 hover:text-white">
                      {region.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ferramentas</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/validar-ddd" className="text-gray-400 hover:text-white">Validar DDD</Link></li>
                <li><Link href="/gerador-numeros" className="text-gray-400 hover:text-white">Gerador de Números</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-white">API</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MEU DDD. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}