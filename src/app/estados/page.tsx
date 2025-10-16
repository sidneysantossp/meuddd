'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, MapPin, Users, Ruler } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface State {
  id: string;
  name: string;
  slug: string;
  code: string;
  region: string;
  population?: number | null;
  area?: number | null;
  capital?: string | null;
  dddCodes: Array<{ code: string; description?: string }>;
  _count: {
    cities: number;
  };
}

export default function EstadosPage() {
  const [states, setStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStates()
  }, [])

  useEffect(() => {
    filterStates()
  }, [states, searchTerm])

  const fetchStates = async () => {
    try {
      const response = await fetch('/api/ddd/states')
      const data = await response.json()
      setStates(data)
      setFilteredStates(data)
    } catch (error) {
      console.error('Error fetching states:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterStates = () => {
    if (!searchTerm.trim()) {
      setFilteredStates(states)
      return
    }

    const filtered = states.filter(state => 
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (state.capital && state.capital.toLowerCase().includes(searchTerm.toLowerCase())) ||
      state.dddCodes.some(ddd => ddd.code.includes(searchTerm))
    )
    
    setFilteredStates(filtered)
  }

  const getRegiaoColor = (regiao: string) => {
    const colors = {
      'Norte': 'bg-blue-100 text-blue-800',
      'Nordeste': 'bg-green-100 text-green-800',
      'Centro-Oeste': 'bg-yellow-100 text-yellow-800',
      'Sudeste': 'bg-red-100 text-red-800',
      'Sul': 'bg-purple-100 text-purple-800'
    }
    return colors[regiao as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatNumber = (num: number | null | undefined) => {
    if (!num) return 'N/A'
    return num.toLocaleString('pt-BR')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando estados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Início
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Estados do Brasil
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Informações detalhadas sobre os 26 estados e o Distrito Federal do Brasil
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar por nome, sigla, capital ou região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{states.length}</div>
              <div className="text-sm text-gray-600">Unidades Federativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {states.reduce((acc, state) => acc + state._count.cities, 0)}
              </div>
              <div className="text-sm text-gray-600">Cidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {states.reduce((acc, state) => acc + state.dddCodes.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Códigos DDD</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(states.map(s => s.region)).size}
              </div>
              <div className="text-sm text-gray-600">Regiões</div>
            </div>
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredStates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum estado encontrado para "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStates.map((estado) => (
              <Card key={estado.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{estado.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-gray-700">
                        {estado.code}
                      </CardDescription>
                    </div>
                    <Badge className={getRegiaoColor(estado.region)}>
                      {estado.region}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {estado.capital && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span className="font-medium">Capital:</span> {estado.capital}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      <span className="font-medium">População:</span> {formatNumber(estado.population)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="mr-2 h-4 w-4" />
                      <span className="font-medium">Área:</span> {formatNumber(estado.area)} km²
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Cidades:</span> {estado._count.cities}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">DDD(s):</span>
                      <div className="ml-2 flex flex-wrap gap-1">
                        {estado.dddCodes.map((ddd) => (
                          <Badge key={ddd.code} variant="outline" className="text-xs">
                            {ddd.code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/estado/${estado.slug}`}>
                        <Button className="w-full">
                          Ver cidades e DDDs
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}