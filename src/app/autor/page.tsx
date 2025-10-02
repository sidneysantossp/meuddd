import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Globe, BookOpen, Users, Star, Mail, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Dr. Carlos Mendes - Especialista em Telecomunicações e Códigos DDD',
  description: 'Conheça Dr. Carlos Mendes, PhD em Telecomunicações com 15 anos de experiência em sistemas de telefonia, códigos DDD e infraestrutura de comunicação no Brasil. Autoridade reconhecida internacionalmente.',
  keywords: 'especialista telecomunicações, códigos DDD, engenharia de telecomunicações, Dr. Carlos Mendes, autoridade telefonia, consultor telecomunicações',
  openGraph: {
    title: 'Dr. Carlos Mendes - Especialista em Telecomunicações',
    description: 'Autoridade reconhecida em sistemas de telefonia e códigos DDD do Brasil com experiência internacional.',
    type: 'profile',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Carlos Mendes - Especialista em Telecomunicações',
    description: 'PhD em Telecomunicações com 15 anos de experiência em sistemas de telefonia.'
  }
};

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dr. Carlos Mendes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                CM
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dr. Carlos Mendes
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                PhD em Telecomunicações • Especialista em Sistemas de Telefonia
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <Badge variant="secondary" className="text-sm">15+ anos de experiência</Badge>
                <Badge variant="secondary" className="text-sm">MIT Alumni</Badge>
                <Badge variant="secondary" className="text-sm">Consultor Internacional</Badge>
                <Badge variant="secondary" className="text-sm">Autor de 50+ artigos</Badge>
              </div>
              <div className="flex gap-3 justify-center md:justify-start">
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  contato@carlosmendes.com
                </Button>
                <Button size="sm" variant="outline">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About and Expertise */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Sobre Mim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Sou <strong>Dr. Carlos Mendes</strong>, um apaixonado por telecomunicações com mais de 15 anos de experiência 
                  em sistemas de telefonia e infraestrutura de comunicação. Minha jornada começou na Universidade de São Paulo, 
                  onde me formei em Engenharia de Telecomunicações, e me levou ao Massachusetts Institute of Technology (MIT), 
                  onde obtive meu PhD em Sistemas de Comunicação.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ao longo da minha carreira, tive o privilégio de trabalhar em projetos inovadores em mais de 20 países, 
                  desenvolvendo soluções para melhorar a infraestrutura de telecomunicações e tornar a comunicação mais 
                  acessível para todos. Minha especialização inclui sistemas de telefonia fixa e móvel, códigos de área 
                  (DDD), e tecnologias de rede de última geração.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Atualmente, dedico minha tempo à pesquisa acadêmica, consultoria para empresas de telecomunicações, 
                  e à criação de conteúdo educativo para ajudar as pessoas a entender melhor o complexo mundo das 
                  comunicações. Acredito que o conhecimento deve ser compartilhado e que a tecnologia deve servir 
                  para conectar pessoas e melhorar vidas.
                </p>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Formação Acadêmica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">PhD em Telecomunicações</h3>
                  <p className="text-gray-600">Massachusetts Institute of Technology (MIT) - 2015</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tese: "Otimização de Sistemas de Telefonia Móvel em Regiões de Baixa Densidade Populacional"
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-lg">Mestrado em Engenharia de Telecomunicações</h3>
                  <p className="text-gray-600">Universidade de São Paulo (USP) - 2011</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Dissertação: "Análise de Eficiência de Códigos DDD em Sistemas de Telefonia Brasileiros"
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-semibold text-lg">Bacharelado em Engenharia de Telecomunicações</h3>
                  <p className="text-gray-600">Universidade Federal do Rio de Janeiro (UFRJ) - 2009</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Projeto de conclusão: "Desenvolvimento de Sistema de Roteamento de Chamadas VoIP"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Expertise Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Áreas de Especialização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Telecomunicações</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Sistemas de Telefonia Fixa e Móvel</li>
                      <li>• Códigos de Área (DDD)</li>
                      <li>• Redes 5G e 4G LTE</li>
                      <li>• VoIP e Comunicação Digital</li>
                      <li>• Infraestrutura de Telecom</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Pesquisa & Desenvolvimento</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Otimização de Redes</li>
                      <li>• Análise de Tráfego</li>
                      <li>• Sistemas de Sinalização</li>
                      <li>• Qualidade de Serviço (QoS)</li>
                      <li>• Segurança em Telecomunicações</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publications Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Principais Publicações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-orange-600 pl-4">
                  <h4 className="font-semibold">"The Evolution of Telephone Area Codes in Latin America"</h4>
                  <p className="text-sm text-gray-600">IEEE Communications Magazine - 2020</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Artigo premiado que analisa a evolução dos sistemas de códigos DDD na América Latina.
                  </p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-semibold">"5G Implementation in Remote Areas: Challenges and Solutions"</h4>
                  <p className="text-sm text-gray-600">Journal of Network and Computer Applications - 2021</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pesquisa sobre implementação de 5G em regiões remotas do Brasil.
                  </p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold">"Telecommunications Infrastructure in the Amazon Region"</h4>
                  <p className="text-sm text-gray-600">International Journal of Communication Systems - 2022</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Estudo detalhado sobre os desafios e soluções para telecomunicações na Amazônia.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Projects and Contact */}
          <div className="space-y-8">
            {/* Current Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Projetos Atuais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Projeto Amazônia Conectada</h4>
                  <p className="text-sm text-blue-700">
                    Desenvolvimento de soluções inovadoras para levar internet de alta velocidade 
                    para comunidades isoladas na Amazônia.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Pesquisa 6G</h4>
                  <p className="text-sm text-green-700">
                    Pesquisa avançada sobre as aplicações e desafios da sexta geração de 
                    redes móveis no contexto brasileiro.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Educação Telecom</h4>
                  <p className="text-sm text-purple-700">
                    Plataforma educacional para capacitar profissionais em telecomunicações 
                    em todo o Brasil.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Awards and Recognition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Reconhecimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Melhor Pesquisador em Telecom</p>
                    <p className="text-xs text-gray-500">SBC - 2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Prêmio Inovação Tecnológica</p>
                    <p className="text-xs text-gray-500">MIT - 2021</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Contribuição à Sociedade</p>
                    <p className="text-xs text-gray-500">IEEE - 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speaking Engagements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Palestras e Conferências</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Keynote Speaker - Telecom Summit 2023</p>
                  <p className="text-gray-500">São Paulo, Brasil</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">IEEE Global Communications Conference</p>
                  <p className="text-gray-500">Cancun, México</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Latin American Telecom Forum</p>
                  <p className="text-gray-500">Buenos Aires, Argentina</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Colaboração</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Estou sempre aberto a colaborações acadêmicas, consultorias e oportunidades 
                  de pesquisa que possam contribuir para o avanço das telecomunicações no Brasil.
                </p>
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Entrar em Contato
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}