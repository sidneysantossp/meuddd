import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Radio, Smartphone, Wifi, AlertTriangle, Info, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface TelephonyInfoProps {
  state: {
    name: string;
    code: string;
    dddCodes: Array<{
      code: string;
      description?: string | null;
    }>;
  };
}

export function TelephonyInfo({ state }: TelephonyInfoProps) {
  const getTelephonyTips = (stateName: string) => {
    const tips = [
      {
        icon: Phone,
        title: 'Como fazer chamadas locais',
        content: `Para ligações dentro de ${stateName}, utilize o formato: 0 + código DDD + número do telefone. Por exemplo, para o DDD 11: 011 XXXX-XXXX.`
      },
      {
        icon: Smartphone,
        title: 'Ligações para celulares',
        content: `Para celulares em ${stateName}, o formato é o mesmo: 0 + código DDD + 9 + número do celular. Exemplo: 011 9XXXX-XXXX.`
      },
      {
        icon: Radio,
        title: 'Ligações interurbanas',
        content: `Para ligações de outras cidades para ${stateName}, use: 0 + código da operadora + código DDD + número. As principais operadoras são 15 (TIM), 21 (Claro), 41 (Vivo).`
      },
      {
        icon: Wifi,
        title: 'Cobertura de internet',
        content: `${stateName} possui boa cobertura de internet móvel nas áreas urbanas. Nas regiões mais remotas, a cobertura pode ser limitada.`
      }
    ];

    return tips;
  };

  const getDddCoverageInfo = (dddCodes: Array<{ code: string; description?: string | null }>) => {
    const coverageInfo = dddCodes.map(ddd => ({
      code: ddd.code,
      description: ddd.description || `Região atendida pelo DDD ${ddd.code}`,
      tips: [
        `Verifique sempre o DDD correto antes de fazer a ligação`,
        `Algumas cidades podem ter mais de um DDD dependendo da região`,
        `O DDD ${ddd.code} atende principalmente ${ddd.description?.toLowerCase() || 'várias cidades'}`
      ]
    }));

    return coverageInfo;
  };

  const getOperadoraInfo = () => {
    return [
      {
        name: 'Vivo',
        code: '15',
        coverage: 'Nacional',
        features: ['4G/5G', 'Fibra óptica', 'Roaming internacional']
      },
      {
        name: 'Claro',
        code: '21',
        coverage: 'Nacional',
        features: ['4G/5G', 'Fibra óptica', 'Claro TV']
      },
      {
        name: 'TIM',
        code: '41',
        coverage: 'Nacional',
        features: ['4G/5G', 'TIM Live Fibra', 'Benefits']
      },
      {
        name: 'Oi',
        code: '14',
        coverage: 'Nacional',
        features: ['4G', 'Oi Fibra', 'Oi TV']
      }
    ];
  };

  const telephonyTips = getTelephonyTips(state.name);
  const dddCoverageInfo = getDddCoverageInfo(state.dddCodes);
  const operadoras = getOperadoraInfo();

  return (
    <div className="space-y-6">
      {/* Main Telephony Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-blue-600" />
            Telefonia em {state.name}
          </CardTitle>
          <CardDescription>
            Guia completo sobre códigos DDD, operadoras e informações de telefonia do estado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {state.dddCodes.length}
              </div>
              <div className="text-sm text-gray-600">Códigos DDD</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                4
              </div>
              <div className="text-sm text-gray-600">Principais Operadoras</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                95%
              </div>
              <div className="text-sm text-gray-600">Cobertura Urbana</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DDD Codes Detailed Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-green-600" />
            Códigos DDD de {state.name}
          </CardTitle>
          <CardDescription>
            Informações detalhadas sobre cada código DDD e suas áreas de cobertura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dddCoverageInfo.map((ddd, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="text-lg px-3 py-1">
                    DDD {ddd.code}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{ddd.description}</h4>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700 text-sm">Informações importantes:</h5>
                  <ul className="space-y-1">
                    {ddd.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <Info className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Telephony Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Dicas Úteis para Telefonia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {telephonyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Operators Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Principais Operadoras em {state.name}
          </CardTitle>
          <CardDescription>
            Informações sobre as principais operadoras de telefonia móvel e fixa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operadoras.map((operadora, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{operadora.name}</h4>
                  <Badge variant="secondary">{operadora.code}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Radio className="h-3 w-3 text-green-500" />
                    <span className="text-gray-600">Cobertura: {operadora.coverage}</span>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Serviços:</h5>
                    <div className="flex flex-wrap gap-1">
                      {operadora.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Verifique sempre o DDD</h4>
                  <p className="text-sm text-yellow-700">
                    Cidades próximas podem ter DDDs diferentes. Sempre verifique o código DDD correto 
                    antes de fazer ligações para evitar custos adicionais.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Mudanças recentes</h4>
                  <p className="text-sm text-blue-700">
                    A ANATEL atualiza periodicamente os códigos DDD. Mantenha-se informado sobre 
                    possíveis mudanças na numeração telefônica do estado.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Portabilidade numérica</h4>
                  <p className="text-sm text-green-700">
                    Lembre-se que com a portabilidade, o prefixo da operadora não indica mais 
                    necessariamente a operadora atual do número.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools and Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-blue-600" />
            Ferramentas e Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/validar-ddd" className="block">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Validar DDD</h4>
                <p className="text-sm text-gray-600">Verifique códigos DDD</p>
              </div>
            </Link>
            
            <Link href="/gerador-numeros" className="block">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Gerador de Números</h4>
                <p className="text-sm text-gray-600">Crie números para testes</p>
              </div>
            </Link>
            
            <Link href="/busca-por-voz" className="block">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                <Radio className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Busca por Voz</h4>
                <p className="text-sm text-gray-600">Use comandos de voz</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}