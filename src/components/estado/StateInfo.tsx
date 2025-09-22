import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, MapPin, Building, TrendingUp, Award, Clock, Star } from 'lucide-react';

interface StateInfoProps {
  state: {
    name: string;
    code: string;
    region: string;
    population?: number | null;
    area?: number | null;
    capital?: string | null;
    dddCodes: Array<{
      code: string;
      description?: string | null;
    }>;
  };
}

export function StateInfo({ state }: StateInfoProps) {
  const formatNumber = (num?: number | null) => {
    if (!num) return '';
    return num.toLocaleString('pt-BR');
  };

  const formatArea = (area?: number | null) => {
    if (!area) return '';
    return `${area.toLocaleString('pt-BR')} km²`;
  };

  const getRegionInfo = (region: string) => {
    const regionInfo = {
      'Norte': {
        description: 'A maior região do Brasil em área, cobrindo a Amazônia e conhecida por sua biodiversidade e riqueza natural.',
        color: 'bg-green-100 text-green-800',
        characteristics: ['Floresta Amazônica', 'Biodiversidade', 'Recursos naturais', 'Cultura indígena']
      },
      'Nordeste': {
        description: 'Região com maior diversidade cultural do Brasil, conhecida por suas praias, cultura popular e tradições históricas.',
        color: 'bg-yellow-100 text-yellow-800',
        characteristics: ['Cultura rica', 'Praias paradisíacas', 'Tradições históricas', 'Culinária diversificada']
      },
      'Centro-Oeste': {
        description: 'Coração geográfico do Brasil, dominado pelo Cerrado e conhecido por sua agricultura e o Pantanal.',
        color: 'bg-orange-100 text-orange-800',
        characteristics: ['Agricultura forte', 'Pantanal', 'Cerrado', 'Planalto Central']
      },
      'Sudeste': {
        description: 'Região mais desenvolvida e populosa do Brasil, centro econômico e industrial do país.',
        color: 'bg-blue-100 text-blue-800',
        characteristics: ['Centro econômico', 'Indústria forte', 'Maior população', 'Desenvolvimento']
      },
      'Sul': {
        description: 'Região com forte influência europeia, conhecida por seu clima temperado e agricultura desenvolvida.',
        color: 'bg-purple-100 text-purple-800',
        characteristics: ['Clima temperado', 'Influência europeia', 'Agricultura forte', 'Desenvolvimento humano']
      }
    };

    return regionInfo[region as keyof typeof regionInfo] || {
      description: 'Região brasileira com características únicas e cultura diversificada.',
      color: 'bg-gray-100 text-gray-800',
      characteristics: ['Diversidade cultural', 'Tradições locais', 'Desenvolvimento regional']
    };
  };

  const regionData = getRegionInfo(state.region);

  const getStateFacts = (stateName: string) => {
    // Facts específicos por estado (pode ser expandido)
    const facts: Record<string, string[]> = {
      'São Paulo': [
        'Maior centro econômico da América Latina',
        'Cidade mais populosa do Brasil',
        'Principal hub cultural e de negócios',
        'Centro da indústria automobilística brasileira'
      ],
      'Rio de Janeiro': [
        'Cidade maravilhosa e antiga capital do Brasil',
        'Berço do samba e carnaval',
        'Maior produção de petróleo do país',
        'Centro turístico internacional'
      ],
      'Minas Gerais': [
        'Berço da independência do Brasil',
        'Maior produtor de café e leite',
        'Riqueza histórica e arquitetura colonial',
        'Centro mineralógico do país'
      ],
      'Bahia': [
        'Primeira capital do Brasil',
        'Maior baía do país',
        'Centro da cultura afro-brasileira',
        'Berço do movimento tropicalista'
      ]
    };

    return facts[stateName] || [
      'Estado com importância estratégica no desenvolvimento nacional',
      'Contribuição significativa para a economia brasileira',
      'Riqueza cultural e tradições locais',
      'Potencial de crescimento e desenvolvimento'
    ];
  };

  const stateFacts = getStateFacts(state.name);

  return (
    <div className="space-y-6">
      {/* Main State Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            Sobre {state.name}
          </CardTitle>
          <CardDescription>
            Informações completas sobre o estado, sua geografia, economia e características principais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(state.population)}
                </div>
                <div className="text-sm text-gray-600">Habitantes</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatArea(state.area)}
                </div>
                <div className="text-sm text-gray-600">Área</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {state.capital || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Capital</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {state.dddCodes.length}
                </div>
                <div className="text-sm text-gray-600">Códigos DDD</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Região {state.region}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge className={`${regionData.color} mb-3`}>
                {state.region}
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                {regionData.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Características Principais:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {regionData.characteristics.map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">{char}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Facts and Curiosities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Curiosidades e Destaques de {state.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stateFacts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Economic and Social Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Importância Econômica e Social
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contribuição Nacional:</h4>
              <p className="text-gray-700 leading-relaxed">
                {state.name} desempenha um papel fundamental no desenvolvimento do Brasil, contribuindo 
                significativamente para a economia, cultura e formação da identidade nacional. Com sua 
                localização estratégica na região {state.region}, o estado serve como importante centro 
                de conexão e desenvolvimento regional.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Infraestrutura de Telecomunicações:</h4>
              <p className="text-gray-700 leading-relaxed">
                O estado conta com {state.dddCodes.length} códigos DDD diferentes, distribuindo a cobertura 
                telefônica por todo o território. Esta estrutura permite uma comunicação eficiente entre 
                as {state.population ? formatNumber(state.population) : 'diversas'} pessoas que habitam 
                a região, conectando cidades, comunidades e centros urbanos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Desenvolvimento Regional:</h4>
              <p className="text-gray-700 leading-relaxed">
                Com área de {formatArea(state.area)} e população de {formatNumber(state.population)} habitantes, 
                {state.name} apresenta um índice de desenvolvimento que reflete a importância do estado 
                no contexto nacional. A capital {state.capital} serve como principal centro administrativo 
                e econômico, atraindo investimentos e oportunidades.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Contexto Histórico e Cultural
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Formação Histórica:</h4>
              <p className="text-gray-700 leading-relaxed">
                A história de {state.name} está intrinsecamente ligada à formação do Brasil como nação. 
                Desde os primórdios da colonização até os dias atuais, o estado tem desempenhado papéis 
                significativos nos processos políticos, econômicos e sociais que moldaram o país.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Diversidade Cultural:</h4>
              <p className="text-gray-700 leading-relaxed">
                A cultura de {state.name} reflete a rica diversidade do povo brasileiro, com influências 
                indígenas, africanas, europeias e de outras imigrações que contribuíram para formar a 
                identidade única do estado. Esta diversidade se manifesta nas tradições, culinária, 
                música, arte e nas festas populares que celebram a cultura local.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Perspectivas Futuras:</h4>
              <p className="text-gray-700 leading-relaxed">
                O futuro de {state.name} promete continuado desenvolvimento e crescimento, com investimentos 
                em infraestrutura, tecnologia e sustentabilidade. O estado está posicionado para continuar 
                contribuindo significativamente para o progresso do Brasil nas próximas décadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}