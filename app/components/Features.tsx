'use client'

import { Leaf, MapPin, Zap, Users, Shield, TrendingUp, Store, Printer, Footprints, Package } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Zero Cost Carbon Zero',
    description: 'Eliminate shipping costs to boost profit margins while achieving zero-carbon local delivery for maximum environmental impact.',
    color: 'text-green-500'
  },
  {
    icon: Package,
    title: '2-Hour Shipping',
    description: 'Ultra-fast local delivery that delights customers and encourages repeat purchases through same-day fulfillment.',
    color: 'text-blue-500'
  },
  {
    icon: Footprints,
    title: 'Increase Local Foot Traffic',
    description: 'Increase local foot traffic for local businesses. Reduce shipping to $0.',
    color: 'text-orange-500'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Accelerate business growth with faster delivery times and reduced shipping costs that increase customer satisfaction and drive higher order volumes.',
    color: 'text-indigo-500'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose DIY Label?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing the merch industry by connecting local print shops with global creators, 
            creating a sustainable ecosystem that benefits everyone.
          </p>
        </div>

        {/* Store stats grid - commented out until we have real metrics */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <Store className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Shopify Stores</div>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <Printer className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-300">Local Print Shops</div>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Cities Covered</div>
            </div>
          </div>
        </div>
        */}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-6`} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}