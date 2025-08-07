'use client'

import { ArrowRight, Store, Search, Printer, Package } from 'lucide-react'

const steps = [
  {
    icon: Store,
    title: 'Connect Your Store',
    description: 'Integrate DIY Label with your Shopify store in just a few clicks.',
    color: 'bg-blue-500'
  },
  {
    icon: Search,
    title: 'Find Local Shops',
    description: 'Our platform automatically finds verified print shops near your customers.',
    color: 'bg-green-500'
  },
  {
    icon: Printer,
    title: 'Print On Demand',
    description: 'Orders are automatically routed to the nearest print shop for production.',
    color: 'bg-purple-500'
  },
  {
    icon: Package,
    title: 'Fast Delivery',
    description: 'Local printing means faster delivery times and happier customers.',
    color: 'bg-orange-500'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our streamlined process makes it easy to start offering locally printed merch to your customers.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:flex items-center justify-between mb-16">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="w-8 h-8 text-gray-400 mx-8 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
         <button 
           onClick={() => window.location.href = '/join'}
           className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
         >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  )
}