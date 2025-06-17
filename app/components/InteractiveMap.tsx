'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { MapPin, Loader, Search, Filter } from 'lucide-react'

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
  const map = useRef<any>(null)
  const [lng, setLng] = useState(-74.0060)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(11)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShop, setSelectedShop] = useState<any>(null)
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
      setTimeout(() => setLoading(false), 1000)
    }

    initializeMap()
  }, [lng, lat, zoom])

  const filteredShops = mockPrintShops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Loading detailed map...</p>
                </div>
              </div>
            ) : (
              <div 
                ref={mapContainer} 
                className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 relative"
              >
                {/* Enhanced Mock Map Interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Full Interactive Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      In production, this would show a detailed Mapbox GL JS map with clustering, 
                      custom markers, and interactive popups for each print shop.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Location: {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'New York, NY'}
                    </div>
                  </div>
                </div>

                {/* Enhanced mock markers with more detail */}
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Print Shops Found</div>
                  <div className="text-2xl font-bold text-primary-600 mb-2">{filteredShops.length}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {searchTerm ? `Filtered by "${searchTerm}"` : 'All shops in area'}
                  </div>
                </div>

                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-300">+</span>
                  </button>
                  <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-300">−</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Print Shops List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {searchTerm ? `Search Results (${filteredShops.length})` : 'All Print Shops'}
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
                  onClick={() => setSelectedShop(selectedShop?.id === shop.id ? null : shop)}
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