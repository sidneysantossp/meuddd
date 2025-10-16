import ZAI from 'z-ai-web-dev-sdk'

export interface WikipediaInfo {
  title: string
  extract: string
  url: string
  thumbnail?: string
  coordinates?: {
    lat: number
    lng: number
  }
  infobox?: Record<string, any>
}

export interface GovernmentData {
  ibgeCode?: string
  population?: number
  area?: number
  density?: number
  gdp?: number
  hdi?: number
  mayor?: string
  foundationDate?: string
  region?: string
  state?: string
}

export class WikipediaService {
  private static instance: WikipediaService
  private zai: ZAI | null = null

  static getInstance(): WikipediaService {
    if (!WikipediaService.instance) {
      WikipediaService.instance = new WikipediaService()
    }
    return WikipediaService.instance
  }

  private async getZAI(): Promise<ZAI> {
    if (!this.zai) {
      this.zai = await ZAI.create()
    }
    return this.zai
  }

  async searchCityInfo(cityName: string, stateName: string): Promise<WikipediaInfo | null> {
    try {
      const zai = await this.getZAI()
      
      // Search for Wikipedia page
      const searchQuery = `${cityName} ${stateName} Brasil site:wikipedia.org`
      const searchResult = await zai.functions.invoke("web_search", {
        query: searchQuery,
        num: 5
      })

      if (!searchResult || searchResult.length === 0) {
        return null
      }

      // Get the first relevant Wikipedia result
      const wikiResult = searchResult.find(result => 
        result.url.includes('wikipedia.org') && 
        result.name.toLowerCase().includes(cityName.toLowerCase())
      )

      if (!wikiResult) {
        return null
      }

      // Extract information from the search result
      const info: WikipediaInfo = {
        title: wikiResult.name,
        extract: wikiResult.snippet,
        url: wikiResult.url,
      }

      return info

    } catch (error) {
      console.error('Error fetching Wikipedia info:', error)
      return null
    }
  }

  async searchGovernmentData(cityName: string, stateName: string): Promise<GovernmentData | null> {
    try {
      const zai = await this.getZAI()
      
      // Search for IBGE and government data
      const searchQueries = [
        `${cityName} ${stateName} IBGE dados população área`,
        `${cityName} ${stateName} site:ibge.gov.br`,
        `${cityName} ${stateName} site:gov.br dados demográficos`
      ]

      let governmentData: GovernmentData = {}

      for (const query of searchQueries) {
        try {
          const searchResult = await zai.functions.invoke("web_search", {
            query: query,
            num: 3
          })

          if (searchResult && searchResult.length > 0) {
            // Extract data from search results
            for (const result of searchResult) {
              const text = result.snippet.toLowerCase()
              
              // Extract population
              const popMatch = text.match(/população[:\s]*([\d.]+)/)
              if (popMatch) {
                governmentData.population = parseInt(popMatch[1].replace(/\./g, ''))
              }

              // Extract area
              const areaMatch = text.match(/área[:\s]*([\d.]+)/)
              if (areaMatch) {
                governmentData.area = parseFloat(areaMatch[1].replace(/\./g, ''))
              }

              // Extract HDI
              const hdiMatch = text.match(/idh[:\s]*([\d.]+)/)
              if (hdiMatch) {
                governmentData.hdi = parseFloat(hdiMatch[1])
              }

              // Extract IBGE code
              const ibgeMatch = text.match(/ibge[:\s]*(\d+)/)
              if (ibgeMatch) {
                governmentData.ibgeCode = ibgeMatch[1]
              }
            }
          }
        } catch (error) {
          console.error('Error with search query:', query, error)
        }
      }

      return Object.keys(governmentData).length > 0 ? governmentData : null

    } catch (error) {
      console.error('Error fetching government data:', error)
      return null
    }
  }

  async getCityDescription(cityName: string, stateName: string): Promise<string> {
    try {
      const zai = await this.getZAI()
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em criar descrições detalhadas sobre cidades brasileiras. Crie descrições informativas e bem estruturadas em português.'
          },
          {
            role: 'user',
            content: `Crie uma descrição detalhada sobre a cidade de ${cityName}, localizada no estado de ${stateName}, Brasil. Inclua informações sobre:
            1. Localização geográfica
            2. História e fundação
            3. Economia local
            4. Cultura e turismo
            5. Demografia
            6. Infraestrutura
            7. Curiosidades
            
            A descrição deve ter aproximadamente 300-400 palavras e ser escrita em um tom informativo e envolvente.`
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      })

      return completion.choices[0]?.message?.content || ''

    } catch (error) {
      console.error('Error generating city description:', error)
      return ''
    }
  }

  async getTouristAttractions(cityName: string, stateName: string): Promise<string[]> {
    try {
      const zai = await this.getZAI()
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em turismo do Brasil. Liste pontos turísticos importantes das cidades brasileiras.'
          },
          {
            role: 'user',
            content: `Liste os principais pontos turísticos e atrações de ${cityName}, ${stateName}. Inclua:
            1. Locais históricos
            2. Áreas naturais
            3. Centros culturais
            4. Praças e parques
            5. Igrejas e templos
            6. Museus
            7. Outros atrativos relevantes
            
            Retorne uma lista com 8-10 itens, cada um com uma breve descrição.`
          }
        ],
        max_tokens: 600,
        temperature: 0.6
      })

      const content = completion.choices[0]?.message?.content || ''
      
      // Parse the response into an array
      const lines = content.split('\n').filter(line => line.trim())
      return lines.slice(0, 10) // Limit to 10 items

    } catch (error) {
      console.error('Error getting tourist attractions:', error)
      return []
    }
  }

  async getEconomicInfo(cityName: string, stateName: string): Promise<string> {
    try {
      const zai = await this.getZAI()
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um economista especializado em municípios brasileiros. Forneça informações econômicas detalhadas.'
          },
          {
            role: 'user',
            content: `Descreva a economia de ${cityName}, ${stateName}. Inclua informações sobre:
            1. Principais atividades econômicas
            2. Setores industriais
            3. Agricultura e pecuária
            4. Comércio e serviços
            5. Emprego e renda
            6. Investimentos recentes
            7. Potencial de desenvolvimento
            
            Crie um texto de 200-300 palhas com dados econômicos relevantes.`
          }
        ],
        max_tokens: 600,
        temperature: 0.5
      })

      return completion.choices[0]?.message?.content || ''

    } catch (error) {
      console.error('Error getting economic info:', error)
      return ''
    }
  }
}