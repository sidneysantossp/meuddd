"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Globe, Compass, Layers, ZoomIn } from "lucide-react";

// Importações dinâmicas para SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface EstadoMapaInterativoProps {
  estado: {
    nome: string;
    sigla: string;
    capital: string;
    area: string;
    regiao: string;
    cidades: string[];
  };
}

export function EstadoMapaInterativo({ estado }: EstadoMapaInterativoProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  const mapRef = useRef<any>(null);

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

  // Coordenadas das principais cidades
  const cidadesCoordenadas = {
    acre: [
      { nome: "Rio Branco", lat: -9.9747, lng: -67.8203 },
      { nome: "Cruzeiro do Sul", lat: -7.6406, lng: -72.6708 },
      { nome: "Sena Madureira", lat: -9.0692, lng: -68.9083 },
      { nome: "Tarauacá", lat: -8.4631, lng: -71.0369 },
      { nome: "Feijó", lat: -8.1636, lng: -69.8611 }
    ],
    alagoas: [
      { nome: "Maceió", lat: -9.6658, lng: -35.7353 },
      { nome: "Arapiraca", lat: -9.7544, lng: -36.6614 },
      { nome: "Palmeira dos Índios", lat: -9.4131, lng: -36.6297 },
      { nome: "Rio Largo", lat: -9.4792, lng: -35.8831 },
      { nome: "Penedo", lat: -10.2887, lng: -36.5811 }
    ],
    amapa: [
      { nome: "Macapá", lat: 0.0360, lng: -51.0658 },
      { nome: "Santana", lat: -0.0619, lng: -51.1811 },
      { nome: "Laranjal do Jari", lat: -0.8361, lng: -52.4758 },
      { nome: "Oiapoque", lat: 2.1833, lng: -51.1333 },
      { nome: "Porto Grande", lat: 0.7083, lng: -51.6167 }
    ],
    amazonas: [
      { nome: "Manaus", lat: -3.1190, lng: -60.0217 },
      { nome: "Parintins", lat: -2.6269, lng: -56.7369 },
      { nome: "Itacoatiara", lat: -3.1436, lng: -58.4439 },
      { nome: "Manacapuru", lat: -3.2986, lng: -60.6231 },
      { nome: "Coari", lat: -4.0861, lng: -63.1356 }
    ],
    bahia: [
      { nome: "Salvador", lat: -12.9714, lng: -38.5014 },
      { nome: "Feira de Santana", lat: -12.2664, lng: -38.9669 },
      { nome: "Vitória da Conquista", lat: -15.8333, lng: -40.8333 },
      { nome: "Camaçari", lat: -12.6972, lng: -38.3231 },
      { nome: "Itabuna", lat: -14.7856, lng: -39.2797 }
    ],
    ceara: [
      { nome: "Fortaleza", lat: -3.7319, lng: -38.5267 },
      { nome: "Juazeiro do Norte", lat: -7.2269, lng: -39.3167 },
      { nome: "Sobral", lat: -3.6931, lng: -40.3481 },
      { nome: "Crato", lat: -7.2306, lng: -39.4083 },
      { nome: "Itapipoca", lat: -3.4969, lng: -39.5811 }
    ],
    distrito_federal: [
      { nome: "Brasília", lat: -15.8267, lng: -47.9218 },
      { nome: "Ceilândia", lat: -15.8333, lng: -48.1667 },
      { nome: "Taguatinga", lat: -15.8333, lng: -48.0667 },
      { nome: "Samambaia", lat: -15.9333, lng: -48.1000 },
      { nome: "Planaltina", lat: -15.6167, lng: -47.6500 }
    ],
    espirito_santo: [
      { nome: "Vitória", lat: -20.3194, lng: -40.3378 },
      { nome: "Vila Velha", lat: -20.3297, lng: -40.2925 },
      { nome: "Serra", lat: -20.1281, lng: -40.2678 },
      { nome: "Cariacica", lat: -20.2619, lng: -40.4186 },
      { nome: "Cachoeiro de Itapemirim", lat: -20.8467, lng: -41.1108 }
    ],
    goias: [
      { nome: "Goiânia", lat: -16.6864, lng: -49.2643 },
      { nome: "Aparecida de Goiânia", lat: -16.8194, lng: -49.2464 },
      { nome: "Anápolis", lat: -16.3267, lng: -48.9528 },
      { nome: "Rio Verde", lat: -17.7892, lng: -50.9108 },
      { nome: "Luziânia", lat: -16.2506, lng: -47.9500 }
    ],
    maranhao: [
      { nome: "São Luís", lat: -2.5297, lng: -44.3028 },
      { nome: "Imperatriz", lat: -5.5233, lng: -47.4767 },
      { nome: "São José de Ribamar", lat: -2.5639, lng: -44.2506 },
      { nome: "Timon", lat: -5.0942, lng: -42.8369 },
      { nome: "Caxias", lat: -4.8564, lng: -43.3569 }
    ],
    mato_grosso: [
      { nome: "Cuiabá", lat: -15.6014, lng: -56.0979 },
      { nome: "Várzea Grande", lat: -15.6469, lng: -56.1317 },
      { nome: "Rondonópolis", lat: -16.4667, lng: -54.6167 },
      { nome: "Sinop", lat: -11.8667, lng: -55.5000 },
      { nome: "Tangará da Serra", lat: -14.6269, lng: -57.4889 }
    ],
    mato_grosso_do_sul: [
      { nome: "Campo Grande", lat: -20.4697, lng: -54.6206 },
      { nome: "Dourados", lat: -22.2219, lng: -54.8117 },
      { nome: "Três Lagoas", lat: -20.7892, lng: -51.6758 },
      { nome: "Corumbá", lat: -19.0092, lng: -57.6569 },
      { nome: "Ponta Porã", lat: -22.5319, lng: -55.7236 }
    ],
    minas_gerais: [
      { nome: "Belo Horizonte", lat: -19.9167, lng: -43.9345 },
      { nome: "Uberlândia", lat: -18.9114, lng: -48.2753 },
      { nome: "Contagem", lat: -19.9317, lng: -44.0536 },
      { nome: "Juiz de Fora", lat: -21.7642, lng: -43.3506 },
      { nome: "Betim", lat: -19.9681, lng: -44.1986 }
    ],
    para: [
      { nome: "Belém", lat: -1.4558, lng: -48.4902 },
      { nome: "Ananindeua", lat: -1.3631, lng: -48.3728 },
      { nome: "Santarém", lat: -2.4431, lng: -54.7083 },
      { nome: "Marabá", lat: -5.3681, lng: -49.1306 },
      { nome: "Parauapebas", lat: -6.0756, lng: -49.8917 }
    ],
    paraiba: [
      { nome: "João Pessoa", lat: -7.1195, lng: -34.8447 },
      { nome: "Campina Grande", lat: -7.2306, lng: -35.8811 },
      { nome: "Santa Rita", lat: -7.0833, lng: -34.9667 },
      { nome: "Patos", lat: -7.0236, lng: -37.2756 },
      { nome: "Bayeux", lat: -7.1250, lng: -34.9167 }
    ],
    parana: [
      { nome: "Curitiba", lat: -25.4284, lng: -49.2733 },
      { nome: "Londrina", lat: -23.3045, lng: -51.1694 },
      { nome: "Maringá", lat: -23.4205, lng: -51.9378 },
      { nome: "Ponta Grossa", lat: -25.0950, lng: -50.1619 },
      { nome: "Cascavel", lat: -24.9561, lng: -53.4567 }
    ],
    pernambuco: [
      { nome: "Recife", lat: -8.0476, lng: -34.8770 },
      { nome: "Jaboatão dos Guararapes", lat: -8.1111, lng: -35.0156 },
      { nome: "Olinda", lat: -8.0089, lng: -34.8556 },
      { nome: "Caruaru", lat: -8.2833, lng: -35.9667 },
      { nome: "Petrolina", lat: -9.3892, lng: -40.5006 }
    ],
    piaui: [
      { nome: "Teresina", lat: -5.0892, lng: -42.8019 },
      { nome: "Parnaíba", lat: -2.9056, lng: -41.7736 },
      { nome: "Picos", lat: -7.0756, lng: -41.4667 },
      { nome: "São Raimundo Nonato", lat: -9.8431, lng: -44.1917 },
      { nome: "Floriano", lat: -6.7639, lng: -43.0156 }
    ],
    rio_de_janeiro: [
      { nome: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
      { nome: "São Gonçalo", lat: -22.8269, lng: -43.0536 },
      { nome: "Duque de Caxias", lat: -22.7856, lng: -43.3117 },
      { nome: "Nova Iguaçu", lat: -22.7592, lng: -43.4511 },
      { nome: "Niterói", lat: -22.8833, lng: -43.1033 }
    ],
    rio_grande_do_norte: [
      { nome: "Natal", lat: -5.7945, lng: -35.2111 },
      { nome: "Mossoró", lat: -5.1875, lng: -37.3442 },
      { nome: "Parnamirim", lat: -5.9167, lng: -35.2667 },
      { nome: "São Gonçalo do Amarante", lat: -5.7889, lng: -35.2333 },
      { nome: "Macaíba", lat: -5.8556, lng: -35.3556 }
    ],
    rio_grande_do_sul: [
      { nome: "Porto Alegre", lat: -30.0346, lng: -51.2177 },
      { nome: "Caxias do Sul", lat: -29.1634, lng: -51.1794 },
      { nome: "Gravataí", lat: -29.9167, lng: -51.0333 },
      { nome: "Canoas", lat: -29.9178, lng: -51.1836 },
      { nome: "Pelotas", lat: -31.7654, lng: -52.3386 }
    ],
    rondonia: [
      { nome: "Porto Velho", lat: -8.7619, lng: -63.9003 },
      { nome: "Ji-Paraná", lat: -10.8786, lng: -61.9517 },
      { nome: "Ariquemes", lat: -9.9139, lng: -63.0339 },
      { nome: "Vilhena", lat: -12.7369, lng: -60.1389 },
      { nome: "Cacoal", lat: -11.4333, lng: -61.4667 }
    ],
    roraima: [
      { nome: "Boa Vista", lat: 2.8232, lng: -60.6753 },
      { nome: "Rorainópolis", lat: 0.8444, lng: -60.4111 },
      { nome: "Caracaraí", lat: 1.8219, lng: -61.1236 },
      { nome: "Cantá", lat: 2.5667, lng: -60.5833 },
      { nome: "Bonfim", lat: 2.5167, lng: -59.8333 }
    ],
    santa_catarina: [
      { nome: "Florianópolis", lat: -27.5954, lng: -48.5480 },
      { nome: "Joinville", lat: -26.3044, lng: -48.8456 },
      { nome: "Blumenau", lat: -26.9194, lng: -49.0661 },
      { nome: "São José", lat: -27.5958, lng: -48.6181 },
      { nome: "Chapecó", lat: -27.0922, lng: -52.6156 }
    ],
    sao_paulo: [
      { nome: "São Paulo", lat: -23.5505, lng: -46.6333 },
      { nome: "Guarulhos", lat: -23.4625, lng: -46.5333 },
      { nome: "Campinas", lat: -22.9099, lng: -47.0626 },
      { nome: "São Bernardo do Campo", lat: -23.6914, lng: -46.5650 },
      { nome: "Santo André", lat: -23.6539, lng: -46.5383 }
    ],
    sergipe: [
      { nome: "Aracaju", lat: -10.9095, lng: -37.0747 },
      { nome: "Nossa Senhora do Socorro", lat: -10.8333, lng: -37.1167 },
      { nome: "Lagarto", lat: -10.8556, lng: -37.6500 },
      { nome: "Itabaiana", lat: -10.6833, lng: -37.4333 },
      { nome: "São Cristóvão", lat: -11.2167, lng: -37.2000 }
    ],
    tocantins: [
      { nome: "Palmas", lat: -10.1845, lng: -48.3336 },
      { nome: "Araguaína", lat: -7.1936, lng: -48.2067 },
      { nome: "Gurupi", lat: -11.7186, lng: -49.0686 },
      { nome: "Porto Nacional", lat: -10.7083, lng: -48.4111 },
      { nome: "Colinas do Tocantins", lat: -8.0536, lng: -48.4767 }
    ]
  };

  useEffect(() => {
    setIsClient(true);
    
    // Carregar CSS do Leaflet
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
        
        // Configurar ícone padrão
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
      });
    }
  }, []);

  if (!isClient || !L) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Mapa do {estado.nome}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Carregando mapa interativo...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const estadoKey = estado.nome.toLowerCase().replace(/\s+/g, '_');
  const coords = coordenadas[estadoKey as keyof typeof coordenadas] || 
                 { lat: -14.2350, lng: -51.9253, zoom: 6 };
  
  const cidades = cidadesCoordenadas[estadoKey as keyof typeof cidadesCoordenadas] || [];

  // Função para obter o DDD do estado
  const getDDDByEstado = (sigla: string) => {
    const ddds: { [key: string]: string } = {
      "AC": "68", "AL": "82", "AP": "96", "AM": "92", "BA": "71",
      "CE": "85", "DF": "61", "ES": "27", "GO": "62", "MA": "98",
      "MT": "65", "MS": "67", "MG": "31", "PA": "91", "PB": "83",
      "PR": "41", "PE": "81", "PI": "86", "RJ": "21", "RN": "84",
      "RS": "51", "RO": "69", "RR": "95", "SC": "48", "SP": "11",
      "SE": "79", "TO": "63"
    };
    return ddds[sigla] || "00";
  };

  const dddEstado = getDDDByEstado(estado.sigla);

  return (
    <div className="space-y-6">
      {/* Mapa Interativo Real */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Mapa Interativo do {estado.nome}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 rounded-lg overflow-hidden border">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={coords.zoom}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Marcador da capital */}
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold">{estado.capital}</h3>
                    <p className="text-sm text-muted-foreground">Capital do {estado.nome}</p>
                    <Badge variant="secondary" className="mt-1">
                      DDD {dddEstado}
                    </Badge>
                  </div>
                </Popup>
              </Marker>

              {/* Marcadores das cidades principais */}
              {cidades.map((cidade, index) => (
                <Marker key={index} position={[cidade.lat, cidade.lng]}>
                  <Popup>
                    <div className="text-center">
                      <h4 className="font-medium">{cidade.nome}</h4>
                      <p className="text-sm text-muted-foreground">{cidade.nome} - {estado.sigla}</p>
                      <Badge variant="outline" className="mt-1">
                        DDD {dddEstado}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Capital</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Cidades</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Mapa interativo • OpenStreetMap • Zoom e navegação disponíveis
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Controles do Mapa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-primary" />
            <span>Controles do Mapa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <ZoomIn className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Zoom</h4>
              <p className="text-sm text-muted-foreground">
                Use o scroll ou botões para zoom
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Navigation className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Navegação</h4>
              <p className="text-sm text-muted-foreground">
                Arraste para mover o mapa
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Marcadores</h4>
              <p className="text-sm text-muted-foreground">
                Clique nos marcadores para detalhes
              </p>
            </div>
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
              <span>Estatísticas do Mapa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Cidades Mapeadas:</span>
                <span className="text-sm text-muted-foreground">{cidades.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Nível de Zoom:</span>
                <span className="text-sm text-muted-foreground">{coords.zoom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fonte do Mapa:</span>
                <span className="text-sm text-muted-foreground">OpenStreetMap</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tipo:</span>
                <Badge variant="outline">Interativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Cidades no Mapa */}
      {cidades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cidades Destacadas no Mapa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cidades.map((cidade, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{cidade.nome}</span>
                  <Badge variant="secondary" className="ml-auto">
                    DDD {dddEstado}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}