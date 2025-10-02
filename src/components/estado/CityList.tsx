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

export default function CityList({ cities, stateName, stateSlug, itemsPerPage = 20 }: CityListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dddFilter, setDddFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  // Get unique DDD codes for filter
  const uniqueDddCodes = useMemo(() => {
    const codes = cities.flatMap(city => city.dddCodes.map(code => code.code));
    return [...new Set(codes)].sort();
  }, [cities]);

  // Filter and sort cities
  const filteredCities = useMemo(() => {
    let filtered = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply DDD filter
    if (dddFilter !== 'all') {
      filtered = filtered.filter(city =>
        city.dddCodes.some(code => code.code === dddFilter)
      );
    }

    // Sort cities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'population':
          return (b.population || 0) - (a.population || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [cities, searchTerm, dddFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = filteredCities.slice(startIndex, startIndex + itemsPerPage);

  const formatNumber = (num?: number | null) => {
    if (!num) return '';
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Cidades do {stateName}
          </CardTitle>
          <CardDescription>
            Lista completa de cidades com seus respectivos códigos DDD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                <strong>{filteredCities.length}</strong> cidades encontradas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-600" />
              <span className="text-sm">
                <strong>{uniqueDddCodes.length}</strong> códigos DDD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="text-sm">
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar cidade</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome da cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por DDD</label>
              <Select value={dddFilter} onValueChange={setDddFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um DDD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os DDDs</SelectItem>
                  {uniqueDddCodes.map(code => (
                    <SelectItem key={code} value={code}>
                      DDD {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome (A-Z)</SelectItem>
                  <SelectItem value="population">População (maior)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedCities.map((city) => (
          <Card key={city.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/estado/${stateSlug}/${city.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {city.name}
                    </Link>
                  </CardTitle>
                  {city.isCapital && (
                    <Badge variant="secondary" className="mt-1">
                      Capital
                    </Badge>
                  )}
                </div>
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-3 w-3" />
                <span>{formatNumber(city.population)} habitantes</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Códigos DDD:</div>
                <div className="flex flex-wrap gap-1">
                  {city.dddCodes.map((code) => (
                    <Badge key={code.id} variant="outline" className="text-xs">
                      {code.code}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full" size="sm">
                <Link href={`/estado/${stateSlug}/${city.slug}`}>
                  Ver detalhes
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{startIndex + 1}</strong> a <strong>
                  {Math.min(startIndex + itemsPerPage, filteredCities.length)}
                </strong> de <strong>{filteredCities.length}</strong> cidades
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8"
                      >
                        {page}
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
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredCities.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma cidade encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou termos de busca.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}