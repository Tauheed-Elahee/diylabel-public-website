/*
  # Create partnership applications table

  1. New Tables
    - `partnership_applications`
      - `id` (uuid, primary key)
      - `business_name` (text, required)
      - `contact_name` (text, required)
      - `business_type` (text, required)
      - `ownership_role` (text, optional)
      - `email` (text, required, unique)
      - `phone` (text, required)
      - `website` (text, optional)
      - `street_address` (text, required)
      - `unit_number` (text, optional)
      - `city` (text, required)
      - `country` (text, required)
      - `province` (text, required)
      - `postal_code` (text, required)
      - `business_hours` (jsonb, stores weekly schedule)
      - `products_offered` (text[], array of product types)
      - `daily_capacity` (text, optional)
      - `years_experience` (text, optional)
      - `equipment` (text[], array of equipment types)
      - `additional_info` (text, optional)
      - `application_status` (text, default 'pending')
      - `reviewed_at` (timestamptz, optional)
      - `reviewed_by` (text, optional)
      - `notes` (text, optional)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `partnership_applications` table
    - Add policy for public insert (anyone can apply)
    - Add policy for authenticated admin read/update

  3. Indexes
    - Add index on email for uniqueness
    - Add index on application_status for filtering
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS partnership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  business_type text NOT NULL CHECK (business_type IN ('independent', 'franchise', 'chain')),
  ownership_role text CHECK (ownership_role IN ('owner', 'franchisee', 'manager', 'authorized')),
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  website text,
  street_address text NOT NULL,
  unit_number text,
  city text NOT NULL,
  country text NOT NULL CHECK (country IN ('CA', 'US')),
  province text NOT NULL,
  postal_code text NOT NULL,
  business_hours jsonb DEFAULT '{}',
  products_offered text[] DEFAULT '{}',
  daily_capacity text CHECK (daily_capacity IN ('1-10', '11-25', '26-50', '51-100', '100+')),
  years_experience text CHECK (years_experience IN ('less-than-1', '1-3', '4-7', '8-15', '15+')),
  equipment text[] DEFAULT '{}',
  additional_info text,
  application_status text DEFAULT 'pending' CHECK (application_status IN ('pending', 'under_review', 'approved', 'rejected')),
  reviewed_at timestamptz,
  reviewed_by text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE partnership_applications ENABLE ROW LEVEL SECURITY;

-- Policy for public insert (anyone can submit an application)
CREATE POLICY "Anyone can submit partnership application"
  ON partnership_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for authenticated users to read all applications (for admin dashboard)
CREATE POLICY "Authenticated users can read applications"
  ON partnership_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update applications (for admin review)
CREATE POLICY "Authenticated users can update applications"
  ON partnership_applications
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_partnership_applications_email ON partnership_applications (email);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_status ON partnership_applications (application_status);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_created_at ON partnership_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_city ON partnership_applications (city);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_province ON partnership_applications (province);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_partnership_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_partnership_applications_updated_at
  BEFORE UPDATE ON partnership_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_partnership_applications_updated_at();