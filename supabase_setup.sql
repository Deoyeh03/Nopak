-- 1. Create a media storage table to keep track of uploaded assets
CREATE TABLE IF NOT EXISTS public.gallery_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    caption TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create a dynamic configuration table for editable text content
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_assets
-- Allow public to select/read
CREATE POLICY "Public can view gallery assets" ON public.gallery_assets FOR SELECT USING (true);
-- Allow authenticated admins to insert, update, and delete
CREATE POLICY "Admins can insert gallery assets" ON public.gallery_assets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update gallery assets" ON public.gallery_assets FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete gallery assets" ON public.gallery_assets FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for site_settings
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Storage Bucket Configuration
-- Create the bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('nopak-public-assets', 'nopak-public-assets', true) ON CONFLICT DO NOTHING;

-- Storage RLS Policies
-- Allow public access to view files
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'nopak-public-assets');

-- Allow authenticated admins to upload, update, and delete files
CREATE POLICY "Admin Upload Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'nopak-public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'nopak-public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Access" ON storage.objects FOR DELETE USING (bucket_id = 'nopak-public-assets' AND auth.role() = 'authenticated');

-- 4. Initial Site Settings
INSERT INTO public.site_settings (key, value) VALUES 
('hero_title', 'High-Quality Property &<br />Construction Solutions'),
('hero_subtitle', 'Premium services for Wendy Houses, Tree Felling, Renovations, Swimming Pools, and Plumbing across Gauteng.'),
('contact_phone', '27678224890'),
('whatsapp_message', 'Hi Nopak Projects, I would like to request a quote...')
ON CONFLICT (key) DO NOTHING;
