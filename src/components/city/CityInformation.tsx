'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  BookOpen, 
  Building, 
  Camera, 
  TrendingUp, 
  ExternalLink, 
  Users, 
  MapPin,
  Calendar,
  Info,
  Loader2
} from 'lucide-react'

interface CityInfo {
  wikipedia?: {
    title: string
    extract: string
    url: string
    thumbnail?: string
  }
  government?: {
    population?: number
    area?: number
    hdi?: number
    ibgeCode?: string
  }
  description?: string
  attractions?: string[]
  economic?: string
  fetchedAt?: string
}

interface CityInformationProps {
  cityName: string
  stateName: string
}

export function CityInformation({ cityName, stateName }: CityInformationProps) {
  const [data, setData] = useState<CityInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (!cityName || !stateName) return

    const fetchCityInfo = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/city-info?city=${encodeURIComponent(cityName)}&state=${encodeURIComponent(stateName)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch city information')
        }

        const cityInfo = await response.json()
        setData(cityInfo)
      } catch (err) {
        console.error('Error fetching city info:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCityInfo()
  }, [cityName, stateName])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Carregando informações...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        {/* Skeleton tabs */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            {['Descrição', 'Turismo', 'Economia', 'Wikipedia'].map((tab) => (
              <Skeleton key={tab} className="h-10 w-24" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Erro ao carregar informações: {error}
        </AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhuma informação disponível</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Não foi possível obter informações sobre esta cidade.</p>
        </CardContent>
      </Card>
    )
  }

  // Government Data Overview
  const GovernmentDataCard = () => {
    if (!data.government) return null
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Dados Oficiais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.government.population && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.government.population.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-gray-600">População</div>
              </div>
            )}
            {data.government.area && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {data.government.area.toLocaleString('pt-BR')} km²
                </div>
                <div className="text-sm text-gray-600">Área</div>
              </div>
            )}
            {data.government.hdi && (
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {data.government.hdi.toFixed(3)}
                </div>
                <div className="text-sm text-gray-600">IDH</div>
              </div>
            )}
            {data.government.ibgeCode && (
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {data.government.ibgeCode}
                </div>
                <div className="text-sm text-gray-600">Código IBGE</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Tab Navigation
  const TabNavigation = () => {
    const tabs = [
      { id: 'description', label: 'Descrição', icon: Info },
      { id: 'attractions', label: 'Turismo', icon: Camera },
      { id: 'economic', label: 'Economia', icon: TrendingUp },
      { id: 'wikipedia', label: 'Wikipedia', icon: BookOpen }
    ]

    return (
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    )
  }

  // Tab Content
  const TabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Sobre {cityName}</CardTitle>
            </CardHeader>
            <CardContent>
              {data.description ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{data.description}</p>
                </div>
              ) : (
                <p className="text-gray-500">Descrição não disponível no momento.</p>
              )}
            </CardContent>
          </Card>
        )

      case 'attractions':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Pontos Turísticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.attractions && data.attractions.length > 0 ? (
                <div className="space-y-3">
                  {data.attractions.map((attraction, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{attraction}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Informações sobre pontos turísticos não disponíveis no momento.</p>
              )}
            </CardContent>
          </Card>
        )

      case 'economic':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Economia Local
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.economic ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{data.economic}</p>
                </div>
              ) : (
                <p className="text-gray-500">Informações econômicas não disponíveis no momento.</p>
              )}
            </CardContent>
          </Card>
        )

      case 'wikipedia':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Wikipedia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.wikipedia ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{data.wikipedia.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{data.wikipedia.extract}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <Button asChild variant="outline">
                      <a 
                        href={data.wikipedia.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Leia mais na Wikipedia
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Informações da Wikipedia não disponíveis no momento.</p>
              )}
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <GovernmentDataCard />
      
      <div className="space-y-4">
        <TabNavigation />
        <TabContent />
      </div>

      {/* Data Source Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-700">
              <strong>Fontes:</strong> Wikipedia, IBGE, Sites Governamentais
            </div>
            {data.fetchedAt && (
              <div className="text-xs text-blue-600">
                Atualizado: {new Date(data.fetchedAt).toLocaleString('pt-BR')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}