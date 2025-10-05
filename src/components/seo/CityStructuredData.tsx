interface CityStructuredDataProps {
  city: {
    name: string;
    slug: string;
    population?: number | null;
    area?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    isCapital: boolean;
    state: {
      name: string;
      slug: string;
      code: string;
      region: string;
    };
    dddCodes: Array<{
      id: string;
      code: string;
      description?: string | null;
    }>;
  };
  url: string;
}

export function CityStructuredData({ city, url }: CityStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "City",
    "name": city.name,
    "alternateName": `${city.name} - ${city.state.name}`,
    "description": `Informações sobre ${city.name}, ${city.state.name}. Código DDD: ${city.dddCodes[0]?.code || '00'}. População: ${city.population?.toLocaleString('pt-BR')} habitantes. Área: ${city.area} km².`,
    "url": url,
    "containedInPlace": {
      "@type": "State",
      "name": city.state.name,
      "alternateName": city.state.code,
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
    "geo": city.latitude && city.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": city.latitude,
      "longitude": city.longitude
    } : undefined,
    "telephone": city.dddCodes.map(ddd => `+55 ${ddd.code}`).join(", "),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Código DDD",
        "value": city.dddCodes.map(ddd => ddd.code).join(", "),
        "description": "Códigos de Discagem Direta à Distância da cidade"
      },
      {
        "@type": "PropertyValue",
        "name": "É Capital",
        "value": city.isCapital ? "Sim" : "Não",
        "description": "Indica se a cidade é capital do estado"
      },
      {
        "@type": "PropertyValue",
        "name": "Estado",
        "value": city.state.name,
        "description": "Estado onde a cidade está localizada"
      },
      {
        "@type": "PropertyValue",
        "name": "Região",
        "value": city.state.region,
        "description": "Região geográfica do estado"
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
            "text": `O código DDD de ${city.name} é ${city.dddCodes[0]?.code || '00'}. Este código deve ser utilizado para fazer ligações telefônicas para a cidade.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual a população de ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${city.name} possui aproximadamente ${city.population?.toLocaleString('pt-BR')} habitantes, sendo ${city.isCapital ? 'a capital' : 'um dos principais municípios'} do estado de ${city.state.name}.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual a área de ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `A área total de ${city.name} é de ${city.area} km², localizada na região ${city.state.region} do estado de ${city.state.name}.`
          }
        },
        {
          "@type": "Question",
          "name": `${city.name} é capital do estado?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": city.isCapital 
              ? `Sim, ${city.name} é a capital do estado de ${city.state.name}, sendo o principal centro político, econômico e administrativo da região.`
              : `Não, ${city.name} não é a capital. A capital de ${city.state.name} é ${city.state.name === 'São Paulo' ? 'São Paulo' : city.state.name === 'Rio de Janeiro' ? 'Rio de Janeiro' : 'a capital do estado'}.`
          }
        },
        {
          "@type": "Question",
          "name": `Como ligar para ${city.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Para ligar para ${city.name}, disque 0 + ${city.dddCodes[0]?.code || '00'} + número do telefone. Do exterior, use +55 + ${city.dddCodes[0]?.code || '00'} + número. Para celulares, inclua o 9 após o DDD.`
          }
        }
      ]
    },
    "hasPart": city.dddCodes.map(dddCode => ({
      "@type": "AdministrativeArea",
      "name": `DDD ${dddCode.code}`,
      "description": dddCode.description || `Código DDD para ${city.name}`,
      "telephone": `+55 ${dddCode.code}`,
      "serviceArea": {
        "@type": "City",
        "name": city.name,
        "containedInPlace": {
          "@type": "State",
          "name": city.state.name,
          "containedInPlace": {
            "@type": "Country",
            "name": "Brasil"
          }
        }
      }
    })),
    "subjectOf": {
      "@type": "CreativeWork",
      "name": `Informações sobre ${city.name}`,
      "description": `Dados completos sobre ${city.name}, incluindo código DDD, população, área e localização geográfica.`,
      "url": url,
      "inLanguage": "pt-BR",
      "isAccessibleForFree": true,
      "author": {
        "@type": "Organization",
        "name": "MEU DDD",
        "url": "https://meuddd.com"
      }
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