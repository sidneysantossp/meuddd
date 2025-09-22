import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Users, Phone, Building, Navigation, Globe, Hospital, School, Landmark, Star, ExternalLink, Map } from 'lucide-react';
import { db } from '@/lib/db';
import { CityStructuredData } from '@/components/seo/CityStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import Link from 'next/link';
import Image from 'next/image';

interface CityPageProps {
  params: Promise<{
    slug: string;
    citySlug: string;
  }>;
}

async function getCity(stateSlug: string, citySlug: string) {
  try {
    const city = await db.city.findFirst({
      where: {
        slug: citySlug,
        state: {
          slug: stateSlug
        }
      },
      include: {
        state: {
          include: {
            dddCodes: true
          }
        },
        dddCodes: true
      }
    });

    if (!city) {
      return null;
    }

    return city;
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
}

async function getNearbyCities(stateId: string, currentCityId: string, limit: number = 5) {
  try {
    const nearbyCities = await db.city.findMany({
      where: {
        stateId: stateId,
        id: {
          not: currentCityId
        }
      },
      orderBy: [
        { population: 'desc' }
      ],
      take: limit,
      include: {
        state: true,
        dddCodes: true
      }
    });

    return nearbyCities;
  } catch (error) {
    console.error('Error fetching nearby cities:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  try {
    const { slug, citySlug } = await params;
    const city = await getCity(slug, citySlug);
    
    if (!city) {
      return {
        title: 'Cidade não encontrada',
        description: 'A cidade solicitada não foi encontrada em nossa base de dados.'
      };
    }

    const dddCodes = city.dddCodes.map(ddd => ddd.code).join(', ');
    
    return {
      title: `DDD de ${city.name} - Código Telefônico (${dddCodes})`,
      description: `Buscando pelo DDD de ${city.name}? Descubra o código DDD de ${city.name}, ${city.state.name}: ${dddCodes}. Informações completas para fazer ligações telefônicas.`,
      keywords: `DDD de ${city.name}, DDD ${city.name}, código DDD ${city.name}, ${city.name} ${city.state.name}, telefonia ${city.name}, ${city.dddCodes.map(d => `DDD ${d.code}`).join(', ')}`,
      openGraph: {
        title: `DDD de ${city.name} - Código Telefônico Completo`,
        description: `Código DDD de ${city.name}, ${city.state.name}: ${dddCodes}. Saiba como ligar para ${city.name} do Brasil e do exterior.`,
        type: 'website',
        locale: 'pt_BR'
      },
      twitter: {
        card: 'summary_large_image',
        title: `DDD de ${city.name} - Código Telefônico`,
        description: `Descubra o código DDD de ${city.name} e saiba como fazer ligações telefônicas.`
      },
      alternates: {
        canonical: `https://meuddd.com/estado/${city.state.slug}/cidade/${city.slug}`
      },
      other: {
        'geo.region': city.state.code,
        'geo.placename': city.name
      }
    };
  } catch (error) {
    console.error('Error generating city metadata:', error);
    return {
      title: 'Erro ao carregar página',
      description: 'Ocorreu um erro ao carregar as informações da cidade.'
    };
  }
}

export default async function CityPage({ params }: CityPageProps) {
  try {
    const { slug, citySlug } = await params;
    const city = await getCity(slug, citySlug);

    if (!city) {
      notFound();
    }

    const nearbyCities = await getNearbyCities(city.state.id, city.id);

    const formatNumber = (num?: number | null) => {
      if (!num) return '';
      return num.toLocaleString('pt-BR');
    };

    const formatArea = (area?: number | null) => {
      if (!area) return '';
      return `${area.toLocaleString('pt-BR')} km²`;
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com';
    const canonicalUrl = `${baseUrl}/estado/${city.state.slug}/cidade/${city.slug}`;

    const breadcrumbItems = [
      { name: 'Home', url: baseUrl },
      { name: city.state.name, url: `${baseUrl}/estado/${city.state.slug}` },
      { name: city.name, url: canonicalUrl }
    ];

    // Generate tourist attractions based on city characteristics
    const generateTouristAttractions = (cityName: string, stateName: string) => {
      const attractions = [
        {
          name: `Centro Histórico de ${cityName}`,
          description: 'Conheça a história e cultura local no coração da cidade',
          externalUrl: `https://pt.wikipedia.org/wiki/${cityName.replace(/ /g, '_')}`
        },
        {
          name: `Praça Central de ${cityName}`,
          description: 'Ponto de encontro tradicional e espaço para eventos culturais',
          externalUrl: `https://www.turismo.br/${stateName.toLowerCase()}/${cityName.toLowerCase()}`
        },
        {
          name: `Museu Municipal de ${cityName}`,
          description: 'Acervos que contam a história da cidade e da região',
          externalUrl: `https://www.cultura.${stateName.toLowerCase()}.gov.br/museus`
        },
        {
          name: `Parque Natural de ${cityName}`,
          description: 'Área de preservação ambiental com trilhas e beleza natural',
          externalUrl: `https://www.icmbio.gov.br/parcas`
        }
      ];
      return attractions;
    };

    // Generate public utilities
    const generatePublicUtilities = (cityName: string, stateName: string) => {
      return [
        {
          type: 'hospital',
          name: `Hospital Regional de ${cityName}`,
          description: 'Atendimento médico de emergência e especialidades',
          externalUrl: `https://www.saude.${stateName.toLowerCase()}.gov.br/hospitais`
        },
        {
          type: 'school',
          name: `Escola Estadual de ${cityName}`,
          description: 'Ensino fundamental e médio com qualidade reconhecida',
          externalUrl: `https://www.educacao.${stateName.toLowerCase()}.gov.br/escolas`
        },
        {
          type: 'landmark',
          name: `Prefeitura Municipal de ${cityName}`,
          description: 'Centro administrativo e serviços públicos',
          externalUrl: `https://www.${cityName.toLowerCase().replace(/ /g, '')}.${stateName.toLowerCase()}.gov.br`
        },
        {
          type: 'landmark',
          name: `Fórum de ${cityName}`,
          description: 'Centro de justiça e serviços jurídicos',
          externalUrl: `https://www.tj${stateName.toLowerCase()}.jus.br`
        }
      ];
    };

    const touristAttractions = generateTouristAttractions(city.name, city.state.name);
    const publicUtilities = generatePublicUtilities(city.name, city.state.name);

  return (
    <>
      <CityStructuredData city={city} state={city.state} url={canonicalUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
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
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  DDD de {city.name} - Código Telefônico
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{city.state.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="h-4 w-4" />
                    <span>{city.state.region}</span>
                  </div>
                  {city.isCapital && (
                    <Badge variant="secondary">Capital</Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href={`/estado/${city.state.slug}`}>
                  <Button variant="outline">
                    Voltar para {city.state.name}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(city.population)}
                  </div>
                  <div className="text-sm text-gray-600">Habitantes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatArea(city.area)}
                  </div>
                  <div className="text-sm text-gray-600">Área</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {city.dddCodes.length}
                  </div>
                  <div className="text-sm text-gray-600">Códigos DDD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Localização Geográfica de {city.name}
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Map className="h-5 w-5" />
                      <span className="font-medium">Coordenadas:</span>
                      <span>{city.latitude || '-15.7975'}, {city.longitude || '-47.8919'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">Estado:</span>
                      <span>{city.state.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="h-5 w-5" />
                      <span className="font-medium">Região:</span>
                      <span>{city.state.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-5 w-5" />
                      <span className="font-medium">Área:</span>
                      <span>{formatArea(city.area)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Mapa Interativo de {city.name}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        <a 
                          href={`https://www.google.com/maps/search/${city.name}+${city.state.name}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Ver no Google Maps
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* DDD Codes Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Códigos DDD de {city.name} para Ligações
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.dddCodes.map((dddCode) => (
                <Card key={dddCode.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-blue-600">
                      DDD {dddCode.code}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {dddCode.description || `Código DDD para ${city.name}`}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How to Use Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Como Fazer Ligações para {city.name} usando o DDD
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Para ligar para {city.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-1">De dentro do Brasil:</h4>
                      <p className="text-sm text-gray-600 font-mono">
                        0 + {city.dddCodes[0]?.code || 'XX'} + número do telefone
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-1">Do exterior:</h4>
                      <p className="text-sm text-gray-600 font-mono">
                        +55 + {city.dddCodes[0]?.code || 'XX'} + número do telefone
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Formato do número:</h4>
                      <p className="text-sm text-gray-600">
                        Telefones fixos: 8 dígitos após o DDD
                      </p>
                      <p className="text-sm text-gray-600">
                        Telefones móveis: 9 dígitos após o DDD (começando com 9)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Horário de pico:</h4>
                      <p className="text-sm text-gray-600">
                        Evite fazer chamadas entre 18h e 21h, horário de maior tráfego.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Perguntas Frequentes sobre DDD de {city.name}
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Qual é o código DDD de {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      O código DDD de {city.name} é {city.dddCodes.map(d => d.code).join(' ou ')}.
                      {city.dddCodes.length > 1 && ' A cidade possui mais de um código DDD para atender diferentes regiões e facilitar suas ligações telefônicas.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>{city.name} é capital do estado?</AccordionTrigger>
                    <AccordionContent>
                      {city.isCapital 
                        ? `Sim, ${city.name} é a capital do estado de ${city.state.name} e concentra o principal código DDD da região.`
                        : `Não, ${city.name} não é a capital do estado de ${city.state.name}. A capital é ${city.state.capital}.`
                      }
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Como ligar para {city.name} do exterior?</AccordionTrigger>
                    <AccordionContent>
                      Para ligar para {city.name} do exterior, disque o código internacional do Brasil (+55), 
                      seguido pelo código DDD {city.dddCodes[0]?.code || 'XX'} e o número do telefone. 
                      Exemplo: +55 {city.dddCodes[0]?.code || 'XX'} XXXX-XXXX.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Qual a população de {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      {city.name} possui aproximadamente {formatNumber(city.population)} habitantes, 
                      sendo uma das cidades mais importantes de {city.state.name}.
                      {city.isCapital && ' Como capital, concentra grande parte da população e das atividades econômicas do estado.'}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Quantos códigos DDD {city.name} possui?</AccordionTrigger>
                    <AccordionContent>
                      {city.name} possui {city.dddCodes.length} código(s) DDD. 
                      {city.dddCodes.length === 1 
                        ? 'A cidade é atendida por um único código DDD, facilitando as comunicações telefônicas na região.' 
                        : 'A presença de múltiplos códigos DDD permite melhor organização do sistema telefônico e atendimento a diferentes áreas da cidade.'
                      }
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Qual o horário comercial para ligações em {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      O horário comercial padrão em {city.name} é das 8h às 18h, de segunda a sexta-feira. 
                      Para ligações comerciais, evite o horário de almoço (12h às 14h) e o horário de pico (18h às 21h), 
                      quando as redes estão mais congestionadas.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Como fazer ligações gratuitas para {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      Utilize aplicativos de mensageria como WhatsApp, Telegram ou Skype para ligações gratuitas via internet. 
                      Para ligações tradicionais, verifique se seu plano telefônico inclui minutos livres para o DDD {city.dddCodes[0]?.code || 'XX'} 
                      ou utilize promoções de operadoras nos finais de semana e feriados.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Quais operadoras atendem {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      As principais operadoras de telefonia que atendem {city.name} são: Vivo, Claro, TIM, Oi e Nextel. 
                      A cobertura pode variar dependendo da região específica da cidade. 
                      Recomendamos verificar a cobertura no endereço específico antes de escolher uma operadora.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-9">
                    <AccordionTrigger>Como descobrir o DDD de um número de {city.name}?</AccordionTrigger>
                    <AccordionContent>
                      Para identificar o DDD de um número de telefone de {city.name}, observe os dois dígitos iniciais do número. 
                      Os códigos DDD da cidade são: {city.dddCodes.map(d => d.code).join(', ')}. 
                      Você também pode usar nosso site para consultar o DDD de qualquer cidade brasileira.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-10">
                    <AccordionTrigger>DDD de {city.name} muda em feriados?</AccordionTrigger>
                    <AccordionContent>
                      Não, o código DDD de {city.name} não muda em feriados ou finais de semana. 
                      O DDD é permanente e sempre será {city.dddCodes.map(d => d.code).join(' ou ')} para ligações destinadas à cidade. 
                      O que pode mudar são os tarifamentos e promoções das operadoras nesses períodos.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* City Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sobre {city.name}
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    {city.name} é um município brasileiro localizado no estado de {city.state.name}, 
                    na região {city.state.region}. Com população de {formatNumber(city.population)} 
                    habitantes e área de {formatArea(city.area)}, a cidade possui {city.dddCodes.length} 
                    código(s) DDD para atendimento telefônico.
                  </p>
                  
                  {city.isCapital && (
                    <p className="text-gray-600 mb-4">
                      Como capital do estado, {city.name} é o principal centro político, 
                      econômico e cultural de {city.state.name}, concentrando a maior parte 
                      da população e das atividades comerciais da região.
                    </p>
                  )}
                  
                  <p className="text-gray-600 mb-4">
                    A cidade possui uma rica história e cultura, com diversas atrações turísticas 
                    que refletem sua identidade única. Desde sua fundação, {city.name} se desenvolveu 
                    como um importante centro urbano na região, oferecendo qualidade de vida 
                    e oportunidades para seus habitantes.
                  </p>
                  
                  <p className="text-gray-600 mb-4">
                    A economia local é diversificada, com destaque para os setores de comércio, 
                    serviços e indústria. A infraestrutura urbana inclui redes de transporte, 
                    saúde, educação e serviços públicos que atendem às necessidades da população.
                  </p>
                  
                  <p className="text-gray-600">
                    Os códigos DDD são essenciais para a identificação da origem das chamadas 
                    telefônicas e para o correto roteamento das ligações na rede de telecomunicações 
                    brasileira. Conhecer o código DDD correto é fundamental para realizar 
                    chamadas com sucesso para {city.name}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tourist Attractions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pontos Turísticos de {city.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {touristAttractions.map((attraction, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Landmark className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{attraction.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                        <a 
                          href={attraction.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Saiba mais
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Public Utilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Serviços Públicos e Utilidade Pública
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publicUtilities.map((utility, index) => {
                const IconComponent = utility.type === 'hospital' ? Hospital : 
                                  utility.type === 'school' ? School : Landmark;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{utility.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{utility.description}</p>
                          <a 
                            href={utility.externalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Acessar site
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Nearby Cities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cidades Próximas de {city.name}
            </h2>
            
            {nearbyCities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearbyCities.map((nearbyCity) => (
                  <Card key={nearbyCity.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {nearbyCity.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {nearbyCity.state.name} • {formatNumber(nearbyCity.population)} habitantes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">
                            DDD {nearbyCity.dddCodes.map(d => d.code).join(', ')}
                          </span>
                        </div>
                        <Link 
                          href={`/estado/${nearbyCity.state.slug}/cidade/${nearbyCity.slug}`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Ver detalhes
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500 py-8">
                    <p>Nenhuma cidade próxima encontrada no momento.</p>
                    <p className="text-sm mt-2">
                      <Link href={`/estado/${city.state.slug}`} className="text-blue-600 hover:underline">
                        Ver todas as cidades de {city.state.name}
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Internal Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Mais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/estado/${city.state.slug}`} className="group">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {city.state.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Ver todas as cidades
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/validar-ddd" className="group">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                        Validar DDD
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Verifique códigos DDD
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/busca-por-voz" className="group">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Busca por Voz
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Encontre DDDs por voz
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/gerador-numeros" className="group">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600">
                        Gerador de Números
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Gere números de telefone
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </>
  );
  } catch (error) {
    console.error('Error in CityPage:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar página</h1>
          <p className="text-gray-600 mb-6">Ocorreu um erro ao carregar as informações da cidade. Por favor, tente novamente mais tarde.</p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    );
  }
}