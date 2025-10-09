'use client';

interface CityMapProps {
  cityName: string;
  stateName: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function CityMap({ cityName, stateName, latitude, longitude }: CityMapProps) {
  const mapUrl = latitude && longitude 
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(cityName + ', ' + stateName)}&z=12&output=embed`;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        title={`Mapa de ${cityName}, ${stateName}`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        allowFullScreen
      />
    </div>
  );
}