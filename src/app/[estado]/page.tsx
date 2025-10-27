import { notFound } from "next/navigation";
import { EstadoHero } from "@/components/estado-hero";
import { BuscadorCidades } from "@/components/buscador-cidades";
import { EstadoAbas } from "@/components/estado-abas";
import { getEstadoBySlug } from "@/lib/estados-data";
import { Metadata } from "next";

interface EstadoPageProps {
  params: {
    estado: string;
  };
}

export async function generateMetadata({ params }: EstadoPageProps): Promise<Metadata> {
  const estado = getEstadoBySlug(params.estado);
  
  if (!estado) {
    return {
      title: "Estado não encontrado",
      description: "O estado solicitado não foi encontrado em nosso sistema."
    };
  }

  return {
    title: `DDD ${estado.ddd} ${estado.nome} | Consulte Todas as Cidades com Código ${estado.ddd}`,
    description: `Consulta completa do DDD ${estado.ddd} do estado ${estado.nome}. Encontre todas as cidades, informações de discagem, operadoras e detalhes sobre o código telefônico ${estado.ddd}.`,
    keywords: [
      `DDD ${estado.ddd}`,
      `DDD ${estado.nome}`,
      `código ${estado.ddd}`,
      `cidades ${estado.nome}`,
      `telefone ${estado.nome}`,
      `discagem ${estado.ddd}`,
      `operadoras ${estado.nome}`,
      `lista cidades ${estado.nome}`,
      `DDD Brasil ${estado.sigla}`,
      `telefone fixo ${estado.ddd}`,
      `celular ${estado.ddd}`,
      `${estado.capital} DDD ${estado.ddd}`
    ],
    openGraph: {
      title: `DDD ${estado.ddd} ${estado.nome} - Guia Completo`,
      description: `Consulta completa do DDD ${estado.ddd} do ${estado.nome}. Todas as cidades, informações de discagem e operadoras.`,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `/images/ddd-${estado.ddd}-${estado.sigla.toLowerCase()}.jpg`,
          width: 1200,
          height: 630,
          alt: `DDD ${estado.ddd} ${estado.nome} - Guia Completo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `DDD ${estado.ddd} ${estado.nome} - Guia Completo`,
      description: `Consulta completa do DDD ${estado.ddd} do ${estado.nome}. Todas as cidades e informações.`,
      images: [`/images/ddd-${estado.ddd}-${estado.sigla.toLowerCase()}.jpg`]
    },
    alternates: {
      canonical: `/${params.estado}`
    }
  };
}

export default function EstadoPage({ params }: EstadoPageProps) {
  const estado = getEstadoBySlug(params.estado);
  
  if (!estado) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <EstadoHero estado={estado} />
      
      <div className="container mx-auto px-4 py-12 space-y-12">
        <BuscadorCidades estado={estado} />
        <EstadoAbas estado={estado} />
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `DDD ${estado.ddd} ${estado.nome} - Guia Completo`,
            "description": `Consulta completa do DDD ${estado.ddd} do estado ${estado.nome}. Encontre todas as cidades, informações de discagem e operadoras.`,
            "author": {
              "@type": "Organization",
              "name": "MEU DDD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MEU DDD",
              "logo": {
                "@type": "ImageObject",
                "url": "https://meuddd.vercel.app/logo.svg"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://meuddd.vercel.app/${params.estado}`
            },
            "about": {
              "@type": "Thing",
              "name": `DDD ${estado.ddd} ${estado.nome}`,
              "description": `Código telefônico DDD ${estado.ddd} do estado ${estado.nome}`
            }
          })
        }}
      />
    </div>
  );
}