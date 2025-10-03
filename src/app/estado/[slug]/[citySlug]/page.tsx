'use client';

import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Phone, Building, Globe, ArrowLeft, Link as LinkIcon, Navigation, Wifi, Star, Clock, TrendingUp, ChevronDown } from 'lucide-react';
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
          <p className="text-gray-600">Carregando informações da cidade...</p>
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

  // Verificar se é Acrelândia para usar design de plataforma
  const isAcrelandia = city.state.slug === 'acre' && city.slug === 'acrelandia';
  // Verificar se é Rio Branco para usar design de plataforma com conteúdo SEO otimizado
  const isRioBranco = city.state.slug === 'acre' && city.slug === 'riobranco';
  // Verificar se é Cruzeiro do Sul para usar design de plataforma com conteúdo SEO otimizado
  const isCruzeiroDoSul = city.state.slug === 'acre' && city.slug === 'crzeirodosl';

  if (isRioBranco) {
    // Design de plataforma moderna para Rio Branco com conteúdo SEO otimizado
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
        <section className="bg-gradient-to-r from-green-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                DDD 68 em Rio Branco - Capital do Acre
              </h1>
              <p className="text-xl text-green-100 mb-6">
                A capital acreana e seu código DDD completo para todas as suas comunicações
              </p>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Phone className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">68</span>
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
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-green-600" />
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
                  <TabsTrigger value="sobre">Sobre Rio Branco</TabsTrigger>
                  <TabsTrigger value="mapa">Mapa</TabsTrigger>
                  <TabsTrigger value="operadoras">Operadoras</TabsTrigger>
                  <TabsTrigger value="dicas">Dicas</TabsTrigger>
                </TabsList>

                {/* Tab 1: Informações */}
                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>DDD 68 em Rio Branco</CardTitle>
                      <CardDescription>
                        Tudo que você precisa saber sobre o código DDD da capital do Acre
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-gray-800">
                          O DDD de Rio Branco é <strong>68</strong>, o mesmo código utilizado em todo o estado do Acre. 
                          Como capital do estado, Rio Branco concentra o maior volume de ligações e oferece a melhor 
                          infraestrutura de telecomunicações da região.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Como ligar para Rio Branco:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Do Brasil: 68 + número</li>
                            <li>• Do exterior: +55 68 + número</li>
                            <li>• Dentro da cidade: apenas o número</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Importante:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Todo o Acre usa DDD 68</li>
                            <li>• Melhor cobertura do estado</li>
                            <li>• Centro de operações das principais operadoras</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Sobre Rio Branco */}
                <TabsContent value="sobre" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre Rio Branco</CardTitle>
                      <CardDescription>
                        Conheça a capital do Acre, sua história, cultura e importância na região amazônica
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        {/* Introdução */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rio Branco: O Coração da Amazônia Ocidental</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Rio Branco, a vibrante capital do estado do Acre, emerge como o principal centro urbano, 
                          político, econômico e cultural da região amazônica ocidental. Fundada em 1882, esta cidade 
                          que carrega o nome do ilustre Barão do Rio Branco representa o espírito resiliente e 
                          empreendedor do povo acreano. Com população aproximada de 410.000 habitantes, a capital 
                          acreana se posiciona como um importante polo de desenvolvimento na fronteira brasileira, 
                          servindo como porta de entrada para toda a região e referência para os demais municípios 
                          do estado. O DDD 68, que identifica todas as ligações telefônicas da cidade, simboliza 
                          esta conexão que une Rio Branco não apenas com o restante do Brasil, mas com o mundo.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Localizada às margens do rio Acre, que lhe dá nome, a capital beneficia-se de uma 
                          posição geográfica estratégica que facilita o acesso tanto pela via fluvial quanto 
                          pela terrestre através da BR-364. Esta localização privilegiada transformou Rio Branco 
                          em um centro de convergência de pessoas, culturas e oportunidades, atraindo 
                          investimentos e promovendo um desenvolvimento constante que se reflete na qualidade 
                          de vida de seus habitantes. A infraestrutura de telecomunicações, representada pelo 
                          DDD 68, é uma das mais completas da região norte, oferecendo à população acesso 
                          amplo aos serviços modernos de comunicação.
                        </p>

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
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">A História de Rio Branco: Da Extração da Borracha à Modernidade</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A história de Rio Branco está intrinsecamente ligada ao ciclo da borracha, período 
                              áureo que definiu os destinos da Amazônia no final do século XIX e início do século XX. 
                              A cidade foi fundada em 28 de dezembro de 1882 por Neutel Maia, que chegou à região 
                              atraído pelas oportunidades da exploração seringueira. O local escolhido para a 
                              fundação era strategicamente posicionado na confluência dos rios Acre e Igarapé da 
                              Independência, facilitando o transporte e o comércio. Inicialmente chamada de 
                              "Vila de Nossa Senhora da Conceição", a cidade foi rebatizada posteriormente como 
                              Rio Branco em homenagem ao Barão do Rio Branco, diplomata brasileiro responsável 
                              pela consolidação das fronteiras do Acre.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              O período da borracha trouxe prosperidade e desenvolvimento, mas também conflitos 
                              internacionais, culminando na Revolução Acreana, movimento que resultou na 
                              anexação do território ao Brasil. Rio Branco desempenhou papel central nesse processo, 
                              servindo como base para as forças revolucionárias que lutaram pela independência do 
                              Acre. Com o fim do ciclo da borracha, a cidade enfrentou décadas de estagnação 
                              econômica, só retomando seu desenvolvimento a partir da década de 1970, quando 
                              programas de integração nacional e incentivos fiscais atraíram novos habitantes 
                              e investimentos para a região.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A transformação mais recente de Rio Branco começou na década de 1990, com a 
                              pavimentação da BR-364 e a implementação de políticas de desenvolvimento sustentável. 
                              A cidade modernizou sua infraestrutura, diversificou sua economia e consolidou-se 
                              como o principal centro urbano do estado. Hoje, Rio Branco é uma capital moderna, 
                              com serviços de qualidade, universidades, hospitais e uma rede de comunicação 
                              completa, simbolizada pelo DDD 68 que conecta a cidade com o Brasil e o mundo.
                            </p>

                            {/* Geografia e Meio Ambiente */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Geografia e Meio Ambiente: O Encontro com a Floresta</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Rio Branco está situada em uma área de transição entre a floresta amazônica densa 
                              e as áreas mais abertas do cerrado, o que lhe confere uma paisagem única e 
                              diversificada. Com altitude média de 143 metros acima do nível do mar, a cidade 
                              possui um clima equatorial quente e úmido, com temperaturas médias variando entre 
                              22°C e 33°C ao longo do ano. A estação chuvosa ocorre entre outubro e março, 
                              enquanto o período mais seco vai de abril a setembro, características que definem 
                              o ritmo de vida na cidade.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              O rio Acare, principal curso d'água que banha a cidade, desempenha papel 
                              fundamental na vida dos riobranquenses. Além de ser fonte de lazer e subsistência 
                              para muitas comunidades, o rio serve como importante via de transporte e 
                              referência geográfica para a organização urbana. A cidade foi planejada considerando 
                              as características naturais do terreno, com avenidas largas e áreas verdes que 
                              buscam harmonizar o desenvolvimento urbano com a preservação ambiental.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A preocupação com o meio ambiente é uma marca de Rio Branco. A cidade possui 
                              diversos parques e áreas de preservação, como o Parque Ambiental Chico Mendes, 
                              que oferecem à população contato com a natureza e servem como laboratórios vivos 
                              para a educação ambiental. A arborização urbana é intensa, com diversas espécies 
                              de árvores nativas embelezando as ruas e contribuindo para a qualidade do ar. 
                              Esta relação harmoniosa com o meio ambiente é um dos atrativos da capital 
                              acreana, que busca conciliar desenvolvimento com sustentabilidade.
                            </p>

                            {/* Economia e Infraestrutura */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Economia e Infraestrutura: O Motor do Desenvolvimento Acreano</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A economia de Rio Branco é diversificada e dinâmica, refletindo o papel de capital 
                              e principal centro econômico do estado. O comércio e os serviços representam os 
                              setores mais importantes, empregando a maior parte da população e atendendo 
                              não apenas aos habitantes da cidade, mas também aos dos municípios vizinhos que 
                              buscam na capital produtos e serviços não disponíveis em suas localidades. 
                              O setor público também tem peso significativo na economia local, com a presença 
                              dos órgãos estaduais e federais que sediam suas principais instalações na cidade.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A agricultura e a pecuária, embora menos expressivas na economia urbana, 
                              desempenham papel importante na região metropolitana, com destaque para a 
                              produção de açaí, cupuaçu, mandioca e pecuária de corte. A indústria, ainda 
                              incipiente, concentra-se principalmente no beneficiamento de produtos agrícolas 
                              e na fabricação de materiais de construção para atender ao crescimento da 
                              construção civil impulsionado pela expansão urbana.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A infraestrutura de Rio Branco é uma das mais completas da região norte. O sistema 
                              de saúde conta com diversos hospitais, clínicas e postos de saúde, incluindo o 
                              Hospital das Clínicas, referência em todo o estado. Na educação, a cidade sedia 
                              a Universidade Federal do Acre (UFAC) e diversas instituições de ensino privado, 
                              atraindo estudantes de todo o estado e de regiões vizinhas. O sistema de transporte 
                              é composto por aeroporto internacional, terminal rodoviário e sistema de 
                              transporte coletivo urbano, facilitando a mobilidade dentro da cidade e a 
                              conexão com outras localidades.
                            </p>

                            {/* Cultura e Turismo */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultura e Turismo: A Identidade Acreana em Foco</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A cultura de Rio Branco é um mosaico das diversas influências que formaram o 
                              povo acreano: indígena, nordestina e de outras regiões brasileiras que 
                              migraram para o Acre em diferentes épocas. Esta diversidade se reflete na 
                              culinária, nas manifestações artísticas, nas festas populares e no modo de 
                              vida dos riobranquenses. A cidade preserva tradições como o Festival de 
                              Ciranda, realizado anualmente durante as festas juninas, e diversas 
                              celebrações indígenas que mostram a riqueza cultural dos povos originários.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              O turismo em Rio Branco tem crescido significativamente nos últimos anos, 
                              impulsionado pela busca por experiências autênticas na Amazônia. Entre os 
                              principais atrativos estão o Parque da Maternidade, área de lazer à beira 
                              do rio que concentra a vida social da cidade; o Museu da Borracha, que conta 
                              a história do ciclo econômico que definiu os destinos da região; e o 
                              Mercado Velho, espaço tradicional de comércio e encontro que preserva a 
                              arquitetura e o clima das primeiras décadas do século XX.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A vida cultural de Rio Branco é movimentada, com teatros, centros culturais, 
                              cinemas e uma agenda constante de eventos que inclui música, teatro, dança e 
                              exposições. A cidade tem investido na formação de artistas e na valorização 
                              da cultura local, criando programas de incentivo às artes e à preservação do 
                              patrimônio cultural material e imaterial. Esta vibrante cena cultural torna 
                              Rio Branco não apenas um centro administrativo e econômico, mas também um 
                              importante polo cultural da região amazônica.
                            </p>

                            {/* Desafios e Perspectivas */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Desafios e Perspectivas: O Futuro da Capital Acreana</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Como toda cidade amazônica em desenvolvimento, Rio Branco enfrenta desafios 
                              significativos que exigem atenção e planejamento. A urbanização acelerada 
                              dos últimos décadas trouxe problemas como a necessidade de ampliação da 
                              infraestrutura básica, a gestão adequada dos resíduos sólidos e a 
                              necessidade de preservação das áreas verdes frente à expansão urbana. 
                              A cidade também lida com questões sociais como a redução das desigualdades 
                              e a melhoria dos indicadores de educação e saúde para toda a população.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              As perspectivas para Rio Branco, no entanto, são promissoras. A cidade tem 
                              investido em tecnologia e inovação, com projetos de smart city que buscam 
                              melhorar a gestão urbana e a qualidade de vida dos habitantes. O potencial 
                              econômico em áreas como o ecoturismo, a bioeconomia e a tecnologia verde 
                              representa uma oportunidade para um desenvolvimento sustentável que pode 
                              posicionar Rio Branco como referência em economia verde na Amazônia.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A conexão com o mundo, simbolizada pelo DDD 68, é fundamental para este 
                              futuro. A infraestrutura de telecomunicações permite que Rio Branco 
                              participe da economia global, atraia investimentos e ofereça à população 
                              acesso às oportunidades do mundo digital. A capital do Acre está se 
                              preparando para ser uma cidade moderna, sustentável e inclusiva, capaz 
                              de oferecer qualidade de vida a seus habitantes e, ao mesmo tempo, 
                              preservar a riqueza natural e cultural que torna a Amazônia única.
                            </p>

                            {/* Conclusão */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rio Branco: Uma Capital em Constante Transformação</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Rio Branco é muito mais que uma capital estadual; é o coração pulsante 
                              do Acre, o centro que une e dá vida a todo o estado. Com pouco mais de 
                              um século de existência, a cidade já passou por diversas transformações, 
                              da vila seringueira à metrópole moderna que é hoje. Esta capacidade de 
                              reinvenção e adaptação é o que define o espírito riobranquense e 
                              acreano.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed font-semibold">
                              O DDD 68 é mais que um código telefônico - é a identidade de uma capital 
                              que olha para o futuro com confiança e determinação. Rio Branco convida a 
                              todos para conhecerem sua história, compartilharem seu presente e 
                              participarem da construção de seu futuro. Seja através de uma ligação 
                              telefônica ou de uma visita presencial, a capital do Acre está sempre 
                              conectada, sempre acolhedora e sempre pronta para surpreender com a 
                              beleza e a força da Amazônia.
                            </p>
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
                      <CardTitle>Localização de Rio Branco</CardTitle>
                      <CardDescription>
                        Veja onde fica a capital do Acre no mapa
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
                      <CardTitle>Operadoras em Rio Branco</CardTitle>
                      <CardDescription>
                        Principais operadoras de telefonia na capital do Acre
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-gray-800">
                          Rio Branco possui excelente cobertura de todas as principais operadoras brasileiras, 
                          sendo a cidade com melhor infraestrutura de telecomunicações do estado do Acre.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-red-600" />
                            </div>
                            <h4 className="font-semibold">Vivo</h4>
                          </div>
                          <p className="text-sm text-gray-600">Excelente cobertura em toda a cidade</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-semibold">Claro</h4>
                          </div>
                          <p className="text-sm text-gray-600">Boa cobertura na área urbana</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-green-600" />
                            </div>
                            <h4 className="font-semibold">TIM</h4>
                          </div>
                          <p className="text-sm text-gray-600">Rede consolidada na capital</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold">Oi</h4>
                          </div>
                          <p className="text-sm text-gray-600">Serviços disponíveis na cidade</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Dica:</h4>
                        <p className="text-sm text-gray-700">
                          Em Rio Branco, todas as operadoras funcionam bem. Escolha com base em promoções 
                          e no seu local de trabalho ou residência específico.
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
                        Informações importantes sobre o DDD 68 em Rio Branco
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-gray-800">
                          Rio Branco tem a melhor infraestrutura de telecomunicações do Acre, 
                          com sinal estável de todas as operadoras na maior parte da cidade.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Dicas para ligações:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Use sempre o DDD 68 para ligações interurbanas</li>
                            <li>• Salve contatos com código completo +55 68</li>
                            <li>• O sinal é melhor no centro e bairros desenvolvidos</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Emergências:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Polícia: 190</li>
                            <li>• Samu: 192</li>
                            <li>• Bombeiros: 193</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Curiosidade:</h4>
                        <p className="text-sm text-gray-700">
                          Rio Branco foi uma das primeiras cidades do Acre a ter sinal de 4G e 
                          já testa tecnologia 5G em algumas áreas da cidade.
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

  if (isCruzeiroDoSul) {
    // Design de plataforma moderna para Cruzeiro do Sul com conteúdo SEO otimizado
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
        <section className="bg-gradient-to-r from-purple-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                DDD 68 em Cruzeiro do Sul - AC
              </h1>
              <p className="text-xl text-purple-100 mb-6">
                A princesa do alto Juruá e seu código DDD para comunicações na região
              </p>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Phone className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">68</span>
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
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Especialista em Telecomunicações</h3>
                    <p className="text-gray-600 text-sm mb-4">Conhecimento profundo do interior do Acre</p>
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
                  <TabsTrigger value="sobre">Sobre Cruzeiro do Sul</TabsTrigger>
                  <TabsTrigger value="mapa">Mapa</TabsTrigger>
                  <TabsTrigger value="operadoras">Operadoras</TabsTrigger>
                  <TabsTrigger value="dicas">Dicas</TabsTrigger>
                </TabsList>

                {/* Tab 1: Informações */}
                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>DDD 68 em Cruzeiro do Sul</CardTitle>
                      <CardDescription>
                        Tudo que você precisa saber sobre o código DDD da princesa do alto Juruá
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                        <p className="text-gray-800">
                          O DDD de Cruzeiro do Sul é <strong>68</strong>, compartilhado com todo o estado do Acre. 
                          Como segunda maior cidade do estado, Cruzeiro do Sul é um importante centro regional 
                          no vale do rio Juruá.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Como ligar para Cruzeiro do Sul:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Do Brasil: 68 + número</li>
                            <li>• Do exterior: +55 68 + número</li>
                            <li>• Dentro da cidade: apenas o número</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Importante:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Todo o Acre usa DDD 68</li>
                            <li>• Principal cidade do alto Juruá</li>
                            <li>• Centro regional de saúde e educação</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Sobre Cruzeiro do Sul */}
                <TabsContent value="sobre" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre Cruzeiro do Sul</CardTitle>
                      <CardDescription>
                        Conheça a princesa do alto Juruá, sua história, cultura e importância regional
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        {/* Introdução */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cruzeiro do Sul: A Princesa do Alto Juruá</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Cruzeiro do Sul, carinhosamente conhecida como "A Princesa do Alto Juruá", 
                          é a segunda maior cidade do estado do Acre e um dos mais importantes centros 
                          urbanos da região amazônica ocidental. Fundada em 1904, esta cidade histórica 
                          localiza-se estratégicamente às margens do rio Juruá, um dos mais importantes 
                          cursos d'água da Amazônia, que tem sido ao longo dos séculos a principal via 
                          de acesso e sustento para a população local. Com aproximadamente 90.000 habitantes, 
                          Cruzeiro do Sul serve como centro regional para dezenas de comunidades ribeirinhas 
                          e vilarejos espalhados pela vasta bacia do Juruá, sendo um ponto essencial para 
                          a economia, saúde e educação de toda a região. O DDD 68 que identifica suas 
                          ligações telefônicas conecta esta cidade histórica não apenas com o restante do 
                          Brasil, mas com o mundo inteiro.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A cidade está situada a aproximadamente 640 quilômetros da capital Rio Branco, 
                          em uma região de exuberante beleza natural onde a floresta amazônica encontra 
                          as águas turvas e poderosas do rio Juruá. Esta localização remota conferiu a 
                          Cruzeiro do Sul um caráter único de cidade fronteiriça e isolada, que ao longo 
                          dos anos desenvolveu uma cultura própria e uma economia baseada na extração 
                          sustentável da floresta, na agricultura familiar e no comércio regional. 
                          A infraestrutura de telecomunicações, representada pelo código DDD 68, tem sido 
                          fundamental para romper o isolamento histórico da cidade, permitindo que seus 
                          habitantes tenham acesso aos serviços modernos de comunicação e se conectem 
                          com o resto do mundo.
                        </p>

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
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">A História de Cruzeiro do Sul: Das Missões à Modernidade</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A história de Cruzeiro do Sul remonta ao século XIX, quando a região era 
                              habitada exclusivamente por povos indígenas, principalmente da etnia 
                              Kaxinawá, que viviam ao longo das margens do rio Juruá. A presença 
                              não indígena começou com os seringueiros que adentraram a região durante 
                              o ciclo da borracha, mas foi a instalação de missões religiosas que 
                              efetivamente estabeleceu um povoamento permanente. Em 1892, os missionários 
                              franciscanos fundaram a Missão de Cruzeiro do Sul, que daria origem à cidade, 
                              com o objetivo de catequizar os povos indígenas e criar um ponto de 
                              civilização no coração da floresta.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A fundação oficial da cidade ocorreu em 28 de setembro de 1904, quando 
                              o então território do Acre pertencia ainda à Bolívia. Durante a Revolução 
                              Acreana, Cruzeiro do Sul desempenhou um papel estratégico como base 
                              para as forças revolucionárias que lutavam pela anexação do território 
                              ao Brasil. Com a vitória da revolução e a integração do Acre ao Brasil, 
                              a cidade começou a se desenvolver como centro administrativo e comercial 
                              da região do alto Juruá. A construção de fortificações militares na 
                              década de 1910 reforçou a importância estratégica da cidade na defesa 
                              das fronteiras brasileiras.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              Ao longo do século XX, Cruzeiro do Sul enfrentou os desafios do isolamento 
                              geográfico e das dificuldades de acesso, mantendo-se como um importante 
                              posto avançado na Amazônia ocidental. A chegada da aviação comercial na 
                              década de 1950 e a construção da BR-364, mesmo que incompleta até hoje, 
                              trouxeram novos ares de desenvolvimento à cidade. Nas últimas décadas, 
                              Cruzeiro do Sul tem se consolidado como um centro regional de referência 
                              em saúde, com um hospital que atende a toda a região do Juruá, e em 
                              educação, sediando um campus da Universidade Federal do Acre. A modernização 
                              das telecomunicações, simbolizada pelo DDD 68, tem sido fundamental para 
                              esta nova fase de desenvolvimento.
                            </p>

                            {/* Geografia e Meio Ambiente */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Geografia e Meio Ambiente: O Coração do Vale do Juruá</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Cruzeiro do Sul está localizada em uma das regiões mais preservadas da 
                              Amazônia brasileira, inserida no bioma da floresta ombrófila densa. 
                              Com altitude de aproximadamente 190 metros acima do nível do mar, a cidade 
                              possui um clima equatorial úmido, com temperaturas médias que variam entre 
                              20°C e 35°C ao longo do ano. A estação chuvosa é mais intensa entre 
                              dezembro e maio, período em que o rio Juruá transborda e inunda grandes 
                              áreas da várzea, enquanto o período mais seco vai de junho a novembro, 
                              quando as águas baixam e revelam as praias fluviais que são um dos 
                              principais atrativos turísticos da região.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              O rio Juruá é o elemento geográfico mais importante da região, não apenas 
                              como via de transporte e comunicação, mas como fonte de vida para as 
                              populações ribeirinhas. Com mais de 3.000 quilômetros de extensão, o 
                              Juruá nasce no Peru e atravessa todo o oeste do Acre antes de desaguar 
                              no rio Solimões. Em Cruzeiro do Sul, o rio atinge sua largura máxima, 
                              formando um verdadeiro mar interior que durante séculos foi a única 
                              ligação da cidade com o resto do mundo. A cidade cresceu às margens 
                              deste gigantesco curso d'água, adaptando-se às suas cheias e vazantes 
                              e desenvolvendo uma cultura única de convivência com as águas.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A região de Cruzeiro do Sul é parte do Corredor Ecológico da Amazônia, 
                              uma das áreas de maior biodiversidade do planeta. A floresta ao redor 
                              da cidade abriga milhares de espécies de plantas e animais, muitos deles 
                              ainda não catalogados pela ciência. A presença de unidades de 
                              conservação como o Parque Nacional da Serra do Divisor e a Reserva 
                              Extrativista do Alto Juruá protege este patrimônio natural e garante 
                              a sobrevivência das populações tradicionais que dependem dos recursos 
                              da floresta. Esta riqueza ambiental tem sido a base para o 
                              desenvolvimento de modelos econômicos sustentáveis que conciliam 
                              conservação e geração de renda para a população local.
                            </p>

                            {/* Economia e Infraestrutura */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Economia e Infraestrutura: O Desenvolvimento na Fronteira</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A economia de Cruzeiro do Sul é baseada principalmente no setor de 
                              serviços, que emprega a maior parte da população urbana, e nas 
                              atividades extrativistas sustentáveis praticadas pelas populações 
                              rurais e ribeirinhas. O comércio local é movido pela demanda da 
                              própria cidade e das dezenas de comunidades que dependem de Cruzeiro 
                              do Sul como centro de abastecimento. O setor público também tem 
                              peso significativo na economia, com a presença de órgãos estaduais 
                              e federais que mantêm suas sedes regionais na cidade.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              As atividades produtivas da região incluem a extração de produtos 
                              florestais não madeireiros como o açaí, a castanha-do-brasil e 
                              óleos vegetais, que são comercializados tanto no mercado local quanto 
                              exportados para outros estados e países. A agricultura familiar, 
                              concentrada principalmente na produção de mandioca, milho e feijão, 
                              garante a segurança alimentar das populações rurais e gera excedentes 
                              que são comercializados na feira livre da cidade. A pecuária de corte, 
                              ainda que em menor escala, tem crescido nos últimos anos como 
                              alternativa econômica para os produtores rurais.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A infraestrutura de Cruzeiro do Sul é um desafio constante devido à 
                              localização remota da cidade. O sistema de saúde conta com o Hospital 
                              Regional do Juruá, referência em toda a região, que oferece serviços 
                              de média e alta complexidade e atende pacientes de dezenas de 
                              municípios. Na educação, além do campus da UFAC, a cidade possui 
                              escolas técnicas e unidades do Instituto Federal do Acre, formando 
                              profissionais para atender às demandas regionais. O transporte é 
                              baseado principalmente no modo aéreo, com o Aeroporto Internacional 
                              de Cruzeiro do Sul, e no modo fluvial, através do rio Juruá. A 
                              ligação rodoviária com o resto do estado ainda é precária, com a 
                              BR-364 apresentando trechos não pavimentados que tornam a viagem 
                              difícil durante o período chuvoso.
                            </p>

                            {/* Cultura e Turismo */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultura e Turismo: As Raízes do Alto Juruá</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              A cultura de Cruzeiro do Sul é um fascinante mosaico de influências 
                              indígenas, nordestinas e de outras regiões brasileiras que migraram 
                              para a área em diferentes épocas históricas. Os povos indígenas, 
                              especialmente os Kaxinawá, mantêm vivas suas tradições, línguas e 
                              práticas culturais que influenciam profundamente a identidade 
                              cultural da cidade. A culinária local, por exemplo, incorpora 
                              elementos da floresta como peixes do rio Juruá, frutas nativas e 
                              técnicas de preparo que misturam o conhecimento indígena com as 
                              influências trazidas pelos migrantes.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              As manifestações culturais de Cruzeiro do Sul refletem esta diversidade. 
                              O Festival da Canção de Cruzeiro do Sul, realizado anualmente, 
                              reúne artistas locais e regionais e celebra a riqueza musical da 
                              Amazônia. As festas tradicionais como o Círio de Nossa Senhora 
                              de Fátima, padroeira da cidade, mobilizam toda a comunidade em 
                              procissões e celebrações que misturam elementos religiosos 
                              católicos com tradições populares. O artesanato local, produzido 
                              principalmente por artesãos indígenas, utiliza materiais da 
                              floresta como sementes, fibras e madeiras para criar peças únicas 
                              que são comercializadas no mercado local e para turistas.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              O turismo em Cruzeiro do Sul tem potencial enorme, baseado principalmente 
                              no ecoturismo e no turismo cultural. A cidade serve como porta de 
                              entrada para o Parque Nacional da Serra do Divisor, uma das mais 
                              importantes unidades de conservação da Amazônia, que abriga uma 
                              biodiversidade exuberante e paisagens de tirar o fôlego. As praias 
                              fluviais do rio Juruá, que se formam durante o período seco, são 
                              outro atrativo importante, oferecendo lazer e contato com a natureza 
                              para a população local e visitantes. O turismo de base comunitária, 
                              desenvolvido em parceria com as populações indígenas e ribeirinhas, 
                              permite aos visitantes vivenciar a cultura local e conhecer as 
                              tradições que se mantêm há séculos na região.
                            </p>

                            {/* Desafios e Perspectivas */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Desafios e Perspectivas: O Futuro da Fronteira</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Cruzeiro do Sul enfrenta desafios significativos que são comuns às 
                              cidades de fronteira na Amazônia. O isolamento geográfico, 
                              embora atenuado pelas telecomunicações representadas pelo DDD 68, 
                              ainda é um obstáculo ao desenvolvimento pleno da cidade. A precariedade 
                              das vias de acesso terrestre encarece o transporte de mercadorias 
                              e dificulta a integração econômica com o restante do estado e do país. 
                              A cidade também lida com questões sociais como a necessidade de 
                              melhorias nos serviços de saúde e educação para atender uma população 
                              dispersa por uma vasta região geográfica.
                            </p>

                            <p className="mb-4 text-gray-700 leading-relaxed">
                              As perspectivas para Cruzeiro do Sul, no entanto, são promissoras. 
                              A cidade tem potencial para se tornar um centro de referência em 
                              economia verde e bioeconomia, aproveitando a riqueza da floresta 
                              em pé para gerar renda e desenvolvimento sustentável. A conclusão 
                              da pavimentação da BR-364, projeto constante das reivindicações 
                              locais, representaria um salto de desenvolvimento para a cidade e 
                              toda a região do alto Juruá. O fortalecimento do turismo de base 
                              comunitária e a valorização dos produtos da floresta também são 
                              caminhos promissores para o futuro da cidade.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed">
                              A tecnologia e a conectividade, simbolizadas pelo acesso às 
                              telecomunicações através do DDD 68, são fundamentais para este 
                              futuro. A possibilidade de conectar a cidade com o mundo digital 
                              abre novas oportunidades para educação, saúde, comércio e 
                              prestação de serviços. Cruzeiro do Sul tem a chance de se tornar 
                              um modelo de desenvolvimento sustentável na Amazônia, conciliando 
                              conservação ambiental, desenvolvimento econômico e melhoria da 
                              qualidade de vida para sua população.
                            </p>

                            {/* Conclusão */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cruzeiro do Sul: Uma Cidade que Resiste e Prospera</h3>
                            
                            <p className="mb-4 text-gray-700 leading-relaxed">
                              Cruzeiro do Sul é muito mais que uma cidade no extremo oeste do Brasil; 
                              é um símbolo da resiliência do povo acreano e da capacidade humana 
                              de construir comunidades prósperas mesmo nos lugares mais remotos. 
                              Com mais de um século de história, a cidade já superou inúmeros 
                              desafios, desde o isolamento total até a integração gradual com 
                              o resto do país. Esta capacidade de adaptação e superação é o 
                              que define o espírito da gente de Cruzeiro do Sul.
                            </p>

                            <p className="mb-6 text-gray-700 leading-relaxed font-semibold">
                              O DDD 68 é mais que um código telefônico - é o fio que conecta 
                              esta cidade histórica com o mundo moderno, permitindo que a princesa 
                              do alto Juruá participe do desenvolvimento global sem perder sua 
                              identidade única. Cruzeiro do Sul convida a todos para conhecerem 
                              sua história, compartilharem sua cultura e participarem da 
                              construção de um futuro sustentável para a Amazônia. Seja através 
                              de uma ligação telefônica ou de uma visita presencial, esta cidade 
                              encantadora está sempre pronta para receber com a hospitalidade 
                              que caracteriza o povo do alto Juruá.
                            </p>
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
                      <CardTitle>Localização de Cruzeiro do Sul</CardTitle>
                      <CardDescription>
                        Veja onde fica a princesa do alto Juruá no mapa
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
                      <CardTitle>Operadoras em Cruzeiro do Sul</CardTitle>
                      <CardDescription>
                        Principais operadoras de telefonia na cidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                        <p className="text-gray-800">
                          Cruzeiro do Sul possui boa cobertura das principais operadoras, 
                          com algumas limitações em áreas mais distantes do centro urbano.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-red-600" />
                            </div>
                            <h4 className="font-semibold">Vivo</h4>
                          </div>
                          <p className="text-sm text-gray-600">Boa cobertura na área urbana</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-semibold">Claro</h4>
                          </div>
                          <p className="text-sm text-gray-600">Cobertura razoável na cidade</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-green-600" />
                            </div>
                            <h4 className="font-semibold">TIM</h4>
                          </div>
                          <p className="text-sm text-gray-600">Sinal estável no centro</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold">Oi</h4>
                          </div>
                          <p className="text-sm text-gray-600">Serviços básicos disponíveis</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Dica:</h4>
                        <p className="text-sm text-gray-700">
                          Devido à localização remota, o sinal pode variar. Verifique com 
                          moradores locais qual operadora funciona melhor na sua área específica.
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
                        Informações importantes sobre o DDD 68 em Cruzeiro do Sul
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                        <p className="text-gray-800">
                          Em Cruzeiro do Sul, o acesso à internet pode ser limitado em algumas áreas. 
                          O DDD 68 é essencial para todas as comunicações com o resto do Brasil.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Dicas para ligações:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Use sempre o DDD 68 para ligações interurbanas</li>
                            <li>• Pacotes de dados podem ser limitados</li>
                            <li>• O sinal é melhor no centro da cidade</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Emergências:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Polícia: 190</li>
                            <li>• Samu: 192</li>
                            <li>• Bombeiros: 193</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Curiosidade:</h4>
                        <p className="text-sm text-gray-700">
                          Cruzeiro do Sul é uma das cidades mais antigas do Acre e 
                          um importante centro regional para as populações do alto Juruá.
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

  if (isAcrelandia) {
    // Design de plataforma moderna para Acrelândia
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                DDD 68 em Acrelândia - AC
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Informações completas sobre o código DDD da sua cidade
              </p>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Phone className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">68</span>
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
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Equipe Meu DDD</h3>
                    <p className="text-gray-600 text-sm mb-4">Especialistas em telecomunicações</p>
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
                  <TabsTrigger value="sobre">Sobre Acrelândia</TabsTrigger>
                  <TabsTrigger value="mapa">Mapa</TabsTrigger>
                  <TabsTrigger value="operadoras">Operadoras</TabsTrigger>
                  <TabsTrigger value="dicas">Dicas</TabsTrigger>
                </TabsList>

                {/* Tab 1: Informações */}
                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>DDD 68 em Acrelândia</CardTitle>
                      <CardDescription>
                        Tudo que você precisa saber sobre o código DDD da sua cidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-gray-800">
                          O DDD de Acrelândia é <strong>68</strong>, o mesmo código utilizado em todo o estado do Acre. 
                          Este código é essencial para fazer ligações de longa distância para a cidade.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Como ligar para Acrelândia:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Do Brasil: 68 + número</li>
                            <li>• Do exterior: +55 68 + número</li>
                            <li>• Dentro da cidade: apenas o número</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Importante:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Todo o Acre usa DDD 68</li>
                            <li>• Código obrigatório para ligações interurbanas</li>
                            <li>• Mesmo código para fixo e móvel</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Sobre Acrelândia */}
                <TabsContent value="sobre" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre Acrelândia</CardTitle>
                      <CardDescription>
                        Conheça tudo sobre a cidade, sua história, cultura e importância no Acre
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        {/* Introdução */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acrelândia: O Coração do Desenvolvimento do Acre</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Localizada no estratégico <Link href="/estado/acre" className="text-blue-600 hover:text-blue-800 underline">estado do Acre</Link>, 
                          Acrelândia emerge como um dos mais importantes polos de desenvolvimento da região Norte do Brasil. 
                          Fundada em 1992, esta cidade jovem e vibrante tem se destacado como um centro econômico, social e 
                          cultural que representa o espírito resiliente e empreendedor do povo acreano. Com uma população 
                          aproximada de 15.000 habitantes, Acrelândia desafia as estatísticas e se posiciona como um exemplo 
                          de como o planejamento urbano e a iniciativa privada podem transformar uma pequena comunidade em um 
                          referencial de progresso na Amazônia. 
                          <Link href="/estado/acre/cidade/rio-branco" className="text-blue-600 hover:text-blue-800 underline">Rio Branco</Link> e 
                          <Link href="/estado/acre/cidade/cruzeiro-do-sul" className="text-blue-600 hover:text-blue-800 underline">Cruzeiro do Sul</Link> 
                          são outras cidades importantes que também compartilham o mesmo desenvolvimento do estado. 
                          Utilize nosso <Link href="/gerador-numeros" className="text-blue-600 hover:text-blue-800 underline">gerador de números</Link> 
                          para criar telefones com DDD 68.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Situada a aproximadamente 180 quilômetros da capital <Link href="/estado/acre/cidade/rio-branco" className="text-blue-600 hover:text-blue-800 underline">Rio Branco</Link>, 
                          Acrelândia beneficia-se de sua privilegiada localização às margens da BR-364, a principal via de 
                          escoamento da produção e integração do Acre com o restante do Brasil. Esta posição geográfica 
                          estratégica tem sido fundamental para o desenvolvimento da cidade, atraindo investimentos e promovendo 
                          um fluxo constante de pessoas e mercadorias que impulsionam a economia local. O DDD 68, compartilhado 
                          com todo o estado, simboliza esta integração e conecta Acrelândia com o mundo. 
                          Confira no <a href="https://www.google.com/maps/search/Acrelândia,+Acre" target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 underline">Google Maps</a> a localização exata da cidade e 
                          visite o site do <a href="https://www.ac.gov.br/" target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 underline">governo do Acre</a> para mais informações. 
                          Use nosso <Link href="/validar-ddd" className="text-blue-600 hover:text-blue-800 underline">validador DDD</Link> 
                          para verificar números de telefone.
                        </p>

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
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">A História de Acrelândia: Das Raízes à Modernidade</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A história de <a href="https://pt.wikipedia.org/wiki/Acrelândia" target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 underline">Acrelândia</a> é um fascinante relato de transformação e progresso. Embora sua 
                          fundação oficial date de 1992, as terras que hoje constituem o município têm uma história 
                          muito mais antiga, ligada aos povos indígenas que habitavam a região e aos seringueiros que 
                          desbravaram a floresta durante o ciclo da borracha. A criação do município representou o 
                          reconhecimento do crescimento da comunidade e sua importância para o desenvolvimento do 
                          <Link href="/estado/acre" className="text-blue-600 hover:text-blue-800 underline">estado do Acre</Link>.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O nome "Acrelândia" carrega em si a identidade do estado e o sonho de seus fundadores de 
                          construir uma terra próspera e acolhedora. Durante seus primeiros anos, a cidade enfrentou 
                          os desafios típicos das comunidades amazônicas: isolamento geográfico, dificuldades de 
                          acesso e limitações de infraestrutura. No entanto, a determinação de seus habitantes e a 
                          visão de lideranças comprometidas com o progresso transformaram obstáculos em oportunidades. 
                          A <a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 underline">Anatel</a> regula as telecomunicações que hoje conectam a cidade. 
                          Experimente nossa <Link href="/busca-por-voz" className="text-blue-600 hover:text-blue-800 underline">busca por voz</Link> 
                          para encontrar informações sobre cidades.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A chegada do asfalto à BR-364 na década de 2000 marcou um ponto de inflexão na história de 
                          Acrelândia. Esta importante via de integração nacional não apenas conectou a cidade com o 
                          restante do Brasil, mas também abriu novas perspectivas econômicas e sociais. A partir de 
                          então, Acrelândia começou a atrair empresas, investimentos e novos moradores, 
                          consolidando-se como um dos municípios mais dinâmicos do Acre. 
                          <Link href="/estado/acre/cidade/feijo" className="text-blue-600 hover:text-blue-800 underline">Feijó</Link> e 
                          <Link href="/estado/acre/cidade/sena-madureira" className="text-blue-600 hover:text-blue-800 underline">Sena Madureira</Link> 
                          são outras cidades que também se beneficiaram do desenvolvimento da região. 
                          Conheça outros <Link href="/estados" className="text-blue-600 hover:text-blue-800 underline">estados brasileiros</Link> 
                          em nosso guia completo.
                        </p>

                        {/* Geografia e Meio Ambiente */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Geografia e Meio Ambiente: A Beleza da Amazônia</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Com uma área territorial de aproximadamente 1.575 km², Acrelândia possui uma geografia 
                          diversificada que combina a exuberância da floresta amazônica com áreas de cerrado e 
                          formações vegetais típicas da região. O município está inserido na bacia hidrográfica do 
                          Rio Acre, que banha suas terras e proporciona recursos naturais essenciais para a 
                          sobrevivência e desenvolvimento das atividades econômicas locais.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O clima de Acrelândia é equatorial úmido, com temperaturas médias anuais variando entre 
                          24°C e 32°C. A estação chuvosa ocorre geralmente entre os meses de outubro a abril, 
                          enquanto o período seco estende-se de maio a setembro. Este padrão climático influencia 
                          diretamente as atividades agrícolas e o cotidiano da população, que se adapta às 
                          características naturais da região.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A preservação ambiental é uma preocupação crescente em Acrelândia. O município tem 
                          implementado políticas de desenvolvimento sustentável que buscam conciliar o crescimento 
                          econômico com a conservação da floresta e dos recursos naturais. Iniciativas de 
                          reflorestamento, educação ambiental e fomento a práticas sustentáveis demonstram o 
                          compromisso da cidade com um futuro mais verde e equilibrado.
                        </p>

                        {/* Economia */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Economia: O Motor do Desenvolvimento Regional</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A economia de Acrelândia é diversificada e dinâmica, refletindo o espírito empreendedor 
                          de sua população. A agricultura representa um dos pilares econômicos do município, com 
                          destaque para o cultivo de grãos, especialmente soja e milho, além da pecuária de corte 
                          e leite. A proximidade com a BR-364 facilita o escoamento da produção para outros estados 
                          e até mesmo para o exterior, posicionando Acrelândia como um importante produtor agrícola 
                          da região.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O comércio local é outro setor em franca expansão. A cidade possui um centro comercial 
                          movimentado, com estabelecimentos variados que atendem tanto à população local quanto 
                          aos viajantes que passam pela BR-364. O comércio varejista, supermercados, farmácias, 
                          lojas de materiais de construção e confecções formam um tecido econômico robusto que gera 
                          empregos e movimenta a economia municipal.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Nos últimos anos, Acrelândia tem se destacado também como um centro de serviços e 
                          logística. A instalação de empresas de transporte, armazenagem e distribuição tem 
                          transformado a cidade em um importante hub logístico para o estado. Esta vocação 
                          logística é potencializada pela localização estratégica do município e pela 
                          modernização constante da infraestrutura local.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          O setor público também desempenha papel relevante na economia acrelandense, sendo 
                          responsável pela geração de empregos formais e pela implementação de políticas 
                          públicas que melhoram a qualidade de vida da população. Investimentos em saúde, 
                          educação, infraestrutura e segurança têm sido prioridade para as administrações 
                          municipais, que reconhecem a importância do desenvolvimento social para o 
                          crescimento econômico sustentável.
                        </p>

                        {/* Cultura e Turismo */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultura e Turismo: As Riquezas de Acrelândia</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A cultura de Acrelândia é um mosaico de influências que refletem a diversidade do 
                          povo acreano. As tradições indígenas, os costumes dos seringueiros e as influências 
                          de migrantes de outras regiões do Brasil se fundem para criar uma identidade cultural 
                          única e vibrante. Esta riqueza cultural se expressa através da música, dança, culinária, 
                          artesanato e nas diversas manifestações populares que ocorrem ao longo do ano.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A culinária acrelandense merece destaque especial, pois combina sabores da Amazônia 
                          com influências de outras regiões brasileiras. Pratos à base de peixes da região, 
                          como o tambaqui e o pirarucu, dividem espaço com carnes de caça, frutas nativas e 
                          especiarias que dão um toque especial à gastronomia local. Restaurantes e bares da 
                          cidade oferecem tanto a culinária tradicional quanto pratos contemporâneos, 
                          atendendo aos mais diversos paladares.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O turismo em Acrelândia tem crescido significativamente nos últimos anos. A cidade 
                          oferece atrações que vão desde o contato com a natureza exuberante até 
                          experiências culturais autênticas. Os visitantes podem explorar trilhas na floresta, 
                          conhecer comunidades ribeirinhas, participar de festivais tradicionais e desfrutar da 
                          hospitalidade característica do povo acreano. O ecoturismo emerge como uma 
                          atividade promissora, valorizando a conservação ambiental e gerando renda para 
                          a comunidade local.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          As festas tradicionais de Acrelândia são momentos de grande confraternização e 
                          celebração da cultura local. O aniversário da cidade, realizado em abril, reúne 
                          milhares de pessoas em uma programação que inclui shows, apresentações culturais, 
                          feiras de artesanato e gastronomia. Outras celebrações, como as festas juninas e 
                          o Carnaval, também mobilizam a comunidade e atraem visitantes de toda a região.
                        </p>

                        {/* Infraestrutura e Serviços */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Infraestrutura e Serviços: Qualidade de Vida em Crescimento</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A infraestrutura de Acrelândia tem acompanhado o crescimento do município, com 
                          investimentos contínuos em áreas essenciais para o desenvolvimento urbano. O sistema 
                          de abastecimento de água atende a grande parte da população, enquanto a coleta de 
                          esgoto tem se expandido gradualmente, melhorando as condições sanitárias da cidade. 
                          A energia elétrica chega a praticamente todos os domicílios, incluindo as áreas 
                          rurais, através de programas de universalização.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Na área da saúde, Acrelândia conta com um hospital municipal, unidades básicas de 
                          saúde, postos de atendimento e um programa de saúde da família que busca levar 
                          assistência médica a todos os cantos do município. A cidade também dispõe de 
                          farmácias, clínicas particulares e laboratórios, complementando a rede de serviços 
                          de saúde disponíveis à população.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A educação é outra área que tem recebido atenção especial. A rede municipal de 
                          ensino conta com escolas bem estruturadas, que oferecem educação infantil, ensino 
                          fundamental e médio. Além disso, Acrelândia dispõe de escolas estaduais e 
                          particulares, ampliando as opções educacionais para as famílias. A cidade também 
                          tem investido em educação profissional e tecnológica, preparando os jovens para 
                          os desafios do mercado de trabalho contemporâneo.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A infraestrutura de comunicação em Acrelândia é moderna e eficiente. O DDD 68 
                          conecta a cidade com o Brasil e o mundo, através de uma rede de telefonia fixa e 
                          móvel que oferece boa qualidade de sinal na maior parte do município. A internet 
                          banda larga está disponível tanto na zona urbana quanto em muitas áreas rurais, 
                          facilitando o acesso à informação e a integração digital da comunidade.
                        </p>

                        {/* Desafios e Perspectivas */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Desafios e Perspectivas: O Futuro de Acrelândia</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Como toda cidade em desenvolvimento, Acrelândia enfrenta desafios que precisam ser 
                          superados para consolidar seu crescimento e garantir qualidade de vida à sua 
                          população. A manutenção do equilíbrio entre desenvolvimento econômico e 
                          preservação ambiental é um dos principais desafios, exigindo políticas públicas 
                          inovadoras e a participação consciente da comunidade.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A geração de empregos formais e a diversificação da economia são outros desafios 
                          importantes. A cidade precisa continuar atraindo investimentos e criando 
                          oportunidades para seus jovens, evitando o êxodo populacional que historicamente 
                          afeta muitas cidades do interior. A qualificação profissional e o apoio ao 
                          empreendedorismo são estratégias essenciais para enfrentar este desafio.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          As perspectivas para o futuro de Acrelândia são, no entanto, bastante 
                          promissoras. A localização estratégica, a base econômica diversificada, a 
                          população jovem e dinâmica e o espírito inovador que caracteriza a cidade são 
                          ativos valiosos que apontam para um futuro de prosperidade. Projetos de 
                          infraestrutura em andamento, como a melhoria da BR-364 e a expansão dos 
                          serviços de telecomunicações, devem trazer ainda mais desenvolvimento para 
                          o município.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A visão de futuro para Acrelândia inclui uma cidade mais sustentável, 
                          tecnologicamente avançada, socialmente justa e economicamente próspera. Este 
                          sonho compartilhado por seus habitantes tem impulsionado ações concretas que 
                          estão transformando Acrelândia em um modelo de desenvolvimento para a região 
                          amazônica. O DDD 68, mais do que um simples código telefônico, tornou-se 
                          o símbolo desta conexão entre o presente e o futuro, entre a tradição e a 
                          modernidade, entre Acrelândia e o mundo.
                        </p>

                        {/* Conclusão */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Acrelândia: Uma Cidade que Inspira</h3>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Ao percorrer as páginas da história de Acrelândia, mergulhar em sua cultura, 
                          compreender sua economia e vislumbrar seu futuro, fica evidente que esta cidade 
                          é muito mais do que um simples ponto no mapa do Acre. Acrelândia representa o 
                          potencial transformador da Amazônia, a capacidade humana de superar desafios 
                          e a esperança de um futuro melhor para as novas gerações.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Com seu DDD 68, Acrelândia se conecta com o Brasil e o mundo, mas mantém 
                          sua identidade única, sua cultura vibrante e seu espírito comunitário. A cidade 
                          tem demonstrado que é possível conciliar desenvolvimento com sustentabilidade, 
                          progresso econômico com justiça social e tradição com inovação. Este equilíbrio 
                          delicado é o grande trunfo de Acrelândia e a base sobre a qual se constrói seu 
                          futuro promissor.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Para quem visita ou decide fazer de Acrelândia sua casa, a cidade oferece mais 
                          do que infraestrutura e oportunidades econômicas. Oferece qualidade de vida, 
                          segurança, uma comunidade acolhedora e a perspectiva de participar ativamente 
                          de um projeto de desenvolvimento coletivo. Acrelândia não é apenas uma cidade 
                          em crescimento; é um sonho em construção, uma história sendo escrita a cada 
                          dia por seus habitantes, e um exemplo de como a Amazônia pode ser desenvolvida 
                          de forma sustentável e próspera.
                        </p>

                        <p className="text-gray-700 leading-relaxed font-semibold">
                          O DDD 68 é mais do que um código telefônico - é a identidade de uma cidade que 
                          olha para o futuro com otimismo e determinação. Acrelândia convida a todos 
                          para conhecerem sua história, compartilharem seu presente e participarem da 
                          construção de seu futuro. Seja através de uma ligação telefônica ou de uma visita 
                          presencial, Acrelândia está sempre conectada, sempre acolhedora e sempre 
                          pronta para surpreender.
                        </p>
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
                      <CardTitle>Localização de Acrelândia</CardTitle>
                      <CardDescription>
                        Mapa interativo da cidade e região
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

                {/* Tab 3: Operadoras */}
                <TabsContent value="operadoras" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Operadoras em Acrelândia</CardTitle>
                      <CardDescription>
                        Principais operadoras de telefonia na cidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-red-600" />
                            </div>
                            <h4 className="font-semibold">Vivo</h4>
                          </div>
                          <p className="text-sm text-gray-600">Sinal forte na cidade e na BR-364</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-semibold">Claro</h4>
                          </div>
                          <p className="text-sm text-gray-600">Boa cobertura na área urbana</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-green-600" />
                            </div>
                            <h4 className="font-semibold">TIM</h4>
                          </div>
                          <p className="text-sm text-gray-600">Rede em expansão na região</p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold">Oi</h4>
                          </div>
                          <p className="text-sm text-gray-600">Serviços disponíveis na cidade</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Dica:</h4>
                        <p className="text-sm text-gray-700">
                          Se você vem de fora, teste as operadoras antes de fechar contrato. 
                          Pergunte aos moradores locais qual funciona melhor na sua região.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 4: Dicas */}
                <TabsContent value="dicas" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dicas Úteis</CardTitle>
                      <CardDescription>
                        Informações importantes sobre o DDD 68
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <h4 className="font-semibold mb-2">Como salvar no celular:</h4>
                        <p className="text-sm text-gray-700">
                          Salve os números com o formato completo: +55 68 XXXXX-XXXX. 
                          Assim seu celular funciona em qualquer lugar do mundo.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <h4 className="font-semibold mb-2">Emergências:</h4>
                        <p className="text-sm text-gray-700">
                          Lembre dos números locais: 190 (Polícia), 192 (Ambulância), 
                          193 (Bombeiros). Funcionam sem DDD dentro da cidade.
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                        <h4 className="font-semibold mb-2">Qualidade do sinal:</h4>
                        <p className="text-sm text-gray-700">
                          Na área urbana de Acrelândia o sinal é geralmente bom. 
                          Na zona rural, verifique a cobertura antes de escolher a operadora.
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                        <h4 className="font-semibold mb-2">Para negócios:</h4>
                        <p className="text-sm text-gray-700">
                          Use o DDD 68 em toda sua comunicação para reforçar sua 
                          identidade local e facilitar o contato com clientes.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2024 Meu DDD. Informações sobre códigos DDD do Brasil.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Layout padrão para outras cidades (design de plataforma)
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              DDD {dddCode} em {city.name} - {city.state.code}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Informações completas sobre o código DDD da sua cidade
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
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Equipe Meu DDD</h3>
                  <p className="text-gray-600 text-sm mb-4">Especialistas em telecomunicações</p>
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
                      Tudo que você precisa saber sobre o código DDD da sua cidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <p className="text-gray-800">
                        O DDD de {city.name} é <strong>{dddCode}</strong>, o mesmo código utilizado em todo o estado do {city.state.name}. 
                        Este código é essencial para fazer ligações de longa distância para a cidade.
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
                          <li>• Todo o {city.state.name} usa DDD {dddCode}</li>
                          <li>• Código obrigatório para ligações interurbanas</li>
                          <li>• Mesmo código para fixo e móvel</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Sobre {city.name} */}
              <TabsContent value="sobre" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre {city.name}</CardTitle>
                    <CardDescription>
                      Conheça tudo sobre a cidade, sua história, cultura e importância no {city.state.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      {/* Introdução */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{city.name}: A Identidade do {city.state.name}</h2>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        Localizada no estado do {city.state.name}, {city.name} emerge como um importante 
                        centro urbano que representa a riqueza cultural e o potencial econômico da região. 
                        Esta cidade {city.isCapital ? 'capital' : 'do interior'} tem se destacado como um 
                        polo de desenvolvimento essencial para o crescimento do estado, combinando 
                        tradição e modernidade em sua trajetória histórica.
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        {city.name} beneficia-se de sua localização estratégica no {city.state.name}, 
                        atraindo investimentos e promovendo o desenvolvimento regional. O DDD {dddCode}, 
                        compartilhado com outras cidades do estado, simboliza esta integração e conecta 
                        {city.name} com o Brasil e o mundo, facilitando comunicações e negócios.
                      </p>

                      {/* História */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">A História de {city.name}</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        A história de {city.name} é um relato fascinante de desenvolvimento e progresso. 
                        Desde seus primórdios, a cidade tem enfrentado desafios típicos da região, 
                        transformando-os em oportunidades de crescimento. A fundação do município representou 
                        o reconhecimento da importância desta comunidade para o desenvolvimento do estado.
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        Ao longo dos anos, {city.name} tem demonstrado resiliência e capacidade de adaptação, 
                        superando obstáculos e consolidando-se como um dos principais centros urbanos do {city.state.name}. 
                        Esta trajetória de sucesso é resultado do trabalho conjunto de sua população e da 
                        visão estratégica de suas lideranças.
                      </p>

                      {/* Geografia e Meio Ambiente */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Geografia e Meio Ambiente</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        {city.area ? (
                          <>
                            Com uma área territorial de aproximadamente {formatArea(city.area)}, {city.name} possui uma geografia 
                            diversificada que contribui para sua riqueza natural e econômica. O município está inserido 
                            em uma região de grande importância ecológica, com recursos naturais que sustentam as 
                            atividades econômicas locais.
                          </>
                        ) : (
                          <>
                            {city.name} possui uma geografia privilegiada que combina elementos naturais 
                            favoráveis ao desenvolvimento urbano e econômico. A localização estratégica do município 
                            tem sido fundamental para seu crescimento e integração regional.
                          </>
                        )}
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        A preservação ambiental é uma preocupação constante em {city.name}. O município tem 
                        implementado políticas de desenvolvimento sustentável que buscam conciliar o crescimento 
                        econômico com a conservação do meio ambiente, garantindo um futuro equilibrado para 
                        as próximas gerações.
                      </p>

                      {/* Economia */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Economia e Desenvolvimento</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        A economia de {city.name} é diversificada e dinâmica, refletindo o espírito empreendedor 
                        de sua população. Diversos setores contribuem para o desenvolvimento econômico do município, 
                        gerando empregos e melhorando a qualidade de vida dos habitantes.
                      </p>

                      <p className="mb-4 text-gray-700 leading-relaxed">
                        O comércio local é vibrante, com estabelecimentos variados que atendem tanto à população 
                        local quanto aos visitantes. A infraestrutura comercial de {city.name} tem se expandido 
                        significativamente nos últimos anos, acompanhando o crescimento da cidade.
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        {city.isCapital ? (
                          <>
                            Como capital do estado, {city.name} desempenha um papel central na economia regional, 
                            atraindo investimentos e servindo como centro administrativo e de serviços para todo o {city.state.name}. 
                            Esta condição de capital proporciona à cidade vantagens competitivas e oportunidades únicas de desenvolvimento.
                          </>
                        ) : (
                          <>
                            O setor de serviços tem crescido de forma expressiva em {city.name}, com estabelecimentos 
                            comerciais, instituições financeiras e empresas de diversos segmentos escolhendo a cidade 
                            para instalar suas operações. Este crescimento econômico tem sido impulsionado pela 
                            localização estratégica e pela infraestrutura local.
                          </>
                        )}
                      </p>

                      {/* Cultura e Turismo */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultura e Turismo</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        A cultura de {city.name} é um reflexo da diversidade do povo do {city.state.name}. 
                        Tradições locais, influências regionais e elementos contemporâneos se fundem para criar 
                        uma identidade cultural única e vibrante que se expressa através de diversas manifestações.
                      </p>

                      <p className="mb-4 text-gray-700 leading-relaxed">
                        A culinária local merece destaque especial, oferecendo sabores autênticos que representam 
                        a gastronomia da região. Restaurantes e estabelecimentos comerciais da cidade oferecem 
                        tanto pratos tradicionais quanto opções contemporâneas, atendendo aos mais diversos paladares.
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        O turismo em {city.name} tem se desenvolvido como uma importante atividade econômica. 
                        A cidade oferece atrações que vão desde o patrimônio histórico até experiências culturais 
                        autênticas, proporcionando aos visitantes uma imersão na cultura local e na hospitalidade 
                        característica de seu povo.
                      </p>

                      {/* Infraestrutura e Serviços */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Infraestrutura e Qualidade de Vida</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        A infraestrutura de {city.name} tem acompanhado o desenvolvimento do município, com 
                        investimentos contínuos em áreas essenciais para o bem-estar da população. O sistema 
                        de abastecimento de água, energia elétrica e serviços de comunicação atendem à maior 
                        parte da cidade, incluindo as áreas de expansão urbana.
                      </p>

                      <p className="mb-4 text-gray-700 leading-relaxed">
                        Na área da saúde, {city.name} conta com estabelecimentos médicos, hospitais e unidades 
                        básicas de saúde que proporcionam assistência à população. A rede de saúde tem se 
                        expandido gradualmente, melhorando o acesso a serviços médicos de qualidade.
                      </p>

                      <p className="mb-6 text-gray-700 leading-relaxed">
                        A educação é outra área que tem recebido atenção especial. A rede de ensino da cidade 
                        oferece educação infantil, fundamental e médio, com instituições bem estruturadas que 
                        buscam formar cidadãos preparados para os desafios do século XXI.
                      </p>

                      {/* Conclusão */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{city.name}: Uma Cidade em Movimento</h3>
                      
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        {city.name} é muito mais do que uma simples cidade no mapa do {city.state.name}. 
                        Representa o potencial de desenvolvimento da região, a capacidade de seu povo e 
                        as oportunidades que surgem quando há planejamento e trabalho conjunto. A cidade 
                        tem demonstrado que é possível conciliar tradição e modernidade, crescimento econômico 
                        e qualidade de vida.
                      </p>

                      <p className="mb-4 text-gray-700 leading-relaxed">
                        Com seu DDD {dddCode}, {city.name} se conecta com o mundo, mas mantém sua identidade 
                        única e seu caráter acolhedor. A cidade tem se consolidado como um importante centro 
                        urbano do {city.state.name}, atraindo novos moradores e investimentos que contribuem 
                        para seu desenvolvimento sustentável.
                      </p>

                      <p className="text-gray-700 leading-relaxed font-semibold">
                        O futuro de {city.name} se apresenta promissor, com perspectivas de crescimento 
                        econômico, social e infraestrutural. A cidade convida a todos para conhecerem sua 
                        história, compartilharem seu presente e participarem da construção de um futuro 
                        ainda mais próspero. O DDD {dddCode} é mais do que um código telefônico - é a 
                        identidade de uma cidade que olha para o futuro com otimismo e determinação.
                      </p>
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
                      Mapa interativo da cidade e região
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

              {/* Tab 3: Operadoras */}
              <TabsContent value="operadoras" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operadoras em {city.name}</CardTitle>
                    <CardDescription>
                      Principais operadoras de telefonia na cidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <Phone className="h-4 w-4 text-red-600" />
                          </div>
                          <h4 className="font-semibold">Vivo</h4>
                        </div>
                        <p className="text-sm text-gray-600">Boa cobertura na região</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                          </div>
                          <h4 className="font-semibold">Claro</h4>
                        </div>
                        <p className="text-sm text-gray-600">Serviços disponíveis na cidade</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <Phone className="h-4 w-4 text-green-600" />
                          </div>
                          <h4 className="font-semibold">TIM</h4>
                        </div>
                        <p className="text-sm text-gray-600">Rede em expansão na região</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                            <Phone className="h-4 w-4 text-yellow-600" />
                          </div>
                          <h4 className="font-semibold">Oi</h4>
                        </div>
                        <p className="text-sm text-gray-600">Serviços disponíveis na cidade</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Dica:</h4>
                      <p className="text-sm text-gray-700">
                        Se você vem de fora, teste as operadoras antes de fechar contrato. 
                        Pergunte aos moradores locais qual funciona melhor na sua região.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 4: Dicas */}
              <TabsContent value="dicas" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dicas Úteis</CardTitle>
                    <CardDescription>
                      Informações importantes sobre o DDD {dddCode}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 border-l-4 border-green-400 p-4">
                      <h4 className="font-semibold mb-2">Como salvar no celular:</h4>
                      <p className="text-sm text-gray-700">
                        Salve os números com o formato completo: +55 {dddCode} XXXXX-XXXX. 
                        Assim seu celular funciona em qualquer lugar do mundo.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <h4 className="font-semibold mb-2">Emergências:</h4>
                      <p className="text-sm text-gray-700">
                        Lembre dos números locais: 190 (Polícia), 192 (Ambulância), 
                        193 (Bombeiros). Funcionam sem DDD dentro da cidade.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                      <h4 className="font-semibold mb-2">Qualidade do sinal:</h4>
                      <p className="text-sm text-gray-700">
                        Na área urbana de {city.name} o sinal é geralmente bom. 
                        Na zona rural, verifique a cobertura antes de escolher a operadora.
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                      <h4 className="font-semibold mb-2">Para negócios:</h4>
                      <p className="text-sm text-gray-700">
                        Use o DDD {dddCode} em toda sua comunicação para reforçar sua 
                        identidade local e facilitar o contato com clientes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Meu DDD. Informações sobre códigos DDD do Brasil.
            </p>
          </div>
        </div>
      </footer>

      {/* SEO Components */}
      <CityStructuredData city={city} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <RelatedLinks city={city} />
      <SEOContent city={city} />
    </div>
  );
}