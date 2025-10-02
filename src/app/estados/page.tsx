'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, MapPin, Users, Ruler } from 'lucide-react'

interface Estado {
  id: string
  nome: string
  sigla: string
  capital: string
  regiao: string
  populacao: number
  area: number
  slug: string
}

export default function EstadosPage() {
  const [estados, setEstados] = useState<Estado[]>([])
  const [filteredEstados, setFilteredEstados] = useState<Estado[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dados completos dos estados brasileiros com slugs corretos
    const dadosEstados: Estado[] = [
      { id: '1', nome: 'Acre', sigla: 'AC', capital: 'Rio Branco', regiao: 'Norte', populacao: 830000, area: 164123, slug: 'acre' },
      { id: '2', nome: 'Alagoas', sigla: 'AL', capital: 'Maceió', regiao: 'Nordeste', populacao: 3337000, area: 27848, slug: 'alagoas' },
      { id: '3', nome: 'Amapá', sigla: 'AP', capital: 'Macapá', regiao: 'Norte', populacao: 733500, area: 142815, slug: 'amapa' },
      { id: '4', nome: 'Amazonas', sigla: 'AM', capital: 'Manaus', regiao: 'Norte', populacao: 3941000, area: 1559167, slug: 'amazonas' },
      { id: '5', nome: 'Bahia', sigla: 'BA', capital: 'Salvador', regiao: 'Nordeste', populacao: 14873064, area: 564733, slug: 'bahia' },
      { id: '6', nome: 'Ceará', sigla: 'CE', capital: 'Fortaleza', regiao: 'Nordeste', populacao: 9132078, area: 148921, slug: 'ceara' },
      { id: '7', nome: 'Distrito Federal', sigla: 'DF', capital: 'Brasília', regiao: 'Centro-Oeste', populacao: 2817068, area: 5779, slug: 'distrito-federal' },
      { id: '8', nome: 'Espírito Santo', sigla: 'ES', capital: 'Vitória', regiao: 'Sudeste', populacao: 3833713, area: 46095, slug: 'espirito-santo' },
      { id: '9', nome: 'Goiás', sigla: 'GO', capital: 'Goiânia', regiao: 'Centro-Oeste', populacao: 7018354, area: 340112, slug: 'goias' },
      { id: '10', nome: 'Maranhão', sigla: 'MA', capital: 'São Luís', regiao: 'Nordeste', populacao: 7035000, area: 331937, slug: 'maranhao' },
      { id: '11', nome: 'Mato Grosso', sigla: 'MT', capital: 'Cuiabá', regiao: 'Centro-Oeste', populacao: 3484468, area: 903366, slug: 'mato-grosso' },
      { id: '12', nome: 'Mato Grosso do Sul', sigla: 'MS', capital: 'Campo Grande', regiao: 'Centro-Oeste', populacao: 2757013, area: 357146, slug: 'mato-grosso-do-sul' },
      { id: '13', nome: 'Minas Gerais', sigla: 'MG', capital: 'Belo Horizonte', regiao: 'Sudeste', populacao: 21168791, area: 586528, slug: 'minas-gerais' },
      { id: '14', nome: 'Pará', sigla: 'PA', capital: 'Belém', regiao: 'Norte', populacao: 8602865, area: 1247954, slug: 'para' },
      { id: '15', nome: 'Paraíba', sigla: 'PB', capital: 'João Pessoa', regiao: 'Nordeste', populacao: 4018127, area: 56585, slug: 'paraiba' },
      { id: '16', nome: 'Paraná', sigla: 'PR', capital: 'Curitiba', regiao: 'Sul', populacao: 11433957, area: 221307, slug: 'parana' },
      { id: '17', nome: 'Pernambuco', sigla: 'PE', capital: 'Recife', regiao: 'Nordeste', populacao: 9557071, area: 98148, slug: 'pernambuco' },
      { id: '18', nome: 'Piauí', sigla: 'PI', capital: 'Teresina', regiao: 'Nordeste', populacao: 3273227, area: 251577, slug: 'piaui' },
      { id: '19', nome: 'Rio de Janeiro', sigla: 'RJ', capital: 'Rio de Janeiro', regiao: 'Sudeste', populacao: 17366054, area: 43780, slug: 'rio-de-janeiro' },
      { id: '20', nome: 'Rio Grande do Norte', sigla: 'RN', capital: 'Natal', regiao: 'Nordeste', populacao: 3506853, area: 52811, slug: 'rio-grande-do-norte' },
      { id: '21', nome: 'Rio Grande do Sul', sigla: 'RS', capital: 'Porto Alegre', regiao: 'Sul', populacao: 11388695, area: 281748, slug: 'rio-grande-do-sul' },
      { id: '22', nome: 'Rondônia', sigla: 'RO', capital: 'Porto Velho', regiao: 'Norte', populacao: 1777225, area: 237590, slug: 'rondonia' },
      { id: '23', nome: 'Roraima', sigla: 'RR', capital: 'Boa Vista', regiao: 'Norte', populacao: 605761, area: 224300, slug: 'roraima' },
      { id: '24', nome: 'Santa Catarina', sigla: 'SC', capital: 'Florianópolis', regiao: 'Sul', populacao: 7164788, area: 95736, slug: 'santa-catarina' },
      { id: '25', nome: 'São Paulo', sigla: 'SP', capital: 'São Paulo', regiao: 'Sudeste', populacao: 45919049, area: 248222, slug: 'sao-paulo' },
      { id: '26', nome: 'Sergipe', sigla: 'SE', capital: 'Aracaju', regiao: 'Nordeste', populacao: 2298696, area: 21915, slug: 'sergipe' },
      { id: '27', nome: 'Tocantins', sigla: 'TO', capital: 'Palmas', regiao: 'Norte', populacao: 1572866, area: 277621, slug: 'tocantins' }
    ]

    // Mapeamento de siglas para slugs corretos
    const siglaParaSlug: { [key: string]: string } = {
      'AC': 'acre',
      'AL': 'alagoas',
      'AP': 'amapa',
      'AM': 'amazonas',
      'BA': 'bahia',
      'CE': 'ceara',
      'DF': 'distrito-federal',
      'ES': 'espirito-santo',
      'GO': 'goias',
      'MA': 'maranhao',
      'MT': 'mato-grosso',
      'MS': 'mato-grosso-do-sul',
      'MG': 'minas-gerais',
      'PA': 'para',
      'PB': 'paraiba',
      'PR': 'parana',
      'PE': 'pernambuco',
      'PI': 'piaui',
      'RJ': 'rio-de-janeiro',
      'RN': 'rio-grande-do-norte',
      'RS': 'rio-grande-do-sul',
      'RO': 'rondonia',
      'RR': 'roraima',
      'SC': 'santa-catarina',
      'SP': 'sao-paulo',
      'SE': 'sergipe',
      'TO': 'tocantins'
    }

    // Adicionar slugs aos estados
    const estadosComSlugs = dadosEstados.map(estado => ({
      ...estado,
      slug: siglaParaSlug[estado.sigla] || estado.sigla.toLowerCase()
    }))

    setEstados(estadosComSlugs)
    setFilteredEstados(estadosComSlugs)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredEstados(estados)
    } else {
      const filtered = estados.filter(estado =>
        estado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estado.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estado.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estado.regiao.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEstados(filtered)
    }
  }, [searchTerm, estados])

  const getRegiaoColor = (regiao: string) => {
    const colors = {
      'Norte': 'bg-blue-100 text-blue-800',
      'Nordeste': 'bg-green-100 text-green-800',
      'Centro-Oeste': 'bg-yellow-100 text-yellow-800',
      'Sudeste': 'bg-red-100 text-red-800',
      'Sul': 'bg-purple-100 text-purple-800'
    }
    return colors[regiao as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Início
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Estados do Brasil
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Informações detalhadas sobre os 26 estados e o Distrito Federal do Brasil
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar por nome, sigla, capital ou região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">27</div>
              <div className="text-sm text-gray-600">Unidades Federativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-sm text-gray-600">Regiões</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">214M</div>
              <div className="text-sm text-gray-600">População Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">8.5M</div>
              <div className="text-sm text-gray-600">km² de Área</div>
            </div>
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEstados.map((estado) => (
              <Card key={estado.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{estado.nome}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-gray-700">
                        {estado.sigla}
                      </CardDescription>
                    </div>
                    <Badge className={getRegiaoColor(estado.regiao)}>
                      {estado.regiao}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span className="font-medium">Capital:</span> {estado.capital}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      <span className="font-medium">População:</span> {estado.populacao.toLocaleString('pt-BR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="mr-2 h-4 w-4" />
                      <span className="font-medium">Área:</span> {estado.area.toLocaleString('pt-BR')} km²
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={`/estado/${estado.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                      >
                        Ver cidades e DDDs
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEstados.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum estado encontrado
              </h3>
              <p className="text-gray-500">
                Não encontramos resultados para "{searchTerm}". Tente buscar por outro termo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}