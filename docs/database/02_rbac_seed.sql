-- =============================================================================
-- Seed: Roles and Permissions (permission keys + default role_permissions)
-- Run after 01_rbac_schema.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Insert system roles (idempotent: skip if already present)
-- -----------------------------------------------------------------------------
INSERT INTO public.roles (name, display_name, description, is_system_role)
VALUES
  ('admin', 'Administrator', 'Full system access with all permissions', true),
  ('hr', 'HR Manager', 'Human resources management and employee operations', true),
  ('employee', 'Employee', 'Basic employee access', true),
  ('manager', 'Manager', 'Team and project management', true),
  ('accountant', 'Accountant', 'Financial and payroll management', true),
  ('inventory_manager', 'Inventory Manager', 'Inventory and stock management', true),
  ('td_officer', 'TD Officer', 'Training and development operations', true),
  ('system_auditor', 'System Auditor', 'System audit and compliance', true),
  ('maintenance_technician', 'Maintenance Technician', 'Maintenance and repair operations', true)
ON CONFLICT (name) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. Insert all permission keys (module:action)
-- -----------------------------------------------------------------------------
INSERT INTO public.permissions (key, module, action, description)
VALUES
  ('users:view', 'users', 'view', 'View users'),
  ('users:create', 'users', 'create', 'Create users'),
  ('users:edit', 'users', 'edit', 'Edit users'),
  ('users:delete', 'users', 'delete', 'Delete users'),
  ('users:approve', 'users', 'approve', 'Approve users'),
  ('roles:view', 'roles', 'view', 'View roles'),
  ('roles:create', 'roles', 'create', 'Create roles'),
  ('roles:edit', 'roles', 'edit', 'Edit roles'),
  ('roles:delete', 'roles', 'delete', 'Delete roles'),
  ('roles:approve', 'roles', 'approve', 'Approve roles'),
  ('employees:view', 'employees', 'view', 'View employees'),
  ('employees:create', 'employees', 'create', 'Create employees'),
  ('employees:edit', 'employees', 'edit', 'Edit employees'),
  ('employees:delete', 'employees', 'delete', 'Delete employees'),
  ('employees:approve', 'employees', 'approve', 'Approve employees'),
  ('payroll:view', 'payroll', 'view', 'View payroll'),
  ('payroll:create', 'payroll', 'create', 'Create payroll'),
  ('payroll:edit', 'payroll', 'edit', 'Edit payroll'),
  ('payroll:delete', 'payroll', 'delete', 'Delete payroll'),
  ('payroll:approve', 'payroll', 'approve', 'Approve payroll'),
  ('attendance:view', 'attendance', 'view', 'View attendance'),
  ('attendance:create', 'attendance', 'create', 'Create attendance'),
  ('attendance:edit', 'attendance', 'edit', 'Edit attendance'),
  ('attendance:delete', 'attendance', 'delete', 'Delete attendance'),
  ('attendance:approve', 'attendance', 'approve', 'Approve attendance'),
  ('leave:view', 'leave', 'view', 'View leave'),
  ('leave:create', 'leave', 'create', 'Create leave'),
  ('leave:edit', 'leave', 'edit', 'Edit leave'),
  ('leave:delete', 'leave', 'delete', 'Delete leave'),
  ('leave:approve', 'leave', 'approve', 'Approve leave'),
  ('recruitment:view', 'recruitment', 'view', 'View recruitment'),
  ('recruitment:create', 'recruitment', 'create', 'Create recruitment'),
  ('recruitment:edit', 'recruitment', 'edit', 'Edit recruitment'),
  ('recruitment:delete', 'recruitment', 'delete', 'Delete recruitment'),
  ('recruitment:approve', 'recruitment', 'approve', 'Approve recruitment'),
  ('performance:view', 'performance', 'view', 'View performance'),
  ('performance:create', 'performance', 'create', 'Create performance'),
  ('performance:edit', 'performance', 'edit', 'Edit performance'),
  ('performance:delete', 'performance', 'delete', 'Delete performance'),
  ('performance:approve', 'performance', 'approve', 'Approve performance'),
  ('training:view', 'training', 'view', 'View training'),
  ('training:create', 'training', 'create', 'Create training'),
  ('training:edit', 'training', 'edit', 'Edit training'),
  ('training:delete', 'training', 'delete', 'Delete training'),
  ('training:approve', 'training', 'approve', 'Approve training'),
  ('inventory:view', 'inventory', 'view', 'View inventory'),
  ('inventory:create', 'inventory', 'create', 'Create inventory'),
  ('inventory:edit', 'inventory', 'edit', 'Edit inventory'),
  ('inventory:delete', 'inventory', 'delete', 'Delete inventory'),
  ('inventory:approve', 'inventory', 'approve', 'Approve inventory'),
  ('maintenance:view', 'maintenance', 'view', 'View maintenance'),
  ('maintenance:create', 'maintenance', 'create', 'Create maintenance'),
  ('maintenance:edit', 'maintenance', 'edit', 'Edit maintenance'),
  ('maintenance:delete', 'maintenance', 'delete', 'Delete maintenance'),
  ('maintenance:approve', 'maintenance', 'approve', 'Approve maintenance'),
  ('finance:view', 'finance', 'view', 'View finance'),
  ('finance:create', 'finance', 'create', 'Create finance'),
  ('finance:edit', 'finance', 'edit', 'Edit finance'),
  ('finance:delete', 'finance', 'delete', 'Delete finance'),
  ('finance:approve', 'finance', 'approve', 'Approve finance'),
  ('reports:view', 'reports', 'view', 'View reports'),
  ('reports:create', 'reports', 'create', 'Create reports'),
  ('reports:edit', 'reports', 'edit', 'Edit reports'),
  ('reports:delete', 'reports', 'delete', 'Delete reports'),
  ('reports:approve', 'reports', 'approve', 'Approve reports'),
  ('audit:view', 'audit', 'view', 'View audit'),
  ('audit:create', 'audit', 'create', 'Create audit'),
  ('audit:edit', 'audit', 'edit', 'Edit audit'),
  ('audit:delete', 'audit', 'delete', 'Delete audit'),
  ('audit:approve', 'audit', 'approve', 'Approve audit'),
  ('settings:view', 'settings', 'view', 'View settings'),
  ('settings:create', 'settings', 'create', 'Create settings'),
  ('settings:edit', 'settings', 'edit', 'Edit settings'),
  ('settings:delete', 'settings', 'delete', 'Delete settings'),
  ('settings:approve', 'settings', 'approve', 'Approve settings')
ON CONFLICT (key) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. Grant admin role ALL permissions (for Administrator)
-- -----------------------------------------------------------------------------
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 4. Optional: Grant default permissions to other system roles
-- (Customize per your needs; employee gets minimal, hr/manager get more)
-- -----------------------------------------------------------------------------
-- Employee: profile, leave (view/create), attendance (view), payroll (view)
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
JOIN public.permissions p ON p.key IN (
  'leave:view', 'leave:create', 'attendance:view', 'attendance:create',
  'payroll:view', 'performance:view'
)
WHERE r.name = 'employee'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- HR: employees, attendance, leave, recruitment, performance, etc.
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
JOIN public.permissions p ON p.module IN ('employees', 'attendance', 'leave', 'recruitment', 'performance', 'payroll')
WHERE r.name = 'hr'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Manager: employees view, leave approve, payroll approve, reports
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
JOIN public.permissions p ON p.key IN (
  'employees:view', 'leave:approve', 'payroll:approve', 'reports:view',
  'performance:view', 'performance:approve'
)
WHERE r.name = 'manager'
ON CONFLICT (role_id, permission_id) DO NOTHING;
