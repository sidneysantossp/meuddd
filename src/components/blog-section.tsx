'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, TrendingUp, MapPin, Phone, BookOpen, Eye, MessageCircle, Share2 } from 'lucide-react'

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  imageUrl: string
  imageAlt: string
  views: string
  comments: string
}

const BlogCard = ({ title, excerpt, author, date, readTime, category, imageUrl, imageAlt, views, comments }: BlogCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 overflow-hidden">
      {/* Imagem do artigo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback para placeholder se a imagem falhar
            e.currentTarget.src = `https://picsum.photos/seed/${title}/400/300.jpg`;
          }}
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badge de categoria */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm">
            {category}
          </Badge>
        </div>
        
        {/* Badge de tempo de leitura */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {readTime}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${author}/100/100.jpg`}
                alt={author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <User className="w-4 h-4 text-gray-600" style={{ display: 'none' }} />
            </div>
            <span className="text-sm font-medium text-gray-700">{author}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full group-hover:bg-blue-600 transition-colors flex items-center gap-2">
          Ler Artigo Completo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function BlogSection() {
  const articles = [
    {
      title: "A Evolução dos Códigos DDD no Brasil: De 1969 até Hoje",
      excerpt: "Descubra como o sistema de Discagem Direta à Distância transformou as comunicações no Brasil. Desde os primeiros códigos implementados em 1969 até a moderna rede de telecomunicações que conecta mais de 200 milhões de brasileiros atualmente.",
      author: "Carlos Silva",
      date: "15 Nov 2024",
      readTime: "8 min",
      category: "História",
      imageUrl: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Telefone antigo e moderno mostrando evolução das telecomunicações",
      views: "2.3k",
      comments: "24"
    },
    {
      title: "Guia Completo: Como Escolher o Operador Ideal para Cada DDD",
      excerpt: "Análise detalhada das melhores operadoras de telefonia para cada região do Brasil. Compare preços, qualidade de sinal, cobertura e benefícios para tomar a melhor decisão na hora de escolher seu plano telefônico.",
      author: "Maria Santos",
      date: "12 Nov 2024",
      readTime: "12 min",
      category: "Guia",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Mapa do Brasil com cobertura de operadoras de telefonia",
      views: "1.8k",
      comments: "18"
    },
    {
      title: "DDD e Economia: Como os Códigos Telefônicos Influenciam os Negócios",
      excerpt: "Entenda a relação entre os códigos DDD e o desenvolvimento econômico das regiões brasileiras. Saiba como empresas utilizam os DDDs para estratégias de marketing e expansão de negócios pelo território nacional.",
      author: "Roberto Costa",
      date: "10 Nov 2024",
      readTime: "10 min",
      category: "Negócios",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Reunião de negócios com pessoas de diferentes regiões do Brasil",
      views: "1.5k",
      comments: "31"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header da seção */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog DDD
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Artigos exclusivos sobre o sistema telefônico brasileiro, dicas de telecomunicações 
            e análises detalhadas sobre códigos DDD de todo o país.
          </p>
          
          {/* Categorias populares */}
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
              História do DDD
            </Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
              Guias Completo
            </Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
              Telecomunicações
            </Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
              Negócios
            </Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
              Tecnologia
            </Badge>
          </div>
        </div>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <BlogCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
              readTime={article.readTime}
              category={article.category}
              imageUrl={article.imageUrl}
              imageAlt={article.imageAlt}
              views={article.views}
              comments={article.comments}
            />
          ))}
        </div>

        {/* Seção de newsletter e CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Fique por Dentro das Novidades sobre DDD
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Receba nossos artigos semanais sobre telecomunicações, guias exclusivos e 
            as últimas atualizações sobre códigos DDD diretamente no seu e-mail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold">
              Inscrever-se
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Artigos exclusivos</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>Sem spam</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Conteúdo premium</span>
            </div>
          </div>
        </div>

        {/* Estatísticas do blog */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
            <div className="text-gray-600 text-sm">Artigos Publicados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50k+</div>
            <div className="text-gray-600 text-sm">Leitores Mensais</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1.2k+</div>
            <div className="text-gray-600 text-sm">Comentários</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm">Satisfação</div>
          </div>
        </div>
      </div>
    </section>
  )
}