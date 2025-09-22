interface StateStructuredDataProps {
  state: {
    name: string;
    code: string;
    slug: string;
    region: string;
    population?: number;
    area?: number;
    capital?: string;
    dddCodes: Array<{
      code: string;
      description?: string;
    }>;
  };
  url: string;
}

export function StateStructuredData({ state, url }: StateStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "State",
    "name": state.name,
    "alternateName": state.code,
    "description": `Códigos DDD de ${state.name} (${state.code}). Informações sobre telefonia fixa e móvel, população, área e principais cidades.`,
    "url": url,
    "containedInPlace": {
      "@type": "Country",
      "name": "Brasil",
      "sameAs": "https://pt.wikipedia.org/wiki/Brasil"
    },
    "population": state.population,
    "area": {
      "@type": "QuantitativeValue",
      "value": state.area,
      "unitCode": "KMT",
      "unitText": "quilômetros quadrados"
    },
    "capital": state.capital,
    "region": state.region,
    "telephone": state.dddCodes.map(ddd => `+55 ${ddd.code}`).join(", "),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Códigos DDD",
        "value": state.dddCodes.map(ddd => ddd.code).join(", "),
        "description": "Códigos de Discagem Direta à Distância do estado"
      },
      {
        "@type": "PropertyValue",
        "name": "Região",
        "value": state.region,
        "description": "Região geográfica do Brasil"
      },
      {
        "@type": "PropertyValue",
        "name": "Sigla",
        "value": state.code,
        "description": "Código ISO do estado"
      },
      {
        "@type": "PropertyValue",
        "name": "Número de cidades",
        "value": "5000+",
        "description": "Quantidade aproximada de cidades no estado"
      }
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Quais são os códigos DDD de ${state.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Os códigos DDD de ${state.name} são: ${state.dddCodes.map(ddd => ddd.code).join(", ")}. Cada código atende a uma região específica do estado, facilitando a identificação da origem das chamadas telefônicas.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual é a capital de ${state.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `A capital de ${state.name} é ${state.capital}. A capital é geralmente o principal centro político, econômico e cultural do estado.`
          }
        },
        {
          "@type": "Question",
          "name": `Qual a população de ${state.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${state.name} possui aproximadamente ${state.population?.toLocaleString('pt-BR')} habitantes, sendo um dos ${state.population && state.population > 5000000 ? 'mais populosos' : 'menos populosos'} estados do Brasil.`
          }
        },
        {
          "@type": "Question",
          "name": `Como ligar para ${state.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Para ligar para ${state.name}, disque 0 + código DDD + número do telefone. Do exterior, use +55 + código DDD + número. Exemplo: 011 XXXX-XXXX para São Paulo ou +55 11 XXXX-XXXX do exterior.`
          }
        },
        {
          "@type": "Question",
          "name": `Quantas cidades tem ${state.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${state.name} possui mais de 5.000 cidades, distribuídas por todo o território estadual. Cada cidade pode ter um ou mais códigos DDD dependendo da região.`
          }
        }
      ]
    },
    "hasPart": state.dddCodes.map(dddCode => ({
      "@type": "AdministrativeArea",
      "name": `DDD ${dddCode.code}`,
      "description": dddCode.description || `Código DDD para região de ${state.name}`,
      "telephone": `+55 ${dddCode.code}`,
      "serviceArea": {
        "@type": "AdministrativeArea",
        "name": state.name,
        "containedInPlace": {
          "@type": "Country",
          "name": "Brasil"
        }
      }
    })),
    "subjectOf": {
      "@type": "CreativeWork",
      "name": `Códigos DDD de ${state.name}`,
      "description": `Informações completas sobre códigos DDD, telefonia e dados geográficos de ${state.name}`,
      "url": url,
      "inLanguage": "pt-BR",
      "isAccessibleForFree": true,
      "author": {
        "@type": "Organization",
        "name": "MEU DDD",
        "url": "https://meuddd.com.br"
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