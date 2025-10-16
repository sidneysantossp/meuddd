'use client'

import { useState, useEffect } from 'react'

interface CityInfo {
  wikipedia?: {
    title: string
    extract: string
    url: string
    thumbnail?: string
  }
  government?: {
    population?: number
    area?: number
    hdi?: number
    ibgeCode?: string
  }
  description?: string
  attractions?: string[]
  economic?: string
  fetchedAt?: string
}

export function useCityInfo(cityName: string, stateName: string) {
  const [data, setData] = useState<CityInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!cityName || !stateName) return

    const fetchCityInfo = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/city-info?city=${encodeURIComponent(cityName)}&state=${encodeURIComponent(stateName)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch city information')
        }

        const cityInfo = await response.json()
        setData(cityInfo)
      } catch (err) {
        console.error('Error fetching city info:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCityInfo()
  }, [cityName, stateName])

  return { data, loading, error }
}