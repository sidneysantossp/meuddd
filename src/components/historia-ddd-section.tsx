'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp, BookOpen, Calendar, Users, MapPin, ExternalLink, Award, Clock } from 'lucide-react'

export function HistoriaDDDSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header da seção */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A História Completa do Sistema DDD no Brasil
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra como o sistema de Discagem Direta à Distância transformou as comunicações 
            no Brasil e conheça a evolução dos códigos telefônicos em todos os 27 estados.
          </p>
        </div>

        {/* Conteúdo principal */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className={`prose prose-lg max-w-none ${!isExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
              {/* Introdução */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Origens do Sistema Telefônico Brasileiro
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>A história do DDD (Discagem Direta à Distância) no Brasil</strong> é uma jornada fascinante 
                  que reflete o desenvolvimento tecnológico e a expansão das comunicações em nosso país. 
                  Antes da implementação do sistema DDD, fazer uma ligação interurbana era um processo complexo 
                  que exigia a intervenção de telefonistas e podia levar vários minutos para ser completado.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  O sistema telefônico brasileiro começou a tomar forma nas primeiras décadas do século XX, 
                  mas foi apenas na <strong>década de 1960</strong> que o Brasil implementou oficialmente o sistema DDD, 
                  revolucionando a forma como os brasileiros se comunicavam entre diferentes estados e municípios. 
                  Esta transformação marcou o início de uma nova era na conectividade nacional.
                </p>
              </div>

              {/* Primeiros Códigos DDD */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Os Primeiros Códigos DDD Implementados
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Em <strong>1969</strong>, o Brasil deu seu primeiro passo rumo à modernização telefônica com a 
                  implementação dos primeiros códigos DDD. As cidades mais importantes do país foram as pioneiras 
                  a receber este sistema, incluindo:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Rio de Janeiro (DDD 21)</strong> - Capital federal na época e centro político do país</li>
                  <li><strong>São Paulo (DDD 11)</strong> - Maior centro econômico e industrial</li>
                  <li><strong>Belo Horizonte (DDD 31)</strong> - Importante hub mineiro</li>
                  <li><strong>Porto Alegre (DDD 51)</strong> - Principal centro sulista</li>
                  <li><strong>Salvador (DDD 71)</strong> - Capital nordestina mais populosa</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Esses primeiros códigos foram estrategicamente escolhidos para conectar os principais centros 
                  econômicos e políticos do país, facilitando as comunicações empresariais e governamentais. 
                  A <strong>Anatel (Agência Nacional de Telecomunicações)</strong>, criada décadas depois, 
                  seria responsável por regulamentar e expandir este sistema para todo o território nacional.
                </p>
              </div>

              {/* Expansão Regional */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Expansão Regional e Desenvolvimento
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>expansão do sistema DDD</strong> para todas as regiões brasileiras foi um processo gradual 
                  que acompanhou o desenvolvimento econômico e demográfico do país. Cada região brasileira desenvolveu 
                  suas próprias características de implementação:
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
                  <h4 className="font-bold text-blue-900 mb-2">Região Sudeste</h4>
                  <p className="text-blue-800">
                    Foi a primeira região a receber cobertura completa de DDD, com códigos como 11, 12, 13, 14, 15, 16, 17, 18, 19 (São Paulo), 
                    21, 22, 24 (Rio de Janeiro), 27, 28 (Espírito Santo) e 31, 32, 33, 34, 35, 37, 38 (Minas Gerais).
                  </p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
                  <h4 className="font-bold text-green-900 mb-2">Região Nordeste</h4>
                  <p className="text-green-800">
                    Com códigos distribuídos estrategicamente: 71, 73, 74, 75, 77 (Bahia), 81, 87 (Pernambuco), 
                    82 (Alagoas), 83 (Paraíba), 84 (Rio Grande do Norte), 85, 88 (Ceará), 86, 89 (Piauí), 98, 99 (Maranhão) e 79 (Sergipe).
                  </p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-4">
                  <h4 className="font-bold text-purple-900 mb-2">Região Sul</h4>
                  <p className="text-purple-800">
                    Códigos bem distribuídos: 41, 42, 43, 44, 45, 46 (Paraná), 47, 48, 49 (Santa Catarina) e 51, 53, 54, 55 (Rio Grande do Sul).
                  </p>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-4">
                  <h4 className="font-bold text-orange-900 mb-2">Região Centro-Oeste</h4>
                  <p className="text-orange-800">
                    Códigos essenciais para o desenvolvimento do agronegócio: 61 (Distrito Federal), 62, 64 (Goiás), 
                    65, 66 (Mato Grosso) e 67 (Mato Grosso do Sul).
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
                  <h4 className="font-bold text-red-900 mb-2">Região Norte</h4>
                  <p className="text-red-800">
                    Códigos para a Amazônia: 68 (Acre), 69 (Rondônia), 92, 97 (Amazonas), 93, 94 (Pará), 
                    95 (Roraima), 96 (Amapá) e 63 (Tocantins).
                  </p>
                </div>
              </div>

              {/* Impacto Econômico */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Impacto Econômico e Social do Sistema DDD
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  A implementação do <strong>sistema DDD no Brasil</strong> teve um impacto transformador na economia 
                  e na sociedade brasileira. As comunicações interurbanas tornaram-se essenciais para:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Desenvolvimento empresarial</strong> - Empresas puderam expandir operações nacionalmente</li>
                  <li><strong>Integração familiar</strong> - Brasileiros puderam manter contato com parentes em outros estados</li>
                  <li><strong>Comércio eletrônico</strong> - Facilitou transações comerciais entre diferentes regiões</li>
                  <li><strong>Turismo</strong> - Viajantes puderam facilmente se comunicar com familiares e negócios</li>
                  <li><strong>Serviços essenciais</strong> - Saúde, educação e segurança pública se tornaram mais acessíveis</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Segundo dados do <strong>Ministério das Comunicações</strong>, o sistema telefônico brasileiro cresceu 
                  exponencialmente nas décadas seguintes, passando de poucos milhões de linhas na década de 1970 
                  para mais de 200 milhões de linhas ativas atualmente, incluindo telefones móveis e fixos.
                </p>
              </div>

              {/* Tecnologia e Inovação */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Evolução Tecnológica e Modernização
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>tecnologia DDD evoluiu significativamente</strong> desde sua implementação inicial. 
                  Dos sistemas analógicos às redes digitais de fibra óptica, a infraestrutura telefônica brasileira 
                  passou por diversas transformações:
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Marcos Tecnológicos Importantes:</h4>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-4">
                  <li>
                    <strong>1970s - Sistemas Analógicos</strong>: Primeiras centrais automáticas com discagem direta
                  </li>
                  <li>
                    <strong>1980s - Digitalização</strong>: Implementação das primeiras centrais digitais
                  </li>
                  <li>
                    <strong>1990s - Privatização</strong>: Abertura do mercado e modernização da infraestrutura
                  </li>
                  <li>
                    <strong>2000s - Telefonia Móvel</strong>: Expansão massiva dos celulares e novos códigos DDD
                  </li>
                  <li>
                    <strong>2010s - 4G e Fibra</strong>: Redes de alta velocidade e VoIP
                  </li>
                  <li>
                    <strong>2020s - 5G e IoT</strong>: Conectividade total e novas aplicações
                  </li>
                </ol>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>Anatel</strong> tem papel fundamental na regulação deste setor, garantindo a qualidade 
                  dos serviços e a expansão da cobertura para todas as regiões brasileiras, incluindo áreas rurais 
                  e comunidades isoladas.
                </p>
              </div>

              {/* Curiosidades e Dados */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Curiosidades e Dados Interessantes sobre DDD
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Maior DDD
                    </h4>
                    <p className="text-gray-700">
                      O DDD 11 (São Paulo) é o mais utilizado, com milhões de linhas ativas na maior metrópole da América Latina.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
                      Menor DDD
                    </h4>
                    <p className="text-gray-700">
                      O DDD 68 (Acre) atende à menor população entre os estados brasileiros, com aproximadamente 900 mil habitantes.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      DDD Mais Novo
                    </h4>
                    <p className="text-gray-700">
                      Alguns códigos como 93, 94 e 95 foram implementados mais recentemente para atender à demanda crescente.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-600" />
                      Recorde de Ligações
                    </h4>
                    <p className="text-gray-700">
                      O Brasil realiza bilhões de ligações interurbanas anualmente, demonstrando a importância do sistema DDD.
                    </p>
                  </div>
                </div>
              </div>

              {/* Futuro do Sistema */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  O Futuro do Sistema DDD no Brasil
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  O <strong>futuro do sistema DDD</strong> promete ainda mais inovações. Com a implementação do 5G 
                  e a expansão das redes de fibra óptica, as comunicações no Brasil continuarão evoluindo. 
                  A Anatel e as operadoras de telecomunicações trabalham em projetos como:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Portabilidade numérica aprimorada</strong> - Facilitando a mudança entre operadoras</li>
                  <li><strong>Novos códigos DDD</strong> - Para atender à crescente demanda</li>
                  <li><strong>Integração com VoIP</strong> - Comunicações via internet mais eficientes</li>
                  <li><strong>Cobertura universal</strong> - Levando conectividade a todos os brasileiros</li>
                  <li><strong>Redes 5G</strong> - Comunicações ultra-rápidas e confiáveis</li>
                </ul>
              </div>

              {/* Referências e Fontes */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Referências e Fontes Oficiais
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Este conteúdo foi baseado em informações oficiais e fontes de autoridade que garantem 
                  a veracidade e atualização dos dados apresentados:
                </p>
                
                <div className="space-y-3">
                  <a 
                    href="https://www.gov.br/anatel/pt-br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Agência Nacional de Telecomunicações (Anatel)
                  </a>
                  
                  <a 
                    href="https://www.gov.br/comunicacoes/pt-br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ministério das Comunicações
                  </a>
                  
                  <a 
                    href="https://www.brasiltelecom.com.br/historia-telefonia-brasil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    História da Telefonia no Brasil
                  </a>
                  
                  <a 
                    href="https://www.ibge.gov.br/estatisticas/sociais/populacao.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    IBGE - Dados Demográficos
                  </a>
                </div>
              </div>

              {/* Conclusão */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Conclusão: A Importância do Sistema DDD
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  O <strong>sistema DDD brasileiro</strong> representa muito mais do que simples códigos telefônicos. 
                  É uma conquista tecnológica que unificou um país continental, permitiu o desenvolvimento econômico 
                  e transformou a forma como os brasileiros se comunicam. Desde sua implementação na década de 1960 
                  até os dias atuais, o sistema evoluiu continuamente, adaptando-se às novas tecnologias e necessidades.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hoje, com <strong>67 códigos DDD diferentes</strong> cobrindo todo o território nacional, o Brasil 
                  possui uma das redes de telecomunicações mais completas do mundo em desenvolvimento. 
                  A história do DDD é, em essência, a história da integração e do progresso do Brasil.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Para consultar informações atualizadas sobre códigos DDD, regulamentações e novidades do setor, 
                  sempre consulte as fontes oficiais como a <strong>Anatel</strong> e o <strong>Ministério das Comunicações</strong>, 
                  garantindo acesso a informações precisas e confiáveis.
                </p>
              </div>
            </div>

            {/* Botão Leia Mais */}
            <div className="text-center mt-8">
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                className="flex items-center gap-2 mx-auto hover:bg-blue-50 hover:border-blue-300"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Ler Menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Leia Mais...
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">67</div>
              <div className="text-gray-700 font-semibold">Códigos DDD</div>
              <div className="text-gray-600 text-sm">Cobrindo todo o Brasil</div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">27</div>
              <div className="text-gray-700 font-semibold">Estados</div>
              <div className="text-gray-600 text-sm">Unidades federativas</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">55+</div>
              <div className="text-gray-700 font-semibold">Anos</div>
              <div className="text-gray-600 text-sm">De história do DDD</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}