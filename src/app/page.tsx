import { DDDSearch } from '@/components/ddd/DDDSearch'
import { StateCard } from '@/components/ddd/StateCard'
import { Card, CardContent } from '@/components/ui/card'
import { Users, MapPin, Phone, Building } from 'lucide-react'
import { db } from '@/lib/db'
import { Metadata } from 'next'

async function getStates() {
  const states = await db.state.findMany({
    include: {
      dddCodes: true,
      _count: {
        select: {
          cities: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
  return states
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MEU DDD - Códigos DDD do Brasil | Encontre o DDD que você precisa",
    description: "Busca rápida e eficiente de códigos DDD brasileiros. Informações detalhadas sobre estados, cidades e códigos telefônicos de todo o território nacional.",
    keywords: ["DDD", "código DDD", "telefone", "Brasil", "estados", "cidades", "telefonia", "código telefônico"],
    openGraph: {
      title: "MEU DDD - Códigos DDD do Brasil",
      description: "Busca rápida e eficiente de códigos DDD brasileiros",
      url: "https://www.meuddd.com.br",
      siteName: "MEU DDD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "MEU DDD - Códigos DDD do Brasil",
      description: "Busca rápida e eficiente de códigos DDD brasileiros",
    },
  }
}

export default async function Home() {
  const states = await getStates()

  const stats = {
    states: states.length,
    cities: states.reduce((acc, state) => acc + state._count.cities, 0),
    dddCodes: states.reduce((acc, state) => acc + state.dddCodes.length, 0),
    population: states.reduce((acc, state) => acc + (state.population || 0), 0)
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MEU DDD - Códigos DDD do Brasil",
    "description": "Busca rápida e eficiente de códigos DDD brasileiros. Informações detalhadas sobre estados, cidades e códigos telefônicos de todo o território nacional.",
    "url": "https://www.meuddd.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.meuddd.com.br/api/ddd/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Country",
      "name": "Brasil",
      "numberOfStates": stats.states,
      "numberOfCities": stats.cities
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre o Código DDD que Você Precisa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Busque por estado, cidade ou código DDD. Temos informações de todos os 27 estados brasileiros com códigos telefônicos atualizados.
          </p>
          <DDDSearch />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.states}</div>
                <div className="text-sm text-gray-600">Estados Brasileiros</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.cities}</div>
                <div className="text-sm text-gray-600">Cidades Cadastradas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{stats.dddCodes}</div>
                <div className="text-sm text-gray-600">Códigos DDD</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {(stats.population / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">Habitantes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Estados Brasileiros
            </h2>
            <p className="text-lg text-gray-600">
              Clique em qualquer estado para ver cidades e códigos DDD
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {states.map((state) => (
              <StateCard key={state.id} state={state} />
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}