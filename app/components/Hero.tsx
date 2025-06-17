'use client'

import { ArrowRight, MapPin, Store, Printer } from 'lucide-react'

export default function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect creators, local print shops, and Shopify store owners in a sustainable merch ecosystem. 
            Empower independent design and reduce textile waste.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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