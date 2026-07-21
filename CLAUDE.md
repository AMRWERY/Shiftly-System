# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Nexux ERP: a pnpm + Nuxt 4 monorepo. There are **9 role-specific Nuxt apps** under `apps/`, each a thin shell that extends one shared layer at `layers/base/`. Almost all real logic (auth, RBAC, shared UI, composables, stores, i18n, the server permissions endpoint) lives in `layers/base/` — start there, not in the apps.

Apps run as separate SPAs (`ssr: false`), each on its own port. A user only ever uses the app for their role; logging into the wrong app signs them out (see middleware below).

## Commands

Package manager is **pnpm 10.18.0** (enforced via `packageManager`). Run from the repo root.

```bash
pnpm install                 # install all workspaces
pnpm dev                     # alias for dev:admin (port 3000)
pnpm dev:hr                  # per-role dev servers — see the port table below
pnpm build                   # build every app (pnpm -r build)
pnpm build:admin             # build one app
```

Per-role dev/build scripts follow `dev:<role>` / `build:<role>`. Ports: admin 3000, hr 3001, employee 3002, manager 3003, accountant 3004, inventory-manager 3006, td-officer 3007, system-auditor 3008, maintenance-technician 3009. (`manager` is listed in scripts/config but the app is not yet built out.)

There is **no test runner, linter, or formatter configured** — no ESLint/Prettier, no `test` script. Don't assume `pnpm lint`/`pnpm test` exist. Type checking happens via `nuxt prepare` (run on `postinstall`) and the editor's TS server.

## Environment

Supabase-backed. The base layer's `nuxt.config.ts` loads `.env` **from the repo root** (via `dotenv`), so all apps share one `.env`. Required keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY` (service-role key — used server-side only, e.g. inviting users and the permissions endpoint). Optional `*_APP_URL` vars override per-role app URLs in production (see `layers/base/config/roleAppMapping.ts`).

## Architecture

### Layer extension model
Each app's `nuxt.config.ts` is minimal: `extends: ["../../layers/base"]` plus a title template. All modules, CSS, aliases, i18n, Supabase, Pinia, and component auto-import roots are configured **once** in `layers/base/nuxt.config.ts`. Change shared behavior there.

Note the directory split: **apps keep their source in `app/`** (Nuxt 4 srcDir — `apps/admin/app/pages`, `.../app/stores`, etc.) and their own API routes in `apps/<role>/server/`. The **base layer keeps source at its root** (`layers/base/stores`, `layers/base/pages`, ...), not under `app/`. Match the surrounding convention for whichever you're editing.

### Auth & session (`layers/base/stores/authStore.ts`)
Pinia store wrapping Supabase Auth. Handles sign-in/up, OTP flows, password reset, profile + avatar updates (synced to a `profiles` table), and a 15-minute token-refresh timer. User `status` of `deactivated`/`blocked` (read from `user_metadata` or `profiles`) forces sign-out. `currentUserRole` prefers `profileRole` (from the API) over `user_metadata.role`.

### RBAC — two layers, know which you're touching
1. **Route access** — `layers/base/utils/routeAccess.ts` maps roles → allowed route prefixes (`ROLE_ROUTES`), plus `PUBLIC_ROUTES`, `COMMON_ROUTES`, and optional per-route required permissions (`ROUTE_REQUIRED_PERMISSION`).
2. **Feature permissions** — module + action pairs (`view`/`create`/`edit`/`delete`/`approve`/`export`). The authoritative source at runtime is the server endpoint `layers/base/server/api/user/permissions.get.ts`, which resolves permissions from the DB (`user_permissions` cache → `role_permissions` by `role_id` → hardcoded role defaults) using the service-role client. The client checks them via `useAppPermissions().hasPermission(module, action)`, and **admin always returns true**.

⚠️ Default/fallback permission tables are currently **duplicated in three places** with differing shapes: the server endpoint, `composables/useAppPermissions.ts`, and `utils/permissions.ts` (`ROLE_PERMISSIONS`). If you change a role's default permissions, check all three so they don't drift.

### Middleware (`layers/base/middleware/`, `.global.ts` run on every route)
- `auth.global.ts` — initializes session, gates public vs. protected routes, redirects unauthenticated users to `/auth`.
- `authorization.global.ts` — enforces route access (permission-aware once permissions are fetched, role-based otherwise); redirects to `/unauthorized`.
- `role-redirect.global.ts` — client-only; if the user is in the wrong app for their role (per `roleAppMapping.ts`), signs them out and sends them to `/auth`.

All route matching strips the i18n locale prefix first (`removeLocalePrefix`).

### Shared UI
Reusable components live in `layers/base/components/shared/` and are prefixed **`V`** (`VButton`, `VTable`, `VModal`, `VDatePicker`, chart components, etc.), auto-imported globally. Prefer these over new one-off components. Roles table headers, dialogs, skeleton loaders also live under `layers/base/components/`.

### i18n
`@nuxtjs/i18n`, locales `en` (default) and `ar` (RTL), strategy `prefix_except_default`, lazy JSON files in `layers/base/i18n/locales/`. Any user-facing string needs keys in **both** `en.json` and `ar.json`. RTL is handled via `tailwindcss-rtl`.

## Conventions

- **Arrow functions only.** The codebase was refactored (May 2026) to use `const fn = () => {}` for all named functions — utilities, composables (`export const useX = () => {}`), and store actions. Use `function` only where a framework signature requires it (`defineEventHandler`, `defineNuxtRouteMiddleware` bodies are fine as-is). See `docs/ARROW_FUNCTIONS_REFACTOR.md`.
- **Styling** follows a dark "Enterprise Admin" theme with a custom `brand-*` Tailwind palette and glassmorphism utilities (`.card-bg`, `.glow-blue`). Buttons use `rounded-xl`, cards `rounded-2xl`. See `docs/STYLE_GUIDE.md` and `layers/base/tailwind.config.ts` / `assets/css/`.
- Tailwind is **v3** (not v4), configured via `@nuxtjs/tailwindcss` + explicit postcss.
- Shared constants (roles list, currencies, file-size/type limits, date formats) are in `layers/base/utils/constants.ts`.

## Database

Dynamic RBAC schema: `roles`, `permissions`, `role_permissions` (junction), and `profiles.role_id`. Migrations live in `docs/database/` and must be run in order (`01_rbac_schema` → `02_rbac_seed` → `03_rbac_rls` → optional `04_rbac_backfill_profiles`) in the Supabase SQL editor. See `docs/DATABASE_SETUP.md`.
