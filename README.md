# Nexux ERP System

A modern ERP system built with Nuxt 4, Supabase, and Tailwind CSS v3.4.17, designed to support multiple user roles with role-based access control.

## 🏗️ Project Structure

```
Nexux/
├── apps/                    # Individual user applications
│   ├── admin/              # Admin portal (Port 3000)
│   ├── hr/                 # HR portal (Port 3001)
│   ├── employee/           # Employee portal (Port 3002)
│   ├── manager/            # Manager portal (Port 3003)
│   └── accountant/         # Accountant portal (Port 3004)
│       ├── pages/          # App-specific pages
│       ├── app.vue         # App root component
│       ├── nuxt.config.ts  # App configuration (extends base layer)
│       └── package.json    # App dependencies
├── layers/                  # Shared layers
│   └── base/               # Base layer with shared dependencies
│       ├── assets/         # Shared CSS and assets
│       ├── composables/    # Shared composables (useAuth, etc.)
│       ├── middleware/     # Global middleware (auth, etc.)
│       ├── stores/         # Pinia stores (auth store, etc.)
│       ├── types/          # Shared TypeScript types
│       ├── nuxt.config.ts  # Layer configuration
│       ├── tailwind.config.ts
│       └── package.json    # Layer dependencies
├── package.json            # Root package.json with workspace scripts
└── pnpm-workspace.yaml     # PNPM workspace configuration
```

## 👥 User Roles

This ERP system supports 5 different user roles:

1. **Admin** - Full system access and control
2. **HR** - Human resources management
3. **Employee** - Standard employee access
4. **Manager** - Team and project management
5. **Accountant** - Financial and accounting access

Each role has specific permissions and access levels defined in the auth store.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM 10.18.0+
- Supabase account

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Supabase credentials:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SECRET_KEY=your-supabase-service-role-key
   ```
   
   **Important:** 
   - Get these values from your Supabase Dashboard > Settings > API
   - The `SUPABASE_SECRET_KEY` (service role key) is required for server-side admin operations like inviting users
   - Never expose `SUPABASE_SECRET_KEY` in client-side code or public repositories

3. **Run the admin app:**
   ```bash
   pnpm dev
   # or specifically
   pnpm dev:admin
   ```

The admin app will be available at `http://localhost:3000`

## 📦 Shared Dependencies

All apps automatically have access to these dependencies through the base layer:

- **Tailwind CSS v3.4.17** - Utility-first CSS framework
- **Pinia** - State management
- **Supabase** - Backend as a Service (Auth, Database, Real-time)

### How It Works

The `layers/base` contains all shared configurations and dependencies. Each app in `apps/` extends this base layer by adding this to their `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ['../../layers/base'],
  // ... app-specific config
})
```

This means:
- ✅ Install dependencies once in the base layer
- ✅ Configure Tailwind, Pinia, Supabase once
- ✅ Share composables, stores, and middleware across all apps
- ✅ Maintain consistent styling and behavior

## 🎨 Tailwind CSS

Tailwind CSS v3.4.17 is configured in the base layer with:

- Custom color palette (primary, secondary)
- Inter font family
- Reusable component classes (btn, card, input)
- Responsive utilities

Use Tailwind classes in any app:

```vue
<button class="btn btn-primary">Click me</button>
<div class="card">Content here</div>
```

## 🗄️ State Management (Pinia)

The base layer includes an auth store (`stores/auth.ts`) with:

- User authentication state
- Role-based access control
- Permission checking
- Route access validation

Use in any component:

```vue
<script setup>
const authStore = useAuthStore()
const isAdmin = authStore.isAdmin
const hasPermission = authStore.hasPermission('edit_users')
</script>
```

## 🔐 Authentication (Supabase)

The `useAuth` composable provides authentication methods:

```vue
<script setup>
const { signIn, signOut, user } = useAuth()

const login = async () => {
  const { data, error } = await signIn(email, password)
}
</script>
```

### Database Schema

You'll need to create these tables in Supabase:

**user_roles table:**
```sql
create table user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  role text not null check (role in ('admin', 'hr', 'employee', 'manager', 'accountant')),
  created_at timestamp with time zone default now()
);
```

**role_permissions table:**
```sql
create table role_permissions (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  permission text not null,
  created_at timestamp with time zone default now()
);
```

## 🔨 Creating New Apps

To create a new app for a different user role (e.g., HR):

1. **Create app directory:**
   ```bash
   mkdir -p apps/hr
   ```

2. **Create `package.json`:**
   ```json
   {
     "name": "@Nexux/hr",
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "nuxt dev --port 3001",
       "build": "nuxt build"
     },
     "dependencies": {
       "nuxt": "^3.15.1"
     }
   }
   ```

3. **Create `nuxt.config.ts`:**
   ```typescript
   export default defineNuxtConfig({
     extends: ['../../layers/base'],
     compatibilityDate: '2024-11-01',
     app: {
       head: {
         title: 'Nexux - HR Portal'
       }
     }
   })
   ```

4. **Create `app.vue` and pages:**
   Follow the same structure as the admin app.

5. **Add script to root `package.json`:**
   ```json
   {
     "scripts": {
       "dev:hr": "pnpm --filter hr dev"
     }
   }
   ```

6. **Install and run:**
   ```bash
   pnpm install
   pnpm dev:hr
   ```

## 📝 Available Scripts

### Development
- `pnpm dev` - Run the admin app (default)
- `pnpm dev:admin` - Run the admin app (Port 3000)
- `pnpm dev:hr` - Run the HR app (Port 3001)
- `pnpm dev:employee` - Run the employee app (Port 3002)
- `pnpm dev:manager` - Run the manager app (Port 3003)
- `pnpm dev:accountant` - Run the accountant app (Port 3004)

### Build
- `pnpm build` - Build all apps
- `pnpm build:admin` - Build admin app only
- `pnpm build:hr` - Build HR app only
- `pnpm build:employee` - Build employee app only
- `pnpm build:manager` - Build manager app only
- `pnpm build:accountant` - Build accountant app only

### Other
- `pnpm install:all` - Install all dependencies

## 🛡️ Route Protection

The base layer includes a global auth middleware that:

- Redirects unauthenticated users to `/login`
- Checks role-based access for protected routes
- Allows public routes (login, signup, etc.)

Configure route access in `stores/auth.ts`:

```typescript
const routeAccess: Record<string, UserRole[]> = {
  admin: ['admin'],
  hr: ['admin', 'hr'],
  // ... more routes
}
```

## 🎯 Next Steps

1. Set up your Supabase project and database tables
2. Configure environment variables in `.env`
3. Run any of the 5 apps using the dev scripts above
4. Customize the base layer with your branding and additional shared components
5. Add role-specific features to each app
6. Implement actual business logic and database operations

## 📚 Resources

- [Nuxt 4 Documentation](https://nuxt.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

ISC
