import { useState } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SEOHead from '@/components/common/SEOHead';
import { voiceSearchPageSEO } from '@/data/seoData';
import MainLayout from '@/components/layouts/MainLayout';

export default function VoiceSearchPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleVoiceSearch = () => {
    // Verifica se o navegador suporta reconhecimento de voz
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Seu navegador não suporta reconhecimento de voz. Por favor, use Chrome, Edge ou Safari.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
      
      // Redireciona para a página de busca com o termo
      window.location.href = `/estados?search=${encodeURIComponent(speechResult)}`;
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError('Erro ao reconhecer a voz. Por favor, tente novamente.');
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (

    <MainLayout>
      <SEOHead {...voiceSearchPageSEO} />
      <div className="py-8 xl:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Page Header */}
          <div className="text-center mb-8 xl:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Mic className="h-12 w-12 xl:h-16 xl:w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 max-sm:text-2xl">
              Busca por Voz
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Use sua voz para buscar estados, cidades ou códigos DDD
            </p>
          </div>

          {/* Voice Search Card */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl text-center max-sm:text-lg">
                Clique no microfone e fale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Button
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className={`h-32 w-32 xl:h-40 xl:w-40 rounded-full ${
                    isListening 
                      ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                      : 'bg-primary hover:bg-primary/90'
                  } text-primary-foreground shadow-xl max-sm:h-24 max-sm:w-24`}
                >
                  {isListening ? (
                    <MicOff className="h-16 w-16 xl:h-20 xl:w-20 max-sm:h-12 max-sm:w-12" />
                  ) : (
                    <Mic className="h-16 w-16 xl:h-20 xl:w-20 max-sm:h-12 max-sm:w-12" />
                  )}
                </Button>
              </div>

              {isListening && (
                <div className="text-center">
                  <p className="text-base xl:text-lg font-medium text-primary animate-pulse max-sm:text-sm">
                    Ouvindo... Fale agora!
                  </p>
                </div>
              )}

              {transcript && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm xl:text-base text-muted-foreground mb-2 max-sm:text-xs">
                    Você disse:
                  </p>
                  <p className="text-base xl:text-lg font-medium text-foreground max-sm:text-sm">
                    "{transcript}"
                  </p>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm xl:text-base max-sm:text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Como usar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                <li>Clique no botão do microfone</li>
                <li>Permita o acesso ao microfone quando solicitado</li>
                <li>Fale claramente o nome do estado, cidade ou código DDD</li>
                <li>Aguarde o processamento e você será redirecionado para os resultados</li>
              </ol>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm xl:text-base font-medium text-foreground mb-2 max-sm:text-xs">
                  Exemplos de comandos:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                  <li>"São Paulo"</li>
                  <li>"Rio de Janeiro"</li>
                  <li>"DDD 11"</li>
                  <li>"Fortaleza"</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
