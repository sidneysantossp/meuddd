import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Users, Phone, ArrowLeft, Home, ChevronRight, Building, TrendingUp, Map as MapIcon, Heart, BookOpen, DollarSign, HomeIcon, ExternalLink, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';
// PERFORMANCE: Lazy load heavy data
const loadStatesData = () => import('@/data/states');
import { cityDetailedData, generateCitySEO } from '@/data/cityDetailedInfo';
import InteractiveMap from '@/components/ui/InteractiveMap';
import { allBlogPosts } from '@/data/blogPosts';

export default function CityDetailPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [foundCity, setFoundCity] = useState<any>(null);
  const [foundState, setFoundState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Normalizar nome da cidade da URL
  const normalizedCityName = cityName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/-/g, '');
  
  // PERFORMANCE: Load city data async
  useEffect(() => {
    if (!normalizedCityName) return;
    
    loadStatesData().then((module) => {
      for (const state of module.brazilianStates) {
        const city = state.cities.find((c: any) => 
          c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '') === normalizedCityName
        );
        if (city) {
          setFoundCity(city);
          setFoundState(state);
          break;
        }
      }
      setIsLoading(false);
    });
  }, [normalizedCityName]);

  const cityInfo = foundCity && normalizedCityName ? cityDetailedData[normalizedCityName] : null;

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    // Scroll imediato
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Scroll adicional após um pequeno delay para garantir
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [cityName]);

  if (!foundCity || !foundState) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <h1 className="text-2xl xl:text-3xl font-bold text-foreground mb-4 max-sm:text-xl">
            Cidade não encontrada
          </h1>
          <Button onClick={() => navigate('/estados')} className="bg-primary text-primary-foreground">
            Voltar para Estados
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Gerar dados padrão quando cityInfo não existe
  const defaultCityInfo = cityInfo || {
    population: foundCity.population || 0,
    area: 'Informação não disponível',
    populationGrowth: 'Informação não disponível',
    density: 'Informação não disponível',
    type: 'Cidade',
    classification: 'Interior',
    coordinates: {
      lat: 0,
      lng: 0
    },
    socialIndicators: {
      idh: 'Informação não disponível',
      idhLevel: 'Informação não disponível',
      literacy: 'Informação não disponível',
      averageIncome: 'Informação não disponível',
      ownHomes: 'Informação não disponível'
    },
    operators: [
      {
        name: 'Vivo',
        coverage: 'Consulte disponibilidade',
        technology: '4G/5G'
      },
      {
        name: 'Claro',
        coverage: 'Consulte disponibilidade',
        technology: '4G'
      },
      {
        name: 'TIM',
        coverage: 'Consulte disponibilidade',
        technology: '4G'
      },
      {
        name: 'Oi',
        coverage: 'Consulte disponibilidade',
        technology: '4G'
      }
    ],
    emergencyServices: [
      {
        name: 'SAMU',
        description: 'Serviço de Atendimento Móvel de Urgência',
        phone: '192',
        color: 'bg-red-500'
      },
      {
        name: 'Polícia Militar',
        description: 'Emergências e segurança pública',
        phone: '190',
        color: 'bg-blue-500'
      },
      {
        name: 'Bombeiros',
        description: 'Combate a incêndios e resgates',
        phone: '193',
        color: 'bg-orange-500'
      },
      {
        name: 'Polícia Civil',
        description: 'Investigações e ocorrências',
        phone: '197',
        color: 'bg-gray-600'
      }
    ],
    localServices: [
      {
        name: 'Prefeitura Municipal',
        description: 'Serviços administrativos e atendimento ao cidadão',
        icon: 'Building'
      },
      {
        name: 'Posto de Saúde',
        description: 'Atendimento básico de saúde',
        icon: 'Heart'
      },
      {
        name: 'Escolas Públicas',
        description: 'Educação fundamental e média',
        icon: 'BookOpen'
      },
      {
        name: 'Agências Bancárias',
        description: 'Serviços financeiros',
        icon: 'DollarSign'
      }
    ],
    tourism: {
      description: `${foundCity.name} oferece diversas opções de lazer e turismo para moradores e visitantes. A cidade possui atrativos naturais e culturais que refletem a identidade da região ${foundState.region}.`,
      attractions: [
        {
          name: 'Centro Histórico',
          description: 'Conheça a história e arquitetura local',
          category: 'Cultural',
          color: 'bg-purple-500'
        },
        {
          name: 'Praças e Parques',
          description: 'Áreas de lazer e convivência',
          category: 'Lazer',
          color: 'bg-green-500'
        },
        {
          name: 'Eventos Locais',
          description: 'Festividades e celebrações tradicionais',
          category: 'Eventos',
          color: 'bg-yellow-500'
        }
      ],
      events: [
        {
          name: 'Festas Tradicionais',
          description: 'Celebrações culturais e religiosas ao longo do ano',
          period: 'Anual'
        },
        {
          name: 'Eventos Esportivos',
          description: 'Competições e atividades esportivas locais',
          period: 'Variado'
        }
      ]
    },
    about: {
      introduction: `${foundCity.name} é uma cidade localizada no estado de ${foundState.name}, na região ${foundState.region} do Brasil. Com uma população de ${foundCity.population?.toLocaleString('pt-BR')} habitantes, a cidade utiliza o código DDD ${foundCity.ddd} para ligações telefônicas.`,
      history: `A história de ${foundCity.name} está intimamente ligada ao desenvolvimento da região ${foundState.region} do Brasil. Como parte do estado de ${foundState.name}, a cidade contribui para a rica diversidade cultural e econômica da região.`,
      geography: `${foundCity.name} está situada no estado de ${foundState.name}, fazendo parte da região ${foundState.region} do país. A cidade possui características geográficas típicas da região, com clima e vegetação característicos.`,
      economy: `A economia de ${foundCity.name} é diversificada, com atividades que incluem comércio, serviços e setores produtivos locais. A cidade conta com infraestrutura de telecomunicações moderna, incluindo acesso a internet de alta velocidade e telefonia móvel.`,
      culture: `${foundCity.name} possui uma rica cultura local, com tradições e costumes que refletem a identidade da região ${foundState.region}. A cidade celebra festividades locais e mantém vivas as tradições culturais do estado de ${foundState.name}.`,
      infrastructure: `A infraestrutura de ${foundCity.name} inclui serviços essenciais como educação, saúde e telecomunicações. A cidade é atendida por operadoras de telefonia móvel e provedores de internet, garantindo conectividade aos moradores e empresas locais.`
    },
    faqs: [
      {
        question: `Qual o código DDD de ${foundCity.name}?`,
        answer: `O código DDD de ${foundCity.name} é ${foundCity.ddd}. Este código é utilizado para realizar ligações telefônicas para a cidade.`
      },
      {
        question: `Quantos habitantes tem ${foundCity.name}?`,
        answer: `${foundCity.name} possui aproximadamente ${foundCity.population?.toLocaleString('pt-BR')} habitantes, segundo dados do IBGE.`
      },
      {
        question: `Em qual estado fica ${foundCity.name}?`,
        answer: `${foundCity.name} está localizada no estado de ${foundState.name}, na região ${foundState.region} do Brasil.`
      },
      {
        question: `Quais operadoras de telefonia atendem ${foundCity.name}?`,
        answer: `${foundCity.name} é atendida pelas principais operadoras do Brasil: Vivo, Claro, TIM e Oi, oferecendo cobertura 4G e, em algumas áreas, 5G.`
      },
      {
        question: `Como é a internet em ${foundCity.name}?`,
        answer: `${foundCity.name} conta com diversos provedores de internet, oferecendo planos de fibra óptica, internet via rádio e outras tecnologias. A velocidade e disponibilidade variam conforme a localização na cidade.`
      }
    ],
    externalLinks: [
      {
        name: 'IBGE - Informações sobre a cidade',
        url: `https://cidades.ibge.gov.br/brasil/${foundState.slug}/panorama`,
        description: 'Dados oficiais do Instituto Brasileiro de Geografia e Estatística'
      },
      {
        name: 'Anatel - Telecomunicações',
        url: 'https://www.anatel.gov.br/',
        description: 'Agência Nacional de Telecomunicações'
      }
    ]
  };

  const formatPopulation = (population: number) => {
    return population.toLocaleString('pt-BR');
  };

  // Gerar URLs externas
  const cityGoogleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(foundCity.name + ', ' + foundState.name + ', Brasil')}`;
  const stateGoogleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(foundState.name + ', Brasil')}`;
  const ibgeUrl = `https://cidades.ibge.gov.br/brasil/${foundState.id}/panorama`;
  const statePageUrl = `/estado/${foundState.slug}`;

  // Gerar dados de SEO
  const seoData = generateCitySEO(foundCity, foundState);
  
  // Converter canonical relativo para absoluto
  const canonicalUrl = `https://www.meuddd.com.br${seoData.canonical}`;

  return (
    <MainLayout>
      {/* SEO Head com canonical URL */}
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={canonicalUrl}
        ogType="website"
        structuredData={seoData.structuredData}
      />
      
      {/* Hero Section com Gradiente */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-16 xl:py-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/80 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-foreground flex items-center gap-1">
              <Home className="h-4 w-4" />
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/estados" className="hover:text-primary-foreground">
              Estados
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/estado/${foundState.slug}`} className="hover:text-primary-foreground">
              {foundState.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-foreground font-medium">{foundCity.name}</span>
          </nav>

          {/* Título Principal */}
          <div className="text-center">
            <h1 className="text-4xl xl:text-6xl font-bold text-primary-foreground mb-4 max-sm:text-3xl">
              DDD {foundCity.ddd} em {foundCity.name}
            </h1>
            <p className="text-lg xl:text-xl text-primary-foreground/90 mb-8 max-sm:text-base">
              Cidade de {foundState.name} e seu código DDD completo
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-8 py-4 rounded-full">
              <Phone className="h-6 w-6 text-primary-foreground" />
              <span className="text-3xl xl:text-4xl font-bold text-primary-foreground max-sm:text-2xl">
                {foundCity.ddd}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 xl:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Sidebar - Informações Rápidas */}
            <div className="xl:col-span-1">
              <Card className="shadow-lg sticky top-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                      Informações Rápidas
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Estado:</span>
                    <Link to={`/estado/${foundState.slug}`} className="text-sm font-bold text-primary hover:underline">
                      {foundState.name}
                    </Link>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">DDD:</span>
                    <Badge className="bg-button-dark text-button-dark-foreground text-base font-bold">
                      {foundCity.ddd}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">População:</span>
                    <span className="text-sm font-bold text-foreground">
                      {formatPopulation(defaultCityInfo.population)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Área:</span>
                    <span className="text-sm font-bold text-foreground">
                      {defaultCityInfo.area}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Tipo:</span>
                    <span className="text-sm font-bold text-foreground">
                      {defaultCityInfo.type}
                    </span>
                  </div>

                  {/* Acesso Rápido */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-bold text-foreground mb-3">Acesso Rápido</h3>
                    <div className="space-y-2">
                      <a href="#ddd" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        Informações DDD
                      </a>
                      <a href="#mapa" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MapIcon className="h-4 w-4" />
                        Mapa Interativo
                      </a>
                      <a href="#servicos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Building className="h-4 w-4" />
                        Serviços Locais
                      </a>
                      <a href="#dados" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Info className="h-4 w-4" />
                        Dados Demográficos
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conteúdo Principal */}
            <div className="xl:col-span-3">
              <Tabs defaultValue="ddd" className="w-full">
                <TabsList className="grid w-full grid-cols-7 max-sm:grid-cols-3">
                  <TabsTrigger value="ddd">DDD</TabsTrigger>
                  <TabsTrigger value="mapa">Mapa</TabsTrigger>
                  <TabsTrigger value="servicos">Serviços</TabsTrigger>
                  <TabsTrigger value="dados">Dados</TabsTrigger>
                  <TabsTrigger value="turismo">Turismo</TabsTrigger>
                  <TabsTrigger value="sobre">Sobre {foundCity.name}</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                {/* Tab DDD */}
                <TabsContent value="ddd" className="mt-6 space-y-6" id="ddd">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                          DDD {foundCity.ddd} em {foundCity.name}
                        </CardTitle>
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Informações completas sobre o código DDD
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert className="border-primary bg-primary/5">
                        <AlertDescription className="text-sm xl:text-base max-sm:text-xs">
                          O DDD de {foundCity.name} é <strong>{foundCity.ddd}</strong>, o mesmo código utilizado em todo o estado de {foundState.name}.
                        </AlertDescription>
                      </Alert>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-4">Como ligar para {foundCity.name}:</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium text-foreground mb-1">Do Brasil</p>
                              <p className="text-sm text-muted-foreground">{foundCity.ddd} + número</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                            <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium text-foreground mb-1">Internacional</p>
                              <p className="text-sm text-muted-foreground">+55 {foundCity.ddd} + número</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Operadoras */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                        Operadoras Disponíveis
                      </CardTitle>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Principais operadoras de telefonia na região
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @container">
                        {defaultCityInfo.operators.map((operator, index) => (
                          <Card key={index} className="border-2">
                            <CardHeader>
                              <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                                {operator.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{operator.technology}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {operator.coverage}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Mapa */}
                <TabsContent value="mapa" className="mt-6" id="mapa">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <MapIcon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                          Mapa Interativo de {foundCity.name}
                        </CardTitle>
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Explore a localização e pontos de interesse
                      </p>
                    </CardHeader>
                    <CardContent>
                      {cityInfo && defaultCityInfo.coordinates ? (
                        <InteractiveMap
                          latitude={defaultCityInfo.coordinates.lat}
                          longitude={defaultCityInfo.coordinates.lng}
                          cityName={foundCity.name}
                          stateName={foundState.name}
                          ddd={foundCity.ddd}
                        />
                      ) : (
                        <div className="bg-muted rounded-lg p-8 text-center">
                          <MapIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Coordenadas não disponíveis para esta cidade
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Serviços */}
                <TabsContent value="servicos" className="mt-6 space-y-6" id="servicos">
                  {/* Serviços Públicos */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                          Serviços Públicos
                        </CardTitle>
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Telefones úteis e emergência
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @container">
                        {defaultCityInfo.emergencyServices.map((service, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-lg ${
                              service.color === 'red' ? 'bg-red-50 border border-red-200' :
                              service.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
                              service.color === 'orange' ? 'bg-orange-50 border border-orange-200' :
                              'bg-green-50 border border-green-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Phone className={`h-5 w-5 ${
                                service.color === 'red' ? 'text-red-600' :
                                service.color === 'blue' ? 'text-blue-600' :
                                service.color === 'orange' ? 'text-orange-600' :
                                'text-green-600'
                              }`} />
                              <div>
                                <p className="font-medium text-foreground">{service.name}</p>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                            <Badge className="bg-button-dark text-button-dark-foreground text-lg font-bold">
                              {service.phone}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Serviços Locais */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                          Serviços Locais
                        </CardTitle>
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Estabelecimentos importantes
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @container">
                        {defaultCityInfo.localServices.map((service, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              {service.icon === 'hospital' && <Heart className="h-6 w-6 text-primary" />}
                              {service.icon === 'school' && <BookOpen className="h-6 w-6 text-primary" />}
                              {service.icon === 'shopping' && <Building className="h-6 w-6 text-primary" />}
                              {service.icon === 'restaurant' && <DollarSign className="h-6 w-6 text-primary" />}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{service.name}</p>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Dados */}
                <TabsContent value="dados" className="mt-6 space-y-6" id="dados">
                  {/* Estatísticas Principais */}
                  <div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @container">
                    <Card className="shadow-md">
                      <CardContent className="p-6 text-center">
                        <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-primary mb-1">
                          {formatPopulation(defaultCityInfo.population)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Habitantes</div>
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {defaultCityInfo.populationGrowth}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardContent className="p-6 text-center">
                        <MapIcon className="h-10 w-10 text-secondary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-secondary mb-1">
                          {defaultCityInfo.area}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Área total</div>
                        <Badge variant="outline" className="text-xs">
                          {defaultCityInfo.density}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="shadow-md">
                      <CardContent className="p-6 text-center">
                        <Building className="h-10 w-10 text-accent mx-auto mb-3" />
                        <div className="text-3xl font-bold text-accent mb-1">
                          {defaultCityInfo.type}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Classificação</div>
                        <Badge variant="outline" className="text-xs">
                          {defaultCityInfo.classification}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Indicadores Sociais */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                        Indicadores Sociais
                      </CardTitle>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Dados demográficos e sociais
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 @md:grid-cols-4 gap-6 @container">
                        <div className="text-center">
                          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <Heart className="h-8 w-8 text-blue-600" />
                          </div>
                          <div className="text-2xl font-bold text-primary mb-1">
                            {defaultCityInfo.socialIndicators.idh}
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">IDH</div>
                          <Badge variant="secondary" className="text-xs">
                            {defaultCityInfo.socialIndicators.idhLevel}
                          </Badge>
                        </div>

                        <div className="text-center">
                          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-green-600" />
                          </div>
                          <div className="text-2xl font-bold text-secondary mb-1">
                            {defaultCityInfo.socialIndicators.literacy}
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">Alfabetização</div>
                          <Badge variant="secondary" className="text-xs">Adultos</Badge>
                        </div>

                        <div className="text-center">
                          <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <DollarSign className="h-8 w-8 text-yellow-600" />
                          </div>
                          <div className="text-2xl font-bold text-accent mb-1">
                            {defaultCityInfo.socialIndicators.averageIncome}
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">Renda Média</div>
                          <Badge variant="secondary" className="text-xs">Mensal</Badge>
                        </div>

                        <div className="text-center">
                          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <HomeIcon className="h-8 w-8 text-purple-600" />
                          </div>
                          <div className="text-2xl font-bold text-primary mb-1">
                            {defaultCityInfo.socialIndicators.ownHomes}
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">Moradias</div>
                          <Badge variant="secondary" className="text-xs">Próprias</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Turismo */}
                <TabsContent value="turismo" className="mt-6 space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                        Turismo em {foundCity.name}
                      </CardTitle>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Atrações e pontos turísticos
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-base text-muted-foreground">
                        {defaultCityInfo.tourism.description}
                      </p>

                      <div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @container">
                        {defaultCityInfo.tourism.attractions.map((attraction, index) => (
                          <Card key={index} className={`border-2 ${
                            attraction.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                            attraction.color === 'purple' ? 'border-purple-200 bg-purple-50' :
                            'border-green-200 bg-green-50'
                          }`}>
                            <CardContent className="p-6 text-center">
                              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                                attraction.color === 'blue' ? 'bg-blue-200' :
                                attraction.color === 'purple' ? 'bg-purple-200' :
                                'bg-green-200'
                              }`}>
                                {attraction.category === 'Natureza' && <MapIcon className="h-8 w-8 text-blue-600" />}
                                {attraction.category === 'Cultura' && <Building className="h-8 w-8 text-purple-600" />}
                                {attraction.category === 'Gastronomia' && <DollarSign className="h-8 w-8 text-green-600" />}
                              </div>
                              <h3 className="text-lg font-bold text-foreground mb-2">
                                {attraction.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {attraction.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Eventos */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                        Eventos e Festivais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {defaultCityInfo.tourism.events.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                              <Building className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground mb-1">{event.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <Badge variant="outline">{event.period}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Sobre - Artigo 3000+ palavras */}
                <TabsContent value="sobre" className="mt-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl xl:text-3xl font-bold text-foreground max-sm:text-xl">
                        Sobre {foundCity.name}
                      </CardTitle>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Guia completo sobre a cidade de {foundCity.name}, {foundState.name}
                      </p>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none">
                      {/* Introdução */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Introdução</h2>
                        
                        {/* Links Externos de Referência */}
                        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-3">
                            <strong className="text-foreground">Links de Referência:</strong>
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a 
                              href={cityGoogleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                            >
                              <MapIcon className="h-4 w-4" />
                              {foundCity.name} no Google Maps
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <Link
                              to={statePageUrl}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-sm"
                            >
                              <MapPin className="h-4 w-4" />
                              Estado de {foundState.name}
                            </Link>
                            <a 
                              href={stateGoogleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm"
                            >
                              <MapIcon className="h-4 w-4" />
                              {foundState.name} no Google Maps
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <a 
                              href={ibgeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors text-sm"
                            >
                              <Users className="h-4 w-4" />
                              Dados IBGE - População
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.introduction}
                        </p>
                      </div>

                      {/* História */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">História de {foundCity.name}</h2>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.history}
                        </p>
                        <div className="mt-4 p-4 bg-primary/5 border-l-4 border-primary rounded">
                          <p className="text-sm text-muted-foreground">
                            <strong>Saiba mais:</strong> Para informações históricas detalhadas, consulte o{' '}
                            <a href={defaultCityInfo.externalLinks.find(l => l.name.includes('IBGE'))?.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              IBGE
                            </a>{' '}
                            e a{' '}
                            <a href={defaultCityInfo.externalLinks.find(l => l.name.includes('Wikipédia'))?.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              Wikipédia
                            </a>.
                          </p>
                        </div>
                      </div>

                      {/* Geografia */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Geografia e Localização</h2>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.geography}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Coordenadas</p>
                            <p className="font-bold text-foreground">
                              {defaultCityInfo.coordinates.lat}, {defaultCityInfo.coordinates.lng}
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Área Total</p>
                            <p className="font-bold text-foreground">{defaultCityInfo.area}</p>
                          </div>
                        </div>
                      </div>

                      {/* Economia */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Economia Local</h2>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.economy}
                        </p>
                        <div className="mt-4 p-4 bg-secondary/5 border-l-4 border-secondary rounded">
                          <p className="text-sm text-muted-foreground">
                            <strong>Contato Comercial:</strong> Para entrar em contato com estabelecimentos comerciais em {foundCity.name}, utilize o código{' '}
                            <Link to={`/estado/${foundState.slug}`} className="text-primary hover:underline font-bold">
                              DDD {foundCity.ddd}
                            </Link>{' '}
                            seguido do número do telefone.
                          </p>
                        </div>
                      </div>

                      {/* Cultura */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Cultura e Tradições</h2>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.culture}
                        </p>
                      </div>

                      {/* Infraestrutura */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Infraestrutura e Serviços</h2>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {defaultCityInfo.about.infrastructure}
                        </p>
                        <div className="mt-4 p-4 bg-accent/5 border-l-4 border-accent rounded">
                          <p className="text-sm text-muted-foreground">
                            <strong>Telefonia:</strong> {foundCity.name} é atendida pelo{' '}
                            <span className="font-bold text-primary">código DDD {foundCity.ddd}</span>, com cobertura das principais operadoras de telefonia móvel e fixa. Consulte a{' '}
                            <a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              ANATEL
                            </a>{' '}
                            para informações sobre serviços de telecomunicações.
                          </p>
                        </div>
                      </div>

                      {/* Links Úteis */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Links Úteis e Referências</h2>
                        <div className="grid grid-cols-1 gap-3">
                          {defaultCityInfo.externalLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <ExternalLink className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {link.name}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab FAQ */}
                <TabsContent value="faq" className="mt-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                          Perguntas Frequentes
                        </CardTitle>
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Dúvidas comuns sobre {foundCity.name}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {defaultCityInfo.faqs.map((faq, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4 py-2">
                          <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                            {faq.question}
                          </h3>
                          <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Seção de Artigos do Blog */}
              {foundState.slug === 'acre' && (() => {
                // Criar slug da cidade para buscar artigos
                const citySlug = foundCity.name
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                
                // Buscar artigos desta cidade
                const cityArticles = allBlogPosts.filter(post => post.city.slug === citySlug);
                
                if (cityArticles.length > 0) {
                  return (
                    <div className="mt-12">
                      <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-6 max-sm:text-xl">
                        📝 Artigos sobre Internet em {foundCity.name}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Confira nossos guias completos sobre internet fibra, provedores e planos em {foundCity.name}:
                      </p>
                      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                        {cityArticles.map((article) => (
                          <Link
                            key={article.id}
                            to={`/blog/${article.state.slug}/${article.city.slug}/${article.slug}`}
                            className="block group"
                          >
                            <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                                  {article.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                  {article.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{article.readingTime} min de leitura</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {article.type === 'melhor-internet-fibra' && 'Melhor Fibra'}
                                    {article.type === 'internet-fibra-cobertura' && 'Cobertura'}
                                    {article.type === 'internet-empresarial' && 'Empresarial'}
                                    {article.type === 'plano-internet-barato' && 'Plano Barato'}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Botão Voltar */}
              <div className="mt-8">
                <Button
                  onClick={() => navigate(`/estado/${foundState.slug}`)}
                  variant="outline"
                  className="w-full @md:w-auto @container"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para {foundState.name}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
