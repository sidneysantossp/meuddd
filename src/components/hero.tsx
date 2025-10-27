'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Phone } from 'lucide-react'

export function Hero() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ícone principal */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-blue-100 rounded-full p-4">
              <Phone className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Headline principal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Encontre os <span className="text-blue-600">DDDs do Brasil</span> que
          <span className="block">Você Precisa</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Consulte todos os <strong>DDDs do Brasil</strong> em um só lugar. Busque por estado, cidade ou código DDD. 
          Temos informações completas dos 27 estados brasileiros com códigos telefônicos atualizados em tempo real.
        </p>

        {/* Área de busca */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Digite o nome da cidade, estado ou DDD do Brasil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-6 py-2">
              Buscar
            </Button>
          </div>
        </div>

        {/* Opções rápidas */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
            <MapPin className="w-4 h-4" />
            São Paulo
          </Button>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
            <MapPin className="w-4 h-4" />
            Rio de Janeiro
          </Button>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
            <MapPin className="w-4 h-4" />
            Minas Gerais
          </Button>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
            <Phone className="w-4 h-4" />
            DDD 11
          </Button>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
            <Phone className="w-4 h-4" />
            DDD 21
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">27</div>
            <div className="text-gray-600">Estados Brasileiros</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">67</div>
            <div className="text-gray-600">Códigos DDD</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5.570+</div>
            <div className="text-gray-600">Municípios</div>
          </div>
        </div>
      </div>

      {/* Elemento decorativo de fundo */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-xl"></div>
    </section>
  )
}