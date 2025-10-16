'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SimplePagination } from '@/components/ui/simple-pagination'

interface City {
  id: string;
  name: string;
  slug: string;
  population?: number | null;
  area?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  isCapital: boolean;
  dddCodes: Array<{ code: string; description?: string }>;
}

interface CityListProps {
  cities: City[];
  stateName: string;
  stateSlug: string;
  itemsPerPage?: number;
}

export function CityList({ cities, stateName, stateSlug, itemsPerPage = 60 }: CityListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [dddFilter, setDddFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)

  // Get unique DDD codes
  const uniqueDddCodes = useMemo(() => {
    const ddds = new Set<string>()
    cities.forEach(city => {
      city.dddCodes.forEach(ddd => ddds.add(ddd.code))
    })
    return Array.from(ddds).sort()
  }, [cities])

  // Filter and sort cities
  const filteredAndSortedCities = useMemo(() => {
    let filtered = cities

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by DDD
    if (dddFilter !== 'all') {
      filtered = filtered.filter(city =>
        city.dddCodes.some(ddd => ddd.code === dddFilter)
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'population') {
        return (b.population || 0) - (a.population || 0)
      }
      return 0
    })

    return filtered
  }, [cities, searchTerm, dddFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCities = filteredAndSortedCities.slice(startIndex, startIndex + itemsPerPage)

  const formatNumber = (num: number | null | undefined) => {
    if (!num) return 'N/A'
    return num.toLocaleString('pt-BR')
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtrar Cidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar cidade</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome da cidade..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por DDD</label>
              <Select value={dddFilter} onValueChange={(value) => {
                setDddFilter(value)
                setCurrentPage(1)
              }}>
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

          {/* Results Summary */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div>
              Mostrando {paginatedCities.length} de {filteredAndSortedCities.length} cidades
              {searchTerm && ` para "${searchTerm}"`}
              {dddFilter !== 'all' && ` com DDD ${dddFilter}`}
            </div>
            {totalPages > 1 && (
              <div className="mt-2 sm:mt-0">
                Página {currentPage} de {totalPages}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedCities.map((city) => (
          <Card key={city.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">
                    <Link 
                      href={`/estado/${stateSlug}/${city.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {city.name}
                    </Link>
                  </CardTitle>
                  {city.isCapital && (
                    <Badge variant="secondary" className="mt-1 text-xs">Capital</Badge>
                  )}
                </div>
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-3 w-3" />
                <span>{formatNumber(city.population)} hab.</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">DDD:</div>
                <div className="flex flex-wrap gap-1">
                  {city.dddCodes.map((code) => (
                    <Badge key={code.code} variant="outline" className="text-xs">
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

      {/* No Results */}
      {paginatedCities.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              Nenhuma cidade encontrada
              {searchTerm && ` para "${searchTerm}"`}
              {dddFilter !== 'all' && ` com DDD ${dddFilter}`}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}