'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface AddressComponents {
  streetNumber?: string
  route?: string
  locality?: string
  administrativeAreaLevel1?: string
  country?: string
  postalCode?: string
}

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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        // Check if Google Maps API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        
        if (!apiKey) {
          setError('Google Maps API key not configured')
          return
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places']
        })

        await loader.load()
        
        if (inputRef.current) {
          // Initialize autocomplete with restrictions for Canada and US
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: ['ca', 'us'] },
            fields: ['address_components', 'formatted_address', 'geometry']
          })

          // Listen for place selection
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace()
            
            if (place && place.address_components) {
              const components: AddressComponents = {}
              
              // Parse address components
              place.address_components.forEach((component) => {
                const types = component.types
                
                if (types.includes('street_number')) {
                  components.streetNumber = component.long_name
                } else if (types.includes('route')) {
                  components.route = component.long_name
                } else if (types.includes('locality')) {
                  components.locality = component.long_name
                } else if (types.includes('administrative_area_level_1')) {
                  components.administrativeAreaLevel1 = component.short_name
                } else if (types.includes('country')) {
                  components.country = component.short_name
                } else if (types.includes('postal_code')) {
                  components.postalCode = component.long_name
                }
              })

              // Build structured address data
              const streetAddress = [components.streetNumber, components.route]
                .filter(Boolean)
                .join(' ')

              const addressData = {
                fullAddress: place.formatted_address || '',
                streetAddress: streetAddress,
                city: components.locality || '',
                province: components.administrativeAreaLevel1 || '',
                country: components.country || '',
                postalCode: components.postalCode || ''
              }

              onAddressSelect(addressData)
            }
          })

          setIsLoaded(true)
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err)
        setError('Failed to load address autocomplete')
      }
    }

    initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onAddressSelect])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
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
        className={className}
        placeholder={isLoaded ? "Start typing your address..." : placeholder}
        disabled={!isLoaded}
      />
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}