import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { brazilianStates } from '@/data/states';
import { allBlogPosts } from '@/data/blogPosts';
import { ChevronLeft, ChevronRight, Home, MapPin, FileText, Building2 } from 'lucide-react';

interface SitemapUrl {
  url: string;
  title: string;
  category: 'static' | 'state' | 'city' | 'blog';
  priority: number;
}

const URLS_PER_PAGE = 1000;

export default function SitemapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [allUrls, setAllUrls] = useState<SitemapUrl[]>([]);
  const [paginatedUrls, setPaginatedUrls] = useState<SitemapUrl[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const urls: SitemapUrl[] = [];

    // 1. Static pages
    const staticPages = [
      { url: '/', title: 'Página Inicial', priority: 1.0 },
      { url: '/estados', title: 'Estados do Brasil', priority: 0.9 },
      { url: '/validar', title: 'Validar DDD', priority: 0.8 },
      { url: '/busca-voz', title: 'Busca por Voz', priority: 0.7 },
      { url: '/gerador-numeros', title: 'Gerador de DDD', priority: 0.7 },
      { url: '/sobre', title: 'Sobre', priority: 0.6 },
      { url: '/sobre-nos', title: 'Sobre Nós', priority: 0.6 },
      { url: '/contato', title: 'Contato', priority: 0.6 },
      { url: '/blog', title: 'Blog', priority: 0.8 },
      { url: '/mapa-do-site', title: 'Mapa do Site', priority: 0.5 },
      { url: '/politicas-de-privacidade', title: 'Políticas de Privacidade', priority: 0.4 },
      { url: '/termos-de-uso', title: 'Termos de Uso', priority: 0.4 },
      { url: '/politicas-de-cookies', title: 'Políticas de Cookies', priority: 0.4 },
      { url: '/imprensa', title: 'Imprensa', priority: 0.3 },
      { url: '/trabalhe-conosco', title: 'Trabalhe Conosco', priority: 0.3 },
    ];

    staticPages.forEach(page => {
      urls.push({
        url: page.url,
        title: page.title,
        category: 'static',
        priority: page.priority
      });
    });

    // 2. State pages
    brazilianStates.forEach(state => {
      urls.push({
        url: `/estado/${state.slug}`,
        title: `${state.name} - ${state.abbreviation}`,
        category: 'state',
        priority: 0.8
      });
    });

    // 3. City pages
    brazilianStates.forEach(state => {
      state.cities.forEach(city => {
        const citySlug = city.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        urls.push({
          url: `/cidade/${citySlug}`,
          title: `${city.name} - ${state.abbreviation}`,
          category: 'city',
          priority: 0.7
        });
      });
    });

    // 4. Blog posts
    allBlogPosts.forEach(post => {
      urls.push({
        url: `/blog/${post.state.slug}/${post.city.slug}/${post.slug}`,
        title: post.title,
        category: 'blog',
        priority: 0.6
      });
    });

    // Sort by priority (descending) then by title
    urls.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title, 'pt-BR');
    });

    setAllUrls(urls);
    setTotalPages(Math.ceil(urls.length / URLS_PER_PAGE));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * URLS_PER_PAGE;
    const endIndex = startIndex + URLS_PER_PAGE;
    setPaginatedUrls(allUrls.slice(startIndex, endIndex));
  }, [allUrls, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'static':
        return <Home className="w-4 h-4" />;
      case 'state':
        return <Building2 className="w-4 h-4" />;
      case 'city':
        return <MapPin className="w-4 h-4" />;
      case 'blog':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'static':
        return 'Página Estática';
      case 'state':
        return 'Estado';
      case 'city':
        return 'Cidade';
      case 'blog':
        return 'Artigo';
      default:
        return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'static':
        return 'bg-primary/10 text-primary';
      case 'state':
        return 'bg-secondary/10 text-secondary';
      case 'city':
        return 'bg-accent/10 text-accent';
      case 'blog':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 xl:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
            🗺️ Mapa do Site
          </h1>
          <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
            Navegue por todas as páginas da plataforma MEU DDD. Total de {allUrls.length.toLocaleString('pt-BR')} URLs organizadas em {totalPages} páginas.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Páginas Estáticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {allUrls.filter(u => u.category === 'static').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-secondary" />
                Estados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {allUrls.filter(u => u.category === 'state').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Cidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {allUrls.filter(u => u.category === 'city').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Artigos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {allUrls.filter(u => u.category === 'blog').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination Info */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Exibindo URLs {((currentPage - 1) * URLS_PER_PAGE + 1).toLocaleString('pt-BR')} - {Math.min(currentPage * URLS_PER_PAGE, allUrls.length).toLocaleString('pt-BR')} de {allUrls.length.toLocaleString('pt-BR')} | Página {currentPage} de {totalPages}
          </p>
        </div>

        {/* URL List */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {paginatedUrls.map((item, index) => (
                <Link
                  key={`${item.url}-${index}`}
                  to={item.url}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {item.url}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2 text-muted-foreground">
                  {page}
                </span>
              )
            ))}

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {allUrls.length.toLocaleString('pt-BR')} URLs totais
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
