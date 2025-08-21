// Server-side geolocation utilities for Netlify

export interface NetlifyGeoLocation {
  city?: string
  country?: {
    code: string
    name: string
  }
  subdivision?: {
    code: string
    name: string
  }
  latitude?: number
  longitude?: number
  timezone?: string
}

export interface UserLocation {
  lat: number
  lng: number
  city: string
  source: 'netlify-ip' | 'browser-gps' | 'fallback'
}

// Parse Netlify's x-nf-geo header
export function parseNetlifyGeoHeader(geoHeader: string | null): UserLocation | null {
  if (!geoHeader) {
    return null
  }

  try {
    const geoData: NetlifyGeoLocation = JSON.parse(geoHeader)
    
    // Validate that we have the required data
    if (typeof geoData.latitude === 'number' && 
        typeof geoData.longitude === 'number' && 
        geoData.city) {
      
      // Format city name with province/state if available
      let cityName = geoData.city
      if (geoData.subdivision?.code && geoData.country?.code) {
        cityName = `${geoData.city}, ${geoData.subdivision.code}, ${geoData.country.code}`
      } else if (geoData.country?.code) {
        cityName = `${geoData.city}, ${geoData.country.code}`
      }

      return {
        lat: geoData.latitude,
        lng: geoData.longitude,
        city: cityName,
        source: 'netlify-ip'
      }
    }
  } catch (error) {
    console.warn('Failed to parse Netlify geo header:', error)
  }

  return null
}

// Fallback location (Ottawa, ON, Canada)
export function getFallbackLocation(): UserLocation {
  return {
    lat: 45.4215,
    lng: -75.6972,
    city: 'Ottawa, ON, Canada',
    source: 'fallback'
  }
}

// Get user location from Netlify headers or fallback
export function getUserLocationFromHeaders(headers: Headers): UserLocation {
  // Try to get location from Netlify's IP geolocation
  const netlifyGeo = headers.get('x-nf-geo')
  const parsedLocation = parseNetlifyGeoHeader(netlifyGeo)
  
  if (parsedLocation) {
    return parsedLocation
  }

  // Fallback to Ottawa if no geolocation data
  return getFallbackLocation()
}