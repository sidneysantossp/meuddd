import { Cookie, Shield, Sliders } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';

export default function CookiesPolicyPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Políticas de Cookies | MEU DDD"
        description="Entenda como usamos cookies para melhorar sua experiência no MEU DDD e como você pode gerenciá-los."
        canonical="https://www.meuddd.com.br/politicas-de-cookies"
      />

      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Políticas de Cookies
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Transparência sobre o uso de cookies na plataforma MEU DDD
            </p>
          </div>

          <Card className="shadow-lg mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                  O que são cookies?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. 
                Eles ajudam a lembrar preferências, melhorar a navegação e oferecer uma experiência mais personalizada.
              </p>
              <p>
                No MEU DDD, usamos cookies para garantir o funcionamento correto das páginas, 
                medir desempenho e entender quais conteúdos são mais úteis para você.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 mb-8 @container">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Tipos de cookies
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs space-y-3">
                <p>
                  Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para 
                  compreender o uso das páginas e melhorar nossos recursos.
                </p>
                <p>
                  Não usamos cookies para coletar dados sensíveis sem sua autorização.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Sliders className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Como gerenciar cookies
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs space-y-3">
                <p>
                  Você pode controlar e apagar cookies nas configurações do seu navegador. 
                  Ao desativar cookies essenciais, algumas funcionalidades podem não funcionar corretamente.
                </p>
                <p>
                  Para mais informações, consulte a seção de ajuda do seu navegador.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              Se tiver dúvidas sobre nossas políticas de cookies, fale com a equipe do MEU DDD pelo e-mail{' '}
              <a href="mailto:contato@meuddd.com.br" className="text-primary hover:underline">
                contato@meuddd.com.br
              </a>.
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
