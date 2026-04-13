# App Port Assignments

This document outlines the port assignments for each role-specific application in the Nexux ERP system.

## Port Configuration

| Role                   | App Name               | Port | URL                                     |
| ---------------------- | ---------------------- | ---- | --------------------------------------- |
| Admin                  | admin                  | 3000 | http://localhost:3000                   |
| HR                     | hr                     | 3001 | http://localhost:3001                   |
| Employee               | employee               | 3002 | http://localhost:3002                   |
| Manager                | manager                | 3003 | http://localhost:3003 (not yet created) |
| Accountant             | accountant             | 3004 | http://localhost:3004                   |
| Inventory Manager      | inventory-manager      | 3006 | http://localhost:3006                   |
| TD Officer             | td-officer             | 3007 | http://localhost:3007                   |
| System Auditor         | system-auditor         | 3008 | http://localhost:3008                   |
| Maintenance Technician | maintenance-technician | 3009 | http://localhost:3009                   |

## How It Works

1. **Login Redirection**: When a user logs in, they are automatically redirected to their role-specific app based on their user role.

2. **Middleware Protection**: The `role-redirect.global.ts` middleware ensures that if a user somehow navigates to the wrong app, they are automatically redirected to their correct app.

3. **Configuration**: Port assignments can be customized via environment variables:
   - `ADMIN_APP_URL`
   - `HR_APP_URL`
   - `EMPLOYEE_APP_URL`
   - etc.

## Running Multiple Apps

To run multiple apps simultaneously for testing:

```bash
# Terminal 1 - Admin app
npm run dev:admin

# Terminal 2 - HR app
npm run dev:hr

# Terminal 3 - Employee app
npm run dev:employee

# etc.
```

## Production Configuration

In production, each app should be deployed separately with its own domain or subdomain:

- Admin: https://admin.nexux.com
- HR: https://hr.nexux.com
- Employee: https://employee.nexux.com
- etc.

Update the environment variables accordingly for production deployments.
