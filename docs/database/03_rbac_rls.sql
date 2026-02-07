-- =============================================================================
-- RLS: Helper functions and policies for permission-based access
-- Run after 02_rbac_seed.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Get current user's role_id from profiles
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

-- -----------------------------------------------------------------------------
-- 2. Check if current user has a permission by key (e.g. 'users:view')
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.auth_has_permission(permission_key TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles pr
    JOIN public.role_permissions rp ON rp.role_id = pr.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    WHERE pr.id = auth.uid()
      AND p.key = permission_key
  )
$$;

-- -----------------------------------------------------------------------------
-- 3. Check if current user is admin (by role name)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.auth_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles pr
    JOIN public.roles r ON r.id = pr.role_id
    WHERE pr.id = auth.uid() AND r.name = 'admin'
  )
$$;

-- -----------------------------------------------------------------------------
-- 4. RLS Policies: roles (read for authenticated; full for admin)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "roles_select_authenticated" ON public.roles;
CREATE POLICY "roles_select_authenticated"
  ON public.roles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "roles_all_admin" ON public.roles;
CREATE POLICY "roles_all_admin"
  ON public.roles FOR ALL
  TO authenticated
  USING (public.auth_is_admin())
  WITH CHECK (public.auth_is_admin());

-- -----------------------------------------------------------------------------
-- 5. RLS Policies: permissions (read for authenticated)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "permissions_select_authenticated" ON public.permissions;
CREATE POLICY "permissions_select_authenticated"
  ON public.permissions FOR SELECT
  TO authenticated
  USING (true);

-- -----------------------------------------------------------------------------
-- 6. RLS Policies: role_permissions (read for authenticated; modify for admin)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "role_permissions_select_authenticated" ON public.role_permissions;
CREATE POLICY "role_permissions_select_authenticated"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "role_permissions_modify_admin" ON public.role_permissions;
CREATE POLICY "role_permissions_modify_admin"
  ON public.role_permissions FOR ALL
  TO authenticated
  USING (public.auth_is_admin())
  WITH CHECK (public.auth_is_admin());

-- -----------------------------------------------------------------------------
-- 7. RLS Policies: profiles
-- Users can read/update their own profile; admin can read/update any
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.auth_is_admin());

DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.auth_is_admin())
  WITH CHECK (true);

-- Service role bypasses RLS by default; no policy needed for backend using service role.
