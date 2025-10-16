import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Phone, Building } from 'lucide-react';
import { db } from '@/lib/db';
import { DDDContent } from '@/components/ddd/DDDContent';
import { StateContent } from '@/components/state/StateContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const state = await db.state.findUnique({
      where: { slug },
      include: {
        dddCodes: true,
        cities: {
          where: { isCapital: true },
          take: 1
        }
      }
    });

    if (!state) {
      return {
        title: 'Estado Não Encontrado',
        description: 'O estado solicitado não foi encontrado em nosso banco de dados.'
      };
    }

    const capital = state.cities[0];
    const mainDDD = state.dddCodes[0];

    return {
      title: `DDD ${mainDDD.code} - ${state.name} | Código de Discagem Direta`,
      description: `Encontre o código DDD ${mainDDD.code} para ${state.name}. Lista completa de cidades com DDD ${mainDDD.code}, incluindo ${capital?.name || 'cidades principais'}. Informações de discagem direta.`,
      keywords: `DDD ${mainDDD.code}, ${state.name}, código DDD, discagem direta, ${capital?.name || 'cidades'}, telefone, Brasil`,
      openGraph: {
        title: `DDD ${mainDDD.code} - ${state.name}`,
        description: `Código DDD ${mainDDD.code} para ${state.name} e todas as cidades`,
        type: 'website',
        locale: 'pt_BR',
      },
      alternates: {
        canonical: `/estados/${slug}`
      }
    };
  } catch (error) {
    return {
      title: 'Erro ao Carregar Estado',
      description: 'Ocorreu um erro ao carregar as informações do estado.'
    };
  }
}

export default async function EstadoPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const state = await db.state.findUnique({
      where: { slug },
      include: {
        dddCodes: {
          orderBy: { code: 'asc' }
        },
        cities: {
          orderBy: { population: 'desc' }
        }
      }
    });

    if (!state) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Estado Não Encontrado</h1>
              <p className="text-xl text-gray-600 mb-8">O estado solicitado não foi encontrado em nosso banco de dados.</p>
              <Link 
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
              >
                Voltar para a Página Inicial
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const mainDDD = state.dddCodes[0];
    const capital = state.cities.find(city => city.isCapital) || state.cities[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-2 block">
                  ← Voltar para Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                  DDD {mainDDD.code} - {state.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Código de Discagem Direta para {state.cities.length} cidades
                </p>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {state.region}
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-8">
              <DDDContent 
                stateName={state.name}
                stateCode={state.code}
                dddCode={mainDDD.code}
                cities={state.cities}
                capital={capital}
              />
              
              <StateContent 
                state={state}
                mainDDD={mainDDD}
                cities={state.cities}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Card de Informações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    Informações do Estado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capital:</span>
                    <span className="font-medium">{capital.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Região:</span>
                    <span className="font-medium">{state.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código DDD:</span>
                    <span className="font-medium">{mainDDD.code}</span>
                  </div>
                  {state.population && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">População:</span>
                      <span className="font-medium">{state.population.toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                  {state.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-medium">{state.area.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Estatísticas Rápidas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Cidades</span>
                    </div>
                    <span className="font-bold text-lg">{state.cities.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Códigos DDD</span>
                    </div>
                    <span className="font-bold text-lg">{state.dddCodes.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cidades Principais */}
              <Card>
                <CardHeader>
                  <CardTitle>Cidades Principais</CardTitle>
                  <CardDescription>
                    As maiores cidades por população
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {state.cities.slice(0, 5).map((city) => (
                      <Link
                        key={city.id}
                        href={`/estados/${state.slug}/${city.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium">{city.name}</span>
                        {city.isCapital && (
                          <Badge variant="secondary" className="text-xs">Capital</Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                  {state.cities.length > 5 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 text-center">
                        +{state.cities.length - 5} outras cidades
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading state:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Erro ao Carregar Estado</h1>
            <p className="text-xl text-gray-600 mb-8">Ocorreu um erro ao carregar as informações do estado.</p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
            >
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }
}