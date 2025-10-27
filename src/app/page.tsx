import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { EstadosSection } from '@/components/estados-section'
import { BeneficiosSection } from '@/components/beneficios-section'
import { HistoriaDDDSection } from '@/components/historia-ddd-section'
import { BlogSection } from '@/components/blog-section'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DDDs do Brasil | Consulte Todos os Códigos Telefônicos Brasileiros | MEU DDD',
  description: 'Encontre todos os DDDs do Brasil em um só lugar. Consulte códigos telefônicos dos 27 estados brasileiros, busque por cidade, valide números e acesse informações completas sobre o sistema DDD brasileiro. Atualizado em tempo real.',
  keywords: [
    'DDDs do Brasil',
    'códigos DDD',
    'DDD Brasil',
    'códigos telefônicos brasileiros',
    'consulta DDD',
    'DDD por estado',
    'DDD por cidade',
    'sistema DDD Brasil',
    'discagem direta à distância',
    'códigos telefônicos',
    'DDD São Paulo',
    'DDD Rio de Janeiro',
    'DDD Minas Gerais',
    'DDD Bahia',
    'todos os DDDs',
    'lista DDD Brasil'
  ],
  authors: [{ name: 'MEU DDD' }],
  creator: 'MEU DDD',
  publisher: 'MEU DDD',
  robots: 'index, follow',
  openGraph: {
    title: 'DDDs do Brasil | Consulte Todos os Códigos Telefônicos Brasileiros',
    description: 'Encontre todos os DDDs do Brasil em um só lugar. Consulte códigos telefônicos dos 27 estados brasileiros, busque por cidade, valide números e acesse informações completas sobre o sistema DDD brasileiro.',
    url: 'https://meudd.com.br',
    siteName: 'MEU DDD',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://meudd.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DDDs do Brasil - Consulte Todos os Códigos Telefônicos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDDs do Brasil | Consulte Todos os Códigos Telefônicos Brasileiros',
    description: 'Encontre todos os DDDs do Brasil em um só lugar. Consulte códigos telefônicos dos 27 estados brasileiros.',
    images: ['https://meudd.com.br/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://meudd.com.br',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dados Estruturados Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MEU DDD - DDDs do Brasil",
            "url": "https://meudd.com.br",
            "description": "Consulte todos os DDDs do Brasil. Encontre códigos telefônicos dos 27 estados brasileiros, busque por cidade e valide números.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://meudd.com.br/busca?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MEU DDD",
              "url": "https://meudd.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://meudd.com.br/logo.png"
              }
            }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "DDDs do Brasil: Guia Completo dos Códigos Telefônicos Brasileiros",
            "description": "Descubra todos os códigos DDD do Brasil, incluindo informações detalhadas sobre os 27 estados e seus respectivos códigos telefônicos.",
            "author": {
              "@type": "Organization",
              "name": "MEU DDD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MEU DDD",
              "logo": {
                "@type": "ImageObject",
                "url": "https://meudd.com.br/logo.png"
              }
            },
            "datePublished": "2024-11-15",
            "dateModified": "2024-11-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://meudd.com.br"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quantos DDDs existem no Brasil?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Existem 67 códigos DDD diferentes no Brasil, distribuídos pelos 27 estados brasileiros."
                }
              },
              {
                "@type": "Question",
                "name": "Como funciona o sistema DDD no Brasil?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O sistema DDD (Discagem Direta à Distância) permite fazer ligações interurbanas diretamente, sem precisar da operadora, usando códigos específicos para cada região."
                }
              },
              {
                "@type": "Question",
                "name": "Qual o DDD de São Paulo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "São Paulo tem vários códigos DDD: 11 (capital e região), 12, 13, 14, 15, 16, 17, 18 e 19 para diferentes regiões do estado."
                }
              }
            ]
          })
        }}
      />

      <Navbar />
      <Hero />
      <EstadosSection />
      <BeneficiosSection />
      <HistoriaDDDSection />
      <BlogSection />
      <Footer />
    </div>
  )
}