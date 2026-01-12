import { Mail, FileText, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

export default function PressPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Imprensa | MEU DDD"
        description="Informações e contato para imprensa e parceiros de mídia do MEU DDD."
        canonical="https://www.meuddd.com.br/imprensa"
      />

      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Imprensa
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Canal oficial para solicitações de imprensa e parcerias de mídia
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 mb-8 @container">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Solicitações de mídia
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Para entrevistas, matérias ou citações do MEU DDD, envie sua solicitação com prazo,
                pauta e veículo de comunicação.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Kit de mídia
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Materiais institucionais, logos e informações oficiais estão disponíveis mediante solicitação.
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                  Contato de imprensa
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              Entre em contato pelo e-mail{' '}
              <a href="mailto:imprensa@meuddd.com.br" className="text-primary hover:underline">
                imprensa@meuddd.com.br
              </a>{' '}
              com sua solicitação e detalhes.
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
