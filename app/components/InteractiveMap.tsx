'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { MapPin, Loader } from 'lucide-react'

// Mock data for print shops
const mockPrintShops = [
  { id: 1, name: 'Local Print Co.', lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
  { id: 2, name: 'Quick Print Solutions', lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY' },
  { id: 3, name: 'Eco Print Shop', lat: 40.6892, lng: -74.0445, address: '789 Green Ave, Brooklyn, NY' },
  { id: 4, name: 'Creative Prints', lat: 40.7831, lng: -73.9712, address: '321 Art St, Manhattan, NY' },
  { id: 5, name: 'Neighborhood Printing', lat: 40.6782, lng: -73.9442, address: '654 Local Rd, Queens, NY' },
]

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [lng, setLng] = useState(-74.0060)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(11)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const { theme } = useTheme()

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setLat(userLat)
          setLng(userLng)
          setUserLocation({ lat: userLat, lng: userLng })
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Fallback to NYC coordinates
        }
      )
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (map.current) return // Initialize map only once

    // Since we can't use actual Mapbox in this environment, we'll create a mock map
    const initializeMap = () => {
      setLoading(false)
    }

    initializeMap()
  }, [lng, lat, zoom])

  return (
    <section id="map" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Local Print Shops
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover verified print shops near you. Our platform automatically detects your location 
            and shows nearby partners ready to fulfill your orders.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Map Container */}
          <div className="relative h-96 md:h-[500px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Loading map...</p>
                </div>
              </div>
            ) : (
              <div 
                ref={mapContainer} 
                className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 relative"
              >
                {/* Mock Map Interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      In production, this would show a Mapbox GL JS map with your location and nearby print shops.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Location: {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'New York, NY'}
                    </div>
                  </div>
                </div>

                {/* Mock markers */}
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Print Shops Found</div>
                  <div className="text-2xl font-bold text-primary-600">{mockPrintShops.length}</div>
                </div>
              </div>
            )}
          </div>

          {/* Print Shops List */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nearby Print Shops
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPrintShops.map((shop) => (
                <div 
                  key={shop.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {shop.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {shop.address}
                      </p>
                      <div className="text-xs text-primary-600 dark:text-primary-400 mt-2">
                        Click to view details
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}