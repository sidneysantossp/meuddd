export type LocationStatus =
  | "idle"
  | "requesting"
  | "resolving"
  | "resolved"
  | "denied"
  | "unsupported"
  | "error";
export type LocationPrecision = "approximate" | "exact";

export type NearbyTerritorySuggestion = {
  municipalityName: string;
  uf: string;
  stateName: string;
  ddd: string;
  distanceKm: number;
};

export function stateSelection(uf: string) {
  return { query: "", uf };
}

export function territorySelection(territory: NearbyTerritorySuggestion) {
  return {
    query: territory.ddd,
    uf: territory.uf,
    label: `Localização aproximada: ${territory.municipalityName} · ${territory.uf}. Sugerimos o DDD ${territory.ddd}.`,
  };
}

export function coordinatesForPrecision(
  coordinates: { latitude: number; longitude: number },
  precision: LocationPrecision
) {
  if (precision === "exact") return coordinates;
  const grid = 0.25;
  return {
    latitude: Math.round(coordinates.latitude / grid) * grid,
    longitude: Math.round(coordinates.longitude / grid) * grid,
  };
}

export function precisionDescription(precision: LocationPrecision) {
  return precision === "approximate"
    ? "Aproximada: reduzimos a precisão da coordenada antes da consulta."
    : "Mais precisa: usamos a coordenada recebida apenas para sugerir o território.";
}

export function geolocationFailure(code: number) {
  if (code === 1) {
    return {
      status: "denied" as const,
      label:
        "Permissão não concedida. Você pode pesquisar por cidade, UF ou DDD.",
    };
  }
  return {
    status: "error" as const,
    label: "Não foi possível obter a localização agora.",
  };
}
