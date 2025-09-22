'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Phone } from 'lucide-react';
import Link from 'next/link';

interface StateCardProps {
  state: {
    id: string;
    name: string;
    code: string;
    slug: string;
    region: string;
    population?: number;
    area?: number;
    capital?: string;
    dddCodes: Array<{
      id: string;
      code: string;
      description?: string;
    }>;
  };
}

export function StateCard({ state }: StateCardProps) {
  const formatNumber = (num?: number) => {
    if (!num) return '';
    return num.toLocaleString('pt-BR');
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{state.name}</CardTitle>
          <Badge variant="secondary" className="text-sm">
            {state.code}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-4 w-4" />
          {state.region}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{formatNumber(state.population)} habitantes</span>
          </div>
          {state.capital && (
            <div className="text-sm text-muted-foreground">
              Capital: {state.capital}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4" />
            Códigos DDD:
          </div>
          <div className="flex flex-wrap gap-1">
            {state.dddCodes.map((ddd) => (
              <Badge key={ddd.id} variant="outline" className="text-xs">
                {ddd.code}
              </Badge>
            ))}
          </div>
        </div>

        <Link href={`/estado/${state.slug}`} className="block">
          <Button className="w-full" variant="default">
            Ver detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}