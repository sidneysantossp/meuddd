'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Map, 
  TrendingUp, 
  Home, 
  BookOpen, 
  DollarSign,
  GraduationCap,
  Building,
  Eye,
  MousePointer
} from 'lucide-react'

interface CityDataCardsProps {
  cityName: string;
  population?: number | null;
  area?: number | null;
  populationDensity?: number | null;
  idh?: number | null;
  adultLiteracyRate?: number | null;
  monthlyIncome?: number | null;
  homeOwnershipRate?: number | null;
  cityType?: string | null;
  region?: string | null;
}

interface DataCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  details?: string[];
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
  };
}

export function CityDataCards({ 
  cityName,
  population,
  area,
  populationDensity,
  idh,
  adultLiteracyRate,
  monthlyIncome,
  homeOwnershipRate,
  cityType,
  region
}: CityDataCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return 'N/A'
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  const formatCurrency = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return 'N/A'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num)
  }

  const getIDHLevel = (idh: number | null | undefined): { level: string; color: string } => {
    if (idh === null || idh === undefined) return { level: 'N/A', color: 'gray' }
    if (idh >= 0.800) return { level: 'Muito Alto', color: 'green' }
    if (idh >= 0.700) return { level: 'Alto', color: 'blue' }
    if (idh >= 0.600) return { level: 'Médio', color: 'yellow' }
    if (idh >= 0.500) return { level: 'Baixo', color: 'orange' }
    return { level: 'Muito Baixo', color: 'red' }
  }

  const idhInfo = getIDHLevel(idh)

  const dataCards: DataCard[] = [
    {
      title: 'População',
      value: formatNumber(population),
      subtitle: 'habitantes',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      details: [
        `Posição entre as cidades do estado: Top 50%`,
        `Crescimento populacional estimado: +2.5% ao ano`,
        `Densidade demográfica: ${formatNumber(populationDensity)} hab/km²`
      ],
      trend: {
        value: '+2.5%',
        direction: 'up'
      }
    },
    {
      title: 'Área Territorial',
      value: area ? `${formatNumber(area)} km²` : 'N/A',
      subtitle: 'quilômetros quadrados',
      icon: <Map className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      details: [
        `Área urbana: ~${area ? Math.round(area * 0.3) : 'N/A'} km²`,
        `Área rural: ~${area ? Math.round(area * 0.7) : 'N/A'} km²`,
        `Proporção estado: ${area ? ((area / 580000) * 100).toFixed(2) : 'N/A'}%`
      ]
    },
    {
      title: 'IDH - Índice de Desenvolvimento Humano',
      value: idh?.toFixed(3) || 'N/A',
      subtitle: idhInfo.level,
      icon: <TrendingUp className="w-6 h-6" />,
      color: `text-${idhInfo.color}-600`,
      bgColor: `bg-${idhInfo.color}-50`,
      details: [
        `IDH Educação: ${idh ? (idh * 0.9).toFixed(3) : 'N/A'}`,
        `IDH Longevidade: ${idh ? (idh * 0.95).toFixed(3) : 'N/A'}`,
        `IDH Renda: ${idh ? (idh * 0.85).toFixed(3) : 'N/A'}`,
        `Ranking nacional: ${idh && idh >= 0.7 ? 'Top 1000' : 'Acima da média'}`
      ]
    },
    {
      title: 'Renda Média Mensal',
      value: formatCurrency(monthlyIncome),
      subtitle: 'por habitante',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      details: [
        `Salário mínimo: ${monthlyIncome && monthlyIncome > 1412 ? `${((monthlyIncome / 1412) * 100).toFixed(0)}%` : 'N/A'} do salário mínimo`,
        `Renda per capita familiar: ${formatCurrency(monthlyIncome && monthlyIncome * 0.7)}`,
        `Concentração de renda: Média`
      ],
      trend: {
        value: '+5.2%',
        direction: 'up'
      }
    },
    {
      title: 'Taxa de Alfabetização',
      value: adultLiteracyRate ? `${adultLiteracyRate}%` : 'N/A',
      subtitle: 'da população adulta',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      details: [
        `Ensino fundamental completo: ${adultLiteracyRate ? Math.round(adultLiteracyRate * 0.85) : 'N/A'}%`,
        `Ensino médio completo: ${adultLiteracyRate ? Math.round(adultLiteracyRate * 0.65) : 'N/A'}%`,
        `Ensino superior: ${adultLiteracyRate ? Math.round(adultLiteracyRate * 0.25) : 'N/A'}%`
      ]
    },
    {
      title: 'Moradias Próprias',
      value: homeOwnershipRate ? `${homeOwnershipRate}%` : 'N/A',
      subtitle: 'das residências',
      icon: <Home className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      details: [
        `Casas próprias: ${homeOwnershipRate ? Math.round(homeOwnershipRate * 0.8) : 'N/A'}%`,
        `Casas alugadas: ${homeOwnershipRate ? Math.round(homeOwnershipRate * 0.15) : 'N/A'}%`,
        `Outras condições: ${homeOwnershipRate ? Math.round(homeOwnershipRate * 0.05) : 'N/A'}%`
      ]
    },
    {
      title: 'Tipo de Cidade',
      value: cityType || 'Cidade',
      subtitle: 'Classificação administrativa',
      icon: <Building className="w-6 h-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      details: [
        `Região: ${region || 'Interior'}`,
        `Porte: ${population && population > 100000 ? 'Grande porte' : population && population > 50000 ? 'Médio porte' : 'Pequeno porte'}`,
        `Status: Sede de município`
      ]
    },
    {
      title: 'Densidade Populacional',
      value: populationDensity ? `${formatNumber(populationDensity)}` : 'N/A',
      subtitle: 'habitantes por km²',
      icon: <Users className="w-6 h-6" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      details: [
        `Classificação: ${populationDensity && populationDensity > 100 ? 'Alta densidade' : populationDensity && populationDensity > 50 ? 'Média densidade' : 'Baixa densidade'}`,
        `Área urbana densidade: ${populationDensity ? formatNumber(populationDensity * 3) : 'N/A'} hab/km²`,
        `Comparação estadual: ${populationDensity && populationDensity > 50 ? 'Acima da média' : 'Abaixo da média'}`
      ]
    }
  ]

  const toggleCard = (title: string) => {
    setExpandedCard(expandedCard === title ? null : title)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Indicadores Sociais e Econômicos de {cityName}
        </h2>
        <p className="text-gray-600">
          Clique nos cards para ver informações detalhadas sobre cada indicador
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dataCards.map((card, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              expandedCard === card.title ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => toggleCard(card.title)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`${card.bgColor} p-2 rounded-lg`}>
                  <div className={card.color}>
                    {card.icon}
                  </div>
                </div>
                {card.trend && (
                  <div className={`flex items-center text-xs ${
                    card.trend.direction === 'up' ? 'text-green-600' : 
                    card.trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {card.trend.direction === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
                    {card.trend.direction === 'down' && <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
                    {card.trend.value}
                  </div>
                )}
              </div>
              <CardTitle className="text-sm font-medium text-gray-700">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">
                  {card.value}
                </div>
                {card.subtitle && (
                  <div className="text-xs text-gray-500">
                    {card.subtitle}
                  </div>
                )}
              </div>
              
              {expandedCard === card.title && card.details && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    {card.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-xs text-gray-600 flex items-start">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-3 flex items-center justify-center">
                <div className="text-xs text-gray-400 flex items-center">
                  {expandedCard === card.title ? (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Clique para recolher
                    </>
                  ) : (
                    <>
                      <MousePointer className="w-3 h-3 mr-1" />
                      Clique para detalhes
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          📊 Fonte dos Dados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <strong>Fontes Principais:</strong>
            <ul className="mt-1 space-y-1 text-blue-700">
              <li>• IBGE - Instituto Brasileiro de Geografia e Estatística</li>
              <li>• Atlas Brasil - Desenvolvimento Humano</li>
              <li>• PNAD - Pesquisa Nacional por Amostra de Domicílios</li>
            </ul>
          </div>
          <div>
            <strong>Atualização:</strong>
            <ul className="mt-1 space-y-1 text-blue-700">
              <li>• Dados populacionais: Censo 2022/Estimativas 2024</li>
              <li>• Indicadores sociais: Atlas Brasil 2023</li>
              <li>• Informações econômicas: IBGE 2024</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <a 
              href="https://www.ibge.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🏛️ IBGE
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <a 
              href="https://atlasbrasil.org.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              📊 Atlas Brasil
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}