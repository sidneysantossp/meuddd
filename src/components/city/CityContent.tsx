import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Phone, Building, Globe } from 'lucide-react';

interface CityContentProps {
  city: {
    name: string;
    population?: number;
    area?: number;
    isCapital?: boolean;
  };
  state: {
    name: string;
    code: string;
    region: string;
  };
  dddCodes: Array<{
    code: string;
    description?: string;
  }>;
  mainDDD: {
    code: string;
    description?: string;
  };
}

export function CityContent({ city, state, dddCodes, mainDDD }: CityContentProps) {
  const density = city.area && city.population ? Math.round(city.population / city.area) : null;

  return (
    <div className="space-y-6">
      {/* Card Principal da Cidade */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <MapPin className="h-6 w-6" />
            {city.name}, {state.name}
          </CardTitle>
          <CardDescription className="text-orange-700">
            Informações completas sobre a cidade e seu código DDD
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">DDD</p>
                <p className="font-bold text-lg">{mainDDD.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-medium">{state.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">População</p>
                <p className="font-medium">
                  {city.population ? city.population.toLocaleString('pt-BR') : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">
                  {city.isCapital ? 'Capital' : 'Interior'}
                </p>
              </div>
            </div>
          </div>
          
          {city.area && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-orange-200">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área Territorial</p>
                  <p className="font-medium">
                    {city.area.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²
                  </p>
                </div>
              </div>
              {density && (
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Densidade</p>
                    <p className="font-medium">{density} hab/km²</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações de DDD */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-600" />
            Código DDD {mainDDD.code}
          </CardTitle>
          <CardDescription>
            Como fazer ligações para {city.name} usando o código {mainDDD.code}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Do mesmo estado:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                {mainDDD.code} + número
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">De outro estado:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                0 + {mainDDD.code} + número
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Do exterior:</h4>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                +55 + {mainDDD.code} + número
              </p>
            </div>
          </div>
          
          {dddCodes.length > 1 && (
            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Outros Códigos DDD</h4>
              <div className="flex flex-wrap gap-2">
                {dddCodes.slice(1).map((ddd) => (
                  <Badge key={ddd.code} variant="outline">
                    DDD {ddd.code}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Especial */}
      {city.isCapital && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-yellow-600" />
              Capital do Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-lg text-yellow-800 mb-2">
                {city.name} - Capital de {state.name}
              </h3>
              <p className="text-sm text-yellow-700">
                Como capital do estado, {city.name} é o principal centro político, 
                administrativo e econômico de {state.name}, sediando os principais 
                órgãos governamentais e concentrando grande parte da atividade econômica da região.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações Regionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Regionais</CardTitle>
          <CardDescription>
            Contexto geográfico e administrativo de {city.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Localização</h4>
            <p className="text-sm text-gray-600">
              {city.name} está localizada na região {state.region.toLowerCase()} do Brasil, 
              no estado de {state.name}. A cidade faz parte da lista de municípios 
              que utilizam o código DDD {mainDDD.code} para ligações interurbanas.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Sistema de Telefonia</h4>
            <p className="text-sm text-gray-600">
              O código DDD {mainDDD.code} cobre {city.name} e outras cidades da região, 
              garantindo integração telefônica com todo o território nacional. 
              Todas as principais operadoras de telefonia móvel e fixa atendem à cidade.
            </p>
          </div>
          {mainDDD.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Cobertura do DDD</h4>
              <p className="text-sm text-gray-600">
                {mainDDD.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dados Demográficos */}
      {(city.population || city.area) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Dados Demográficos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.population && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {city.population.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-sm text-green-600">Habitantes</p>
                </div>
              )}
              {city.area && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {city.area.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²
                  </div>
                  <p className="text-sm text-blue-600">Área Territorial</p>
                </div>
              )}
            </div>
            {density && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {density} hab/km²
                  </div>
                  <p className="text-sm text-purple-600">Densidade Demográfica</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}