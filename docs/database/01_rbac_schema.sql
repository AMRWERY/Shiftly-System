-- =============================================================================
-- Dynamic RBAC Schema: roles, permissions, role_permissions, profiles
-- Run this in Supabase SQL Editor first.
-- =============================================================================

-- Enable UUID extension if not already
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. ROLES: job titles (Admin, Manager, HR, etc.)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roles_name ON public.roles(name);

-- -----------------------------------------------------------------------------
-- 2. PERMISSIONS: permission keys (e.g. users:view, hr:edit, payroll:approve)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  module TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_permissions_key ON public.permissions(key);
CREATE INDEX IF NOT EXISTS idx_permissions_module ON public.permissions(module);

-- -----------------------------------------------------------------------------
-- 3. ROLE_PERMISSIONS: junction table (Many-to-Many roles <-> permissions)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (role_id, permission_id)
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON public.role_permissions(permission_id);

-- -----------------------------------------------------------------------------
-- 4. PROFILES: link auth.users to a role_id (and other profile fields)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  full_name TEXT,
  phone_number TEXT,
  employee_id TEXT,
  base_salary NUMERIC DEFAULT 0,
  avatar_url TEXT,
  status TEXT DEFAULT 'pending',
  role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legacy column for backward compatibility (optional; can be dropped after migration)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT;

CREATE INDEX IF NOT EXISTS idx_profiles_role_id ON public.profiles(role_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- -----------------------------------------------------------------------------
-- 5. TRIGGER: Auto-create profile for every new auth.users with default role
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_role_id UUID;
BEGIN
  -- Get the 'employee' role id (or first role if employee doesn't exist)
  SELECT id INTO default_role_id
  FROM public.roles
  WHERE name = 'employee'
  LIMIT 1;

  IF default_role_id IS NULL THEN
    SELECT id INTO default_role_id FROM public.roles LIMIT 1;
  END IF;

  INSERT INTO public.profiles (id, email, role_id, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    default_role_id,
    COALESCE((SELECT name FROM public.roles WHERE id = default_role_id), 'employee'),
    COALESCE(NEW.raw_user_meta_data->>'fullName', NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role_id = COALESCE(public.profiles.role_id, EXCLUDED.role_id),
    role = COALESCE(public.profiles.role, EXCLUDED.role),
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 6. RLS: Enable Row Level Security on tables
-- -----------------------------------------------------------------------------
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
