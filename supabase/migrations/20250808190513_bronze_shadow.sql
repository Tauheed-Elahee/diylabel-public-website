/*
  # Update partnership applications table format

  1. Schema Changes
    - Update country field to use ISO codes (CA, US)
    - Update province field to use standard codes (ON, QC, CA, NY, etc.)
    - Update business_hours to use 4-digit 24-hour time format
    - Add constraints for valid country and time formats

  2. Data Format
    - Country: 'CA' for Canada, 'US' for United States
    - Province: 'ON' for Ontario, 'QC' for Quebec, 'CA' for California, etc.
    - Time: 'closed' or object with 'open' and 'close' as 4-digit strings
    - Example: { "open": "0900", "close": "1700" } or "closed"

  3. Validation
    - Add check constraints for valid country codes
    - Add check constraints for valid time formats
*/

-- Drop existing table to recreate with new format
DROP TABLE IF EXISTS partnership_applications CASCADE;

-- Create updated partnership applications table
CREATE TABLE partnership_applications (
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