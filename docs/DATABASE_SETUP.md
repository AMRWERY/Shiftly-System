# Database Setup for Role Management

## Required Tables

You need to create two tables in your Supabase database before using the role management system.

### 1. Create `roles` table

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_roles_name ON roles(name);
```

### 2. Create `role_permissions` table

```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  actions TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role_id, module)
);

-- Create index for faster lookups
CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
```

### 3. (Optional) Seed System Roles

```sql
INSERT INTO roles (name, display_name, description, is_system_role) VALUES
('admin', 'Administrator', 'Full system access with all permissions', true),
('hr', 'HR Manager', 'Human resources management and employee operations', true),
('employee', 'Employee', 'Basic employee access', true),
('manager', 'Manager', 'Team and project management', true),
('accountant', 'Accountant', 'Financial and payroll management', true),
('inventory_manager', 'Inventory Manager', 'Inventory and stock management', true),
('td_officer', 'TD Officer', 'Training and development operations', true),
('system_auditor', 'System Auditor', 'System audit and compliance', true),
('maintenance_technician', 'Maintenance Technician', 'Maintenance and repair operations', true);
```

## How to Run

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL scripts above
4. Run each script in order
5. Refresh your application

Once the tables are created, the role management system will work correctly.
