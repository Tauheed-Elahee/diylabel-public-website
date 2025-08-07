'use client'

import { ArrowRight, CheckCircle, Store, Printer, Users, HeartHandshake as Handshake } from 'lucide-react'

const storeBenefits = [
  'Zero inventory risk',
  'Instant Shopify integration',
  'Access to local print network'
]

const printShopBenefits = [
  'Steady stream of orders',
  'No customer acquisition costs',
  'Grow your local business'
]

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the DIY Label Network
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            We're building the future of sustainable merch. Whether you're a Shopify store owner 
            or a local print shop, there's a place for you in our growing network.
          </p>

          {/* Two simple buttons for joining */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 max-w-md mx-auto">
            <button className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Local Supplier
            </button>
            <button className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              eCom Storefront
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}