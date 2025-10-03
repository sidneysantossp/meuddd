interface WebsiteStructuredDataProps {
  url: string;
  name?: string;
  description?: string;
}

export function WebsiteStructuredData({ 
  url, 
  name = "MEU DDD", 
  description = "Plataforma completa para consulta de códigos DDD do Brasil, com informações atualizadas de todos os estados e cidades."
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "alternateName": "MEU DDD",
    "description": description,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/api/ddd/search?query={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Organization",
      "name": "MEU DDD",
      "url": url
    },
    "inLanguage": "pt-BR",
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by-nc/4.0/",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que são códigos DDD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DDD (Discagem Direta à Distância) é um código numérico usado no sistema telefônico brasileiro para identificar a origem ou destino de uma chamada telefônica interurbana. Cada região geográfica do Brasil possui seu próprio código DDD."
          }
        },
        {
          "@type": "Question",
          "name": "Quantos códigos DDD existem no Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Brasil possui mais de 65 códigos DDD diferentes, distribuídos pelos 27 estados e pelo Distrito Federal. Cada código atende a uma ou mais cidades específicas."
          }
        },
        {
          "@type": "Question",
          "name": "Como usar os códigos DDD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para fazer uma chamada interurbana dentro do Brasil, disque 0 + código DDD + número do telefone. Para chamadas internacionais, use +55 + código DDD + número do telefone."
          }
        },
        {
          "@type": "Question",
          "name": "Como encontrar o código DDD de uma cidade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você pode encontrar o código DDD de qualquer cidade brasileira em nossa plataforma. Basta buscar pelo nome da cidade, estado ou código DDD desejado."
          }
        }
      ]
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