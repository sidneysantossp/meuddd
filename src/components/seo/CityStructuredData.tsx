interface CityStructuredDataProps {
  city: {
    name: string;
    slug: string;
    population?: number | null;
    area?: number | null;
    isCapital?: boolean | null;
    dddCodes: Array<{
      code: string;
      description?: string | null;
    }>;
  };
  state: {
    name: string;
    code: string;
    slug: string;
    region: string;
    capital?: string | null;
  };
  url: string;
}

export function CityStructuredData({ city, state, url }: CityStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "City",
    "name": city.name,
    "description": `Código DDD de ${city.name}, ${state.name}. Informações telefônicas atualizadas, população, área e dados geográficos.`,
    "url": url,
    "containedInPlace": {
      "@type": "State",
      "name": state.name,
      "alternateName": state.code,
      "containedInPlace": {
        "@type": "Country",
        "name": "Brasil",
        "sameAs": "https://pt.wikipedia.org/wiki/Brasil"
      }
    },
    "population": city.population,
    "area": {
      "@type": "QuantitativeValue",
      "value": city.area,
      "unitCode": "KMT",
      "unitText": "quilômetros quadrados"
    },
    "telephone": city.dddCodes.map(ddd => `+55 ${ddd.code}`).join(", "),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Códigos DDD",
        "value": city.dddCodes.map(ddd => ddd.code).join(", "),
        "description": "Códigos de Discagem Direta à Distância da cidade"
      },
      {
        "@type": "PropertyValue",
        "name": "Estado",
        "value": state.name,
        "description": "Estado brasileiro onde a cidade está localizada"
      },
      {
        "@type": "PropertyValue",
        "name": "Região",
        "value": state.region,
        "description": "Região geográfica do Brasil"
      },
      {
        "@type": "PropertyValue",
        "name": "Capital",
        "value": city.isCapital ? "Sim" : "Não",
        "description": "Indica se a cidade é capital do estado"
      }
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Qual é o código DDD de ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `O código DDD de ${city.name} é ${city.dddCodes.map(ddd => ddd.code).join(" ou ")}. ${city.dddCodes.length > 1 ? 'A cidade possui múltiplos códigos DDD para atender diferentes regiões.' : ''}`
          }
        },
        {
          "@type": "Question",
          "name": `${city.name} é capital?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": city.isCapital 
              ? `Sim, ${city.name} é a capital do estado de ${state.name}. Como capital, concentra o poder político, econômico e administrativo do estado.`
              : `Não, ${city.name} não é a capital do estado de ${state.name}. A capital é ${state.capital}.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual a população de ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${city.name} possui aproximadamente ${city.population?.toLocaleString('pt-BR')} habitantes, sendo uma das cidades ${city.population && city.population > 100000 ? 'mais populosas' : 'menos populosas'} do estado de ${state.name}.`
          }
        },
        {
          "@type": "Question",
          "name": `Como ligar para ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Para ligar para ${city.name}, disque 0 + ${city.dddCodes[0]?.code || 'XX'} + número do telefone. Do exterior, use +55 + ${city.dddCodes[0]?.code || 'XX'} + número. Exemplo: 0${city.dddCodes[0]?.code || 'XX'} XXXX-XXXX para chamadas nacionais ou +55 ${city.dddCodes[0]?.code || 'XX'} XXXX-XXXX do exterior.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual a área de ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${city.name} possui uma área de aproximadamente ${city.area?.toLocaleString('pt-BR')} km², localizada na região ${state.region} do estado de ${state.name}.`
          }
        }
      ]
    },
    "hasPart": city.dddCodes.map(dddCode => ({
      "@type": "Service",
      "name": `Serviço Telefônico DDD ${dddCode.code}`,
      "description": dddCode.description || `Código DDD para ${city.name}`,
      "serviceType": "TelecommunicationsService",
      "provider": {
        "@type": "Organization",
        "name": "Operadoras de Telecomunicações",
        "serviceArea": {
          "@type": "Place",
          "name": city.name,
          "containedInPlace": {
            "@type": "State",
            "name": state.name
          }
        }
      },
      "areaServed": {
        "@type": "Place",
        "name": city.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.name,
          "addressRegion": state.code,
          "addressCountry": "BR"
        }
      }
    })),
    "subjectOf": {
      "@type": "CreativeWork",
      "name": `Código DDD de ${city.name}`,
      "description": `Informações completas sobre códigos DDD, telefonia e dados geográficos de ${city.name}, ${state.name}`,
      "url": url,
      "inLanguage": "pt-BR",
      "isAccessibleForFree": true,
      "author": {
        "@type": "Organization",
        "name": "MEU DDD",
        "url": "https://meuddd.com"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.isCapital ? "-15.7801" : "-23.5505", // Valores genéricos, podem ser substituídos por dados reais
      "longitude": city.isCapital ? "-47.9292" : "-46.6333"
    }
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