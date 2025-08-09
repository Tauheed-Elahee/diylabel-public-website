'use client'

import { useState, useEffect } from 'react'
import { printShopService, type PrintShop } from '../../lib/supabase'
import { normalizeText, searchInText, extractCityFromAddress } from '../utils/searchUtils'
import { calculateDistance } from '../utils/distance'

interface UsePrintShopsOptions {
  searchTerm?: string
  userLocation?: { lat: number; lng: number } | null
  sortBy?: 'distance' | 'rating' | 'name'
  radiusKm?: number
}

export function usePrintShops(options: UsePrintShopsOptions = {}) {
  const { searchTerm = '', userLocation, sortBy = 'distance', radiusKm = 50 } = options
  
  const [printShops, setPrintShops] = useState<PrintShop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch print shops from Supabase
  useEffect(() => {
    async function fetchPrintShops() {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data')
        // Use mock data when Supabase isn't configured
        const mockShops: PrintShop[] = [
          {
            id: 1,
            name: 'Quick Print Solutions',
            lat: 45.4215,
            lng: -75.6972,
            address: '123 Bank St, Ottawa, ON',
            specialty: 'Business Cards & Flyers',
            rating: 4.8
          },
          {
            id: 2,
            name: 'Creative Print Studio',
            lat: 45.4165,
            lng: -75.7040,
            address: '456 Somerset St, Ottawa, ON',
            specialty: 'Custom Labels & Stickers',
            rating: 4.6
          },
          {
            id: 3,
            name: 'Express Print Hub',
            lat: 45.4280,
            lng: -75.6890,
            address: '789 Rideau St, Ottawa, ON',
            specialty: 'Large Format Printing',
            rating: 4.7
          }
        ]
        setPrintShops(mockShops)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        let shops: PrintShop[]

        if (searchTerm.trim()) {
          // Search for shops
          shops = await printShopService.search(searchTerm)
        } else if (userLocation) {
          // Get nearby shops
          shops = await printShopService.getNearby(userLocation.lat, userLocation.lng, radiusKm)
        } else {
          // Get all shops
          shops = await printShopService.getAll()
        }

        setPrintShops(shops)
      } catch (err) {
        console.error('Error fetching print shops:', err)
        setError('Failed to load print shops. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPrintShops()
  }, [searchTerm, userLocation?.lat, userLocation?.lng, radiusKm])

  // Client-side filtering and sorting
  const processedShops = React.useMemo(() => {
    let filtered = printShops

    // Enhanced client-side search for accent/case insensitivity
    if (searchTerm.trim()) {
      filtered = printShops.filter(shop => {
        const city = extractCityFromAddress(shop.address)
        return (
          searchInText(searchTerm, shop.name) ||
          searchInText(searchTerm, shop.specialty) ||
          searchInText(searchTerm, city) ||
          searchInText(searchTerm, shop.address)
        )
      })
    }

    // Sort shops
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          if (!userLocation) return 0
          const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng)
          const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
          return distanceA - distanceB
        
        case 'rating':
          return b.rating - a.rating // Higher rating first
        
        case 'name':
          return a.name.localeCompare(b.name)
        
        default:
          return 0
      }
    })

    return sorted
  }, [printShops, searchTerm, sortBy, userLocation])

  return {
    printShops: processedShops,
    loading,
    error,
    refetch: () => {
      // Trigger a refetch by updating a dependency
      setPrintShops([])
    }
  }
}

// React import for useMemo
import React from 'react'