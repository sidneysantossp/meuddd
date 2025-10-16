import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, Clock, Signal, AlertTriangle, Users, Building } from 'lucide-react'

interface TelephonyInfoProps {
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

export function TelephonyInfo({ state }: TelephonyInfoProps) {
  const getOperatorInfo = () => {
    return [
      {
        name: 'Vivo',
        coverage: 'Nacional',
        technology: '4G/5G',
        popular: true
      },
      {
        name: 'Claro',
        coverage: 'Nacional',
        technology: '4G/5G',
        popular: true
      },
      {
        name: 'TIM',
        coverage: 'Nacional',
        technology: '4G/5G',
        popular: true
      },
      {
        name: 'Oi',
        coverage: 'Nacional',
        technology: '4G',
        popular: false
      },
      {
        name: 'Algar',
        coverage: 'Regional',
        technology: '4G',
        popular: false
      }
    ]
  }

  const getCallRates = () => {
    return {
      local: {
        description: 'Ligações dentro do mesmo DDD',
        rate: 'Tarifa local padrão',
        example: `DDD ${state.dddCodes[0]?.code} para DDD ${state.dddCodes[0]?.code}`
      },
      longDistance: {
        description: 'Ligações para DDDs diferentes',
        rate: 'Tarifa de longa distância',
        example: `DDD ${state.dddCodes[0]?.code} para DDD 11 (São Paulo)`
      },
      mobile: {
        description: 'Ligações para celulares',
        rate: 'Tarifa móvel',
        example: `Fixo para celular com DDD ${state.dddCodes[0]?.code}`
      }
    }
  }

  const getPeakHours = () => {
    return {
      commercial: {
        hours: '08:00 - 18:00',
        days: 'Segunda a Sexta',
        description: 'Maior tráfego de chamadas comerciais',
        tip: 'Evite horários de pico para ligações não urgentes'
      },
      residential: {
        hours: '19:00 - 22:00',
        days: 'Todos os dias',
        description: 'Maior tráfego de chamadas pessoais',
        tip: 'Horários com promoções das operadoras'
      },
      weekend: {
        hours: 'Todo o dia',
        days: 'Sábado e Domingo',
        description: 'Tráfego moderado com promoções',
        tip: 'Melhor horário para ligações longas'
      }
    }
  }

  const operators = getOperatorInfo()
  const callRates = getCallRates()
  const peakHours = getPeakHours()

  return (
    <div className="space-y-6">
      {/* DDD Codes Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Códigos DDD do {state.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.dddCodes.map((ddd) => (
              <div key={ddd.code} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-blue-600">DDD {ddd.code}</h3>
                  <Badge variant="outline">Ativo</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {ddd.description || `Código DDD que cobre parte do território do ${state.name}`}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Como usar os códigos DDD</h4>
            <p className="text-blue-800 text-sm">
              Para fazer ligações para o {state.name}, disque 0 + código da operadora + {state.dddCodes[0]?.code} + número do telefone.
              Para ligações locais dentro do mesmo DDD, geralmente não é necessário discar o código DDD.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Operators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="h-5 w-5" />
            Operadoras de Telefonia Móvel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            As principais operadoras de telefonia móvel atendem o {state.name} com diferentes níveis de cobertura:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operators.map((operator) => (
              <div key={operator.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{operator.name}</h3>
                  {operator.popular && (
                    <Badge variant="secondary">Popular</Badge>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Cobertura:</span> {operator.coverage}</p>
                  <p><span className="font-medium">Tecnologia:</span> {operator.technology}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Tipos de Ligações e Tarifas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(callRates).map(([key, rate]) => (
              <div key={key} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 capitalize">
                  {key === 'local' ? 'Ligações Locais' : 
                   key === 'longDistance' ? 'Ligações Longa Distância' : 
                   'Ligações para Celulares'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{rate.description}</p>
                <p className="text-sm font-medium text-blue-600 mb-1">{rate.rate}</p>
                <p className="text-xs text-gray-500">Ex: {rate.example}</p>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Dica Economia</h4>
            <p className="text-yellow-800 text-sm">
              Verifique os planos e promoções das operadoras. Muitas oferecem tarifas reduzidas em horários específicos
              ou para determinados tipos de ligações.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Peak Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horários de Pico e Melhores Horários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(peakHours).map(([key, period]) => (
              <div key={key} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">
                  {key === 'commercial' ? 'Horário Comercial' : 
                   key === 'residential' ? 'Horário Residencial' : 
                   'Fim de Semana'}
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Horário:</span> {period.hours}</p>
                  <p><span className="font-medium">Dias:</span> {period.days}</p>
                  <p className="text-gray-600">{period.description}</p>
                  <p className="text-blue-600 text-xs">{period.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Serviços de Emergência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-red-700 mb-1">190</h3>
              <p className="text-sm text-red-600">Polícia Militar</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-red-700 mb-1">192</h3>
              <p className="text-sm text-red-600">SAMU</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-red-700 mb-1">193</h3>
              <p className="text-sm text-red-600">Corpo de Bombeiros</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-blue-700 mb-1">181</h3>
              <p className="text-sm text-blue-600">Defesa Civil</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Estes números de emergência funcionam 24 horas por dia em todo o território nacional e são gratuitos.
            Em caso de emergência, disque diretamente o número sem necessidade de código DDD.
          </p>
        </CardContent>
      </Card>

      {/* Quality Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Dicas para Melhor Qualidade das Ligações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Ligações Fixo-Fixo</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use telefones com fio para melhor qualidade</li>
                <li>• Verifique as conexões dos cabos</li>
                <li>• Evite fazer ligações durante tempestades</li>
                <li>• Mantenha o aparelho limpo e em bom estado</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Ligações Móveis</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verifique o sinal da operadora</li>
                <li>• Prefira locais abertos para melhor recepção</li>
                <li>• Mantenha a bateria carregada</li>
                <li>• Use fones de ouvido com microfone</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}