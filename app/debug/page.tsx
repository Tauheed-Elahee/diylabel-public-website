import { headers } from 'next/headers'
import { getUserLocationFromHeaders } from '../../lib/geolocation'
import { printShopService } from '../../lib/supabase'

export const metadata = {
  title: 'Debug - DIY Label',
  description: 'Debug information for DIY Label geolocation and print shop data',
}

export default async function DebugPage() {
  // Get user location from Netlify IP geolocation
  const headersList = headers()
  const userLocation = getUserLocationFromHeaders(headersList)
  
  // Get all headers for debugging
  const allHeaders: Record<string, string> = {}
  headersList.forEach((value, key) => {
    allHeaders[key] = value
  })
  
  // Fetch nearby print shops
  let nearbyShops = []
  let shopsError = null
  try {
    nearbyShops = await printShopService.getNearby(
      userLocation.lat, 
      userLocation.lng, 
      50
    )
  } catch (error) {
    shopsError = error instanceof Error ? error.message : 'Unknown error'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 Debug Information
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Server-side geolocation and print shop data
          </p>
        </div>

        {/* User Location Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📍 Detected Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Location Data</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm"><strong>City:</strong> {userLocation.city}</p>
                <p className="text-sm"><strong>Latitude:</strong> {userLocation.lat}</p>
                <p className="text-sm"><strong>Longitude:</strong> {userLocation.lng}</p>
                <p className="text-sm"><strong>Source:</strong> {userLocation.source}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Netlify Geo Header</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto">
                  {allHeaders['x-nf-geo'] || 'Not available'}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Print Shops Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🏪 Nearby Print Shops
          </h2>
          {shopsError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">
                <strong>Error:</strong> {shopsError}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Found {nearbyShops.length} print shops within 50km
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearbyShops.slice(0, 6).map((shop) => (
                  <div key={shop.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {shop.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {shop.specialty}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {shop.distance_km ? `${shop.distance_km.toFixed(1)}km away` : 'Distance unknown'}
                    </p>
                    <div className="flex items-center text-yellow-500 mt-1">
                      <span className="text-xs">{shop.rating}</span>
                      <span className="ml-1 text-xs">★</span>
                    </div>
                  </div>
                ))}
              </div>
              {nearbyShops.length > 6 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                  ... and {nearbyShops.length - 6} more shops
                </p>
              )}
            </div>
          )}
        </div>

        {/* All Headers (for debugging) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔧 Request Headers
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-96">
              {JSON.stringify(allHeaders, null, 2)}
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}