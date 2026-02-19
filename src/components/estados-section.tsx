import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MapPin, Users, Building, Phone } from 'lucide-react'
import Link from 'next/link'
import { brazilianStates } from '@/data/states'

interface EstadoCardProps {
  nome: string
  sigla: string
  regiao: string
  habitantes: string
  capital: string
  codigosDDD: string[]
  slug: string
}

const EstadoCard = ({ nome, sigla, regiao, habitantes, capital, codigosDDD, slug }: EstadoCardProps) => {
  return (
    <Link href={`/estado/${slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-200 hover:border-blue-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {nome}
              </h2>
              <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                {sigla}
              </Badge>
            </div>
            <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{regiao}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{habitantes}</span>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Capital: {capital}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Códigos DDD:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {codigosDDD.map((ddd) => (
                  <Badge key={ddd} variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                    {ddd}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function EstadosSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Consulte o DDD de Todos os Estados Brasileiros
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Clique em um estado para ver detalhes dos códigos DDD e cidades.
            Encontre o código telefônico que você precisa para fazer suas ligações.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brazilianStates.map((estado) => (
            <EstadoCard
              key={estado.id}
              nome={estado.name}
              sigla={estado.abbreviation}
              regiao={estado.region}
              habitantes={`${estado.population.toLocaleString('pt-BR')} habitantes`}
              capital={estado.capital}
              codigosDDD={estado.dddCodes}
              slug={estado.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}