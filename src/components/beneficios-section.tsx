'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Search, Map, Info, Zap, Globe, BarChart3 } from 'lucide-react'

interface BeneficioCardProps {
  icon: React.ReactNode
  titulo: string
  descricao: string
  delay?: number
}

const BeneficioCard = ({ icon, titulo, descricao, delay = 0 }: BeneficioCardProps) => {
  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white relative overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="p-8 relative">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
          <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {titulo}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {descricao}
        </p>
      </CardContent>
    </Card>
  )
}

export function BeneficiosSection() {
  const beneficios = [
    {
      icon: <Search className="w-8 h-8" />,
      titulo: "Busca Inteligente",
      descricao: "Encontre códigos DDD rapidamente por estado, cidade ou número. Nossa busca é otimizada para resultados precisos.",
      delay: 0
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titulo: "Cobertura Nacional",
      descricao: "Informações atualizadas de todos os 27 estados brasileiros e milhares de cidades com seus respectivos códigos DDD.",
      delay: 100
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      titulo: "Informações Detalhadas",
      descricao: "Além do código DDD, oferecemos informações sobre regiões de cobertura e dados demográficos.",
      delay: 200
    }
  ]

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Header da seção */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Por que usar nossa plataforma?
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra as vantagens que tornam o MEU DDD a ferramenta mais completa 
              e confiável para consulta de códigos telefônicos brasileiros.
            </p>
          </div>

          {/* Grid de cards de benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <BeneficioCard
                key={index}
                icon={beneficio.icon}
                titulo={beneficio.titulo}
                descricao={beneficio.descricao}
                delay={beneficio.delay}
              />
            ))}
          </div>

          {/* Seção adicional de recursos */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para encontrar o DDD que precisa?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Nossa plataforma oferece a experiência mais completa e intuitiva 
                para consulta de códigos DDD de todo o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Search className="w-4 h-4" />
                  <span>Busca instantânea</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Map className="w-4 h-4" />
                  <span>Cobertura nacional</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Info className="w-4 h-4" />
                  <span>Informações detalhadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}