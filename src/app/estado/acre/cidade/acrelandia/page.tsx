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
import { AuthorCard } from '@/components/seo/AuthorCard';
import InteractiveMap from '@/components/ui/InteractiveMap';
import Link from 'next/link';

// Dados da cidade de Acrelândia
const cityData = {
  name: "Acrelândia",
  slug: "acrelandia",
  population: 15226,
  area: 1574,
  latitude: -9.8247,
  longitude: -67.0536,
  isCapital: false,
  state: {
    name: "Acre",
    slug: "acre",
    code: "AC",
    region: "Norte"
  },
  dddCodes: [
    {
      id: "68",
      code: "68",
      description: "DDD único para todo o estado do Acre"
    }
  ]
};

export default function AcrelandiaDDDPage() {
  const formatNumber = (num?: number | null) => {
    if (!num) return '';
    return num.toLocaleString('pt-BR');
  };

  const formatArea = (area?: number | null) => {
    if (!area) return '';
    return `${area.toLocaleString('pt-BR')} km²`;
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com';
  const canonicalUrl = `${baseUrl}/estado/acre/cidade/acrelandia`;
  const dddCode = cityData.dddCodes[0]?.code || "00";

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Estados', url: `${baseUrl}/estados` },
    { name: cityData.state.name, url: `${baseUrl}/estado/${cityData.state.slug}` },
    { name: cityData.name, url: canonicalUrl }
  ];

  return (
    <>
      <CityStructuredData city={cityData} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
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
                  <BreadcrumbLink href={`/estado/${cityData.state.slug}`}>{cityData.state.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{cityData.name}</BreadcrumbPage>
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
                DDD 68 em Acrelândia - AC
              </h1>
              <p className="text-xl text-green-100 mb-6">
                A cidade estratégica do Acre e seu código DDD para todas as comunicações
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
              <AuthorCard />
              
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
                    <span className="font-medium">{cityData.state.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DDD:</span>
                    <Badge variant="secondary">{dddCode}</Badge>
                  </div>
                  {cityData.population && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">População:</span>
                      <span className="font-medium">{formatNumber(cityData.population)}</span>
                    </div>
                  )}
                  {cityData.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-medium">{formatArea(cityData.area)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Tabs Navigation */}
              <Tabs defaultValue="informacoes" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="informacoes">Informações</TabsTrigger>
                  <TabsTrigger value="turismo">Turismo</TabsTrigger>
                  <TabsTrigger value="historia">História</TabsTrigger>
                  <TabsTrigger value="curiosidades">Curiosidades</TabsTrigger>
                </TabsList>

                {/* Tab 1: Informações */}
                <TabsContent value="informacoes" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>DDD 68 em Acrelândia</CardTitle>
                      <CardDescription>
                        Tudo que você precisa saber sobre o código DDD de Acrelândia
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-gray-800">
                          O DDD de Acrelândia é <strong>68</strong>, o mesmo código utilizado em todo o estado do Acre. 
                          Localizada na estratégica BR-364, a cidade serve como importante ponto de conexão para a região.
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
                            <li>• Boa cobertura na BR-364</li>
                            <li>• Principais operadoras presentes</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Turismo */}
                <TabsContent value="turismo" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Turismo em Acrelândia</CardTitle>
                      <CardDescription>
                        Conheça os pontos turísticos e atrações da cidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acrelândia: Portal de Entrada do Acre</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Acrelândia, conhecida como o "Portal de Entrada do Acre", oferece aos visitantes uma experiência 
                          única na fronteira do estado. Localizada em posição estratégica na BR-364, a cidade serve como 
                          primeiro ponto de contato para quem chega do estado do Amazonas, sendo uma parada obrigatória 
                          para quem explora a região amazônica.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A cidade, embora jovem (fundada em 1994), já desenvolveu seu próprio charme e atrativos turísticos. 
                          Sua localização privilegiada permite acesso fácil tanto às belezas naturais do Acre quanto 
                          às regiões vizinhas, tornando-se um centro logístico importante para o turismo na área.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Principais Atrações</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              BR-364 e Mirantes
                            </h4>
                            <p className="text-sm text-gray-700">
                              Os mirantes ao longo da BR-364 oferecem vistas espetaculares da floresta amazônica, 
                              especialmente durante o nascer e pôr do sol.
                            </p>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Globe className="h-4 w-4 mr-2" />
                              Fronteira Amazonas-Acre
                            </h4>
                            <p className="text-sm text-gray-700">
                              O marco divisório entre os estados é um ponto fotográfico interessante e símbolo 
                              da importância geográfica de Acrelândia.
                            </p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-4">Cultura e Tradições</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A cultura de Acrelândia é um reflexo de sua posição fronteiriça e da diversidade de povos 
                          que ajudaram a construir a cidade. As festas tradicionais, como os eventos de aniversário 
                          da cidade e as celebrações juninas, atraem visitantes de toda a região, mostrando a 
                          hospitalidade característica do povo acreano.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Gastronomia Local</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A gastronomia de Acrelândia combina influências da culinária amazônica com pratos típicos 
                          do interior brasileiro. Os visitantes podem saborear peixes de rio frescos, frutas regionais 
                          como açaí e cupuaçu, além de pratos que contam a história da formação da cidade através 
                          de seus sabores.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 3: História */}
                <TabsContent value="historia" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>História de Acrelândia</CardTitle>
                      <CardDescription>
                        A formação e desenvolvimento da cidade através dos tempos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        {/* Seção 1 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Origem e Fundação do Município</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A história de Acrelândia, meu patrão, é uma daquelas narrativas que mostram como a 
                          determinação humana pode transformar a floresta em lar. Fundada oficialmente em 28 de abril 
                          de 1994, nossa cidade é relativamente jovem comparada a outras cidades acreanas, mas sua 
                          importância estratégica já era reconhecida muito antes dessa data. Os primeiros habitantes 
                          da região foram os soldados da borracha, aqueles homens valentes que adentraram a floresta 
                          em busca do ouro negro que movimentaria a economia mundial no início do século XX.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O local onde hoje se ergue Acrelândia era, originalmente, um ponto de parada para os 
                          seringueiros que se deslocavam entre o Amazonas e o então território do Acre. A posição 
                          geográfica privilegiada, praticamente na divisa dos estados, sempre foi um fator crucial 
                          para o desenvolvimento da região. Com a construção da BR-364, o lugar ganhou ainda mais 
                          importância, tornando-se um elo vital na conexão entre o norte e o sul do país.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A emancipação política de Acrelândia foi o resultado de anos de luta e organização 
                          comunitária. Os moradores, liderados por figuras visionárias, reconheciam o potencial 
                          da região e a necessidade de uma administração municipal própria para atender às 
                          demandas locais. Em 28 de abril de 1994, o sonho tornou-se realidade, e Acrelândia 
                          finalmente ganhou seu status de município autônomo.
                        </p>

                        {/* Seção 2 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">A Estratégica BR-364 e o Desenvolvimento</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A BR-364, meu amigo, é mais do que uma simples estrada para Acrelândia - é nossa artéria 
                          vital, nosso canal de comunicação com o resto do Brasil. Quando essa rodovia foi 
                          asfaltada, na década de 1980, mudou completamente o destino da nossa cidade. Antes disso, 
                          a gente dependia quase que exclusivamente dos rios para tudo: transporte, comércio, 
                          comunicação. Era uma vida mais isolada, mais difícil, mas também mais autêntica de certa forma.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Com o asfalto chegando, Acrelândia começou a se transformar. Primeiro vieram as 
                          empreiteiras, com seus trabalhadores de várias partes do Brasil. Depois surgiram os 
                          comércios para atender essa nova população. Os postos de gasolina, os restaurantes, 
                          as pequenas indústrias - tudo começou a florescer às margens da BR-364. A estrada 
                          trouxe progresso, mas também trouxe desafios que até hoje enfrentamos.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Hoje, a BR-364 continua sendo o principal motor econômico de Acrelândia. Milhares de 
                          veículos passam por aqui diariamente, transportando mercadorias entre o Acre e o resto 
                          do país. Esse movimento constante gera empregos, move o comércio local e mantém nossa 
                          cidade sempre viva, sempre em movimento. É como se a estrada fosse o coração de 
                          Acrelândia, batendo sem parar e alimentando todos os setores da nossa economia.
                        </p>

                        {/* Seção 3 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emancipação Política e Autonomia</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A luta pela emancipação política de Acrelândia foi uma das páginas mais importantes 
                          da nossa história, meu patrão. Durante muitos anos, pertencemos a Rio Branco, e embora 
                          respeitássemos nossa capital, sentíamos que nossas necessidades específicas não eram 
                          sempre atendidas como deveriam. A distância geográfica e as particularidades da nossa 
                          região exigiam uma administração mais próxima, mais atenta aos nossos problemas.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O movimento pela emancipação ganhou força na década de 1980, quando o crescimento 
                          populacional e econômico impulsionado pela BR-364 mostrou que Acrelândia tinha 
                          potencial para se tornar um município independente. Lideranças comunitárias, 
                          produtores rurais, comerciantes e cidadãos comuns se uniram em torno desse objetivo 
                          comum. Foram anos de reuniões, de discussões, de negociações com autoridades estaduais.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Finalmente, em 28 de abril de 1994, Acrelândia conquistou sua autonomia. Foi uma 
                          data festiva, marcada por comemorações que duraram dias. A primeira prefeita, o 
                          primeiro prefeito, os primeiros vereadores - todos assumiram com a responsabilidade 
                          de construir uma cidade próspera, justa e desenvolvida. Essa conquista representa 
                          até hoje o espírito de luta e superação do povo acrelandense.
                        </p>

                        {/* Seção 4 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crescimento Econômico e Oportunidades</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O desenvolvimento econômico de Acrelândia está diretamente ligado à nossa posição 
                          geográfica estratégica, meu amigo. Estamos praticamente no coração da Amazônia 
                          Ocidental, num ponto que conecta importantes regiões produtivas. Essa localização 
                          privilegiada tem atraído investimentos e gerado oportunidades que antes eram impensáveis 
                          para nossa cidade.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O agronegócio tem sido um dos pilares da nossa economia. As terras férteis da região 
                          são propícias para o cultivo de diversos produtos, desde grãos até frutas regionais. 
                          Cada vez mais, produtores de outras partes do Brasil têm investido aqui, atraídos 
                          pela qualidade do solo e pelas condições favoráveis ao desenvolvimento rural. Esse 
                          movimento tem fortalecido nossa economia e gerado empregos diretos e indiretos.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Além do agronegócio, o comércio e os serviços também têm crescido significativamente. 
                          A posição de Acrelândia como porta de entrada do Acre torna nossa cidade um ponto 
                          natural para paradas, abastecimento e apoio logístico. Hotéis, restaurantes, 
                          postos de gasolina, oficinas mecânicas - todos esses segmentos têm se beneficiado 
                          do constante movimento na BR-364.
                        </p>

                        {/* Seção 5 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultura e Tradições Acrelandenses</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A cultura de Acrelândia é um caldeirão fascinante de influências, meu patrão. Aqui 
                          convivem harmoniosamente as tradições dos povos originários, os costumes dos 
                          seringueiros que povoaram esta região, as influências dos migrantes de outras 
                          partes do Brasil e os elementos modernos trazidos pelo desenvolvimento recente. 
                          Essa mistura única faz de nossa cultura algo muito especial e diversificado.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Nossas festas tradicionais são momentos especiais de confraternização e 
                          fortalecimento dos laços comunitários. O aniversário da cidade, celebrado em 
                          abril, é o evento mais importante do ano. Durante os festejos, as ruas se enchem 
                          de pessoas, há apresentações culturais, barracas de comida típica e muito 
                          música ao vivo. É quando melhor demonstramos nossa alegria e nossa hospitalidade 
                          característica.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A culinária acrelandense também merece destaque especial. Influenciada pela 
                          abundância da floresta, nossa comida combina peixes de rio, frutas nativas, 
                          e temperos que só encontramos aqui. Pratos como o tambaqui grelhado, açaí 
                          na tigela, e doces feitos com cupuaçu são parte do nosso dia a dia e uma 
                          forma de compartilhar nossa cultura com quem nos visita.
                        </p>

                        {/* Seção 6 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Desafios Superados e Resiliência</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A história de Acrelândia também é marcada por desafios superados, meu amigo. 
                          Nossa cidade enfrentou e continua enfrentando dificuldades que testam a resiliência 
                          do nosso povo. A localização geográfica, apesar de estratégica, também nos 
                          apresenta obstáculos significativos que exigem soluções criativas e determinação.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Um dos maiores desafios históricos foi o isolamento. Antes da BR-364 ser 
                          completamente asfaltada, Acrelândia passava meses praticamente isolada durante 
                          o período chuvoso. As estradas de terra viravam lamaçais intransitáveis, e o 
                          abastecimento de produtos básicos tornava-se um problema sério. Nesses momentos, 
                          a comunidade se unia e encontrava formas alternativas de sobreviver e manter 
                          a cidade funcionando.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Outro desafio importante foi a construção da infraestrutura básica. Eletricidade, 
                          água tratada, saneamento, saúde e educação - tudo isso precisou ser construído 
                          praticamente do zero. Cada nova escola, cada posto de saúde, cada rede elétrica 
                          instalada representa uma vitória conquistada com muito esforço e persistência. 
                          Essas dificuldades ajudaram a forjar o caráter resiliente do povo de Acrelândia.
                        </p>

                        {/* Seção 7 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Modernização e Infraestrutura</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Nos últimos anos, Acrelândia tem passado por um processo significativo de 
                          modernização, meu patrão. A infraestrutura da cidade tem se expandido e 
                          melhorado, atendendo às demandas de uma população crescente e às exigências 
                          do desenvolvimento econômico. Essas transformações estão mudando a cara da 
                          nossa cidade e melhorando a qualidade de vida de todos nós.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          As comunicações foram uma das áreas que mais evoluíram. Hoje, contamos com 
                          internet de alta velocidade em grande parte da cidade, sinal de celular 
                          estável das principais operadoras e serviços de telecomunicações que nos 
                          conectam com o mundo inteiro. Essa modernização foi essencial para atrair 
                          novos negócios e para que os jovens acrelandenses tenham acesso às mesmas 
                          oportunidades de quem vive nos grandes centros urbanos.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A infraestrutura urbana também tem recebido investimentos significativos. 
                          Novas ruas estão sendo pavimentadas, o sistema de abastecimento de água 
                          tem sido expandido e melhorado, e a iluminação pública chega a mais bairros. 
                          Essas melhorias, embora ainda insuficientes para atender a todas as necessidades, 
                          mostram que Acrelândia está no caminho certo para se tornar uma cidade cada 
                          vez mais desenvolvida e preparada para o futuro.
                        </p>

                        {/* Seção 8 */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perspectivas Futuras e Sustentabilidade</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Olhando para o futuro, Acrelândia tem perspectivas muito promissoras, meu amigo. 
                          Nosso potencial de crescimento é enorme, e a cada dia surgem novas oportunidades 
                          de desenvolvimento. No entanto, enfrentamos o desafio de crescer de forma 
                          sustentável, preservando nossa maior riqueza: o meio ambiente da Amazônia que 
                          nos cerca.
                        </p>

                        <p className="mb-4 text-gray-700 leading-relaxed">
                          O turismo sustentável aparece como uma das grandes oportunidades para o futuro 
                          da nossa cidade. A beleza natural da região, combinada com nossa cultura rica 
                          e diversificada, pode atrair visitantes de todo o mundo. Estamos começando 
                          a desenvolver infraestrutura para receber turistas de forma consciente, 
                          oferecendo experiências autênticas que valorizem tanto a comunidade local 
                          quanto o meio ambiente.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          A educação também será fundamental para construir o futuro que desejamos. 
                          Investir na formação das novas gerações, preparando-as para os desafios 
                          do século XXI sem perder a conexão com nossas raízes, é o caminho para 
                          garantir que Acrelândia continue crescendo e se desenvolvendo. Queremos 
                          formar jovens capacitados, criativos e comprometidos com o desenvolvimento 
                          sustentável da nossa amada cidade.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 4: Curiosidades */}
                <TabsContent value="curiosidades" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Curiosidades de Acrelândia</CardTitle>
                      <CardDescription>
                        Fatos interessantes e peculiaridades da cidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Curiosidades que Fazem de Acrelândia Única</h2>
                        
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Acrelândia, meu patrão, é uma cidade cheia de particularidades que a tornam 
                          única no contexto acreano e até mesmo brasileiro. São fatos curiosos, histórias 
                          interessantes e características marcantes que pouca gente conhece, mas que 
                          fazem parte do nosso dia a dia e da nossa identidade como comunidade.
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed">
                          Muitas dessas curiosidades estão relacionadas à nossa posição geográfica 
                          estratégica, outras à nossa formação histórica recente, e algumas simplesmente 
                          ao jeito peculiar de ser do povo acrelandense. Vem comigo que eu te conto 
                          algumas dessas particularidades que tornam nossa cidade tão especial.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Fronteira Viva</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Uma das curiosidades mais interessantes sobre Acrelândia é que praticamente 
                          não temos um centro histórico tradicional como outras cidades. Por sermos 
                          uma cidade relativamente jovem e termos nos desenvolvido ao redor da BR-364, 
                          nosso "centro" é linear, seguindo o traçado da rodovia. Isso confere à 
                          cidade uma dinâmica única, onde a vida comercial e social se organiza de 
                          forma diferente das cidades tradicionais.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Biodiversidade Surpreendente</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Apesar do desenvolvimento urbano, Acrelândia está cercada por uma 
                          biodiversidade impressionante. Nas matas próximas à cidade, ainda é 
                          possível encontrar espécies raras de animais e plantas. Moradores 
                          relatam avistamentos de onças, antas e uma infinidade de pássaros 
                          que fazem da nossa região um paraíso para os amantes da natureza.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Culinária de Fronteira</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Nossa culinária reflete a posição de fronteira de Acrelândia. Aqui, 
                          as influências culinárias do Acre se encontram com as do Amazonas, 
                          criando pratos únicos que você não encontra em nenhum outro lugar. 
                          Peixes de rio combinados com técnicas de preparo de diferentes 
                          regiões resultam em sabores que são puramente acrelandenses.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Cultura Móvel</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Por estar na BR-364, Acrelândia desenvolveu o que poderíamos chamar 
                          de "cultura móvel". Muitas de nossas tradições e festas estão 
                          relacionadas ao movimento constante de pessoas pela rodovia. 
                          Caminhoneiros, viajantes e trabalhadores itinerantes contribuem 
                          para uma cultura dinâmica e sempre renovada.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Lendas e Histórias</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Como toda cidade amazônica, Acrelândia tem seu repertório de lendas 
                          e histórias fantásticas. Contos sobre seres da floresta, histórias 
                          de seringueiros do passado e relatos sobre eventos misteriosos 
                          fazem parte do folclore local e são passados de geração em geração 
                          nas noites quentes acreanas.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Geográfica</h3>
                            <p className="text-sm text-gray-700">
                              Acrelândia está praticamente na linha do equador, o que confere 
                              à cidade um clima peculiar com pouca variação de temperatura 
                              ao longo do ano, mas com estações bem definidas de chuva e seca.
                            </p>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Econômica</h3>
                            <p className="text-sm text-gray-700">
                              A economia local gira em torno da BR-364. Estima-se que mais 
                              de 60% dos empregos diretos e indiretos da cidade estejam 
                              relacionados de alguma forma com o movimento na rodovia.
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Demográfica</h3>
                            <p className="text-sm text-gray-700">
                              Acrelândia tem uma população jovem, com mais de 60% dos 
                              habitantes abaixo dos 35 anos. Isso reflete o caráter 
                              recente da cidade e seu potencial de crescimento futuro.
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Estratégica</h3>
                            <p className="text-sm text-gray-700">
                              Sua posição na BR-364 torna Acrelândia um ponto logístico 
                              crucial para o escoamento da produção agrícola da região.
                            </p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-4">Sabedoria Popular</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          Os habitantes mais antigos de Acrelândia guardam histórias fascinantes sobre 
                          os tempos antes do asfalto, quando a cidade era apenas um povoado isolado no meio 
                          da floresta. Eles contam como as comunidades se ajudavam mutuamente, dividindo 
                          alimentos, ferramentas e conhecimento para sobreviver na selva acreana. Essa 
                          cultura de solidariedade continua viva até hoje, sendo uma das características 
                          mais marcantes do povo acrelandense.
                        </p>

                        <h3 className="text-xl font-semibold mb-4">Biodiversidade Única</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          A região de Acrelândia abriga uma incrível diversidade de fauna e flora amazônica. 
                          Nas matas ao redor da cidade, é possível encontrar espécies raras de pássaros, 
                          mamíferos e plantas que não existem em outras partes do mundo. Os moradores locais 
                          conhecem profundamente essa biodiversidade e utilizam muitas plantas medicinais 
                          tradicionais que passam de geração em geração.
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
    </>
  );
}