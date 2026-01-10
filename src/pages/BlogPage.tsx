import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SEOHead from '@/components/common/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainLayout from '@/components/layouts/MainLayout';
import { allBlogPosts } from '@/data/blogPosts';

export default function BlogPage() {
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const postTypes = [
    'Todos',
    'Melhor Fibra',
    'Cobertura',
    'Empresarial',
    'Plano Barato'
  ];

  const typeMapping: Record<string, string> = {
    'Melhor Fibra': 'melhor-internet-fibra',
    'Cobertura': 'internet-fibra-cobertura',
    'Empresarial': 'internet-empresarial',
    'Plano Barato': 'plano-internet-barato'
  };

  // Filtrar posts por tipo e busca
  const filteredPosts = useMemo(() => {
    let posts = selectedType === 'Todos' 
      ? allBlogPosts 
      : allBlogPosts.filter(post => post.type === typeMapping[selectedType]);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.city.name.toLowerCase().includes(query) ||
        post.state.name.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [selectedType, searchQuery]);

  // Paginação
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getTypeBadgeText = (type: string) => {
    const mapping: Record<string, string> = {
      'melhor-internet-fibra': 'Melhor Fibra',
      'internet-fibra-cobertura': 'Cobertura',
      'internet-empresarial': 'Empresarial',
      'plano-internet-barato': 'Plano Barato'
    };
    return mapping[type] || type;
  };

  const getTypeBadgeVariant = (type: string): "default" | "secondary" | "outline" => {
    const mapping: Record<string, "default" | "secondary" | "outline"> = {
      'melhor-internet-fibra': 'default',
      'internet-fibra-cobertura': 'secondary',
      'internet-empresarial': 'outline',
      'plano-internet-barato': 'secondary'
    };
    return mapping[type] || 'outline';
  };

  return (
    <MainLayout>
      <SEOHead
        title="Blog MEU DDD - Guias sobre Internet Fibra no Brasil"
        description="Guias completos sobre internet fibra, cobertura, planos empresariais e econômicos para cidades do Brasil. Encontre o melhor provedor para você."
        canonical="https://www.meuddd.com.br/blog"
        keywords={['blog ddd', 'internet fibra brasil', 'provedores internet', 'internet empresarial', 'planos internet']}
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary to-secondary py-16 xl:py-24">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Voltar para Home</span>
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl xl:text-6xl font-bold text-primary-foreground mb-4 max-sm:text-3xl">
                📝 Blog MEU DDD
              </h1>
              <p className="text-lg xl:text-xl text-primary-foreground/90 max-sm:text-base leading-relaxed">
                Guias completos sobre internet fibra, cobertura e planos para cidades do Brasil
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 xl:py-16">
          {/* Layout com Sidebar */}
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Conteúdo Principal */}
            <div className="flex-1 min-w-0">
              {/* Busca e Filtros */}
              <div className="mb-8 space-y-6">
                {/* Busca */}
                <div className="relative max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por cidade ou assunto..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-12 h-12 text-base border-2 focus:border-primary"
                  />
                </div>

                {/* Filtros de Tipo - Mobile */}
                <div className="flex flex-wrap gap-2 xl:hidden">
                  {postTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTypeChange(type)}
                      className="rounded-full"
                    >
                      {type}
                    </Button>
                  ))}
                </div>

                {/* Resultados */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                  </p>
                </div>
              </div>

              {/* Grid de Artigos */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-12">
                {currentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.state.slug}/${post.city.slug}/${post.slug}`}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
                      {/* Card Header com Gradiente */}
                      <div className="h-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <Badge variant={getTypeBadgeVariant(post.type)} className="shadow-sm">
                            {getTypeBadgeText(post.type)}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {post.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="font-medium">{post.city.name} - {post.state.uf}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Ler artigo</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <div className="flex items-center gap-2 flex-wrap">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              )}

              {/* Sem Resultados */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-muted-foreground mb-6">
                    Tente ajustar os filtros ou fazer uma nova busca
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedType('Todos');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar - Categorias */}
            <aside className="xl:w-80 shrink-0">
              <div className="sticky top-4 space-y-6">
                <Card className="shadow-lg border-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      📂 Categorias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {postTypes.map((type) => {
                      const count = type === 'Todos' 
                        ? allBlogPosts.length 
                        : allBlogPosts.filter(post => post.type === typeMapping[type]).length;
                      
                      return (
                        <button
                          key={type}
                          onClick={() => handleTypeChange(type)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                            selectedType === type
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          <span className="font-medium">{type}</span>
                          <Badge 
                            variant={selectedType === type ? 'secondary' : 'outline'}
                            className={`${
                              selectedType === type 
                                ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30' 
                                : ''
                            }`}
                          >
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Card de Informação Adicional */}
                <Card className="shadow-lg border-2 hidden xl:block">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      💡 Sobre o Blog
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Encontre guias completos sobre internet fibra, cobertura e planos para todas as cidades do Brasil.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium text-muted-foreground">Cidades</span>
                        <span className="text-lg font-bold text-secondary">{new Set(allBlogPosts.map(p => p.city.slug)).size}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium text-muted-foreground">Estados</span>
                        <span className="text-lg font-bold text-accent">{new Set(allBlogPosts.map(p => p.state.slug)).size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
