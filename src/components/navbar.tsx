'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, Menu, X, Phone, MapPin, Code, BookOpen, Users, Building, HelpCircle } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEstadosOpen, setIsEstadosOpen] = useState(false)
  const [isFerramentasOpen, setIsFerramentasOpen] = useState(false)
  const [isRecursosOpen, setIsRecursosOpen] = useState(false)

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <Phone className="w-6 h-6 text-blue-600" />
              <span>MEU DDD</span>
            </Link>
          </div>
          
          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* Estados Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsEstadosOpen(true)}
                  onMouseLeave={() => setIsEstadosOpen(false)}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Estados
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isEstadosOpen && (
                  <div 
                    onMouseEnter={() => setIsEstadosOpen(true)}
                    onMouseLeave={() => setIsEstadosOpen(false)}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Região Sudeste
                    </div>
                    <Link href="/estado/sao-paulo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      São Paulo (SP)
                    </Link>
                    <Link href="/estado/rio-de-janeiro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Rio de Janeiro (RJ)
                    </Link>
                    <Link href="/estado/minas-gerais" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Minas Gerais (MG)
                    </Link>
                    <Link href="/estado/espirito-santo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Espírito Santo (ES)
                    </Link>
                    
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                      Região Nordeste
                    </div>
                    <Link href="/estado/bahia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Bahia (BA)
                    </Link>
                    <Link href="/estado/pernambuco" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Pernambuco (PE)
                    </Link>
                    <Link href="/estado/ceara" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Ceará (CE)
                    </Link>
                    <Link href="/estado/maranhao" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Maranhão (MA)
                    </Link>
                    
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                      Ver Todos
                    </div>
                    <Link href="/estados" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium">
                      Todos os Estados →
                    </Link>
                  </div>
                )}
              </div>

              {/* Ferramentas Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsFerramentasOpen(true)}
                  onMouseLeave={() => setIsFerramentasOpen(false)}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Code className="w-4 h-4" />
                  Ferramentas
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isFerramentasOpen && (
                  <div 
                    onMouseEnter={() => setIsFerramentasOpen(true)}
                    onMouseLeave={() => setIsFerramentasOpen(false)}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <Link href="/validar-ddd" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Validar DDD</div>
                        <div className="text-xs text-gray-500">Verifique códigos DDD</div>
                      </div>
                    </Link>
                    <Link href="/busca-voz" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Busca por Voz</div>
                        <div className="text-xs text-gray-500">Pesquisa com áudio</div>
                      </div>
                    </Link>
                    <Link href="/gerador-numeros" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Gerador de Números</div>
                        <div className="text-xs text-gray-500">Crie números de teste</div>
                      </div>
                    </Link>
                    <Link href="/codigo-area" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">Código por Área</div>
                        <div className="text-xs text-gray-500">Busca geográfica</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Recursos Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsRecursosOpen(true)}
                  onMouseLeave={() => setIsRecursosOpen(false)}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Recursos
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isRecursosOpen && (
                  <div 
                    onMouseEnter={() => setIsRecursosOpen(true)}
                    onMouseLeave={() => setIsRecursosOpen(false)}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <Link href="/blog" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Blog DDD</div>
                        <div className="text-xs text-gray-500">Artigos e notícias</div>
                      </div>
                    </Link>
                    <Link href="/historia-ddd" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Code className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium">História do DDD</div>
                        <div className="text-xs text-gray-500">Linha do tempo</div>
                      </div>
                    </Link>
                    <Link href="/api" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Code className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-medium">API DDD</div>
                        <div className="text-xs text-gray-500">Para desenvolvedores</div>
                      </div>
                    </Link>
                    <Link href="/faq" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HelpCircle className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="font-medium">FAQ</div>
                        <div className="text-xs text-gray-500">Dúvidas frequentes</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/sobre" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Building className="w-4 h-4" />
                Sobre
              </Link>
              
              <Link href="/contato" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Users className="w-4 h-4" />
                Contato
              </Link>
            </div>
          </div>
          
          {/* Botão CTA */}
          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Buscar DDD
            </Button>
          </div>
          
          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/estados" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              📍 Estados
            </Link>
            <Link href="/validar-ddd" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              🔧 Validar DDD
            </Link>
            <Link href="/busca-voz" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              🎤 Busca por Voz
            </Link>
            <Link href="/gerador-numeros" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              🔢 Gerador de Números
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              📖 Blog
            </Link>
            <Link href="/historia-ddd" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              📚 História do DDD
            </Link>
            <Link href="/api" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              💻 API
            </Link>
            <Link href="/faq" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              ❓ FAQ
            </Link>
            <Link href="/sobre" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              🏢 Sobre
            </Link>
            <Link href="/contato" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              📞 Contato
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Buscar DDD
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}