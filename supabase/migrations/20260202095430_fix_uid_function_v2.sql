/*
  # Fix uid() Function for Proper JWT Claims Handling

  1. Changes
    - Update uid() function to properly handle NULL and empty JWT claims
    - Return NULL when JWT claims are not available instead of causing errors
    - Ensure proper BIGINT type conversion

  2. Security
    - Maintains existing security model
    - No changes to RLS policies needed
*/

-- Recreate with better NULL handling (using CREATE OR REPLACE to avoid dependency issues)
CREATE OR REPLACE FUNCTION uid()
RETURNS BIGINT AS $$
DECLARE
  claims TEXT;
  user_id TEXT;
BEGIN
  -- Try to get the JWT claims, return NULL if not available
  BEGIN
    claims := current_setting('request.jwt.claims', true);
  EXCEPTION
    WHEN OTHERS THEN
      RETURN NULL;
  END;

  -- If claims is NULL or empty, return NULL
  IF claims IS NULL OR claims = '' THEN
    RETURN NULL;
  END IF;

  -- Try to extract the 'sub' field from the JSON claims
  BEGIN
    user_id := claims::json->>'sub';

    -- If sub is NULL or empty, return NULL
    IF user_id IS NULL OR user_id = '' THEN
      RETURN NULL;
    END IF;

    -- Try to convert to BIGINT
    RETURN user_id::BIGINT;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN NULL;
  END;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
