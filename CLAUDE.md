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

Per-role dev/build scripts follow `dev:<role>` / `build:<role>`. Ports: admin 3000, hr 3001, employee 3002, manager 3003, accountant 3004, inventory-manager 3006, td-officer 3007, system-auditor 3008, maintenance-technician 3009 (no app uses 3005). All nine apps exist and have pages — `docs/APP_PORTS.md` and the comment in `config/roleAppMapping.ts` still say manager is "not yet created"; that's stale.

There is **no test runner, linter, or formatter configured** — no ESLint/Prettier, no `test` script. Don't assume `pnpm lint`/`pnpm test` exist. Type checking happens via `nuxt prepare` (run on `postinstall`) and the editor's TS server.

## Environment

Supabase-backed. The base layer's `nuxt.config.ts` loads `.env` **from the repo root** (via `dotenv`), so all apps share one `.env`. Required keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY` (service-role key — used server-side only, e.g. inviting users and the permissions endpoint). Optional `*_APP_URL` vars override per-role app URLs in production (see `layers/base/config/roleAppMapping.ts`).

## Architecture

### Layer extension model
Each app's `nuxt.config.ts` is minimal: `extends: ["../../layers/base"]` plus a title template. All modules, CSS, aliases, i18n, Supabase, Pinia, and component auto-import roots are configured **once** in `layers/base/nuxt.config.ts`. Change shared behavior there.

Note the directory split: **apps keep their source in `app/`** (Nuxt 4 srcDir — `apps/admin/app/pages`, `.../app/stores`, etc.) and their own API routes in `apps/<role>/server/`. The **base layer keeps source at its root** (`layers/base/stores`, `layers/base/pages`, ...), not under `app/`. Match the surrounding convention for whichever you're editing.

Apps declare `components: [{ path: "~/components", pathPrefix: false }]`, so app-local components auto-import by filename with no directory prefix. The base layer registers `components/`, `components/shared/`, `components/skeleton-loaders/`, `components/layouts/`, and `components/auth-forms/` as auto-import roots.

**Server routes:** only `apps/admin/server/` exists — it holds the RBAC/user admin surface (`/api/admin/users`, `/api/admin/roles`, `/api/admin/permissions/[userId]`, `/api/auth/set-default-password`), all using the service-role client. The base layer contributes exactly one endpoint, `/api/user/permissions`, available to every app. Other role apps have no `server/` directory.

**Imports:** `@` is aliased to the **repo root** (not the app), so cross-layer imports in app code look like `import type { Column } from '@/layers/base/types/tables'`. There are also `@types`, `@assets`, `@public`, `@locales` aliases pointing into `layers/base/`.

### Auth & session (`layers/base/stores/authStore.ts`)
Pinia store wrapping Supabase Auth. Handles sign-in/up, OTP flows, password reset, profile + avatar updates (synced to a `profiles` table), and a 15-minute token-refresh timer. User `status` of `deactivated`/`blocked` (read from `user_metadata` or `profiles`) forces sign-out. `currentUserRole` prefers `profileRole` (from the API) over `user_metadata.role`.

### RBAC — two layers, know which you're touching
1. **Route access** — `layers/base/utils/routeAccess.ts` maps roles → allowed route prefixes (`ROLE_ROUTES`), plus `PUBLIC_ROUTES`, `COMMON_ROUTES`, and optional per-route required permissions (`ROUTE_REQUIRED_PERMISSION`).
2. **Feature permissions** — a module plus an actions array. The canonical types are `PermissionModule` and `PermissionAction` in `layers/base/types/index.ts`; actions are `view | create | edit | delete | approve` (there is **no** `export` action in the type, despite `utils/permissions.ts` listing one). The authoritative source at runtime is the server endpoint `layers/base/server/api/user/permissions.get.ts`, which resolves permissions from the DB (`user_permissions.permissions` jsonb cache → `role_permissions(module, actions)` by `role_id` → hardcoded role defaults) using the service-role client, and returns `{ permissions, role }`. The client checks them via `useAppPermissions().hasPermission(module, action)`, which merges role defaults with API results (API wins per module) and **returns true unconditionally for admin**.

⚠️ Default/fallback permission tables are **duplicated in three places with incompatible shapes**:
- `server/api/user/permissions.get.ts` — `{ module, actions: string[] }`, underscore role keys.
- `composables/useAppPermissions.ts` — same shape, and currently an exact copy of the server table.
- `utils/permissions.ts` (`ROLE_PERMISSIONS`) — a *different* model: flat `{ module, action }` pairs supporting `'*'` wildcards and the extra actions `update`/`export`. Nothing in the middleware or `useAppPermissions` reads it.

If you change a role's defaults, update the first two together; treat the third as legacy and check whether it's actually wired in before relying on it.

⚠️ **Role-key format mismatch.** `UserRole` (and every role name the permissions endpoint returns) uses **underscores** — `inventory_manager`, `td_officer`, `system_auditor`, `maintenance_technician` — but `ROLE_ROUTES` keys those same roles with **hyphens**. `checkRouteAccess` does no normalization, so multi-word roles fall through to an empty allow-list and only reach `COMMON_ROUTES`. Separately, the prefixes in `ROLE_ROUTES` (e.g. hr → `/employees`, `/recruitment`) don't match the pages actually built in those apps (hr has `/employee_list`, `/leave-requests`, …). Verify against `ROLE_ROUTES` before assuming a route is reachable, and normalize keys if you touch this file.

### Middleware (`layers/base/middleware/`, `.global.ts` run on every route)
- `auth.global.ts` — initializes session, gates public vs. protected routes, redirects unauthenticated users to `/auth`.
- `authorization.global.ts` — enforces route access (permission-aware once permissions are fetched, role-based otherwise); redirects to `/unauthorized`.
- `role-redirect.global.ts` — client-only; if the user is in the wrong app for their role (per `roleAppMapping.ts`), signs them out and sends them to `/auth`.

All route matching strips the i18n locale prefix first (`removeLocalePrefix`).

Non-global variants (`auth.ts`, `role.ts`, `role-redirect.ts`, plus `audit.ts`) exist alongside the `.global.ts` files for opt-in use via `definePageMeta({ middleware: [...] })`.

### Shared UI
Reusable components live in `layers/base/components/shared/` and are prefixed **`V`** (`VButton`, `VTable`, `VModal`, `VDatePicker`, `VDownloadFilesMenu`, chart components, etc.), auto-imported globally. Prefer these over new one-off components. Skeleton loaders (`VTableSkeleton`, `VKpiCardSkeleton`, …) live in `components/skeleton-loaders/`, auth forms in `components/auth-forms/`.

**Templates almost always use the `Lazy` prefix** — `<LazyVButton>`, `<LazyVTableSkeleton>`, `<LazyVSearchInput>`. Match that when adding markup.

**Layout chain:** page → `layouts/dashboard.vue` (base) → `components/layouts/main-layout.vue`, which owns *all* the app chrome (desktop + mobile sidebar, top header, greeting/clock, locale/theme toggles, logout). It picks the sidebar nav by role via the boolean flags from `useRole()` (`isAdmin`, `isHr`, …), rendering the matching `components/layouts/<role>-layout.vue` — those files are **nav-link lists only**, not full layouts. Adding a page to a role's sidebar means editing its `<role>-layout.vue`. Base also ships `auth`, `default`, and `minimal` layouts.

### i18n
`@nuxtjs/i18n`, locales `en` (default) and `ar` (RTL), strategy `prefix_except_default`, lazy JSON files in `layers/base/i18n/locales/`. Any user-facing string needs keys in **both** `en.json` and `ar.json`. RTL is handled via `tailwindcss-rtl` plus `useLocaleStore().isRTL`; use logical utilities (`ms-*`, `me-*`, `border-e`) rather than `ml-*`/`mr-*`. Use `useLocalePath()` for internal links so the locale prefix survives navigation.

### Other stack pieces worth knowing
- **vee-validate** (`@vee-validate/nuxt`, `autoImports: true`) is the form layer. `plugins/vee-validate.ts` registers the rule set (`required`, `min`, `max`, `email`, `regex`, `numeric`, …) and localized messages that follow the i18n locale. In practice pages don't use `<Form>`/`<Field>` directly — they compose `VFormWrapper` + `VInput`, which wrap them.
- **@nuxt/icon** with Iconify sets `heroicons`, `mdi`, `material-symbols` — `<Icon name="material-symbols:shield" />`.
- **Export**: two separate paths. `useExport()` does CSV/JSON via Blob only. PDF/XLSX go through `VDownloadFilesMenu`, which pulls `$jsPDF` / `$jsPdfAutoTable` / `$xlsx` off `useNuxtApp()` — provided by the client-only plugins `plugins/jspdf.client.ts` and `plugins/xlsx.client.ts`.
- **@vueuse/nuxt** is on, so `useLocalStorage`, `useNow`, `useTimeoutFn`, etc. are auto-imported.
- Cross-cutting composables in `layers/base/composables/` cover the repeated page mechanics: `usePagination`, `useSearch`, `useFilters`, `useModal`, `useToast`, `useLoading`, `useFileUpload`, `useAuditLog`, `useRealtime`, `useSeoPage`, `useStatusClasses`. Reach for these before hand-rolling.

## Conventions

- **Arrow functions only.** The codebase was refactored (May 2026) to use `const fn = () => {}` for all named functions — utilities, composables (`export const useX = () => {}`), and store actions. Use `function` only where a framework signature requires it (`defineEventHandler`, `defineNuxtRouteMiddleware` bodies are fine as-is). See `docs/ARROW_FUNCTIONS_REFACTOR.md`.
- **Styling** follows a dark "Enterprise Admin" theme with a custom `brand-*` Tailwind palette and glassmorphism utilities (`.card-bg`, `.glow-blue`). Buttons use `rounded-xl`, cards `rounded-2xl`. See `docs/STYLE_GUIDE.md` and `layers/base/tailwind.config.ts` / `assets/css/`.
- Tailwind is **v3** (not v4), configured via `@nuxtjs/tailwindcss` + explicit postcss.

### Theming — dark is the base, `light:` is the override
`VToggleThemes` uses VueUse `useDark` to put **`class="dark"` / `class="light"` on `<html>`**, defaulting to dark. Two mechanisms react to that:
1. **CSS-variable tokens** (the primary one) — `assets/css/main.css` defines the palette on `:root` and re-defines it under `html.light`. Anything using `bg-brand-layoutBg`, `bg-bg-elevated`, `text-tx-primary`, `var(--border-default)`, etc. flips themes for free. **Prefer this.**
2. **The `light:` variant** — registered by a small plugin in `tailwind.config.ts`, compiling to `html.light &`. Use it when a component needs a hand-tuned light value that the tokens don't express: keep the dark class unprefixed and add `light:` on top (`bg-[#0B0E14] light:bg-white`). `VTable.vue` is the reference example.

⚠️ **`dark:` does not work in this repo.** `darkMode` is set to `["class", '[data-theme="dark"]']`, which tells Tailwind to use `[data-theme="dark"]` *instead of* `.dark` — so `dark:x` compiles to `:is([data-theme="dark"] *)`, and nothing ever sets that attribute. Existing `dark:` classes (in `VInput`, `VBackButton`, the `*-layout.vue` files, …) are inert. Don't add new ones; use option 1 or 2 above. Fixing `darkMode` would retroactively activate all those dead classes at once, so it needs a deliberate visual pass, not a drive-by config edit.
- Shared constants (roles list, currencies, file-size/type limits, date formats) are in `layers/base/utils/constants.ts`.
- Cross-app shared state lives in `layers/base/stores/` (`authStore`, `localeStore`, `sidebar`, `notifications`, `user`); app-specific state goes in `apps/<role>/app/stores/` (e.g. admin's `users`, `roles`, `permissions`, `settingsStore`).
- ⚠️ **`README.md` is significantly out of date** — it describes 5 roles, a `stores/auth.ts`, a `/login` route, and `user_roles`/`role_permissions(role, permission)` tables, none of which match the current code. Trust this file and the source over it.

## Database

Migrations live in `docs/database/` and are run by hand in the Supabase SQL editor. There are **two mutually exclusive paths** (see `docs/database/README.md` and `docs/DATABASE_SETUP.md`):

- **Path A — existing schema** (what the running code targets): `roles`, `role_permissions(role_id, module, actions TEXT[])`, `profiles(role, role_id)`, `user_permissions(user_id, permissions jsonb)`. Run `01_rbac_existing_schema` → `03_rbac_rls_existing` → optional `04_rbac_backfill_profiles`.
- **Path B — new normalized schema**: adds a separate `permissions` table with keys like `users:view` and a `role_permissions(role_id, permission_id)` junction. Run `01_rbac_schema` → `02_rbac_seed` → `03_rbac_rls` → optional `04_rbac_backfill_profiles`.

`server/api/user/permissions.get.ts` reads the **Path A** shape (`role_permissions.module` + `.actions`), so prefer Path A unless you're also porting the endpoint. Other tables the app touches: `profiles` (avatar/profile sync) and an `app_settings` table created by `apps/admin/server/database/create_app_settings_table.sql`.
