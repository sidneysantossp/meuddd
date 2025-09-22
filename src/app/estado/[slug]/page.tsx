import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { StateCard } from '@/components/ddd/StateCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Phone, Building, Globe } from 'lucide-react';
import { db } from '@/lib/db';
import { StateStructuredData } from '@/components/seo/StateStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { SEOContent } from '@/components/seo/SEOContent';
import Link from 'next/link';

interface StatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getState(slug: string) {
  try {
    const state = await db.state.findFirst({
      where: {
        slug: slug
      },
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
          take: 20 // Limitar para não sobrecarregar a página
        }
      }
    });

    if (!state) {
      return null;
    }

    return state;
  } catch (error) {
    console.error('Error fetching state:', error);
    return null;
  }
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const state = await getState(slug);
    
    if (!state) {
      return {
        title: 'Estado não encontrado',
        description: 'O estado solicitado não foi encontrado em nossa base de dados.'
      };
    }

    const dddCodes = state.dddCodes.map(ddd => ddd.code).join(', ');
    
    return {
      title: `Códigos DDD ${state.name} (${state.code}) - Lista Completa`,
      description: `Encontre todos os códigos DDD de ${state.name}. Códigos: ${dddCodes}. Informações atualizadas sobre telefonia fixa e móvel.`,
      keywords: `DDD ${state.name}, DDD ${state.code}, códigos DDD ${state.name}, telefonia ${state.name}, ${state.dddCodes.map(d => `DDD ${d.code}`).join(', ')}`,
      openGraph: {
        title: `Códigos DDD ${state.name} (${state.code})`,
        description: `Lista completa de códigos DDD de ${state.name} - ${dddCodes}`,
        type: 'website',
        locale: 'pt_BR'
      },
      twitter: {
        card: 'summary_large_image',
        title: `Códigos DDD ${state.name} (${state.code})`,
        description: `Lista completa de códigos DDD de ${state.name}`
      },
      alternates: {
        canonical: `https://meuddd.com.br/estado/${state.slug}`
      },
      other: {
        'geo.region': state.code,
        'geo.placename': state.name
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Erro ao carregar página',
      description: 'Ocorreu um erro ao carregar as informações do estado.'
    };
  }
}

export default async function StatePage({ params }: StatePageProps) {
  try {
    const { slug } = await params;
    const state = await getState(slug);

    if (!state) {
      notFound();
    }

    const formatNumber = (num?: number | null) => {
      if (!num) return '';
      return num.toLocaleString('pt-BR');
    };

    const formatArea = (area?: number | null) => {
      if (!area) return '';
      return `${area.toLocaleString('pt-BR')} km²`;
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';
    const canonicalUrl = `${baseUrl}/estado/${state.slug}`;

    const breadcrumbItems = [
      { name: 'Home', url: baseUrl },
      { name: state.name, url: canonicalUrl }
    ];

  return (
    <>
      <StateStructuredData state={state} url={canonicalUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
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
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{state.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* State Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {state.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{state.region}</span>
                  </div>
                  <Badge variant="secondary">{state.code}</Badge>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/">
                  <Button variant="outline">
                    Voltar para todos os estados
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(state.population)}
                  </div>
                  <div className="text-sm text-gray-600">Habitantes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatArea(state.area)}
                  </div>
                  <div className="text-sm text-gray-600">Área</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.dddCodes.length}
                  </div>
                  <div className="text-sm text-gray-600">Códigos DDD</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* DDD Codes Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Códigos DDD de {state.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.dddCodes.map((dddCode) => (
                    <Card key={dddCode.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold text-blue-600">
                          DDD {dddCode.code}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">
                          {dddCode.description || `Código DDD para região de ${state.name}`}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Main Cities Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Principais Cidades de {state.name}
                  </h2>
                  <Button variant="outline" size="sm">
                    Ver todas as cidades
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    {state.cities.map((city) => (
                      <div key={city.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{city.name}</div>
                          {city.isCapital && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Capital
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(city.population)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Perguntas Frequentes sobre DDD em {state.name}
                </h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quantos códigos DDD existem em {state.name}?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {state.name} possui {state.dddCodes.length} códigos DDD: {state.dddCodes.map(d => d.code).join(', ')}. 
                        Cada código atende a uma região específica do estado.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Qual é o principal código DDD de {state.name}?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        O principal código DDD de {state.name} é geralmente o da região metropolitana 
                        ou da capital, que é {state.dddCodes[0]?.code || 'consulte a lista acima'}.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Como saber qual DDD usar para ligar para {state.name}?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Para saber qual DDD usar, você precisa conhecer a cidade ou região específica 
                        de {state.name} para onde deseja ligar. Consulte nossa lista acima ou 
                        utilize nossa ferramenta de busca para encontrar o código DDD correto.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Links */}
              <RelatedLinks 
                currentState={state.name}
                currentRegion={state.region}
                limit={8}
              />

              {/* SEO Content */}
              <SEOContent 
                currentState={state.name}
                currentRegion={state.region}
                contentType="faq"
              />

              {/* Additional Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ferramentas Úteis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/validar-ddd" className="block">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 text-center">
                      <div className="font-medium text-sm">Validar DDD</div>
                      <div className="text-xs text-gray-600">Verifique códigos DDD</div>
                    </div>
                  </Link>
                  
                  <Link href="/gerador-numeros" className="block">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 text-center">
                      <div className="font-medium text-sm">Gerar Números</div>
                      <div className="text-xs text-gray-600">Crie números para testes</div>
                    </div>
                  </Link>
                  
                  <Link href="/busca-por-voz" className="block">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 text-center">
                      <div className="font-medium text-sm">Busca por Voz</div>
                      <div className="text-xs text-gray-600">Use comandos de voz</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informações sobre {state.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Telefonia em {state.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {state.name} possui {state.dddCodes.length} códigos DDD diferentes, 
                    atendendo a diversas regiões do estado. Cada código DDD corresponde a 
                    uma área geográfica específica, facilitando a identificação da origem 
                    das chamadas telefônicas.
                  </p>
                  <p className="text-gray-600">
                    Os códigos DDD são essenciais para o sistema de telefonia brasileiro, 
                    permitindo a realização de chamadas de longa distância dentro do estado 
                    e para outras regiões do país.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Como usar os códigos DDD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Chamadas dentro do estado:</h4>
                      <p className="text-sm text-gray-600">
                        0 + código DDD + número do telefone
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Chamadas para outros estados:</h4>
                      <p className="text-sm text-gray-600">
                        0 + código da operadora + código DDD + número do telefone
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Chamadas para celulares:</h4>
                      <p className="text-sm text-gray-600">
                        0 + código da operadora + código DDD + número do celular
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related States */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Outros estados da {state.region}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* This would be populated with related states from the same region */}
              <div className="text-center text-gray-500 py-8">
                Em breve: outros estados da mesma região
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
  } catch (error) {
    console.error('Error in StatePage:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar página</h1>
          <p className="text-gray-600 mb-6">Ocorreu um erro ao carregar as informações do estado. Por favor, tente novamente mais tarde.</p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    );
  }
}