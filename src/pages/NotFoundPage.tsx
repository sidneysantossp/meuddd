import { Link } from 'react-router-dom';
import { Home, Search, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

/**
 * Página 404 - Não Encontrado
 * Exibida quando o usuário tenta acessar uma rota que não existe
 */
export default function NotFoundPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Página Não Encontrada - MEU DDD"
        description="A página que você está procurando não foi encontrada. Volte para a página inicial ou use a busca para encontrar códigos DDD."
        keywords={['404', 'página não encontrada', 'erro']}
        canonical={`${window.location.origin}/404`}
      />
      
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Card className="max-w-2xl w-full shadow-lg">
          <CardContent className="p-8 xl:p-12">
            {/* Número 404 */}
            <div className="text-center mb-8">
              <h1 className="text-8xl xl:text-9xl font-bold text-primary mb-4 max-sm:text-7xl">
                404
              </h1>
              <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-4 max-sm:text-xl">
                Página Não Encontrada
              </h2>
              <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                Desculpe, a página que você está procurando não existe ou foi movida.
              </p>
            </div>

            {/* Ilustração */}
            <div className="flex justify-center mb-8">
              <div className="bg-muted p-8 rounded-full">
                <MapPin className="h-24 w-24 text-muted-foreground" />
              </div>
            </div>

            {/* Sugestões */}
            <div className="space-y-4 mb-8">
              <p className="text-center text-muted-foreground">
                Aqui estão algumas sugestões do que você pode fazer:
              </p>
              
              <div className="grid gap-3">
                <Link to="/" className="block">
                  <Button
                    variant="default"
                    className="w-full flex items-center justify-center gap-2 h-12"
                  >
                    <Home className="h-5 w-5" />
                    Voltar para a Página Inicial
                  </Button>
                </Link>

                <Link to="/estados" className="block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 h-12"
                  >
                    <MapPin className="h-5 w-5" />
                    Ver Todos os Estados
                  </Button>
                </Link>

                <Link to="/validar" className="block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 h-12"
                  >
                    <Search className="h-5 w-5" />
                    Validar um Código DDD
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="w-full flex items-center justify-center gap-2 h-12"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Voltar à Página Anterior
                </Button>
              </div>
            </div>

            {/* Links úteis */}
            <div className="text-center text-sm text-muted-foreground pt-6 border-t">
              <p className="mb-2">Precisa de ajuda?</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/sobre" className="text-primary hover:underline">
                  Sobre Nós
                </Link>
                <Link to="/contato" className="text-primary hover:underline">
                  Contato
                </Link>
                <Link to="/mapa-do-site" className="text-primary hover:underline">
                  Mapa do Site
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
