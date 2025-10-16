import { NextRequest, NextResponse } from 'next/server'
import { WikipediaService } from '@/lib/wikipedia-service'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cityName = searchParams.get('city')
    const stateName = searchParams.get('state')

    if (!cityName || !stateName) {
      return NextResponse.json(
        { error: 'City and state parameters are required' },
        { status: 400 }
      )
    }

    // Create cache key
    const cacheKey = `${cityName.toLowerCase()}-${stateName.toLowerCase()}`
    
    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        ...cached.data,
        cached: true
      })
    }

    const wikiService = WikipediaService.getInstance()

    // Fetch data with timeout and error handling
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
    })

    try {
      // Fetch data with parallel requests but with individual error handling
      const results = await Promise.allSettled([
        wikiService.searchCityInfo(cityName, stateName),
        wikiService.searchGovernmentData(cityName, stateName),
        wikiService.getCityDescription(cityName, stateName),
        wikiService.getTouristAttractions(cityName, stateName),
        wikiService.getEconomicInfo(cityName, stateName)
      ])

      const [wikipediaInfo, governmentData, description, attractions, economicInfo] = results.map(
        result => result.status === 'fulfilled' ? result.value : null
      )

      const response = {
        wikipedia: wikipediaInfo,
        government: governmentData,
        description,
        attractions,
        economic: economicInfo,
        fetchedAt: new Date().toISOString(),
        cached: false
      }

      // Cache the result
      cache.set(cacheKey, { data: response, timestamp: Date.now() })

      return NextResponse.json(response)

    } catch (error) {
      console.error('Error in city-info API fetch:', error)
      
      // Return cached data if available, even if expired
      if (cached) {
        return NextResponse.json({
          ...cached.data,
          cached: true,
          stale: true
        })
      }

      throw error
    }

  } catch (error) {
    console.error('Error in city-info API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch city information',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}