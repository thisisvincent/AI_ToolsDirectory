/*
  # Migrate User Favourites to Unified Favourites Table

  1. Changes
    - Copy existing data from user_favourites to favourites table
    - Map old schema to new unified schema
    - Set item_type to 'tool' for all migrated records
    - Use tool_name as item_id for uniqueness

  2. Data Mapping
    - user_id -> user_id
    - tool_name -> item_name and item_id
    - tool_description -> item_description
    - tool_url -> item_url
    - tool_image_url -> item_image_url
    - tool_category -> stored in metadata JSON
    - item_type -> 'tool'
*/

-- Insert data from user_favourites into favourites, avoiding duplicates
INSERT INTO favourites (
  user_id,
  item_type,
  item_id,
  item_name,
  item_url,
  item_description,
  item_image_url,
  metadata,
  created_at
)
SELECT 
  uf.user_id,
  'tool' as item_type,
  uf.tool_name as item_id,
  uf.tool_name as item_name,
  uf.tool_url,
  uf.tool_description,
  uf.tool_image_url,
  jsonb_build_object('category', uf.tool_category) as metadata,
  uf.created_at
FROM user_favourites uf
WHERE NOT EXISTS (
  SELECT 1 
  FROM favourites f 
  WHERE f.user_id = uf.user_id 
  AND f.item_type = 'tool' 
  AND f.item_id = uf.tool_name
);
