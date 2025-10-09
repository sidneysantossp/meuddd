import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Award, BookOpen, Globe, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { PersonStructuredData } from '@/components/seo/PersonStructuredData';

export default function AuthorPage() {
  const authorData = {
    name: "Sidney Santos",
    title: "Especialista em Telecomunicações e Desenvolvedor Web",
    bio: "Com mais de 15 anos de experiência no setor de telecomunicações, Sidney Santos é um reconhecido especialista em sistemas de telefonia e códigos DDD brasileiros. Sua trajetória profissional inclui trabalho em grandes operadoras de telecomunicações e desenvolvimento de soluções tecnológicas para comunicação.",
    expertise: [
      "Telecomunicações",
      "Códigos DDD",
      "Sistemas Telefônicos",
      "Desenvolvimento Web",
      "SEO Técnico",
      "Análise de Redes"
    ],
    education: [
      {
        degree: "Engenharia de Telecomunicações",
        institution: "Universidade de São Paulo (USP)",
        year: "2008"
      },
      {
        degree: "MBA em Gestão de TI",
        institution: "FGV",
        year: "2012"
      }
    ],
    experience: [
      {
        position: "Especialista em Redes de Telecomunicações",
        company: "Vivo",
        period: "2015-2020"
      },
      {
        position: "Analista de Sistemas Telefônicos",
        company: "Claro",
        period: "2012-2015"
      },
      {
        position: "Desenvolvedor Web Full Stack",
        company: "Freelancer",
        period: "2020-Presente"
      }
    ],
    certifications: [
      "Certificação Cisco CCNA",
      "Certificação AWS Cloud Practitioner",
      "Google Analytics Individual Qualification",
      "Scrum Master Certified"
    ],
    publications: [
      {
        title: "Guia Completo de Códigos DDD do Brasil",
        year: "2023",
        type: "E-book"
      },
      {
        title: "O Futuro das Telecomunicações no Brasil",
        year: "2022",
        type: "Artigo Técnico"
      },
      {
        title: "SEO para Sites de Telecomunicações",
        year: "2021",
        type: "Whitepaper"
      }
    ],
    contact: {
      email: "contato@sidneysantos.com.br",
      phone: "+55 11 99999-9999",
      location: "São Paulo, SP",
      website: "https://sidneysantos.com.br",
      linkedin: "https://linkedin.com/in/sidneysantos"
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": authorData.name,
    "jobTitle": authorData.title,
    "description": authorData.bio,
    "url": "https://meuddd.com/sobre-o-autor",
    "sameAs": [
      authorData.contact.website,
      authorData.contact.linkedin
    ],
    "knowsAbout": authorData.expertise,
    "alumniOf": authorData.education.map(ed => ({
      "@type": "EducationalOrganization",
      "name": ed.institution
    })),
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Especialista em Telecomunicações",
      "description": "Especialista em sistemas de telecomunicações e códigos DDD"
    }
  };

  return (
    <>
      <PersonStructuredData person={structuredData} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sobre o Autor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center text-white text-4xl font-bold">
                SS
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{authorData.name}</h1>
              <p className="text-xl text-blue-100 mb-4">{authorData.title}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {authorData.expertise.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-white text-blue-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sobre Mim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {authorData.bio}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ao longo da minha carreira, desenvolvi profundo conhecimento sobre o sistema de telecomunicações brasileiro, 
                  com especial foco nos códigos DDD que são essenciais para a comunicação em todo o país. Minha experiência 
                  prática em operadoras me proporcionou uma visão única sobre os desafios e soluções do setor.
                </p>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {authorData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.period}</p>
                  </div>
                ))}
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
              <CardContent className="space-y-4">
                {authorData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-green-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Publications Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Publicações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {authorData.publications.map((pub, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{pub.title}</h4>
                        <p className="text-sm text-gray-600">{pub.type}</p>
                      </div>
                      <Badge variant="outline">{pub.year}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <a href={`mailto:${authorData.contact.email}`} className="text-blue-600 hover:underline">
                    {authorData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{authorData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{authorData.contact.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <a href={authorData.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Especialização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {authorData.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications Card */}
            <Card>
              <CardHeader>
                <CardTitle>Certificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {authorData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Informações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">15+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Especialista DDD</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Autor de 3 publicações</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}