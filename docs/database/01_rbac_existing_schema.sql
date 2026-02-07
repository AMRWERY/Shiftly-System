-- =============================================================================
-- RBAC for EXISTING schema (roles, role_permissions with module/actions,
-- profiles with role text, user_permissions with permissions jsonb)
-- Run this if you already have these tables. Adds role_id, trigger, RLS.
-- =============================================================================

-- Enable UUID extension if not already
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Add role_id to profiles (link to roles.id); keep role (text) for compat
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_role_id ON public.profiles(role_id);

-- -----------------------------------------------------------------------------
-- 2. Ensure user_permissions exists (user_id -> auth.users, permissions jsonb)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  permissions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON public.user_permissions(user_id);

-- -----------------------------------------------------------------------------
-- 3. Trigger: Auto-create profile for every new auth.users (default role)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_role_id UUID;
  default_role_name TEXT;
BEGIN
  SELECT id, name INTO default_role_id, default_role_name
  FROM public.roles
  WHERE name = 'employee'
  LIMIT 1;

  IF default_role_id IS NULL THEN
    SELECT id, name INTO default_role_id, default_role_name
    FROM public.roles
  LIMIT 1;
  END IF;

  INSERT INTO public.profiles (id, email, role_id, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    default_role_id,
    COALESCE(default_role_name, 'employee'),
    COALESCE(NEW.raw_user_meta_data->>'fullName', NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role_id = COALESCE(public.profiles.role_id, EXCLUDED.role_id),
    role = COALESCE(public.profiles.role, EXCLUDED.role),
    full_name = COALESCE(NULLIF(public.profiles.full_name, ''), EXCLUDED.full_name),
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
-- 4. RLS helpers (work with role text or role_id)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.auth_user_role_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role_id FROM public.profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.auth_user_role_name()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.auth_has_permission(permission_key TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pr RECORD;
  rp RECORD;
  key_parts TEXT[];
  mod TEXT;
  act TEXT;
BEGIN
  key_parts := string_to_array(permission_key, ':');
  IF array_length(key_parts, 1) < 2 THEN RETURN FALSE; END IF;
  mod := key_parts[1];
  act := key_parts[2];

  SELECT p.role_id, p.role INTO pr
  FROM public.profiles p
  WHERE p.id = auth.uid();

  IF pr.role_id IS NOT NULL THEN
    RETURN EXISTS (
      SELECT 1 FROM public.role_permissions rp
      WHERE rp.role_id = pr.role_id
        AND rp.module = mod
        AND (rp.actions @> ARRAY[act] OR rp.actions::TEXT LIKE '%' || act || '%')
    );
  END IF;

  IF pr.role IS NOT NULL THEN
    RETURN EXISTS (
      SELECT 1 FROM public.roles r
      JOIN public.role_permissions rp ON rp.role_id = r.id
      WHERE r.name = pr.role
        AND rp.module = mod
        AND (rp.actions @> ARRAY[act] OR rp.actions::TEXT LIKE '%' || act || '%')
    );
  END IF;
  RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION public.auth_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    LEFT JOIN public.roles r ON r.id = p.role_id
    WHERE p.id = auth.uid()
      AND (r.name = 'admin' OR p.role = 'admin')
  )
$$;

-- -----------------------------------------------------------------------------
-- 5. Enable RLS (policies in 03_rbac_rls.sql or 03_rbac_rls_existing.sql)
-- -----------------------------------------------------------------------------
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;
