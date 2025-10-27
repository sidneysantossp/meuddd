"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Ruler, Phone, History, Globe } from "lucide-react";
import { EstadoMapa } from "./estado-mapa";

interface EstadoAbasProps {
  estado: {
    nome: string;
    sigla: string;
    ddd: string;
    capital: string;
    regiao: string;
    populacao: string;
    area: string;
    cidades: string[];
  };
}

export function EstadoAbas({ estado }: EstadoAbasProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Informações Completas - {estado.nome}
        </CardTitle>
        <CardDescription className="text-center">
          Tudo sobre o estado {estado.nome} e o DDD {estado.ddd}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="cidades">Cidades</TabsTrigger>
            <TabsTrigger value="historia">História</TabsTrigger>
            <TabsTrigger value="geografia">Geografia</TabsTrigger>
            <TabsTrigger value="economia">Economia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">DDD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{estado.ddd}</div>
                  <p className="text-xs text-muted-foreground">
                    Código telefônico
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estado.capital}</div>
                  <p className="text-xs text-muted-foreground">
                    Capital do estado
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Globe className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">Região</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estado.regiao}</div>
                  <p className="text-xs text-muted-foreground">
                    Região do Brasil
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">População</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estado.populacao}</div>
                  <p className="text-xs text-muted-foreground">
                    Habitantes
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Ruler className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">Área</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estado.area}</div>
                  <p className="text-xs text-muted-foreground">
                    Extensão territorial
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <CardTitle className="text-sm font-medium">Cidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estado.cidades.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Municípios
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Sobre o DDD {estado.ddd}</h3>
              <p className="text-muted-foreground leading-relaxed">
                O DDD {estado.ddd} é o código de área telefônica que cobre todo o estado do {estado.nome}. 
                Este código é essencial para fazer chamadas para qualquer cidade do estado, seja de telefone 
                fixo ou móvel. Ao ligar para o {estado.nome} a partir de outro estado, é preciso discar 
                o código {estado.ddd} antes do número de telefone.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="cidades" className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Lista de Cidades do {estado.nome} com DDD {estado.ddd}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {estado.cidades.map((cidade) => (
                  <div key={cidade} className="flex items-center space-x-2 p-3 bg-background rounded-lg border">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{cidade}</span>
                    <Badge variant="secondary" className="ml-auto">
                      DDD {estado.ddd}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="historia" className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">História do {estado.nome}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  O estado do {estado.nome} possui uma rica história que remonta aos tempos pré-colombianos, 
                  quando era habitado por diversas tribos indígenas. A região foi palco de importantes 
                  eventos durante o ciclo da borracha no início do século XX.
                </p>
                <p>
                  A criação do estado do {estado.nome} como unidade federativa autônoma ocorreu em 1962, 
                  após anos de luta e reivindicação. Antes disso, o território era um território federal 
                  administrado pelo governo central.
                </p>
                <p>
                  A economia do estado sempre foi marcada pela exploração dos recursos da floresta, 
                  especialmente o látex, e mais recentemente pela agricultura e pecuária. A capital, 
                  {estado.capital}, é o principal centro urbano e econômico do estado.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="geografia" className="space-y-6">
            <EstadoMapa estado={estado} />
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Geografia do {estado.nome}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  O estado do {estado.nome} está localizado na região {estado.regiao} do Brasil, 
                  cobrindo uma área de {estado.area}. É um dos estados com maior cobertura florestal 
                  do país, com a maior parte de seu território coberta pela Floresta Amazônica.
                </p>
                <p>
                  O clima predominante é o equatorial, com altas temperaturas durante todo o ano e 
                  índices pluviométricos elevados. A vegetação é dominada pela floresta densa, 
                  com enorme biodiversidade.
                </p>
                <p>
                  O estado faz fronteira com o Peru e a Bolívia a oeste, além de outros estados brasileiros. 
                  A rede hidrográfica é extensa, com importantes rios que servem como vias de transporte 
                  e sustentam as comunidades locais.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="economia" className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Economia do {estado.nome}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A economia do {estado.nome} é baseada principalmente no setor primário, com destaque 
                  para a agricultura, pecuária e extrativismo vegetal. O estado é um importante produtor 
                  de produtos agrícolas como açaí, cupuaçu e outras frutas da Amazônia.
                </p>
                <p>
                  O extrativismo de madeira e a produção de látex continuam sendo atividades econômicas 
                  importantes, embora com menor relevância em comparação com o passado. O setor de 
                  serviços tem crescido, especialmente na capital {estado.capital}.
                </p>
                <p>
                  O turismo ecológico e o comércio com os países vizinhos também representam 
                  oportunidades econômicas para o estado, que busca diversificar sua base produtiva 
                  e desenvolver novas atividades sustentáveis.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}