import { Phone, MapPin, Search, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';
import { aboutPageSEO } from '@/data/seoData';

export default function AboutPage() {
  return (
    <MainLayout>
      <SEOHead {...aboutPageSEO} />
      
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Sobre o MEU DDD
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Sua plataforma completa para consulta de códigos DDD do Brasil
            </p>
          </div>

          {/* About Content */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                O que é o MEU DDD?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
              <p>
                O MEU DDD é uma plataforma web desenvolvida para facilitar a consulta de códigos DDD 
                (Discagem Direta à Distância) de todos os estados e cidades do Brasil. Nossa missão é 
                fornecer informações precisas e atualizadas sobre os códigos telefônicos brasileiros de 
                forma rápida e intuitiva.
              </p>
              <p>
                Com uma base de dados completa contendo informações sobre os 27 estados brasileiros, 
                mais de 65 códigos DDD e centenas de cidades cadastradas, o MEU DDD é a ferramenta ideal 
                para quem precisa encontrar códigos telefônicos para fazer ligações em todo o território nacional.
              </p>
              <p>
                Nossa plataforma oferece múltiplas formas de busca, incluindo pesquisa por texto, filtros 
                por região geográfica, validação de códigos DDD, busca por voz e até mesmo um gerador de 
                números de exemplo para testes.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 mb-8 @container">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Search className="h-6 w-6 xl:h-8 xl:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Busca Inteligente
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Pesquise por estado, cidade ou código DDD e encontre resultados instantâneos com 
                informações detalhadas.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 xl:h-8 xl:w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Filtro por Região
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Navegue pelos estados organizados por região geográfica: Norte, Nordeste, Centro-Oeste, 
                Sudeste e Sul.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 xl:h-8 xl:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Validação de DDD
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Verifique se um código DDD é válido e descubra a qual estado e região ele pertence.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mic className="h-6 w-6 xl:h-8 xl:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg xl:text-xl max-sm:text-base">
                    Busca por Voz
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                Use comandos de voz para buscar estados, cidades ou códigos DDD de forma rápida e prática.
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Nossa Base de Dados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 @container">
                <div className="text-center">
                  <div className="text-3xl xl:text-4xl font-bold text-primary mb-2 max-sm:text-2xl">27</div>
                  <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Estados Brasileiros
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl xl:text-4xl font-bold text-secondary mb-2 max-sm:text-2xl">65+</div>
                  <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Códigos DDD
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl xl:text-4xl font-bold text-accent mb-2 max-sm:text-2xl">730+</div>
                  <div className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    Cidades Cadastradas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
