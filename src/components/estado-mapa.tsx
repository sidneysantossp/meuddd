"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Globe, Compass } from "lucide-react";

interface EstadoMapaProps {
  estado: {
    nome: string;
    sigla: string;
    capital: string;
    area: string;
    regiao: string;
  };
}

export function EstadoMapa({ estado }: EstadoMapaProps) {
  // Coordenadas aproximadas para centrar o mapa
  const coordenadas = {
    acre: { lat: -9.0238, lng: -70.8120, zoom: 6 },
    alagoas: { lat: -9.5713, lng: -36.8210, zoom: 7 },
    amapa: { lat: 1.4041, lng: -51.3170, zoom: 6 },
    amazonas: { lat: -3.4653, lng: -62.2159, zoom: 5 },
    bahia: { lat: -12.5797, lng: -41.7007, zoom: 6 },
    ceara: { lat: -5.4984, lng: -39.3046, zoom: 6 },
    distrito_federal: { lat: -15.8267, lng: -47.9218, zoom: 8 },
    espirito_santo: { lat: -19.1834, lng: -40.3089, zoom: 7 },
    goias: { lat: -15.9260, lng: -50.1250, zoom: 6 },
    maranhao: { lat: -5.5122, lng: -45.5528, zoom: 6 },
    mato_grosso: { lat: -12.6819, lng: -56.9211, zoom: 5 },
    mato_grosso_do_sul: { lat: -20.7722, lng: -54.7851, zoom: 6 },
    minas_gerais: { lat: -18.5122, lng: -44.5550, zoom: 6 },
    para: { lat: -3.7172, lng: -52.8231, zoom: 5 },
    paraiba: { lat: -7.2399, lng: -36.7819, zoom: 7 },
    parana: { lat: -24.7086, lng: -51.9368, zoom: 6 },
    pernambuco: { lat: -8.8137, lng: -36.9541, zoom: 6 },
    piaui: { lat: -7.7343, lng: -42.9066, zoom: 6 },
    rio_de_janeiro: { lat: -22.9068, lng: -43.1729, zoom: 7 },
    rio_grande_do_norte: { lat: -5.7945, lng: -36.1956, zoom: 7 },
    rio_grande_do_sul: { lat: -30.0346, lng: -51.2177, zoom: 5 },
    rondonia: { lat: -11.5057, lng: -63.5806, zoom: 6 },
    roraima: { lat: 2.8232, lng: -60.6763, zoom: 6 },
    santa_catarina: { lat: -27.5954, lng: -48.5480, zoom: 6 },
    sao_paulo: { lat: -21.5119, lng: -51.2570, zoom: 6 },
    sergipe: { lat: -10.5741, lng: -37.3856, zoom: 7 },
    tocantins: { lat: -9.4651, lng: -48.2632, zoom: 6 }
  };

  const estadoKey = estado.nome.toLowerCase().replace(/\s+/g, '_');
  const coords = coordenadas[estadoKey as keyof typeof coordenadas] || 
                 { lat: -14.2350, lng: -51.9253, zoom: 5 };

  return (
    <div className="space-y-6">
      {/* Mapa Interativo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Mapa do {estado.nome}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {/* Placeholder do mapa - em produção, integrar com Google Maps ou similar */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        {estado.sigla}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{estado.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      Capital: {estado.capital}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos do mapa */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Região {estado.regiao}</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{estado.area}</span>
                </div>
              </div>
              
              {/* Pontos de referência simulados */}
              <div className="absolute top-1/4 left-1/3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs bg-white px-1 rounded shadow-sm ml-2">
                  {estado.capital}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Mapa interativo do estado {estado.nome}. Em produção, será integrado com Google Maps 
              para visualização detalhada com cidades, estradas e pontos de referência.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Informações Geográficas Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Compass className="h-5 w-5 text-primary" />
              <span>Localização</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Região:</span>
                <Badge variant="secondary">{estado.regiao}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Coordenadas:</span>
                <span className="text-sm text-muted-foreground">
                  {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Área Total:</span>
                <span className="text-sm text-muted-foreground">{estado.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Capital:</span>
                <span className="text-sm text-muted-foreground">{estado.capital}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Características</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Bioma Principal:</span>
                <Badge variant="outline">Floresta Amazônica</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Clima:</span>
                <span className="text-sm text-muted-foreground">Equatorial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fuso Horário:</span>
                <span className="text-sm text-muted-foreground">UTC-5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fronteiras:</span>
                <span className="text-sm text-muted-foreground">Peru, Bolívia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Geográficas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas Geográficas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{estado.area}</div>
              <p className="text-sm text-muted-foreground">Área Territorial</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">~85%</div>
              <p className="text-sm text-muted-foreground">Cobertura Florestal</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">2.500mm</div>
              <p className="text-sm text-muted-foreground">Precipitação Anual</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}