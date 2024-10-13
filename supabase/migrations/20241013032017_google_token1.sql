-- Update the google_drive_tokens table to use TEXT for user_id
ALTER TABLE public.google_drive_tokens
ALTER COLUMN user_id TYPE TEXT;

-- Recreate the unique constraint on user_id
ALTER TABLE public.google_drive_tokens
DROP CONSTRAINT IF EXISTS unique_user_id;

ALTER TABLE public.google_drive_tokens
ADD CONSTRAINT unique_user_id UNIQUE (user_id);
