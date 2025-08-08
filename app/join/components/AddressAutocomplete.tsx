'use client'

import { useEffect, useRef, useState } from 'react'

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    fullAddress: string
    streetAddress: string
    city: string
    province: string
    country: string
    postalCode: string
  }) => void
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export default function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Start typing your address...",
  className = "",
  value = "",
  onChange
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Mapbox token from environment
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  useEffect(() => {
    if (!mapboxToken) {
      setError('Mapbox access token not configured')
      return
    }
    setIsLoaded(true)
  }, [mapboxToken])

  // Debounced search function
  const searchAddresses = async (query: string) => {
    if (!query || query.length < 3 || !mapboxToken) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${mapboxToken}&` +
        `country=ca,us&` +
        `types=address&` +
        `autocomplete=true&` +
        `limit=5`
      )

      if (!response.ok) {
        throw new Error(`Mapbox API error: ${response.status}`)
      }

      const data = await response.json()
      setSuggestions(data.features || [])
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Address search error:', error)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Debounce timer
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAddresses(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, mapboxToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    const context = suggestion.context || []
    
    // Parse address components from Mapbox response with enhanced province detection
    const getContextValue = (type: string) => {
      const item = context.find((c: any) => c.id.includes(type))
      return item ? item.text : ''
    }

    // Extract ONLY street number and name from the suggestion
    // suggestion.address contains the street number
    // suggestion.text contains the street name
    const streetName = suggestion.text || ''
    const streetNumber = suggestion.address || ''
    
    // Combine street number and name for clean street address
    let streetAddress = ''
    if (streetNumber && streetName) {
      streetAddress = `${streetNumber} ${streetName}`
    } else if (streetName) {
      // If no street number, just use the street name
      streetAddress = streetName
    } else {
      // Fallback to parsing from place_name
      const addressParts = suggestion.place_name.split(',')
      streetAddress = addressParts[0]?.trim() || ''
    }
    
    const city = getContextValue('place') || getContextValue('locality') || ''
    
    // Enhanced province/state detection with comprehensive mapping
    const regionContext = context.find((c: any) => c.id.includes('region'))
    let province = ''
    if (regionContext) {
      // Try short_code first (e.g., "ON", "QC"), then fall back to text
      province = regionContext.short_code || regionContext.text || ''
    }
    
    const country = getContextValue('country') || ''
    const postalCode = getContextValue('postcode') || ''

    // Convert country name to proper code
    let countryCode = ''
    if (country.toLowerCase().includes('canada')) {
      countryCode = 'CA'
    } else if (country.toLowerCase().includes('united states') || country.toLowerCase().includes('usa')) {
      countryCode = 'US'
    } else {
      countryCode = country
    }

    // Enhanced province/state code conversion
    let provinceCode = ''
    if (countryCode === 'CA') {
      // Comprehensive Canadian provinces mapping
      const canadianProvinces: { [key: string]: string } = {
        // Full names
        'alberta': 'AB',
        'british columbia': 'BC',
        'manitoba': 'MB',
        'new brunswick': 'NB',
        'newfoundland and labrador': 'NL',
        'nova scotia': 'NS',
        'ontario': 'ON',
        'prince edward island': 'PE',
        'quebec': 'QC',
        'québec': 'QC',
        'saskatchewan': 'SK',
        'northwest territories': 'NT',
        'nunavut': 'NU',
        'yukon': 'YT',
        // Short codes (in case Mapbox returns these)
        'ab': 'AB',
        'bc': 'BC', 'b.c.': 'BC',
        'mb': 'MB',
        'nb': 'NB',
        'nl': 'NL',
        'ns': 'NS',
        'on': 'ON',
        'pe': 'PE',
        'qc': 'QC',
        'sk': 'SK', 'sask': 'SK',
        'nt': 'NT',
        'nu': 'NU',
        'yt': 'YT'
      }
      
      // Try exact match first, then lowercase match
      provinceCode = canadianProvinces[province] || canadianProvinces[province.toLowerCase()] || province
    } else if (countryCode === 'US') {
      // Comprehensive US states mapping
      const usStates: { [key: string]: string } = {
        // Full names
        'california': 'CA',
        'new york': 'NY',
        'texas': 'TX',
        'florida': 'FL',
        'illinois': 'IL',
        'pennsylvania': 'PA',
        'ohio': 'OH',
        'georgia': 'GA',
        'north carolina': 'NC',
        'michigan': 'MI',
        'new jersey': 'NJ',
        'virginia': 'VA',
        'washington': 'WA',
        'arizona': 'AZ',
        'massachusetts': 'MA',
        'tennessee': 'TN',
        'indiana': 'IN',
        'missouri': 'MO',
        'maryland': 'MD',
        'wisconsin': 'WI',
        'colorado': 'CO',
        'minnesota': 'MN',
        'south carolina': 'SC',
        'alabama': 'AL',
        'louisiana': 'LA',
        'kentucky': 'KY',
        'oregon': 'OR',
        'oklahoma': 'OK',
        'connecticut': 'CT',
        'utah': 'UT',
        'iowa': 'IA',
        'nevada': 'NV',
        'arkansas': 'AR',
        'mississippi': 'MS',
        'kansas': 'KS',
        'new mexico': 'NM',
        'nebraska': 'NE',
        'west virginia': 'WV',
        'idaho': 'ID',
        'hawaii': 'HI',
        'new hampshire': 'NH',
        'maine': 'ME',
        'montana': 'MT',
        'rhode island': 'RI',
        'delaware': 'DE',
        'south dakota': 'SD',
        'north dakota': 'ND',
        'alaska': 'AK',
        'vermont': 'VT',
        'wyoming': 'WY',
        'district of columbia': 'DC',
        // Short codes (in case Mapbox returns these)
        'ca': 'CA', 'ny': 'NY', 'tx': 'TX', 'fl': 'FL', 'il': 'IL',
        'pa': 'PA', 'oh': 'OH', 'ga': 'GA', 'nc': 'NC', 'mi': 'MI',
        'nj': 'NJ', 'va': 'VA', 'wa': 'WA', 'az': 'AZ', 'ma': 'MA',
        'tn': 'TN', 'in': 'IN', 'mo': 'MO', 'md': 'MD', 'wi': 'WI',
        'co': 'CO', 'mn': 'MN', 'sc': 'SC', 'al': 'AL', 'la': 'LA',
        'ky': 'KY', 'or': 'OR', 'ok': 'OK', 'ct': 'CT', 'ut': 'UT',
        'ia': 'IA', 'nv': 'NV', 'ar': 'AR', 'ms': 'MS', 'ks': 'KS',
        'nm': 'NM', 'ne': 'NE', 'wv': 'WV', 'id': 'ID', 'hi': 'HI',
        'nh': 'NH', 'me': 'ME', 'mt': 'MT', 'ri': 'RI', 'de': 'DE',
        'sd': 'SD', 'nd': 'ND', 'ak': 'AK', 'vt': 'VT', 'wy': 'WY',
        'dc': 'DC'
      }
      
      // Try exact match first, then lowercase match
      provinceCode = usStates[province] || usStates[province.toLowerCase()] || province
    } else {
      // For other countries, use the province as-is
      provinceCode = province
    }

    // Debug logging to help troubleshoot
    console.log('Address parsing debug:', {
      suggestion: suggestion,
      extractedProvince: province,
      mappedProvinceCode: provinceCode,
      regionContext: regionContext
    })

    const addressData = {
      fullAddress: suggestion.place_name,
      streetAddress: streetAddress,
      city: city,
      province: provinceCode,
      country: countryCode,
      postalCode: postalCode
    }

    onAddressSelect(addressData)
    
    if (onChange) {
      onChange(streetAddress)
    }
    
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setSuggestions([])
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  if (error) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          className={className}
          placeholder={placeholder}
        />
        <div className="absolute top-full left-0 mt-1 text-xs text-amber-600 dark:text-amber-400">
          Address autocomplete unavailable - manual entry required
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => value.length >= 3 && setShowSuggestions(suggestions.length > 0)}
        className={className}
        placeholder={isLoaded ? "Start typing your address..." : placeholder}
        disabled={!isLoaded}
        autoComplete="off"
      />
      
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 ${
                index === selectedIndex 
                  ? 'bg-primary-50 dark:bg-primary-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {suggestion.text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {suggestion.place_name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}