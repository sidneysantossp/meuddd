'use client'

import Link from 'next/link'
import { Phone, MapPin, Users, CheckCircle, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Globe, Shield, BookOpen, Code, HelpCircle, MessageSquare, Zap, Database, FileText, Users2, Building } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção principal */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Coluna 1: MEU DDD */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">MEU DDD</h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Seu guia completo de códigos DDD
              </p>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Encontre rapidamente códigos DDD de cidades brasileiras, valide números, 
                faça buscas por voz e acesse ferramentas completas para suas necessidades telefônicas.
              </p>
              
              {/* Recursos principais */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Cobertura nacional - Todas as cidades</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Informações atualizadas em tempo real</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Dados 100% verificados e confiáveis</span>
                </div>
              </div>
              
              {/* Redes sociais */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-4">Siga-nos</h4>
                <div className="flex space-x-3">
                  <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-blue-400 p-2 rounded-lg transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-red-600 p-2 rounded-lg transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-blue-700 p-2 rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Coluna 2: Sobre */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-400" />
                Sobre
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Users2 className="w-4 h-4" />
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Coluna 3: Ferramentas */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                Ferramentas
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/validar-ddd" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Validar DDD
                  </Link>
                </li>
                <li>
                  <Link href="/busca-voz" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Busca por Voz
                  </Link>
                </li>
                <li>
                  <Link href="/gerador-numeros" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Gerador de Números
                  </Link>
                </li>
                <li>
                  <Link href="/codigo-area" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Código por Área
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Coluna 4: Estados */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Estados
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/estado/sao-paulo" className="text-gray-400 hover:text-white transition-colors">
                    São Paulo
                  </Link>
                </li>
                <li>
                  <Link href="/estado/rio-de-janeiro" className="text-gray-400 hover:text-white transition-colors">
                    Rio de Janeiro
                  </Link>
                </li>
                <li>
                  <Link href="/estado/minas-gerais" className="text-gray-400 hover:text-white transition-colors">
                    Minas Gerais
                  </Link>
                </li>
                <li>
                  <Link href="/estado/bahia" className="text-gray-400 hover:text-white transition-colors">
                    Bahia
                  </Link>
                </li>
                <li>
                  <Link href="/estado/parana" className="text-gray-400 hover:text-white transition-colors">
                    Paraná
                  </Link>
                </li>
                <li>
                  <Link href="/estado/rio-grande-do-sul" className="text-gray-400 hover:text-white transition-colors">
                    Rio Grande do Sul
                  </Link>
                </li>
                <li>
                  <Link href="/estado/pernambuco" className="text-gray-400 hover:text-white transition-colors">
                    Pernambuco
                  </Link>
                </li>
                <li>
                  <Link href="/estado/ceara" className="text-gray-400 hover:text-white transition-colors">
                    Ceará
                  </Link>
                </li>
                <li>
                  <Link href="/estado/para" className="text-gray-400 hover:text-white transition-colors">
                    Pará
                  </Link>
                </li>
                <li>
                  <Link href="/estado/santa-catarina" className="text-gray-400 hover:text-white transition-colors">
                    Santa Catarina
                  </Link>
                </li>
                <li>
                  <Link href="/estado/goias" className="text-gray-400 hover:text-white transition-colors">
                    Goiás
                  </Link>
                </li>
                <li>
                  <Link href="/estado/maranhao" className="text-gray-400 hover:text-white transition-colors">
                    Maranhão
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Segunda linha de colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
            
            {/* Coluna 5: Recursos */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-400" />
                Recursos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Blog DDD
                  </Link>
                </li>
                <li>
                  <Link href="/tutoriais" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Tutoriais
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    API DDD
                  </Link>
                </li>
                <li>
                  <Link href="/parceiros" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Users2 className="w-4 h-4" />
                    Parceiros
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    FAQ Completo
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Coluna 6: Newsletter */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Receba Atualizações
              </h4>
              <p className="text-gray-400 mb-4">
                Cadastre-se para receber novidades sobre códigos DDD e atualizações da plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MEU DDD. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Dados verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Site seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Atualizado em tempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}