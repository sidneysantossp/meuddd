import { Briefcase, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

export default function CareersPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Trabalhe Conosco | MEU DDD"
        description="Conheça oportunidades de trabalho no MEU DDD e faça parte da nossa equipe."
        canonical="https://www.meuddd.com.br/trabalhe-conosco"
      />

      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Trabalhe Conosco
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Faça parte do time que ajuda milhões de pessoas a encontrar seus códigos DDD
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 mb-8 @container">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Nosso time
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Valorizamos colaboração, transparência e foco no usuário. Buscamos pessoas que queiram
                construir produtos úteis e acessíveis.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Briefcase className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Oportunidades
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                No momento, não há vagas abertas. Mesmo assim, você pode enviar seu currículo para o nosso banco
                de talentos.
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
                  Banco de talentos
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              Envie seu currículo para{' '}
              <a href="mailto:carreiras@meuddd.com.br" className="text-primary hover:underline">
                carreiras@meuddd.com.br
              </a>{' '}
              com área de interesse e link do portfólio (se houver).
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
