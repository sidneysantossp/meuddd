import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';
// PERFORMANCE: Use lite data for instant render (~5KB vs 354KB)
import { brazilianStatesLite, searchStatesLite, getStatesByRegionLite, type StateLite } from '@/data/statesLite';
import { statesPageSEO } from '@/data/seoData';

export default function StatesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredStates, setFilteredStates] = useState<StateLite[]>(brazilianStatesLite);

  useEffect(() => {
    const searchTerm = searchParams.get('search');
    const region = searchParams.get('region');

    if (searchTerm) {
      setFilteredStates(searchStatesLite(searchTerm));
    } else if (region) {
      setFilteredStates(getStatesByRegionLite(region));
    } else {
      setFilteredStates(brazilianStatesLite);
    }
  }, [searchParams]);

  const formatPopulation = (population: number) => {
    return population.toLocaleString('pt-BR');
  };

  return (
    <MainLayout>
      <SEOHead {...statesPageSEO} />
      
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Consulte o DDD de Todos os Estados Brasileiros
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-w-3xl mx-auto max-sm:text-sm">
              Clique em um estado para ver detalhes dos códigos DDD e cidades. Encontre o código telefônico que você precisa para fazer suas ligações.
            </p>
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6 max-w-6xl mx-auto">
            {filteredStates.map((state) => (
              <Card 
                key={state.id} 
                className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-base md:text-xl xl:text-2xl font-bold text-foreground">
                      {state.name}
                    </CardTitle>
                    <Badge className="bg-button-dark text-button-dark-foreground text-xs md:text-base xl:text-lg font-bold px-2 md:px-3 py-1">
                      {state.abbreviation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
                  {/* Region */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 xl:h-5 xl:w-5 flex-shrink-0" />
                    <span className="text-xs md:text-sm xl:text-base">{state.region}</span>
                  </div>

                  {/* Population */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3 w-3 md:h-4 md:w-4 xl:h-5 xl:w-5 flex-shrink-0" />
                    <span className="text-xs md:text-sm xl:text-base">
                      {formatPopulation(state.population)} habitantes
                    </span>
                  </div>

                  {/* Capital */}
                  <div className="text-xs md:text-sm xl:text-base text-muted-foreground">
                    <span className="font-medium">Capital:</span> {state.capital}
                  </div>

                  {/* DDD Codes */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-3 w-3 md:h-4 md:w-4 xl:h-5 xl:w-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs md:text-sm xl:text-base font-medium text-foreground">
                        Códigos DDD:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {state.dddCodes.map((ddd) => (
                        <Badge 
                          key={ddd} 
                          variant="outline" 
                          className="text-xs md:text-sm xl:text-base font-semibold px-2 md:px-3 py-0.5 md:py-1"
                        >
                          {ddd}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    onClick={() => navigate(`/estado/${state.slug}`)}
                    className="w-full bg-button-dark text-button-dark-foreground hover:bg-button-dark/90 mt-3 md:mt-4 text-xs md:text-sm"
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredStates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg xl:text-xl text-muted-foreground max-sm:text-base">
                Nenhum estado encontrado com os critérios de busca.
              </p>
              <Button
                onClick={() => navigate('/estados')}
                className="mt-4 bg-primary text-primary-foreground"
              >
                Ver todos os estados
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
