import { headers } from 'next/headers'
import { getUserLocationFromHeaders } from '../lib/geolocation'
import { printShopService } from '../lib/supabase'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import InteractiveMap from './components/InteractiveMap'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default async function Home() {
  // Get user location from Netlify IP geolocation
  const headersList = headers()
  const userLocation = getUserLocationFromHeaders(headersList)
  
  // Fetch initial print shops based on server-detected location
  let initialPrintShops = []
  try {
    initialPrintShops = await printShopService.getNearby(
      userLocation.lat, 
      userLocation.lng, 
      50 // 50km radius
    )
  } catch (error) {
    console.warn('Failed to fetch initial print shops:', error)
    // Continue with empty array - components will handle the fallback
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero 
        initialUserLocation={userLocation}
        initialPrintShops={initialPrintShops}
      />
      <Features />
      <HowItWorks />
      <InteractiveMap 
        initialUserLocation={userLocation}
        initialPrintShops={initialPrintShops}
      />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </main>
  )
}