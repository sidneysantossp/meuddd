import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Globe, Building, Calendar } from 'lucide-react'

interface StateInfoProps {
  state: {
    id: string;
    name: string;
    slug: string;
    code: string;
    region: string;
    population?: number | null;
    area?: number | null;
    capital?: string | null;
    dddCodes: Array<{ code: string; description?: string }>;
  };
}

export function StateInfo({ state }: StateInfoProps) {
  const formatNumber = (num: number | null | undefined) => {
    if (!num) return 'N/A'
    return num.toLocaleString('pt-BR')
  }

  const formatArea = (area: number | null | undefined) => {
    if (!area) return 'N/A'
    return `${area.toLocaleString('pt-BR')} km²`
  }

  const getRegionInfo = (region: string) => {
    const regionInfo = {
      'Norte': {
        description: 'A região Norte é a maior região do Brasil em área territorial, cobrindo cerca de 45% do território nacional. É caracterizada pela vasta floresta Amazônica e pela baixa densidade populacional.',
        states: 7,
        mainEconomy: 'Agricultura, extrativismo mineral e turismo ecológico'
      },
      'Nordeste': {
        description: 'A região Nordeste é conhecida por suas belas praias, cultura rica e história. Possui o terceiro maior PIB do país e é uma das regiões mais populosas do Brasil.',
        states: 9,
        mainEconomy: 'Turismo, agricultura, indústria e serviços'
      },
      'Centro-Oeste': {
        description: 'A região Centro-Oeste é o coração do Brasil, conhecida por sua agricultura moderna, pelo Pantanal e por ser o centro político do país.',
        states: 3,
        mainEconomy: 'Agricultura, pecuária e serviços governamentais'
      },
      'Sudeste': {
        description: 'A região Sudeste é a mais desenvolvida economicamente do Brasil, concentrando o maior PIB do país e os principais centros financeiros e industriais.',
        states: 4,
        mainEconomy: 'Indústria, serviços, tecnologia e finanças'
      },
      'Sul': {
        description: 'A região Sul é conhecida por sua economia forte baseada na agricultura e indústria, além de sua cultura europeia marcante e padrões de desenvolvimento social elevados.',
        states: 3,
        mainEconomy: 'Agricultura, indústria e comércio exterior'
      }
    }
    return regionInfo[region as keyof typeof regionInfo] || {
      description: 'Informações sobre a região não disponíveis.',
      states: 0,
      mainEconomy: 'N/A'
    }
  }

  const regionInfo = getRegionInfo(state.region)

  return (
    <div className="space-y-6">
      {/* Main Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Informações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Nome Completo</h4>
              <p className="text-gray-600">{state.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Sigla</h4>
              <Badge variant="outline" className="text-base px-3 py-1">
                {state.code}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Capital</h4>
              <p className="text-gray-600">{state.capital || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Região</h4>
              <Badge className="bg-blue-100 text-blue-800">
                {state.region}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">População</h4>
              <p className="text-gray-600">{formatNumber(state.population)} habitantes</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Área Territorial</h4>
              <p className="text-gray-600">{formatArea(state.area)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informações da Região {state.region}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {regionInfo.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Estados na Região</h4>
              <p className="text-gray-600">{regionInfo.states} estados</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Principais Atividades Econômicas</h4>
              <p className="text-gray-600">{regionInfo.mainEconomy}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DDD Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Códigos DDD do Estado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-600">
              O {state.name} possui {state.dddCodes.length} códigos DDD que cobrem todo o território estadual:
            </p>
            <div className="flex flex-wrap gap-2">
              {state.dddCodes.map((ddd) => (
                <Badge key={ddd.code} variant="secondary" className="text-base px-3 py-1">
                  DDD {ddd.code}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Cada código DDD cobre uma região específica do estado, garantindo a organização do sistema telefônico.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Historical Facts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Dados Históricos e Curiosidades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">População Relativa</h4>
              <p className="text-gray-600">
                {state.population && state.population > 10000000 
                  ? 'Um dos estados mais populosos do Brasil'
                  : state.population && state.population > 5000000
                  ? 'População significativa no cenário nacional'
                  : 'População menor em comparação com outros estados'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Extensão Territorial</h4>
              <p className="text-gray-600">
                {state.area && state.area > 500000
                  ? 'Um dos maiores estados em área territorial'
                  : state.area && state.area > 200000
                  ? 'Área territorial considerável'
                  : 'Estado de porte médio ou pequeno'
                }
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Sistema Telefônico</h4>
            <p className="text-gray-600">
              O sistema de telefonia do {state.name} está bem distribuído, com {state.dddCodes.length} códigos DDD 
              garantindo cobertura para todas as regiões do estado, desde áreas urbanas densamente povoadas até 
              localidades mais remotas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}