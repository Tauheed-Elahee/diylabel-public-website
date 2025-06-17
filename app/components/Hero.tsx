'use client'

import { ArrowRight, MapPin, Store, Printer } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

export default function Hero() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedShop, setSelectedShop] = useState<any>(null)
  const [userCity, setUserCity] = useState<string>('Here')
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  
  // Mock data for print shops
  const mockPrintShops = [
    { id: 1, name: 'Local Print Co.', lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
    { id: 2, name: 'Quick Print Solutions', lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY', specialty: 'Business Cards & Flyers', rating: 4.9 },
    { id: 3, name: 'Eco Print Shop', lat: 40.6892, lng: -74.0445, address: '789 Green Ave, Brooklyn, NY', specialty: 'Sustainable Materials', rating: 4.7 },
  ]

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
        return 'Here'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Here'
    }
  }

  // Get user's location and city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation({ lat: userLat, lng: userLng })
          
          // Get city name from coordinates
          const cityName = await getCityFromCoordinates(userLat, userLng)
          setUserCity(cityName)
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Fallback to default
          setUserCity('Here')
        }
      )
    }
  }, [])

  // Create custom marker element
  const createMarkerElement = (shop: any) => {
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
  const createPopupContent = (shop: any) => {
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
  const addMarkersToMap = (shops: any[]) => {
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
    if (map.current || !mapContainer.current) return

    const initialLng = userLocation?.lng || -74.0060
    const initialLat = userLocation?.lat || 40.7128

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [initialLng, initialLat],
      zoom: 11,
      interactive: true
    })

    map.current.on('load', () => {
      setMapLoading(false)
      
      // Add user location marker if available
      if (userLocation) {
        const userMarkerEl = document.createElement('div')
        userMarkerEl.innerHTML = `
          <div class="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        `
        
        new mapboxgl.Marker(userMarkerEl)
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map.current!)
      }

      // Add print shop markers
      addMarkersToMap(mockPrintShops)
    })

    // Add minimal navigation controls
    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true
    }), 'top-right')

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [userLocation, resolvedTheme])

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && !mapLoading) {
      const newStyle = resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
      map.current.setStyle(newStyle)
      
      map.current.once('styledata', () => {
        // Re-add markers after style change
        addMarkersToMap(mockPrintShops)
      })
    }
  }, [resolvedTheme])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg hero-pattern"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Merch,
            <br />
            <span className="text-accent-300">Made {userCity}</span>
          </h1>
          
          {/* Interactive Map Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8 max-w-4xl mx-auto border border-white/20">
            {/* Map Container */}
            <div className="relative h-64 md:h-80">
              <div ref={mapContainer} className="w-full h-full" />

              {/* Loading overlay */}
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-accent-300 mx-auto mb-3 animate-pulse" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Loading Interactive Map
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Discovering print shops near you...
                    </p>
                  </div>
                </div>
              )}

              {/* Print Shop Stats Overlay */}
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-sm font-medium text-white mb-1">Print Shops Found</div>
                <div className="text-2xl font-bold text-accent-300 mb-1">{mockPrintShops.length}</div>
                <div className="text-xs text-gray-300">Near {userCity === 'Here' ? 'You' : userCity}</div>
              </div>
            </div>

            {/* Mini Print Shops List */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mockPrintShops.slice(0, 3).map((shop) => (
                  <div 
                    key={shop.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedShop(selectedShop?.id === shop.id ? null : shop)
                      if (map.current) {
                        map.current.flyTo({
                          center: [shop.lng, shop.lat],
                          zoom: 13,
                          duration: 1000
                        })
                      }
                    }}
                  >
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-accent-300 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white text-sm">
                          {shop.name}
                        </h4>
                        <p className="text-xs text-gray-300 mt-1">
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
              Get Started
              <ArrowRight size={20} />
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce-gentle"></div>
        </div>
      </div>
    </section>
  )
}