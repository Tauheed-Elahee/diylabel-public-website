'use client'

import { ArrowRight, MapPin, Store, Printer, Search, Filter, Loader } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShop, setSelectedShop] = useState<any>(null)
  
  // Mock data for print shops
  const mockPrintShops = [
    { id: 1, name: 'Local Print Co.', lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
    { id: 2, name: 'Quick Print Solutions', lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY', specialty: 'Business Cards & Flyers', rating: 4.9 },
    { id: 3, name: 'Eco Print Shop', lat: 40.6892, lng: -74.0445, address: '789 Green Ave, Brooklyn, NY', specialty: 'Sustainable Materials', rating: 4.7 },
  ]

  const filteredShops = mockPrintShops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg hero-pattern"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Local Print,
            <br />
            <span className="text-accent-300">Global Reach</span>
          </h1>
          
          {/* Map Container replacing the paragraph */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8 max-w-4xl mx-auto border border-white/20">
            {/* Search and Filter Bar */}
            <div className="p-4 border-b border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-gray-300"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors">
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-64 md:h-80">
              <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative">
                {/* Enhanced Mock Map Interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-accent-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Full Interactive Map
                    </h3>
                    <p className="text-gray-200 text-sm mb-3">
                      In production, this would show a detailed Mapbox GL JS map with clustering, 
                      custom markers, and interactive popups for each print shop.
                    </p>
                    <div className="text-xs text-gray-300">
                      Location: 45.5088, -73.6972
                    </div>
                  </div>
                </div>

                {/* Print Shop Stats */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-sm font-medium text-white mb-1">Print Shops Found</div>
                  <div className="text-2xl font-bold text-accent-300 mb-1">{filteredShops.length}</div>
                  <div className="text-xs text-gray-300">
                    {searchTerm ? `Filtered by "${searchTerm}"` : 'All shops in area'}
                  </div>
                </div>

                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                    <span className="text-lg font-bold text-white">+</span>
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                    <span className="text-lg font-bold text-white">−</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mini Print Shops List */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredShops.slice(0, 3).map((shop) => (
                  <div 
                    key={shop.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    onClick={() => setSelectedShop(selectedShop?.id === shop.id ? null : shop)}
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Store className="w-8 h-8 text-accent-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-200">Shopify Stores</div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Printer className="w-8 h-8 text-accent-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-gray-200">Local Print Shops</div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <MapPin className="w-8 h-8 text-accent-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-200">Cities Covered</div>
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