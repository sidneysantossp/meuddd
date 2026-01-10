import { useState } from 'react';
import { Phone, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SEOHead from '@/components/common/SEOHead';
import { generatorPageSEO } from '@/data/seoData';
import MainLayout from '@/components/layouts/MainLayout';
import { brazilianStates } from '@/data/states';

export default function GeneratorPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDDD, setSelectedDDD] = useState('');
  const [generatedNumber, setGeneratedNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedStateData = brazilianStates.find(s => s.id === selectedState);

  const generateNumber = () => {
    if (!selectedDDD) return;

    // Gera um número de telefone aleatório (9 dígitos para celular)
    const firstDigit = 9; // Celulares começam com 9
    const remainingDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const phoneNumber = `(${selectedDDD}) ${firstDigit}${remainingDigits.slice(0, 4)}-${remainingDigits.slice(4)}`;
    
    setGeneratedNumber(phoneNumber);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (generatedNumber) {
      navigator.clipboard.writeText(generatedNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (

    <MainLayout>
      <SEOHead {...generatorPageSEO} />
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
              Gerador de Número de Telefone - Gerador de Números de Celular Brasil
            </h1>
            <p className="text-base xl:text-lg text-muted-foreground max-sm:text-sm">
              Gerador de número de celular brasileiro com código DDD válido. Gere números de telefone válidos para teste com nosso gerador de telefone online gratuito.
            </p>
          </div>

          {/* Generator Form */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Selecione o Estado e DDD para Gerar Número de Telefone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Use nosso <strong>gerador numero de telefone</strong> para criar <strong>números de telefone Brasil</strong> válidos. Selecione o estado e o <strong>código de telefone</strong> desejado. Este <strong>gerador de numero de telefone</strong> é rápido e fácil de usar.
              </p>
              {/* State Selection */}
              <div className="space-y-2">
                <label className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">
                  Estado
                </label>
                <Select value={selectedState} onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedDDD('');
                  setGeneratedNumber('');
                }}>
                  <SelectTrigger className="h-12 xl:h-14 max-sm:h-10">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name} ({state.abbreviation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DDD Selection */}
              {selectedStateData && (
                <div className="space-y-2">
                  <label className="text-sm xl:text-base font-medium text-foreground max-sm:text-xs">
                    Código DDD
                  </label>
                  <Select value={selectedDDD} onValueChange={setSelectedDDD}>
                    <SelectTrigger className="h-12 xl:h-14 max-sm:h-10">
                      <SelectValue placeholder="Selecione um DDD" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedStateData.dddCodes.map((ddd) => (
                        <SelectItem key={ddd} value={ddd}>
                          {ddd}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={generateNumber}
                disabled={!selectedDDD}
                className="w-full h-12 xl:h-14 text-base xl:text-lg bg-button-dark text-button-dark-foreground hover:bg-button-dark/90 max-sm:h-10"
              >
                Gerar Número de Telefone
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Nosso <strong>gerador de numero telefonico</strong> cria <strong>números brasileiros</strong> válidos instantaneamente
              </p>
            </CardContent>
          </Card>

          {/* Generated Number */}
          {generatedNumber && (
            <Card className="shadow-lg border-primary">
              <CardHeader>
                <CardTitle className="text-xl xl:text-2xl text-center max-sm:text-lg">
                  Número de Telefone Brasileiro Gerado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Número de celular válido</strong> criado pelo nosso <strong>gerador celular</strong>
                </p>
                <div className="bg-muted p-6 xl:p-8 rounded-lg text-center">
                  <p className="text-2xl xl:text-4xl font-bold text-foreground mb-2 max-sm:text-xl">
                    {generatedNumber}
                  </p>
                  <p className="text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                    {selectedStateData?.name} ({selectedStateData?.abbreviation}) - <strong>Telefone com DDD</strong> {selectedDDD}
                  </p>
                </div>

                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full h-12 xl:h-14 max-sm:h-10"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2 text-secondary" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 mr-2" />
                      Copiar Número
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Sobre o Gerador de Números de Telefone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm xl:prose-base max-w-none">
                <p className="text-muted-foreground">
                  Nosso <strong>gerador de número de telefone</strong> é uma ferramenta online gratuita que permite criar <strong>números de celular válidos</strong> para todos os estados brasileiros. Este <strong>gerador de número de celular</strong> utiliza códigos DDD reais e gera <strong>números de telefone válidos</strong> no formato brasileiro padrão. Com nosso <strong>gerador numero de telefone</strong>, você pode criar <strong>números telefonicos</strong> para testes e desenvolvimento.
                </p>
                
                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Como Funciona o Gerador de Número Brasileiro
                </h3>
                <p className="text-muted-foreground">
                  O <strong>gerador de números de telefone</strong> funciona de forma simples: primeiro você seleciona o estado desejado, depois escolhe o <strong>código DDD</strong> correspondente e clica em "Gerar Número de Telefone". Nossa ferramenta de <strong>gerador de telefone</strong> cria instantaneamente um <strong>número de celular com DDD</strong> válido que segue o padrão brasileiro de numeração telefônica. Este <strong>gerador numero telefone</strong> é ideal para desenvolvedores e testadores.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Gerador de DDD e Números de Celular Brasil
                </h3>
                <p className="text-muted-foreground">
                  Este <strong>gerador de DDD</strong> abrange todos os 27 estados brasileiros e mais de 65 códigos DDD diferentes. Você pode <strong>gerar número de telefone</strong> para qualquer região do Brasil, desde São Paulo (DDD 11) até Roraima (DDD 95). Nosso <strong>gerador de número telefônico</strong> garante que todos os <strong>números de telefone Brasil</strong> gerados sigam o formato correto: (DDD) 9XXXX-XXXX. Use nosso <strong>gerador de numero brasil</strong> para criar <strong>números brasileiros</strong> autênticos.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Lista de Números de Celular Válidos
                </h3>
                <p className="text-muted-foreground">
                  Com nosso <strong>gerador de números de celular Brasil</strong>, você pode criar uma <strong>lista de números de celular válidos</strong> para testes, desenvolvimento de aplicações ou demonstrações. O <strong>gerador número telefone</strong> produz <strong>números válidos</strong> que respeitam as regras da Anatel para numeração de telefonia móvel no Brasil. Cada <strong>número de telefone válido</strong> gerado pode ser usado em seus projetos de teste.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Gerador de Número de Celular com Código
                </h3>
                <p className="text-muted-foreground">
                  Nosso <strong>gerador de número de celular com código</strong> permite que você escolha especificamente qual DDD deseja usar. Este <strong>gerador de numero e codigo</strong> é perfeito para quem precisa de <strong>números de telefone válidos</strong> de uma região específica. O <strong>gerador telefone celular</strong> sempre inclui o código de área correto para cada estado. Use nosso <strong>gerador de numero celular</strong> para criar <strong>telefone com DDD</strong> de qualquer região do Brasil.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Números de Telefone Aleatórios e Válidos
                </h3>
                <p className="text-muted-foreground">
                  Use nosso <strong>gerador de numero celular</strong> para criar <strong>números de telefone aleatorios</strong> que sejam válidos no formato brasileiro. Este <strong>número de telefone gerador</strong> é ideal para desenvolvedores que precisam de <strong>números de celulares validos</strong> para testar sistemas, aplicativos ou bancos de dados. Cada <strong>número de telefone aleatório</strong> gerado segue o padrão oficial brasileiro. Nosso <strong>gerador de numero de celular valido</strong> garante a conformidade com as normas da Anatel.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Gerador de Telefone Fixo e Celular
                </h3>
                <p className="text-muted-foreground">
                  Além de funcionar como <strong>gerador de número de celular brasileiro</strong>, nossa ferramenta também pode ser usada como referência para <strong>gerador de telefone fixo</strong>. O <strong>gerador de numero br</strong> cobre toda a telefonia brasileira, permitindo <strong>gerar telefone</strong> para qualquer finalidade de teste. Use nosso <strong>criador de número de telefone</strong> sempre que precisar de <strong>números telefonicos</strong> válidos. Este <strong>gerador de numero brasileiro</strong> é a ferramenta mais completa para criar <strong>número de telefone brasileiro</strong>.
                </p>

                <h3 className="text-lg xl:text-xl font-semibold text-foreground mt-6 mb-3">
                  Consulta DDD e Geração de Números
                </h3>
                <p className="text-muted-foreground">
                  Integrado com nossa <strong>consulta DDD</strong>, este <strong>gerador de numeros telefone</strong> permite que você primeiro descubra <strong>qual o meu DDD</strong> e depois gere números para essa região. Se você está se perguntando "<strong>qual é o meu DDD</strong>" ou "<strong>qual meu DDD</strong>", nossa plataforma oferece tanto a <strong>consulta DDD celular</strong> quanto o <strong>gerador numero de telefone</strong> em um só lugar. Use nossa ferramenta para <strong>gerar número de telefone</strong> com o código correto da sua região.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Recursos do Gerador de Números Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerador de número de celular válido online</strong> - Crie números válidos instantaneamente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerador de números de celular</strong> para todos os estados brasileiros</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Números de telefone válidos no Brasil</strong> com formato correto (DDD) 9XXXX-XXXX</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerador de numero telefonico</strong> com mais de 65 códigos DDD disponíveis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerar número de celular</strong> com um clique - rápido e fácil</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Número de celular válido</strong> para testes e desenvolvimento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerador de telefone válido</strong> 100% gratuito e sem cadastro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Telefone gerador</strong> com função de copiar para área de transferência</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Gerador de números válidos</strong> seguindo padrões da Anatel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Números brasileiros</strong> autênticos para qualquer finalidade de teste</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Perguntas Frequentes sobre Gerador de Número
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Como usar o gerador de número de telefone?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Para usar nosso <strong>gerador numero telefone</strong>, basta selecionar o estado desejado, escolher o código DDD e clicar em "Gerar Número". O <strong>gerador de numeros celular</strong> criará instantaneamente um <strong>número de telefone brasileiro</strong> válido que você pode copiar e usar. Este <strong>gerador numero de telefone</strong> é muito fácil de usar.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Os números gerados são números de celular válidos?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Sim, nosso <strong>gerador de numero de celular valido</strong> cria <strong>números de celular válidos</strong> que seguem o formato brasileiro oficial. No entanto, estes são <strong>números de telefone aleatorios</strong> gerados para fins de teste e podem não estar ativos na rede de telefonia. Cada <strong>número de celular com DDD</strong> gerado respeita as normas da Anatel.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Posso gerar números para qualquer DDD do Brasil?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Sim! Nosso <strong>gerador de numero brasil</strong> cobre todos os 27 estados e mais de 65 códigos DDD. Você pode <strong>gerar numero de telefone</strong> para qualquer região, desde grandes capitais até cidades do interior. Use nossa <strong>consulta DDD</strong> para descobrir o código da sua região. Se você quer saber "<strong>qual o meu DDD</strong>", nossa plataforma ajuda você a descobrir.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Qual a diferença entre gerador de celular e gerador de telefone fixo?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Nosso <strong>gerador celular</strong> cria números de celular que começam com 9, seguindo o padrão (DDD) 9XXXX-XXXX. Um <strong>gerador de telefone fixo</strong> geraria números sem o 9 inicial. Atualmente, nossa ferramenta é especializada em <strong>gerar número de celular brasileiro</strong>. O <strong>gerador de número brasileiro</strong> foca em telefonia móvel.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Como descobrir de onde é o número gerado?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Para <strong>descobrir de onde é o número</strong>, basta olhar o código DDD entre parênteses. Nosso <strong>gerador de número telefone</strong> sempre mostra o estado correspondente ao DDD selecionado. Use nossa ferramenta de <strong>consultar DDD</strong> para mais informações sobre cada código. Se você receber uma ligação e quiser saber "<strong>qual é o meu DDD</strong>" ou "<strong>qual meu DDD</strong>", nossa plataforma tem todas as informações.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Posso usar este gerador para criar lista de números de telefone?
                </h4>
                <p className="text-sm xl:text-base text-muted-foreground">
                  Sim! Você pode usar nosso <strong>gerador de numeros de telefone</strong> quantas vezes quiser para criar uma <strong>lista de números de celular válidos</strong>. Cada vez que clicar em "Gerar Número", o <strong>telefone generator</strong> criará um novo <strong>número de celular aleatorio brasil</strong> diferente. Este <strong>gerador de numero de celular</strong> é perfeito para criar listas de teste.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Info Card */}
          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl xl:text-2xl max-sm:text-lg">
                Informações Importantes sobre Números Válidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm xl:text-base text-muted-foreground max-sm:text-xs">
                <li>Os <strong>números de telefone</strong> gerados são apenas exemplos e podem não existir na rede</li>
                <li><strong>Números de celular</strong> no Brasil começam com o dígito 9 após o código DDD</li>
                <li>O formato padrão de <strong>telefone com DDD</strong> é: (DDD) 9XXXX-XXXX</li>
                <li>Use estes <strong>números de telefones</strong> apenas para fins de teste e demonstração</li>
                <li>Nosso <strong>gerador de numero</strong> não cria números reais ativos na rede de telefonia</li>
                <li>Para <strong>número de telefone válido</strong> real, consulte as operadoras oficiais</li>
                <li>O <strong>código de telefone</strong> do Brasil é +55 para ligações internacionais</li>
                <li>Cada <strong>número ddd</strong> corresponde a uma região específica do país</li>
                <li>Este <strong>gerador de numero de telefone</strong> é gratuito e não requer cadastro</li>
                <li>Use nosso <strong>gerador numero de telefone</strong> para criar números de teste válidos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
