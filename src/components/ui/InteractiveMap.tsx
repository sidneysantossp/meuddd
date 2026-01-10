import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
  stateName: string;
  ddd: string;
}

export default function InteractiveMap({ 
  latitude, 
  longitude, 
  cityName, 
  stateName,
  ddd 
}: InteractiveMapProps) {
  // Gerar URL do OpenStreetMap
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik&marker=${latitude},${longitude}`;
  
  // URL para abrir no OpenStreetMap
  const openInOSM = () => {
    window.open(`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`, '_blank');
  };

  // URL para obter direções no Google Maps
  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="space-y-4 w-full">
      {/* Mapa OpenStreetMap */}
      <div className="relative rounded-lg overflow-hidden border border-border shadow-md w-full bg-muted" style={{ height: '500px', minHeight: '500px' }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={osmUrl}
          style={{ border: 0 }}
          title={`Mapa de ${cityName}, ${stateName}`}
          className="w-full h-full"
        />
      </div>

      {/* Informações da Localização */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{cityName}, {stateName}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Coordenadas: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </p>
            <p className="text-xs text-muted-foreground">
              DDD: <span className="font-semibold text-foreground">{ddd}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          onClick={openInOSM}
          variant="default"
          size="sm"
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Abrir no OpenStreetMap
        </Button>
        <Button 
          onClick={handleGetDirections}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Navigation className="h-4 w-4" />
          Como Chegar
        </Button>
      </div>

      {/* Informações sobre o Mapa */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h4 className="font-semibold text-sm mb-2">Sobre o Mapa</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Este mapa é fornecido pelo <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenStreetMap</a>, 
          um projeto colaborativo de código aberto que cria um mapa livre e editável do mundo. 
          Os dados do mapa são contribuídos por milhares de voluntários ao redor do globo.
        </p>
      </div>
    </div>
  );
}
