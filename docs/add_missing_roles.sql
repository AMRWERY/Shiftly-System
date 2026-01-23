-- Add the missing 4 system roles to your database
-- Run this in Supabase SQL Editor

INSERT INTO roles (name, display_name, description, is_system_role) VALUES
('inventory_manager', 'Inventory Manager', 'Inventory and stock management', true),
('maintenance_technician', 'Maintenance Technician', 'Maintenance and repair operations', true),
('system_auditor', 'System Auditor', 'System audit and compliance', true),
('td_officer', 'TD Officer', 'Training and development operations', true);
