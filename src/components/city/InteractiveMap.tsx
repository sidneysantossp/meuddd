'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface InteractiveMapProps {
  cityName: string;
  stateName: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function InteractiveMap({ cityName, stateName, latitude, longitude }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Only load map on client side
    if (typeof window === 'undefined') return

    const loadMap = async () => {
      try {
        // Wait for DOM to be ready
        if (!mapRef.current) return

        // Dynamically import Leaflet CSS and JS
        await import('leaflet/dist/leaflet.css')
        
        const L = await import('leaflet')
        
        // Fix for default markers in webpack
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

        // Initialize map with a small delay to ensure container is ready
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

          // Add points of interest
          addPointsOfInterest(centerLat, centerLng, cityName, L)
        }, 100)

      } catch (error) {
        console.error('Error loading map:', error)
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

  const addPointsOfInterest = (lat: number, lng: number, cityName: string, L: any) => {
    const pois = [
      { 
        name: 'Centro da Cidade', 
        lat: lat + 0.01, 
        lng: lng + 0.01, 
        type: 'center',
        color: '#ef4444'
      },
      { 
        name: 'Área Comercial', 
        lat: lat - 0.01, 
        lng: lng + 0.01, 
        type: 'commercial',
        color: '#10b981'
      },
      { 
        name: 'Zona Residencial', 
        lat: lat + 0.01, 
        lng: lng - 0.01, 
        type: 'residential',
        color: '#f59e0b'
      },
    ]

    pois.forEach(poi => {
      const icon = L.divIcon({
        html: `<div style="
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          background-color: ${poi.color};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        className: 'custom-poi-marker',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      })

      L.marker([poi.lat, poi.lng], { icon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(createPOIPopup(poi.name, cityName))
    })
  }

  const createPOIPopup = (poiName: string, cityName: string) => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <strong>${poiName}</strong><br>
        <span style="color: #666;">${cityName}</span>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa Interativo de {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-96 rounded-lg overflow-hidden border border-gray-200"
            style={{ minHeight: '400px' }}
          />
          
          {/* Map Controls */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={centerMap}
              variant="outline"
              size="sm"
            >
              🎯 Centralizar Mapa
            </Button>
            <Button 
              onClick={zoomIn}
              variant="outline"
              size="sm"
            >
              + Zoom
            </Button>
            <Button 
              onClick={zoomOut}
              variant="outline"
              size="sm"
            >
              - Zoom
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
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Centro da cidade</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Área comercial</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Zona residencial</span>
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