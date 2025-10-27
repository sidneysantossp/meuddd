import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Users } from "lucide-react";

interface EstadoHeroProps {
  estado: {
    nome: string;
    sigla: string;
    ddd: string;
    capital: string;
    populacao: string;
    area: string;
  };
}

export function EstadoHero({ estado }: EstadoHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              DDD {estado.ddd}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {estado.nome}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Código DDD {estado.ddd} - Todas as cidades do estado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-primary">{estado.ddd}</div>
                <p className="text-sm text-muted-foreground">DDD</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{estado.capital}</div>
                <p className="text-sm text-muted-foreground">Capital</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{estado.populacao}</div>
                <p className="text-sm text-muted-foreground">População</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consulte o código DDD {estado.ddd} do estado do {estado.nome}. 
              Encontre informações detalhadas sobre todas as cidades, 
              formas de discagem e operadoras telefônicas disponíveis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}