import { VoiceSearch } from '@/components/ddd/VoiceSearch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Mic, Brain, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { ToolStructuredData } from '@/components/seo/ToolStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';

export default function BuscaPorVozPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meuddd.com.br';
  const canonicalUrl = `${baseUrl}/busca-por-voz`;

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Busca por Voz', url: canonicalUrl }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolStructuredData 
        toolName="Busca por Voz Inteligente"
        description="Ferramenta de busca por voz com inteligência artificial para encontrar códigos DDD, estados e cidades brasileiras. Use linguagem natural para fazer perguntas e obter respostas precisas."
        url={canonicalUrl}
        toolType="VoiceSearch"
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mic className="h-8 w-8 text-blue-600" />
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Busca por Voz</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Busca por Voz - Encontre DDDs com Comandos de Voz</h1>
            <p className="text-xl text-gray-600 mb-8">Buscando encontrar códigos DDD por voz? Use nossa ferramenta com inteligência artificial para encontrar DDDs, estados e cidades usando linguagem natural</p>
            <VoiceSearch />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>IA Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nossa tecnologia de processamento de linguagem natural 
                  entende diversos tipos de perguntas e comandos de voz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Resposta Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Resultados instantâneos com alta precisão, 
                  otimizados para buscas por voz e assistentes virtuais.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Alta Precisão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sistema de confiança avalia a precisão de cada resultado, 
                  mostrando apenas as informações mais relevantes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Como Funciona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mic className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Fale Naturalmente</h3>
                  <p className="text-sm text-gray-600">
                    Clique no microfone e faça sua pergunta em português natural
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Processamento por IA</h3>
                  <p className="text-sm text-gray-600">
                    Nossa IA analisa sua pergunta e extrai padrões de busca
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Busca Inteligente</h3>
                  <p className="text-sm text-gray-600">
                    Consultamos nossa base de dados com base no entendimento da pergunta
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">4. Resultados Precisos</h3>
                  <p className="text-sm text-gray-600">
                    Apresentamos os resultados com pontuação de confiança e relevância
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Exemplos de Comandos</CardTitle>
              <CardDescription className="text-center">
                Experimente estas frases ou crie as suas próprias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Busca por DDD</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      "Qual o DDD de São Paulo?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      "DDD 21 é de onde?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      "Me mostre os códigos DDD do Rio"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      "Quais DDDs tem Minas Gerais?"
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Busca por Local</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      "Mostre cidades do Paraná"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      "Quais cidades usam DDD 11?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      "Capitais do Nordeste"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      "Cidades grandes de São Paulo"
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-purple-600">Instruções e Ajuda</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      "Como ligar para outro estado?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      "Como usar o código DDD?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      "O que significa DDD?"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      "Formato de telefone brasileiro"
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-yellow-600">Comandos Complexos</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      "Compare DDDs de SP e RJ"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      "Estado com mais códigos DDD"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      "DDD para região Sul do Brasil"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      "Cidades com múltiplos DDDs"
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
