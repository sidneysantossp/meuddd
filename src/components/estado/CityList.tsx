'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ArrowLeft, ArrowRight, MapPin, Users, Phone } from 'lucide-react';
import { City, DddCode } from '@prisma/client';
import Link from 'next/link';

interface CityListProps {
  cities: (City & {
    dddCodes: DddCode[];
  })[];
  stateName: string;
  stateSlug: string;
  itemsPerPage?: number;
}

interface FilterOptions {
  search: string;
  dddFilter: string;
  sortBy: 'name' | 'population' | 'ddd';
  sortOrder: 'asc' | 'desc';
}

export function CityList({ cities, stateName, stateSlug, itemsPerPage = 50 }: CityListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    dddFilter: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Get unique DDD codes for filter
  const uniqueDddCodes = useMemo(() => {
    const ddds = new Set<string>();
    cities.forEach(city => {
      city.dddCodes.forEach(ddd => ddds.add(ddd.code));
    });
    return Array.from(ddds).sort();
  }, [cities]);

  // Filter and sort cities
  const filteredAndSortedCities = useMemo(() => {
    let filtered = cities.filter(city => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return city.name.toLowerCase().includes(searchLower);
      }
      
      // DDD filter
      if (filters.dddFilter !== 'all') {
        return city.dddCodes.some(ddd => ddd.code === filters.dddFilter);
      }
      
      return true;
    });

    // Sort cities
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'population':
          aValue = a.population || 0;
          bValue = b.population || 0;
          break;
        case 'ddd':
          aValue = a.dddCodes[0]?.code || '';
          bValue = b.dddCodes[0]?.code || '';
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [cities, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = filteredAndSortedCities.slice(startIndex, startIndex + itemsPerPage);

  const formatNumber = (num?: number | null) => {
    if (!num) return 'N/A';
    return num.toLocaleString('pt-BR');
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getDddBadges = (dddCodes: DddCode[]) => {
    return dddCodes.map(ddd => (
      <Badge key={ddd.id} variant="secondary" className="text-xs">
        DDD {ddd.code}
      </Badge>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Lista Completa de Cidades de {stateName}
          </CardTitle>
          <CardDescription>
            Encontre o código DDD de todas as cidades do estado. Total de {cities.length} cidades cadastradas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span>Total de cidades: <strong>{cities.length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-600" />
              <span>Códigos DDD: <strong>{uniqueDddCodes.length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <span>Resultados filtrados: <strong>{filteredAndSortedCities.length}</strong></span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome da cidade..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* DDD Filter */}
            <Select value={filters.dddFilter} onValueChange={(value) => handleFilterChange('dddFilter', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por DDD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os DDDs</SelectItem>
                {uniqueDddCodes.map(ddd => (
                  <SelectItem key={ddd} value={ddd}>
                    DDD {ddd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Options */}
            <Select value={`${filters.sortBy}-${filters.sortOrder}`} onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split('-') as [FilterOptions['sortBy'], FilterOptions['sortOrder']];
              handleFilterChange('sortBy', sortBy);
              handleFilterChange('sortOrder', sortOrder);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                <SelectItem value="population-desc">População (maior)</SelectItem>
                <SelectItem value="population-asc">População (menor)</SelectItem>
                <SelectItem value="ddd-asc">DDD (crescente)</SelectItem>
                <SelectItem value="ddd-desc">DDD (decrescente)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedCities.map((city) => (
          <Link 
            key={city.id} 
            href={`/estado/${stateSlug}/cidade/${city.slug}`}
            className="block"
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {city.name}
                    </h3>
                    {city.isCapital && (
                      <Badge variant="default" className="text-xs mb-2">
                        Capital
                      </Badge>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {city.population && (
                      <div>{formatNumber(city.population)}</div>
                    )}
                    <div className="text-xs">habitantes</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {getDddBadges(city.dddCodes)}
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  Clique para ver detalhes e informações de DDD
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {paginatedCities.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma cidade encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar seus filtros ou termos de busca.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedCities.length)} de {filteredAndSortedCities.length} cidades
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                
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
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}