'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FallbackMapProps {
  cityName: string;
  stateName: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function FallbackMap({ cityName, stateName, latitude, longitude }: FallbackMapProps) {
  // Generate OpenStreetMap URL
  const mapUrl = latitude && longitude 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.1},${latitude-0.1},${longitude+0.1},${latitude+0.1}&layer=mapnik&marker=${latitude},${longitude}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-48.0292,-15.8801,-47.8292,-15.6801&layer=mapnik`

  const directionsUrl = latitude && longitude
    ? `https://www.openstreetmap.org/directions?from=&to=${latitude},${longitude}`
    : `https://www.openstreetmap.org/search?query=${encodeURIComponent(cityName + ', ' + stateName)}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Container */}
          <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${cityName}, ${stateName}`}
            />
          </div>
          
          {/* Map Controls */}
          <div className="flex flex-wrap gap-2">
            <Button 
              asChild
              variant="outline"
              size="sm"
            >
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🛣️ Rota até aqui
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="sm"
            >
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cityName + ', ' + stateName)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🗺️ Google Maps
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="sm"
            >
              <a 
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(cityName + ', ' + stateName)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 OpenStreetMap
              </a>
            </Button>
          </div>
          
          {/* Location Info */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Informações de Localização:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <strong>Cidade:</strong> {cityName}
              </div>
              <div>
                <strong>Estado:</strong> {stateName}
              </div>
              <div>
                <strong>Latitude:</strong> {latitude?.toFixed(4) || 'N/A'}
              </div>
              <div>
                <strong>Longitude:</strong> {longitude?.toFixed(4) || 'N/A'}
              </div>
              <div>
                <strong>Precisão:</strong> {latitude && longitude ? 'Exata' : 'Aproximada'}
              </div>
              <div>
                <strong>Fonte:</strong> OpenStreetMap
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Sobre o Mapa:</h4>
            <p className="text-xs text-gray-600">
              Este mapa interativo mostra a localização de {cityName} no estado de {stateName}. 
              Você pode navegar pelo mapa, dar zoom e usar os links acima para obter direções 
              ou visualizar o local em outros serviços de mapas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}