# Database Setup for Shiftly

## Dynamic RBAC (recommended)

The **Dynamic RBAC** system uses four tables: `roles`, `permissions`, `role_permissions` (junction), and `profiles` linked to `role_id`, with RLS and a trigger to auto-create profiles for new users.

**Run the migrations in this order** (Supabase SQL Editor):

1. **[docs/database/01_rbac_schema.sql](database/01_rbac_schema.sql)** – Creates `roles`, `permissions`, `role_permissions`, `profiles`, and the trigger that creates a profile for each new `auth.users` row (default role: employee).
2. **[docs/database/02_rbac_seed.sql](database/02_rbac_seed.sql)** – Seeds system roles and permission keys (`module:action`), and assigns default permissions to admin and other roles.
3. **[docs/database/03_rbac_rls.sql](database/03_rbac_rls.sql)** – RLS helper functions and policies.
4. **[docs/database/04_rbac_backfill_profiles.sql](database/04_rbac_backfill_profiles.sql)** – (Optional) Backfill `profiles.role_id` from existing `profiles.role` (role name).

See **[docs/database/README.md](database/README.md)** for schema overview and RLS helpers.

## Quick steps

1. Open your Supabase project → SQL Editor.
2. Run `01_rbac_schema.sql`, then `02_rbac_seed.sql`, then `03_rbac_rls.sql`.
3. If you already have a `profiles` table with a `role` (text) column, run `04_rbac_backfill_profiles.sql`.
4. Restart or refresh your app.

After this, the Admin dashboard can manage roles and their permissions (checkboxes synced with `role_permissions`), and the frontend/backend use permissions for route and UI visibility and RLS.
