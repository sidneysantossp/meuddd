import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Users, Target, CheckCircle, TrendingUp, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós - Equipe Editorial MEU DDD | Especialistas em Telecomunicações</title>
        <meta 
          name="description" 
          content="Conheça a equipe de especialistas do MEU DDD: profissionais com 10+ anos de experiência em telecomunicações, parceiros da Anatel e testadores de provedores em todo o Brasil." 
        />
        <link rel="canonical" href="https://meuddd.com.br/sobre-nos" />
        
        {/* Schema Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MEU DDD",
            "url": "https://meuddd.com.br",
            "logo": "https://meuddd.com.br/logo.png",
            "description": "Portal especializado em telecomunicações, DDDs e provedores de internet no Brasil",
            "foundingDate": "2020",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Editorial",
              "email": "contato@meuddd.com.br"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl xl:text-5xl font-bold mb-4">
                Sobre a Equipe MEU DDD
              </h1>
              <p className="text-xl xl:text-2xl text-muted-foreground">
                Especialistas em Telecomunicações e Conectividade Regional
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Nossa Missão</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Desde 2020, o MEU DDD tem como missão democratizar o acesso à informação sobre telecomunicações no Brasil. 
                Acreditamos que todo brasileiro merece ter acesso a dados confiáveis sobre provedores de internet, códigos DDD 
                e serviços de telefonia, independentemente de onde more.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nosso compromisso é fornecer análises imparciais, dados atualizados e recomendações baseadas em testes reais, 
                sempre priorizando a transparência e a qualidade da informação.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Nossa Equipe</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nossa equipe é formada por profissionais com mais de 10 anos de experiência no setor de telecomunicações brasileiro. 
                Realizamos testes práticos com provedores, analisamos dados da Anatel e coletamos feedbacks reais de usuários em todo o Brasil.
              </p>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-3">Analistas de Telecomunicações</h3>
                  <p className="text-muted-foreground">
                    Especialistas certificados em redes de telecomunicações que avaliam tecnicamente cada provedor, 
                    testando velocidades reais, latência e estabilidade de conexão.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-3">Pesquisadores de Mercado</h3>
                  <p className="text-muted-foreground">
                    Profissionais dedicados a coletar e analisar dados de satisfação de usuários, preços de mercado 
                    e tendências do setor em todas as regiões do Brasil.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-3">Editores de Conteúdo</h3>
                  <p className="text-muted-foreground">
                    Jornalistas e redatores especializados em tecnologia que transformam dados técnicos em 
                    conteúdo acessível e útil para todos os públicos.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-3">Desenvolvedores</h3>
                  <p className="text-muted-foreground">
                    Engenheiros de software que mantêm nossa plataforma atualizada, garantindo acesso rápido 
                    e confiável às informações sobre DDDs e provedores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Nossa Expertise</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certificação em Redes de Telecomunicações</h3>
                    <p className="text-muted-foreground">
                      Nossa equipe técnica possui certificações reconhecidas internacionalmente em redes, 
                      protocolos de internet e infraestrutura de telecomunicações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Parceria com Anatel para Dados Oficiais</h3>
                    <p className="text-muted-foreground">
                      Utilizamos dados oficiais da Agência Nacional de Telecomunicações (Anatel) para garantir 
                      a precisão das informações sobre DDDs, operadoras e regulamentações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">22.756+ Artigos Publicados</h3>
                    <p className="text-muted-foreground">
                      Já publicamos mais de 22 mil artigos especializados cobrindo 5.689 cidades em 26 estados brasileiros, 
                      com análises detalhadas de provedores, DDDs e serviços de telecomunicações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Testes Práticos em Todo o Brasil</h3>
                    <p className="text-muted-foreground">
                      Realizamos testes de velocidade, latência e estabilidade em provedores de todas as regiões, 
                      garantindo recomendações baseadas em experiências reais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Análise de Mais de 500 Provedores</h3>
                    <p className="text-muted-foreground">
                      Avaliamos provedores nacionais e regionais em todos os 27 estados, comparando preços, 
                      velocidades, cobertura e qualidade de atendimento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Nossa Metodologia</h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Seguimos um processo rigoroso para garantir a qualidade e confiabilidade de nossas análises:
              </p>

              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-semibold">Coleta de Dados</h3>
                  </div>
                  <p className="text-muted-foreground ml-11">
                    Coletamos informações de fontes oficiais (Anatel, IBGE), sites de provedores, 
                    reclamações em órgãos de defesa do consumidor e feedbacks de usuários reais.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">Testes Práticos</h3>
                  </div>
                  <p className="text-muted-foreground ml-11">
                    Realizamos testes de velocidade em diferentes horários, medimos latência para jogos e streaming, 
                    e avaliamos a estabilidade da conexão ao longo do tempo.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">Análise Comparativa</h3>
                  </div>
                  <p className="text-muted-foreground ml-11">
                    Comparamos preços, velocidades anunciadas vs. reais, qualidade de atendimento e 
                    índices de reclamação para cada provedor.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">Publicação e Atualização</h3>
                  </div>
                  <p className="text-muted-foreground ml-11">
                    Publicamos análises detalhadas e mantemos o conteúdo atualizado conforme mudanças 
                    no mercado, novos provedores e alterações de preços.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Nossos Números</h2>
              </div>
              
              <div className="grid gap-6 xl:grid-cols-3">
                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">22.756+</div>
                  <div className="text-muted-foreground">Artigos Publicados</div>
                </div>

                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">5.689</div>
                  <div className="text-muted-foreground">Cidades Cobertas</div>
                </div>

                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">26</div>
                  <div className="text-muted-foreground">Estados Brasileiros</div>
                </div>

                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Provedores Avaliados</div>
                </div>

                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">Anos de Experiência</div>
                </div>

                <div className="text-center p-6 bg-background rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">4</div>
                  <div className="text-muted-foreground">Regiões Completas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Explore Nosso Conteúdo
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Descubra análises detalhadas de provedores, guias de DDDs e informações sobre 
                telecomunicações em todo o Brasil.
              </p>
              <div className="flex flex-col xl:flex-row gap-4 justify-center">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Ver Todos os Artigos
                </Link>
                <Link 
                  to="/estados" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Explorar por Estado
                </Link>
                <Link 
                  to="/contato" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                >
                  Entre em Contato
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
