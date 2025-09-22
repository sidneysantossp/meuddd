interface OrganizationStructuredDataProps {
  url: string;
  name?: string;
  logo?: string;
}

export function OrganizationStructuredData({ 
  url, 
  name = "MEU DDD",
  logo = "/logo.svg"
}: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "alternateName": "MEU DDD",
    "url": url,
    "logo": `${url}${logo}`,
    "description": "Plataforma completa para consulta de códigos DDD do Brasil",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressLocality": "Brasil"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese"],
      "contactOption": "TollFree"
    },
    "sameAs": [
      "https://www.facebook.com/meuddd",
      "https://www.twitter.com/meuddd",
      "https://www.instagram.com/meuddd"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "serviceType": [
      {
        "@type": "Service",
        "name": "Consulta de Códigos DDD",
        "description": "Busca e consulta de códigos DDD por estado e cidade"
      },
      {
        "@type": "Service",
        "name": "Validação de DDD",
        "description": "Validação de códigos DDD e verificação de existência"
      },
      {
        "@type": "Service",
        "name": "Geração de Números",
        "description": "Geração de números de telefone para testes"
      },
      {
        "@type": "Service",
        "name": "Busca por Voz",
        "description": "Busca de códigos DDD utilizando comandos de voz"
      }
    ],
    "knowsAbout": [
      "Códigos DDD",
      "Telefonia Brasil",
      "Discagem Direta à Distância",
      "Telecomunicações",
      "Estados Brasileiros",
      "Cidades Brasileiras"
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