'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { MapPin, Loader, Search, Filter } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

// Mock data for print shops across Canada's 20 largest cities
const mockPrintShops = [
  // Toronto, ON
  { id: 1, name: 'Toronto Print Hub', lat: 43.6532, lng: -79.3832, address: '123 Queen St W, Toronto, ON', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
  { id: 2, name: 'King Street Printing', lat: 43.6481, lng: -79.3773, address: '456 King St W, Toronto, ON', specialty: 'Business Cards & Flyers', rating: 4.9 },
  { id: 3, name: 'Distillery Print Co.', lat: 43.6503, lng: -79.3591, address: '789 Front St E, Toronto, ON', specialty: 'Custom Designs', rating: 4.7 },
  
  // Montreal, QC
  { id: 4, name: 'Impression Montréal', lat: 45.5017, lng: -73.5673, address: '321 Rue Saint-Denis, Montréal, QC', specialty: 'Sustainable Materials', rating: 4.6 },
  { id: 5, name: 'Plateau Print Shop', lat: 45.5200, lng: -73.5800, address: '654 Avenue du Mont-Royal, Montréal, QC', specialty: 'Large Format', rating: 4.8 },
  { id: 6, name: 'Old Port Printing', lat: 45.5088, lng: -73.5540, address: '987 Rue Notre-Dame, Montréal, QC', specialty: 'Premium Quality', rating: 4.9 },
  
  // Calgary, AB
  { id: 7, name: 'Stampede Print Co.', lat: 51.0447, lng: -114.0719, address: '123 17th Ave SW, Calgary, AB', specialty: 'T-Shirts & Hoodies', rating: 4.7 },
  { id: 8, name: 'Bow River Printing', lat: 51.0486, lng: -114.0708, address: '456 8th Ave SW, Calgary, AB', specialty: 'Business Cards & Flyers', rating: 4.8 },
  
  // Ottawa, ON
  { id: 9, name: 'Capital Print Co.', lat: 45.4215, lng: -75.6972, address: '123 Bank St, Ottawa, ON', specialty: 'Government Printing', rating: 4.8 },
  { id: 10, name: 'ByWard Print Solutions', lat: 45.4292, lng: -75.6927, address: '456 Somerset St, Ottawa, ON', specialty: 'Custom Designs', rating: 4.9 },
  
  // Edmonton, AB
  { id: 11, name: 'Whyte Ave Printing', lat: 53.5461, lng: -113.4938, address: '789 Whyte Ave, Edmonton, AB', specialty: 'Eco-Friendly', rating: 4.6 },
  { id: 12, name: 'North Saskatchewan Print', lat: 53.5444, lng: -113.4909, address: '321 Jasper Ave, Edmonton, AB', specialty: 'Large Format', rating: 4.7 },
  
  // Mississauga, ON
  { id: 13, name: 'Square One Printing', lat: 43.5890, lng: -79.6441, address: '654 Hurontario St, Mississauga, ON', specialty: 'Business Solutions', rating: 4.8 },
  
  // Winnipeg, MB
  { id: 14, name: 'Portage Print Hub', lat: 49.8951, lng: -97.1384, address: '987 Portage Ave, Winnipeg, MB', specialty: 'T-Shirts & Hoodies', rating: 4.5 },
  { id: 15, name: 'Exchange District Print', lat: 49.8988, lng: -97.1372, address: '147 Main St, Winnipeg, MB', specialty: 'Vintage Designs', rating: 4.7 },
  
  // Vancouver, BC
  { id: 16, name: 'Granville Print Co.', lat: 49.2827, lng: -123.1207, address: '258 Granville St, Vancouver, BC', specialty: 'Sustainable Materials', rating: 4.9 },
  { id: 17, name: 'Gastown Printing', lat: 49.2845, lng: -123.1088, address: '369 Water St, Vancouver, BC', specialty: 'Premium Quality', rating: 4.8 },
  { id: 18, name: 'Commercial Drive Print', lat: 49.2606, lng: -123.0695, address: '741 Commercial Dr, Vancouver, BC', specialty: 'Custom Designs', rating: 4.6 },
  
  // Brampton, ON
  { id: 19, name: 'Bramalea Print Solutions', lat: 43.7315, lng: -79.7624, address: '852 Main St N, Brampton, ON', specialty: 'Business Cards', rating: 4.4 },
  
  // Hamilton, ON
  { id: 20, name: 'Steel City Printing', lat: 43.2557, lng: -79.8711, address: '963 King St E, Hamilton, ON', specialty: 'Industrial Printing', rating: 4.7 },
  
  // Quebec City, QC
  { id: 21, name: 'Vieux-Québec Print', lat: 46.8139, lng: -71.2080, address: '174 Rue Saint-Jean, Québec, QC', specialty: 'Heritage Designs', rating: 4.8 },
  { id: 22, name: 'Château Frontenac Printing', lat: 46.8118, lng: -71.2058, address: '285 Rue Saint-Louis, Québec, QC', specialty: 'Luxury Materials', rating: 4.9 },
  
  // Surrey, BC
  { id: 23, name: 'Fraser Valley Print', lat: 49.1913, lng: -122.8490, address: '396 King George Blvd, Surrey, BC', specialty: 'Large Format', rating: 4.5 },
  
  // Laval, QC
  { id: 24, name: 'Laval Print Express', lat: 45.6066, lng: -73.7124, address: '507 Boulevard Saint-Martin, Laval, QC', specialty: 'Quick Turnaround', rating: 4.6 },
  
  // Halifax, NS
  { id: 25, name: 'Halifax Harbour Print', lat: 44.6488, lng: -63.5752, address: '618 Barrington St, Halifax, NS', specialty: 'Maritime Themes', rating: 4.7 },
  { id: 26, name: 'Spring Garden Printing', lat: 44.6426, lng: -63.5769, address: '729 Spring Garden Rd, Halifax, NS', specialty: 'Local Artists', rating: 4.8 },
  
  // London, ON
  { id: 27, name: 'Thames Valley Print', lat: 42.9849, lng: -81.2453, address: '830 Richmond St, London, ON', specialty: 'University Merch', rating: 4.6 },
  
  // Markham, ON
  { id: 28, name: 'Markham Print Centre', lat: 43.8561, lng: -79.3370, address: '941 Highway 7, Markham, ON', specialty: 'Tech Company Swag', rating: 4.7 },
  
  // Gatineau, QC
  { id: 29, name: 'Outaouais Print Shop', lat: 45.4765, lng: -75.7013, address: '152 Boulevard Gréber, Gatineau, QC', specialty: 'Bilingual Services', rating: 4.5 },
  
  // Saskatoon, SK
  { id: 30, name: 'Prairie Print Co.', lat: 52.1579, lng: -106.6702, address: '263 2nd Ave S, Saskatoon, SK', specialty: 'Agricultural Themes', rating: 4.6 },
  
  // Longueuil, QC
  { id: 31, name: 'South Shore Printing', lat: 45.5312, lng: -73.5185, address: '374 Rue Saint-Charles, Longueuil, QC', specialty: 'Family Business', rating: 4.4 },
  
  // Burnaby, BC
  { id: 32, name: 'Metrotown Print Hub', lat: 49.2237, lng: -122.9965, address: '485 Central Blvd, Burnaby, BC', specialty: 'Shopping Mall Kiosks', rating: 4.5 },
  
  // Regina, SK
  { id: 33, name: 'Queen City Print', lat: 50.4452, lng: -104.6189, address: '596 Victoria Ave, Regina, SK', specialty: 'Government Services', rating: 4.7 },
  
  // Richmond, BC
  { id: 34, name: 'Richmond Centre Print', lat: 49.1666, lng: -123.1336, address: '607 No. 3 Rd, Richmond, BC', specialty: 'Multicultural Designs', rating: 4.6 }
]

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [lng, setLng] = useState(-75.6972)
  const [lat, setLat] = useState(45.4215)
  const [zoom, setZoom] = useState(11)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [userCity, setUserCity] = useState<string>('Ottawa, ON, Canada')
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
        return 'Ottawa, ON, Canada'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return 'Ottawa, ON, Canada'
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
          // Fallback to Ottawa coordinates and city
          setUserCity('Ottawa, ON, Canada')
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
    
    // Add geolocate control without onError callback
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
                {searchTerm ? `Filtered by "${searchTerm}"` : 'Across Canada'}
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
                {searchTerm ? `Search Results (${filteredShops.length})` : `Print Shops Across Canada (${filteredShops.length})`}
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