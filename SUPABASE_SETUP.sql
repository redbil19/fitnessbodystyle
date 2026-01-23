-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  slug TEXT UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT DO NOTHING;

-- RLS Policies for posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read published posts
CREATE POLICY "Allow public to read published posts"
ON posts
FOR SELECT
USING (published = true);

-- Policy: Allow authenticated users to read all posts (for admin)
CREATE POLICY "Allow authenticated users to read all posts"
ON posts
FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts"
ON posts
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Policy: Allow users to update their own posts
CREATE POLICY "Allow users to update their own posts"
ON posts
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Allow users to delete their own posts
CREATE POLICY "Allow users to delete their own posts"
ON posts
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for storage
CREATE POLICY "Allow public to read blog images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to upload blog images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to delete their own images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'blog-images' 
  AND auth.uid() = owner
);
