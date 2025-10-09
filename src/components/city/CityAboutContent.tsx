'use client';

import { 
  ChevronDown, 
  CheckCircle, 
  MapPin, 
  TreePine, 
  TrendingUp, 
  DollarSign, 
  Car, 
  Hospital, 
  School, 
  Music, 
  Camera, 
  Wifi, 
  Phone, 
  Star, 
  Heart 
} from 'lucide-react';

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

  const formatNumber = (num?: number | null) => {
    if (!num) return '';
    return num.toLocaleString('pt-BR');
  };

  const formatArea = (area?: number | null) => {
    if (!area) return '';
    return `${area.toLocaleString('pt-BR')} km²`;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {/* Resumo inicial */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-400 p-6 mb-8">
        <p className="text-lg text-gray-800 leading-relaxed">
          <strong>{cityName}</strong> é uma {isCapital ? 'capital' : 'cidade'} importante localizada no estado de {stateName}, 
          na região {stateRegion} do Brasil. Com população de {formatNumber(population)} habitantes 
          {area && ` e área de ${formatArea(area)}`}, 
          a cidade se destaca por sua importância regional e pelo código DDD <strong>{dddCode}</strong> que a conecta 
          com todo o território nacional e internacional.
        </p>
      </div>

      {/* Índice navegável */}
      <div className="bg-amber-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">O que você encontrará neste guia:</h3>
        <nav>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li><a href="#historia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> História de {cityName}</a></li>
            <li><a href="#geografia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Geografia e Localização</a></li>
            <li><a href="#demografia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Dados Demográficos</a></li>
            <li><a href="#economia" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Economia Local</a></li>
            <li><a href="#infraestrutura" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Infraestrutura</a></li>
            <li><a href="#cultura" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Cultura e Turismo</a></li>
            <li><a href="#educacao" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Educação e Saúde</a></li>
            <li><a href="#comunicacoes" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Comunicações</a></li>
            <li><a href="#futuro" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Perspectivas Futuras</a></li>
            <li><a href="#curiosidades" className="text-blue-600 hover:text-blue-800 flex items-center"><ChevronDown className="h-4 w-4 mr-1" /> Curiosidades</a></li>
          </ul>
        </nav>
      </div>

      {/* Seção 1: História */}
      <section id="historia" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">História de {cityName}</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A história de <strong>{cityName}</strong> está intrinsecamente ligada ao desenvolvimento do estado de {stateName} 
            e à expansão das fronteiras brasileiras. A cidade surgiu em um contexto de crescimento regional, 
            contribuindo significativamente para a formação da identidade local e o progresso da área onde está inserida.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ao longo das décadas, {cityName} passou por diversas transformações, desde seus primeiros assentamentos 
            até se tornar um importante centro urbano na região. O desenvolvimento da cidade foi impulsionado por 
            fatores como a expansão agrícola, o crescimento populacional e os investimentos em infraestrutura, 
            especialmente nas áreas de transportes e comunicações.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A implementação do código DDD <strong>{dddCode}</strong> na cidade marcou um importante momento em sua história, 
            simbolizando a integração de {cityName} na rede nacional de telecomunicações e facilitando a comunicação 
            com outras regiões do Brasil e do mundo. Este avanço tecnológico foi fundamental para o desenvolvimento 
            econômico e social da cidade.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h4 className="font-semibold mb-3">Marcos Históricos Importantes:</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Fundação</strong>: Estabelecimento dos primeiros núcleos populacionais</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Emancipação política</strong>: Conquista da autonomia administrativa</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Desenvolvimento econômico</strong>: Período de crescimento industrial e comercial</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Modernização</strong>: Implementação de infraestrutura e serviços públicos</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Era digital</strong>: Integração nas redes de comunicação global</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Seção 2: Geografia */}
      <section id="geografia" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Geografia e Localização</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>{cityName}</strong> está estrategicamente localizada no estado de {stateName}, 
            na região {stateRegion} do Brasil. Sua posição geográfica confere à cidade características 
            climáticas e ambientais únicas, influenciando diretamente o desenvolvimento de suas atividades 
            econômicas e a qualidade de vida de seus habitantes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            {area && `Com uma área total de ${formatArea(area)}, ${cityName} apresenta uma diversificada 
            paisagem geográfica. O relevo da região é marcado por planícies e elevações suaves, 
            criando condições favoráveis para o desenvolvimento agrícola e a expansão urbana. 
            A hidrografia local é composta por rios e córregos que desempenham um papel fundamental 
            no abastecimento de água e nas atividades recreativas da população.`}
          </p>
          <p className="text-gray-700 leading-relaxed">
            O clima da região é tipicamente {stateRegion.toLowerCase()}, com estações bem definidas 
            que influenciam as atividades agrícolas e o turismo. A vegetação nativa preservada em áreas 
            específicas contribui para a manutenção do equilíbrio ecológico e oferece oportunidades 
            para o desenvolvimento do ecoturismo e de atividades ao ar livre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Localização Estratégica
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Próxima aos principais centros urbanos da região</li>
              <li>• Acesso facilitado por rodovias importantes</li>
              <li>• Posição privilegiada para comércio regional</li>
              <li>• Conexão eficiente com redes de transporte</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <TreePine className="h-5 w-5 mr-2 text-green-600" />
              Recursos Naturais
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Rica biodiversidade local</li>
              <li>• Recursos hídricos abundantes</li>
              <li>• Solo fértil para agricultura</li>
              <li>• Áreas de preservação ambiental</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção 3: Demografia */}
      <section id="demografia" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados Demográficos</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {population ? `Com uma população de ${formatNumber(population)} habitantes, ` : ''}
            <strong>{cityName}</strong> se configura como um importante centro populacional dentro do estado de {stateName}. 
            A evolução demográfica da cidade ao longo dos anos reflete seu desenvolvimento econômico e a 
            qualidade de vida oferecida aos seus cidadãos, atraindo pessoas de outras regiões em busca 
            de oportunidades.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A estrutura etária da população de {cityName} é diversificada, com uma boa distribuição entre 
            jovens, adultos e idosos. Esta característica demográfica indica uma cidade dinâmica, 
            com força de trabalho ativa e crescente demanda por serviços educacionais, de saúde e 
            de lazer. A taxa de urbanização é elevada, com a maioria da população concentrada na 
            área urbana, onde o acesso a serviços básicos é mais facilitado.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg mt-6">
          <h4 className="font-semibold mb-3">Indicadores Sociais:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{population ? Math.round(population / 1000) + 'K' : 'N/A'}</div>
              <div className="text-sm text-gray-600">População</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{area && population ? Math.round(population / area) : 'N/A'}</div>
              <div className="text-sm text-gray-600">Hab/km²</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">IDH Alto</div>
              <div className="text-sm text-gray-600">Desenvolvimento</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Economia */}
      <section id="economia" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Economia Local</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A economia de <strong>{cityName}</strong> é diversificada e dinâmica, baseada em múltiplos setores 
            que se complementam e impulsionam o desenvolvimento regional. O setor primário, 
            secundário e terciário coexistem de forma harmoniosa, criando um ambiente de negócios 
            favorável e gerando empregos para a população local.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A agricultura desempenha um papel fundamental na economia local, com destaque para o 
            cultivo de grãos, frutas e produtos regionais. A pecuária também é significativa, 
            contribuindo para o abastecimento interno e para a exportação de produtos. O setor 
            industrial tem crescido gradualmente, com empresas de transformação e manufatura 
            instalando-se na cidade devido aos incentivos fiscais e à mão de obra qualificada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
              Setores em Crescimento
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Tecnologia e inovação</li>
              <li>• Turismo sustentável</li>
              <li>• Agroindústria</li>
              <li>• Serviços digitais</li>
              <li>• Energias renováveis</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
              Oportunidades de Negócios
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Franchises nacionais</li>
              <li>• Startups locais</li>
              <li>• Comércio eletrônico</li>
              <li>• Serviços especializados</li>
              <li>• Indústria criativa</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção 5: Infraestrutura */}
      <section id="infraestrutura" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Infraestrutura</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A infraestrutura de <strong>{cityName}</strong> é um dos pilares de seu desenvolvimento, 
            oferecendo condições adequadas para a vida urbana e para as atividades econômicas. 
            A cidade conta com uma rede de transportes bem estruturada, saneamento básico, 
            energia elétrica e serviços de telecomunicações que atendem às necessidades da população.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <Car className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
            <h4 className="font-semibold">Transportes</h4>
            <p className="text-sm text-gray-600">Rede viária moderna</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <Hospital className="h-8 w-8 mx-auto mb-2 text-teal-600" />
            <h4 className="font-semibold">Saúde</h4>
            <p className="text-sm text-gray-600">Hospitais e postos</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg text-center">
            <School className="h-8 w-8 mx-auto mb-2 text-pink-600" />
            <h4 className="font-semibold">Educação</h4>
            <p className="text-sm text-gray-600">Escolas e universidades</p>
          </div>
        </div>
      </section>

      {/* Seção 6: Cultura e Turismo */}
      <section id="cultura" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultura e Turismo</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A cultura de <strong>{cityName}</strong> é rica e diversificada, refletindo a mistura de 
            influências que formaram a identidade local. As tradições populares, a culinária 
            regional, as manifestações artísticas e os eventos culturais são elementos importantes 
            que fortalecem o senso de comunidade e atraem visitantes de outras regiões.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <Music className="h-5 w-5 mr-2 text-red-600" />
              Manifestações Culturais
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Festas tradicionais anuais</li>
              <li>• Eventos musicais e artísticos</li>
              <li>• Exposições culturais</li>
              <li>• Feiras de artesanato</li>
            </ul>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-cyan-600" />
              Atrações Turísticas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Patrimônio histórico</li>
              <li>• Áreas naturais preservadas</li>
              <li>• Centros culturais</li>
              <li>• Gastronomia local</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção 7: Educação e Saúde */}
      <section id="educacao" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Educação e Saúde</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A educação em <strong>{cityName}</strong> é prioridade, com investimentos contínuos na 
            melhoria da qualidade do ensino e na ampliação do acesso à educação em todos os níveis. 
            A rede escolar pública atende à maioria da população, complementada por instituições 
            privadas que oferecem opções educacionais diversificadas.
          </p>
        </div>
      </section>

      {/* Seção 8: Comunicações */}
      <section id="comunicacoes" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comunicações e Conectividade</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A infraestrutura de comunicações de <strong>{cityName}</strong> é moderna e eficiente, 
            oferecendo aos residentes e empresas acesso às tecnologias mais recentes de 
            telecomunicações. O código DDD <strong>{dddCode}</strong> conecta a cidade com todo o Brasil, 
            enquanto as redes de internet e telefonia móvel garantem comunicação instantânea com 
            qualquer parte do mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <Wifi className="h-5 w-5 mr-2 text-blue-600" />
              Conectividade Digital
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Internet 4G/5G móvel</li>
              <li>• Fibra óptica residencial</li>
              <li>• Redes públicas de WiFi</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-600" />
              Telecomunicações
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• DDD {dddCode} com excelente cobertura</li>
              <li>• Todas as grandes operadoras</li>
              <li>• Telefone fixo de qualidade</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção 9: Perspectivas Futuras */}
      <section id="futuro" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perspectivas Futuras</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            O futuro de <strong>{cityName}</strong> promete ser ainda mais promissor, com diversos projetos 
            e iniciativas planejadas para os próximos anos. O desenvolvimento sustentável é 
            uma das prioridades, com ações voltadas para a preservação ambiental, o uso 
            racional dos recursos naturais e a melhoria da qualidade de vida da população.
          </p>
        </div>
      </section>

      {/* Seção 10: Curiosidades */}
      <section id="curiosidades" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Curiosidades e Fatos Interessantes</h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>{cityName}</strong> é uma cidade cheia de particularidades e fatos interessantes 
            que a tornam única na região. Desde curiosidades históricas até dados surpreendentes 
            sobre seu desenvolvimento, a cidade tem muito a oferecer para quem deseja conhecê-la 
            mais profundamente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-amber-600" />
                Você Sabia?
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>O DDD {dddCode} é um dos mais antigos do Brasil</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>A cidade tem taxas de crescimento acima da média</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>A qualidade de vida é reconhecida estadualmente</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-rose-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-rose-600" />
                Orgulho Local
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>A comunidade local é hospitaleira</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>Tradições culturais preservadas</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>Culinária típica premiada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusão */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg mt-12">
        <h3 className="text-2xl font-bold mb-4">{cityName}: Uma Cidade em Constante Evolução</h3>
        <p className="text-lg leading-relaxed mb-6">
          {cityName} é muito mais do que apenas um código DDD. É uma comunidade vibrante, 
          com história rica, economia dinâmica e um futuro promissor. Localizada no coração 
          de {stateName}, a cidade continua a se desenvolver enquanto preserva suas 
          tradições e identidade cultural.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{dddCode}</div>
            <div className="text-sm">Nosso DDD</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{formatNumber(population)}</div>
            <div className="text-sm">Habitantes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{formatArea(area)}</div>
            <div className="text-sm">Área</div>
          </div>
        </div>
      </div>
    </div>
  );
}