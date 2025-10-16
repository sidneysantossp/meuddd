import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Building, Calendar, BookOpen, Camera } from 'lucide-react'

interface CityAboutContentProps {
  cityName: string;
  stateName: string;
  stateRegion: string;
  population?: number | null;
  area?: number | null;
  isCapital: boolean;
  dddCode: string;
}

export function CityAboutContent({
  cityName,
  stateName,
  stateRegion,
  population,
  area,
  isCapital,
  dddCode
}: CityAboutContentProps) {
  const formatNumber = (num: number | null | undefined) => {
    if (!num) return 'N/A'
    return num.toLocaleString('pt-BR')
  }

  const formatArea = (area: number | null | undefined) => {
    if (!area) return 'N/A'
    return `${area.toLocaleString('pt-BR')} km²`
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Sobre {cityName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {cityName} é {isCapital ? 'a capital do estado' : 'um município do estado'} de {stateName}, 
              localizado na região {stateRegion} do Brasil. Com uma população de aproximadamente {formatNumber(population)} 
              habitantes e uma área territorial de {formatArea(area)}, a cidade desempenha um papel importante 
              no contexto regional e estadual.
            </p>
            <p className="text-gray-600 leading-relaxed">
              O código DDD {dddCode} conecta {cityName} com o resto do país, facilitando comunicações 
              tanto comerciais quanto pessoais. A cidade é servida por infraestrutura de telecomunicações 
              moderna, com cobertura das principais operadoras nacionais.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{stateName}</div>
              <div className="text-sm text-blue-700">Estado</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{formatNumber(population)}</div>
              <div className="text-sm text-green-700">População</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{formatArea(area)}</div>
              <div className="text-sm text-purple-700">Área</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Badge className="text-base px-3 py-1 bg-red-100 text-red-800">
                DDD {dddCode}
              </Badge>
              <div className="text-sm text-red-700 mt-2">Código Telefônico</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geografia e Localização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Localização Estratégica</h3>
            <p className="text-gray-600">
              {cityName} está estrategicamente localizado na região {stateRegion}, 
              {isCapital 
                ? ` servindo como centro político e administrativo do estado.`
                : ` contribuindo para o desenvolvimento econômico e social da região.`
              }
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Características Geográficas</h3>
            <p className="text-gray-600">
              O município possui uma área territorial de {formatArea(area)}, 
              com características geográficas típicas da região {stateRegion}. 
              O relevo, a vegetação e o clima local influenciam diretamente as atividades 
              econômicas e a qualidade de vida da população.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Acesso e Conectividade</h3>
            <p className="text-gray-600">
              A conectividade de {cityName} é garantida pelo código DDD {dddCode}, 
              que integra a cidade à rede nacional de telecomunicações. Esta conexão é 
              fundamental para o desenvolvimento econômico, educação, saúde e 
              comunicação social.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Economic Aspects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Economia e Desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Atividades Econômicas</h3>
            <p className="text-gray-600">
              A economia de {cityName} é diversificada, com destaque para 
              {isCapital 
                ? ' o setor de serviços, comércio e administração pública. Como capital,'
                : ' as atividades tradicionais da região, com'
              } 
              {' '}agricultura, comércio local e pequenas indústrias formando a base econômica municipal.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Infraestrutura de Telecomunicações</h3>
            <p className="text-gray-600">
              A infraestrutura de telecomunicações é um pilar para o desenvolvimento de {cityName}. 
              O código DDD {dddCode} representa mais do que um simples prefixo telefônico; 
              simboliza a conexão da cidade com o mundo digital, permitindo acesso a serviços, 
              educação à distância, telemedicina e oportunidades de negócios online.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Perspectivas Futuras</h3>
            <p className="text-gray-600">
              O futuro de {cityName} está ligado à sua capacidade de manter-se conectada 
              e competitiva. Investimentos em tecnologia digital, ampliação da cobertura 
              de internet móvel e modernização dos serviços telefônicos são essenciais 
              para o desenvolvimento sustentável do município.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cultural and Social Aspects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Cultura e Sociedade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Identidade Cultural</h3>
            <p className="text-gray-600">
              A cultura de {cityName} reflete a diversidade do estado de {stateName}, 
              com tradições, festas populares e manifestações culturais que fortalecem 
              a identidade local. A comunicação, facilitada pelo código DDD {dddCode}, 
              permite que essas expressões culturais se compartilhadas além das fronteiras municipais.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Comunidade e Integração</h3>
            <p className="text-gray-600">
              Com aproximadamente {formatNumber(population)} habitantes, {cityName} 
              mantém um forte senso de comunidade. A conectividade telefônica através do DDD {dddCode} 
              fortalece os laços familiares e comerciais, permitindo que moradores mantenham 
              contato com parentes em outras cidades e estados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Qualidade de Vida</h3>
            <p className="text-gray-600">
              A qualidade de vida em {cityName} é influenciada por diversos fatores, 
              incluindo acesso a serviços de saúde, educação, lazer e comunicação. 
              A disponibilidade de serviços telefônicos modernos com o código DDD {dddCode} 
              contribui significativamente para o bem-estar da população.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Historical Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Contexto Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Formação e Desenvolvimento</h3>
            <p className="text-gray-600">
              A história de {cityName} está entrelaçada com o desenvolvimento do estado de {stateName}. 
              Desde sua fundação, a cidade passou por diversas transformações, 
              adaptando-se às mudanças econômicas e sociais do país.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Evolução das Comunicações</h3>
            <p className="text-gray-600">
              A implementação do código DDD {dddCode} marcou uma importante fase na história 
              das comunicações de {cityName}. Este avanço tecnológico representou a modernização 
              dos serviços telefônicos e a integração definitiva da cidade na rede nacional de telecomunicações.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Patrimônio e Memória</h3>
            <p className="text-gray-600">
              O patrimônio histórico e cultural de {cityName} preserva as memórias e conquistas 
              de sua população. A capacidade de comunicação proporcionada pelo DDD {dddCode} 
              permite que estas histórias se compartilhadas com novas gerações e com o mundo exterior.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card>
        <CardHeader>
          <CardTitle>Conclusão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {cityName} representa muito mais do que simplesmente um ponto no mapa com o código DDD {dddCode}. 
              É uma comunidade vibrante, com história, cultura e potencial de crescimento. 
              A conectividade telefônica é um facilitador essencial para o desenvolvimento 
              econômico, social e cultural do município.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Seja {isCapital ? 'como capital estadual' : 'como importante município'}, {cityName} 
              continua a escrever sua história, mantendo suas tradições enquanto abraça as 
              oportunidades do mundo moderno. O código DDD {dddCode} segue como símbolo 
              desta conexão entre o passado, o presente e o futuro da cidade.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}