'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Phone, Building, Globe, Navigation, Wifi, Star, Clock, TrendingUp, ChevronDown } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import InteractiveMap from '@/components/ui/InteractiveMap';
import Link from 'next/link';
import { useState } from 'react';

interface CitySEOContentProps {
  city: {
    name: string;
    slug: string;
    population?: number | null;
    area?: number | null;
    latitude?: number | null;
    longitude?: number | null;
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
  };
  dddCode: string;
  formatNumber: (num?: number | null) => string;
  formatArea: (area?: number | null) => string;
  showMoreContent: boolean;
  setShowMoreContent: (show: boolean) => void;
  cityData: {
    title: string;
    subtitle: string;
    heroGradient: string;
    accentColor: string;
    heroIconColor: string;
    description: string;
    introduction: string[];
    history: {
      title: string;
      content: string[];
    };
    geography: {
      title: string;
      content: string[];
    };
    economy: {
      title: string;
      content: string[];
    };
    culture: {
      title: string;
      content: string[];
    };
    challenges: {
      title: string;
      content: string[];
    };
    conclusion: {
      title: string;
      content: string[];
    };
    quickFacts: string[];
    operadorasInfo: {
      geral: string;
      operadoras: Array<{
        nome: string;
        cor: string;
        descricao: string;
      }>;
      dica: string;
    };
    dicas: {
      geral: string;
      licoes: string[];
      emergencias: Array<{
        nome: string;
        numero: string;
      }>;
      curiosidade: string;
    };
  };
}

export default function CitySEOContent({
  city,
  dddCode,
  formatNumber,
  formatArea,
  showMoreContent,
  setShowMoreContent,
  cityData
}: CitySEOContentProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Phone className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Meu DDD</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Início</Link>
              <Link href="/estados" className="text-gray-600 hover:text-gray-900">Estados</Link>
              <Link href="/validar-ddd" className="text-gray-600 hover:text-gray-900">Validar DDD</Link>
              <Link href="/gerador-numeros" className="text-gray-600 hover:text-gray-900">Gerador</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Início</BreadcrumbLink>
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
      <section className={`${cityData.heroGradient} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {cityData.title}
            </h1>
            <p className={`text-xl ${cityData.heroIconColor} mb-6`}>
              {cityData.subtitle}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Author Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Sobre o Autor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`w-20 h-20 ${cityData.accentColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Especialista em Telecomunicações</h3>
                  <p className="text-gray-600 text-sm mb-4">Conhecimento profundo do Acre e suas comunicações</p>
                  <Link href="/autor">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Perfil Completo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="mt-6">
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="sobre">Sobre {city.name}</TabsTrigger>
                <TabsTrigger value="mapa">Mapa</TabsTrigger>
                <TabsTrigger value="operadoras">Operadoras</TabsTrigger>
                <TabsTrigger value="dicas">Dicas</TabsTrigger>
              </TabsList>

              {/* Tab 1: Informações */}
              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DDD {dddCode} em {city.name}</CardTitle>
                    <CardDescription>
                      Tudo que você precisa saber sobre o código DDD desta cidade do Acre
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`${cityData.accentColor} border-l-4 ${cityData.accentColor.replace('bg-', 'border-')} p-4`}>
                      <p className="text-gray-800">
                        {cityData.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Como ligar para {city.name}:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Do Brasil: {dddCode} + número</li>
                          <li>• Do exterior: +55 {dddCode} + número</li>
                          <li>• Dentro da cidade: apenas o número</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Importante:</h4>
                        <ul className="space-y-1 text-sm">
                          {cityData.quickFacts.map((fact, index) => (
                            <li key={index}>• {fact}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Sobre a Cidade */}
              <TabsContent value="sobre" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre {city.name}</CardTitle>
                    <CardDescription>
                      Conheça a história, cultura e importância desta cidade acreana
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      {/* Introdução */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{cityData.introduction[0]}</h2>
                      
                      {cityData.introduction.slice(1).map((paragraph, index) => (
                        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}

                      {/* Leia mais... */}
                      {!showMoreContent && (
                        <div className="text-center mb-6">
                          <Button 
                            onClick={() => setShowMoreContent(true)}
                            variant="outline"
                            className="flex items-center mx-auto gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            Leia mais...
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {/* Conteúdo expandido (aparece após clicar em "Leia mais...") */}
                      {showMoreContent && (
                        <div>
                          {/* História */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.history.title}</h3>
                          
                          {cityData.history.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.history.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed`}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Geografia e Meio Ambiente */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.geography.title}</h3>
                          
                          {cityData.geography.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.geography.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed`}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Economia e Infraestrutura */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.economy.title}</h3>
                          
                          {cityData.economy.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.economy.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed`}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Cultura e Turismo */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.culture.title}</h3>
                          
                          {cityData.culture.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.culture.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed`}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Desafios e Perspectivas */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.challenges.title}</h3>
                          
                          {cityData.challenges.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.challenges.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed`}>
                              {paragraph}
                            </p>
                          ))}

                          {/* Conclusão */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{cityData.conclusion.title}</h3>
                          
                          {cityData.conclusion.content.map((paragraph, index) => (
                            <p key={index} className={`mb-${index === cityData.conclusion.content.length - 1 ? 6 : 4} text-gray-700 leading-relaxed${index === cityData.conclusion.content.length - 1 ? ' font-semibold' : ''}`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 3: Mapa */}
              <TabsContent value="mapa" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Localização de {city.name}</CardTitle>
                    <CardDescription>
                      Veja onde fica esta cidade do Acre no mapa
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
              </TabsContent>

              {/* Tab 4: Operadoras */}
              <TabsContent value="operadoras" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operadoras em {city.name}</CardTitle>
                    <CardDescription>
                      Principais operadoras de telefonia na cidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`${cityData.accentColor} border-l-4 ${cityData.accentColor.replace('bg-', 'border-')} p-4`}>
                      <p className="text-gray-800">
                        {cityData.operadorasInfo.geral}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cityData.operadorasInfo.operadoras.map((operadora, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className={`w-8 h-8 ${operadora.cor} rounded-full flex items-center justify-center mr-3`}>
                              <Phone className="h-4 w-4 text-gray-600" />
                            </div>
                            <h4 className="font-semibold">{operadora.nome}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{operadora.descricao}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Dica:</h4>
                      <p className="text-sm text-gray-700">
                        {cityData.operadorasInfo.dica}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 5: Dicas */}
              <TabsContent value="dicas" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dicas Úteis</CardTitle>
                    <CardDescription>
                      Informações importantes sobre o DDD {dddCode} em {city.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`${cityData.accentColor} border-l-4 ${cityData.accentColor.replace('bg-', 'border-')} p-4`}>
                      <p className="text-gray-800">
                        {cityData.dicas.geral}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Dicas para ligações:</h4>
                        <ul className="space-y-1 text-sm">
                          {cityData.dicas.licoes.map((licao, index) => (
                            <li key={index}>• {licao}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Emergências:</h4>
                        <ul className="space-y-1 text-sm">
                          {cityData.dicas.emergencias.map((emergencia, index) => (
                            <li key={index}>• {emergencia.nome}: {emergencia.numero}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Curiosidade:</h4>
                      <p className="text-sm text-gray-700">
                        {cityData.dicas.curiosidade}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}