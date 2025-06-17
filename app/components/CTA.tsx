'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'No upfront costs or inventory',
  'Seamless Shopify integration',
  'Verified local print partners',
  'Faster delivery times',
  'Sustainable business model',
  '24/7 customer support'
]

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Merch Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of successful store owners who are already using DIY Label to offer 
            sustainable, locally printed merchandise to their customers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-primary-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
              Start Free Trial
              <ArrowRight size={20} />
            </button>
            
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Schedule Demo
            </button>
          </div>

          <p className="text-primary-200 text-sm mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}