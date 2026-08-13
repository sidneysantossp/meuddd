import { MapPin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type StateSummary = {
  name: string;
  uf: string;
  region: string;
  cityCount: number;
  dddCount: number;
};

type Position = readonly [number, number];
type Ring = Position[];
type Geometry = { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };
type GeoFeature = { properties: { sigla?: string }; geometry: Geometry };
type GeoCollection = { features: GeoFeature[] };
type SvgFeature = { uf: string; path: string; label: Position };
type StateConnection = { id: string; path: string; start: Position; end: Position; midpoint: Position; index: number };

const GEOJSON_URL = "/assets/brazil-states.geojson";
const MAP_WIDTH = 520;
const MAP_HEIGHT = 530;
const PADDING = 24;
const MAX_POINTS_PER_RING = 220;

export const STATE_CONNECTIONS = [
  ["AM", "PA"],
  ["PA", "MA"],
  ["GO", "SP"],
  ["SP", "RJ"],
  ["BA", "PE"],
  ["PR", "SC"],
] as const;

const STATE_LABEL_OFFSETS: Partial<Record<string, Position>> = {
  AL: [13, -2],
  DF: [-17, 10],
  ES: [14, -3],
  PB: [12, 1],
  PE: [13, -7],
  RJ: [14, 6],
  RN: [9, -6],
  SE: [13, 8],
};

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
    const featurePositions = polygons.flatMap(polygon => polygon.flat());
    const featureLongitudes = featurePositions.map(([longitude]) => longitude);
    const featureLatitudes = featurePositions.map(([, latitude]) => latitude);
    const label = point([
      (Math.min(...featureLongitudes) + Math.max(...featureLongitudes)) / 2,
      (Math.min(...featureLatitudes) + Math.max(...featureLatitudes)) / 2,
    ]);
    return path ? [{ uf, path, label }] : [];
  });
}

function createConnectionGeometry(start: Position, end: Position) {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const midpointX = (startX + endX) / 2;
  const midpointY = (startY + endY) / 2;
  const bend = Math.min(28, Math.max(12, Math.abs(endX - startX) * 0.14));
  return { path: `M${startX.toFixed(1)},${startY.toFixed(1)} Q${midpointX.toFixed(1)},${(midpointY - bend).toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`, midpoint: [midpointX, midpointY - bend / 2] as Position };
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
	const [openConnectionId, setOpenConnectionId] = useState<string | undefined>();
  const [hasHydrated, setHasHydrated] = useState(false);
  const stateByUf = useMemo(() => new Map(states.map(state => [state.uf, state])), [states]);
  const selectedState = selectedUf ? stateByUf.get(selectedUf) : undefined;
  const labelPositions = useMemo(() => new Map(features.map(feature => {
    const [offsetX, offsetY] = STATE_LABEL_OFFSETS[feature.uf] ?? [0, 0];
    return [feature.uf, [feature.label[0] + offsetX, feature.label[1] + offsetY] as Position];
  })), [features]);
  const connections = useMemo<StateConnection[]>(() => STATE_CONNECTIONS.flatMap(([from, to], index) => {
    const start = labelPositions.get(from);
    const end = labelPositions.get(to);
    if (!start || !end) return [];
    const geometry = createConnectionGeometry(start, end);
    return [{ id: `${from}-${to}`, ...geometry, start, end, index }];
  }), [labelPositions]);

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
            <g>
              {connections.map(connection => {
                const fromState = stateByUf.get(connection.id.split("-")[0]);
                const toState = stateByUf.get(connection.id.split("-")[1]);
                const tooltipLabel = fromState && toState
                  ? `Conexão entre ${fromState.name} e ${toState.name}`
                  : `Conexão entre ${connection.id.replace("-", " e ")}`;

                return (
                  <g key={connection.id}>
                    <path d={connection.path} className="state-connection" pointerEvents="none" style={{ animationDelay: `${-connection.index * 0.55}s` }} />
                    <circle cx={connection.start[0]} cy={connection.start[1]} r="2.4" className="state-connection-node" pointerEvents="none" style={{ animationDelay: `${-connection.index * 0.55}s` }} />
                    <circle cx={connection.end[0]} cy={connection.end[1]} r="2.4" className="state-connection-node" pointerEvents="none" style={{ animationDelay: `${-connection.index * 0.55}s` }} />
	                    <Tooltip open={openConnectionId === connection.id} onOpenChange={open => setOpenConnectionId(open ? connection.id : undefined)}>
	                      <TooltipTrigger asChild>
	                        <circle
                          cx={connection.midpoint[0]}
                          cy={connection.midpoint[1]}
                          r="3.8"
                          tabIndex={0}
	                          role="button"
	                          aria-label={`Ver detalhes da ${tooltipLabel.toLowerCase()}`}
	                          className="state-connection-midpoint"
	                          style={{ animationDelay: `${-connection.index * 0.55}s` }}
	                          onPointerDown={event => {
	                            if (event.pointerType !== "touch") return;
	                            event.preventDefault();
	                            setOpenConnectionId(current => current === connection.id ? undefined : connection.id);
	                          }}
	                          onKeyDown={event => {
	                            if (event.key === "Escape") setOpenConnectionId(undefined);
	                          }}
	                        />
	                      </TooltipTrigger>
	                      <TooltipContent side="top" sideOffset={8} className="max-w-56 border border-[#b8c8be] bg-[#fffaf1] px-3 py-2 text-[#143d36] shadow-xl">
	                        <div className="flex items-start justify-between gap-3"><div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#d94e34]">Conexão territorial</div><button type="button" onClick={() => setOpenConnectionId(undefined)} className="-mr-1 -mt-1 grid size-6 place-items-center rounded-full text-[#143d36] hover:bg-[#f1e5d3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f06a4d]" aria-label={`Fechar detalhes da ${tooltipLabel.toLowerCase()}`}><X size={13} /></button></div>
                        <div className="mt-1 text-xs font-bold">{fromState?.name ?? connection.id.split("-")[0]} → {toState?.name ?? connection.id.split("-")[1]}</div>
                        {fromState && toState ? <div className="mt-1 text-[11px] leading-4 text-[#5d756c]">{fromState.uf}: {fromState.dddCount} DDDs · {toState.uf}: {toState.dddCount} DDDs</div> : null}
                      </TooltipContent>
                    </Tooltip>
                  </g>
                );
              })}
            </g>
            <g aria-hidden="true" pointerEvents="none" className="state-labels">
              {features.map(feature => {
                const label = labelPositions.get(feature.uf);
                return label ? <text key={feature.uf} x={label[0]} y={label[1]} textAnchor="middle" dominantBaseline="central">{feature.uf}</text> : null;
              })}
            </g>
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
