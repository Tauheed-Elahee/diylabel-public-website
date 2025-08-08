/*
  # Update business hours to use boolean format

  1. Schema Changes
    - Update business_hours field to support boolean values
    - Boolean true = open 24 hours
    - Boolean false = closed for the day
    - Object with open/close times = specific hours
    - Remove string "closed" format

  2. Data Format
    - Closed day: false
    - 24-hour day: true  
    - Specific hours: { "open": 900, "close": 1700 }

  3. Validation
    - Add validation function for new boolean format
    - Ensure proper time ranges and logical validation
*/

-- Drop existing table to recreate with updated boolean format
DROP TABLE IF EXISTS partnership_applications CASCADE;

-- Create updated partnership applications table with boolean time format
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

-- Create function to validate business hours with boolean format
CREATE OR REPLACE FUNCTION validate_business_hours_boolean(hours jsonb)
RETURNS boolean AS $$
DECLARE
  day_name text;
  day_data jsonb;
  open_time integer;
  close_time integer;
BEGIN
  -- Check each day of the week
  FOR day_name IN SELECT unnest(ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']) LOOP
    day_data := hours->day_name;
    
    -- Skip if day is not defined
    IF day_data IS NULL THEN
      CONTINUE;
    END IF;
    
    -- If day is boolean false (closed)
    IF day_data = 'false'::jsonb THEN
      CONTINUE;
    END IF;
    
    -- If day is boolean true (24 hours)
    IF day_data = 'true'::jsonb THEN
      CONTINUE;
    END IF;
    
    -- If day has specific hours, it should be an object with open and close times as numbers
    IF jsonb_typeof(day_data) = 'object' THEN
      -- Check if open and close fields exist and are numbers
      IF NOT (day_data ? 'open' AND day_data ? 'close') THEN
        RETURN false;
      END IF;
      
      -- Extract times as integers
      open_time := (day_data->>'open')::integer;
      close_time := (day_data->>'close')::integer;
      
      -- Validate time ranges (0000-2359)
      IF open_time < 0 OR open_time > 2359 OR close_time < 0 OR close_time > 2359 THEN
        RETURN false;
      END IF;
      
      -- Validate minute values (00-59)
      IF (open_time % 100) > 59 OR (close_time % 100) > 59 THEN
        RETURN false;
      END IF;
      
      -- Validate hour values (00-23)
      IF (open_time / 100) > 23 OR (close_time / 100) > 23 THEN
        RETURN false;
      END IF;
      
      -- Validate logical order (open < close for same day)
      IF open_time >= close_time THEN
        RETURN false;
      END IF;
    ELSE
      -- Day data is neither boolean nor a valid object
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Add constraint to validate business hours format
ALTER TABLE partnership_applications 
ADD CONSTRAINT valid_business_hours_boolean 
CHECK (business_hours IS NULL OR validate_business_hours_boolean(business_hours));

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