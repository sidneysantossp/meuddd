'use client';

import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Phone, Building, Globe, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { StateStructuredData } from '@/components/seo/StateStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { SEOContent } from '@/components/seo/SEOContent';
import CityList from '@/components/estado/CityList';
import { StateInfo } from '@/components/estado/StateInfo';
import { TelephonyInfo } from '@/components/estado/TelephonyInfo';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  createdAt: Date;
  updatedAt: Date;
  cities: City[];
  dddCodes: DddCode[];
}

interface City {
  id: string;
  name: string;
  slug: string;
  population: number | null;
  area: number | null;
  latitude: number | null;
  longitude: number | null;
  isCapital: boolean;
  stateId: string;
  createdAt: Date;
  updatedAt: Date;
  dddCodes: DddCode[];
}

interface DddCode {
  id: string;
  code: string;
  description: string | null;
  stateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AcrePage() {
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        console.log('Fetching Acre state data...');
        const response = await fetch(`/api/ddd/states`);
        
        if (!response.ok) {
          console.error(`API response failed with status: ${response.status}`);
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const states = await response.json();
        console.log(`API returned ${states.length} states`);
        
        const foundState = states.find((s: State) => s.slug === 'acre');
        
        if (foundState) {
          console.log(`Found Acre state with ${foundState.cities.length} cities`);
          setState(foundState);
        } else {
          console.error('Acre state not found in API response');
          console.log('Available states:', states.map((s: State) => s.slug));
          notFound();
        }
      } catch (error) {
        console.error('Error fetching Acre state:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadState();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do Acre...</p>
        </div>
      </div>
    );
  }

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com';
  const canonicalUrl = `${baseUrl}/estado/acre`;

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Acre', url: canonicalUrl }
  ];

  return (
    <>
      <StateStructuredData state={state} url={canonicalUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Acre</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* State Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  DDD do Acre - Guia Completo de Códigos Telefônicos
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{state.region}</span>
                  </div>
                  <Badge variant="secondary">{state.code}</Badge>
                </div>
                <p className="text-lg text-gray-600">
                  Encontre o código DDD 68 para todas as {state.cities.length} cidades do Acre. 
                  Guia completo com informações de telefonia para {formatNumber(state.population)} habitantes.
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

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                O Acre, localizado na região Norte do Brasil, é atendido pelo <strong>código DDD 68</strong>, 
                que cobre todas as {state.cities.length} cidades do estado. Com capital em {state.capital}, 
                o Acre possui uma população de {formatNumber(state.population)} habitantes e área de {formatArea(state.area)}. 
                Nosso guia completo oferece informações detalhadas sobre a telefonia no estado, 
                incluindo lista de cidades, operadoras disponíveis e dicas para fazer ligações.
              </p>
            </CardContent>
          </Card>

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
                    Perguntas Frequentes sobre DDD do Acre
                  </CardTitle>
                  <CardDescription>
                    Tire suas dúvidas sobre códigos DDD e telefonia no Acre
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quantos códigos DDD existem no Acre?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          O Acre possui {state.dddCodes.length} código DDD: {state.dddCodes.map(d => d.code).join(', ')}. 
                          Este código atende a todas as {state.cities.length} cidades do estado, garantindo cobertura telefônica completa 
                          para toda a população de {formatNumber(state.population)} habitantes.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Qual é o código DDD do Acre?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          O código DDD do Acre é {state.dddCodes[0]?.code || '68'}. Este é o único código DDD do estado 
                          e atende a todas as cidades acreanas, incluindo a capital {state.capital}.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Como fazer ligações para o Acre?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">
                          Para fazer ligações para o Acre, siga o formato correto:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div><strong>Ligações locais dentro do estado:</strong> 0 + 68 + número do telefone</div>
                          <div><strong>Ligações de outros estados:</strong> 0 + código da operadora + 68 + número do telefone</div>
                          <div><strong>Ligações para celulares:</strong> 0 + código da operadora + 68 + 9 + número do celular</div>
                        </div>
                        <p className="text-gray-600 mt-3">
                          Os principais códigos de operadora são: 15 (TIM), 21 (Claro), 41 (Vivo), 14 (Oi).
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quantas cidades tem no Acre?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          O Acre possui um total de {state.cities.length} cidades oficialmente registradas. 
                          A capital é {state.capital} e todas as cidades são atendidas pelo código DDD 68. 
                          Nossa lista completa acima mostra todas as cidades com seus respectivos códigos DDD para facilitar 
                          suas ligações telefônicas.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Cards Section - Side by Side */}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related Links */}
              <RelatedLinks 
                currentState={state.name}
                currentRegion={state.region}
                limit={6}
              />

              {/* FAQ Content */}
              <SEOContent 
                currentState={state.name}
                currentRegion={state.region}
                contentType="faq"
              />

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas Rápidas</CardTitle>
                  <CardDescription>
                    Informações essenciais sobre o Acre
                  </CardDescription>
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
                    <span className="text-sm text-gray-600">Capital:</span>
                    <span className="text-sm font-medium">{state.capital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Código DDD:</span>
                    <span className="text-sm font-medium">{state.dddCodes[0]?.code || '68'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Região:</span>
                    <span className="text-sm font-medium">{state.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cidades:</span>
                    <span className="text-sm font-medium">{state.cities.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}