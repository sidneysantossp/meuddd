import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Phone, Building, Navigation } from 'lucide-react';
import { db } from '@/lib/db';
import { CityStructuredData } from '@/components/seo/CityStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import Link from 'next/link';

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
      title: `DDD ${city.name} - ${city.state.name} (${city.state.code})`,
      description: `Código DDD de ${city.name}, ${city.state.name}. Códigos: ${dddCodes}. Informações telefônicas atualizadas.`,
      keywords: `DDD ${city.name}, ${city.name} ${city.state.name}, código DDD ${city.name}, telefonia ${city.name}, ${city.dddCodes.map(d => `DDD ${d.code}`).join(', ')}`,
      openGraph: {
        title: `DDD ${city.name} - ${city.state.name}`,
        description: `Código DDD de ${city.name}, ${city.state.name} - ${dddCodes}`,
        type: 'website',
        locale: 'pt_BR'
      },
      twitter: {
        card: 'summary_large_image',
        title: `DDD ${city.name} - ${city.state.name}`,
        description: `Código DDD de ${city.name}, ${city.state.name}`
      },
      alternates: {
        canonical: `https://meuddd.com.br/estado/${city.state.slug}/cidade/${city.slug}`
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

    const formatNumber = (num?: number | null) => {
      if (!num) return '';
      return num.toLocaleString('pt-BR');
    };

    const formatArea = (area?: number | null) => {
      if (!area) return '';
      return `${area.toLocaleString('pt-BR')} km²`;
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';
    const canonicalUrl = `${baseUrl}/estado/${city.state.slug}/cidade/${city.slug}`;

    const breadcrumbItems = [
      { name: 'Home', url: baseUrl },
      { name: city.state.name, url: `${baseUrl}/estado/${city.state.slug}` },
      { name: city.name, url: canonicalUrl }
    ];

  return (
    <>
      <CityStructuredData city={city} state={city.state} url={canonicalUrl} />
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
                  {city.name}
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

          {/* DDD Codes Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Códigos DDD de {city.name}
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
              Como usar o código DDD de {city.name}
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
              Perguntas Frequentes sobre {city.name}
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qual é o código DDD de {city.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    O código DDD de {city.name} é {city.dddCodes.map(d => d.code).join(' ou ')}.
                    {city.dddCodes.length > 1 && ' A cidade possui mais de um código DDD para atender diferentes regiões.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{city.name} é capital do estado?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {city.isCapital 
                      ? `Sim, ${city.name} é a capital do estado de ${city.state.name}.`
                      : `Não, ${city.name} não é a capital do estado de ${city.state.name}. A capital é ${city.state.capital}.`
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como ligar para {city.name} do exterior?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Para ligar para {city.name} do exterior, disque o código internacional do Brasil (+55), 
                    seguido pelo código DDD {city.dddCodes[0]?.code || 'XX'} e o número do telefone. 
                    Exemplo: +55 {city.dddCodes[0]?.code || 'XX'} XXXX-XXXX.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qual a população de {city.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {city.name} possui aproximadamente {formatNumber(city.population)} habitantes, 
                    sendo uma das cidades mais importantes de {city.state.name}.
                    {city.isCapital && ' Como capital, concentra grande parte da população e das atividades econômicas do estado.'}
                  </p>
                </CardContent>
              </Card>
            </div>
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

          {/* Nearby Cities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cidades próximas
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center text-gray-500 py-8">
                Em breve: lista de cidades próximas com seus respectivos códigos DDD
              </div>
            </div>
          </section>
        </div>
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