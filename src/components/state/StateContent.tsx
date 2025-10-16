import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building, Globe, Phone } from 'lucide-react';

interface StateContentProps {
  state: {
    name: string;
    code: string;
    region: string;
    population?: number;
    area?: number;
    capital?: string;
  };
  mainDDD: {
    code: string;
    description?: string;
  };
  cities: Array<{
    id: string;
    name: string;
    population?: number;
    isCapital?: boolean;
  }>;
}

export function StateContent({ state, mainDDD, cities }: StateContentProps) {
  const totalPopulation = cities.reduce((acc, city) => acc + (city.population || 0), 0);
  const density = state.area && totalPopulation ? Math.round(totalPopulation / state.area) : null;

  return (
    <div className="space-y-6">
      {/* Card de Informações do Estado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-orange-600" />
            Sobre {state.name}
          </CardTitle>
          <CardDescription>
            Informações geográficas e demográficas do estado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Região</p>
                <p className="font-medium">{state.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">População</p>
                <p className="font-medium">
                  {totalPopulation ? totalPopulation.toLocaleString('pt-BR') : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cidades</p>
                <p className="font-medium">{cities.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">DDD Principal</p>
                <p className="font-medium">{mainDDD.code}</p>
              </div>
            </div>
          </div>
          
          {state.area && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área Territorial</p>
                  <p className="font-medium">
                    {state.area.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²
                  </p>
                </div>
              </div>
              {density && (
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Densidade Demográfica</p>
                    <p className="font-medium">{density} hab/km²</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Capital */}
      {state.capital && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-yellow-600" />
              Capital do Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <h3 className="font-bold text-lg text-yellow-800">{state.capital}</h3>
                <p className="text-sm text-yellow-600">
                  Capital de {state.name} e principal centro político e administrativo
                </p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Capital
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribuição de Cidades por População */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição das Cidades</CardTitle>
          <CardDescription>
            Análise demográfica dos municípios de {state.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {cities.filter(c => (c.population || 0) > 100000).length}
                </div>
                <p className="text-sm text-blue-600">Cidades +100k hab.</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {cities.filter(c => (c.population || 0) >= 50000 && (c.population || 0) <= 100000).length}
                </div>
                <p className="text-sm text-green-600">Cidades 50k-100k hab.</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {cities.filter(c => (c.population || 0) < 50000).length}
                </div>
                <p className="text-sm text-purple-600">Cidades -50k hab.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Curiosidades */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Relevantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Sistema de DDD</h4>
            <p className="text-sm text-gray-600">
              {state.name} utiliza o código DDD {mainDDD.code} para ligações interurbanas. 
              Este código é essencial para conectar as {cities.length} cidades do estado 
              com o resto do Brasil e o mundo.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Desenvolvimento Regional</h4>
            <p className="text-sm text-gray-600">
              Com {cities.length} municípios, {state.name} apresenta uma distribuição 
              populacional que reflete seu desenvolvimento econômico e social, 
              concentrando {Math.round((totalPopulation / (state.population || totalPopulation)) * 100)}% 
              da população oficial do estado nas cidades cadastradas.
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
    </div>
  );
}