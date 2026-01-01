import type {
  Permission,
  PermissionModule,
  PermissionAction,
} from "../../../../layers/base/types";

export const usePermissionsStore = defineStore("permissions", () => {
  const { triggerToast } = useToast();
  const { t } = useI18n();

  // State
  const permissions = ref<Permission[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const saving = ref(false);

  // Constants
  const permissionModules: PermissionModule[] = [
    "users",
    "roles",
    "employees",
    "payroll",
    "attendance",
    "leave",
    "recruitment",
    "performance",
    "training",
    "inventory",
    "maintenance",
    "finance",
    "reports",
    "audit",
    "settings",
  ];

  const permissionActions: PermissionAction[] = [
    "view",
    "create",
    "edit",
    "delete",
    "approve",
  ];

  // Actions
  async function fetchUserPermissions(userId: string) {
    loading.value = true;
    error.value = null;
    permissions.value = [];

    try {
      const data = await $fetch<{ permissions: Permission[] }>(
        `/api/admin/permissions/${userId}`
      );
      permissions.value = data.permissions || [];
    } catch (err: any) {
      console.error("Error fetching permissions:", err);
      error.value =
        err.statusMessage || err.message || "Failed to load permissions";
      // Don't throw here to allow UI to show error state gracefully
    } finally {
      loading.value = false;
    }
  }

  async function saveUserPermissions(userId: string) {
    saving.value = true;
    error.value = null;

    try {
      await $fetch(`/api/admin/permissions/${userId}`, {
        method: "PUT",
        body: {
          permissions: permissions.value,
        },
      });
      return true;
    } catch (err: any) {
      console.error("Error saving permissions:", err);
      // Let the component handle the specific toast or error display if needed,
      // but we can also set the error state
      error.value =
        err.statusMessage || err.message || "Failed to save permissions";
      return false;
    } finally {
      saving.value = false;
    }
  }

  // Helper to modify local state
  function togglePermission(
    module: PermissionModule,
    action: PermissionAction
  ) {
    const existingIndex = permissions.value.findIndex(
      (p) => p.module === module
    );

    if (existingIndex !== -1) {
      const actions = permissions.value[existingIndex]!.actions;
      const actionIndex = actions.indexOf(action);

      if (actionIndex !== -1) {
        // Remove action
        actions.splice(actionIndex, 1);
        // If no actions left, remove the module
        if (actions.length === 0) {
          permissions.value.splice(existingIndex, 1);
        }
      } else {
        // Add action
        actions.push(action);
      }
    } else {
      // Add new module with action
      permissions.value.push({
        module,
        actions: [action],
      });
    }
  }

  function toggleAllModuleActions(module: PermissionModule) {
    const modulePermission = permissions.value.find((p) => p.module === module);
    const allSelected =
      modulePermission &&
      permissionActions.every((action) =>
        modulePermission.actions.includes(action)
      );

    const existingIndex = permissions.value.findIndex(
      (p) => p.module === module
    );

    if (allSelected) {
      // Deselect all - remove module
      if (existingIndex !== -1) {
        permissions.value.splice(existingIndex, 1);
      }
    } else {
      // Select all actions
      if (existingIndex !== -1) {
        permissions.value[existingIndex]!.actions = [...permissionActions];
      } else {
        permissions.value.push({
          module,
          actions: [...permissionActions],
        });
      }
    }
  }

  function hasPermission(
    module: PermissionModule,
    action: PermissionAction
  ): boolean {
    const modulePermission = permissions.value.find((p) => p.module === module);
    return modulePermission?.actions.includes(action) || false;
  }

  function areAllActionsSelected(module: PermissionModule): boolean {
    const modulePermission = permissions.value.find((p) => p.module === module);
    if (!modulePermission) return false;
    return permissionActions.every((action) =>
      modulePermission.actions.includes(action)
    );
  }

  function resetState() {
    permissions.value = [];
    error.value = null;
    loading.value = false;
  }

  return {
    // State
    permissions,
    loading,
    error,
    saving,

    // Constants
    permissionModules,
    permissionActions,

    // Actions
    fetchUserPermissions,
    saveUserPermissions,
    togglePermission,
    toggleAllModuleActions,
    hasPermission,
    areAllActionsSelected,
    resetState,
  };
});
