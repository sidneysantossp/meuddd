import { MapPin } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapView } from "@/components/Map";

type StateSummary = {
  name: string;
  uf: string;
  region: string;
  cityCount: number;
  dddCount: number;
};

const GEOJSON_URL = "/manus-storage/brazil-states_dc614e06.geojson";

export function BrazilStateMap({
  states,
  selectedUf,
  onStateSelect,
}: {
  states: StateSummary[];
  selectedUf?: string;
  onStateSelect: (uf: string) => void;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const stateByUf = useMemo(() => new Map(states.map(state => [state.uf, state])), [states]);
  const selectedState = selectedUf ? stateByUf.get(selectedUf) : undefined;

  const applyStyle = useCallback(() => {
    if (!map) return;
    map.data.setStyle(feature => {
      const uf = String(feature.getProperty("sigla") ?? "");
      const isSelected = uf === selectedUf;
      return {
        fillColor: isSelected ? "#f06a4d" : "#6ca8a0",
        fillOpacity: isSelected ? 0.86 : 0.56,
        strokeColor: isSelected ? "#fffaf1" : "#143d36",
        strokeWeight: isSelected ? 2.5 : 1,
        clickable: Boolean(stateByUf.get(uf)),
      };
    });
  }, [map, selectedUf, stateByUf]);

  useEffect(() => {
    applyStyle();
  }, [applyStyle]);

  const handleMapReady = useCallback((instance: google.maps.Map) => {
    setMap(instance);
    instance.setOptions({
      mapTypeId: "terrain",
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "cooperative",
      backgroundColor: "#143d36",
      styles: [
        { elementType: "geometry", stylers: [{ color: "#e7dcc6" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#143d36" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#faf3e5" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#a7c8c2" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#d2c5ad" }] },
      ],
    });
    instance.data.loadGeoJson(GEOJSON_URL, { idPropertyName: "sigla" }, () => setMapLoaded(true));
    instance.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
      const uf = String(event.feature.getProperty("sigla") ?? "");
      if (stateByUf.has(uf)) onStateSelect(uf);
    });
  }, [onStateSelect, stateByUf]);

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#cfc3b0] bg-[#e7dcc6] shadow-[0_22px_50px_rgba(20,61,54,0.12)]">
      <MapView className="h-[420px] sm:h-[500px]" initialCenter={{ lat: -14.3, lng: -52.3 }} initialZoom={3.45} onMapReady={handleMapReady} />
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
        <div className="rounded-xl border border-[#fffaf1]/70 bg-[#143d36]/95 px-4 py-3 text-[#faf3e5] shadow-lg backdrop-blur-sm">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f5c5a1]">Mapa de navegação</div>
          <div className="mt-1 flex items-center gap-2 text-sm font-bold"><MapPin size={15} className="text-[#f06a4d]" /> Clique em um estado</div>
        </div>
        {selectedState && (
          <div className="rounded-xl border border-[#fffaf1]/70 bg-[#fffaf1]/95 px-4 py-3 text-right text-[#143d36] shadow-lg backdrop-blur-sm">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#718378]">Selecionado</div>
            <div className="font-display text-2xl leading-none">{selectedState.uf}</div>
            <div className="mt-1 text-[11px] font-semibold">{selectedState.dddCount} DDDs · {selectedState.cityCount} cidades</div>
          </div>
        )}
      </div>
      {!mapLoaded && <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#143d36]/15 text-xs font-bold uppercase tracking-[0.18em] text-[#143d36]">A carregar limites estaduais</div>}
    </div>
  );
}
