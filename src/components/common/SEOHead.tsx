import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  // Meta Tags Básicas
  title: string; // Até 60 caracteres
  description: string; // Até 160 caracteres
  keywords?: string[]; // 5-10 palavras-chave
  canonical?: string;
  
  // Open Graph
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterImage?: string;
  
  // Dados Estruturados
  structuredData?: object | object[];
  
  // Configurações Adicionais
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

/**
 * Componente SEO completo para gerenciar todas as meta tags e dados estruturados
 * 
 * @example
 * ```tsx
 * <SEOHead
 *   title="Códigos DDD de São Paulo | Consulta Completa"
 *   description="Consulte todos os códigos DDD de São Paulo. Lista completa com 645 cidades, informações detalhadas e operadoras disponíveis."
 *   keywords={['DDD São Paulo', 'código telefônico SP', 'DDD 11']}
 *   canonical="https://www.meuddd.com.br/estado/sao-paulo"
 * />
 * ```
 */
export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogType = 'website',
  ogImage = 'https://www.meuddd.com.br/images/og-default.jpg',
  ogImageAlt = 'MEU DDD - Códigos DDD do Brasil',
  twitterCard = 'summary_large_image',
  twitterImage,
  structuredData,
  noindex = false,
  nofollow = false,
  author = 'MEU DDD - Códigos DDD do Brasil',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: SEOProps) {
  // Validações
  if (title.length > 60) {
    console.warn(`⚠️ SEO Warning: Title muito longo (${title.length} caracteres). Máximo recomendado: 60 caracteres.`);
  }
  
  if (description.length > 160) {
    console.warn(`⚠️ SEO Warning: Description muito longa (${description.length} caracteres). Máximo recomendado: 160 caracteres.`);
  }

  // Construir robots meta tag
  const robotsContent: string[] = [];
  if (noindex) robotsContent.push('noindex');
  else robotsContent.push('index');
  if (nofollow) robotsContent.push('nofollow');
  else robotsContent.push('follow');

  // URL canônica
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  // Imagem do Twitter (usa ogImage se não especificada)
  const twitterImageUrl = twitterImage || ogImage;

  return (
    <Helmet>
      {/* Meta Tags Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent.join(', ')} />
      <meta name="googlebot" content={robotsContent.join(', ')} />
      
      {/* Google AdSense - Meta Tag de Verificação */}
      <meta name="google-adsense-account" content="ca-pub-3459130972339055" />
      
      {/* Google AdSense - Script */}
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459130972339055"
        crossOrigin="anonymous"
      />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Language */}
      <meta httpEquiv="content-language" content="pt-BR" />
      <html lang="pt-BR" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="MEU DDD" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Open Graph - Article (se aplicável) */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@meuddd" />
      <meta name="twitter:creator" content="@meuddd" />
      
      {/* Dados Estruturados (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : [structuredData]
          )}
        </script>
      )}
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      
      {/* Publisher */}
      <meta name="publisher" content="MEU DDD - Códigos DDD do Brasil" />
      
      {/* Copyright */}
      <meta name="copyright" content="© 2026 MEU DDD - Códigos DDD do Brasil" />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="BR" />
      <meta name="geo.placename" content="Brasil" />
      
      {/* Revisit After */}
      <meta name="revisit-after" content="7 days" />
      
      {/* Rating */}
      <meta name="rating" content="general" />
    </Helmet>
  );
}

/**
 * Hook para validar configurações de SEO
 */
export function useSEOValidation(props: SEOProps) {
  React.useEffect(() => {
    const warnings: string[] = [];
    
    // Validar título
    if (props.title.length < 30) {
      warnings.push(`Título muito curto (${props.title.length} caracteres). Recomendado: 50-60 caracteres.`);
    }
    if (props.title.length > 60) {
      warnings.push(`Título muito longo (${props.title.length} caracteres). Máximo: 60 caracteres.`);
    }
    
    // Validar descrição
    if (props.description.length < 120) {
      warnings.push(`Descrição muito curta (${props.description.length} caracteres). Recomendado: 150-160 caracteres.`);
    }
    if (props.description.length > 160) {
      warnings.push(`Descrição muito longa (${props.description.length} caracteres). Máximo: 160 caracteres.`);
    }
    
    // Validar keywords
    if (props.keywords && props.keywords.length < 3) {
      warnings.push(`Poucas keywords (${props.keywords.length}). Recomendado: 5-10 keywords.`);
    }
    if (props.keywords && props.keywords.length > 10) {
      warnings.push(`Muitas keywords (${props.keywords.length}). Recomendado: 5-10 keywords.`);
    }
    
    // Validar canonical
    if (!props.canonical) {
      warnings.push('Canonical URL não definida.');
    }
    
    // Exibir warnings
    if (warnings.length > 0 && process.env.NODE_ENV === 'development') {
      console.group('⚠️ SEO Warnings');
      warnings.forEach(warning => console.warn(warning));
      console.groupEnd();
    }
  }, [props]);
}
