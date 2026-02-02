/*
  # Create Utility Functions

  1. Functions
    - `update_updated_at_column()` - Trigger function to auto-update updated_at timestamps
    - `uid()` - Helper function to get current user ID from JWT token
  
  2. Purpose
    - Provides reusable database functions for the application
    - Enables automatic timestamp updates on table modifications
    - Simplifies user identification in RLS policies
*/

-- Create update time trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Get JWT token user id function
CREATE OR REPLACE FUNCTION uid()
RETURNS BIGINT AS $$
BEGIN
  RETURN NULLIF(current_setting('request.jwt.claims', true), '')::json->>'sub';
END;
$$ LANGUAGE plpgsql STABLE;