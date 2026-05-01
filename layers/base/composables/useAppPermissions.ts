import type { PermissionModule, PermissionAction } from "../types";

/** Default permissions per role when API has not returned permissions yet (sidebar fallback) */
const DEFAULT_ROLE_PERMISSIONS: Record<
  string,
  { module: string; actions: string[] }[]
> = {
  admin: [],
  manager: [
    { module: "employees", actions: ["view"] },
    { module: "leave", actions: ["approve"] },
    { module: "payroll", actions: ["approve"] },
    { module: "reports", actions: ["view"] },
    { module: "performance", actions: ["view"] },
  ],
  hr: [
    { module: "employees", actions: ["view", "create", "edit", "delete"] },
    { module: "attendance", actions: ["view", "create", "edit"] },
    { module: "leave", actions: ["view", "create", "edit", "approve"] },
    { module: "performance", actions: ["view", "create", "edit"] },
    { module: "recruitment", actions: ["view", "create", "edit"] },
    { module: "payroll", actions: ["view"] },
  ],
  employee: [
    { module: "leave", actions: ["create", "view"] },
    { module: "payroll", actions: ["view"] },
    { module: "attendance", actions: ["view", "create"] },
  ],
  accountant: [
    { module: "payroll", actions: ["create", "view", "approve", "edit"] },
    { module: "reports", actions: ["view", "create"] },
  ],
  inventory_manager: [
    { module: "inventory", actions: ["view", "create", "edit"] },
  ],
  maintenance_technician: [
    { module: "maintenance", actions: ["view", "edit"] },
    { module: "inventory", actions: ["view"] },
  ],
  system_auditor: [
    { module: "reports", actions: ["view"] },
    { module: "audit", actions: ["view"] },
  ],
  td_officer: [
    { module: "training", actions: ["view", "create", "edit", "approve"] },
    { module: "reports", actions: ["view"] },
  ],
};

const getDefaultPermissionsForRole = (
  role: string | undefined,
): { module: string; actions: string[] }[] => {
  if (!role) return DEFAULT_ROLE_PERMISSIONS.employee ?? [];
  const key = role.toLowerCase().replace(/-/g, "_");
  return (
    DEFAULT_ROLE_PERMISSIONS[key] ?? DEFAULT_ROLE_PERMISSIONS.employee ?? []
  );
}

export const useAppPermissions = () => {
  const authStore = useAuthStore();
  const { userPermissions } = storeToRefs(authStore);

  const effectivePermissions = computed(() => {
    const role = authStore.currentUserRole;
    const defaults = getDefaultPermissionsForRole(role).map((p) => ({
      module: p.module as PermissionModule,
      actions: p.actions as PermissionAction[],
    }));
    const fromApi = userPermissions.value;
    if (!fromApi || fromApi.length === 0) return defaults;
    // Merge: start with role defaults, then overlay API permissions (API wins per module)
    const byModule = new Map<
      string,
      { module: PermissionModule; actions: PermissionAction[] }
    >();
    for (const p of defaults) {
      byModule.set(p.module, { ...p });
    }
    for (const p of fromApi) {
      byModule.set(p.module, { module: p.module, actions: [...p.actions] });
    }
    return Array.from(byModule.values());
  });

  /**
   * Check if user has a specific permission
   */
  const hasPermission = (
    module: PermissionModule,
    action: PermissionAction,
  ): boolean => {
    if (authStore.isAdmin) return true;

    const permissions = effectivePermissions.value;
    if (!permissions?.length) return false;

    const permission = permissions.find((p) => p.module === module);
    if (!permission) return false;

    return permission.actions.includes(action);
  };

  /**
   * Check if user has ANY of the specified actions on a module
   */
  const hasAnyPermission = (
    module: PermissionModule,
    actions: PermissionAction[],
  ): boolean => {
    if (authStore.isAdmin) return true;
    const permissions = effectivePermissions.value;
    if (!permissions?.length) return false;

    const permission = permissions.find((p) => p.module === module);
    if (!permission) return false;

    return actions.some((action) => permission.actions.includes(action));
  };

  return {
    hasPermission,
    hasAnyPermission,
  };
};
