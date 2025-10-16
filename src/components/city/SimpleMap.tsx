'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FallbackMap } from './FallbackMap'

interface SimpleMapProps {
  cityName: string;
  stateName: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function SimpleMap({ cityName, stateName, latitude, longitude }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useFallback, setUseFallback] = useState(false)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Only load map on client side
    if (typeof window === 'undefined') return

    const loadMap = async () => {
      try {
        setError(null)
        
        // Wait for DOM to be ready
        if (!mapRef.current) return

        // Load Leaflet CSS first
        const linkElement = document.createElement('link')
        linkElement.rel = 'stylesheet'
        linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(linkElement)

        // Load Leaflet JS
        const scriptElement = document.createElement('script')
        scriptElement.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        scriptElement.onload = () => {
          initializeMap()
        }
        scriptElement.onerror = () => {
          console.warn('Leaflet failed to load, using fallback map')
          setUseFallback(true)
        }
        document.head.appendChild(scriptElement)

      } catch (error) {
        console.error('Error loading map:', error)
        setUseFallback(true)
      }
    }

    const initializeMap = () => {
      try {
        // Access Leaflet from window
        const L = (window as any).L
        
        if (!L) {
          console.warn('Leaflet not found, using fallback map')
          setUseFallback(true)
          return
        }

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // Use provided coordinates or fallback to state center
        const centerLat = latitude || -15.7801
        const centerLng = longitude || -47.9292

        // Initialize map with a delay to ensure container is ready
        setTimeout(() => {
          if (!mapRef.current) return
          
          mapInstanceRef.current = L.map(mapRef.current).setView([centerLat, centerLng], 12)

          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(mapInstanceRef.current)

          // Add main marker
          if (latitude && longitude) {
            const marker = L.marker([latitude, longitude]).addTo(mapInstanceRef.current)
            marker.bindPopup(createPopupContent(cityName, stateName, latitude, longitude)).openPopup()
          } else {
            // Add area circle for approximate location
            L.circle([centerLat, centerLng], {
              color: '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: 0.2,
              radius: 5000
            }).addTo(mapInstanceRef.current).bindPopup(createApproximatePopup(cityName, stateName))
          }

          setMapLoaded(true)
        }, 200)

      } catch (error) {
        console.error('Error initializing map:', error)
        setUseFallback(true)
      }
    }

    loadMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [cityName, stateName, latitude, longitude])

  const createPopupContent = (city: string, state: string, lat: number, lng: number) => {
    return `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #333;">${city}</h3>
        <p style="margin: 0; color: #666;">${state}</p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
          Lat: ${lat.toFixed(4)}<br>
          Lng: ${lng.toFixed(4)}
        </p>
      </div>
    `
  }

  const createApproximatePopup = (city: string, state: string) => {
    return `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #333;">${city}</h3>
        <p style="margin: 0; color: #666;">${state}</p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
          Localização aproximada
        </p>
      </div>
    `
  }

  const centerMap = () => {
    if (mapInstanceRef.current && latitude && longitude) {
      mapInstanceRef.current.setView([latitude, longitude], 15)
    }
  }

  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  // If we should use fallback, show the fallback map
  if (useFallback) {
    return <FallbackMap cityName={cityName} stateName={stateName} latitude={latitude} longitude={longitude} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa Interativo de {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            style={{ minHeight: '400px' }}
          >
            {!mapLoaded && !error && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Carregando mapa...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Map Controls */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={centerMap}
              variant="outline"
              size="sm"
              disabled={!mapLoaded}
            >
              🎯 Centralizar Mapa
            </Button>
            <Button 
              onClick={zoomIn}
              variant="outline"
              size="sm"
              disabled={!mapLoaded}
            >
              + Zoom
            </Button>
            <Button 
              onClick={zoomOut}
              variant="outline"
              size="sm"
              disabled={!mapLoaded}
            >
              - Zoom
            </Button>
            <Button 
              onClick={() => setUseFallback(true)}
              variant="outline"
              size="sm"
            >
              🔄 Mapa Alternativo
            </Button>
            {latitude && longitude && (
              <Button 
                asChild
                variant="outline"
                size="sm"
              >
                <a 
                  href={`https://www.openstreetmap.org/directions?from=&to=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🛣️ Rota até aqui
                </a>
              </Button>
            )}
          </div>
          
          {/* Map Legend */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Legenda:</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Localização principal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span>Área aproximada</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Informações de Localização:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
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
        </div>
      </CardContent>
    </Card>
  )
}