'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Phone, Building, Smartphone } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ToolStructuredData } from '@/components/seo/ToolStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';

interface GeneratedNumber {
  number: string;
  ddd: string;
  type: 'fixo' | 'celular';
  state: string;
  formatted: string;
}

export default function GeradorNumerosPage() {
  const [selectedDDD, setSelectedDDD] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumber[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const popularDDDs = [
    { code: '11', state: 'São Paulo' },
    { code: '21', state: 'Rio de Janeiro' },
    { code: '31', state: 'Minas Gerais' },
    { code: '41', state: 'Paraná' },
    { code: '51', state: 'Rio Grande do Sul' },
    { code: '61', state: 'Distrito Federal' },
    { code: '62', state: 'Goiás' },
    { code: '71', state: 'Bahia' },
    { code: '81', state: 'Pernambuco' },
    { code: '85', state: 'Ceará' }
  ];

  const generateRandomNumber = (ddd: string, type: 'fixo' | 'celular'): string => {
    let baseNumber = '';
    
    if (type === 'fixo') {
      const firstDigit = Math.floor(Math.random() * 4) + 2;
      baseNumber = firstDigit.toString();
      for (let i = 0; i < 7; i++) {
        baseNumber += Math.floor(Math.random() * 10);
      }
    } else {
      baseNumber = '9';
      for (let i = 0; i < 8; i++) {
        baseNumber += Math.floor(Math.random() * 10);
      }
    }
    
    return baseNumber;
  };

  const formatPhoneNumber = (ddd: string, number: string): string => {
    if (number.length === 8) {
      return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
    } else {
      return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
    }
  };

  const generateNumbers = async () => {
    if (!selectedDDD) return;

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const dddInfo = popularDDDs.find(d => d.code === selectedDDD);
    const numbers: GeneratedNumber[] = [];

    for (let i = 0; i < 5; i++) {
      const fixedNumber = generateRandomNumber(selectedDDD, 'fixo');
      const mobileNumber = generateRandomNumber(selectedDDD, 'celular');

      numbers.push({
        number: fixedNumber,
        ddd: selectedDDD,
        type: 'fixo',
        state: dddInfo?.state || 'Desconhecido',
        formatted: formatPhoneNumber(selectedDDD, fixedNumber)
      });

      numbers.push({
        number: mobileNumber,
        ddd: selectedDDD,
        type: 'celular',
        state: dddInfo?.state || 'Desconhecido',
        formatted: formatPhoneNumber(selectedDDD, mobileNumber)
      });
    }

    setGeneratedNumbers(numbers);
    setIsGenerating(false);
  };

  const copyToClipboard = async (number: string, index: number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const generateAllNumbers = () => {
    const allNumbers: GeneratedNumber[] = [];
    
    popularDDDs.forEach(ddd => {
      for (let i = 0; i < 2; i++) {
        const fixedNumber = generateRandomNumber(ddd.code, 'fixo');
        const mobileNumber = generateRandomNumber(ddd.code, 'celular');

        allNumbers.push({
          number: fixedNumber,
          ddd: ddd.code,
          type: 'fixo',
          state: ddd.state,
          formatted: formatPhoneNumber(ddd.code, fixedNumber)
        });

        allNumbers.push({
          number: mobileNumber,
          ddd: ddd.code,
          type: 'celular',
          state: ddd.state,
          formatted: formatPhoneNumber(ddd.code, mobileNumber)
        });
      }
    });

    setGeneratedNumbers(allNumbers);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';
  const canonicalUrl = `${baseUrl}/gerador-numeros`;

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Gerador de Números', url: canonicalUrl }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolStructuredData 
        toolName="Gerador de Números Telefônicos"
        description="Ferramenta online para gerar números de telefone válidos para testes e demonstrações. Crie números fixos e celulares seguindo o padrão brasileiro de numeração telefônica."
        url={canonicalUrl}
        toolType="Generator"
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gerador de Números</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerador de Números Telefônicos</h1>
            <p className="text-lg text-gray-600">Gere números de telefone válidos para testes e demonstrações</p>
          </div>

          <Tabs defaultValue="selective" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="selective">Gerar por DDD</TabsTrigger>
              <TabsTrigger value="all">Gerar Todos</TabsTrigger>
            </TabsList>

            <TabsContent value="selective" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione o Código DDD</CardTitle>
                  <CardDescription>Escolha um código DDD para gerar números de telefone válidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Select value={selectedDDD} onValueChange={setSelectedDDD}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione um DDD" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDDDs.map((ddd) => (
                          <SelectItem key={ddd.code} value={ddd.code}>
                            DDD {ddd.code} - {ddd.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={generateNumbers} 
                      disabled={!selectedDDD || isGenerating}
                      className="px-8"
                    >
                      {isGenerating ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Phone className="h-4 w-4 mr-2" />
                      )}
                      Gerar Números
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {generatedNumbers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Números Gerados - DDD {selectedDDD}</CardTitle>
                    <CardDescription>Números de telefone válidos para testes e demonstrações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedNumbers.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.type === 'fixo' ? (
                              <Building className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Smartphone className="h-5 w-5 text-green-600" />
                            )}
                            <div>
                              <div className="font-mono text-lg">{item.formatted}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <Badge variant={item.type === 'fixo' ? 'default' : 'secondary'}>
                                  {item.type === 'fixo' ? 'Fixo' : 'Celular'}
                                </Badge>
                                <span>{item.state}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(item.formatted, index)}
                            className="relative"
                          >
                            {copiedIndex === index ? (
                              <span className="text-green-600">Copiado!</span>
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerar Números de Todos os DDDs</CardTitle>
                  <CardDescription>Gere números de telefone para todos os principais códigos DDD do Brasil</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={generateAllNumbers}
                    className="w-full"
                    size="lg"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Gerar Números de Todos os DDDs
                  </Button>
                </CardContent>
              </Card>

              {generatedNumbers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Números Gerados - Todos os DDDs</CardTitle>
                    <CardDescription>Números de telefone válidos para todos os principais DDDs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                      {generatedNumbers.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {item.type === 'fixo' ? (
                              <Building className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Smartphone className="h-4 w-4 text-green-600" />
                            )}
                            <div>
                              <div className="font-mono text-sm">{item.formatted}</div>
                              <div className="text-xs text-gray-600">
                                {item.ddd} - {item.state}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(item.formatted, index)}
                            className="relative"
                          >
                            {copiedIndex === index ? (
                              <span className="text-green-600 text-xs">OK</span>
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Gerador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    Nosso gerador de números telefônicos cria números válidos 
                    seguindo o padrão brasileiro de numeração telefônica.
                  </p>
                  <p>
                    Os números gerados são fictícios e devem ser usados apenas 
                    para testes, demonstrações e desenvolvimento de software.
                  </p>
                  <p>
                    Não utilize estes números para fins maliciosos ou para 
                    enganar outras pessoas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formato dos Números</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span><strong>Telefones Fixos:</strong> (XX) XXXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span><strong>Telefones Celulares:</strong> (XX) XXXXX-XXXX</span>
                  </div>
                  <p>
                    Todos os números seguem as regras da Anatel e possuem 
                    o formato correto para o sistema de telefonia brasileiro.
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
