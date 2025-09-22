'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Phone, MapPin, Users } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ToolStructuredData } from '@/components/seo/ToolStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';

interface ValidationResult {
  isValid: boolean;
  dddCode?: string;
  state?: string;
  region?: string;
  cities?: string[];
  description?: string;
}

export default function ValidarDDDPage() {
  const [dddInput, setDddInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateDDD = async () => {
    if (!dddInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/ddd/validate?ddd=${encodeURIComponent(dddInput)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Erro ao validar DDD:', error);
      setResult({
        isValid: false,
        description: 'Erro ao validar o código DDD. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateDDD();
    }
  };

  const formatDDD = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDDD(e.target.value);
    setDddInput(formatted);
    setResult(null);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';
  const canonicalUrl = `${baseUrl}/validar-ddd`;

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Validar DDD', url: canonicalUrl }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolStructuredData 
        toolName="Validador de DDD"
        description="Ferramenta online para validar códigos DDD brasileiros. Verifique se um código DDD é válido e descubra informações sobre a região atendida, incluindo estado, cidades e descrição."
        url={canonicalUrl}
        toolType="Validator"
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MEU DDD</h1>
                  <p className="text-sm text-gray-600">Encontre códigos de área telefônica por estado e cidade</p>
                </div>
              </div>
              <nav className="flex space-x-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/sobre" className="text-gray-600 hover:text-gray-900">Sobre</Link>
                <Link href="/contato" className="text-gray-600 hover:text-gray-900">Contato</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Validar DDD</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Validar DDD - Verifique se um Código DDD é Válido</h1>
            <p className="text-lg text-gray-600">Buscando validar um código DDD? Use nossa ferramenta online para verificar se um código DDD é válido e descubra informações sobre a região atendida</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Digite o código DDD</CardTitle>
              <CardDescription>Insira um código DDD de 2 ou 3 dígitos para validar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Ex: 11, 21, 31..."
                  value={dddInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  maxLength={3}
                  className="flex-1 text-center text-2xl font-mono"
                />
                <Button 
                  onClick={validateDDD} 
                  disabled={isLoading || dddInput.length < 2}
                  className="px-8"
                >
                  {isLoading ? 'Validando...' : 'Validar'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className={`mb-8 ${result.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {result.isValid ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <CardTitle className={result.isValid ? 'text-green-800' : 'text-red-800'}>
                    {result.isValid ? 'DDD Válido' : 'DDD Inválido'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {result.isValid ? (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-100">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-green-800">
                        O código DDD {result.dddCode} é válido e atende à região de {result.state}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{result.dddCode}</div>
                          <div className="text-sm text-gray-600">Código DDD</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-lg font-bold text-gray-900">{result.state}</div>
                          <div className="text-sm text-gray-600">{result.region}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="text-lg font-bold text-gray-900">{result.cities?.length || 0}+</div>
                          <div className="text-sm text-gray-600">Cidades</div>
                        </div>
                      </div>
                    </div>

                    {result.description && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Descrição:</h4>
                        <p className="text-gray-600">{result.description}</p>
                      </div>
                    )}

                    {result.cities && result.cities.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Principais cidades atendidas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.cities.slice(0, 10).map((city, index) => (
                            <Badge key={index} variant="outline">{city}</Badge>
                          ))}
                          {result.cities.length > 10 && (
                            <Badge variant="secondary">+{result.cities.length - 10} cidades</Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <Link href={`/estado/${result.state?.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button variant="outline">Ver detalhes de {result.state}</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Alert className="border-red-200 bg-red-100">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      {result.description || 'O código DDD informado não é válido ou não foi encontrado em nossa base de dados.'}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre Códigos DDD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    O código DDD (Discagem Direta à Distância) é um sistema de numeração 
                    telefônica utilizado no Brasil para identificar a região geográfica 
                    de origem de uma chamada telefônica.
                  </p>
                  <p>
                    Cada código DDD corresponde a uma área específica do território 
                    brasileiro, permitindo o correto roteamento das chamadas na rede 
                    de telecomunicações.
                  </p>
                  <p>
                    Os códigos DDD brasileiros possuem 2 dígitos para a maioria das 
                    regiões, com algumas exceções que utilizam 3 dígitos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como Funciona a Validação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    Nosso validador de DDD consulta uma base de dados atualizada com 
                    todos os códigos DDD oficiais do Brasil, verificando se o código 
                    informado existe e é válido.
                  </p>
                  <p>
                    Além da validação, fornecemos informações detalhadas sobre a 
                    região atendida pelo código DDD, incluindo o estado, região 
                    geográfica e principais cidades.
                  </p>
                  <p>
                    A base de dados é atualizada regularmente para garantir que 
                    todas as informações estejam corretas e atualizadas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
