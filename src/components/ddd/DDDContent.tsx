import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Building, Users, MapPin } from 'lucide-react';

interface DDDContentProps {
  stateName: string;
  stateCode: string;
  dddCode: string;
  cities: Array<{
    id: string;
    name: string;
    population?: number;
    isCapital?: boolean;
  }>;
  capital: {
    name: string;
    population?: number;
  };
}

export function DDDContent({ stateName, stateCode, dddCode, cities, capital }: DDDContentProps) {
  const mainCities = cities.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Phone className="h-6 w-6" />
            Código DDD {dddCode} - {stateName}
          </CardTitle>
          <CardDescription className="text-orange-700">
            Informações completas sobre o código de discagem direta para {stateName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Código DDD</p>
                <p className="font-bold text-lg">{dddCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Capital</p>
                <p className="font-bold">{capital.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-bold">{stateCode}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Como Ligar */}
      <Card>
        <CardHeader>
          <CardTitle>Como Fazer Ligações para {stateName}</CardTitle>
          <CardDescription>
            Aprenda como fazer ligações usando o código DDD {dddCode}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Do mesmo estado:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                {dddCode} + número do telefone
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">De outro estado:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                0 + {dddCode} + número do telefone
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Do exterior:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                +55 + {dddCode} + número do telefone
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Principais Cidades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Principais Cidades com DDD {dddCode}
          </CardTitle>
          <CardDescription>
            As maiores cidades de {stateName} que utilizam o código {dddCode}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mainCities.map((city) => (
              <div
                key={city.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{city.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {city.population && (
                    <span className="text-sm text-gray-500">
                      {city.population.toLocaleString('pt-BR')} hab.
                    </span>
                  )}
                  {city.isCapital && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Capital
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          {cities.length > 10 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500 text-center">
                +{cities.length - 10} outras cidades também utilizam o DDD {dddCode}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações sobre o DDD {dddCode}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Sobre o Código {dddCode}</h4>
            <p className="text-sm text-gray-600">
              O código DDD {dddCode} é utilizado para ligações interurbanas para {stateName} 
              e suas {cities.length} cidades. Este código cobre uma população aproximada de 
              {cities.reduce((acc, city) => acc + (city.population || 0), 0).toLocaleString('pt-BR')} habitantes.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Operadoras Disponíveis</h4>
            <p className="text-sm text-gray-600">
              Todas as principais operadoras de telefonia do Brasil atendem a região do DDD {dddCode}, 
              incluindo Vivo, Claro, TIM, Oi e Algar, além de operadoras regionais.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Cobertura</h4>
            <p className="text-sm text-gray-600">
              O DDD {dddCode} cobre todo o território de {stateName}, desde a capital {capital.name} 
              até os municípios mais distantes, garantindo comunicação em todo o estado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}