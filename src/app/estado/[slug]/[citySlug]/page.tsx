'use client';

import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Phone, Building, Globe, ArrowLeft, Link as LinkIcon, Navigation, Wifi, Star, Clock, TrendingUp, ChevronDown, Info, Map, PhoneCall, Settings, HelpCircle, Building2, Home, Car, Bus, Train, Plane, DollarSign, Heart, BookOpen, Coffee, ShoppingBag, Hospital, School, TreePine, BarChart, Camera, Calendar, Music, Utensils, CheckCircle } from 'lucide-react';
import { CityStructuredData } from '@/components/seo/CityStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { SEOContent } from '@/components/seo/SEOContent';
import InteractiveMap from '@/components/ui/InteractiveMap';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface City {
  id: string;
  name: string;
  slug: string;
  population?: number | null;
  area?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  isCapital: boolean;
  state: {
    name: string;
    slug: string;
    code: string;
    region: string;
  };
  dddCodes: Array<{
    id: string;
    code: string;
    description?: string | null;
  }>;
}

interface PageProps {
  params: Promise<{
    slug: string;
    citySlug: string;
  }>;
}

export default function CityPage({ params }: PageProps) {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');
  const [citySlug, setCitySlug] = useState<string>('');
  const [showMoreContent, setShowMoreContent] = useState(false);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      setCitySlug(resolvedParams.citySlug);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!slug || !citySlug) return;

    const loadCity = async () => {
      try {
        // Buscar dados do estado
        const stateResponse = await fetch(`/api/ddd/states`);
        const states = await stateResponse.json();
        
        const foundState = states.find((s: any) => s.slug === slug);
        
        if (foundState) {
          // Encontrar a cidade no estado
          const foundCity = foundState.cities.find((c: any) => c.slug === citySlug);
          
          if (foundCity) {
            setCity({
              ...foundCity,
              state: {
                name: foundState.name,
                slug: foundState.slug,
                code: foundState.code,
                region: foundState.region
              }
            });
          } else {
            notFound();
          }
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching city:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadCity();
  }, [slug, citySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informacoes da cidade...</p>
        </div>
      </div>
    );
  }

  if (!city) {
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
  const canonicalUrl = `${baseUrl}/estado/${city.state.slug}/${city.slug}`;
  const dddCode = city.dddCodes[0]?.code || "00";

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: city.state.name, url: `${baseUrl}/estado/${city.state.slug}` },
    { name: city.name, url: canonicalUrl }
  ];

  // Layout padrao para todas as cidades
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/estados">Estados</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/estado/${city.state.slug}`}>{city.state.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{city.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              DDD {dddCode} em {city.name}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {city.isCapital ? 'Capital' : 'Cidade'} de {city.state.name} e seu codigo DDD completo
            </p>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Phone className="h-6 w-6 mr-2" />
              <span className="text-2xl font-bold">{dddCode}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Informações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="font-medium">{city.state.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DDD:</span>
                  <Badge variant="secondary">{dddCode}</Badge>
                </div>
                {city.population && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">População:</span>
                    <span className="font-medium">{formatNumber(city.population)}</span>
                  </div>
                )}
                {city.area && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{formatArea(city.area)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">{city.isCapital ? 'Capital' : 'Cidade'}</span>
                </div>
                <div className="pt-3 border-t">
                  <h4 className="font-semibold mb-2">Acesso Rápido</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Informações DDD
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Map className="h-4 w-4 mr-2" />
                      Mapa Interativo
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Serviços Locais
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Info className="h-4 w-4 mr-2" />
                      Dados Demográficos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="ddd" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="ddd" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">DDD</span>
                </TabsTrigger>
                <TabsTrigger value="mapa" className="flex items-center gap-1">
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline">Mapa</span>
                </TabsTrigger>
                <TabsTrigger value="servicos" className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Serviços</span>
                </TabsTrigger>
                <TabsTrigger value="dados" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Dados</span>
                </TabsTrigger>
                <TabsTrigger value="turismo" className="flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  <span className="hidden sm:inline">Turismo</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">FAQ</span>
                </TabsTrigger>
              </TabsList>

              {/* DDD Information Tab */}
              <TabsContent value="ddd" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        DDD {dddCode} em {city.name}
                      </CardTitle>
                      <CardDescription>
                        Informações completas sobre o código DDD
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-gray-800">
                          O DDD de {city.name} é <strong>{dddCode}</strong>, o mesmo código utilizado em todo o estado de {city.state.name}.
                          {city.isCapital && ' Como capital do estado, concentra o maior volume de ligações.'}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold">Como ligar para {city.name}:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <PhoneCall className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">Do Brasil</p>
                              <p className="text-sm text-gray-600">{dddCode} + número</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Globe className="h-5 w-5 mr-3 text-green-600" />
                            <div>
                              <p className="font-medium">Do exterior</p>
                              <p className="text-sm text-gray-600">+55 {dddCode} + número</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Navigation className="h-5 w-5 mr-3 text-purple-600" />
                            <div>
                              <p className="font-medium">Dentro da cidade</p>
                              <p className="text-sm text-gray-600">Apenas o número</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Operadoras Disponíveis
                      </CardTitle>
                      <CardDescription>
                        Principais operadoras de telefonia na região
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <Wifi className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Vivo</p>
                              <p className="text-sm text-gray-600">Excelente cobertura</p>
                            </div>
                          </div>
                          <Badge variant="secondary">4G/5G</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Wifi className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Claro</p>
                              <p className="text-sm text-gray-600">Boa cobertura</p>
                            </div>
                          </div>
                          <Badge variant="secondary">4G</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <Wifi className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">TIM</p>
                              <p className="text-sm text-gray-600">Cobertura regular</p>
                            </div>
                          </div>
                          <Badge variant="secondary">4G</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <Wifi className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-medium">Oi</p>
                              <p className="text-sm text-gray-600">Cobertura limitada</p>
                            </div>
                          </div>
                          <Badge variant="outline">3G/4G</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-semibold">Horário de Pico</h4>
                        <p className="text-sm text-gray-600">Maior volume de ligações entre 18h-22h</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-semibold">Crescimento</h4>
                        <p className="text-sm text-gray-600">Aumento de 15% nas ligações nos últimos anos</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h4 className="font-semibold">Qualidade</h4>
                        <p className="text-sm text-gray-600">Excelente qualidade de sinal na região</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Map Tab */}
              <TabsContent value="mapa" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Map className="h-5 w-5 mr-2" />
                      Mapa Interativo de {city.name}
                    </CardTitle>
                    <CardDescription>
                      Explore a localização e pontos de interesse
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InteractiveMap 
                      cityName={city.name}
                      stateName={city.state.name}
                      latitude={city.latitude}
                      longitude={city.longitude}
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Navigation className="h-5 w-5 mr-2" />
                        Como Chegar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Car className="h-5 w-5 mr-3 text-blue-600" />
                          <div>
                            <p className="font-medium">De Carro</p>
                            <p className="text-sm text-gray-600">Acesso pelas principais rodovias</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Bus className="h-5 w-5 mr-3 text-green-600" />
                          <div>
                            <p className="font-medium">De Ônibus</p>
                            <p className="text-sm text-gray-600">Terminal rodoviário central</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Plane className="h-5 w-5 mr-3 text-purple-600" />
                          <div>
                            <p className="font-medium">De Avião</p>
                            <p className="text-sm text-gray-600">Aeroporto regional próximo</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Pontos de Referência
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border-b">
                          <span className="font-medium">Centro</span>
                          <Badge variant="outline">Principal</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b">
                          <span className="font-medium">Área Comercial</span>
                          <Badge variant="outline">Negócios</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b">
                          <span className="font-medium">Zona Residencial</span>
                          <Badge variant="outline">Residencial</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <span className="font-medium">Distrito Industrial</span>
                          <Badge variant="outline">Industrial</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="servicos" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        Serviços Públicos
                      </CardTitle>
                      <CardDescription>
                        Telefones úteis e emergência
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-red-600" />
                            <div>
                              <p className="font-medium">Polícia Militar</p>
                              <p className="text-sm text-gray-600">Emergência</p>
                            </div>
                          </div>
                          <Badge variant="destructive">190</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">SAMU</p>
                              <p className="text-sm text-gray-600">Ambulância</p>
                            </div>
                          </div>
                          <Badge variant="secondary">192</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-orange-600" />
                            <div>
                              <p className="font-medium">Bombeiros</p>
                              <p className="text-sm text-gray-600">Resgate</p>
                            </div>
                          </div>
                          <Badge variant="outline">193</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-green-600" />
                            <div>
                              <p className="font-medium">Defesa Civil</p>
                              <p className="text-sm text-gray-600">Desastres</p>
                            </div>
                          </div>
                          <Badge variant="outline">199</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        Serviços Locais
                      </CardTitle>
                      <CardDescription>
                        Estabelecimentos importantes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Hospital className="h-5 w-5 mr-3 text-red-600" />
                          <div>
                            <p className="font-medium">Hospital Municipal</p>
                            <p className="text-sm text-gray-600">24 horas</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <School className="h-5 w-5 mr-3 text-blue-600" />
                          <div>
                            <p className="font-medium">Escolas Públicas</p>
                            <p className="text-sm text-gray-600">Rede municipal</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <ShoppingBag className="h-5 w-5 mr-3 text-green-600" />
                          <div>
                            <p className="font-medium">Centro Comercial</p>
                            <p className="text-sm text-gray-600">Lojas e serviços</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Coffee className="h-5 w-5 mr-3 text-yellow-600" />
                          <div>
                            <p className="font-medium">Restaurantes</p>
                            <p className="text-sm text-gray-600">Variadas opções</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Operadoras - Serviços ao Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold">Vivo</h4>
                        <p className="text-sm text-gray-600">*8486</p>
                        <p className="text-xs text-gray-500">24h</p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold">Claro</h4>
                        <p className="text-sm text-gray-600">*1052</p>
                        <p className="text-xs text-gray-500">24h</p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-6 w-6 text-red-600" />
                        </div>
                        <h4 className="font-semibold">TIM</h4>
                        <p className="text-sm text-gray-600">*144</p>
                        <p className="text-xs text-gray-500">24h</p>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h4 className="font-semibold">Oi</h4>
                        <p className="text-sm text-gray-600">*105*41</p>
                        <p className="text-xs text-gray-500">24h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Tab */}
              <TabsContent value="dados" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        População
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {city.population ? formatNumber(city.population) : 'N/A'}
                        </div>
                        <p className="text-sm text-gray-600">Habitantes</p>
                        <div className="mt-4">
                          <div className="flex items-center justify-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="text-sm">+2.5% ao ano</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Área
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {city.area ? formatArea(city.area) : 'N/A'}
                        </div>
                        <p className="text-sm text-gray-600">Área total</p>
                        <div className="mt-4">
                          <div className="text-sm text-gray-500">
                            {city.area && city.population ? 
                              `${Math.round(city.population / city.area)} hab/km²` : 
                              'Densidade não disponível'
                            }
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        Tipo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {city.isCapital ? 'Capital' : 'Cidade'}
                        </div>
                        <p className="text-sm text-gray-600">Classificação</p>
                        <div className="mt-4">
                          <Badge variant={city.isCapital ? "default" : "secondary"}>
                            {city.isCapital ? 'Principal' : 'Interior'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="h-5 w-5 mr-2" />
                      Indicadores Sociais
                    </CardTitle>
                    <CardDescription>
                      Dados demográficos e sociais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="font-semibold">IDH</h4>
                        <p className="text-2xl font-bold text-blue-600">0.754</p>
                        <p className="text-sm text-gray-600">Alto</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                        <h4 className="font-semibold">Alfabetização</h4>
                        <p className="text-2xl font-bold text-green-600">94%</p>
                        <p className="text-sm text-gray-600">Adultos</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h4 className="font-semibold">Renda Média</h4>
                        <p className="text-2xl font-bold text-yellow-600">R$2.450</p>
                        <p className="text-sm text-gray-600">Mensal</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Home className="h-8 w-8 text-purple-600" />
                        </div>
                        <h4 className="font-semibold">Moradias</h4>
                        <p className="text-2xl font-bold text-purple-600">85%</p>
                        <p className="text-sm text-gray-600">Próprias</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tourism Tab */}
              <TabsContent value="turismo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Turismo em {city.name}
                    </CardTitle>
                    <CardDescription>
                      Atrações e pontos turísticos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {city.name} oferece diversas opções de turismo e lazer para visitantes e moradores. 
                        {city.isCapital ? ' Como capital do estado, possui uma rica oferta cultural e histórica.' : ' A cidade tem seu charme particular com atrações únicas.'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <TreePine className="h-16 w-16 text-white" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">Áreas Verdes</h4>
                          <p className="text-sm text-gray-600">Parques e praças para lazer e contato com a natureza</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <Building className="h-16 w-16 text-white" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">Centro Histórico</h4>
                          <p className="text-sm text-gray-600">Construções históricas e patrimônio cultural</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <Coffee className="h-16 w-16 text-white" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">Gastronomia</h4>
                          <p className="text-sm text-gray-600">Restaurantes típicos e culinária local</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Eventos e Festivais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                          <Star className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Festa Tradicional</h4>
                          <p className="text-sm text-gray-600">Anual,通常在七月举行</p>
                        </div>
                        <Badge variant="outline">Tradicional</Badge>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Music className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Festival de Música</h4>
                          <p className="text-sm text-gray-600">Eventos musicais durante o ano</p>
                        </div>
                        <Badge variant="outline">Cultural</Badge>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <Utensils className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Festival Gastronômico</h4>
                          <p className="text-sm text-gray-600">Mostra da culinária local</p>
                        </div>
                        <Badge variant="outline">Gastronômico</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Perguntas Frequentes sobre DDD {dddCode}
                    </CardTitle>
                    <CardDescription>
                      Tire suas dúvidas sobre o código DDD de {city.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-400 pl-4">
                        <h4 className="font-semibold mb-2">Qual é o DDD de {city.name}?</h4>
                        <p className="text-gray-700">
                          O DDD de {city.name} é {dddCode}, o mesmo código utilizado em todo o estado de {city.state.name}.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-green-400 pl-4">
                        <h4 className="font-semibold mb-2">Como fazer ligações para {city.name}?</h4>
                        <p className="text-gray-700">
                          Para ligar para {city.name} de dentro do Brasil, disque {dddCode} seguido do número do telefone. 
                          Do exterior, disque +55 {dddCode} e o número.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold mb-2">Quais operadoras funcionam em {city.name}?</h4>
                        <p className="text-gray-700">
                          As principais operadoras como Vivo, Claro, TIM e Oi oferecem serviços em {city.name}. 
                          A qualidade do sinal pode variar conforme a região da cidade.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-semibold mb-2">O DDD {dddCode} é válido para todo o estado?</h4>
                        <p className="text-gray-700">
                          Sim, o DDD {dddCode} é utilizado em todas as cidades do estado de {city.state.name}, 
                          facilitando as comunicações dentro do estado.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-400 pl-4">
                        <h4 className="font-semibold mb-2">Qual o horário de pico para ligações?</h4>
                        <p className="text-gray-700">
                          O horário de maior volume de ligações em {city.name} é geralmente entre 18h e 22h, 
                          de segunda a sexta. Para evitar congestionamentos, prefira horários menos movimentados.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Informações Adicionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Dicas Úteis</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Verifique sempre o DDD antes de fazer ligações de longa distância</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Alguns planos de telefonia incluem ligações para o mesmo DDD sem custo adicional</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Em caso de emergência, lembre-se dos números: 190 (Polícia), 192 (SAMU), 193 (Bombeiros)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Curiosidades</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Star className="h-4 w-4 mr-2 text-yellow-600 mt-0.5" />
                            <span>O sistema DDD foi implementado no Brasil na década de 1970</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="h-4 w-4 mr-2 text-yellow-600 mt-0.5" />
                            <span>{city.state.name} tem apenas um código DDD para todo o estado</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="h-4 w-4 mr-2 text-yellow-600 mt-0.5" />
                            <span>O DDD {dddCode} é um dos mais conhecidos do Brasil</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* SEO Components - Exclude for Acrelândia */}
        {!(city.slug === 'acrelandia' && city.state.slug === 'acre') && (
          <div className="mt-12 space-y-8">
            <RelatedLinks 
              currentState={city.state.name} 
              currentRegion={city.state.region} 
              currentDDD={dddCode} 
            />
            <SEOContent 
              currentState={city.state.name} 
              currentRegion={city.state.region} 
              contentType="faq" 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Informacoes sobre o DDD {dddCode} em {city.name}. Mantido com atualizacoes constantes 
              para garantir a precisao dos dados.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
            </div>
          </div>
        </div>
      </footer>

      {/* SEO Components - Exclude for Acrelândia */}
      <CityStructuredData city={city} url={canonicalUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {!(city.slug === 'acrelandia' && city.state.slug === 'acre') && (
        <>
          <RelatedLinks 
            currentState={city.state.name} 
            currentRegion={city.state.region} 
            currentDDD={dddCode} 
          />
          <SEOContent 
            currentState={city.state.name} 
            currentRegion={city.state.region} 
            contentType="faq" 
          />
        </>
      )}
    </div>
  );
}# Navbar removal completed
