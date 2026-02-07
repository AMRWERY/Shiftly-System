-- =============================================================================
-- RLS policies for EXISTING schema (no permissions table)
-- Run after 01_rbac_existing_schema.sql
-- =============================================================================

-- Roles: read for authenticated; full for admin
DROP POLICY IF EXISTS "roles_select_authenticated" ON public.roles;
CREATE POLICY "roles_select_authenticated"
  ON public.roles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "roles_all_admin" ON public.roles;
CREATE POLICY "roles_all_admin"
  ON public.roles FOR ALL TO authenticated
  USING (public.auth_is_admin()) WITH CHECK (public.auth_is_admin());

-- role_permissions: read for authenticated; modify for admin
DROP POLICY IF EXISTS "role_permissions_select_authenticated" ON public.role_permissions;
CREATE POLICY "role_permissions_select_authenticated"
  ON public.role_permissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "role_permissions_modify_admin" ON public.role_permissions;
CREATE POLICY "role_permissions_modify_admin"
  ON public.role_permissions FOR ALL TO authenticated
  USING (public.auth_is_admin()) WITH CHECK (public.auth_is_admin());

-- profiles: own row read/update; admin read/update any
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT TO authenticated USING (public.auth_is_admin());

DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.auth_is_admin()) WITH CHECK (true);

-- user_permissions: own row read/update; admin read/update any
DROP POLICY IF EXISTS "user_permissions_select_own" ON public.user_permissions;
CREATE POLICY "user_permissions_select_own"
  ON public.user_permissions FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "user_permissions_update_own" ON public.user_permissions;
CREATE POLICY "user_permissions_update_own"
  ON public.user_permissions FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "user_permissions_select_admin" ON public.user_permissions;
CREATE POLICY "user_permissions_select_admin"
  ON public.user_permissions FOR SELECT TO authenticated USING (public.auth_is_admin());

DROP POLICY IF EXISTS "user_permissions_all_admin" ON public.user_permissions;
CREATE POLICY "user_permissions_all_admin"
  ON public.user_permissions FOR ALL TO authenticated
  USING (public.auth_is_admin()) WITH CHECK (public.auth_is_admin());
