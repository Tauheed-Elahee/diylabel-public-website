'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { MapPin, Loader, Search, Filter, AlertCircle } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { type PrintShop } from '../../lib/supabase'
import { calculateDistance } from '../utils/distance'
import { extractCityFromAddress } from '../utils/searchUtils'
import { usePrintShops } from '../hooks/usePrintShops'
import { type UserLocation } from '../../lib/geolocation'
import { type UserLocation } from '../../lib/geolocation'

// Set Mapbox access token with validation
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
if (mapboxToken && mapboxToken !== '' && mapboxToken.startsWith('pk.')) {
  mapboxgl.accessToken = mapboxToken
}

interface InteractiveMapProps {
  initialUserLocation?: UserLocation
  initialPrintShops?: PrintShop[]
}

interface InteractiveMapProps {
  initialUserLocation?: UserLocation
  initialPrintShops?: PrintShop[]
}

export default function InteractiveMap({ initialUserLocation, initialPrintShops = [] }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [lng, setLng] = useState(initialUserLocation?.lng || -75.6972)
  const [lat, setLat] = useState(initialUserLocation?.lat || 45.4215)
  const [zoom, setZoom] = useState(11)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapError, setMapError] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number, source?: string} | null>(
    initialUserLocation ? {
      lat: initialUserLocation.lat,
      lng: initialUserLocation.lng,
      source: initialUserLocation.source
    } : null
  )
  const [userCity, setUserCity] = useState<string>(initialUserLocation?.city || 'Ottawa, ON, Canada')
      lat: initialUserLocation.lat,
      lng: initialUserLocation.lng,
      source: initialUserLocation.source
    } : null
  )
  const [userCity, setUserCity] = useState<string>(initialUserLocation?.city || 'Ottawa, ON, Canada')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShop, setSelectedShop] = useState<PrintShop | null>(null)
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance')
  const [showAllShops, setShowAllShops] = useState(false)
  const { resolvedTheme } = useTheme()

  // Use the custom hook to fetch print shops from Supabase
  const { printShops, loading: shopsLoading, error: shopsError } = usePrintShops({
    searchTerm,
    userLocation,
    sortBy,
    radiusKm: 50,
    initialData: initialPrintShops
    initialData: initialPrintShops
  })

  // Check if Mapbox token is available and valid
  const hasValidMapboxToken = !!mapboxToken && 
                              mapboxToken !== '' && 
                              mapboxToken.startsWith('pk.')

  // Reverse geocoding function to get city from coordinates
  const getCityFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
      const data = await response.json()
      
      if (data.city && data.principalSubdivision) {
        return `${data.city}, ${data.principalSubdivision}`
      } else if (data.locality && data.principalSubdivision) {
        return `${data.locality}, ${data.principalSubdivision}`
      } else if (data.principalSubdivision && data.countryName) {
        return `${data.principalSubdivision}, ${data.countryName}`
      } else {
        return 'Ottawa, ON, Canada'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Ottawa, ON, Canada'
    }
  }

  // Get user's location
  useEffect(() => {
    // Skip geolocation if we already have server-provided location
    if (initialUserLocation) {
      return
    }

    // Skip geolocation if we already have server-provided location
    if (initialUserLocation) {
      return
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setLat(userLat)
          setLng(userLng)
          setUserLocation({ lat: userLat, lng: userLng, source: 'browser-gps' })
          
          // Get city name from coordinates
          const cityName = await getCityFromCoordinates(userLat, userLng)
          setUserCity(cityName)
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Fallback to Ottawa coordinates and city
          setUserCity('Ottawa, ON, Canada')
        }
      )
    }
  }, [initialUserLocation])

  // Create custom marker element
  const createMarkerElement = (shop: PrintShop) => {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.innerHTML = `
      <div class="w-8 h-8 bg-primary-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
      <div class="p-3 min-w-[250px]">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">${shop.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${shop.address}</p>
        <div class="flex items-center justify-between mb-2">
          <span class="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full">
            ${shop.specialty}
          </span>
          <div class="flex items-center text-yellow-500">
            <span class="text-sm font-medium">${shop.rating}</span>
            <span class="ml-1">★</span>
          </div>
        </div>
        <button class="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
          View Details
        </button>
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
      try {
        const markerElement = createMarkerElement(shop)
        
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([shop.lng, shop.lat])
          .addTo(map.current!)

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(createPopupContent(shop))

        marker.setPopup(popup)
        markersRef.current.push(marker)
      } catch (markerError) {
        console.warn('Error adding marker for shop:', shop.name, markerError)
      }
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
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: zoom,
        interactive: true,
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoomRotate: true,
        doubleClickZoom: true,
        keyboard: true,
        maxBounds: undefined,
        minZoom: 0,
        maxZoom: 24,
        // Add additional options to prevent errors
        attributionControl: false,
        logoPosition: 'bottom-right'
      })

      map.current.on('load', () => {
        setMapLoading(false)
        setMapError(false)
        
        // Add user location marker if available
        if (userLocation && map.current) {
          try {
            const userMarkerEl = document.createElement('div')
            userMarkerEl.innerHTML = `
              <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            `
            
            new mapboxgl.Marker(userMarkerEl)
              .setLngLat([userLocation.lng, userLocation.lat])
              .addTo(map.current)
          } catch (userMarkerError) {
            console.warn('Error adding user marker:', userMarkerError)
          }
        }

        // Add print shop markers
        try {
          addMarkersToMap(displayedShops)
        } catch (markersError) {
          console.warn('Error adding shop markers:', markersError)
        }
      })

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError(true)
        setMapLoading(false)
      })

      // Handle style errors
      map.current.on('styleimagemissing', (e) => {
        console.warn('Style image missing:', e)
      })

      map.current.on('move', () => {
        if (map.current) {
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)))
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)))
          setZoom(parseFloat(map.current.getZoom().toFixed(2)))
        }
      })

      // Add navigation controls with error handling
      try {
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        
        // Add geolocate control
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }),
          'top-right'
        )
      } catch (controlError) {
        console.warn('Error adding map controls:', controlError)
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
  }, [lng, lat, zoom, userLocation, resolvedTheme, hasValidMapboxToken])

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && !mapLoading && !mapError && hasValidMapboxToken) {
      try {
        const newStyle = resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
        map.current.setStyle(newStyle)
        
        map.current.once('styledata', () => {
          // Re-add markers after style change
          try {
            addMarkersToMap(displayedShops)
          } catch (markersError) {
            console.warn('Error re-adding markers after style change:', markersError)
          }
        })
      } catch (styleError) {
        console.warn('Error updating map style:', styleError)
      }
    }
  }, [resolvedTheme])

  // Update map center when user location changes
  useEffect(() => {
    if (map.current && userLocation && !mapLoading && !mapError && hasValidMapboxToken) {
      try {
        map.current.flyTo({
          center: [userLocation.lng, userLocation.lat],
          zoom: 12,
          duration: 2000
        })
      } catch (flyError) {
        console.warn('Error flying to user location:', flyError)
      }
    }
  }, [userLocation, mapLoading, mapError])

  // Limit shops display based on showAllShops state
  const displayedShops = showAllShops ? printShops : printShops.slice(0, 6)

  // Update markers when shops change
  useEffect(() => {
    if (map.current && !mapLoading && !mapError && hasValidMapboxToken) {
      addMarkersToMap(displayedShops)
    }
  }, [displayedShops, mapLoading, mapError])

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'distance' | 'rating' | 'name')
  }

  return (
    <section id="map" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Print Shop Network
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dive deeper into our network of verified print shops. Search by location, specialty, 
            or browse the full directory of local partners ready to fulfill your orders.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Enhanced Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {searchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      aria-label="Clear search"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
            
            {/* Search suggestions/examples */}
            {!searchTerm && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Try searching:</span>
                {['Toronto', 'Montréal', 'T-Shirts', 'Sustainable', 'Québec', 'Custom Designs'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map Container */}
          <div className="relative h-96 md:h-[500px]">
            {/* Loading State */}
            {(mapLoading || shopsLoading) && !mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 z-10">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    {mapLoading ? 'Loading interactive map...' : 'Loading print shops...'}
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {(mapError || shopsError) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 z-10">
                <div className="text-center p-8 max-w-md">
                  <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {mapError ? 'Map Temporarily Unavailable' : 'Error Loading Print Shops'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {mapError 
                      ? 'The interactive map requires a Mapbox access token to display. You can still browse our print shop directory below.'
                      : 'There was an error loading the print shop data. Please try refreshing the page.'
                    }
                  </p>
                  {mapError && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>For developers:</strong> Add your Mapbox token to the environment variables to enable the map.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Map Info Overlay - Only show if map is working */}
            {!mapError && !shopsError && (
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs z-10">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Print Shops Found</div>
                <div className="text-2xl font-bold text-primary-600 mb-2">{printShops.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {searchTerm ? `Filtered by "${searchTerm}"` : 'Across Canada'}
                </div>
                <div className="text-xs text-primary-600 dark:text-primary-400">
                  Near {userCity}
                  {userLocation?.source === 'netlify-ip' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📍 Auto-detected location
                    </div>
                  )}
                  {userLocation?.source === 'netlify-ip' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📍 Auto-detected location
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Print Shops List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {searchTerm ? `Search Results (${printShops.length})` : `Print Shops Across Canada (${printShops.length})`}
                {!showAllShops && printShops.length > 6 && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    - Showing 6 of {printShops.length}
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-3">
                {printShops.length > 6 && (
                  <button
                    onClick={() => setShowAllShops(!showAllShops)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    {showAllShops ? 'Show Less' : `Show All ${printShops.length}`}
                  </button>
                )}
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedShops.map((shop) => {
                // Calculate distance for display
                const distance = userLocation 
                  ? calculateDistance(userLocation.lat, userLocation.lng, shop.lat, shop.lng)
                  : null

                // Extract city from address for display
                const city = extractCityFromAddress(shop.address)

                return (
                  <div 
                    key={shop.id}
                    className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer border-2 ${
                      selectedShop?.id === shop.id ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => {
                      setSelectedShop(selectedShop?.id === shop.id ? null : shop)
                      if (map.current && !mapError && hasValidMapboxToken) {
                        try {
                          map.current.flyTo({
                            center: [shop.lng, shop.lat],
                            zoom: 14,
                            duration: 1000
                          })
                        } catch (flyError) {
                          console.warn('Error flying to shop location:', flyError)
                        }
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {shop.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {city && <span className="font-medium">{city}</span>}
                            {city && <span className="mx-1">•</span>}
                            {shop.address}
                          </p>
                          {distance && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {distance.toFixed(1)} km away
                              {userLocation?.source === 'netlify-ip' && (
                                <span className="ml-1 text-gray-400">~</span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <span className="text-sm font-medium">{shop.rating}</span>
                        <span className="ml-1">★</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full">
                        {shop.specialty}
                      </span>
                    </div>

                    {selectedShop?.id === shop.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Delivery:</span>
                            <span className="ml-1 text-gray-900 dark:text-white">2-3 days</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Min Order:</span>
                            <span className="ml-1 text-gray-900 dark:text-white">$25</span>
                          </div>
                        </div>
                        <button className="w-full mt-3 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {printShops.length === 0 && !shopsLoading && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No print shops found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {searchTerm ? `No results for "${searchTerm}". ` : ''}
                  Try adjusting your search terms or filters.
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear search and show all shops
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}