import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Phone, Building, Globe, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { StateStructuredData } from '@/components/seo/StateStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { SEOContent } from '@/components/seo/SEOContent';
import { CityList } from '@/components/estado/CityList';
import { StateInfo } from '@/components/estado/StateInfo';
import { TelephonyInfo } from '@/components/estado/TelephonyInfo';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
          include: {
            dddCodes: true
          }
          // Removido o limite para buscar todas as cidades
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
    const cityCount = state.cities.length;
    
    return {
      title: `DDD de ${state.name} - ${cityCount} Cidades com Códigos Telefônicos`,
      description: `Lista completa de ${cityCount} cidades de ${state.name} com seus respectivos códigos DDD: ${dddCodes}. Encontre o telefone de qualquer cidade do estado. Guia completo de telefonia.`,
      keywords: `DDD de ${state.name}, cidades de ${state.name}, código DDD ${state.name}, telefonia ${state.name}, ${state.dddCodes.map(d => `DDD ${d.code}`).join(', ')}, lista cidades ${state.name}, telefone ${state.name}`,
      openGraph: {
        title: `DDD de ${state.name} - Guia Completo com ${cityCount} Cidades`,
        description: `Descubra todos os códigos DDD de ${state.name} para ${cityCount} cidades. Lista completa e atualizada com informações de telefonia.`,
        type: 'website',
        locale: 'pt_BR'
      },
      twitter: {
        card: 'summary_large_image',
        title: `DDD de ${state.name} - ${cityCount} Cidades`,
        description: `Lista completa de cidades de ${state.name} com códigos DDD para suas ligações.`
      },
      alternates: {
        canonical: `https://meuddd.vercel.app/estado/${state.slug}`
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  DDD de {state.name} - Guia Completo
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{state.region}</span>
                  </div>
                  <Badge variant="secondary">{state.code}</Badge>
                </div>
                <p className="text-lg text-gray-600">
                  {state.cities.length} cidades • {state.dddCodes.length} códigos DDD • {formatNumber(state.population)} habitantes
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/">
                  <Button variant="outline" size="lg">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar para todos os estados
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    {state.cities.length}
                  </div>
                  <div className="text-sm text-gray-600">Cidades</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.dddCodes.length}
                  </div>
                  <div className="text-sm text-gray-600">Códigos DDD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Tabs */}
          <Tabs defaultValue="cidades" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="cidades" className="text-sm">
                Cidades ({state.cities.length})
              </TabsTrigger>
              <TabsTrigger value="informacoes" className="text-sm">
                Informações
              </TabsTrigger>
              <TabsTrigger value="telefonia" className="text-sm">
                Telefonia
              </TabsTrigger>
              <TabsTrigger value="faq" className="text-sm">
                Dúvidas
              </TabsTrigger>
            </TabsList>

            {/* Cities Tab */}
            <TabsContent value="cidades" className="space-y-6">
              <CityList 
                cities={state.cities}
                stateName={state.name}
                stateSlug={state.slug}
                itemsPerPage={60}
              />
            </TabsContent>

            {/* State Information Tab */}
            <TabsContent value="informacoes" className="space-y-6">
              <StateInfo state={state} />
            </TabsContent>

            {/* Telephony Information Tab */}
            <TabsContent value="telefonia" className="space-y-6">
              <TelephonyInfo state={state} />
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Perguntas Frequentes sobre DDD de {state.name}
                  </CardTitle>
                  <CardDescription>
                    Tire suas dúvidas sobre códigos DDD e telefonia em {state.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quantos códigos DDD existem em {state.name}?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          {state.name} possui {state.dddCodes.length} códigos DDD: {state.dddCodes.map(d => d.code).join(', ')}. 
                          Cada código atende a uma região específica do estado, cobrindo todas as {state.cities.length} cidades 
                          e garantindo cobertura telefônica completa para toda a população de {formatNumber(state.population)} habitantes.
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
                          ou da capital {state.capital}, que é {state.dddCodes[0]?.code || 'consulte a lista acima'}.
                          Este é o código mais utilizado para ligações telefônicas na região, atendendo à maior 
                          concentração populacional do estado.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Como saber qual DDD usar para ligar para {state.name}?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Para saber qual DDD usar para fazer ligações para {state.name}, você precisa conhecer a cidade ou região específica 
                          para onde deseja ligar. Utilize nossa lista completa de cidades acima para encontrar o código DDD correto. 
                          Você também pode usar nossa ferramenta de busca rápida digitando o nome da cidade desejada.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quantas cidades têm em {state.name}?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          {state.name} possui um total de {state.cities.length} cidades oficialmente registradas. 
                          Destas, {state.capital ? '1 é capital' : 'nenhuma é capital'} e todas são atendidas pelos {state.dddCodes.length} códigos DDD do estado. 
                          Nossa lista completa acima mostra todas as cidades com seus respectivos códigos DDD para facilitar 
                          suas ligações telefônicas.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Como fazer ligações para {state.name}?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">
                          Para fazer ligações para {state.name}, siga o formato correto:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div><strong>Ligações locais dentro do estado:</strong> 0 + código DDD + número do telefone</div>
                          <div><strong>Ligações de outros estados:</strong> 0 + código da operadora + código DDD + número do telefone</div>
                          <div><strong>Ligações para celulares:</strong> 0 + código da operadora + código DDD + 9 + número do celular</div>
                        </div>
                        <p className="text-gray-600 mt-3">
                          Os principais códigos de operadora são: 15 (TIM), 21 (Claro), 41 (Vivo), 14 (Oi).
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">O que fazer se não encontrar o DDD de uma cidade?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Se você não encontrar o DDD de uma cidade específica de {state.name} em nossa lista, 
                          verifique se o nome da cidade está digitado corretamente ou utilize nossa ferramenta de busca. 
                          Caso ainda não encontre, entre em contato conosco para que possamos atualizar nossa base de dados 
                          com as informações mais recentes sobre os códigos DDD de {state.name}.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            <div className="lg:col-span-3">
              {/* Additional content can be added here */}
            </div>
            
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

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">População:</span>
                    <span className="text-sm font-medium">{formatNumber(state.population)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Área:</span>
                    <span className="text-sm font-medium">{formatArea(state.area)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cidades:</span>
                    <span className="text-sm font-medium">{state.cities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Códigos DDD:</span>
                    <span className="text-sm font-medium">{state.dddCodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Região:</span>
                    <span className="text-sm font-medium">{state.region}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  } catch (error) {
    console.error('Error in StatePage:', error);
    notFound();
  }
}