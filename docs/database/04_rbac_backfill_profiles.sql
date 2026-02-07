-- =============================================================================
-- Backfill profiles.role_id from existing profile.role (role name)
-- Run after 01_rbac_schema.sql and 02_rbac_seed.sql if you have existing profiles
-- =============================================================================

UPDATE public.profiles p
SET role_id = r.id,
    updated_at = NOW()
FROM public.roles r
WHERE p.role = r.name
  AND (p.role_id IS NULL OR p.role_id != r.id);
