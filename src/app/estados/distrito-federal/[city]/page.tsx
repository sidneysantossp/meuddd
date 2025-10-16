import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Phone, Building, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { CityContent } from '@/components/city/CityContent';
import { SEOCityContent } from '@/components/city/SEOCityContent';

interface PageProps {
  params: Promise<{ 
    slug: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city } = await params;
  
  try {
    const cityData = await db.city.findFirst({
      where: { slug: city },
      include: {
        state: true,
        cityDddCodes: {
          include: {
            dddCode: true
          }
        }
      }
    });

    if (!cityData) {
      return {
        title: 'Cidade Não Encontrada',
        description: 'A cidade solicitada não foi encontrada em nosso banco de dados.'
      };
    }

    const dddCodes = cityData.cityDddCodes.map(cdc => cdc.dddCode);
    const mainDDD = dddCodes[0];

    return {
      title: `DDD ${mainDDD.code} - ${cityData.name}, ${cityData.state.name} | Código de Discagem`,
      description: `Encontre o código DDD ${mainDDD.code} para ${cityData.name}, ${cityData.state.name}. Informações completas sobre discagem direta, operadoras e dicas de ligação.`,
      keywords: `DDD ${mainDDD.code}, ${cityData.name}, ${cityData.state.name}, código DDD, discagem direta, telefone, Brasil`,
      openGraph: {
        title: `DDD ${mainDDD.code} - ${cityData.name}`,
        description: `Código DDD ${mainDDD.code} para ${cityData.name}, ${cityData.state.name}`,
        type: 'website',
        locale: 'pt_BR',
      },
      alternates: {
        canonical: `/estados/${slug}/${city}`
      }
    };
  } catch (error) {
    return {
      title: 'Erro ao Carregar Cidade',
      description: 'Ocorreu um erro ao carregar as informações da cidade.'
    };
  }
}

export default async function CityPage({ params }: PageProps) {
  const { slug, city } = await params;
  
  try {
    const cityData = await db.city.findFirst({
      where: { slug: city },
      include: {
        state: {
          include: {
            dddCodes: true,
            cities: {
              orderBy: { population: 'desc' },
              take: 10
            }
          }
        },
        cityDddCodes: {
          include: {
            dddCode: true
          }
        }
      }
    });

    if (!cityData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cidade Não Encontrada</h1>
              <p className="text-xl text-gray-600 mb-8">A cidade solicitada não foi encontrada em nosso banco de dados.</p>
              <Link 
                href={`/estados/${slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
              >
                Voltar para {slug.replace('-', ' ').toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const dddCodes = cityData.cityDddCodes.map(cdc => cdc.dddCode);
    const mainDDD = dddCodes[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link 
                  href={`/estados/${slug}`}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-2 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para {cityData.state.name}
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                  DDD {mainDDD.code} - {cityData.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {cityData.name}, {cityData.state.name} • Código de Discagem Direta
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cityData.isCapital && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Capital
                  </Badge>
                )}
                <Badge variant="outline" className="border-orange-200 text-orange-700">
                  {cityData.state.code}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-8">
              <CityContent 
                city={cityData}
                state={cityData.state}
                dddCodes={dddCodes}
                mainDDD={mainDDD}
              />
              
              <SEOCityContent 
                cityName={cityData.name}
                stateName={cityData.state.name}
                stateCode={cityData.state.code}
                dddCodes={dddCodes}
                population={cityData.population}
                area={cityData.area}
                isCapital={cityData.isCapital}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Card de Informações da Cidade */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    Informações da Cidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium">{cityData.state.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código DDD:</span>
                    <span className="font-medium">{mainDDD.code}</span>
                  </div>
                  {cityData.population && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">População:</span>
                      <span className="font-medium">{cityData.population.toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                  {cityData.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-medium">{cityData.area.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²</span>
                    </div>
                  )}
                  {cityData.population && cityData.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Densidade:</span>
                      <span className="font-medium">
                        {Math.round(cityData.population / cityData.area)} hab/km²
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Como Ligar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-orange-600" />
                    Como Ligar para {cityData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Do mesmo estado:</h4>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                      {mainDDD.code} + número do telefone
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">De outro estado:</h4>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                      0 + {mainDDD.code} + número do telefone
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Do exterior:</h4>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                      +55 + {mainDDD.code} + número do telefone
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Outras Cidades do Estado */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-orange-600" />
                    Outras Cidades
                  </CardTitle>
                  <CardDescription>
                    Principais cidades de {cityData.state.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cityData.state.cities
                      .filter(c => c.id !== cityData.id)
                      .slice(0, 5)
                      .map((c) => (
                        <Link
                          key={c.id}
                          href={`/estados/${slug}/${c.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium">{c.name}</span>
                          {c.isCapital && (
                            <Badge variant="secondary" className="text-xs">Capital</Badge>
                          )}
                        </Link>
                      ))}
                  </div>
                  {cityData.state.cities.length > 6 && (
                    <div className="mt-4 pt-4 border-t">
                      <Link
                        href={`/estados/${slug}`}
                        className="text-xs text-orange-600 hover:text-orange-700 text-center block"
                      >
                        Ver todas as cidades →
                      </Link>
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
    console.error('Error loading city:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Erro ao Carregar Cidade</h1>
            <p className="text-xl text-gray-600 mb-8">Ocorreu um erro ao carregar as informações da cidade.</p>
            <Link 
              href={`/estados/${slug}`}
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
            >
              Voltar para {slug.replace('-', ' ').toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}