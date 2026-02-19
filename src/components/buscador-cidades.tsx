"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { normalizeCitySlug } from "@/lib/utils/normalization";

interface BuscadorCidadesProps {
  estado: {
    nome: string;
    sigla: string;
    ddd: string;
    cidades: string[];
  };
}

export function BuscadorCidades({ estado }: BuscadorCidadesProps) {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const cidadesFiltradas = estado.cidades.filter(cidade =>
    cidade.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCidadeClick = (cidade: string) => {
    const slugCidade = normalizeCitySlug(cidade);
    router.push(`/cidade/${slugCidade}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Buscar Cidades - {estado.nome}
        </CardTitle>
        <CardDescription className="text-center">
          Encontre informações sobre qualquer cidade com DDD {estado.ddd}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Digite o nome da cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 text-lg py-3"
          />
        </div>

        {busca && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {cidadesFiltradas.length} cidade(s) encontrada(s) para "{busca}"
            </p>

            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {cidadesFiltradas.map((cidade) => (
                <Card key={cidade} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{cidade}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cidade} - {estado.sigla}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>DDD {estado.ddd}</span>
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCidadeClick(cidade)}
                          className="flex items-center space-x-1"
                        >
                          <span>Ver detalhes</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {cidadesFiltradas.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhuma cidade encontrada para "{busca}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente buscar por outro nome ou verifique a lista completa de cidades
                </p>
              </div>
            )}
          </div>
        )}

        {!busca && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              Busque por uma cidade do {estado.nome}
            </p>
            <p className="text-muted-foreground">
              Digite o nome da cidade para ver informações detalhadas sobre o DDD {estado.ddd}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}