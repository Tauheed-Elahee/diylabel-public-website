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
    
    // Parse address components from Mapbox response
    const getContextValue = (type: string) => {
      const item = context.find((c: any) => c.id.includes(type))
      return item ? item.text : ''
    }

    // Extract address components
    const streetNumber = suggestion.address || ''
    const streetName = suggestion.text || ''
    const streetAddress = streetNumber ? `${streetNumber} ${streetName}` : streetName
    
    const city = getContextValue('place') || getContextValue('locality') || ''
    const province = getContextValue('region') || ''
    const country = getContextValue('country') || ''
    const postalCode = getContextValue('postcode') || ''

    // Convert country name to code
    const countryCode = country.toLowerCase() === 'canada' ? 'CA' : 
                      country.toLowerCase() === 'united states' ? 'US' : 
                      country

    const addressData = {
      fullAddress: suggestion.place_name || '',
      streetAddress: streetAddress,
      city: city,
      province: province,
      country: countryCode,
      postalCode: postalCode
    }

    onAddressSelect(addressData)
    
    if (onChange) {
      onChange(suggestion.place_name || '')
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