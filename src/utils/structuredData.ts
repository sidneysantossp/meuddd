/**
 * Utilitários para gerar dados estruturados (JSON-LD) para SEO
 * Seguindo os padrões do Schema.org
 */

export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface Article {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export interface LocalBusiness {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  areaServed: {
    '@type': 'State' | 'City';
    name: string;
  };
}

/**
 * Gera dados estruturados da organização
 */
export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MEU DDD',
    url: 'https://www.meuddd.com.br',
    logo: 'https://www.meuddd.com.br/favicon.png',
    description: 'Plataforma completa para consulta de códigos DDD de todos os estados e cidades do Brasil.',
    sameAs: [
      'https://www.facebook.com/meuddd',
      'https://twitter.com/meuddd',
      'https://www.instagram.com/meuddd',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
  };
}

/**
 * Gera dados estruturados do website
 */
export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MEU DDD',
    url: 'https://www.meuddd.com.br',
    description: 'Consulte códigos DDD de todos os estados e cidades do Brasil. Informações atualizadas sobre os 27 estados brasileiros.',
    publisher: {
      '@type': 'Organization',
      name: 'MEU DDD',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.meuddd.com.br/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Gera breadcrumb para navegação
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Gera FAQ page schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Gera article schema para posts do blog
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}): Article {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MEU DDD',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.meuddd.com.br/favicon.png',
      },
    },
  };
}

/**
 * Gera local business schema para páginas de estados/cidades
 */
export function generateLocalBusinessSchema(location: {
  name: string;
  description: string;
  city?: string;
  state: string;
  telephone?: string;
  latitude?: number;
  longitude?: number;
}): LocalBusiness {
  const schema: LocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Códigos DDD de ${location.name}`,
    description: location.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city || location.name,
      addressRegion: location.state,
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': location.city ? 'City' : 'State',
      name: location.name,
    },
  };

  if (location.telephone) {
    schema.telephone = location.telephone;
  }

  if (location.latitude && location.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  return schema;
}

/**
 * Gera schema completo para página de estado
 */
export function generateStatePageSchema(state: {
  name: string;
  slug: string;
  abbreviation: string;
  capital: string;
  population: string;
  ddds: string[];
  region: string;
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const schemas: any[] = [];

  // Organization
  schemas.push(generateOrganizationSchema());

  // Breadcrumb
  schemas.push(
    generateBreadcrumbSchema([
      { name: 'Início', url: 'https://www.meuddd.com.br' },
      { name: 'Estados', url: 'https://www.meuddd.com.br/estados' },
      { name: state.name, url: `https://www.meuddd.com.br/estado/${state.slug}` },
    ])
  );

  // Local Business
  schemas.push(
    generateLocalBusinessSchema({
      name: state.name,
      description: `Consulte todos os códigos DDD de ${state.name}. Informações completas sobre ${state.capital} e todas as cidades do estado.`,
      state: state.abbreviation,
    })
  );

  // FAQ (se disponível)
  if (state.faqs && state.faqs.length > 0) {
    schemas.push(generateFAQSchema(state.faqs));
  }

  return schemas;
}

/**
 * Gera schema completo para página de cidade
 */
export function generateCityPageSchema(city: {
  name: string;
  state: string;
  stateSlug: string;
  stateAbbreviation: string;
  ddd: string;
  population?: string;
  latitude?: number;
  longitude?: number;
}) {
  const schemas: any[] = [];

  // Organization
  schemas.push(generateOrganizationSchema());

  // Breadcrumb
  schemas.push(
    generateBreadcrumbSchema([
      { name: 'Início', url: 'https://www.meuddd.com.br' },
      { name: 'Estados', url: 'https://www.meuddd.com.br/estados' },
      { name: city.state, url: `https://www.meuddd.com.br/estado/${city.stateSlug}` },
      { name: city.name, url: `https://www.meuddd.com.br/cidade/${city.stateAbbreviation.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}` },
    ])
  );

  // Local Business
  schemas.push(
    generateLocalBusinessSchema({
      name: city.name,
      description: `Código DDD de ${city.name} - ${city.stateAbbreviation}. Informações completas sobre telefonia e operadoras disponíveis.`,
      city: city.name,
      state: city.stateAbbreviation,
      telephone: `+55 ${city.ddd}`,
      latitude: city.latitude,
      longitude: city.longitude,
    })
  );

  return schemas;
}

/**
 * Gera schema para página inicial
 */
export function generateHomePageSchema() {
  const schemas: any[] = [];

  // Organization
  schemas.push(generateOrganizationSchema());

  // WebSite
  schemas.push(generateWebSiteSchema());

  return schemas;
}
