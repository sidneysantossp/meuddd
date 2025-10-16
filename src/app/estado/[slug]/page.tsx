import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Users, Globe, Building, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { db } from '@/lib/db'
import { StateInfo } from '@/components/estado/StateInfo'
import { TelephonyInfo } from '@/components/estado/TelephonyInfo'
import { CityList } from '@/components/estado/CityList'

async function getState(slug: string) {
  const state = await db.state.findUnique({
    where: { slug },
    include: {
      cities: {
        include: {
          cityDddCodes: {
            include: {
              dddCode: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      },
      dddCodes: true
    }
  })

  if (!state) {
    notFound()
  }

  return state
}

export default async function EstadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const state = await getState(slug)

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{state.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* State Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                DDD do {state.name} - Guia Completo
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{state.region}</span>
                </div>
                <Badge variant="secondary">{state.code}</Badge>
              </div>
              <p className="text-lg text-gray-600">
                {state.cities.length} cidades • {state.dddCodes.length} códigos DDD • {formatNumber(state.population)} habitantes
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-black text-white border-black hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para todos os estados
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(state.population)}
                </div>
                <div className="text-sm text-gray-600">Habitantes</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatArea(state.area)}
                </div>
                <div className="text-sm text-gray-600">Área</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {state.cities.length}
                </div>
                <div className="text-sm text-gray-600">Cidades</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {state.dddCodes.length}
                </div>
                <div className="text-sm text-gray-600">Códigos DDD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="cidades" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="cidades" className="text-sm">
              Cidades ({state.cities.length})
            </TabsTrigger>
            <TabsTrigger value="informacoes" className="text-sm">
              Informações
            </TabsTrigger>
            <TabsTrigger value="telefonia" className="text-sm">
              Telefonia
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-sm">
              Dúvidas
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="cidades" className="space-y-6">
            <CityList 
              cities={state.cities.map(city => ({
                ...city,
                dddCodes: city.cityDddCodes.map(cd => cd.dddCode)
              }))}
              stateName={state.name}
              stateSlug={state.slug}
              itemsPerPage={12}
            />
          </TabsContent>

          <TabsContent value="informacoes" className="space-y-6">
            <StateInfo state={state} />
          </TabsContent>

          <TabsContent value="telefonia" className="space-y-6">
            <TelephonyInfo state={state} />
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Perguntas Frequentes sobre DDD do {state.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quantos códigos DDD existem no {state.name}?</h3>
                  <p className="text-gray-600">
                    O {state.name} possui {state.dddCodes.length} códigos DDD: {state.dddCodes.map(d => d.code).join(', ')}.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Qual é o DDD da capital {state.capital}?</h3>
                  <p className="text-gray-600">
                    O DDD da capital {state.capital} é {state.dddCodes[0]?.code || 'consulte a lista de cidades'}.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Como fazer ligações para o {state.name}?</h3>
                  <p className="text-gray-600">
                    Para fazer ligações para o {state.name}, disque o código DDD seguido do número do telefone.
                    Exemplo: {state.dddCodes[0]?.code} + número do telefone.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">O {state.name} pertence a qual região?</h3>
                  <p className="text-gray-600">
                    O {state.name} está localizado na região {state.region} do Brasil.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}