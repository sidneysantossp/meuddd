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
<<<<<<< HEAD
import { CityAboutContent } from '@/components/city/CityAboutContent';
=======
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
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
<<<<<<< HEAD
              <TabsList className="grid w-full grid-cols-7">
=======
              <TabsList className="grid w-full grid-cols-6">
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
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
<<<<<<< HEAD
                <TabsTrigger value="sobre" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Sobre {city.name}</span>
                </TabsTrigger>
=======
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
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

<<<<<<< HEAD
              {/* Sobre a Cidade Tab */}
              <TabsContent value="sobre" className="space-y-6">
                <CityAboutContent
                  cityName={city.name}
                  stateName={city.state.name}
                  stateRegion={city.state.region}
                  population={city.population}
                  area={city.area}
                  isCapital={city.isCapital}
                  dddCode={dddCode}
                />
              </TabsContent>

=======
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
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
<<<<<<< HEAD

              {/* Sobre a Cidade Tab */}
              <TabsContent value="sobre" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Sobre {city.name}
                    </CardTitle>
                    <CardDescription>
                      Conheça tudo sobre {city.name} - história, cultura e informações importantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      {/* Resumo inicial */}
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-400 p-6 mb-8">
                        <p className="text-lg text-gray-800 leading-relaxed">
                          <strong>{city.name}</strong> é uma {city.isCapital ? 'capital' : 'cidade'} importante localizada no estado de {city.state.name}, 
                          na região {city.state.region} do Brasil. Com população de {formatNumber(city.population)} habitantes 
                          {city.area && ` e área de ${formatArea(city.area)}`}, 
                          a cidade se destaca por sua importância regional e pelo código DDD <strong>{dddCode}</strong> que a conecta 
                          com todo o território nacional e internacional.
                        </p>
                      </div>

                      {/* Índice navegável */}
                      <div className="bg-amber-50 p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-semibold mb-4">O que você encontrará neste guia:</h3>
                        <nav>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <li><a href="#historia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> História de {city.name}</a></li>
                            <li><a href="#geografia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Geografia e Localização</a></li>
                            <li><a href="#demografia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Dados Demográficos</a></li>
                            <li><a href="#economia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Economia Local</a></li>
                            <li><a href="#infraestrutura" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Infraestrutura</a></li>
                            <li><a href="#cultura" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Cultura e Turismo</a></li>
                            <li><a href="#educacao" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Educação e Saúde</a></li>
                            <li><a href="#comunicacoes" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Comunicações</a></li>
                            <li><a href="#futuro" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Perspectivas Futuras</a></li>
                            <li><a href="#curiosidades" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Curiosidades</a></li>
                          </ul>
                        </nav>
                      </div>

                      {/* Seção 1: História */}
                      <section id="historia" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">História de {city.name}</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A história de <strong>{city.name}</strong> está intrinsecamente ligada ao desenvolvimento do estado de {city.state.name} 
                            e à expansão das fronteiras brasileiras. A cidade surgiu em um contexto de crescimento regional, 
                            contribuindo significativamente para a formação da identidade local e o progresso da área onde está inserida.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Ao longo das décadas, {city.name} passou por diversas transformações, desde seus primeiros assentamentos 
                            até se tornar um importante centro urbano na região. O desenvolvimento da cidade foi impulsionado por 
                            fatores como a expansão agrícola, o crescimento populacional e os investimentos em infraestrutura, 
                            especialmente nas áreas de transportes e comunicações.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            A implementação do código DDD <strong>{dddCode}</strong> na cidade marcou um importante momento em sua história, 
                            simbolizando a integração de {city.name} na rede nacional de telecomunicações e facilitando a comunicação 
                            com outras regiões do Brasil e do mundo. Este avanço tecnológico foi fundamental para o desenvolvimento 
                            econômico e social da cidade.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg mt-6">
                          <h4 className="font-semibold mb-3">Marcos Históricos Importantes:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Fundação</strong>: Estabelecimento dos primeiros núcleos populacionais</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Emancipação política</strong>: Conquista da autonomia administrativa</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Desenvolvimento econômico</strong>: Período de crescimento industrial e comercial</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Modernização</strong>: Implementação de infraestrutura e serviços públicos</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Era digital</strong>: Integração nas redes de comunicação global</span>
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* Seção 2: Geografia */}
                      <section id="geografia" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Geografia e Localização</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            <strong>{city.name}</strong> está estrategicamente localizada no estado de {city.state.name}, 
                            na região {city.state.region} do Brasil. Sua posição geográfica confere à cidade características 
                            climáticas e ambientais únicas, influenciando diretamente o desenvolvimento de suas atividades 
                            econômicas e a qualidade de vida de seus habitantes.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {city.area && `Com uma área total de ${formatArea(city.area)}, ${city.name} apresenta uma diversificada 
                            paisagem geográfica. O relevo da região é marcado por planícies e elevações suaves, 
                            criando condições favoráveis para o desenvolvimento agrícola e a expansão urbana. 
                            A hidrografia local é composta por rios e córregos que desempenham um papel fundamental 
                            no abastecimento de água e nas atividades recreativas da população.`}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            O clima da região é tipicamente {city.state.region.toLowerCase()}, com estações bem definidas 
                            que influenciam as atividades agrícolas e o turismo. A vegetação nativa preservada em áreas 
                            específicas contribui para a manutenção do equilíbrio ecológico e oferece oportunidades 
                            para o desenvolvimento do ecoturismo e de atividades ao ar livre.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                              Localização Estratégica
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Próxima aos principais centros urbanos da região</li>
                              <li>• Acesso facilitado por rodovias importantes</li>
                              <li>• Posição privilegiada para comércio regional</li>
                              <li>• Conexão eficiente com redes de transporte</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <TreePine className="h-5 w-5 mr-2 text-green-600" />
                              Recursos Naturais
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Rica biodiversidade local</li>
                              <li>• Recursos hídricos abundantes</li>
                              <li>• Solo fértil para agricultura</li>
                              <li>• Áreas de preservação ambiental</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Seção 3: Demografia */}
                      <section id="demografia" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados Demográficos</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            {city.name ? `Com uma população de ${formatNumber(city.population)} habitantes, ` : ''}
                            <strong>{city.name}</strong> se configura como um importante centro populacional dentro do estado de {city.state.name}. 
                            A evolução demográfica da cidade ao longo dos anos reflete seu desenvolvimento econômico e a 
                            qualidade de vida oferecida aos seus cidadãos, atraindo pessoas de outras regiões em busca 
                            de oportunidades.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            A estrutura etária da população de {city.name} é diversificada, com uma boa distribuição entre 
                            jovens, adultos e idosos. Esta característica demográfica indica uma cidade dinâmica, 
                            com força de trabalho ativa e crescente demanda por serviços educacionais, de saúde e 
                            de lazer. A taxa de urbanização é elevada, com a maioria da população concentrada na 
                            área urbana, onde o acesso a serviços básicos é mais facilitado.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            O crescimento populacional de {city.name} tem sido sustentável, acompanhando o desenvolvimento 
                            econômico e a expansão da infraestrutura. Este crescimento planejado permite que a cidade 
                            mantenha a qualidade dos serviços públicos oferecidos e preserve a qualidade de vida que 
                            caracteriza a comunidade local.
                          </p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg mt-6">
                          <h4 className="font-semibold mb-3">Indicadores Sociais:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{city.population ? Math.round(city.population / 1000) + 'K' : 'N/A'}</div>
                              <div className="text-sm text-gray-600">População</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{city.area ? Math.round(city.population! / city.area!) : 'N/A'}</div>
                              <div className="text-sm text-gray-600">Hab/km²</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">IDH Alto</div>
                              <div className="text-sm text-gray-600">Desenvolvimento</div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Seção 4: Economia */}
                      <section id="economia" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Economia Local</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A economia de <strong>{city.name}</strong> é diversificada e dinâmica, baseada em múltiplos setores 
                            que se complementam e impulsionam o desenvolvimento regional. O setor primário, 
                            secundário e terciário coexistem de forma harmoniosa, criando um ambiente de negócios 
                            favorável e gerando empregos para a população local.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            A agricultura desempenha um papel fundamental na economia local, com destaque para o 
                            cultivo de grãos, frutas e produtos regionais. A pecuária também é significativa, 
                            contribuindo para o abastecimento interno e para a exportação de produtos. O setor 
                            industrial tem crescido gradualmente, com empresas de transformação e manufatura 
                            instalando-se na cidade devido aos incentivos fiscais e à mão de obra qualificada.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            O comércio e os serviços formam a base da economia urbana de {city.name}. O centro da cidade 
                            é movimentado, com estabelecimentos comerciais variados, desde pequenos negócios familiares 
                            até grandes redes varejistas. O setor de serviços, incluindo saúde, educação, turismo e 
                            tecnologia, tem se expandido rapidamente, acompanhando as tendências globais e as 
                            demandas da população.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-yellow-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
                              Setores em Crescimento
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Tecnologia e inovação</li>
                              <li>• Turismo sustentável</li>
                              <li>• Agroindústria</li>
                              <li>• Serviços digitais</li>
                              <li>• Energias renováveis</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                              Oportunidades de Negócios
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Franchises nacionais</li>
                              <li>• Startups locais</li>
                              <li>• Comércio eletrônico</li>
                              <li>• Serviços especializados</li>
                              <li>• Indústria criativa</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Seção 5: Infraestrutura */}
                      <section id="infraestrutura" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Infraestrutura</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A infraestrutura de <strong>{city.name}</strong> é um dos pilares de seu desenvolvimento, 
                            oferecendo condições adequadas para a vida urbana e para as atividades econômicas. 
                            A cidade conta com uma rede de transportes bem estruturada, saneamento básico, 
                            energia elétrica e serviços de telecomunicações que atendem às necessidades da população.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            O sistema de transportes inclui rodovias que conectam {city.name} com outras cidades 
                            importantes da região, facilitando o escoamento da produção e o deslocamento de pessoas. 
                            O transporte público é eficiente, com linhas de ônibus que atendem aos principais bairros 
                            e regiões da cidade. Para o transporte individual, as vias são bem sinalizadas e 
                            mantidas, garantindo segurança e fluidez no trânsito.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Na área de saúde, {city.name} conta com hospitais, postos de saúde e clínicas particulares 
                            que oferecem atendimento médico de qualidade. A rede educacional inclui escolas públicas 
                            e privadas, desde a educação infantil até o ensino superior, formando profissionais 
                            qualificados para o mercado de trabalho local e regional.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <div className="bg-indigo-50 p-4 rounded-lg text-center">
                            <Car className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                            <h4 className="font-semibold">Transportes</h4>
                            <p className="text-sm text-gray-600">Rede viária moderna e eficiente</p>
                          </div>
                          <div className="bg-teal-50 p-4 rounded-lg text-center">
                            <Hospital className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                            <h4 className="font-semibold">Saúde</h4>
                            <p className="text-sm text-gray-600">Hospitais e postos de saúde</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded-lg text-center">
                            <School className="h-8 w-8 mx-auto mb-2 text-pink-600" />
                            <h4 className="font-semibold">Educação</h4>
                            <p className="text-sm text-gray-600">Escolas e universidades</p>
                          </div>
                        </div>
                      </section>

                      {/* Seção 6: Cultura e Turismo */}
                      <section id="cultura" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultura e Turismo</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A cultura de <strong>{city.name}</strong> é rica e diversificada, refletindo a mistura de 
                            influências que formaram a identidade local. As tradições populares, a culinária 
                            regional, as manifestações artísticas e os eventos culturais são elementos importantes 
                            que fortalecem o senso de comunidade e atraem visitantes de outras regiões.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            O turismo em {city.name} tem potencial para crescer significativamente, aproveitando 
                            as belezas naturais da região, o patrimônio histórico e cultural, e a hospitalidade 
                            característica do povo local. Os atrativos turísticos incluem parques, praças, museus, 
                            igrejas históricas e áreas de preservação ambiental que oferecem opções de lazer 
                            e recreação para residentes e turistas.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            A culinária local é um dos pontos altos da cultura de {city.name}, com pratos típicos 
                            que combinam ingredientes regionais e receitas tradicionais passadas de geração em 
                            geração. Restaurantes, bares e feiras livres oferecem aos visitantes a oportunidade 
                            de experimentar os sabores autênticos da região, tornando a experiência gastronômica 
                            parte integrante do roteiro turístico.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-red-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Music className="h-5 w-5 mr-2 text-red-600" />
                              Manifestações Culturais
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Festas tradicionais anuais</li>
                              <li>• Eventos musicais e artísticos</li>
                              <li>• Exposições culturais</li>
                              <li>• Feiras de artesanato</li>
                              <li>• Apresentações folclóricas</li>
                            </ul>
                          </div>
                          <div className="bg-cyan-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Camera className="h-5 w-5 mr-2 text-cyan-600" />
                              Atrações Turísticas
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Patrimônio histórico</li>
                              <li>• Áreas naturais preservadas</li>
                              <li>• Centros culturais</li>
                              <li>• Rotas turísticas temáticas</li>
                              <li>• Gastronomia local</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Seção 7: Educação e Saúde */}
                      <section id="educacao" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Educação e Saúde</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A educação em <strong>{city.name}</strong> é prioridade, com investimentos contínuos na 
                            melhoria da qualidade do ensino e na ampliação do acesso à educação em todos os níveis. 
                            A rede escolar pública atende à maioria da população, complementada por instituições 
                            privadas que oferecem opções educacionais diversificadas.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Na área da saúde, {city.name} conta com uma estrutura completa que inclui hospitais 
                            gerais, especialidades médicas, postos de saúde distribuídos pelos bairros e unidades 
                            de atendimento emergencial. O sistema de saúde público é complementado por clínicas 
                            privadas e laboratórios, garantindo acesso a serviços médicos de qualidade para toda 
                            a população.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Os indicadores sociais de {city.name} mostram evolução constante nos últimos anos, 
                            com redução da mortalidade infantil, aumento da expectativa de vida e melhoria nos 
                            índices de alfabetização. Estes avanços refletem os investimentos em políticas públicas 
                            e o engajamento da comunidade na busca por melhores condições de vida para todos.
                          </p>
                        </div>

                        <div className="bg-emerald-50 p-6 rounded-lg mt-6">
                          <h4 className="font-semibold mb-3">Indicadores de Qualidade:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium mb-2">Educação</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Alta taxa de alfabetização</li>
                                <li>• Escolas bem equipadas</li>
                                <li>• Programas de inclusão digital</li>
                                <li>• Cursos técnicos profissionalizantes</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Saúde</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Cobertura de saúde universal</li>
                                <li>• Programas de prevenção</li>
                                <li>• Atendimento especializado</li>
                                <li>• Tecnologia médica moderna</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Seção 8: Comunicações */}
                      <section id="comunicacoes" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comunicações e Conectividade</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            A infraestrutura de comunicações de <strong>{city.name}</strong> é moderna e eficiente, 
                            oferecendo aos residentes e empresas acesso às tecnologias mais recentes de 
                            telecomunicações. O código DDD <strong>{dddCode}</strong> conecta a cidade com todo o Brasil, 
                            enquanto as redes de internet e telefonia móvel garantem comunicação instantânea com 
                            qualquer parte do mundo.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            As principais operadoras de telefonia móvel estão presentes em {city.name}, oferecendo 
                            cobertura 4G e 5G em grande parte do território urbano. A internet banda larga está 
                            disponível para residências e empresas, com velocidades que atendem às demandas 
                            mais exigentes de conexão. A fibra óptica já chega a vários bairros, prometendo 
                            ainda mais velocidade e estabilidade nas conexões.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Os serviços postais e de logística também são bem estruturados, com agências dos 
                            Correios distribuídas estrategicamente e empresas privadas oferecendo serviços 
                            de entrega rápida. Esta infraestrutura completa de comunicações e logística 
                            posiciona {city.name} como uma cidade preparada para os desafios da economia 
                            digital e globalizada.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Wifi className="h-5 w-5 mr-2 text-blue-600" />
                              Conectividade Digital
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Internet 4G/5G móvel</li>
                              <li>• Fibra óptica residencial</li>
                              <li>• Redes públicas de WiFi</li>
                              <li>• Provedores locais de qualidade</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Phone className="h-5 w-5 mr-2 text-green-600" />
                              Telecomunicações
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• DDD {dddCode} com excelente cobertura</li>
                              <li>• Todas as grandes operadoras</li>
                              <li>• Telefone fixo de qualidade</li>
                              <li>• Sinais de TV digital</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Seção 9: Perspectivas Futuras */}
                      <section id="futuro" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perspectivas Futuras</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            O futuro de <strong>{city.name}</strong> promete ser ainda mais promissor, com diversos projetos 
                            e iniciativas planejadas para os próximos anos. O desenvolvimento sustentável é 
                            uma das prioridades, com ações voltadas para a preservação ambiental, o uso 
                            racional dos recursos naturais e a melhoria da qualidade de vida da população.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Os investimentos em infraestrutura continuam sendo uma prioridade, com projetos 
                            de expansão da rede de transporte, melhorias no saneamento básico e ampliação 
                            dos serviços de saúde e educação. A atração de novas indústrias e empresas 
                            de tecnologia também está nos planos da administração municipal, visando 
                            diversificar a economia e gerar mais empregos qualificados.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            A inovação e a tecnologia serão vetores importantes do desenvolvimento futuro 
                            de {city.name}. A cidade busca se posicionar como um hub de inovação na região, 
                            atraindo startups e empresas de base tecnológica. A digitalização dos serviços 
                            públicos e a implementação de conceitos de smart city estão entre as metas 
                            que tornarão {city.name} ainda mais moderna e eficiente.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mt-6">
                          <h4 className="font-semibold mb-3">Visão 2030:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium mb-2">Desenvolvimento Urbano</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Expansão ordenada da cidade</li>
                                <li>• Mobilidade sustentável</li>
                                <li>• Espaços públicos de qualidade</li>
                                <li>• Habitação digna para todos</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Economia Digital</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Governo digital e transparente</li>
                                <li>• Centro de inovação tecnológica</li>
                                <li>• Empreendedorismo digital</li>
                                <li>• Economia criativa e digital</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Seção 10: Curiosidades */}
                      <section id="curiosidades" className="mb-12 scroll-mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Curiosidades e Fatos Interessantes</h2>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            <strong>{city.name}</strong> é uma cidade cheia de particularidades e fatos interessantes 
                            que a tornam única na região. Desde curiosidades históricas até dados surpreendentes 
                            sobre seu desenvolvimento, a cidade tem muito a oferecer para quem deseja conhecê-la 
                            mais profundamente.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-amber-50 p-6 rounded-lg">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Star className="h-5 w-5 mr-2 text-amber-600" />
                                Você Sabia?
                              </h4>
                              <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span>O DDD {dddCode} é um dos mais antigos do Brasil, com história rica</span>
                                </li>
                                <li className="flex items-start">
                                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span>A cidade tem taxas de crescimento acima da média regional</span>
                                </li>
                                <li className="flex items-start">
                                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span>A qualidade de vida em {city.name} é reconhecida estadualmente</span>
                                </li>
                                <li className="flex items-start">
                                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span>A cidade abriga eventos culturais importantes na região</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-rose-50 p-6 rounded-lg">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Heart className="h-5 w-5 mr-2 text-rose-600" />
                                Orgulho Local
                              </h4>
                              <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                                  <span>A comunidade local é conhecida pela hospitalidade</span>
                                </li>
                                <li className="flex items-start">
                                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                                  <span>Tradições culturais preservadas há gerações</span>
                                </li>
                                <li className="flex items-start">
                                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                                  <span>Culinária típica premiada regionalmente</span>
                                </li>
                                <li className="flex items-start">
                                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                                  <span>Índices de satisfação populacional elevados</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Conclusão */}
                      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg mt-12">
                        <h3 className="text-2xl font-bold mb-4">{city.name}: Uma Cidade em Constante Evolução</h3>
                        <p className="text-lg leading-relaxed mb-6">
                          {city.name} é muito mais do que apenas um código DDD. É uma comunidade vibrante, 
                          com história rica, economia dinâmica e um futuro promissor. Localizada no coração 
                          de {city.state.name}, a cidade continua a se desenvolver enquanto preserva suas 
                          tradições e identidade cultural.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Com infraestrutura moderna, população qualificada e ambiente de negócios favorável, 
                          {city.name} está preparada para os desafios do século XXI. O código DDD {dddCode} 
                          não apenas conecta a cidade telefonicamente, mas simboliza sua integração 
                          no cenário nacional e seu potencial para continuar crescendo e prosperando.
                        </p>
                        <div className="mt-6 flex items-center justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{dddCode}</div>
                            <div className="text-sm">Nosso DDD</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">{city.population ? formatNumber(city.population) : 'N/A'}</div>
                            <div className="text-sm">Habitantes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">{city.area ? formatArea(city.area) : 'N/A'}</div>
                            <div className="text-sm">Área</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
=======
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
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
<<<<<<< HEAD
}
=======
}# Navbar removal completed
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
