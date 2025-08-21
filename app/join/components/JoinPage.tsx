'use client'

import { useState } from 'react'
import { ArrowRight, Play, CheckCircle, Printer, Users, TrendingUp, DollarSign, Clock, MapPin, Phone, Mail, Globe, Shirt, Package, Coffee, Image, Loader, AlertCircle } from 'lucide-react'
import AddressAutocomplete from './AddressAutocomplete'

// Define types for form data
interface BusinessHours {
  monday: { open: number; close: number } | boolean
  tuesday: { open: number; close: number } | boolean
  wednesday: { open: number; close: number } | boolean
  thursday: { open: number; close: number } | boolean
  friday: { open: number; close: number } | boolean
  saturday: { open: number; close: number } | boolean
  sunday: { open: number; close: number } | boolean
}

interface FormData {
  businessName: string
  contactName: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  country: string
  province: string
  postalCode: string
  businessHours: BusinessHours
  clothingTypes: string[]
  currentCapacity: string
  experience: string
  equipment: string[]
  additionalInfo: string
  businessType: string
  ownershipRole: string
  unitNumber: string
}

type DayKey = keyof BusinessHours

export default function JoinPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    country: 'CA', // Default to Canada
    province: '',
    postalCode: '',
    businessHours: {
      monday: { open: 900, close: 1700 },
      tuesday: { open: 900, close: 1700 },
      wednesday: { open: 900, close: 1700 },
      thursday: { open: 900, close: 1700 },
      friday: { open: 900, close: 1700 },
      saturday: { open: 1000, close: 1600 },
      sunday: false
    },
    clothingTypes: [] as string[],
    currentCapacity: '',
    experience: '',
    equipment: [] as string[],
    additionalInfo: '',
    businessType: '',
    ownershipRole: '',
    unitNumber: ''
  })

  // Handle address autocomplete selection
  const handleAddressSelect = (addressData: {
    fullAddress: string
    streetAddress: string
    city: string
    province: string
    country: string
    postalCode: string
  }) => {
    setFormData(prev => ({
      ...prev,
      address: addressData.streetAddress,
      city: addressData.city,
      province: addressData.province,
      country: addressData.country,
      postalCode: addressData.postalCode
    }))
  }

  // Get provinces/states based on selected country
  const getProvincesForCountry = (countryCode: string) => {
    if (countryCode === 'CA') {
      return [
        { code: 'AB', name: 'Alberta' },
        { code: 'BC', name: 'British Columbia' },
        { code: 'MB', name: 'Manitoba' },
        { code: 'NB', name: 'New Brunswick' },
        { code: 'NL', name: 'Newfoundland and Labrador' },
        { code: 'NS', name: 'Nova Scotia' },
        { code: 'ON', name: 'Ontario' },
        { code: 'PE', name: 'Prince Edward Island' },
        { code: 'QC', name: 'Quebec' },
        { code: 'SK', name: 'Saskatchewan' },
        { code: 'NT', name: 'Northwest Territories' },
        { code: 'NU', name: 'Nunavut' },
        { code: 'YT', name: 'Yukon' }
      ]
    } else if (countryCode === 'US') {
      return [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' },
        { code: 'DC', name: 'District of Columbia' }
      ]
    } else {
      // For other countries, return empty array (could be expanded later)
      return []
    }
  }

  // Get available countries (focusing on North America initially)
  const availableCountries = [
    { code: 'CA', name: 'Canada' },
    { code: 'US', name: 'United States' }
  ]

  // Handle country change and reset province
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value
    setFormData(prev => ({
      ...prev,
      country: newCountry,
      province: '' // Reset province when country changes
    }))
  }

  const equipmentOptions = [
    'Screen Printing Press',
    'DTG Printer',
    'Heat Press',
    'Embroidery Machine',
    'Vinyl Cutter',
    'Sublimation Printer',
    'Large Format Printer',
    'Laser Engraver',
    'Automatic Press',
    'Manual Press',
    'Conveyor Dryer',
    'Other Equipment'
  ]

  const productCategories = {
    apparel: [
      'T-Shirts',
      'Hoodies',
      'Sweatshirts',
      'Tank Tops',
      'Long Sleeves',
      'Polo Shirts',
      'Jackets',
      'Hats/Caps',
      'Tote Bags',
      'Other Apparel'
    ],
    drinkware: [
      'Mugs',
      'Water Bottles',
      'Tumblers',
      'Coffee Cups',
      'Wine Glasses',
      'Other Drinkware'
    ],
    homeDecor: [
      'Canvas Prints',
      'Posters',
      'Wall Art',
      'Throw Pillows',
      'Blankets',
      'Phone Cases',
      'Keychains',
      'Stickers',
      'Other Home Decor'
    ]
  }

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleHoursChange = (day: DayKey, field: 'open' | 'close' | 'closed' | '24hour', value: string | boolean) => {
    setFormData(prev => {
      const newBusinessHours = { ...prev.businessHours }
      
      if (field === 'closed' && value === true) {
        // Set day to closed (false)
        newBusinessHours[day] = false
      } else if (field === '24hour' && value === true) {
        // Set day to 24 hours (true)
        newBusinessHours[day] = true
      } else if ((field === 'closed' || field === '24hour') && value === false) {
        // Set day to open with default hours
        newBusinessHours[day] = { open: 900, close: 1700 }
      } else if (field === 'open' || field === 'close') {
        // Convert HH:MM to 4-digit number
        const timeNumber = parseTimeInput(value.toString())
        const currentDayData = prev.businessHours[day]
        
        // Ensure we have a valid object to work with
        let currentHours: { open: number; close: number }
        if (typeof currentDayData === 'object' && currentDayData !== null && !Array.isArray(currentDayData) && typeof currentDayData !== 'boolean') {
          currentHours = currentDayData as { open: number; close: number }
        } else {
          currentHours = { open: 900, close: 1700 }
        }
        
        newBusinessHours[day] = {
          open: field === 'open' ? timeNumber : currentHours.open,
          close: field === 'close' ? timeNumber : currentHours.close
        }
      }
      
      return {
        ...prev,
        businessHours: newBusinessHours
      }
    })
  }

  // Helper function to convert 4-digit number to HH:MM for input display
  const formatTimeForInput = (time: number): string => {
    const timeString = time.toString().padStart(4, '0')
    return `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}`
  }

  // Helper function to convert HH:MM input to 4-digit number
  const parseTimeInput = (timeString: string): number => {
    const cleanTime = timeString.replace(':', '')
    return parseInt(cleanTime, 10)
  }

  // Helper function to validate time number
  const isValidTime = (time: number): boolean => {
    if (time < 0 || time > 2359) return false
    const minutes = time % 100
    const hours = Math.floor(time / 100)
    return hours <= 23 && minutes <= 59
  }

  // Helper function to format time for display
  const formatTimeDisplay = (time: number): string => {
    const timeString = time.toString().padStart(4, '0')
    const hours = timeString.slice(0, 2)
    const minutes = timeString.slice(2, 4)
    return `${hours}:${minutes}`
  }

  // Helper function to convert 4-digit number to HH:MM for input display
  const formatTimeForInputOld = (time: string): string => {
    if (time.length === 4) {
      return `${time.slice(0, 2)}:${time.slice(2, 4)}`
    }
    return time
  }

  // Helper function to check if a day is closed
  const isDayClosed = (day: DayKey): boolean => {
    return formData.businessHours[day] === false
  }

  // Helper function to check if a day is 24 hours
  const isDay24Hours = (day: DayKey): boolean => {
    return formData.businessHours[day] === true
  }

  // Helper function to get day hours  
  const getDayHours = (day: DayKey): { open: number; close: number } => {
    const dayData = formData.businessHours[day]
    if (typeof dayData === 'object') {
      return dayData
    }
    return { open: 900, close: 1700 }
  }
  const handleClothingTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      clothingTypes: prev.clothingTypes.includes(type)
        ? prev.clothingTypes.filter(t => t !== type)
        : [...prev.clothingTypes, type]
    }))
  }

  const handleEquipmentChange = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }))
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // Format based on length
    if (phoneNumber.length === 0) return ''
    if (phoneNumber.length <= 3) return `(${phoneNumber}`
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  // Handle phone number input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/.netlify/functions/submit-partnership-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          contactName: formData.contactName,
          businessType: formData.businessType,
          ownershipRole: formData.ownershipRole,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          address: formData.address,
          unitNumber: formData.unitNumber,
          city: formData.city,
          country: formData.country,
          province: formData.province,
          postalCode: formData.postalCode,
          businessHours: formData.businessHours,
          clothingTypes: formData.clothingTypes,
          currentCapacity: formData.currentCapacity,
          experience: formData.experience,
          equipment: formData.equipment,
          additionalInfo: formData.additionalInfo
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Application submitted successfully!')
        
        // Reset form on success
        setFormData({
          businessName: '',
          contactName: '',
          email: '',
          phone: '',
          website: '',
          address: '',
          city: '',
          country: 'CA',
          province: '',
          postalCode: '',
          businessHours: {
            monday: { open: 900, close: 1700 },
            tuesday: { open: 900, close: 1700 },
            wednesday: { open: 900, close: 1700 },
            thursday: { open: 900, close: 1700 },
            friday: { open: 900, close: 1700 },
            saturday: { open: 1000, close: 1600 },
            sunday: false
          },
          clothingTypes: [],
          currentCapacity: '',
          experience: '',
          equipment: [],
          additionalInfo: '',
          businessType: '',
          ownershipRole: '',
          unitNumber: ''
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Video Sales Letter Section */}
      <section className="pt-24 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Hot Leads in Your Area Want T-Shirts
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Connecting designers and local print shop owners to give the best value to customers.
            </p>
          </div>

          {/* Video Container */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-300 transform hover:scale-110"
                  >
                    <Play className="w-16 h-16 text-white ml-2" />
                  </button>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">DIY Label Demo</h3>
                    <p className="text-sm opacity-90">4:12 • See how we connect your neighbours to you</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video player would be embedded here</p>
                    <p className="text-sm text-gray-300 mt-2">Integration with your video hosting platform</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Additional Revenue Stream</h3>
             <p className="text-gray-600 dark:text-gray-300 text-sm">New income from on-demand orders</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Steady Orders</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Consistent daily orders from local customers</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Marketing Costs</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">We bring customers to you - zero acquisition cost</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
              <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scale Your Business</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Grow beyond walk-in customers with online orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-up Form Section */}
      <section id="signup-form" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join Our Network?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fill out the form below and we'll contact you within 24 hours to discuss partnership opportunities and get you started.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-primary-600" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your Print Shop Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select business type</option>
                      <option value="independent">Independent Business</option>
                      <option value="franchise">Franchise</option>
                      <option value="chain">Chain Store</option>
                    </select>
                  </div>
                  {(formData.businessType === 'franchise' || formData.businessType === 'chain') && (
                    <div>
                      <label htmlFor="ownershipRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Role *
                      </label>
                      <select
                        id="ownershipRole"
                        name="ownershipRole"
                        required
                        value={formData.ownershipRole}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select your role</option>
                        <option value="owner">Owner/Corporate Representative</option>
                        <option value="franchisee">Franchisee/Local Owner</option>
                        <option value="manager">Store Manager</option>
                        <option value="authorized">Authorized Representative</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://yourprintshop.com"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address (Number & Name) *
                    </label>
                    <AddressAutocomplete
                      value={formData.address}
                      onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                      onAddressSelect={handleAddressSelect}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Start typing your address..."
                    />
                  </div>
                  <div>
                    <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit/Suite Number
                    </label>
                    <input
                      type="text"
                      id="unitNumber"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Unit 101, Suite A, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Toronto"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleCountryChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Country</option>
                      {availableCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.country === 'US' ? 'State *' : 'Province *'}
                    </label>
                    <select
                      id="province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled={!formData.country}
                    >
                      <option value="">
                        {formData.country === 'US' ? 'Select State' : 'Select Province'}
                      </option>
                      {getProvincesForCountry(formData.country).map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.country === 'US' ? 'ZIP Code *' : 'Postal Code *'}
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={formData.country === 'US' ? '12345' : 'K1A 0A6'}
                    />
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {daysOfWeek.map((day) => (
                    <div key={day.key} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[72px]">
                      <div className="w-24 flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {day.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-1 min-h-[40px]">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isDayClosed(day.key as DayKey)}
                            onChange={(e) => handleHoursChange(day.key as DayKey, 'closed', e.target.checked)}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Closed</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isDay24Hours(day.key as DayKey)}
                            onChange={(e) => handleHoursChange(day.key as DayKey, '24hour', e.target.checked)}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">24 Hours</span>
                        </label>
                        
                        {!isDayClosed(day.key as DayKey) && !isDay24Hours(day.key as DayKey) && (
                          <>
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-gray-600 dark:text-gray-400">Open:</label>
                              <input
                                type="time"
                                value={formatTimeForInput(getDayHours(day.key as DayKey).open)}
                                onChange={(e) => handleHoursChange(day.key as DayKey, 'open', e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-gray-600 dark:text-gray-400">Close:</label>
                              <input
                                type="time"
                                value={formatTimeForInput(getDayHours(day.key as DayKey).close)}
                                onChange={(e) => handleHoursChange(day.key as DayKey, 'close', e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clothing Types */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-primary-600" />
                  Products You Can Print
                </h3>
                
                {/* Apparel Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Shirt className="w-4 h-4 text-primary-600" />
                    Apparel
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {productCategories.apparel.map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.clothingTypes.includes(type)}
                          onChange={() => handleClothingTypeChange(type)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Drinkware Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-primary-600" />
                    Drinkware
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {productCategories.drinkware.map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.clothingTypes.includes(type)}
                          onChange={() => handleClothingTypeChange(type)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Home Decor Section */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Image className="w-4 h-4 text-primary-600" />
                    Home Decor
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {productCategories.homeDecor.map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.clothingTypes.includes(type)}
                          onChange={() => handleClothingTypeChange(type)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary-600" />
                  Business Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="currentCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Daily Capacity
                      </label>
                      <select
                        id="currentCapacity"
                        name="currentCapacity"
                        value={formData.currentCapacity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select capacity</option>
                        <option value="1-10">1-10 items per day</option>
                        <option value="11-25">11-25 items per day</option>
                        <option value="26-50">26-50 items per day</option>
                        <option value="51-100">51-100 items per day</option>
                        <option value="100+">100+ items per day</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years in Business
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select experience</option>
                        <option value="less-than-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="4-7">4-7 years</option>
                        <option value="8-15">8-15 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Equipment & Technology
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {equipmentOptions.map((equipment) => (
                        <label key={equipment} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.equipment.includes(equipment)}
                            onChange={() => handleEquipmentChange(equipment)}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{equipment}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about your business goals, any questions you have, or anything else you'd like us to know..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center justify-center text-green-800 dark:text-green-200">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center justify-center text-red-800 dark:text-red-200">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 transform hover:scale-105 hover:shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join the Network
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  We'll contact you within 24 hours to discuss partnership opportunities
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Setup Fees</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Join our network at no cost and start receiving orders immediately</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customer Connection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Create a direct connection with customers for repeatable business</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Local Focus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Orders are routed to the closest print shop for faster delivery</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}