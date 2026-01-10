import { useState } from 'react';
import { CheckCircle, XCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import SEOHead from '@/components/common/SEOHead';
import { validateDDDPageSEO } from '@/data/seoData';
import { brazilianStates } from '@/data/states';
import { sanitizeDDD, isValidDDD } from '@/utils/security';

export default function ValidateDDDPage() {
  const [dddInput, setDddInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    states: Array<{ name: string; abbreviation: string; region: string }>;
  } | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ddd = sanitizeDDD(dddInput);
    
    if (!ddd || !isValidDDD(ddd)) {
      setValidationResult({
        isValid: false,
        states: []
      });
      return;
    }

    const matchingStates = brazilianStates
      .filter(state => state.dddCodes.includes(ddd))
      .map(state => ({
        name: state.name,
        abbreviation: state.abbreviation,
        region: state.region
      }));

    setValidationResult({
      isValid: matchingStates.length > 0,
      states: matchingStates
    });
  };

  return (

    <MainLayout>
      <SEOHead {...validateDDDPageSEO} />
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Phone className="h-12 w-12 xl:h-16 xl:w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Validar Código DDD
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Digite um código DDD para verificar se é válido e descobrir a qual estado pertence
            </p>
          </div>

          {/* Validation Form */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl text-center max-sm:text-lg">
                Digite o Código DDD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleValidate} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Ex: 11, 21, 85..."
                    value={dddInput}
                    onChange={(e) => setDddInput(sanitizeDDD(e.target.value))}
                    className="h-14 xl:h-16 text-center text-xl xl:text-2xl font-bold max-sm:h-12 max-sm:text-lg"
                    maxLength={2}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label="Código DDD"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 xl:h-14 text-base xl:text-lg bg-button-dark text-button-dark-foreground hover:bg-button-dark/90 max-sm:h-10"
                >
                  Validar DDD
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Validation Result */}
          {validationResult && (
            <Card className={`shadow-lg ${validationResult.isValid ? 'border-secondary' : 'border-destructive'}`}>
              <CardContent className="p-6 xl:p-8">
                <div className="text-center mb-6">
                  {validationResult.isValid ? (
                    <>
                      <CheckCircle className="h-16 w-16 xl:h-20 xl:w-20 text-secondary mx-auto mb-4" />
                      <h2 className="text-2xl xl:text-3xl font-bold text-secondary mb-2 max-sm:text-xl">
                        DDD Válido!
                      </h2>
                      <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                        O código {dddInput} é válido e pertence a:
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-16 w-16 xl:h-20 xl:w-20 text-destructive mx-auto mb-4" />
                      <h2 className="text-2xl xl:text-3xl font-bold text-destructive mb-2 max-sm:text-xl">
                        DDD Inválido
                      </h2>
                      <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
                        O código {dddInput} não foi encontrado em nossa base de dados.
                      </p>
                    </>
                  )}
                </div>

                {validationResult.isValid && validationResult.states.length > 0 && (
                  <div className="space-y-3">
                    {validationResult.states.map((state, index) => (
                      <div
                        key={index}
                        className="bg-muted p-4 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="text-base xl:text-lg font-bold text-foreground max-sm:text-sm">
                            {state.name} ({state.abbreviation})
                          </p>
                          <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                            Região {state.region}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
