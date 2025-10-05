'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  cityName: string;
  stateName: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function InteractiveMap({ cityName, stateName, latitude, longitude }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Determine map center
    let centerLat: number;
    let centerLng: number;
    
    if (latitude && longitude) {
      centerLat = latitude;
      centerLng = longitude;
    } else {
      // Default coordinates for Brazil if specific coordinates not available
      centerLat = -9.9740; // Acre approximate latitude
      centerLng = -67.8243; // Acre approximate longitude
    }

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([centerLat, centerLng], 12);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Add marker for the city
    if (latitude && longitude) {
      const marker = L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
      marker.bindPopup(`
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #333;">${cityName}</h3>
          <p style="margin: 0; color: #666;">${stateName}</p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
            Lat: ${latitude.toFixed(4)}<br>
            Lng: ${longitude.toFixed(4)}
          </p>
        </div>
      `).openPopup();
    } else {
      // Add a circle to show approximate area if exact coordinates not available
      L.circle([centerLat, centerLng], {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.2,
        radius: 5000
      }).addTo(mapInstanceRef.current).bindPopup(`
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #333;">${cityName}</h3>
          <p style="margin: 0; color: #666;">${stateName}</p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
            Localização aproximada
          </p>
        </div>
      `).openPopup();
    }

    // Add some additional points of interest around the city
    const addNearbyPOIs = () => {
      if (!latitude || !longitude) return;

      // Simulate some nearby points of interest
      const pois = [
        { name: 'Centro da Cidade', lat: latitude + 0.01, lng: longitude + 0.01, type: 'center' },
        { name: 'Área Comercial', lat: latitude - 0.01, lng: longitude + 0.01, type: 'commercial' },
        { name: 'Zona Residencial', lat: latitude + 0.01, lng: longitude - 0.01, type: 'residential' },
      ];

      pois.forEach(poi => {
        const icon = L.divIcon({
          html: `<div style="
            width: 12px; 
            height: 12px; 
            border-radius: 50%; 
            background-color: ${poi.type === 'center' ? '#ef4444' : poi.type === 'commercial' ? '#10b981' : '#f59e0b'};
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          className: 'custom-poi-marker',
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        L.marker([poi.lat, poi.lng], { icon })
          .addTo(mapInstanceRef.current!)
          .bindPopup(`
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
              <strong>${poi.name}</strong><br>
              <span style="color: #666;">Próximo a ${cityName}</span>
            </div>
          `);
      });
    };

    addNearbyPOIs();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [cityName, stateName, latitude, longitude]);

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg overflow-hidden border border-gray-200"
        style={{ minHeight: '400px' }}
      />
      
      {/* Map Controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            if (mapInstanceRef.current && latitude && longitude) {
              mapInstanceRef.current.setView([latitude, longitude], 15);
            }
          }}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Centralizar Mapa
        </button>
        
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomIn();
            }
          }}
          className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          + Zoom
        </button>
        
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomOut();
            }
          }}
          className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          - Zoom
        </button>
        
        <a
          href={`https://www.openstreetmap.org/directions?from=&to=${latitude || -9.9740},${longitude || -67.8243}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors inline-block"
        >
          Rota até aqui
        </a>
      </div>
      
      {/* Map Legend */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
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
    </div>
  );
}