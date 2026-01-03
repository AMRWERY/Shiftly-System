# Database Migrations

This folder contains SQL migration files for the admin application.

## App Settings Table

The `app_settings` table stores system-wide configuration settings including:
- Work days (which days of the week are working days)
- Work hours (start and end times)
- Holiday country code (for official holidays)
- Custom holidays
- System currency

### Running the Migration

1. **Via Supabase Dashboard:**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy the contents of `create_app_settings_table.sql`
   - Paste and run it

2. **Via Supabase CLI:**
   ```bash
   supabase db push
   ```

3. **Via psql:**
   ```bash
   psql -h your-db-host -U your-username -d your-database -f create_app_settings_table.sql
   ```

### Table Structure

```sql
CREATE TABLE public.app_settings (
    id UUID PRIMARY KEY,
    system_settings JSONB NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### Security

- Row Level Security (RLS) is enabled
- Admin users can read and update settings
- All authenticated users can read settings
- Only one row is allowed (singleton pattern)

### Default Values

The table is pre-populated with default settings:
- Work Days: Sunday to Thursday (0-4)
- Work Hours: 09:00 - 17:00
- Country: Egypt (EG)
- Currency: Egyptian Pound (EGP)
- Custom Holidays: Empty array

