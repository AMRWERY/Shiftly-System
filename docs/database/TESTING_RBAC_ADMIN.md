# Testing RBAC on the Admin Dashboard

Follow these steps to verify the Dynamic RBAC changes on the admin app.

---

## 1. Prerequisites

### Run the database migrations (Supabase)

1. Open your **Supabase** project → **SQL Editor**.
2. Run in order (for your **existing** schema):
   - **`docs/database/01_rbac_existing_schema.sql`**
   - **`docs/database/03_rbac_rls_existing.sql`**
   - **`docs/database/04_rbac_backfill_profiles.sql`** (if you have existing profiles with a `role` column)
3. Ensure you have at least one **admin** user (profile with `role = 'admin'` or `role_id` pointing to the admin role).

### Environment

- `.env` or Nuxt env with `SUPABASE_URL` and `SUPABASE_KEY` (and any keys the admin app needs).

---

## 2. Start the Admin app

From the **monorepo root**:

```bash
pnpm install
pnpm dev
# or
pnpm dev:admin
```

Admin runs at **http://localhost:3000**.

---

## 3. Test the Roles list

1. Log in with an **admin** user.
2. Go to **Roles** (sidebar or `/roles`).
3. **Check:**
   - The table loads and shows all roles (e.g. Admin, HR, Employee, Manager, etc.).
   - Columns: Role Name, Role, Description, Users, Created At.
   - No console/network errors; "View" (or similar) works for a role.

If the list is empty or you get 503, the `roles` table may be missing or the API base URL may be wrong.

---

## 4. Test Role detail and Permission matrix

1. On the Roles list, click **View** (or the row) for one role (e.g. **HR** or **Employee**).
2. You should see:
   - Role header (name, description).
   - Stats (e.g. total users, permissions count).
   - **Role Permissions** section with a **matrix** (modules × actions as checkboxes).
3. **Check:**
   - The matrix shows the same modules/actions as in your seed (e.g. users, roles, employees, payroll, view, create, edit, delete, approve).
   - Checkboxes reflect what’s in the DB for that role (from `role_permissions`).

---

## 5. Test Editing permissions (sync with `role_permissions`)

1. On the same role detail page, click **Edit** (pencil).
2. In the dialog:
   - Change some checkboxes (e.g. grant or revoke **employees:view**, **payroll:approve**).
   - Click **Save**.
3. **Check:**
   - Success toast or no error.
   - Dialog closes; the detail view updates (permission count and matrix match your changes).
4. **Verify in Supabase:**
   - **Table Editor** → **role_permissions**.
   - Filter by `role_id` = that role’s UUID.
   - Rows should match the matrix: one row per module with `actions` array (e.g. `['view','edit']`).

---

## 6. Test “Users Management” for Manager (permission-driven sidebar)

This checks that when you grant **users** (and optionally **roles**) permissions to the **Manager** role in the admin dashboard, the manager sees **User & Roles Management** (and the **Users** route) on their own dashboard.

1. **Admin app:** Log in as **admin** → open **Roles** → open the **Manager** role (View).
2. Click **Edit** (pencil). In the permission matrix:
   - Enable **users**: at least **view** (and optionally create, edit, delete, approve).
   - Optionally enable **roles**: **view**.
   - Save.
3. **Manager app:** Start the manager app (`pnpm dev:manager` or the app on port 3003). Log in as a **manager** user (or use the same user whose profile has role = manager).
4. **Check on manager dashboard:**
   - In the **sidebar** you should see a section **“User & Roles Management”** (or the label from `layouts.user_roles_mgt`).
   - Under it: **Users** (and **Roles** / **Permissions** if you granted those). Click **Users** → the Users Management page should load (if that route exists in the manager app).
5. **Revoke and verify:** As admin, remove **users:view** from the Manager role and save. Log in again as manager (or refresh and re-fetch permissions) → the “User & Roles Management” block should **disappear** from the sidebar.

This confirms that the manager layout shows admin-style routes only when the role has the right permissions from the admin dashboard.

**Note:** The **Users**, **Roles**, and **Permissions** pages exist in the **admin app** (localhost:3000). For the links to work, log in as manager in the **admin app** (http://localhost:3000). If you use the manager app (e.g. localhost:3003), the sidebar section will appear but `/users` may 404 unless that app also has those pages.

---

## 7. Test Creating a new role

1. Go to **Roles** → **Add new role**.
2. Fill:
   - **Name** (e.g. `custom_manager`).
   - **Display name** (e.g. `Custom Manager`).
   - **Description** (optional).
   - Set some permissions in the matrix.
3. Click **Create** (or **Save**).
4. **Check:**
   - New role appears in the Roles list.
   - Opening it shows the same permissions you set.
   - In Supabase **roles** and **role_permissions**, the new role and its rows exist.

---

## 8. Test User permissions (frontend / API)

1. **Option A – Same browser, different user**
   - Log out, then log in as a **non-admin** user (e.g. HR or Employee).
   - Open DevTools → Network; reload.
   - Find the request to `/api/user/permissions` (or your user permissions endpoint).
   - **Check:** Response returns an array of `{ module, actions }` that matches the role’s `role_permissions` (or `user_permissions` cache if you use it).

2. **Option B – Direct API call**
   - While logged in as that user, open:
     `http://localhost:3000/api/user/permissions`
   - **Check:** JSON like `{ "permissions": [ { "module": "employees", "actions": ["view", "edit"] }, ... ] }`.

---

## 9. Test route protection (optional)

1. Log in as a user **without** e.g. `roles:view` (e.g. a plain Employee).
2. Try to open **http://localhost:3000/roles**.
3. **Check:** You are redirected to **Unauthorized** (or your configured unauthorized page).
4. Log in as **admin** (or a role with `roles:view`).
5. Open **http://localhost:3000/roles** again.
6. **Check:** Roles page loads.

This confirms the authorization middleware and permission-based route checks.

---

## 10. Quick checklist

| Step | What to do | Expected |
|------|------------|----------|
| 1 | Run 01 + 03 (+ 04) in Supabase | No SQL errors |
| 2 | `pnpm dev` and open http://localhost:3000 | Admin app loads |
| 3 | Log in as admin, go to Roles | Roles table with data |
| 4 | Open a role (e.g. HR) | Detail + permission matrix visible |
| 5 | Edit role, change checkboxes, Save | Matrix and DB `role_permissions` updated |
| 6 | Create new role with permissions | New role and rows in DB |
| 7 | Call `/api/user/permissions` as non-admin | Permissions array for that role |
| 8 | Visit /roles as user without permission | Redirect to Unauthorized |

If something fails, check the browser console and Network tab, and Supabase logs (SQL/API) for errors.
