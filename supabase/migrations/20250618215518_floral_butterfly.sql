/*
  # Create print shops table

  1. New Tables
    - `print_shops`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, not null) - Name of the print shop
      - `lat` (double precision, not null) - Latitude coordinate
      - `lng` (double precision, not null) - Longitude coordinate  
      - `address` (text, not null) - Full address of the print shop
      - `specialty` (text, not null) - Print shop specialty/focus area
      - `rating` (numeric, not null) - Rating out of 5.0
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `print_shops` table
    - Add policy for public read access (since this is public directory data)

  3. Indexes
    - Add spatial index for lat/lng coordinates for efficient location queries
    - Add text search index for name and specialty
*/

-- Create the print_shops table
CREATE TABLE IF NOT EXISTS print_shops (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  address text NOT NULL,
  specialty text NOT NULL,
  rating numeric(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE print_shops ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (print shops are public directory information)
CREATE POLICY "Print shops are publicly readable"
  ON print_shops
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_print_shops_location ON print_shops (lat, lng);
CREATE INDEX IF NOT EXISTS idx_print_shops_name ON print_shops USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_print_shops_specialty ON print_shops USING gin(to_tsvector('english', specialty));
CREATE INDEX IF NOT EXISTS idx_print_shops_address ON print_shops USING gin(to_tsvector('english', address));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_print_shops_updated_at
  BEFORE UPDATE ON print_shops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();