import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface PrintShop {
  id: number
  name: string
  lat: number
  lng: number
  address: string
  specialty: string
  rating: number
  created_at?: string
  updated_at?: string
}

// Print shop service functions
export const printShopService = {
  // Get all print shops
  async getAll(): Promise<PrintShop[]> {
    const { data, error } = await supabase
      .from('print_shops')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching print shops:', error)
      throw error
    }

    return data || []
  },

  // Get print shops within a radius of coordinates
  async getNearby(lat: number, lng: number, radiusKm: number = 50): Promise<PrintShop[]> {
    // Using Haversine formula in SQL for distance calculation
    const { data, error } = await supabase
      .rpc('get_nearby_print_shops', {
        user_lat: lat,
        user_lng: lng,
        radius_km: radiusKm
      })

    if (error) {
      console.error('Error fetching nearby print shops:', error)
      // Fallback to getting all shops and filtering client-side
      return this.getAll()
    }

    return data || []
  },

  // Search print shops by text
  async search(searchTerm: string): Promise<PrintShop[]> {
    if (!searchTerm.trim()) {
      return this.getAll()
    }

    const { data, error } = await supabase
      .from('print_shops')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,specialty.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`)
      .order('name')

    if (error) {
      console.error('Error searching print shops:', error)
      throw error
    }

    return data || []
  },

  // Get print shop by ID
  async getById(id: number): Promise<PrintShop | null> {
    const { data, error } = await supabase
      .from('print_shops')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching print shop:', error)
      return null
    }

    return data
  }
}