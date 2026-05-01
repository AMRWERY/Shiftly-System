# Arrow Functions Refactoring Reference

This document describes the project-wide refactoring performed on **May 1, 2026** to convert all regular `function` declarations to arrow function expressions across the Nexux ERP monorepo.

---

## Why Arrow Functions?

| Reason | Detail |
|:-------|:-------|
| **Consistency** | One uniform syntax across all `.ts` and `.vue` files |
| **No `this` binding** | Arrow functions don't create their own `this`, which avoids accidental context bugs in Vue 3 composables and Pinia stores |
| **Modern style** | Aligns with the Vue 3 / Nuxt 4 / TypeScript ecosystem conventions |
| **Composables pattern** | Composables (`useXxx`) are better expressed as `const useXxx = () => { ... }` — clearly a value, not a class-style constructor |
| **Tree-shaking** | `const` exports are more consistently tree-shaken by bundlers |

---

## Conversion Rules

Every named `function` declaration was converted following these four patterns:

### 1. Exported regular function

```ts
// Before
export function myUtil(param: string): boolean {
  return param.length > 0
}

// After
export const myUtil = (param: string): boolean => {
  return param.length > 0
}
```

### 2. Exported async function

```ts
// Before
export async function fetchData(id: number): Promise<Data> {
  const res = await api.get(id)
  return res.data
}

// After
export const fetchData = async (id: number): Promise<Data> => {
  const res = await api.get(id)
  return res.data
}
```

### 3. Inner / local regular function

```ts
// Before
function closeModal() {
  isOpen.value = false
}

// After
const closeModal = () => {
  isOpen.value = false
}
```

### 4. Inner / local async function

```ts
// Before
async function loadUsers() {
  isLoading.value = true
  // ...
}

// After
const loadUsers = async () => {
  isLoading.value = true
  // ...
}
```

---

## What Was NOT Changed

- Arrow functions that were already arrow functions
- Anonymous callbacks: `.map(function(x) { ... })` (these were already rare; `.map(x => ...)` preferred)
- Function **type annotations** in TypeScript interfaces/types: `type Handler = (x: string) => void`
- `defineEventHandler(...)` in Nitro server routes (these use Nuxt/H3 conventions)

---

## Files Changed (52 total)

### `layers/base/composables/` — 17 files

| File | Notes |
|:-----|:------|
| `useAppPermissions.ts` | Permission check helpers |
| `useAuditLog.ts` | Audit logging composable |
| `useAuth.ts` | Auth sign-in/sign-out/session |
| `useExport.ts` | CSV/PDF export helpers |
| `useFileUpload.ts` | File upload handlers |
| `useFilters.ts` | Table/list filter logic |
| `useLoading.ts` | Global loading state |
| `useModal.ts` | Modal open/close helpers |
| `useNotifications.ts` | Notification fetch/mark-read |
| `usePagination.ts` | Pagination controls |
| `usePermissions.ts` | RBAC permission checks |
| `useRealtime.ts` | Supabase realtime subscriptions |
| `useRole.ts` | Role resolution helpers |
| `useSearch.ts` | Search debounce/query helpers |
| `useSupabase.ts` | Supabase client wrappers |
| `useToast.ts` | Toast notification helpers |
| `useUser.ts` | Current user state helpers |

### `layers/base/utils/` — 5 files

| File | Notes |
|:-----|:------|
| `formatters.ts` | Date, currency, number formatters |
| `helpers.ts` | General utility helpers |
| `permissions.ts` | Permission matrix utilities |
| `routeAccess.ts` | Route guard helpers |
| `validators.ts` | Email, phone, field validators |

### `layers/base/config/` — 1 file

| File | Notes |
|:-----|:------|
| `roleAppMapping.ts` | Maps roles to app URLs |

### `layers/base/stores/` — 1 file

| File | Notes |
|:-----|:------|
| `localeStore.ts` | Pinia locale/RTL store |

### `layers/base/components/shared/` — 2 files

| File | Notes |
|:-----|:------|
| `VDeleteDialog.vue` | Confirm-delete modal |
| `VFileUpload.vue` | File picker component |

### `layers/base/pages/` — 1 file

| File | Notes |
|:-----|:------|
| `holiday-dates.vue` | Holiday calendar page |

### `apps/accountant/app/composables/` — 4 files

| File | Notes |
|:-----|:------|
| `useAccounts.ts` | Chart of accounts CRUD |
| `useBudgets.ts` | Budget management |
| `useInvoices.ts` | Invoice CRUD |
| `useJournals.ts` | Journal entry helpers |

### `apps/admin/app/stores/` — 3 files

| File | Notes |
|:-----|:------|
| `permissions.ts` | Pinia permissions store |
| `roles.ts` | Pinia roles store |
| `users.ts` | Pinia users store |

### `apps/admin/app/pages/` — 2 files

| File | Notes |
|:-----|:------|
| `global-config/index.vue` | Global settings page |
| `roles/[id].vue` | Role detail/edit page |

### `apps/hr/app/composables/` — 5 files

| File | Notes |
|:-----|:------|
| `useAttendance.ts` | Attendance tracking |
| `useEmployees.ts` | Employee CRUD |
| `useLeave.ts` | Leave requests |
| `usePayroll.ts` | Payroll calculations |
| `usePerformance.ts` | Performance reviews |

### `apps/hr/app/components/` — 1 file

| File | Notes |
|:-----|:------|
| `recruitment-kanban.vue` | Kanban board component |

### `apps/inventory-manager/app/composables/` — 4 files

| File | Notes |
|:-----|:------|
| `useProducts.ts` | Product catalog CRUD |
| `usePurchaseOrders.ts` | Purchase order management |
| `useStock.ts` | Stock level tracking |
| `useWarehouses.ts` | Warehouse management |

### `apps/maintenance-technician/app/composables/` — 3 files

| File | Notes |
|:-----|:------|
| `useAssets.ts` | Asset registry |
| `usePMSchedules.ts` | Preventive maintenance schedules |
| `useWorkOrders.ts` | Work order management |

### `apps/td-officer/app/composables/` — 3 files

| File | Notes |
|:-----|:------|
| `useCertifications.ts` | Certification tracking |
| `useCourses.ts` | Training course management |
| `useEnrollments.ts` | Course enrollment management |

---

## Convention Going Forward

When writing new code in this project, always use arrow functions:

```ts
// Composable
export const useMyFeature = () => {
  const doSomething = async (id: string) => {
    // ...
  }
  return { doSomething }
}

// Utility
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString()
}

// Pinia store action (inside defineStore)
const fetchItems = async () => {
  // ...
}
```

Only use `function` declarations when:
- Writing a recursive function that needs to reference itself by name before `const` is initialized (extremely rare)
- A library or framework explicitly requires a named `function` (e.g. certain Nuxt/Nitro plugin signatures)

---

## Related Docs

- [`STYLE_GUIDE.md`](./STYLE_GUIDE.md) — Component and CSS conventions
- [`APP_PORTS.md`](./APP_PORTS.md) — Dev server ports per app
