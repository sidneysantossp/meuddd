import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Phone, MapPin, TrendingUp } from 'lucide-react';

interface SEOContentProps {
  currentState?: string;
  currentRegion?: string;
  contentType: 'faq' | 'guide' | 'related' | 'trending';
}

export function SEOContent({ currentState, currentRegion, contentType }: SEOContentProps) {
  
  const renderFAQContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Perguntas Frequentes sobre DDD</h3>
      
      <div className="space-y-3">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium mb-1">O que significa DDD?</h4>
          <p className="text-sm text-gray-600">
            DDD significa Discagem Direta à Distância. É um código numérico que identifica 
            a região geográfica de um telefone no Brasil, permitindo chamadas de longa distância.
          </p>
        </div>
        
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium mb-1">Como fazer uma chamada usando DDD?</h4>
          <p className="text-sm text-gray-600">
            Para chamadas dentro do Brasil: 0 + código DDD + número do telefone. 
            Para chamadas internacionais: +55 + código DDD + número do telefone.
          </p>
        </div>
        
        <div className="border-l-4 border-purple-500 pl-4">
          <h4 className="font-medium mb-1">Quantos dígitos tem um código DDD?</h4>
          <p className="text-sm text-gray-600">
            Os códigos DDD brasileiros têm geralmente 2 dígitos, embora algumas regiões 
            utilizem 3 dígitos para atender à demanda por novos números.
          </p>
        </div>
      </div>
    </div>
  );

  const renderGuideContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Guia Completo de DDD</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Formatos de Telefone
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Telefones fixos: (XX) XXXX-XXXX</li>
            <li>• Telefones móveis: (XX) XXXXX-XXXX</li>
            <li>• Números especiais: 0XXX ou 1XXX</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Regiões por DDD
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Sudeste: 11-19, 21-28, 31-38</li>
            <li>• Nordeste: 71-79, 81-89</li>
            <li>• Sul: 41-49, 51-59</li>
            <li>• Norte: 61-69, 91-99</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Dicas Importantes</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Sempre verifique o DDD antes de fazer uma ligação de longa distância</li>
          <li>• Celulares sempre começam com 9 após o DDD</li>
          <li>• Algumas cidades grandes têm múltiplos códigos DDD</li>
          <li>• Os códigos DDD são organizados por regiões geográficas</li>
        </ul>
      </div>
    </div>
  );

  const renderRelatedContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Conteúdo Relacionado</h3>
      
      <div className="space-y-3">
        <Link href="/validar-ddd" className="block">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium">Validador de DDD</h4>
              <p className="text-sm text-gray-600">Verifique se um código DDD é válido</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </Link>
        
        <Link href="/gerador-numeros" className="block">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium">Gerador de Números</h4>
              <p className="text-sm text-gray-600">Crie números de telefone para testes</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </Link>
        
        <Link href="/busca-por-voz" className="block">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium">Busca por Voz</h4>
              <p className="text-sm text-gray-600">Use comandos de voz para encontrar DDDs</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </Link>
      </div>
    </div>
  );

  const renderTrendingContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Buscas Populares
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { term: 'DDD 11', url: '/estado/sao-paulo', count: '2.3k' },
          { term: 'DDD 21', url: '/estado/rio-de-janeiro', count: '1.8k' },
          { term: 'DDD 31', url: '/estado/minas-gerais', count: '1.5k' },
          { term: 'DDD 41', url: '/estado/parana', count: '1.2k' },
          { term: 'DDD 51', url: '/estado/rio-grande-do-sul', count: '987' },
          { term: 'DDD 61', url: '/estado/distrito-federal', count: '876' },
          { term: 'DDD 71', url: '/estado/bahia', count: '765' },
          { term: 'DDD 81', url: '/estado/pernambuco', count: '654' }
        ].map((item, index) => (
          <Link key={index} href={item.url} className="block">
            <div className="p-3 border rounded-lg hover:bg-gray-50 text-center">
              <div className="font-medium text-sm">{item.term}</div>
              <div className="text-xs text-gray-500">{item.count} buscas</div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Sabia que?</h4>
        <p className="text-sm text-gray-700">
          O código DDD 11 foi o primeiro a ser implementado no Brasil, em 1967, 
          atendendo inicialmente apenas a cidade de São Paulo. Hoje, ele cobre 
          toda a Região Metropolitana de São Paulo e é o mais utilizado do país.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (contentType) {
      case 'faq':
        return renderFAQContent();
      case 'guide':
        return renderGuideContent();
      case 'related':
        return renderRelatedContent();
      case 'trending':
        return renderTrendingContent();
      default:
        return renderFAQContent();
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {contentType === 'faq' && <Phone className="h-5 w-5" />}
          {contentType === 'guide' && <MapPin className="h-5 w-5" />}
          {contentType === 'related' && <ExternalLink className="h-5 w-5" />}
          {contentType === 'trending' && <TrendingUp className="h-5 w-5" />}
          {contentType === 'faq' && 'Perguntas Frequentes'}
          {contentType === 'guide' && 'Guia de DDD'}
          {contentType === 'related' && 'Recursos Úteis'}
          {contentType === 'trending' && 'Tendências'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}