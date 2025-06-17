'use client'

import { MapPin, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">DIY Label</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting creators, local print shops, and Shopify store owners in a sustainable 
              merch ecosystem. Local print, global reach.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-primary-400" />
                <span>hello@diylabel.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-primary-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-primary-400 transition-colors">How It Works</a></li>
              <li><a href="#map" className="text-gray-300 hover:text-primary-400 transition-colors">Find Print Shops</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 DIY Label. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}