interface AdvancedStructuredDataProps {
  city: {
    name: string;
    description?: string;
    population?: number | null;
    area?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    isCapital: boolean;
  };
  state: {
    name: string;
    code: string;
    region: string;
  };
  author: {
    name: string;
    bio: string;
    expertise: string[];
  };
  url: string;
  datePublished: string;
  dateModified: string;
}

export function AdvancedStructuredData({ 
  city, 
  state, 
  author, 
  url, 
  datePublished, 
  dateModified 
}: AdvancedStructuredDataProps) {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        "url": url,
        "name": `DDD de ${city.name} - Código Telefônico Completo`,
        "description": `Informações completas sobre códigos DDD de ${city.name}, ${state.name}. Saiba quais DDDs usar para fazer ligações.`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://meuddd.com/",
          "name": "Meu DDD",
          "description": "Consulta completa de códigos DDD do Brasil",
          "publisher": {
            "@type": "Organization",
            "name": "Meu DDD",
            "url": "https://meuddd.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://meuddd.com/logo.png",
              "width": 200,
              "height": 60
            }
          }
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "inLanguage": "pt-BR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://meuddd.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "headline": `DDD de ${city.name} - Código Telefônico Completo`,
        "description": `Guia completo sobre códigos DDD de ${city.name}, ${state.name}. Informações atualizadas para fazer ligações.`,
        "image": [
          `https://meuddd.com/images/${city.name.toLowerCase().replace(/\s+/g, '-')}-ddd.jpg`
        ],
        "author": {
          "@type": "Person",
          "name": author.name,
          "description": author.bio,
          "knowsAbout": author.expertise,
          "url": "https://meuddd.com/sobre-o-autor"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Meu DDD",
          "logo": {
            "@type": "ImageObject",
            "url": "https://meuddd.com/logo.png"
          }
        },
        "datePublished": datePublished,
        "dateModified": dateModified
      },
      {
        "@type": "Place",
        "name": city.name,
        "description": city.description || `${city.name} é uma cidade localizada no estado de ${state.name}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.name,
          "addressRegion": state.name,
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": city.latitude || 0,
          "longitude": city.longitude || 0
        },
        "containedInPlace": {
          "@type": "Place",
          "name": state.name,
          "address": {
            "@type": "PostalAddress",
            "addressRegion": state.name,
            "addressCountry": "BR"
          }
        },
        "hasMap": `https://maps.google.com/maps?q=${city.name},${state.name}`,
        "photo": `https://meuddd.com/images/${city.name.toLowerCase().replace(/\s+/g, '-')}-cidade.jpg`
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Qual é o código DDD de ${city.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${city.name} utiliza os códigos DDD que cobrem a região para ligações telefônicas.`
            }
          },
          {
            "@type": "Question",
            "name": `Como fazer ligações para ${city.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para fazer ligações, utilize o formato 0 + DDD + número do telefone para chamadas interurbanas."
            }
          },
          {
            "@type": "Question",
            "name": `${city.name} é capital do estado?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": city.isCapital 
                ? `Sim, ${city.name} é a capital do estado de ${state.name}.`
                : `Não, ${city.name} não é a capital do estado de ${state.name}.`
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": `Como usar o código DDD de ${city.name}`,
        "description": "Passo a passo para utilizar corretamente os códigos DDD nas suas ligações",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Identifique o código DDD",
            "text": "Verifique qual é o código DDD correto para a região de ${city.name}"
          },
          {
            "@type": "HowToStep",
            "name": "Para ligações locais",
            "text": "Discar diretamente o número do telefone sem o DDD"
          },
          {
            "@type": "HowToStep",
            "name": "Para ligações interurbanas",
            "text": "Discar 0 + código DDD + número do telefone"
          },
          {
            "@type": "HowToStep",
            "name": "Para ligações internacionais",
            "text": "Discar +55 + código DDD + número do telefone"
          }
        ],
        "totalTime": "PT1M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "BRL",
          "value": "0"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}