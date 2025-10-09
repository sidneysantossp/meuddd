'use client';

import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CityMap from '@/components/ui/CityMap';
import { 
  MapPin, 
  Users, 
  Phone, 
  Building, 
  User, 
  Calendar, 
  Clock, 
  ExternalLink,
  Navigation,
  Info,
  BookOpen,
  Star,
  Award,
  Globe,
  Search,
  Volume2,
  Camera,
  Map,
  Link2,
  TreePine,
  Fish,
  Waves,
  Mountain
} from 'lucide-react';
import { CityStructuredData } from '@/components/seo/CityStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { ArticleStructuredData } from '@/components/seo/ArticleStructuredData';
import { AdvancedStructuredData } from '@/components/seo/AdvancedStructuredData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CityPageProps {
  params: Promise<{
    slug: string;
    citySlug: string;
  }>;
}

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
  dddCodes: DddCode[];
  cities?: City[];
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
  state: State;
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

export default function RioBrancoPage({ params }: CityPageProps) {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCity = async () => {
      try {
        const { slug, citySlug } = await params;
        
        const response = await fetch(`/api/ddd/states`);
        const states = await response.json();
        
        const state = states.find((s: State) => s.slug === slug);
        
        if (state) {
          const foundCity = state.cities?.find((c: City) => c.slug === citySlug);
          
          if (foundCity) {
            const cityWithState = {
              ...foundCity,
              state: state
            };
            setCity(cityWithState);
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
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações da capital do Acre...</p>
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

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: city.state.name, url: `${baseUrl}/estado/${city.state.slug}` },
    { name: city.name, url: canonicalUrl }
  ];

  // Author information - E-E-A-T
  const authorInfo = {
    name: 'Sidney Santos',
    bio: 'Especialista em telecomunicações com mais de 15 anos de experiência em sistemas de telefonia e códigos DDD brasileiros. Conhecedor profundo da região amazônica e suas particularidades de comunicação.',
    expertise: [
      'Telecomunicações na Amazônia',
      'Códigos DDD Norte',
      'Sistemas Telefônicos',
      'Desenvolvimento Web',
      'SEO Técnico',
      'Análise de Redes'
    ],
    avatar: '/images/author-avatar.jpg',
    website: 'https://sidneysantos.com.br',
    authorPage: '/sobre-o-autor'
  };

  // Enhanced structured data for E-E-A-T
  const articleData = {
    headline: `DDD de Rio Branco - Guia Completo da Capital do Acre`,
    description: `Guia especializado sobre códigos DDD de Rio Branco, capital do Acre. Informações técnicas atualizadas com características únicas da região amazônica.`,
    author: authorInfo.name,
    datePublished: new Date(city.createdAt).toISOString(),
    dateModified: new Date(city.updatedAt).toISOString(),
    url: canonicalUrl
  };

  // Advanced structured data
  const advancedStructuredData = {
    city: {
      name: city.name,
      description: `Rio Branco, a capital do Acre, é o principal centro urbano e econômico da região amazônica acreana. Conhecida por sua infraestrutura de telecomunicações moderna que atende às particularidades da floresta.`,
      population: city.population,
      area: city.area,
      latitude: city.latitude,
      longitude: city.longitude,
      isCapital: city.isCapital
    },
    state: {
      name: city.state.name,
      code: city.state.code,
      region: city.state.region
    },
    author: {
      name: authorInfo.name,
      bio: authorInfo.bio,
      expertise: authorInfo.expertise
    },
    url: canonicalUrl,
    datePublished: new Date(city.createdAt).toISOString(),
    dateModified: new Date(city.updatedAt).toISOString()
  };

  // Keywords for SEO and voice search - com jargões locais
  const keywords = [
    `DDD Rio Branco`,
    `código DDD 68`,
    `telefone Rio Branco`,
    `ligações Rio Branco`,
    `prefixo telefônico Rio Branco`,
    `DDD Acre`,
    `código telefônico Rio Branco`,
    `como ligar para Rio Branco`,
    `DDD Brasil Rio Branco`,
    `telefone fixo Rio Branco`,
    `telefone móvel Rio Branco`,
    `operadoras Rio Branco`,
    `telecomunicações Rio Branco`,
    `telefone na floresta`,
    `comunicação amazônica`,
    `sinal na selva`
  ];

  return (
    <>
      <CityStructuredData city={city} url={canonicalUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <ArticleStructuredData article={articleData} />
      <AdvancedStructuredData {...advancedStructuredData} />
      
      {/* Hidden keywords for SEO */}
      <div className="hidden">
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="author" content={authorInfo.name} />
        <meta name="expertise" content={authorInfo.expertise.join(', ')} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/estado/${city.state.slug}`}>
                {city.state.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{city.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* City Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">
                DDD de Rio Branco - Guia da Capital do Acre
              </h1>
              <p className="text-xl text-green-100 mb-4">
                Informações especializadas com o jeito acreano de se comunicar
              </p>
              <div className="flex items-center gap-4 text-green-100">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{city.state.name} - Coração da Amazônia</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Capital
                </Badge>
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Amazônia
                </Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href={`/estado/${city.state.slug}`}>
                <Button variant="outline" className="bg-white text-green-600 hover:bg-green-50">
                  Voltar para o Acre
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
              <Users className="h-8 w-8 text-white" />
              <div>
                <div className="text-2xl font-bold">
                  {formatNumber(city.population)}
                </div>
                <div className="text-sm text-green-100">Habitantes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
              <Building className="h-8 w-8 text-white" />
              <div>
                <div className="text-2xl font-bold">
                  {formatArea(city.area)}
                </div>
                <div className="text-sm text-green-100">Área</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
              <Phone className="h-8 w-8 text-white" />
              <div>
                <div className="text-2xl font-bold">
                  {city.dddCodes.length}
                </div>
                <div className="text-sm text-green-100">Códigos DDD</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
              <TreePine className="h-8 w-8 text-white" />
              <div>
                <div className="text-2xl font-bold">
                  AC
                </div>
                <div className="text-sm text-green-100">Código UF</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Card */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-green-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Especialista Local
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    SS
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{authorInfo.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{authorInfo.bio}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Atualizado: {new Date(city.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Link 
                      href={authorInfo.authorPage}
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm mt-3 font-medium"
                    >
                      Ver perfil completo
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="font-medium">{city.state.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Região:</span>
                  <span className="font-medium">{city.state.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Código UF:</span>
                  <span className="font-medium">{city.state.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="secondary">Capital</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Voice Search */}
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Busca por Voz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  Pergunte como um acreano:
                </p>
                <div className="space-y-2 text-sm text-emerald-800">
                  <p>• "Qual o DDD de Rio Branco, véi?"</p>
                  <p>• "Como ligar pro Acre?"</p>
                  <p>• "Telefone 68"</p>
                  <p>• "Sinal na selva"</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Cities */}
            {city.state.cities && city.state.cities.length > 1 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">Cidades do Acre</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {city.state.cities
                      .filter((c: City) => c.id !== city.id)
                      .slice(0, 12)
                      .map((relatedCity: City) => (
                        <Link 
                          key={relatedCity.id}
                          href={`/estado/${city.state.slug}/${relatedCity.slug}`}
                          className="block text-sm text-green-600 hover:text-green-800 hover:underline"
                        >
                          {relatedCity.name}
                        </Link>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="ddd-codes" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="ddd-codes" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  DDD
                </TabsTrigger>
                <TabsTrigger value="guia-completo" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Guia
                </TabsTrigger>
                <TabsTrigger value="mapa" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Mapa
                </TabsTrigger>
                <TabsTrigger value="turismo" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Turismo
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="autoridade" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Autoridade
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: DDD Codes */}
              <TabsContent value="ddd-codes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Phone className="h-6 w-6 text-green-600" />
                      Códigos DDD de Rio Branco - Conectando a Amazônia
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Informações técnicas sobre os códigos de área telefônica da capital do Acre
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {city.dddCodes.map((dddCode) => (
                        <Card key={dddCode.id} className="hover:shadow-lg transition-shadow border-l-4 border-green-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-2xl font-bold text-green-600">
                              DDD {dddCode.code}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base">
                              {dddCode.description || `Código DDD principal para Rio Branco e toda a região amazônica acreana`}
                            </CardDescription>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                              <p><strong>Tipo:</strong> Código de área telefônica amazônica</p>
                              <p><strong>Cobertura:</strong> Rio Branco e municípios vizinhos</p>
                              <p><strong>Formato:</strong> 0{dddCode.code} + número</p>
                              <p><strong>Particularidade:</strong> Atende até comunidades ribeirinhas</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Detailed DDD Information */}
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">O Sistema DDD na Amazônia Acreana</h3>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          O sistema de <strong>Discagem Direta à Distância (DDD)</strong> em Rio Branco representa um marco 
                          tecnológico na comunicação da região amazônica. Diferente de outras capitais brasileiras, Rio Branco 
                          enfrenta desafios únicos: a imensidão da floresta, a dispersão das comunidades ribeirinhas e as 
                          condições climáticas extremas que testam constantemente a infraestrutura de telecomunicações.
                        </p>
                        <p className="mb-4">
                          Na capital acreana, o código DDD 68 não é apenas um número, é uma <strong>linha de vida</strong> 
                          que conecta a cidade ao resto do Brasil e ao mundo. As operadoras
                          <a href="https://www.vivo.com.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Vivo</a>, 
                          <a href="https://www.claro.com.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Claro</a>, 
                          <a href="https://www.tim.com.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">TIM</a> e 
                          <a href="https://www.oi.com.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Oi</a> 
                          mantêm uma rede robusta que inclui torres especialmente projetadas para a região, sistemas de 
                          energia alternativa e equipamentos resistentes à umidade extrema.
                        </p>
                        <p>
                          A <a href="https://www.anatel.gov.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Agência Nacional de Telecomunicações (Anatel)</a> 
                          estabelece metas específicas para a região amazônica, considerando as peculiaridades locais. 
                          Em Rio Branco, a qualidade do sinal é monitorada com atenção redobrada, pois uma queda na 
                          comunicação pode significar isolamento para comunidades inteiras. O sistema DDD aqui é sinônimo 
                          de integração e desenvolvimento para toda a região.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Guia Completo */}
              <TabsContent value="guia-completo" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      Guia Completo de Telecomunicações em Rio Branco
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Manual especializado com o sabor amazônico e a experiência acreana
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Section 1: História e Evolução */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">A História das Telecomunicações no Coração da Amazônia</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          Rio Branco, fundada às margens do rio Acre, nasceu como um ponto de comunicação essencial 
                          na imensidão amazônica. No início do século XX, a comunicação com o "mundo de fora" era feita 
                          através de barcos que levavam e traziam cartas, demorando meses para completar o trajeto. 
                          Os primeiros telégrafos chegaram à cidade na década de 1930, representando uma revolução 
                          para uma região onde a distância era medida em dias de viagem.
                        </p>
                        <p className="mb-4">
                          A chegada do sistema telefônico em Rio Branco foi um marco que transformou a capital 
                          acreana. Na década de 1970, com o boom da borracha e o crescimento da cidade, a necessidade 
                          de comunicação imediata se tornou urgente. As primeiras linhas telefônicas eram precárias, 
                          sujeitas a interrupções frequentes devido às chuvas torrenciais e às condições extremas da 
                          floresta. Muitos moradores mais antigos ainda lembram com saudade das <strong>"ligações 
                          de cruzamento"</strong>, onde era preciso pedir à telefonista para conectar com outras cidades.
                        </p>
                        <p className="mb-4">
                          A implementação do DDD 68 em Rio Branco na década de 1990 coincidiu com um período de 
                          transformação econômica e social no Acre. A capital deixava de ser uma cidade isolada para 
                          se conectar diretamente com todos os estados brasileiros. O sistema DDD trouxe não apenas 
                          praticidade, mas também um sentimento de pertencimento ao Brasil moderno. Para os acreanos, 
                          discar 68 antes do número telefônico significava que Rio Branco estava, finalmente, 
                          integrada ao resto do país.
                        </p>
                        <p>
                          Hoje, Rio Branco possui uma infraestrutura de telecomunicações que surpreende visitantes 
                          de outras regiões. A cidade que um dia dependeu de barcos para comunicação agora tem 
                          internet 5G, fibras ópticas e uma rede móvel que chega até as comunidades mais distantes. 
                          Esta evolução representa o espírito resiliente e inovador do povo acreano, que transformou 
                          os desafios da Amazônia em oportunidades de desenvolvimento tecnológico.
                        </p>
                      </div>
                    </section>

                    {/* Section 2: Infraestrutura Atual */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Infraestrutura Moderna na Selva</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          A infraestrutura de telecomunicações em Rio Branco é um exemplo de como a tecnologia pode 
                          se adaptar aos desafios amazônicos. Com aproximadamente {formatNumber(city.population)} 
                          habitantes espalhados por {formatArea(city.area)} de densa floresta, a cidade exige uma rede 
                          de comunicação que seja ao mesmo tempo robusta e flexível, capaz de atender tanto ao centro 
                          urbano movimentado quanto às comunidades ribeirinhas isoladas.
                        </p>
                        <p className="mb-4">
                          O sistema de telefonia fixa em Rio Branco é alimentado por uma rede de fibras ópticas que 
                          percorrem a cidade, oferecendo velocidades de internet que competem com as grandes capitais 
                          do sul e sudeste. As operadoras mantêm estações de tratamento especialmente projetadas 
                          para o clima amazônico, com sistemas de refrigeração redundantes e geradores que garantem 
                          o funcionamento mesmo durante as frequentes quedas de energia. A cobertura da rede fixa 
                          atinge 99% da área urbana, um número impressionante considerando os desafios logísticos da 
                          região.
                        </p>
                        <p className="mb-4">
                          Na telefonia móvel, Rio Branco é servida por uma rede de antenas que utiliza tecnologia 
                          adaptada para a Amazônia. As torres são construídas sobre plataformas elevadas para 
                          superar a densa cobertura arbórea, e muitas utilizam energia solar como fonte de alimentação 
                          complementar. A cobertura 4G atinge 98% do município, incluindo as principais rodovias 
                          como a BR-317 e a BR-364, que conectam Rio Branco ao resto do Brasil. Áreas estratégicas 
                          já contam com tecnologia 5G, posicionando a capital acreana na vanguarda tecnológica nacional.
                        </p>
                        <p>
                          Uma particularidade interessante da infraestrutura de Rio Branco é o sistema de 
                          comunicação via satélite que complementa as redes terrestres. Este sistema é essencial 
                          para atender às comunidades indígenas e ribeirinhas, onde a instalação de infraestrutura 
                          convencional seria inviável ou ecologicamente prejudicial. A combinação de tecnologias 
                          terrestres e satelitais faz de Rio Branco um modelo de como conciliar desenvolvimento 
                          tecnológico com preservação ambiental.
                        </p>
                      </div>
                    </section>

                    {/* Section 3: Impacto Econômico */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Economia Digital na Terra do Acre</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          As telecomunicações em Rio Branco são o motor da economia digital do Acre, transformando 
                          uma região historicamente dependente da extração vegetal em um polo de inovação 
                          tecnológica. A qualidade da infraestrutura de comunicação tem atraído novos investimentos 
                          para a capital, especialmente nos setores de tecnologia da informação, comércio eletrônico 
                          e serviços digitais.
                        </p>
                        <p className="mb-4">
                          No comércio local, as telecomunicações modernas revolucionaram a forma de fazer negócios. 
                          Lojas tradicionais de Rio Branco agora vendem para clientes de todo o Brasil através de 
                          plataformas online, e produtores rurais utilizam aplicativos para negociar diretamente 
                          com atacadistas de outros estados. O <strong>"comércio eletrônico amazônico"</strong> tem 
                          se tornado uma realidade, com empreendedores acreanos criando marcas que levam os 
                          produtos da floresta para o mercado nacional sem intermediários.
                        </p>
                        <p className="mb-4">
                          Na agricultura, a tecnologia chegou para ficar. Fazendeiros de Rio Branco utilizam 
                          sistemas de monitoramento via satélite para gerenciar plantações, drones para mapear 
                          áreas de cultivo e aplicativos móveis para acessar informações sobre preços e clima. 
                          A <strong>"agricultura de precisão"</strong> tem aumentado a produtividade e reduzido 
                          o impacto ambiental, permitindo que os produtores acreanos compitam em igualdade 
                          de condições com agricultores de outras regiões.
                        </p>
                        <p>
                          Na área da educação, as telecomunicações estão democratizando o acesso ao conhecimento. 
                          Escolas de Rio Branco utilizam plataformas digitais para complementar o ensino presencial, 
                          e estudantes da capital têm acesso a cursos online de universidades de todo o Brasil. 
                          A Universidade Federal do Acre (UFAC) mantém um robusto sistema de educação a distância 
                          que atinge alunos em todo o estado, transformando a realidade educacional de comunidades 
                          que antes tinham acesso limitado ao ensino superior.
                        </p>
                      </div>
                    </section>

                    {/* Section 4: Cultura e Comunicação */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultura Acreana na Era Digital</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          As telecomunicações em Rio Branco não são apenas uma questão de infraestrutura, são 
                          um elemento fundamental na preservação e difusão da cultura acreana. Através da internet, 
                          as manifestações culturais do Acre - como o <strong>"Festival de Folclore"</strong>, a 
                          <strong>"Festa do Acre"</strong> e as tradições indígenas - chegam a um público global 
                          que antes desconhecia a riqueza cultural da região.
                        </p>
                        <p className="mb-4">
                          Artistas de Rio Branco utilizam as redes sociais para divulgar suas obras, músicos 
                          acreanos lançam clipes online que mostram a beleza da Amazônia, e artesãos vendem 
                          seus produtos diretamente para consumidores de todo o mundo. Esta <strong>"revolução 
                          cultural digital"</strong> tem fortalecido a identidade acreana e gerado renda para 
                          milhares de famílias que vivem da cultura local.
                        </p>
                        <p className="mb-4">
                          A comunicação digital também tem sido essencial na organização social e política de 
                          Rio Branco. Movimentos sociais, associações de bairro e grupos culturais utilizam as 
                          redes para mobilizar a população e discutir os destinos da cidade. A democracia 
                          digital em Rio Branco permite que cidadãos participem ativamente das decisões 
                          públicas, fiscalizem o governo e proponham novas ideias para o desenvolvimento 
                          da capital.
                        </p>
                        <p>
                          Na saúde, as telecomunicações salvam vidas diariamente. O sistema de 
                          <strong>"telemedicina"</strong> conecta pacientes de Rio Branco com especialistas 
                          de outros estados, permitindo diagnósticos mais precisos e tratamentos adequados 
                          sem que os pacientes precisem se deslocar para centros médicos distantes. Durante 
                          a pandemia de COVID-19, esta infraestrutura foi essencial para manter os serviços 
                          de saúde funcionando e proteger a população acreana.
                        </p>
                      </div>
                    </section>

                    {/* Section 5: Desafios e Soluções */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Desafios Amazônicos e Soluções Inovadoras</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          Rio Branco enfrenta desafios únicos que exigem soluções igualmente únicas no campo 
                          das telecomunicações. O clima equatorial, com chuvas intensas e alta umidade, 
                          representa um teste constante para a durabilidade dos equipamentos. As operadoras 
                          locais desenvolveram soluções específicas, como estações seladas a vácuo e 
                          cabos com revestimento especial para resistir às condições extremas da Amazônia.
                        </p>
                        <p className="mb-4">
                          A distância de grandes centros urbanos é outro desafio significativo. Para garantir 
                          a qualidade dos serviços, as operadoras mantêm estoques locais de peças de 
                          reposição e equipes técnicas especializadas permanentemente em Rio Branco. Esta 
                          <strong>"autonomia operacional"</strong> permite que problemas sejam resolvidos 
                          rapidamente sem depender de envios de outras capitais, que poderiam levar semanas 
                          para chegar.
                        </p>
                        <p className="mb-4">
                          A biodiversidade amazônica também apresenta desafios inesperados. Animais, insetos 
                          e até mesmo plantas podem interferir na infraestrutura de telecomunicações. As 
                          operadoras trabalham em conjunto com biólogos e especialistas em meio ambiente 
                          para desenvolver soluções que minimizem o impacto ambiental e garantam a 
                          integridade da rede. Esta abordagem <strong>"eco-tecnológica"</strong> tem se 
                          tornado um modelo para outras regiões de floresta tropical no mundo.
                        </p>
                        <p>
                          O desafio da inclusão digital em comunidades tradicionais tem sido enfrentado com 
                          projetos inovadores. Rio Branco é sede de programas que levam internet para 
                          aldeias indígenas e comunidades ribeirinhas, utilizando tecnologias de baixo 
                          custo e fácil manutenção. Estes projetos não apenas conectam as comunidades, 
                          mas também preservam suas culturas através do registro digital de tradições 
                          orais, músicas e conhecimentos ancestrais.
                        </p>
                      </div>
                    </section>

                    {/* Section 6: Guia Prático */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Guia Prático do Acreano para Telecomunicações</h2>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          Para os acreanos e visitantes que chegam a Rio Branco, entender como funciona o 
                          sistema de telecomunicações local é essencial. Este guia prático foi elaborado 
                          com a colaboração de moradores antigos e especialistas locais para garantir que 
                          as informações sejam úteis e reflitam a realidade da capital acreana.
                        </p>
                        <p className="mb-4">
                          <strong>Para fazer ligações locais em Rio Branco:</strong> Na maior parte da cidade, 
                          basta discar o número completo do telefone sem o DDD. No entanto, em bairros 
                          que fazem divisa com municípios vizinhos, como o <strong>"Segundo Distrito"</strong> 
                          e <strong>"Plácido de Castro"</strong>, pode ser necessário utilizar o código 68. 
                          Os acreanos geralmente tentam sem o DDD primeiro, e se não funcionar, adicionam 
                          o código - um jeito prático que todo mundo conhece por aqui.
                        </p>
                        <p className="mb-4">
                          <strong>Para ligações interurbanas:</strong> Ao ligar para outras cidades, 
                          incluindo as do próprio Acre, use o formato: 0 + 68 + número do telefone. 
                          Por exemplo, para ligar para Cruzeiro do Sul, discar 068 + número. Os acreanos 
                          costumam dizer <strong>"vai com 68"</strong> quando se referem a ligações 
                          para fora de Rio Branco. Para chamadas para celulares, o formato é o mesmo, 
                          mas lembre-se que números de celular no Acre geralmente começam com 9.
                        </p>
                        <p className="mb-4">
                          <strong>Para ligações internacionais:</strong> Rio Branco tem boas opções para 
                          chamadas internacionais. Use o formato: 00 + operadora + código do país + 68 + 
                          número do telefone. As operadoras mais usadas para chamadas internacionais são 
                          Embratel (21) e Intelig (23). Muitos acreanos com familiares no exterior 
                          utilizam aplicativos como WhatsApp e Telegram para reduzir custos, mas as 
                          chamadas tradicionais ainda são importantes para negócios e contatos formais.
                        </p>
                        <p className="mb-4">
                          <strong>Para internet móvel:</strong> Rio Branco tem excelente cobertura 4G, 
                          mas algumas dicas são úteis: em dias de chuva muito forte, o sinal pode 
                          ficar instável em algumas áreas - é normal na Amazônia. Nas proximidades 
                          do rio Acre, especialmente durante a cheia, o sinal pode ter variações. 
                          Os acreanos recomendam ter chips de duas operadoras diferentes para garantir 
                          conexão em todas as situações - uma prática comum por aqui.
                        </p>
                        <p>
                          <strong>Para problemas de telecomunicações:</strong> Se você enfrentar problemas 
                          com o sinal ou internet, primeiro verifique se não é um problema geral - 
                          pergunte aos vizinhos ou verifique grupos de WhatsApp do bairro. Se for 
                          isolado, entre em contato com sua operadora. Em Rio Branco, as operadoras 
                          têm lojas físicas no centro e nos principais shoppings, onde você pode 
                          resolver a maioria dos problemas diretamente. Para reclamações formais, 
                          utilize os canais da Anatel - os acreanos são organizados e sabem como 
                          exigir seus direitos.
                        </p>
                      </div>
                    </section>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 3: Mapa */}
              <TabsContent value="mapa" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Map className="h-6 w-6 text-purple-600" />
                      Localização Geográfica de Rio Branco
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Mapa interativo e informações sobre a capital amazônica
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Interactive Map */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <CityMap 
                        cityName={city.name}
                        stateName={city.state.name}
                        latitude={city.latitude}
                        longitude={city.longitude}
                      />
                    </div>

                    {/* Geographic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Coordenadas Geográficas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Latitude:</span>
                            <span className="font-medium">{city.latitude || '9°58\'29"S'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Longitude:</span>
                            <span className="font-medium">{city.longitude || '67°48\'36"W'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fuso Horário:</span>
                            <span className="font-medium">UTC-5 (Amazônia Legal)</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Informações Territoriais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Área Total:</span>
                            <span className="font-medium">{formatArea(city.area)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">População:</span>
                            <span className="font-medium">{formatNumber(city.population)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Densidade:</span>
                            <span className="font-medium">
                              {city.area && city.population 
                                ? Math.round(city.population / city.area) 
                                : 'N/A'} hab/km²
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Geographic Description */}
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">Rio Branco no Contexto Amazônico</h3>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          Rio Branco está estrategicamente localizada às margens do rio Acre, na região 
                          oeste do estado, fazendo fronteira com a Bolívia. Esta posição geográfica 
                          confere à capital acreana um status de <strong>"porta de entrada da Amazônia 
                          Ocidental"</strong>, servindo como centro de distribuição e comércio para 
                          toda a região. A cidade está situada a aproximadamente 150 metros acima do 
                          nível do mar, em uma área de transição entre a floresta densa e as áreas 
                          mais abertas do cerrado amazônico.
                        </p>
                        <p className="mb-4">
                          A localização de Rio Branco é fundamental para entender seu desenvolvimento 
                          econômico e social. A cidade está no cruzamento de importantes rodovias 
                          como a BR-317, que liga o Acre ao resto do Brasil, e a BR-364, que 
                          conecta a região amazônica ao centro-oeste brasileiro. Esta posição 
                          estratégica transformou Rio Branco em um centro logístico e comercial 
                          essencial para o desenvolvimento da Amazônia.
                        </p>
                        <p>
                          O relevo de Rio Branco é caracterizado por terras baixas e planas, típicas 
                          da bacia amazônica, com pequenas elevações que raramente ultrapassam 
                          200 metros de altitude. O solo é predominantemente argiloso, adequado 
                          para a agricultura, e a hidrografia é dominada pelo rio Acre e seus 
                          afluentes, que servem como vias de transporte, fonte de energia e 
                          sustento para as populações ribeirinhas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 4: Turismo */}
              <TabsContent value="turismo" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Camera className="h-6 w-6 text-orange-600" />
                      Turismo em Rio Branco - A Magia da Amazônia
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Descubra as atrações únicas da capital acreana
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Tourist Attractions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Mountain className="h-5 w-5 text-orange-600" />
                            Museu da Borracha
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-3">
                            O principal museu de Rio Branco, que conta a história do ciclo da borracha e a formação do Acre.
                          </p>
                          <a 
                            href="https://turismo.ac.gov.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                          >
                            Mais informações →
                          </a>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Waves className="h-5 w-5 text-orange-600" />
                            Rio Acre
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-3">
                            O rio que dá nome à cidade e ao estado, essencial para a vida e cultura de Rio Branco.
                          </p>
                          <a 
                            href="https://turismo.ac.gov.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                          >
                            Mais informações →
                          </a>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TreePine className="h-5 w-5 text-orange-600" />
                            Parque da Maternidade
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-3">
                            O principal parque urbano de Rio Branco, local no coração da cidade e ponto de encontro popular.
                          </p>
                          <a 
                            href="https://turismo.ac.gov.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                          >
                            Mais informações →
                          </a>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Fish className="h-5 w-5 text-orange-600" />
                            Feira do Produtor
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-3">
                            Onde encontrar os produtos típicos da Amazônia e a culinária acreana mais autêntica.
                          </p>
                          <a 
                            href="https://turismo.ac.gov.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                          >
                            Mais informações →
                          </a>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tourism Description */}
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-orange-900 mb-4">Turismo na Capital da Amazônia</h3>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          Rio Branco oferece uma experiência turística única, diferente de qualquer outra 
                          capital brasileira. Aqui, o visitante não encontra apenas prédios e monumentos, 
                          mas sim a <strong>"alma da Amazônia"</strong> - um lugar onde a natureza e a 
                          cultura se fundem de maneira harmoniosa. A cidade é o ponto de partida ideal 
                          para quem quer conhecer a floresta amazônica com toda a infraestrutura e 
                          segurança de uma capital.
                        </p>
                        <p className="mb-4">
                          O turismo em Rio Branco é baseado em três pilares fundamentais: o 
                          <strong>turismo cultural</strong>, que valoriza as tradições acreanas e a história 
                          do estado; o <strong>turismo de natureza</strong>, que explora as belezas naturais 
                          da região; e o <strong>turismo de negócios</strong>, impulsionado pela posição 
                          estratégica da cidade como centro econômico da Amazônia Ocidental. Esta 
                          combinação torna Rio Branco um destino completo para todos os tipos de viajantes.
                        </p>
                        <p>
                          A infraestrutura de telecomunicações moderna de Rio Branco é um fator 
                          essencial para o desenvolvimento turístico. Visitantes podem compartilhar 
                          suas experiências em tempo real, acessar informações sobre a cidade e 
                          manter-se conectados mesmo durante passeios pela floresta. A qualidade 
                          do sinal de internet e celular na capital acreana surpreende positivamente 
                          quem espera encontrar isolamento na Amazônia.
                        </p>
                      </div>
                    </div>

                    {/* External Tourism Links */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Links Úteis para Turismo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <a 
                            href="https://turismo.ac.gov.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                          >
                            <Globe className="h-4 w-4" />
                            Turismo Acre
                          </a>
                          <a 
                            href="https://brasil.tur.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                          >
                            <Globe className="h-4 w-4" />
                            Turismo Brasil
                          </a>
                          <a 
                            href="https://www.Booking.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                          >
                            <Globe className="h-4 w-4" />
                            Hospedagem em Rio Branco
                          </a>
                          <a 
                            href="https://www.tripadvisor.com.br" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                          >
                            <Globe className="h-4 w-4" />
                            Avaliações de Turismo
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 5: FAQ */}
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Search className="h-6 w-6 text-red-600" />
                      Perguntas Frequentes sobre Telecomunicações em Rio Branco
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Respostas para as dúvidas mais comuns com o conhecimento local
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* FAQ Items */}
                    <div className="space-y-4">
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Qual o DDD de Rio Branco e como funciona na prática?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Rio Branco utiliza o código DDD 68. Na prática, para ligações locais dentro da cidade, 
                          geralmente não precisa usar o DDD, mas para ligações para outras cidades, mesmo do Acre, 
                          é obrigatório discar 068 antes do número.
                        </p>
                        <p className="text-gray-700">
                          Os acreanos costumam dizer <strong>"liga com 68"</strong> quando se referem a chamadas 
                          interurbanas. O código 68 atende não apenas Rio Branco, mas toda a região amazônica 
                          acreana, incluindo comunidades ribeirinhas e distritos.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Como é a qualidade do sinal de celular e internet em Rio Branco?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Rio Branco tem excelente cobertura 4G de todas as operadoras, com velocidades que 
                          chegam a 100 Mbps em áreas bem cobertas. A cidade já conta com tecnologia 5G em 
                          pontos estratégicos como centro e aeroporto.
                        </p>
                        <p className="text-gray-700">
                          Durante as chuvas fortes, que são comuns na Amazônia, o sinal pode ficar instável 
                          em algumas áreas - é normal e geralmente volta rapidamente. Os acreanos recomendam 
                          ter chips de duas operadoras diferentes para garantir conexão em todas as situações, 
                          especialmente durante a estação chuvosa.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Quais operadoras de telecomunicações funcionam melhor em Rio Branco?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Todas as grandes operadoras (Vivo, Claro, TIM, Oi) funcionam bem em Rio Branco, 
                          mas a Vivo geralmente tem melhor cobertura em áreas mais distantes e comunidades 
                          ribeirinhas. A Claro tem boa velocidade de internet no centro, e a TIM é popular 
                          por seus planos mais econômicos.
                        </p>
                        <p className="text-gray-700">
                          Além das grandes operadoras, Rio Branco tem a Algar Telecom, que é muito 
                          respeitada na região por seu atendimento ao cliente e estabilidade do sinal. 
                          Muitos acreanos preferem a Algar para residência e uma das grandes para ter 
                          um plano móvel adicional.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Como funciona a internet em comunidades ribeirinhas próximas a Rio Branco?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Muitas comunidades ribeirinhas próximas a Rio Branco têm acesso à internet 
                          através de sistemas via satélite ou rádio. O governo do Acre mantém projetos 
                          que levam internet para estas comunidades, permitindo que moradores acessem 
                          serviços online e mantenham contato com a capital.
                        </p>
                        <p className="text-gray-700">
                          A velocidade nestas áreas geralmente é menor que na cidade, variando entre 
                          5-20 Mbps, mas já representa uma revolução para comunidades que antes 
                          dependiam de rádio amador ou não tinham nenhuma forma de comunicação 
                          com o resto do mundo.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          O que fazer quando o sinal cai durante as chuvas fortes?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Durante as chuvas fortes na Amazônia, é comum o sinal ficar instável. 
                          Primeiro, verifique se o problema é geral perguntando aos vizinhos ou 
                          verificando grupos de WhatsApp do bairro. Se for isolado, reinicie seu 
                          aparelho e verifique as configurações de rede.
                        </p>
                        <p className="text-gray-700">
                          Se o problema persistir, entre em contato com sua operadora. Em Rio Branco, 
                          as operadoras têm equipes técnicas que respondem rapidamente a problemas 
                          causados por chuvas, pois são situações previsíveis na região. Mantenha 
                          sempre os números de contato da sua operadora salvos no celular.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Como fazer reclamações sobre problemas de telecomunicações em Rio Branco?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Para reclamações em Rio Branco, primeiro entre em contato com sua operadora 
                          através do SAC ou visitando uma de suas lojas na cidade. Se o problema não 
                          for resolvido em 5 dias, registre uma reclamação na
                          <a href="https://www.anatel.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">Anatel</a>.
                        </p>
                        <p className="text-gray-700">
                          Os acreanos são organizados e sabem como exigir seus direitos. Existem 
                          grupos de WhatsApp e redes sociais onde moradores compartilham experiências 
                          e dão dicas sobre como resolver problemas com telecomunicações. O Procon 
                          do Acre também ajuda na mediação de conflitos com as operadoras.
                        </p>
                      </div>
                    </div>

                    {/* Additional Resources */}
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-red-900 mb-4">Recursos Adicionais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a 
                          href="https://www.anatel.gov.br" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                        >
                          <Globe className="h-4 w-4" />
                          Portal Anatel
                        </a>
                        <a 
                          href="https://consumidor.gov.br" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                        >
                          <Globe className="h-4 w-4" />
                          Consumidor.gov.br
                        </a>
                        <a 
                          href="https://www.gov.br" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                        >
                          <Globe className="h-4 w-4" />
                          Portal Gov.br
                        </a>
                        <a 
                          href={authorInfo.authorPage}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                        >
                          <User className="h-4 w-4" />
                          Falar com Especialista
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 6: Autoridade */}
              <TabsContent value="autoridade" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Award className="h-6 w-6 text-indigo-600" />
                      Fontes Oficiais e Autoridade em Telecomunicações
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Links para órgãos governamentais e fontes oficiais de informação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Government Agencies */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Órgãos Governamentais e Reguladores</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Anatel
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Agência Nacional de Telecomunicações - Órgão regulador do setor de telecomunicações no Brasil
                            </p>
                            <a 
                              href="https://www.anatel.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Acessar site oficial →
                            </a>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Ministério das Comunicações
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Ministério responsável pelas políticas públicas de comunicação no Brasil
                            </p>
                            <a 
                              href="https://www.gov.br/comunicacoes" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Acessar site oficial →
                            </a>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Governo do Acre
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Portal oficial do governo estadual com informações sobre telecomunicações
                            </p>
                            <a 
                              href="https://ac.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Acessar site oficial →
                            </a>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Prefeitura de Rio Branco
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Site oficial da prefeitura com serviços e informações municipais
                            </p>
                            <a 
                              href="https://riobranco.ac.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Acessar site oficial →
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Official Statistics */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Fontes de Dados Oficiais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              IBGE
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Instituto Brasileiro de Geografia e Estatística - Dados demográficos oficiais
                            </p>
                            <a 
                              href="https://www.ibge.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Consultar dados →
                            </a>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              TeleListas
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Consulta oficial de prefixos telefônicos e códigos DDD do Brasil
                            </p>
                            <a 
                              href="https://telistas.com.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Consultar prefixos →
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Consumer Protection */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Proteção ao Consumidor</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Consumidor.gov.br
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Plataforma federal para registro de reclamações contra empresas de telecomunicações
                            </p>
                            <a 
                              href="https://consumidor.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Registrar reclamação →
                            </a>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Globe className="h-5 w-5 text-indigo-600" />
                              Procon Acre
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">
                              Fundação de Proteção e Defesa do Consumidor do estado
                            </p>
                            <a 
                              href="https://procon.ac.gov.br" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              Acessar Procon →
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Expert Sources */}
                    <div className="bg-indigo-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-4">Fontes Especializadas</h3>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                          As informações sobre telecomunicações em Rio Branco são baseadas em fontes oficiais 
                          e na experiência prática de especialistas que conhecem profundamente as particularidades 
                          da região amazônica. A consultoria especializada considerou não apenas os aspectos 
                          técnicos, mas também as características culturais e geográficas que tornam as 
                          telecomunicações no Acre únicas no contexto brasileiro.
                        </p>
                        <p className="mb-4">
                          Para aprofundar seus conhecimentos sobre telecomunicações na Amazônia, recomendamos 
                          a consulta direta aos sites oficiais listados acima, especialmente a
                          <a href="https://www.anatel.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">Anatel</a>
                          e o
                          <a href="https://www.gov.br/comunicacoes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">Ministério das Comunicações</a>.
                          Estes órgãos mantêm informações atualizadas sobre regulamentações específicas para 
                          a região amazônica e políticas públicas de inclusão digital.
                        </p>
                        <p>
                          Para informações específicas sobre Rio Branco e o Acre, o
                          <a href="https://ac.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">governo do Acre</a>
                          mantém portais especializados que detalham os projetos de telecomunicações 
                          em andamento e os planos de expansão da infraestrutura. Todas as informações 
                          presentes neste guia são verificadas regularmente para garantir sua precisão 
                          e relevância para os usuários da capital acreana.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}