import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ChevronRight, Clock, Calendar, User, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';
import AuthorBox from '@/components/blog/AuthorBox';
import { allBlogPosts } from '@/data/blogPosts';

export default function BlogPostPage() {
  const { stateSlug, citySlug, postSlug } = useParams<{ stateSlug: string; citySlug: string; postSlug: string }>();
  const navigate = useNavigate();

  // Encontrar o post
  const post = allBlogPosts.find(p => 
    p.state.slug === stateSlug && 
    p.city.slug === citySlug && 
    p.slug === postSlug
  );

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [postSlug]);

  if (!post) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <h1 className="text-2xl xl:text-3xl font-bold text-foreground mb-4">
            Artigo não encontrado
          </h1>
          <Button onClick={() => navigate('/blog')} className="bg-primary text-primary-foreground">
            Voltar para o Blog
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Gerar dados estruturados para SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'MEU DDD',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.meuddd.com.br/logo.png'
      }
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    mainEntityOfPage: `https://www.meuddd.com.br/blog/${post.state.slug}/${post.city.slug}/${post.slug}`
  };

  // Dados estruturados para FAQ
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.content.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  // Dados estruturados para Breadcrumb
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.meuddd.com.br'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.meuddd.com.br/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.state.name,
        item: `https://www.meuddd.com.br/blog/${post.state.slug}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.city.name,
        item: `https://www.meuddd.com.br/blog/${post.state.slug}/${post.city.slug}`
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: post.title,
        item: `https://www.meuddd.com.br/blog/${post.state.slug}/${post.city.slug}/${post.slug}`
      }
    ]
  };

  // Combinar todos os dados estruturados
  const allStructuredData = [structuredData, faqStructuredData, breadcrumbStructuredData];

  // Encontrar outros artigos da mesma cidade
  const relatedPosts = allBlogPosts.filter(p => 
    p.city.slug === citySlug && p.slug !== postSlug
  ).slice(0, 3);

  return (
    <MainLayout>
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={`https://www.meuddd.com.br/blog/${post.state.slug}/${post.city.slug}/${post.slug}`}
        keywords={post.keywords}
        ogType="article"
        structuredData={allStructuredData}
      />

      <article className="py-6 xl:py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-primary">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/estado/${post.state.slug}`} className="hover:text-primary">
              {post.state.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/cidade/${post.city.slug}`} className="hover:text-primary">
              {post.city.name}
            </Link>
          </nav>

          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate(`/cidade/${post.city.slug}`)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para {post.city.name}
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6 max-sm:text-base">
              {post.description}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min de leitura</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{post.city.name}</Badge>
              <Badge variant="secondary">{post.state.name}</Badge>
              <Badge variant="secondary">DDD {post.city.ddd}</Badge>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8">
              {post.content.introduction.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-foreground mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            {/* Sections */}
            {post.content.sections.map((section) => (
              <section key={section.id} className="mb-12">
                <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-4 max-sm:text-xl">
                  {section.title}
                </h2>

                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className="text-foreground mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}

                {/* Subsections */}
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="ml-0 xl:ml-6 my-6">
                    <h3 className="text-xl xl:text-2xl font-semibold text-foreground mb-3 max-sm:text-lg">
                      {subsection.title}
                    </h3>
                    {subsection.content.split('\n\n').map((paragraph, pIndex) => (
                      <p 
                        key={pIndex} 
                        className="text-foreground mb-4 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                ))}

                {/* Table */}
                {section.table && (
                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          {section.table.headers.map((header, hIndex) => (
                            <th key={hIndex} className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIndex) => (
                          <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                            {row.cells.map((cell, cIndex) => (
                              <td key={cIndex} className="border border-border px-4 py-3 text-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Checklist */}
            {post.content.checklist.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-6 max-sm:text-xl">
                  ✅ Checklist Antes de Contratar
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {post.content.checklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-primary mt-1">☐</span>
                          <span 
                            className="text-foreground"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* FAQ */}
            {post.content.faq.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-6 max-sm:text-xl">
                  ❓ Perguntas Frequentes
                </h2>
                <div className="space-y-6">
                  {post.content.faq.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg text-foreground">
                          {item.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p 
                          className="text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-4 max-sm:text-xl">
                Conclusão
              </h2>
              {post.content.conclusion.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-foreground mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </section>

            {/* Author Box */}
            <AuthorBox />
          </div>

          <Separator className="my-8" />

          {/* Internal Links */}
          <section className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-4">
              📍 Recursos Relacionados
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Link to={`/cidade/${post.city.slug}`} className="block">
                <Card className="hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ExternalLink className="h-4 w-4" />
                      Página de {post.city.name}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Informações completas sobre códigos DDD e cidades
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to={`/estado/${post.state.slug}`} className="block">
                <Card className="hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ExternalLink className="h-4 w-4" />
                      Estado de {post.state.name}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Todas as cidades e DDDs do estado
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-foreground mb-4">
                📝 Outros Artigos sobre {post.city.name}
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.state.slug}/${relatedPost.city.slug}/${relatedPost.slug}`}
                    className="block"
                  >
                    <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                        <CardTitle className="text-base line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{relatedPost.readingTime} min</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </MainLayout>
  );
}
