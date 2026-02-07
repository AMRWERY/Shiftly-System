# Dynamic RBAC Database Migrations

This folder contains SQL scripts to set up the **Role-Based Access Control (RBAC)** system in Supabase.

---

## Path A: Existing schema (roles + role_permissions with module/actions + profiles + user_permissions)

If you already have **roles**, **role_permissions** (with `module`, `actions`), **profiles** (with `role` text), and optionally **user_permissions** (with `permissions` jsonb), use:

1. **01_rbac_existing_schema.sql** – Adds `role_id` to profiles, creates `user_permissions` if missing, trigger for new users, and RLS helper functions that work with `role` or `role_id` and `role_permissions(module, actions)`.
2. **03_rbac_rls_existing.sql** – RLS policies for roles, role_permissions, profiles, user_permissions (no separate `permissions` table).
3. **04_rbac_backfill_profiles.sql** – (Optional) Backfill `profiles.role_id` from `profiles.role` (role name).

**Note:** `role_permissions.actions` is expected to be a **TEXT[]** array (e.g. `ARRAY['view','edit']`). The app reads/writes it as an array.

---

## Path B: New schema (with separate permissions table)

If you are starting fresh or want a normalized **permissions** table with keys (e.g. `users:view`):

1. **01_rbac_schema.sql** – Creates `roles`, `permissions`, `role_permissions(role_id, permission_id)`, `profiles` with `role_id`, and trigger.
2. **02_rbac_seed.sql** – Seeds roles and permission keys and assigns them to roles.
3. **03_rbac_rls.sql** – RLS helpers and policies (including `permissions` table).
4. **04_rbac_backfill_profiles.sql** – (Optional) Backfill `profiles.role_id` from `profiles.role`.

---

## Schema overview (Path A – existing)

| Table              | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `roles`            | Job titles (Admin, Manager, HR, etc.)                                   |
| `role_permissions` | `role_id`, `module`, `actions` (TEXT[]) – which actions per module     |
| `profiles`         | `id` = auth.users.id, `role` (text), `role_id` (UUID, optional)         |
| `user_permissions` | `user_id`, `permissions` (jsonb) – optional cache of resolved perms     |

## Schema overview (Path B – new)

| Table              | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `roles`            | Job titles (Admin, Manager, HR, etc.)                                   |
| `permissions`      | Permission keys (e.g. `users:view`, `payroll:approve`)                  |
| `role_permissions` | Junction: `role_id`, `permission_id`                                    |
| `profiles`         | One per user; `id` = auth.users.id, `role_id` = FK to `roles`          |

## Trigger

- **on_auth_user_created**: After each insert into `auth.users`, inserts a row into `profiles` with `role_id` set to the `employee` role (or the first available role if `employee` is missing).

## RLS helpers

- `auth_user_role_id()` – Current user’s `role_id` from `profiles`.
- `auth_has_permission(permission_key TEXT)` – Returns true if the current user’s role has that permission key.
- `auth_is_admin()` – Returns true if the current user’s role name is `admin`.

Use these in RLS policies or in your app to enforce permission-based access.
