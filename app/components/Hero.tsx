'use client'

import { ArrowRight, MapPin, Store, Printer } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { type PrintShop } from '../../lib/supabase'
import { usePrintShops } from '../hooks/usePrintShops'
import { type UserLocation } from '../../lib/geolocation'

// Set Mapbox access token with validation
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
if (mapboxToken && mapboxToken !== '' && mapboxToken.startsWith('pk.')) {
  mapboxgl.accessToken = mapboxToken
}

export default function Hero() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedShop, setSelectedShop] = useState<PrintShop | null>(null)
  const [userCity, setUserCity] = useState<string>('Ottawa')
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number, source?: string} | null>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapError, setMapError] = useState(false)
  const { resolvedTheme } = useTheme()
  
  // Default coordinates (Ottawa)
  const defaultLat = 45.4215
  const defaultLng = -75.6972

  // Use the custom hook to fetch nearby print shops from Supabase
  const { printShops: nearbyShops, loading: shopsLoading } = usePrintShops({
    userLocation,
    radiusKm: 50,
    initialData: []
  })

  // Limit to 3 shops for hero display
  const heroShops = nearbyShops.slice(0, 3)

  // Check if Mapbox token is available and valid
  const hasValidMapboxToken = !!mapboxToken && 
                              mapboxToken !== '' && 
                              mapboxToken.startsWith('pk.')

  // Scroll to Features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Scroll to CTA section for Get Started action
  const scrollToCTA = () => {
    const ctaSection = document.querySelector('section[class*="bg-gradient-to-r"]')
    if (ctaSection) {
      ctaSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Reverse geocoding function to get city from coordinates
  const getCityFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
      const data = await response.json()
      
      // Return just the city name for the "Made in" text
      if (data.city) {
        return data.city
      } else if (data.locality) {
        return data.locality
      } else if (data.principalSubdivision) {
        return data.principalSubdivision
      } else {
        return 'Ottawa'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Ottawa'
    }
  }

  // Get user's location and city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation({ lat: userLat, lng: userLng, source: 'browser-gps' })
          
          // Get city name from coordinates
          const cityName = await getCityFromCoordinates(userLat, userLng)
          setUserCity(cityName)
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Fallback to Ottawa
          setUserCity('Ottawa')
        }
      )
    } else {
      // Geolocation not supported, use default location
      setUserCity('Ottawa')
    }
  }, [])

  // Create custom marker element
  const createMarkerElement = (shop: PrintShop) => {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.innerHTML = `
      <div class="w-6 h-6 bg-accent-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
      </div>
    `
    
    el.addEventListener('click', () => {
      setSelectedShop(shop)
    })
    
    return el
  }

  // Create popup content
  const createPopupContent = (shop: PrintShop) => {
    return `
      <div class="p-3 min-w-[200px]">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1 text-sm">${shop.name}</h3>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">${shop.specialty}</p>
        <div class="flex items-center text-yellow-500">
          <span class="text-xs font-medium">${shop.rating}</span>
          <span class="ml-1 text-xs">★</span>
        </div>
      </div>
    `
  }

  // Add markers to map
  const addMarkersToMap = (shops: PrintShop[]) => {
    if (!map.current) return
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    shops.forEach(shop => {
      const markerElement = createMarkerElement(shop)
      
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([shop.lng, shop.lat])
        .addTo(map.current!)

      const popup = new mapboxgl.Popup({
        offset: 15,
        closeButton: true,
        closeOnClick: false
      }).setHTML(createPopupContent(shop))

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }

  // Initialize map
  useEffect(() => {
    // Early return if map already exists, container not ready, or no valid token
    if (map.current || !mapContainer.current) {
      return
    }

    // If no valid token, show error state and don't initialize map
    if (!hasValidMapboxToken) {
      setMapError(true)
      setMapLoading(false)
      return
    }

    try {
      // Use user location or default to Ottawa coordinates
      const initialLng = userLocation?.lng || defaultLng
      const initialLat = userLocation?.lat || defaultLat

      // Create map with error handling
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        center: [initialLng, initialLat],
        zoom: 11,
        interactive: true,
        // Add additional options to prevent errors
        attributionControl: false,
        logoPosition: 'bottom-right'
      })

      // Handle successful load
      map.current.on('load', () => {
        setMapLoading(false)
        setMapError(false)
        
        // Add user location marker if available
        if (userLocation && map.current) {
          try {
            const userMarkerEl = document.createElement('div')
            userMarkerEl.innerHTML = `
              <div class="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            `
            
            new mapboxgl.Marker(userMarkerEl)
              .setLngLat([userLocation.lng, userLocation.lat])
              .addTo(map.current)
          } catch (markerError) {
            console.warn('Error adding user marker:', markerError)
          }
        }

        // Add print shop markers for nearby shops
        try {
          addMarkersToMap(heroShops)
        } catch (markersError) {
          console.warn('Error adding shop markers:', markersError)
        }
      })

      // Handle errors more gracefully
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError(true)
        setMapLoading(false)
      })

      // Handle style errors
      map.current.on('styleimagemissing', (e) => {
        console.warn('Style image missing:', e)
      })

      // Add minimal navigation controls with error handling
      try {
        map.current.addControl(new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true
        }), 'top-right')
      } catch (controlError) {
        console.warn('Error adding navigation controls:', controlError)
      }

    } catch (error) {
      console.error('Map initialization error:', error)
      setMapError(true)
      setMapLoading(false)
    }

    return () => {
      if (map.current) {
        try {
          map.current.remove()
        } catch (removeError) {
          console.warn('Error removing map:', removeError)
        }
        map.current = null
      }
    }
  }, [userLocation, resolvedTheme, heroShops, hasValidMapboxToken])

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && !mapLoading && !mapError && hasValidMapboxToken) {
      try {
        const newStyle = resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
        map.current.setStyle(newStyle)
        
        map.current.once('styledata', () => {
          // Re-add markers after style change
          try {
            addMarkersToMap(heroShops)
          } catch (markersError) {
            console.warn('Error re-adding markers after style change:', markersError)
          }
        })
      } catch (styleError) {
        console.warn('Error updating map style:', styleError)
      }
    }
  }, [resolvedTheme, heroShops])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg hero-pattern"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-8 leading-tight">
            Your Merch,
            <br />
            <span className="text-accent-500 dark:text-accent-300">
              Made in {userCity}
            </span>
            {userLocation?.source === 'netlify-ip' && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                📍 Location detected automatically
              </div>
            )}
          </h1>
          
          {/* Interactive Map Container */}
          <div className="bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8 max-w-4xl mx-auto border border-black/20 dark:border-white/20">
            {/* Map Container */}
            <div className="relative h-64 md:h-80">
              <div ref={mapContainer} className="w-full h-full" />

              {/* Loading overlay */}
              {(mapLoading || shopsLoading) && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-accent-500 dark:text-accent-300 mx-auto mb-3 animate-pulse" />
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Loading Interactive Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-200 text-sm">
                      Discovering print shops near you...
                    </p>
                  </div>
                </div>
              )}

              {/* Error overlay - No Mapbox Token or Map Error */}
              {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-accent-500 dark:text-accent-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Map Preview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                      Interactive map requires setup
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-xs">
                      Print shops available below
                    </p>
                  </div>
                </div>
              )}

              {/* Print Shop Stats Overlay - Only show if not in error state */}
              {!mapError && (
                <div className="absolute top-4 left-4 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-black/20 dark:border-white/20">
                  <div className="text-sm font-medium text-black dark:text-white mb-1">Print Shops Found</div>
                  <div className="text-2xl font-bold text-accent-500 dark:text-accent-300 mb-1">{heroShops.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Within 50km of {userCity}</div>
                </div>
              )}
            </div>

            {/* Mini Print Shops List */}
            <div className="p-4">
              {heroShops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {heroShops.map((shop) => (
                    <div 
                      key={shop.id}
                      className="bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-black/20 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedShop(selectedShop?.id === shop.id ? null : shop)
                        if (map.current && !mapError && hasValidMapboxToken) {
                          try {
                            map.current.flyTo({
                              center: [shop.lng, shop.lat],
                              zoom: 13,
                              duration: 1000
                            })
                          } catch (flyError) {
                            console.warn('Error flying to shop location:', flyError)
                          }
                        }
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-accent-500 dark:text-accent-300 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-black dark:text-white text-sm">
                            {shop.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {shop.specialty}
                          </p>
                          <div className="flex items-center text-yellow-400 mt-1">
                            <span className="text-xs">{shop.rating}</span>
                            <span className="ml-1 text-xs">★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MapPin className="w-8 h-8 text-accent-500 dark:text-accent-300 mx-auto mb-2" />
                  <p className="text-black dark:text-white text-sm mb-1">
                    {shopsLoading ? 'Loading print shops...' : 'No print shops within 50km'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    {shopsLoading ? 'Please wait...' : 'Expanding search radius...'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20">
            <button 
             onClick={() => window.location.href = '/join'}
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            
            <button 
              onClick={scrollToFeatures}
              className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white border border-black/30 dark:border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - moved further down with more spacing */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-black/50 dark:border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black/70 dark:bg-white/70 rounded-full mt-2 animate-bounce-gentle"></div>
        </div>
      </div>
    </section>
  )
}