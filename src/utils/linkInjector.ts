/**
 * Utility para adicionar links internos e externos em conteúdo de artigos
 */

interface LinkRule {
  keywords: string[];
  url: string;
  isExternal: boolean;
  title?: string;
}

// Links externos para sites governamentais e de autoridade
const externalLinks: LinkRule[] = [
  {
    keywords: ['IBGE', 'Instituto Brasileiro de Geografia e Estatística'],
    url: 'https://www.ibge.gov.br',
    isExternal: true,
    title: 'Instituto Brasileiro de Geografia e Estatística'
  },
  {
    keywords: ['Anatel', 'Agência Nacional de Telecomunicações'],
    url: 'https://www.gov.br/anatel/pt-br',
    isExternal: true,
    title: 'Agência Nacional de Telecomunicações'
  },
  {
    keywords: ['Procon'],
    url: 'https://www.procon.sp.gov.br',
    isExternal: true,
    title: 'Procon - Proteção e Defesa do Consumidor'
  },
  {
    keywords: ['Código de Defesa do Consumidor', 'CDC'],
    url: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor',
    isExternal: true,
    title: 'Código de Defesa do Consumidor'
  },
  {
    keywords: ['Ministério das Comunicações'],
    url: 'https://www.gov.br/mcom/pt-br',
    isExternal: true,
    title: 'Ministério das Comunicações'
  }
];

/**
 * Adiciona links internos e externos ao conteúdo do artigo
 */
export function injectLinks(
  content: string,
  cityName: string,
  citySlug: string,
  stateName: string,
  stateSlug: string,
  stateAbbreviation: string,
  ddd: string
): string {
  // Verificar se o conteúdo existe
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  
  let processedContent = content;

  // Links internos
  const internalLinks: LinkRule[] = [
    {
      keywords: [stateName],
      url: `/estado/${stateSlug}`,
      isExternal: false,
      title: `Códigos DDD do ${stateName}`
    },
    {
      keywords: [cityName],
      url: `/cidade/${citySlug}`,
      isExternal: false,
      title: `DDD de ${cityName}`
    },
    {
      keywords: [`DDD ${ddd}`, `código ${ddd}`],
      url: `/cidade/${citySlug}`,
      isExternal: false,
      title: `DDD ${ddd} - ${cityName}`
    },
    {
      keywords: [stateAbbreviation],
      url: `/estado/${stateSlug}`,
      isExternal: false,
      title: `Estado do ${stateName}`
    }
  ];

  // Combinar links internos e externos
  const allLinks = [...internalLinks, ...externalLinks];

  // Processar cada regra de link
  allLinks.forEach(rule => {
    const keywords = rule.keywords.filter(
      (keyword): keyword is string => typeof keyword === 'string' && keyword.trim().length > 0
    );

    if (keywords.length === 0) {
      return;
    }

    keywords.forEach(keyword => {
      // Criar regex para encontrar a palavra-chave (case insensitive, palavra completa)
      // Evitar substituir se já estiver dentro de um link
      const regex = new RegExp(
        `(?<!<a[^>]*>)(?<!href=["'])\\b(${escapeRegex(keyword)})\\b(?![^<]*<\\/a>)`,
        'gi'
      );

      // Contador para limitar substituições (apenas primeira ocorrência)
      let replacementCount = 0;
      const maxReplacements = 1;

      processedContent = processedContent.replace(regex, (match) => {
        if (replacementCount >= maxReplacements) {
          return match;
        }
        replacementCount++;

        const linkAttrs = rule.isExternal
          ? `href="${rule.url}" target="_blank" rel="noopener noreferrer nofollow" title="${rule.title || match}"`
          : `href="${rule.url}" title="${rule.title || match}"`;

        return `<a ${linkAttrs} class="text-primary hover:underline font-medium">${match}</a>`;
      });
    });
  });

  return processedContent;
}

/**
 * Adiciona links em todas as seções do conteúdo do blog post
 */
export function injectLinksInBlogPost(
  blogPost: any,
  cityName: string,
  citySlug: string,
  stateName: string,
  stateSlug: string,
  stateAbbreviation: string,
  ddd: string
): any {
  const inject = (text: string) =>
    injectLinks(text, cityName, citySlug, stateName, stateSlug, stateAbbreviation, ddd);

  return {
    ...blogPost,
    content: {
      ...blogPost.content,
      introduction: inject(blogPost.content.introduction),
      sections: blogPost.content.sections.map((section: any) => ({
        ...section,
        content: inject(section.content),
        subsections: section.subsections?.map((subsection: any) => ({
          ...subsection,
          content: inject(subsection.content)
        }))
      })),
      conclusion: inject(blogPost.content.conclusion),
      faq: blogPost.content.faq.map((faq: any) => ({
        ...faq,
        answer: inject(faq.answer)
      })),
      checklist: blogPost.content.checklist.map((item: any) => ({
        ...item,
        text: inject(item.text)
      }))
    }
  };
}

/**
 * Escapa caracteres especiais para uso em regex
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Adiciona links em um array de blog posts
 */
export function injectLinksInBlogPosts(blogPosts: any[]): any[] {
  return blogPosts.map(post => {
    return injectLinksInBlogPost(
      post,
      post.city.name,
      post.city.slug,
      post.state.name,
      post.state.slug,
      post.state.abbreviation, // Usar a sigla correta do estado
      post.city.ddd
    );
  });
}
