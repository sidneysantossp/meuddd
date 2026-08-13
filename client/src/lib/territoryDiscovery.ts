export type LocationStatus = "idle" | "requesting" | "resolving" | "resolved" | "denied" | "unsupported" | "error";

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

export function geolocationFailure(code: number) {
  if (code === 1) {
    return { status: "denied" as const, label: "Permissão não concedida. Você pode pesquisar por cidade, UF ou DDD." };
  }
  return { status: "error" as const, label: "Não foi possível obter a localização agora." };
}
