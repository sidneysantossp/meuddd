'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Loader2, Search, MapPin, Phone } from 'lucide-react';

interface VoiceSearchResult {
  type: 'state' | 'city' | 'ddd' | 'instruction';
  title: string;
  description: string;
  url: string;
  confidence: number;
  dddCode?: string;
  state?: string;
}

export function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState<VoiceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Inicializar reconhecimento de voz
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'pt-BR';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          handleVoiceSearch(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Erro no reconhecimento de voz:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      setResults([]);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleVoiceSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ddd/voice-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Erro na busca por voz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSearch = async () => {
    if (!transcript.trim()) return;
    await handleVoiceSearch(transcript);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'Alta';
    if (confidence >= 0.6) return 'Média';
    return 'Baixa';
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'state':
        return <MapPin className="h-4 w-4" />;
      case 'ddd':
        return <Phone className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Mic className="h-6 w-6" />
            Busca por Voz
          </CardTitle>
          <CardDescription>
            Fale naturalmente para encontrar códigos DDD, estados ou cidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Botão de gravação */}
            <div className="flex justify-center">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                size="lg"
                className={`rounded-full w-20 h-20 ${
                  isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>

            {/* Status */}
            <div className="text-center">
              {isListening && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Ouvindo...</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Fale claramente: "Qual o DDD de São Paulo?" ou "Mostre cidades do Rio de Janeiro"
                  </p>
                </div>
              )}
            </div>

            {/* Transcrição */}
            {transcript && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Você disse:</h4>
                  <Button
                    onClick={handleTextSearch}
                    disabled={isLoading}
                    size="sm"
                    variant="outline"
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Buscar
                  </Button>
                </div>
                <p className="text-gray-800">{transcript}</p>
              </div>
            )}

            {/* Exemplos */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2 text-blue-800">Exemplos de comandos:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                <div>• "Qual o DDD de São Paulo?"</div>
                <div>• "Mostre cidades do Rio"</div>
                <div>• "DDD 21 é de onde?"</div>
                <div>• "Como ligar para Minas?"</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resultados da busca por voz</h3>
          {results.map((result, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getResultIcon(result.type)}
                      <h4 className="font-semibold">{result.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getConfidenceColor(result.confidence)}`}
                      >
                        {getConfidenceLabel(result.confidence)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {result.state && (
                        <span>Estado: {result.state}</span>
                      )}
                      {result.dddCode && (
                        <span>DDD: {result.dddCode}</span>
                      )}
                      <span>Confiança: {Math.round(result.confidence * 100)}%</span>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <a href={result.url}>Ver detalhes</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Suporte a navegadores */}
      {!recognitionRef.current && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <Mic className="h-4 w-4" />
              <span className="text-sm">
                Seu navegador não suporta reconhecimento de voz. 
                Use o campo de busca tradicional acima.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}