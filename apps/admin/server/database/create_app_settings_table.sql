-- Create app_settings table for storing system-wide configuration
-- This table is designed as a singleton (single row) to store global settings

CREATE TABLE IF NOT EXISTS public.app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_settings JSONB NOT NULL DEFAULT '{
        "workDays": [0, 1, 2, 3, 4],
        "workHours": {
            "start": "09:00",
            "end": "17:00"
        },
        "holidayCountryCode": "EG",
        "customHolidays": [],
        "currency": "EGP"
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_app_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER app_settings_updated_at_trigger
    BEFORE UPDATE ON public.app_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_app_settings_updated_at();

-- Insert default settings row (if not exists)
INSERT INTO public.app_settings (system_settings)
VALUES ('{
    "workDays": [0, 1, 2, 3, 4],
    "workHours": {
        "start": "09:00",
        "end": "17:00"
    },
    "holidayCountryCode": "EG",
    "customHolidays": [],
    "currency": "EGP"
}'::jsonb)
ON CONFLICT DO NOTHING;

-- Add a constraint to ensure only one row exists (singleton pattern)
CREATE UNIQUE INDEX IF NOT EXISTS app_settings_singleton_idx ON public.app_settings ((true));

-- Add comment to the table
COMMENT ON TABLE public.app_settings IS 'Singleton table storing system-wide configuration settings';
COMMENT ON COLUMN public.app_settings.system_settings IS 'JSON object containing work days, work hours, holidays, and currency settings';

-- Enable RLS (Row Level Security)
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for app_settings
-- Admin can read and update settings
CREATE POLICY "Admin can view app settings"
    ON public.app_settings
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin can update app settings"
    ON public.app_settings
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Allow other roles to read settings (optional, depending on your requirements)
CREATE POLICY "All authenticated users can view app settings"
    ON public.app_settings
    FOR SELECT
    TO authenticated
    USING (true);

