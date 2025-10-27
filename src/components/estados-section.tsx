'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MapPin, Users, Building, Phone } from 'lucide-react'
import Link from 'next/link'

interface EstadoCardProps {
  nome: string
  sigla: string
  regiao: string
  habitantes: string
  capital: string
  codigosDDD: string[]
}

const EstadoCard = ({ nome, sigla, regiao, habitantes, capital, codigosDDD }: EstadoCardProps) => {
  return (
    <Link href={`/${nome.toLowerCase()}`}>
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
  const estados = [
    {
      nome: "Acre",
      sigla: "AC",
      regiao: "Norte",
      habitantes: "894.470 habitantes",
      capital: "Rio Branco",
      codigosDDD: ["68"]
    },
    {
      nome: "Alagoas",
      sigla: "AL",
      regiao: "Nordeste",
      habitantes: "3.365.351 habitantes",
      capital: "Maceió",
      codigosDDD: ["82"]
    },
    {
      nome: "Amapá",
      sigla: "AP",
      regiao: "Norte",
      habitantes: "861.773 habitantes",
      capital: "Macapá",
      codigosDDD: ["96"]
    },
    {
      nome: "Amazonas",
      sigla: "AM",
      regiao: "Norte",
      habitantes: "4.269.995 habitantes",
      capital: "Manaus",
      codigosDDD: ["92", "97"]
    },
    {
      nome: "Bahia",
      sigla: "BA",
      regiao: "Nordeste",
      habitantes: "14.930.634 habitantes",
      capital: "Salvador",
      codigosDDD: ["71", "73", "74", "75", "77"]
    },
    {
      nome: "Ceará",
      sigla: "CE",
      regiao: "Nordeste",
      habitantes: "9.240.580 habitantes",
      capital: "Fortaleza",
      codigosDDD: ["85", "88"]
    },
    {
      nome: "Distrito Federal",
      sigla: "DF",
      regiao: "Centro-Oeste",
      habitantes: "3.094.325 habitantes",
      capital: "Brasília",
      codigosDDD: ["61"]
    },
    {
      nome: "Espírito Santo",
      sigla: "ES",
      regiao: "Sudeste",
      habitantes: "4.108.508 habitantes",
      capital: "Vitória",
      codigosDDD: ["27", "28"]
    },
    {
      nome: "Goiás",
      sigla: "GO",
      regiao: "Centro-Oeste",
      habitantes: "7.207.744 habitantes",
      capital: "Goiânia",
      codigosDDD: ["62", "64"]
    },
    {
      nome: "Maranhão",
      sigla: "MA",
      regiao: "Nordeste",
      habitantes: "7.153.262 habitantes",
      capital: "São Luís",
      codigosDDD: ["98", "99"]
    },
    {
      nome: "Mato Grosso",
      sigla: "MT",
      regiao: "Centro-Oeste",
      habitantes: "3.658.813 habitantes",
      capital: "Cuiabá",
      codigosDDD: ["65", "66"]
    },
    {
      nome: "Mato Grosso do Sul",
      sigla: "MS",
      regiao: "Centro-Oeste",
      habitantes: "2.839.188 habitantes",
      capital: "Campo Grande",
      codigosDDD: ["67"]
    },
    {
      nome: "Minas Gerais",
      sigla: "MG",
      regiao: "Sudeste",
      habitantes: "21.411.923 habitantes",
      capital: "Belo Horizonte",
      codigosDDD: ["31", "32", "33", "34", "35", "37", "38"]
    },
    {
      nome: "Pará",
      sigla: "PA",
      regiao: "Norte",
      habitantes: "8.777.124 habitantes",
      capital: "Belém",
      codigosDDD: ["91", "93", "94"]
    },
    {
      nome: "Paraíba",
      sigla: "PB",
      regiao: "Nordeste",
      habitantes: "4.059.905 habitantes",
      capital: "João Pessoa",
      codigosDDD: ["83"]
    },
    {
      nome: "Paraná",
      sigla: "PR",
      regiao: "Sul",
      habitantes: "11.597.484 habitantes",
      capital: "Curitiba",
      codigosDDD: ["41", "42", "43", "44", "45", "46"]
    },
    {
      nome: "Pernambuco",
      sigla: "PE",
      regiao: "Nordeste",
      habitantes: "9.674.793 habitantes",
      capital: "Recife",
      codigosDDD: ["81", "87"]
    },
    {
      nome: "Piauí",
      sigla: "PI",
      regiao: "Nordeste",
      habitantes: "3.281.480 habitantes",
      capital: "Teresina",
      codigosDDD: ["86", "89"]
    },
    {
      nome: "Rio de Janeiro",
      sigla: "RJ",
      regiao: "Sudeste",
      habitantes: "17.463.349 habitantes",
      capital: "Rio de Janeiro",
      codigosDDD: ["21", "22", "24"]
    },
    {
      nome: "Rio Grande do Norte",
      sigla: "RN",
      regiao: "Nordeste",
      habitantes: "3.560.903 habitantes",
      capital: "Natal",
      codigosDDD: ["84"]
    },
    {
      nome: "Rio Grande do Sul",
      sigla: "RS",
      regiao: "Sul",
      habitantes: "11.466.630 habitantes",
      capital: "Porto Alegre",
      codigosDDD: ["51", "53", "54", "55"]
    },
    {
      nome: "Rondônia",
      sigla: "RO",
      regiao: "Norte",
      habitantes: "1.815.278 habitantes",
      capital: "Porto Velho",
      codigosDDD: ["69"]
    },
    {
      nome: "Roraima",
      sigla: "RR",
      regiao: "Norte",
      habitantes: "652.713 habitantes",
      capital: "Boa Vista",
      codigosDDD: ["95"]
    },
    {
      nome: "Santa Catarina",
      sigla: "SC",
      regiao: "Sul",
      habitantes: "7.338.473 habitantes",
      capital: "Florianópolis",
      codigosDDD: ["47", "48", "49"]
    },
    {
      nome: "São Paulo",
      sigla: "SP",
      regiao: "Sudeste",
      habitantes: "46.649.132 habitantes",
      capital: "São Paulo",
      codigosDDD: ["11", "12", "13", "14", "15", "16", "17", "18", "19"]
    },
    {
      nome: "Sergipe",
      sigla: "SE",
      regiao: "Nordeste",
      habitantes: "2.338.474 habitantes",
      capital: "Aracaju",
      codigosDDD: ["79"]
    },
    {
      nome: "Tocantins",
      sigla: "TO",
      regiao: "Norte",
      habitantes: "1.607.363 habitantes",
      capital: "Palmas",
      codigosDDD: ["63"]
    }
  ]

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
          {estados.map((estado) => (
            <EstadoCard
              key={estado.sigla}
              nome={estado.nome}
              sigla={estado.sigla}
              regiao={estado.regiao}
              habitantes={estado.habitantes}
              capital={estado.capital}
              codigosDDD={estado.codigosDDD}
            />
          ))}
        </div>
      </div>
    </section>
  )
}