import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Phone, Users, Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import MainLayout from '@/components/layouts/MainLayout';
import type { Region } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import SEOHead from '@/components/common/SEOHead';
import { homePageSEO } from '@/data/seoData';
import { generateHomePageSchema } from '@/utils/structuredData';
import { sanitizeSearchInput, debounce } from '@/utils/security';

// PERFORMANCE: Import lite data synchronously for instant initial render (~5KB vs 354KB)
import { brazilianStatesLite, searchStatesLite, getStatisticsLite, type StateLite } from '@/data/statesLite';

// Lazy load only blog and FAQ data (lower priority content)
const loadBlogData = () => import('@/data/blog');
const loadFAQData = () => import('@/data/faq');

const regions: { name: Region | 'Todos'; color: string }[] = [
  { name: 'Norte', color: 'bg-primary text-primary-foreground' },
  { name: 'Nordeste', color: 'bg-secondary text-secondary-foreground' },
  { name: 'Centro-Oeste', color: 'bg-accent text-accent-foreground' },
  { name: 'Sudeste', color: 'bg-destructive text-destructive-foreground' },
  { name: 'Sul', color: 'bg-accent text-accent-foreground' },
];

// Componente de Loading Skeleton para melhor UX
const BlogSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-48 w-full bg-muted" />
    <Skeleton className="h-6 w-3/4 bg-muted" />
    <Skeleton className="h-4 w-full bg-muted" />
  </div>
);

const FAQSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-16 w-full bg-muted" />
    ))}
  </div>
);

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StateLite[]>([]);
  const [showResults, setShowResults] = useState(false);
  // PERFORMANCE: Use lite data immediately, no async loading needed for initial render
  const [stats] = useState(getStatisticsLite);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [faqItems, setFaqItems] = useState<any[]>([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);
  const [isLoadingFAQ, setIsLoadingFAQ] = useState(true);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1
  });

  // Carrega blog posts de forma assíncrona (não bloqueia renderização inicial)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadBlogData().then((module) => {
        setBlogPosts(module.getLatestBlogPosts(6));
        setIsLoadingBlog(false);
      });
    }, 100); // Pequeno delay para priorizar conteúdo principal
    return () => clearTimeout(timer);
  }, []);

  // Carrega FAQ de forma assíncrona
  useEffect(() => {
    const timer = setTimeout(() => {
      loadFAQData().then((module) => {
        setFaqItems(module.getAllFAQs());
        setIsLoadingFAQ(false);
      });
    }, 200); // Delay maior pois FAQ está mais abaixo na página
    return () => clearTimeout(timer);
  }, []);

  // PERFORMANCE: Use lite search for instant results (no async loading)
  const performSearch = useCallback((term: string) => {
    const sanitized = sanitizeSearchInput(term);
    if (sanitized.length > 0) {
      const results = searchStatesLite(sanitized);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, []);

  // Debounced search para evitar muitas chamadas
  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  );

  // Busca instantânea enquanto o usuário digita
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeSearchInput(searchTerm);
    if (sanitized.trim()) {
      // Se há resultados, navega para o primeiro
      if (searchResults.length === 1) {
        navigate(`/estado/${searchResults[0].slug}`);
      } else if (searchResults.length > 0) {
        navigate(`/estados?search=${encodeURIComponent(sanitized)}`);
      }
      setShowResults(false);
    }
  };

  const handleResultClick = (stateId: string) => {
    navigate(`/estado/${stateId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleRegionFilter = (region: Region | 'Todos') => {
    if (region === 'Todos') {
      navigate('/estados');
    } else {
      navigate(`/estados?region=${encodeURIComponent(region)}`);
    }
  };

  return (
    <MainLayout>
      <SEOHead
        {...homePageSEO}
        structuredData={generateHomePageSchema()}
      />
      
      {/* DEBUG: Teste simples para verificar render */}
      <div style={{ padding: '20px', background: 'red', color: 'white', margin: '20px' }}>
        DEBUG: HomePage está renderizando! Stats: {stats.totalStates} estados
      </div>
      <div className="py-12 xl:py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 xl:mb-16">
            <h1 className="text-3xl xl:text-5xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Encontre o Código DDD que Você Precisa
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-w-3xl mx-auto max-sm:text-sm">
              Busque por estado, cidade ou código DDD. Temos informações de todos os 27 estados brasileiros
              com códigos telefônicos atualizados.
            </p>
          </div>

          {/* Search Section */}
          <Card className="max-w-3xl mx-auto mb-12 xl:mb-16 shadow-lg">
            <CardContent className="p-6 xl:p-8">
              <h2 className="text-xl xl:text-2xl font-bold text-foreground mb-4 text-center max-sm:text-lg">
                Busca de Códigos DDD
              </h2>
              <p className="text-sm xl:text-base text-muted-foreground text-center mb-6 max-sm:text-xs">
                Entre com o estado, cidade, número ou pergunte "qual DDD de..."
              </p>
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch} className="flex gap-2 @container">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Ex: Alagoas, 82, DDD de Goiás, qual DDD de SP..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => searchTerm.trim() && setShowResults(true)}
                      className="h-12 xl:h-14 text-base max-sm:h-10 max-sm:text-sm pr-10"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="h-12 xl:h-14 px-6 xl:px-8 bg-button-dark text-button-dark-foreground hover:bg-button-dark/90 max-sm:h-10 max-sm:px-4"
                  >
                    <Search className="h-5 w-5 mr-2 max-sm:mr-0" />
                    <span className="max-sm:hidden">Buscar</span>
                  </Button>
                </form>

                {/* Dropdown de Resultados Instantâneos */}
                {showResults && searchTerm.trim() && (
                  <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-xl max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                          {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                        </div>
                        {searchResults.map((state) => (
                          <button
                            key={state.id}
                            onClick={() => handleResultClick(state.id)}
                            className="w-full text-left px-3 py-3 hover:bg-accent rounded-md transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-foreground group-hover:text-accent-foreground">
                                    {state.name}
                                  </span>
                                  <Badge className="bg-button-dark text-button-dark-foreground text-xs">
                                    {state.abbreviation}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span>{state.region}</span>
                                  <span>•</span>
                                  <span>Capital: {state.capital}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <div className="flex flex-wrap gap-1">
                                    {state.dddCodes.map((ddd) => (
                                      <Badge 
                                        key={ddd} 
                                        variant="outline" 
                                        className="text-xs px-2 py-0"
                                      >
                                        {ddd}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhum resultado encontrado para "{searchTerm}"</p>
                        <p className="text-xs mt-1">Tente buscar por estado, cidade ou código DDD</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 xl:mb-16 max-w-5xl mx-auto">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <MapPin className="h-8 w-8 xl:h-10 xl:w-10 text-primary" />
                  </div>
                </div>
                <div className="text-3xl xl:text-4xl font-bold text-primary mb-2 max-sm:text-2xl">
                  {stats.totalStates}
                </div>
                <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Estados Brasileiros
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary/10 p-4 rounded-full">
                    <Phone className="h-8 w-8 xl:h-10 xl:w-10 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl xl:text-4xl font-bold text-secondary mb-2 max-sm:text-2xl">
                  {stats.totalDDDCodes}+
                </div>
                <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Códigos DDD
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Users className="h-8 w-8 xl:h-10 xl:w-10 text-accent" />
                  </div>
                </div>
                <div className="text-3xl xl:text-4xl font-bold text-accent mb-2 max-sm:text-2xl">
                  {stats.totalCities}+
                </div>
                <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  Cidades Cadastradas
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Region Filters */}
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="text-xl xl:text-2xl font-bold text-foreground mb-6 max-sm:text-lg">
              Filtrar por Região
            </h2>
            <div className="flex flex-wrap justify-center gap-3 xl:gap-4">
              {regions.map((region) => (
                <Button
                  key={region.name}
                  onClick={() => handleRegionFilter(region.name)}
                  className={`${region.color} px-6 xl:px-8 py-2 xl:py-3 text-sm xl:text-base font-medium rounded-full hover:opacity-90 transition-opacity max-sm:px-4 max-sm:text-xs`}
                >
                  {region.name}
                </Button>
              ))}
            </div>
          </div>

          {/* States Grid */}
          <div className="mb-8 xl:mb-12">
            <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-6 text-center max-sm:text-xl">
              Todos os Estados Brasileiros
            </h2>
            <p className="text-base xl:text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto max-sm:text-sm">
              Clique em um estado para ver detalhes completos dos códigos DDD e cidades
            </p>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
              {brazilianStatesLite.map((state) => (
                <Card 
                  key={state.id} 
                  className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                  onClick={() => navigate(`/estado/${state.slug}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl xl:text-2xl font-bold text-foreground max-sm:text-lg">
                        {state.name}
                      </CardTitle>
                      <Badge className="bg-button-dark text-button-dark-foreground text-base xl:text-lg font-bold px-3 py-1 max-sm:text-sm">
                        {state.abbreviation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Region */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 xl:h-5 xl:w-5 flex-shrink-0" />
                        <span className="text-sm xl:text-base max-sm:text-xs">{state.region}</span>
                      </div>

                      {/* Population */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 xl:h-5 xl:w-5 flex-shrink-0" />
                        <span className="text-sm xl:text-base max-sm:text-xs">
                          {state.population.toLocaleString('pt-BR')} habitantes
                        </span>
                      </div>

                      {/* Capital */}
                      <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        <span className="font-medium">Capital:</span> {state.capital}
                      </div>

                      {/* DDD Codes */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="h-4 w-4 xl:h-5 xl:w-5 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">
                            Códigos DDD:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {state.dddCodes.map((ddd) => (
                            <Badge 
                              key={ddd} 
                              variant="outline" 
                              className="text-sm xl:text-base font-semibold px-3 py-1 max-sm:text-xs"
                            >
                              {ddd}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/estado/${state.slug}`);
                      }}
                      className="w-full bg-button-dark text-button-dark-foreground hover:bg-button-dark/90"
                    >
                      Ver detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Blog Section */}
          <div className="container mx-auto px-4 py-12 xl:py-16">
            <div className="mb-8">
              <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-3 max-sm:text-2xl">
                Blog MEU DDD
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                Descubra a história e curiosidades sobre os códigos DDD do Brasil
              </p>
            </div>

            {/* Carousel */}
            {isLoadingBlog ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <BlogSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-6">
                    {blogPosts.map((post) => (
                    <div key={post.id} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] xl:flex-[0_0_calc(33.333%-16px)] min-w-0">
                      <Link to={`/blog/${post.id}`}>
                        <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardHeader className="pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                            <CardTitle className="text-lg xl:text-xl font-bold text-foreground line-clamp-2 max-sm:text-base">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm xl:text-base text-muted-foreground line-clamp-3 mb-4 max-sm:text-xs">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                onClick={scrollPrev}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-lg hidden md:flex"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={scrollNext}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-lg hidden md:flex"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            )}

            {/* View All Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => navigate('/blog')}
                className="bg-button-dark text-button-dark-foreground hover:bg-button-dark/90 px-8 py-6 text-base xl:text-lg max-sm:text-sm"
              >
                Ver todos
              </Button>
            </div>
          </div>

          {/* Sitemap CTA Section */}
          <div className="container mx-auto px-4 py-12 xl:py-16">
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20">
              <CardContent className="p-8 xl:p-12 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl xl:text-3xl font-bold text-foreground max-sm:text-xl">
                    🗺️ Explore Todas as Páginas da Plataforma
                  </h2>
                  <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                    Acesse nosso mapa do site completo com todas as 28.629 URLs organizadas: 
                    12 páginas principais, 27 estados, 5.718 cidades e 22.872 artigos sobre internet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button
                      onClick={() => navigate('/mapa-do-site')}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base xl:text-lg max-sm:text-sm min-w-[200px]"
                    >
                      Ver Mapa do Site
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Navegação fácil por categoria
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="container mx-auto px-4 py-12 xl:py-16">
            <div className="mb-8 text-center">
              <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-3 max-sm:text-2xl">
                Perguntas Frequentes sobre DDD
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground max-w-3xl mx-auto max-sm:text-sm">
                Tire todas as suas dúvidas sobre a história e funcionamento dos códigos DDD no Brasil
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {isLoadingFAQ ? (
                <FAQSkeleton />
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqItems.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left text-base xl:text-lg font-semibold text-foreground hover:no-underline py-6 max-sm:text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm xl:text-base text-muted-foreground leading-relaxed pb-6 max-sm:text-xs">
                      <div className="prose prose-sm xl:prose-base max-w-none">
                        {faq.answer.split('\n\n').map((paragraph, index) => (
                          <p 
                            key={index} 
                            className="mb-4 last:mb-0"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
