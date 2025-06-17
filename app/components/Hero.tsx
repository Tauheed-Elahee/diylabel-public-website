'use client'

import { ArrowRight, MapPin, Store, Printer, Loader } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

// Mock data for print shops
const mockPrintShops = [
  { id: 1, name: 'Local Print Co.', lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
  { id: 2, name: 'Quick Print Solutions', lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY' },
  { id: 3, name: 'Eco Print Shop', lat: 40.6892, lng: -74.0445, address: '789 Green Ave, Brooklyn, NY' },
  { id: 4, name: 'Creative Prints', lat: 40.7831, lng: -73.9712, address: '321 Art St, Manhattan, NY' },
  { id: 5, name: 'Neighborhood Printing', lat: 40.6782, lng: -73.9442, address: '654 Local Rd, Queens, NY' },
]

export default function Hero() {
  const [lng, setLng] = useState(-74.0060)
  const [lat, setLat] = useState(40.7128)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const { theme } = useTheme()

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
    
    // Simulate map loading
    setTimeout(() => setLoading(false), 1500)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg hero-pattern"></div>
      
      {/* Content - Full Width */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen py-20">
        
        {/* Content - Full Width */}
        <div className="animate-fade-in text-center lg:text-left w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Local Print,
            <br />
            <span className="text-accent-300">Global Reach</span>
          </h1>
          
          {/* Interactive Map Widget */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl mb-8">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Your Merch Made Here...</h3>
              <p className="text-gray-200 text-sm">Discover verified partners near you</p>
            </div>

            {/* Map Container */}
            <div className="relative h-64 rounded-xl overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/20 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-accent-300 mx-auto mb-4" />
                    <p className="text-white text-sm">Loading map...</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-blue-200/20 backdrop-blur-sm relative rounded-xl border border-white/10">
                  {/* Mock Map Interface */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <MapPin className="w-10 h-10 text-accent-300 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-white mb-1">
                        Interactive Map
                      </h4>
                      <p className="text-gray-200 text-xs mb-2">
                        Live map showing nearby print shops
                      </p>
                      <div className="text-xs text-gray-300">
                        Location: {userLocation ? `${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}` : '45.51, -73.70'}
                      </div>
                    </div>
                  </div>

                  {/* Mock markers */}
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                    <div className="text-xs font-medium text-white">Print Shops</div>
                    <div className="text-lg font-bold text-accent-300">{mockPrintShops.length}</div>
                  </div>

                  {/* Mock location dots */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-accent-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-accent-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-accent-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-sm text-gray-200">Avg. Delivery</div>
                <div className="text-lg font-bold text-white">2-3 days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-sm text-gray-200">CO₂ Saved</div>
                <div className="text-lg font-bold text-accent-300">40%</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
              Get Started
              <ArrowRight size={20} />
            </button>
            
            <button 
              onClick={scrollToFeatures}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="animate-slide-up text-center" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Store className="w-6 h-6 text-accent-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-gray-200">Stores</div>
              </div>
            </div>
            
            <div className="animate-slide-up text-center" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Printer className="w-6 h-6 text-accent-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-gray-200">Print Shops</div>
              </div>
            </div>
            
            <div className="animate-slide-up text-center" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="w-6 h-6 text-accent-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-gray-200">Cities</div>
              </div>
            </div>
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