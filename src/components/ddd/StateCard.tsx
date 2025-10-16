import Link from 'next/link'
import { MapPin, Users, Ruler } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface StateCardProps {
  state: {
    id: string;
    name: string;
    slug: string;
    code: string;
    region: string;
    population?: number | null;
    area?: number | null;
    capital?: string | null;
    dddCodes: Array<{ code: string; description?: string }>;
  };
}

export function StateCard({ state }: StateCardProps) {
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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">{state.name}</CardTitle>
            <CardDescription className="text-lg font-semibold text-gray-700">
              {state.code}
            </CardDescription>
          </div>
          <Badge className={getRegiaoColor(state.region)}>
            {state.region}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {state.capital && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="font-medium">Capital:</span> {state.capital}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="mr-2 h-4 w-4" />
            <span className="font-medium">População:</span> {formatNumber(state.population)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Ruler className="mr-2 h-4 w-4" />
            <span className="font-medium">Área:</span> {formatNumber(state.area)} km²
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">DDD(s):</span>
            <div className="ml-2 flex flex-wrap gap-1">
              {state.dddCodes.map((ddd) => (
                <Badge key={ddd.code} variant="outline" className="text-xs">
                  {ddd.code}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Link href={`/estado/${state.slug}`}>
              <Button className="w-full">
                Ver cidades e DDDs
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}