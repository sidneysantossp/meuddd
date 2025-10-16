'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Phone, MapPin, Clock, Users, Building } from 'lucide-react'

interface CityFAQProps {
  cityName: string;
  stateName: string;
  dddCodes: string[];
}

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export function CityFAQ({ cityName, stateName, dddCodes }: CityFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqItems: FAQItem[] = [
    {
      question: `Qual é o DDD de ${cityName}?`,
      answer: `O código DDD de ${cityName}, ${stateName}, é ${dddCodes.join(' ou ')}. Este código deve ser discado antes do número de telefone ao fazer ligações para outras cidades ou estados. Para ligações locais dentro de ${cityName}, geralmente não é necessário digitar o DDD.`,
      icon: <Phone className="w-5 h-5" />
    },
    {
      question: `Como fazer ligações para ${cityName} de outro estado?`,
      answer: `Para ligar para ${cityName} de outro estado, discar: 0 + operadora de escolha + ${dddCodes[0]} + número do telefone. Por exemplo: 021 ${dddCodes[0]} XXXX-XXXX. Lembre-se que ${dddCodes.length > 1 ? 'os códigos ' + dddCodes.join(' e ') + ' cobrem' : 'o código ' + dddCodes[0] + ' cobre'} a região de ${cityName} e cidades vizinhas.`,
      icon: <Phone className="w-5 h-5" />
    },
    {
      question: `${cityName} usa mais de um código DDD?`,
      answer: dddCodes.length > 1 
        ? `Sim, ${cityName} é atendida por múltiplos códigos DDD: ${dddCodes.join(', ')}. Isso ocorre devido ao crescimento populacional e à necessidade de mais números de telefone disponíveis. A distribuição dos códigos pode variar conforme a região da cidade.`
        : `Não, ${cityName} utiliza um único código DDD: ${dddCodes[0]}. Este código atende toda a cidade e região metropolitana, facilitando a comunicação local.`,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      question: `Quais cidades vizinhas usam o mesmo DDD de ${cityName}?`,
      answer: `O código DDD ${dddCodes[0]} também atende várias cidades na região de ${stateName}. Isso facilita a comunicação entre cidades vizinhas, pois as ligações entre elas são consideradas locais. A região coberta por este DDD foi definida pela Anatel para otimizar o sistema de telecomunicações local.`,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      question: `Como fazer ligações de ${cityname} para o exterior?`,
      answer: `Para ligar de ${cityName} para o exterior, discar: 00 + operadora de escolha + código do país + código da cidade (sem o DDD) + número do telefone. Por exemplo, para os Estados Unidos: 00 + operadora + 1 + código da cidade + número. Verifique sempre os códigos internacionais antes de fazer ligações internacionais.`,
      icon: <Phone className="w-5 h-5" />
    },
    {
      question: `O DDD de ${cityName} mudou algum dia?`,
      answer: `O sistema de DDD no Brasil passou por várias atualizações ao longo dos anos. Em ${stateName}, os códigos foram estabelecidos para melhor organizar o sistema telefônico. Caso haja alguma mudança futura no DDD de ${cityName}, a Anatel e as operadoras de telefonia comunicarão com antecedência aos usuários.`,
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: `É necessário usar o DDD para ligações dentro de ${cityName}?`,
      answer: `Para ligações dentro da mesma cidade de ${cityName}, geralmente não é necessário digitar o código DDD. Basta discar os 8 ou 9 dígitos do número de telefone. No entanto, para ligações entre cidades diferentes que compartilham o mesmo código DDD, o procedimento pode variar conforme a operadora.`,
      icon: <Phone className="w-5 h-5" />
    },
    {
      question: `Quantos habitantes têm ${cityName} e como isso afeta o DDD?`,
      answer: `${cityName} é uma cidade importante em ${stateName} com população significativa. O número de habitantes influencia diretamente na quantidade de números de telefone disponíveis, o que justifica a necessidade de códigos DDD específicos. Cidades maiores podem precisar de múltiplos códigos DDD para atender à demanda por linhas telefônicas.`,
      icon: <Users className="w-5 h-5" />
    },
    {
      question: `Quais operadoras de telefonia funcionam em ${cityName}?`,
      answer: `Em ${cityName}, você encontrará as principais operadoras de telefonia móvel e fixa do Brasil: Vivo, Claro, TIM, Oi, além de operadoras regionais. A cobertura pode variar conforme a região da cidade, mas todas as principais operadoras oferecem serviços na área urbana. Verifique a cobertura específica no seu endereço.`,
      icon: <Building className="w-5 h-5" />
    },
    {
      question: `Como verificar se um número de ${cityName} é válido?`,
      answer: `Para verificar se um número de ${cityName} é válido, verifique se ele segue o padrão: ${dddCodes.join(' ou ')} + 8 ou 9 dígitos. Números de celular geralmente começam com 9, seguidos de 8 dígitos. Números fixos têm 8 dígitos. Você pode usar aplicativos de identificação de chamadas ou consultar diretamente com a operadora para confirmar a validade.`,
      icon: <Phone className="w-5 h-5" />
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-6 h-6 text-blue-600" />
          Perguntas Frequentes sobre DDD de {cityName}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tire suas dúvidas sobre o código DDD de {cityName} e como utilizá-lo
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-gray-50"
                onClick={() => toggleItem(index)}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="text-blue-600">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                </div>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </Button>
              
              {openItems.includes(index) && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pl-8 pr-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            Não encontrou sua dúvida?
          </h4>
          <p className="text-sm text-blue-800 mb-3">
            Se você tiver outras perguntas sobre o DDD de {cityName}, 
            entre em contato com sua operadora de telefonia ou consulte o site da Anatel.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a 
                href="https://www.anatel.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                🏛️ Anatel
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a 
                href="/estados"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                📍 Ver outros estados
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}