'use client'

import { Leaf, MapPin, Zap, Users, Shield, TrendingUp, Store, Printer } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Sustainable Printing',
    description: 'Reduce textile waste and carbon footprint by connecting customers with nearby print shops.',
    color: 'text-green-500'
  },
  {
    icon: MapPin,
    title: 'Local-First Approach',
    description: 'Support local businesses while providing faster delivery and personalized service.',
    color: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'Seamless Integration',
    description: 'Easy Shopify integration that works with your existing store setup in minutes.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Build relationships between creators, store owners, and local print professionals.',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All print shops are verified and maintain high quality standards for your products.',
    color: 'text-red-500'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Expand your product offerings without inventory risk or upfront investment.',
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

        {/* Stats Grid */}
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
    </section>
  )
}