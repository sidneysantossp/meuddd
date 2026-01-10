// Helper functions for blog posts
export const generateStructuredData = (post: {
  id: string;
  title: string;
  metaDescription: string;
  image: string;
  date: string;
  author: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.metaDescription,
  image: post.image,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Organization',
    name: post.author,
    url: 'https://www.meuddd.com.br'
  },
  publisher: {
    '@type': 'Organization',
    name: 'MEU DDD',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.meuddd.com.br/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.meuddd.com.br/blog/${post.id}`
  }
});

// SEO metadata for each article
export const blogMetadata = {
  'historia-ddd-brasil': {
    metaDescription: 'Descubra a história completa do sistema DDD no Brasil desde 1969. Saiba como a Discagem Direta à Distância revolucionou as telecomunicações brasileiras.',
    keywords: ['história do DDD', 'DDD Brasil', 'telecomunicações brasileiras', 'Embratel', 'discagem direta à distância', 'códigos DDD', 'ANATEL', 'telefonia Brasil']
  },
  'evolucao-codigos-ddd': {
    metaDescription: 'Acompanhe a evolução dos códigos DDD no Brasil desde os anos 60 até 2026. Conheça todas as transformações tecnológicas do sistema de telecomunicações brasileiro.',
    keywords: ['evolução DDD', 'códigos DDD história', 'DDD décadas', 'telefonia móvel Brasil', '5G Brasil', 'portabilidade numérica', 'VoIP Brasil']
  },
  'impacto-ddd-comunicacao': {
    metaDescription: 'Entenda o impacto profundo do sistema DDD na comunicação, economia e sociedade brasileira. Descubra como o DDD transformou o Brasil em mais de 50 anos.',
    keywords: ['impacto DDD', 'comunicação Brasil', 'integração nacional', 'desenvolvimento regional', 'telecomunicações impacto social', 'DDD economia']
  },
  'curiosidades-ddd-brasil': {
    metaDescription: 'Descubra curiosidades fascinantes sobre os códigos DDD do Brasil. Saiba por que São Paulo é 11, qual estado tem mais DDDs e outros fatos interessantes.',
    keywords: ['curiosidades DDD', 'fatos DDD Brasil', 'códigos DDD curiosos', 'DDD São Paulo', 'maior DDD Brasil', 'DDD único estado']
  },
  'ddd-revolucionou-ligacoes': {
    metaDescription: 'Entenda a tecnologia por trás do sistema DDD e como ele revolucionou as ligações telefônicas no Brasil. Conheça o funcionamento técnico completo.',
    keywords: ['DDD tecnologia', 'revolução telefônica', 'comutação telefônica', 'centrais automáticas', 'infraestrutura telecomunicações', 'DDD funcionamento']
  },
  'futuro-ddd-tecnologia': {
    metaDescription: 'Descubra o futuro do sistema DDD no Brasil com 5G, IA e novas tecnologias. Saiba como o DDD está se adaptando à era digital e tendências até 2030.',
    keywords: ['futuro DDD', 'DDD 5G', 'inteligência artificial telecomunicações', 'VoIP futuro', 'telefonia 2026', 'inovação DDD', 'sustentabilidade telecomunicações']
  }
};
