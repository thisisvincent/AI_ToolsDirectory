/*
  # Fix Favourites Item IDs to Match Tool IDs

  1. Changes
    - Update item_id in favourites table to match actual tool IDs from the application
    - Map based on URL matching since URLs are consistent
    - Use consistent lowercase hyphenated IDs

  2. Mapping
    - Jenni.ai -> jenni-ai
    - Isaac Editor -> isaac-editor
    - Notebook LLM -> notebook-llm
    - Researcher.life -> researcher-life
    - Aithor.com -> aithor
    - Abstract Generator - ChatGPT -> abstract-generator-chatgpt
    - Abstract Generator - Coral AI -> abstract-generator-coral
*/

-- Update Jenni.ai
UPDATE favourites 
SET item_id = 'jenni-ai'
WHERE item_url LIKE '%jenni.ai%' AND item_type = 'tool';

-- Update Isaac Editor
UPDATE favourites 
SET item_id = 'isaac-editor'
WHERE item_url LIKE '%isaaceditor.com%' AND item_type = 'tool';

-- Update Notebook LLM
UPDATE favourites 
SET item_id = 'notebook-llm'
WHERE item_url LIKE '%notebooklm.google.com%' AND item_type = 'tool';

-- Update Researcher.life
UPDATE favourites 
SET item_id = 'researcher-life'
WHERE item_url LIKE '%researcher.life%' AND item_type = 'tool';

-- Update Aithor.com
UPDATE favourites 
SET item_id = 'aithor'
WHERE item_url LIKE '%aithor.com%' AND item_type = 'tool';

-- Update Abstract Generator - ChatGPT
UPDATE favourites 
SET item_id = 'abstract-generator-chatgpt'
WHERE item_url LIKE '%chatgpt.com/g/g-4UWODpApy-abstract-generator%' AND item_type = 'tool';

-- Update Abstract Generator - Coral AI
UPDATE favourites 
SET item_id = 'abstract-generator-coral'
WHERE item_url LIKE '%getcoralai.com/abstract-generator%' AND item_type = 'tool';
