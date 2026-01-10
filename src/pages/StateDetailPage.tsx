import React, { memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Users, Phone, ArrowLeft, Globe, Award, CheckCircle, ExternalLink, Home, ChevronRight, Search, Filter, Map as MapIcon, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '@/components/layouts/MainLayout';
// PERFORMANCE: Use lite data for initial render, load full data async
import { brazilianStatesLite, getStateLiteBySlug, type StateLite } from '@/data/statesLite';
import { useEffect, useState, useMemo, useCallback } from 'react';
import SEOHead from '@/components/common/SEOHead';
import { generateStateSEO as generateSEOData, statesSEOData } from '@/data/seoData';
import { generateStatePageSchema } from '@/utils/structuredData';
import type { State } from '@/types';

// Lazy load heavy data modules
const loadStatesData = () => import('@/data/states');
const loadStateDetailedInfo = () => import('@/data/stateDetailedInfo');

// Type for detailed info
interface StateDetailedInfo {
  area: string;
  municipalities: number;
  regionInfo: { description: string; characteristics: string[] };
  highlights: string[];
  mainOperators: { name: string; coverage: string; services: string[] }[];
  urbanCoverage: string;
  telephonyTips: string[];
  faqs: { question: string; answer: string }[];
  authorityLinks: { name: string; url: string; description: string }[];
  relatedStates: { name: string; ddds: string[] }[];
}

// Loading skeleton for cities
const CitiesSkeleton = () => (
  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Card key={i} className="shadow-md">
        <CardContent className="p-4 xl:p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-8 w-16 mb-3" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// Loading skeleton for info tab
const InfoSkeleton = () => (
  <div className="space-y-6">
    <Card className="shadow-lg">
      <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
      <CardContent><Skeleton className="h-32 w-full" /></CardContent>
    </Card>
  </div>
);

// Memoize city card component to prevent unnecessary re-renders
const CityCard = memo(({ city, onClick }: { city: { name: string; ddd: string }; onClick: () => void }) => (
  <Card 
    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base xl:text-lg font-semibold text-foreground max-sm:text-sm">
          {city.name}
        </h3>
        <Badge variant="outline" className="text-sm xl:text-base font-semibold max-sm:text-xs">
          {city.ddd}
        </Badge>
      </div>
    </CardContent>
  </Card>
));

CityCard.displayName = 'CityCard';

export default function StateDetailPage() {
  const { stateId } = useParams<{ stateId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cities');
  const [searchCity, setSearchCity] = useState('');
  const [filterDDD, setFilterDDD] = useState('all');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const ITEMS_PER_PAGE = 20;
  
  // PERFORMANCE: Use lite data for instant render, load full data async
  const stateLite = getStateLiteBySlug(stateId || '');
  
  // State for async loaded data
  const [fullState, setFullState] = useState<State | null>(null);
  const [detailedInfo, setDetailedInfo] = useState<StateDetailedInfo | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  
  // Load full state data (with cities) async - only when needed
  useEffect(() => {
    if (!stateLite) return;
    
    // Load cities data with small delay to prioritize initial render
    const loadCities = async () => {
      try {
        const module = await loadStatesData();
        const found = module.brazilianStates.find((s: State) => s.slug === stateId);
        if (found) setFullState(found);
      } catch (error) {
        console.error('Error loading state data:', error);
      } finally {
        setIsLoadingCities(false);
      }
    };
    
    // Small delay to let initial UI render first
    const timer = setTimeout(loadCities, 50);
    return () => clearTimeout(timer);
  }, [stateId, stateLite]);
  
  // Load detailed info async
  useEffect(() => {
    if (!stateLite) return;
    
    const loadDetails = async () => {
      try {
        const module = await loadStateDetailedInfo();
        const info = module.stateDetailedInfo[stateLite.id];
        if (info) setDetailedInfo(info);
      } catch (error) {
        console.error('Error loading detailed info:', error);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    
    // Slightly longer delay for details (lower priority)
    const timer = setTimeout(loadDetails, 100);
    return () => clearTimeout(timer);
  }, [stateLite]);
  
  // Use lite data for initial render, full data when loaded
  const state = fullState || (stateLite ? {
    ...stateLite,
    cities: [],
  } as unknown as State : null);

  // Debounce search to reduce re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchCity);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchCity]);

  // Filtrar e ordenar cidades
  const filteredAndSortedCities = useMemo(() => {
    if (!state) return [];
    
    let cities = [...state.cities];
    
    // Filtrar por busca (usando debounced search)
    if (debouncedSearch) {
      cities = cities.filter(city => 
        city.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
    // Filtrar por DDD
    if (filterDDD !== 'all') {
      cities = cities.filter(city => city.ddd === filterDDD);
    }
    
    // Ordenar
    cities.sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === 'ddd-asc') {
        return a.ddd.localeCompare(b.ddd);
      } else if (sortOrder === 'ddd-desc') {
        return b.ddd.localeCompare(a.ddd);
      }
      return 0;
    });
    
    return cities;
  }, [state, debouncedSearch, filterDDD, sortOrder]);

  // Calcular paginação
  const totalPages = Math.ceil(filteredAndSortedCities.length / ITEMS_PER_PAGE);
  const paginatedCities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedCities.slice(startIndex, endIndex);
  }, [filteredAndSortedCities, currentPage, ITEMS_PER_PAGE]);

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterDDD, sortOrder]);

  // Obter DDDs únicos para o filtro
  const uniqueDDDs = useMemo(() => {
    if (!state) return [];
    return [...new Set(state.cities.map(city => city.ddd))].sort();
  }, [state]);

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    // Scroll imediato
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Scroll adicional após um pequeno delay para garantir
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [stateId]);

  if (!state || !detailedInfo) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <h1 className="text-2xl xl:text-3xl font-bold text-foreground mb-4 max-sm:text-xl">
            Estado não encontrado
          </h1>
          <Button onClick={() => navigate('/estados')} className="bg-primary text-primary-foreground">
            Voltar para Estados
          </Button>
        </div>
      </MainLayout>
    );
  }

  const formatPopulation = (population: number) => {
    return population.toLocaleString('pt-BR');
  };

  const dddList = state.dddCodes.join(', ');

  // Gerar URLs externas
  const stateGoogleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(state.name + ', Brasil')}`;
  const capitalGoogleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(state.capital + ', ' + state.name + ', Brasil')}`;
  const ibgeUrl = `https://cidades.ibge.gov.br/brasil/${state.id}/panorama`;

  // Gerar dados de SEO
  const stateSEOInfo = statesSEOData[state.id as keyof typeof statesSEOData];
  const seoData = generateSEOData({
    ...stateSEOInfo,
    citiesCount: state.cities.length,
  });
  
  const structuredData = generateStatePageSchema({
    name: state.name,
    slug: state.slug,
    abbreviation: state.abbreviation,
    capital: state.capital,
    population: state.population.toString(),
    ddds: state.dddCodes,
    region: state.region,
    faqs: detailedInfo?.faqs,
  });

  return (
    <MainLayout>
      <SEOHead
        {...seoData}
        structuredData={structuredData}
      />
      <div className="py-6 xl:py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation - SEO */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/estados" className="hover:text-primary">
              Estados
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{state.name}</span>
          </nav>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/estados')}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para todos os estados
          </Button>

          {/* SEO-Optimized H1 Title */}
          <div className="mb-8">
            <h1 className="text-3xl xl:text-5xl font-bold text-foreground mb-4 max-sm:text-2xl">
              DDD {state.dddCodes.join(', ')} - {state.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-button-dark text-button-dark-foreground text-lg xl:text-xl font-bold px-4 py-2 max-sm:text-base">
                {state.abbreviation}
              </Badge>
              <Badge className="text-base xl:text-lg px-3 py-1 bg-primary text-primary-foreground max-sm:text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {state.region}
              </Badge>
            </div>
            
            {/* SEO-Rich Introduction */}
            <p className="text-base xl:text-lg text-muted-foreground leading-relaxed max-sm:text-sm">
              Encontre o código DDD <strong>{dddList}</strong> para todas as {detailedInfo.municipalities} cidades do {state.name}. 
              Guia completo com informações de telefonia para {formatPopulation(state.population)} habitantes.
            </p>
          </div>

          {/* Quick Stats - Featured Snippet Optimization */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 mb-8">
            <Card className="shadow-md">
              <CardContent className="p-4 xl:p-5 text-center">
                <Users className="h-7 w-7 xl:h-8 xl:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl xl:text-2xl font-bold text-foreground mb-1 max-sm:text-lg">
                  {formatPopulation(state.population)}
                </div>
                <div className="text-xs text-muted-foreground">Habitantes</div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-4 xl:p-5 text-center">
                <Globe className="h-7 w-7 xl:h-8 xl:w-8 text-secondary mx-auto mb-2" />
                <div className="text-xl xl:text-2xl font-bold text-foreground mb-1 max-sm:text-lg">
                  {detailedInfo.area}
                </div>
                <div className="text-xs text-muted-foreground">Área</div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-4 xl:p-5 text-center">
                <MapPin className="h-7 w-7 xl:h-8 xl:w-8 text-accent mx-auto mb-2" />
                <div className="text-xl xl:text-2xl font-bold text-foreground mb-1 max-sm:text-lg">
                  {detailedInfo.municipalities}
                </div>
                <div className="text-xs text-muted-foreground">Cidades</div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-4 xl:p-5 text-center">
                <Phone className="h-7 w-7 xl:h-8 xl:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl xl:text-2xl font-bold text-foreground mb-1 max-sm:text-lg">
                  {state.dddCodes.length}
                </div>
                <div className="text-xs text-muted-foreground">Códigos DDD</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="!w-full grid grid-cols-4 max-sm:grid-cols-2">
              <TabsTrigger value="cities">Cidades ({detailedInfo.municipalities})</TabsTrigger>
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="telephony">Telefonia</TabsTrigger>
              <TabsTrigger value="faq">Dúvidas</TabsTrigger>
            </TabsList>

            {/* Cities Tab */}
            <TabsContent value="cities" className="mt-6 space-y-6">
              {/* Header Card com Estatísticas */}
              <Card className="shadow-md border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h2 className="text-xl xl:text-2xl font-bold text-foreground mb-2 max-sm:text-lg">
                        Cidades do {state.name}
                      </h2>
                      <p className="text-sm xl:text-base text-muted-foreground mb-4 max-sm:text-xs">
                        Lista completa de cidades com seus respectivos códigos DDD
                      </p>
                      
                      {/* Estatísticas */}
                      <div className="flex flex-wrap gap-6 text-sm xl:text-base max-sm:text-xs">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-secondary" />
                          <span className="font-bold text-foreground">{filteredAndSortedCities.length}</span>
                          <span className="text-muted-foreground">cidades encontradas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-accent" />
                          <span className="font-bold text-foreground">{uniqueDDDs.length}</span>
                          <span className="text-muted-foreground">códigos DDD</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">Página 1 de 1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filtros e Busca */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @container">
                    {/* Buscar cidade */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Buscar cidade
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Digite o nome da cidade..."
                          value={searchCity}
                          onChange={(e) => setSearchCity(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Filtrar por DDD */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Filtrar por DDD
                      </label>
                      <Select value={filterDDD} onValueChange={setFilterDDD}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os DDDs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os DDDs</SelectItem>
                          {uniqueDDDs.map(ddd => (
                            <SelectItem key={ddd} value={ddd}>DDD {ddd}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ordenar por */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Ordenar por
                      </label>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger>
                          <SelectValue placeholder="Nome (A-Z)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                          <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                          <SelectItem value="ddd-asc">DDD (Crescente)</SelectItem>
                          <SelectItem value="ddd-desc">DDD (Decrescente)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grid de Cidades */}
              {isLoadingCities ? (
                <CitiesSkeleton />
              ) : filteredAndSortedCities.length > 0 ? (
                <>
                  {/* Informação de resultados */}
                  <div className="mb-4 text-sm text-muted-foreground">
                    Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedCities.length)} de {filteredAndSortedCities.length} cidades
                  </div>

                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4">
                    {paginatedCities.map((city, index) => (
                    <Card key={`${city.name}-${index}`} className="shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 xl:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {/* SEO-Optimized H2 with DDD + City Name */}
                            <h2 className="text-sm xl:text-xl font-bold text-foreground mb-1 leading-tight">
                              DDD {city.ddd} {city.name}
                            </h2>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="text-xs xl:text-sm">
                                {state.name}
                              </span>
                            </div>
                          </div>
                          <Phone className="h-4 w-4 xl:h-5 xl:w-5 text-primary flex-shrink-0" />
                        </div>

                        {/* População */}
                        {city.population && (
                          <div className="flex items-center gap-1 xl:gap-2 mb-2 xl:mb-3 text-xs xl:text-sm text-muted-foreground">
                            <Users className="h-3 w-3 xl:h-4 xl:w-4 flex-shrink-0" />
                            <span className="truncate">{city.population.toLocaleString('pt-BR')} hab</span>
                          </div>
                        )}

                        {/* Código DDD Destacado */}
                        <div className="mb-3 xl:mb-4">
                          <p className="text-xs xl:text-sm font-medium text-foreground mb-1 xl:mb-2">Código DDD:</p>
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm xl:text-base font-bold px-2 xl:px-3 py-0.5 xl:py-1">
                            {city.ddd}
                          </Badge>
                        </div>

                        {/* Botão Ver detalhes */}
                        <Link to={`/cidade/${city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`}>
                          <Button className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs xl:text-sm py-2">
                            Ver detalhes
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Controles de Paginação */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col @md:flex-row items-center justify-between gap-4">
                    {/* Informação de página */}
                    <div className="text-sm text-muted-foreground">
                      Página {currentPage} de {totalPages}
                    </div>

                    {/* Botões de navegação */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="hidden @md:flex"
                      >
                        Primeira
                      </Button>
                      
                      <Button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                      </Button>

                      {/* Números de página */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              className="w-10 h-10 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                      >
                        Próxima
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>

                      <Button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="hidden @md:flex"
                      >
                        Última
                      </Button>
                    </div>

                    {/* Ir para página específica */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Ir para:</span>
                      <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page);
                          }
                        }}
                        className="w-16 h-9 text-center"
                      />
                    </div>
                  </div>
                )}
              </>
              ) : (
                <Card className="shadow-md">
                  <CardContent className="p-12 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Nenhuma cidade encontrada
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tente ajustar os filtros ou a busca para encontrar cidades.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Information Tab */}
            <TabsContent value="info" className="mt-6 space-y-6">
              {/* About State */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Sobre o Estado do {state.name}
                    </h2>
                  </div>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Informações completas sobre o estado, sua geografia, economia e características principais.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Links Externos de Referência */}
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong className="text-foreground">Links de Referência:</strong>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={stateGoogleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                      >
                        <MapIcon className="h-4 w-4" />
                        {state.name} no Google Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a 
                        href={capitalGoogleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-sm"
                      >
                        <MapPin className="h-4 w-4" />
                        {state.capital} no Google Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a 
                        href={ibgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors text-sm"
                      >
                        <Users className="h-4 w-4" />
                        Dados IBGE - População
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 @container">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">População</p>
                          <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                            {formatPopulation(state.population)} habitantes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">Área</p>
                          <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                            {detailedInfo.area}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">Capital</p>
                          <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                            {state.capital}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">Região</p>
                          <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                            {state.region}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Region Info */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Região {state.region} - Características do {state.name}
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge className="bg-secondary text-secondary-foreground">
                    {state.region}
                  </Badge>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    {detailedInfo.regionInfo.description}
                  </p>
                  <div>
                    <p className="text-sm xl:text-base font-medium text-foreground mb-3 max-sm:text-xs">
                      Características Principais:
                    </p>
                    <div className="grid grid-cols-1 @md:grid-cols-2 gap-3 @container">
                      {detailedInfo.regionInfo.characteristics.map((char, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-accent" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Destaques e Curiosidades sobre o {state.name}
                    </h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-3">
                    {detailedInfo.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        {highlight}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Telephony Tab */}
            <TabsContent value="telephony" className="mt-6 space-y-6">
              {/* Telephony Overview */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Phone className="h-6 w-6 text-primary" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Telefonia e DDD do {state.name}
                    </h2>
                  </div>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Guia completo sobre códigos DDD, operadoras e informações de telefonia do estado.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <div className="text-3xl xl:text-4xl font-bold text-primary mb-2 max-sm:text-2xl">
                        {state.dddCodes.length}
                      </div>
                      <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Códigos DDD
                      </div>
                    </div>
                    <div className="text-center p-6 bg-secondary/5 rounded-lg">
                      <div className="text-3xl xl:text-4xl font-bold text-secondary mb-2 max-sm:text-2xl">
                        {detailedInfo.mainOperators.length}
                      </div>
                      <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Principais Operadoras
                      </div>
                    </div>
                    <div className="text-center p-6 bg-accent/5 rounded-lg">
                      <div className="text-3xl xl:text-4xl font-bold text-accent mb-2 max-sm:text-2xl">
                        {detailedInfo.urbanCoverage}
                      </div>
                      <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Cobertura Urbana
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DDD Codes */}
              <Card className="shadow-lg">
                <CardHeader>
                  <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                    Códigos DDD {dddList} - {state.name}
                  </h2>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Informações detalhadas sobre cada código DDD e suas áreas de cobertura.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.dddCodes.map((ddd) => (
                    <div key={ddd} className="border border-border rounded-lg p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-button-dark text-button-dark-foreground px-6 py-3 rounded-lg font-bold text-xl">
                          DDD {ddd}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{state.name}</h3>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                          <strong>Informações importantes:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm xl:text-base text-muted-foreground ml-4 max-sm:text-xs">
                          <li>Verifique sempre o DDD correto antes de fazer a ligação</li>
                          <li>Algumas cidades podem ter mais de um DDD dependendo da região</li>
                          <li>O DDD {ddd} atende principalmente {state.name.toLowerCase()}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Operators */}
              <Card className="shadow-lg">
                <CardHeader>
                  <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                    Operadoras de Telefonia no {state.name}
                  </h2>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Informações sobre as principais operadoras de telefonia móvel e fixa.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {detailedInfo.mainOperators.map((operator, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <h3 className="text-lg xl:text-xl font-semibold max-sm:text-base">
                            {operator.name}
                          </h3>
                          <Badge variant="outline" className="w-fit">
                            Cobertura: {operator.coverage}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs xl:text-sm font-medium text-foreground mb-2">
                            Serviços:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {operator.services.map((service, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Important Alerts */}
              <Alert className="border-amber-500 bg-amber-50">
                <AlertDescription className="text-sm xl:text-base max-sm:text-xs">
                  <strong>⚠️ Verifique sempre o DDD</strong>
                  <p className="mt-2">
                    Cidades próximas podem ter DDDs diferentes. Sempre verifique o código DDD correto antes de fazer ligações para evitar custos adicionais.
                  </p>
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-500 bg-blue-50">
                <AlertDescription className="text-sm xl:text-base max-sm:text-xs">
                  <strong>ℹ️ Mudanças recentes</strong>
                  <p className="mt-2">
                    A <a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      ANATEL
                    </a> atualiza periodicamente os códigos DDD. Mantenha-se informado sobre possíveis mudanças na numeração telefônica do estado.
                  </p>
                </AlertDescription>
              </Alert>

              <Alert className="border-green-500 bg-green-50">
                <AlertDescription className="text-sm xl:text-base max-sm:text-xs">
                  <strong>✓ Portabilidade numérica</strong>
                  <p className="mt-2">
                    Lembre-se que com a portabilidade, o prefixo da operadora não indica mais necessariamente a operadora atual do número.
                  </p>
                </AlertDescription>
              </Alert>

              {/* Telephony Tips */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Dicas para Usar o DDD {dddList}
                    </h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {detailedInfo.telephonyTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Tab - Voice Search Optimized */}
            <TabsContent value="faq" className="mt-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Phone className="h-6 w-6 text-primary" />
                    <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                      Perguntas Frequentes - DDD {dddList} {state.name}
                    </h2>
                  </div>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Respostas para as dúvidas mais comuns sobre códigos DDD do {state.name}.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    {detailedInfo.faqs.map((faq, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                          {faq.question}
                        </h3>
                        <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Additional FAQ */}
                  <div className="border-t pt-6 space-y-6">
                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                        O que significa DDD?
                      </h3>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        DDD significa Discagem Direta à Distância. É um código numérico que identifica a região geográfica de um telefone no Brasil, permitindo chamadas de longa distância.
                      </p>
                    </div>

                    <div className="border-l-4 border-accent pl-4 py-2">
                      <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                        Como fazer uma chamada usando DDD?
                      </h3>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Para chamadas dentro do Brasil: 0 + código DDD + número do telefone. Para ligações de celular, pode discar direto código DDD + número. Para chamadas internacionais: +55 + código DDD + número do telefone.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="text-base xl:text-lg font-bold text-foreground mb-2 max-sm:text-sm">
                        Quantos dígitos tem um código DDD?
                      </h3>
                      <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                        Os códigos DDD brasileiros têm geralmente 2 dígitos, embora algumas regiões utilizem 3 dígitos para atender à demanda crescente de linhas telefônicas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Authority Links Section */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                Links Úteis sobre DDD e Telefonia no {state.name}
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {detailedInfo.authorityLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <span className="text-sm xl:text-base font-medium text-foreground group-hover:text-primary transition-colors max-sm:text-xs">
                        {link.name}
                      </span>
                    </div>
                    <p className="text-xs xl:text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}

              {/* Related States */}
              {detailedInfo.relatedStates.map((relatedState, index) => {
                // Buscar o estado usando dados lite para obter o slug
                const relatedStateLite = brazilianStatesLite.find(s => s.name === relatedState.name);
                const stateSlug = relatedStateLite?.slug || relatedState.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
                
                return (
                  <Link
                    key={index}
                    to={`/estado/${stateSlug}`}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                  >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm xl:text-base font-medium text-foreground group-hover:text-primary transition-colors max-sm:text-xs">
                        {relatedState.name}
                      </span>
                      <Badge variant="outline" className="text-xs">Estado</Badge>
                    </div>
                    <p className="text-xs xl:text-sm text-muted-foreground">
                      Sudeste • DDDs: {relatedState.ddds.join(', ')}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              );
              })}
            </CardContent>
          </Card>

          {/* Tools Section */}
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 mb-8 @container">
            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/validar')}>
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Validar DDD</h3>
                <p className="text-sm text-muted-foreground">Verifique códigos DDD</p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/gerador-numeros')}>
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Gerador de Números</h3>
                <p className="text-sm text-muted-foreground">Crie números para testes</p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/busca-voz')}>
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Busca por Voz</h3>
                <p className="text-sm text-muted-foreground">Use comandos de voz</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Sidebar */}
          <Card className="shadow-lg bg-muted/50">
            <CardHeader>
              <h2 className="text-xl xl:text-2xl font-semibold max-sm:text-lg">
                Dados do {state.name} - DDD {dddList}
              </h2>
              <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Informações essenciais sobre o {state.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">População:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {formatPopulation(state.population)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">Área:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {detailedInfo.area}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">Capital:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {state.capital}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">Código DDD:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {dddList}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">Região:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {state.region}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">Cidades:</span>
                <span className="text-sm xl:text-base font-bold text-foreground max-sm:text-xs">
                  {detailedInfo.municipalities}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
