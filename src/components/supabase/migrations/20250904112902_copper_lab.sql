/*
  # Create Appointments System

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `name` (text, customer name)
      - `email` (text, customer email)
      - `phone` (text, customer phone)
      - `service` (text, type of service requested)
      - `message` (text, additional details)
      - `scheduled_at` (timestamptz, appointment date and time)
      - `status` (text, appointment status)
      - `created_at` (timestamptz, when appointment was created)
      - `updated_at` (timestamptz, when appointment was last updated)

  2. Security
    - Enable RLS on `appointments` table
    - Add policy for public insert (anyone can schedule)
    - Add policy for service role to manage appointments

  3. Indexes
    - Index on scheduled_at for efficient queries
    - Index on email for customer lookup
    - Index on status for filtering

  4. Functions
    - Auto-update timestamp function
    - Trigger for updated_at column
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL DEFAULT 'General Consultation',
  message text DEFAULT '',
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (schedule new ones)
CREATE POLICY "Public can schedule appointments"
  ON appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to manage all appointments
CREATE POLICY "Service role manages appointments"
  ON appointments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();