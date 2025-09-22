'use client';

import Link from 'next/link';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink, Globe, Building, Users, Star, Shield, Info } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sobre: [
      { name: 'Sobre Nós', href: '/sobre', icon: Info },
      { name: 'Como Funciona', href: '/como-funciona', icon: Globe },
      { name: 'Contato', href: '/contato', icon: Mail },
      { name: 'Privacidade', href: '/privacidade', icon: Shield },
      { name: 'Termos de Uso', href: '/termos', icon: Building },
    ],
    ferramentas: [
      { name: 'Validar DDD', href: '/validar-ddd', icon: Phone },
      { name: 'Busca por Voz', href: '/busca-por-voz', icon: Users },
      { name: 'Gerador de Números', href: '/gerador-numeros', icon: Star },
      { name: 'Código por Área', href: '/codigo-por-area', icon: MapPin },
    ],
    estados: [
      { name: 'São Paulo', href: '/estado/sao-paulo' },
      { name: 'Rio de Janeiro', href: '/estado/rio-de-janeiro' },
      { name: 'Minas Gerais', href: '/estado/minas-gerais' },
      { name: 'Bahia', href: '/estado/bahia' },
      { name: 'Paraná', href: '/estado/parana' },
      { name: 'Rio Grande do Sul', href: '/estado/rio-grande-do-sul' },
      { name: 'Pernambuco', href: '/estado/pernambuco' },
      { name: 'Ceará', href: '/estado/ceara' },
      { name: 'Pará', href: '/estado/para' },
      { name: 'Santa Catarina', href: '/estado/santa-catarina' },
      { name: 'Goiás', href: '/estado/goias' },
      { name: 'Maranhão', href: '/estado/maranhao' },
    ],
    recursos: [
      { name: 'Blog DDD', href: '/blog', icon: Globe },
      { name: 'Tutoriais', href: '/tutoriais', icon: Star },
      { name: 'API DDD', href: '/api', icon: Building },
      { name: 'Parceiros', href: '/parceiros', icon: Users },
      { name: 'FAQ Completo', href: '/faq', icon: Info },
    ],
    dddInfo: [
      { name: 'O que é DDD?', href: '/o-que-e-ddd' },
      { name: 'Lista de DDDs', href: '/lista-ddd' },
      { name: 'DDD por Região', href: '/ddd-por-regiao' },
      { name: 'História do DDD', href: '/historia-ddd' },
      { name: 'DDD Internacional', href: '/ddd-internacional' },
    ],
    contato: [
      { name: 'Suporte', href: '/suporte', icon: Shield },
      { name: 'Sugestões', href: '/sugestoes', icon: Star },
      { name: 'Reportar Erro', href: '/reportar-erro', icon: Info },
      { name: 'Anuncie', href: '/anuncie', icon: Building },
      { name: 'Trabalhe Conosco', href: '/trabalhe-conosco', icon: Users },
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/meuddd', icon: Facebook, color: 'text-blue-600 hover:text-blue-800' },
    { name: 'Twitter', href: 'https://twitter.com/meuddd', icon: Twitter, color: 'text-blue-400 hover:text-blue-600' },
    { name: 'Instagram', href: 'https://instagram.com/meuddd', icon: Instagram, color: 'text-pink-600 hover:text-pink-800' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/meuddd', icon: Linkedin, color: 'text-blue-700 hover:text-blue-900' },
    { name: 'YouTube', href: 'https://youtube.com/meuddd', icon: Youtube, color: 'text-red-600 hover:text-red-800' },
  ];

  const trustedBy = [
    { name: 'Vivo', href: 'https://www.vivo.com.br' },
    { name: 'Claro', href: 'https://www.claro.com.br' },
    { name: 'TIM', href: 'https://www.tim.com.br' },
    { name: 'Oi', href: 'https://www.oi.com.br' },
    { name: 'Anatel', href: 'https://www.anatel.gov.br' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Phone className="h-10 w-10 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">MEU DDD</h3>
                <p className="text-gray-400 text-sm">Seu guia completo de códigos DDD</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Encontre rapidamente códigos DDD de cidades brasileiras, 
              valide números, faça buscas por voz e acesse ferramentas 
              completas para suas necessidades telefônicas.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Cobertura nacional - Todas as cidades</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Informações atualizadas em tempo real</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Dados 100% verificados e confiáveis</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Siga-nos</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sobre Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Sobre</h3>
            <ul className="space-y-2">
              {footerLinks.sobre.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2"
                  >
                    <link.icon className="h-3 w-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ferramentas Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Ferramentas</h3>
            <ul className="space-y-2">
              {footerLinks.ferramentas.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2"
                  >
                    <link.icon className="h-3 w-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Estados Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Estados</h3>
            <ul className="space-y-2">
              {footerLinks.estados.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2"
                  >
                    <link.icon className="h-3 w-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
          {/* DDD Info */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-blue-400">Informações DDD</h4>
            <ul className="space-y-2">
              {footerLinks.dddInfo.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-blue-400">Contato</h4>
            <ul className="space-y-2">
              {footerLinks.contato.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-2"
                  >
                    <link.icon className="h-3 w-3" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-blue-400">Atendimento</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>contato@meuddd.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>0800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>Seg-Sex: 9h-18h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-center text-sm font-semibold text-gray-400 mb-6">
            Reconhecido pelas principais operadoras
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {trustedBy.map((company) => (
              <a
                key={company.name}
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {company.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} MEU DDD. Todos os direitos reservados.
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400">
              <Link href="/privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/acessibilidade" className="hover:text-white transition-colors">
                Acessibilidade
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Desenvolvido com</span>
              <span className="text-red-500">❤️</span>
              <span>no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}