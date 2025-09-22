interface ToolStructuredDataProps {
  toolName: string;
  description: string;
  url: string;
  toolType: 'Validator' | 'Generator' | 'Search' | 'VoiceSearch';
}

export function ToolStructuredData({ 
  toolName, 
  description, 
  url, 
  toolType 
}: ToolStructuredDataProps) {
  const getToolType = () => {
    switch (toolType) {
      case 'Validator':
        return 'WebApplication';
      case 'Generator':
        return 'WebApplication';
      case 'Search':
        return 'WebApplication';
      case 'VoiceSearch':
        return 'WebApplication';
      default:
        return 'WebApplication';
    }
  };

  const getApplicationCategory = () => {
    switch (toolType) {
      case 'Validator':
        return 'ValidatorApplication';
      case 'Generator':
        return 'GeneratorApplication';
      case 'Search':
        return 'SearchApplication';
      case 'VoiceSearch':
        return 'VoiceApplication';
      default:
        return 'UtilityApplication';
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": getToolType(),
    "name": toolName,
    "alternateName": `${toolName} - MEU DDD`,
    "description": description,
    "url": url,
    "applicationCategory": getApplicationCategory(),
    "applicationSubCategory": "Telecomunicações",
    "operatingSystem": "Web",
    "browserRequirements": "HTML5, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "MEU DDD",
      "url": "https://meuddd.com"
    },
    "creator": {
      "@type": "Organization",
      "name": "MEU DDD",
      "url": "https://meuddd.com"
    },
    "inLanguage": "pt-BR",
    "isAccessibleForFree": true,
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Como funciona o ${toolName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": description
          }
        },
        {
          "@type": "Question",
          "name": `O ${toolName} é gratuito?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim, o ${toolName} é completamente gratuito e não requer cadastro para utilização.`
          }
        },
        {
          "@type": "Question",
          "name": `Quais informações posso obter com o ${toolName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Com o ${toolName} você pode obter informações detalhadas sobre códigos DDD, estados e cidades brasileiras, além de validar e gerar números de telefone para testes.`
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