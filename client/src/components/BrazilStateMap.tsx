import { MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type StateSummary = {
  name: string;
  uf: string;
  region: string;
  cityCount: number;
  dddCount: number;
};

type Position = [number, number];
type Ring = Position[];
type Geometry = { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };
type GeoFeature = { properties: { sigla?: string }; geometry: Geometry };
type GeoCollection = { features: GeoFeature[] };
type SvgFeature = { uf: string; path: string };

const GEOJSON_URL = "/manus-storage/brazil-states_dc614e06.geojson";
const MAP_WIDTH = 520;
const MAP_HEIGHT = 530;
const PADDING = 24;
const MAX_POINTS_PER_RING = 220;

function simplifyRing(ring: Ring) {
  if (ring.length <= MAX_POINTS_PER_RING) return ring;
  const stride = Math.ceil(ring.length / MAX_POINTS_PER_RING);
  const sampled = ring.filter((_, index) => index % stride === 0);
  const last = ring[ring.length - 1];
  if (sampled[sampled.length - 1] !== last) sampled.push(last);
  return sampled;
}

function createPaths(collection: GeoCollection): SvgFeature[] {
  const positions = collection.features.flatMap(feature => {
    const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
    return polygons.flatMap(polygon => polygon.flat());
  });
  if (!positions.length) return [];

  const longitudes = positions.map(([longitude]) => longitude);
  const latitudes = positions.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const scale = Math.min((MAP_WIDTH - PADDING * 2) / (maxLongitude - minLongitude), (MAP_HEIGHT - PADDING * 2) / (maxLatitude - minLatitude));
  const offsetX = (MAP_WIDTH - (maxLongitude - minLongitude) * scale) / 2;
  const offsetY = (MAP_HEIGHT - (maxLatitude - minLatitude) * scale) / 2;
  const point = ([longitude, latitude]: Position) => [offsetX + (longitude - minLongitude) * scale, offsetY + (maxLatitude - latitude) * scale] as const;
  const ringPath = (ring: Ring) => {
    const points = simplifyRing(ring).map(point);
    if (points.length < 3) return "";
    return `${points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("")}Z`;
  };

  return collection.features.flatMap(feature => {
    const uf = feature.properties.sigla?.toUpperCase();
    if (!uf) return [];
    const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
    const path = polygons.map(polygon => polygon.map(ringPath).join(" ")).join(" ");
    return path ? [{ uf, path }] : [];
  });
}

export function BrazilStateMap({
  states,
  selectedUf,
  onStateSelect,
}: {
  states: StateSummary[];
  selectedUf?: string;
  onStateSelect: (uf: string) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [features, setFeatures] = useState<SvgFeature[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [hoveredUf, setHoveredUf] = useState<string | undefined>();
  const [hasHydrated, setHasHydrated] = useState(false);
  const stateByUf = useMemo(() => new Map(states.map(state => [state.uf, state])), [states]);
  const selectedState = selectedUf ? stateByUf.get(selectedUf) : undefined;

  useEffect(() => setHasHydrated(true), []);

  useEffect(() => {
    const target = mapRef.current;
    if (!target) return;
    let loadTimer: number | undefined;
    const scheduleLoad = () => {
      loadTimer = window.setTimeout(() => setShouldLoad(true), 450);
    };

    if (!("IntersectionObserver" in window)) {
      scheduleLoad();
      return () => window.clearTimeout(loadTimer);
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        scheduleLoad();
      }
    }, { rootMargin: "240px 0px" });
    observer.observe(target);
    return () => {
      observer.disconnect();
      window.clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const controller = new AbortController();
    fetch(GEOJSON_URL, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar os limites estaduais.");
        return response.json() as Promise<GeoCollection>;
      })
      .then(data => setFeatures(createPaths(data)))
      .catch(error => {
        if (error.name !== "AbortError") setLoadError(true);
      });
    return () => controller.abort();
  }, [shouldLoad]);

  return (
    <div ref={mapRef} className="relative overflow-hidden rounded-[1.5rem] border border-[#29564d] bg-[#143d36] shadow-[0_22px_50px_rgba(20,61,54,0.24)]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(250,243,229,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(250,243,229,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative h-[420px] sm:h-[500px]">
        {features.length > 0 ? (
          <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="h-full w-full p-6 sm:p-8" role="list" aria-label="Mapa interativo dos estados do Brasil">
            <title>Mapa interativo dos estados brasileiros</title>
            {features.map(feature => {
              const state = stateByUf.get(feature.uf);
              const isSelected = feature.uf === selectedUf;
              const isHovered = feature.uf === hoveredUf;
              return (
                <path
                  key={feature.uf}
                  d={feature.path}
                  role="listitem"
                  tabIndex={state ? 0 : -1}
                  aria-label={state ? `Selecionar ${state.name}, ${state.uf}` : feature.uf}
                  aria-current={isSelected ? "true" : undefined}
                  onClick={() => state && onStateSelect(feature.uf)}
                  onKeyDown={event => {
                    if (state && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      onStateSelect(feature.uf);
                    }
                  }}
                  onMouseEnter={() => setHoveredUf(feature.uf)}
                  onMouseLeave={() => setHoveredUf(undefined)}
                  className={state ? "cursor-pointer outline-none transition-[fill,stroke,opacity] duration-200 focus-visible:stroke-[#fffaf1] focus-visible:[stroke-width:3]" : "opacity-40"}
                  fill={isSelected ? "#f06a4d" : isHovered ? "#9ec9c0" : "#5f9f96"}
                  fillOpacity={isSelected ? 1 : isHovered ? 0.96 : 0.78}
                  stroke={isSelected ? "#fffaf1" : "#d9eee7"}
                  strokeWidth={isSelected ? 2.4 : 1.05}
                  vectorEffect="non-scaling-stroke"
                  fillRule="evenodd"
                />
              );
            })}
          </svg>
        ) : (
          <div className="grid h-full place-items-center px-10 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#f7e8ce]/80">
            {loadError ? "Limites indisponíveis no momento" : shouldLoad ? "A carregar mapa dos estados" : "Mapa pronto para navegar"}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
        <div className="rounded-xl border border-[#fffaf1]/20 bg-[#143d36]/95 px-4 py-3 text-[#faf3e5] shadow-lg backdrop-blur-sm">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f5c5a1]">Mapa de navegação</div>
          <div className="mt-1 flex items-center gap-2 text-sm font-bold"><MapPin size={15} className="text-[#f06a4d]" /> Clique em um estado</div>
        </div>
        {hasHydrated && selectedState && (
          <div className="rounded-xl border border-[#fffaf1]/70 bg-[#fffaf1]/95 px-4 py-3 text-right text-[#143d36] shadow-lg backdrop-blur-sm">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#718378]">Selecionado</div>
            <div className="font-display text-2xl leading-none">{selectedState.uf}</div>
            <div className="mt-1 text-[11px] font-semibold">{selectedState.dddCount} DDDs · {selectedState.cityCount} cidades</div>
          </div>
        )}
      </div>
      {loadError && <div className="absolute inset-x-5 bottom-5 rounded-xl border border-[#f5c5a1]/30 bg-[#143d36]/90 px-4 py-3 text-center text-xs text-[#f7e8ce]">Use a seleção rápida abaixo para navegar pelos estados.</div>}
    </div>
  );
}
