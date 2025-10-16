import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Map, Building, BarChart, Camera, BookOpen, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { db } from '@/lib/db'
import { SimpleMap } from '@/components/city/SimpleMap'
import { CityAboutContent } from '@/components/city/CityAboutContent'
import { CityFAQ } from '@/components/city/CityFAQ'
import { CityDataCards } from '@/components/city/CityDataCards'
import { CityInformation } from '@/components/city/CityInformation'
import { Metadata } from 'next'

async function getCity(stateSlug: string, citySlug: string) {
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
      cityDddCodes: {
        include: {
          dddCode: true
        }
      }
    }
  })

  if (!city) {
    notFound()
  }

  return city
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; citySlug: string }> 
}): Promise<Metadata> {
  const { slug, citySlug } = await params
  const city = await getCity(slug, citySlug)
  const dddCodes = city.cityDddCodes.map(cd => cd.dddCode)
  const mainDddCode = dddCodes[0]?.code || 'N/A'

  return {
    title: `DDD ${mainDddCode} Alegre ES | Código Telefônico Completo 2024`,
    description: `DDD ${mainDddCode} Alegre ES: guia completo do código telefônico. Informações detalhadas sobre como ligar, operadoras, áreas de cobertura e dados demográficos. Atualizado 2024.`,
    keywords: [
      'DDD ${mainDddCode} Alegre',
      'código DDD Alegre ES',
      'telefone Alegre Espírito Santo',
      'como ligar para Alegre',
      'operadoras Alegre ES',
      'DDD Espírito Santo',
      'Alegre código telefônico',
      'DDD ${mainDddCode} Espírito Santo',
      'ligações para Alegre',
      'telefone Alegre ES'
    ],
    openGraph: {
      title: `DDD ${mainDddCode} Alegre ES | Guia Completo`,
      description: `Informações completas sobre o DDD ${mainDddCode} de Alegre, Espírito Santo. Como fazer ligações, operadoras disponíveis e dados da cidade.`,
      url: `https://www.meuddd.com.br/estado/${slug}/${citySlug}`,
      siteName: 'MEU DDD',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `DDD ${mainDddCode} Alegre ES`,
      description: `Guia completo do código telefônico de Alegre, ES. Informações atualizadas sobre DDD ${mainDddCode}.`,
    },
  }
}

export default async function CityPage({ 
  params 
}: { 
  params: Promise<{ slug: string; citySlug: string }> 
}) {
  const { slug, citySlug } = await params
  const city = await getCity(slug, citySlug)
  const dddCodes = city.cityDddCodes.map(cd => cd.dddCode)
  const mainDddCode = dddCodes[0]?.code || 'N/A'

  const formatNumber = (num: number | null | undefined) => {
    if (!num) return 'N/A'
    return num.toLocaleString('pt-BR')
  }

  const formatArea = (area: number | null | undefined) => {
    if (!area) return 'N/A'
    return `${area.toLocaleString('pt-BR')} km²`
  }

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
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              DDD {mainDddCode} em Alegre
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Cidade do Espírito Santo e seu codigo DDD completo
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Phone className="h-6 w-6 mr-2" />
              <span className="text-2xl font-bold">{mainDddCode}</span>
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
                  <Badge variant="secondary">{mainDddCode}</Badge>
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
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
                <TabsTrigger value="sobre" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Sobre Alegre</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">FAQ</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <TabsContent value="ddd" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações sobre DDD {mainDddCode}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Código DDD {mainDddCode}</h3>
                      <p className="text-gray-600">
                        O código DDD {mainDddCode} é utilizado para ligações telefônicas na cidade de Alegre 
                        e em outras localidades do estado do Espírito Santo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Como Fazer Ligações</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>De dentro do mesmo DDD:</strong> Apenas o número do telefone</p>
                        <p><strong>De outro DDD:</strong> 0 + código da operadora + {mainDddCode} + número</p>
                        <p><strong>Do exterior:</strong> +55 + {mainDddCode} + número</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Operadoras Disponíveis</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Vivo', 'Claro', 'TIM', 'Oi', 'Algar'].map((operator) => (
                          <Badge key={operator} variant="outline" className="justify-center">
                            {operator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mapa" className="space-y-6">
                <SimpleMap 
                  cityName={city.name}
                  stateName={city.state.name}
                  latitude={city.latitude}
                  longitude={city.longitude}
                />
              </TabsContent>

              <TabsContent value="servicos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços Locais e Emergência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Serviços de Emergência</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <h4 className="font-bold text-red-700">190</h4>
                          <p className="text-sm text-red-600">Polícia</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <h4 className="font-bold text-red-700">192</h4>
                          <p className="text-sm text-red-600">SAMU</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <h4 className="font-bold text-red-700">193</h4>
                          <p className="text-sm text-red-600">Bombeiros</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <h4 className="font-bold text-blue-700">181</h4>
                          <p className="text-sm text-blue-600">Defesa Civil</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dados" className="space-y-6">
                <CityDataCards
                  cityName={city.name}
                  population={city.population}
                  area={city.area}
                  populationDensity={city.population && city.area ? Math.round(city.population / city.area) : null}
                  idh={0.754}
                  adultLiteracyRate={94}
                  monthlyIncome={2450}
                  homeOwnershipRate={85}
                  cityType={city.isCapital ? 'Capital' : 'Cidade'}
                  region={city.state.region}
                />
              </TabsContent>

              <TabsContent value="turismo" className="space-y-6">
                <CityInformation 
                  cityName={city.name}
                  stateName={city.state.name}
                />
              </TabsContent>

              <TabsContent value="sobre" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre Alegre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <h2>DDD 27 em Alegre</h2>
                      <p>
                        O código DDD 27 é utilizado para ligações telefônicas em Alegre, 
                        cidade do estado do Espírito Santo. 
                        Esta cidade possui grande importância regional 
                        e conta com infraestrutura de telecomunicações completa.
                      </p>
                      <p>
                        Para fazer ligações para Alegre a partir de outras cidades, 
                        utilize o código 27 seguido do número do telefone. 
                        A cidade é servida pelas principais operadoras de telefonia do Brasil.
                      </p>
                      <h3>Links Úteis</h3>
                      <ul>
                        <li><a href="https://www.anatel.gov.br/" target="_blank" rel="noopener noreferrer">Anatel</a></li>
                        <li><a href="https://www.es.gov.br/" target="_blank" rel="noopener noreferrer">Governo do ES</a></li>
                        <li><a href="https://www.ibge.gov.br/" target="_blank" rel="noopener noreferrer">IBGE</a></li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <CityFAQ
                  cityName={city.name}
                  stateName={city.state.name}
                  dddCodes={dddCodes.map(d => d.code)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}