'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { MapPin, Loader, Search, Filter } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

// Mock data for print shops
const mockPrintShops = [
  { id: 1, name: 'Local Print Co.', lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
  { id: 2, name: 'Quick Print Solutions', lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY', specialty: 'Business Cards & Flyers', rating: 4.9 },
  { id: 3, name: 'Eco Print Shop', lat: 40.6892, lng: -74.0445, address: '789 Green Ave, Brooklyn, NY', specialty: 'Sustainable Materials', rating: 4.7 },
  { id: 4, name: 'Creative Prints', lat: 40.7831, lng: -73.9712, address: '321 Art St, Manhattan, NY', specialty: 'Custom Designs', rating: 4.6 },
  { id: 5, name: 'Neighborhood Printing', lat: 40.6782, lng: -73.9442, address: '654 Local Rd, Queens, NY', specialty: 'Large Format', rating: 4.8 },
  { id: 6, name: 'Artisan Press', lat: 40.7505, lng: -73.9934, address: '987 Craft Ave, Manhattan, NY', specialty: 'Premium Quality', rating: 4.9 },
]

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [lng, setLng] = useState(-74.0060)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(11)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [userCity, setUserCity] = useState<string>('New York, NY')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShop, setSelectedShop] = useState<any>(null)
  const { theme, resolvedTheme } = useTheme()

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
        return 'Unknown Location'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Location unavailable'
    }
  }

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setLat(userLat)
          setLng(userLng)
          setUserLocation({ lat: userLat, lng: userLng })
          
          // Get city name from coordinates
          const cityName = await getCityFromCoordinates(userLat, userLng)
          setUserCity(cityName)
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Fallback to NYC coordinates and city
          setUserCity('New York, NY')
        }
      )
    }
  }, [])

  // Create custom marker element
  const createMarkerElement = (shop: any) => {
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
  const createPopupContent = (shop: any) => {
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
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(createPopupContent(shop))

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom
    })

    map.current.on('load', () => {
      setLoading(false)
      
      // Add user location marker if available
      if (userLocation) {
        const userMarkerEl = document.createElement('div')
        userMarkerEl.innerHTML = `
          <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        `
        
        new mapboxgl.Marker(userMarkerEl)
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map.current!)
      }

      // Add print shop markers
      addMarkersToMap(mockPrintShops)
    })

    map.current.on('move', () => {
      if (map.current) {
        setLng(parseFloat(map.current.getCenter().lng.toFixed(4)))
        setLat(parseFloat(map.current.getCenter().lat.toFixed(4)))
        setZoom(parseFloat(map.current.getZoom().toFixed(2)))
      }
    })

    // Add navigation controls
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

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [lng, lat, zoom, userLocation, resolvedTheme])

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && !loading) {
      const newStyle = resolvedTheme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
      map.current.setStyle(newStyle)
      
      map.current.once('styledata', () => {
        // Re-add markers after style change
        addMarkersToMap(filteredShops)
      })
    }
  }, [resolvedTheme])

  // Update map center when user location changes
  useEffect(() => {
    if (map.current && userLocation && !loading) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 12,
        duration: 2000
      })
    }
  }, [userLocation, loading])

  const filteredShops = mockPrintShops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Update markers when search changes
  useEffect(() => {
    if (map.current && !loading) {
      addMarkersToMap(filteredShops)
    }
  }, [searchTerm, loading])

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
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative h-96 md:h-[500px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 z-10">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Loading interactive map...</p>
                </div>
              </div>
            )}
            
            <div ref={mapContainer} className="w-full h-full" />

            {/* Map Info Overlay */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs z-10">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Print Shops Found</div>
              <div className="text-2xl font-bold text-primary-600 mb-2">{filteredShops.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {searchTerm ? `Filtered by "${searchTerm}"` : 'All shops in area'}
              </div>
              <div className="text-xs text-primary-600 dark:text-primary-400">
                Near {userCity}
              </div>
            </div>
          </div>

          {/* Enhanced Print Shops List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {searchTerm ? `Search Results (${filteredShops.length})` : `Print Shops in ${userCity}`}
              </h3>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option>Sort by Distance</option>
                <option>Sort by Rating</option>
                <option>Sort by Name</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div 
                  key={shop.id}
                  className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer border-2 ${
                    selectedShop?.id === shop.id ? 'border-primary-500' : 'border-transparent'
                  }`}
                  onClick={() => {
                    setSelectedShop(selectedShop?.id === shop.id ? null : shop)
                    if (map.current) {
                      map.current.flyTo({
                        center: [shop.lng, shop.lat],
                        zoom: 14,
                        duration: 1000
                      })
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
                          {shop.address}
                        </p>
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
              ))}
            </div>

            {filteredShops.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No print shops found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}