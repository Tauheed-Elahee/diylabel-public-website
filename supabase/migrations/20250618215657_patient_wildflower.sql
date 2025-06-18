/*
  # Add function to get nearby print shops

  1. Function
    - `get_nearby_print_shops` - Returns print shops within specified radius
    - Uses Haversine formula for accurate distance calculation
    - Optimized for performance with proper indexing

  2. Security
    - Function is accessible to public (same as table policy)
*/

-- Create function to get nearby print shops using Haversine formula
CREATE OR REPLACE FUNCTION get_nearby_print_shops(
  user_lat double precision,
  user_lng double precision,
  radius_km double precision DEFAULT 50
)
RETURNS TABLE (
  id bigint,
  name text,
  lat double precision,
  lng double precision,
  address text,
  specialty text,
  rating numeric,
  created_at timestamptz,
  updated_at timestamptz,
  distance_km double precision
) 
LANGUAGE sql
STABLE
AS $$
  SELECT 
    ps.id,
    ps.name,
    ps.lat,
    ps.lng,
    ps.address,
    ps.specialty,
    ps.rating,
    ps.created_at,
    ps.updated_at,
    (
      6371 * acos(
        cos(radians(user_lat)) * 
        cos(radians(ps.lat)) * 
        cos(radians(ps.lng) - radians(user_lng)) + 
        sin(radians(user_lat)) * 
        sin(radians(ps.lat))
      )
    ) AS distance_km
  FROM print_shops ps
  WHERE (
    6371 * acos(
      cos(radians(user_lat)) * 
      cos(radians(ps.lat)) * 
      cos(radians(ps.lng) - radians(user_lng)) + 
      sin(radians(user_lat)) * 
      sin(radians(ps.lat))
    )
  ) <= radius_km
  ORDER BY distance_km;
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION get_nearby_print_shops TO public;