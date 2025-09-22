import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Phone, Building } from 'lucide-react';

interface RelatedLink {
  title: string;
  url: string;
  description: string;
  type: 'state' | 'city' | 'ddd' | 'tool';
  priority: number;
}

interface RelatedLinksProps {
  currentState?: string;
  currentRegion?: string;
  currentDDD?: string;
  limit?: number;
}

export function RelatedLinks({ 
  currentState, 
  currentRegion, 
  currentDDD, 
  limit = 6 
}: RelatedLinksProps) {
  
  // Dados mockados - em produção, viriam do banco de dados
  const relatedStates = [
    { name: 'São Paulo', slug: 'sao-paulo', region: 'Sudeste', ddds: ['11', '12', '13'] },
    { name: 'Rio de Janeiro', slug: 'rio-de-janeiro', region: 'Sudeste', ddds: ['21', '22', '24'] },
    { name: 'Minas Gerais', slug: 'minas-gerais', region: 'Sudeste', ddds: ['31', '32', '33', '34', '35', '37', '38'] },
    { name: 'Bahia', slug: 'bahia', region: 'Nordeste', ddds: ['71', '73', '74', '75', '77'] },
    { name: 'Paraná', slug: 'parana', region: 'Sul', ddds: ['41', '42', '43', '44', '45', '46'] },
    { name: 'Rio Grande do Sul', slug: 'rio-grande-do-sul', region: 'Sul', ddds: ['51', '53', '54', '55'] }
  ];

  const tools = [
    { title: 'Validar DDD', url: '/validar-ddd', description: 'Verifique se um código DDD é válido', type: 'tool' },
    { title: 'Gerador de Números', url: '/gerador-numeros', description: 'Gere números de telefone para testes', type: 'tool' },
    { title: 'Busca por Voz', url: '/busca-por-voz', description: 'Use comandos de voz para buscar', type: 'tool' }
  ];

  const generateRelatedLinks = (): RelatedLink[] => {
    const links: RelatedLink[] = [];

    // Links para estados da mesma região
    if (currentRegion && currentState) {
      const sameRegionStates = relatedStates
        .filter(state => state.region === currentRegion && state.name !== currentState)
        .slice(0, 3);

      sameRegionStates.forEach(state => {
        links.push({
          title: state.name,
          url: `/estado/${state.slug}`,
          description: `${state.region} • ${state.ddds.length} códigos DDD`,
          type: 'state',
          priority: 8
        });
      });
    }

    // Links para estados próximos (mesma região ou regiões vizinhas)
    if (currentState) {
      const nearbyStates = relatedStates
        .filter(state => state.name !== currentState)
        .slice(0, 2);

      nearbyStates.forEach(state => {
        links.push({
          title: state.name,
          url: `/estado/${state.slug}`,
          description: `${state.region} • DDDs: ${state.ddds.join(', ')}`,
          type: 'state',
          priority: 6
        });
      });
    }

    // Links para o mesmo DDD em outras cidades/estados
    if (currentDDD) {
      const statesWithSameDDD = relatedStates
        .filter(state => state.ddds.includes(currentDDD))
        .slice(0, 2);

      statesWithSameDDD.forEach(state => {
        links.push({
          title: `DDD ${currentDDD} em ${state.name}`,
          url: `/estado/${state.slug}`,
          description: `Código DDD ${currentDDD} para ${state.name}`,
          type: 'ddd',
          priority: 7
        });
      });
    }

    // Links para ferramentas
    tools.forEach(tool => {
      links.push({
        title: tool.title,
        url: tool.url,
        description: tool.description,
        type: 'tool',
        priority: 5
      });
    });

    // Links para estados populares (se não houver contexto específico)
    if (!currentState && !currentRegion && !currentDDD) {
      const popularStates = relatedStates.slice(0, 4);
      popularStates.forEach(state => {
        links.push({
          title: state.name,
          url: `/estado/${state.slug}`,
          description: `${state.region} • ${state.ddds.length} códigos DDD`,
          type: 'state',
          priority: 9
        });
      });
    }

    // Ordenar por prioridade e limitar
    return links
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit);
  };

  const relatedLinks = generateRelatedLinks();

  const getIcon = (type: string) => {
    switch (type) {
      case 'state':
        return <MapPin className="h-4 w-4" />;
      case 'ddd':
        return <Phone className="h-4 w-4" />;
      case 'tool':
        return <Building className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'state':
        return 'Estado';
      case 'ddd':
        return 'DDD';
      case 'tool':
        return 'Ferramenta';
      default:
        return 'Link';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'state':
        return 'bg-blue-100 text-blue-800';
      case 'ddd':
        return 'bg-green-100 text-green-800';
      case 'tool':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (relatedLinks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Links Relacionados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {relatedLinks.map((link, index) => (
            <Link key={index} href={link.url} className="block">
              <div className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">
                    {getIcon(link.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm hover:text-blue-600 transition-colors">
                        {link.title}
                      </h4>
                      <Badge variant="secondary" className={`text-xs ${getTypeColor(link.type)}`}>
                        {getTypeLabel(link.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}