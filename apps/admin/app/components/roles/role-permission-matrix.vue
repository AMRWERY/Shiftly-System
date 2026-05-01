<template>
  <div>
    <div class="card-bg rounded-xl p-4 shadow-lg">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-tx-primary mb-2">
          {{ t("roles.permissions_matrix") }}
        </h3>
        <p class="text-sm text-gray-400">
          {{ t("roles.permissions_matrix_description") }}
        </p>
      </div>

      <div class="overflow-x-auto colored-scrollbar">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-[var(--border-default)]">
              <th class="text-start py-3 px-4 font-semibold text-tx-primary">
                {{ t("roles.module") }}
              </th>
              <th v-for="action in permissionActions" :key="action" class="text-center py-3 px-4">
                <div class="flex flex-col items-center gap-1">
                  <span class="font-semibold text-tx-primary capitalize">{{
                    t(`permissions.actions.${action}`)
                  }}</span>
                  <input type="checkbox" :checked="areAllModulesSelectedForAction(action)"
                    :indeterminate="isSomeModulesSelectedForAction(action)" @change="toggleAllModulesForAction(action)"
                    class="w-4 h-4 text-indigo-400 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                </div>
              </th>
              <th class="text-center py-3 px-4">
                <div class="flex flex-col items-center gap-1">
                  <span class="font-semibold text-tx-primary">{{
                    t("roles.all")
                  }}</span>
                  <input type="checkbox" :checked="areAllPermissionsSelected" :indeterminate="isSomePermissionsSelected"
                    @change="toggleAllPermissions"
                    class="w-4 h-4 text-indigo-400 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="module in permissionModules" :key="module"
              class="border-b border-[var(--border-default)] hover:bg-brand-systemBg/30 transition-colors">
              <td class="py-3 px-4 font-medium text-tx-secondary">
                <div class="flex items-center gap-2">
                  <Icon :name="getModuleIcon(module)" class="w-5 h-5 text-indigo-500" />
                  <span>{{ t(`permissions.modules.${module}`) }}</span>
                </div>
              </td>
              <td v-for="action in permissionActions" :key="`${module}-${action}`" class="text-center py-3 px-4">
                <input type="checkbox" :checked="hasPermission(module, action)"
                  @change="togglePermission(module, action)"
                  class="w-4 h-4 text-indigo-400 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
              </td>
              <td class="text-center py-3 px-4">
                <input type="checkbox" :checked="areAllActionsSelected(module)"
                  :indeterminate="isSomeActionsSelected(module)" @change="toggleAllModuleActions(module)"
                  class="w-4 h-4 text-indigo-400 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showStats" class="mt-6 pt-6 border-t border-[var(--border-default)]">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">{{ t("roles.total_permissions") }}:</span>
          <span class="font-semibold text-indigo-400">{{ selectedPermissionsCount }} /
            {{ totalPossiblePermissions }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  Permission,
  PermissionModule,
  PermissionAction,
} from "@/layers/base/types";

const { t } = useI18n();

const props = defineProps<{
  modelValue: Permission[];
  showStats?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [permissions: Permission[]];
}>();

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

const localPermissions = ref<Permission[]>([...props.modelValue]);

watch(
  () => props.modelValue,
  (newVal) => {
    localPermissions.value = [...newVal];
  },
  { deep: true }
);

watch(
  localPermissions,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

const hasPermission = (
  module: PermissionModule,
  action: PermissionAction
): boolean => {
  const modulePermission = localPermissions.value.find(
    (p) => p.module === module
  );
  return modulePermission?.actions.includes(action) || false;
};

const togglePermission = (
  module: PermissionModule,
  action: PermissionAction
) => {
  const existingIndex = localPermissions.value.findIndex(
    (p) => p.module === module
  );

  if (existingIndex !== -1) {
    const actions = localPermissions.value[existingIndex]!.actions;
    const actionIndex = actions.indexOf(action);

    if (actionIndex !== -1) {
      // Remove action
      actions.splice(actionIndex, 1);
      // If no actions left, remove the module
      if (actions.length === 0) {
        localPermissions.value.splice(existingIndex, 1);
      }
    } else {
      // Add action
      actions.push(action);
    }
  } else {
    // Add new module with action
    localPermissions.value.push({
      module,
      actions: [action],
    });
  }
};

const areAllActionsSelected = (module: PermissionModule): boolean => {
  const modulePermission = localPermissions.value.find(
    (p) => p.module === module
  );
  if (!modulePermission) return false;
  return permissionActions.every((action) =>
    modulePermission.actions.includes(action)
  );
};

const isSomeActionsSelected = (module: PermissionModule): boolean => {
  const modulePermission = localPermissions.value.find(
    (p) => p.module === module
  );
  if (!modulePermission || modulePermission.actions.length === 0) return false;
  return !areAllActionsSelected(module);
};

const toggleAllModuleActions = (module: PermissionModule) => {
  const allSelected = areAllActionsSelected(module);
  const existingIndex = localPermissions.value.findIndex(
    (p) => p.module === module
  );
  if (allSelected) {
    // Deselect all - remove module
    if (existingIndex !== -1) {
      localPermissions.value.splice(existingIndex, 1);
    }
  } else {
    // Select all actions
    if (existingIndex !== -1) {
      localPermissions.value[existingIndex]!.actions = [...permissionActions];
    } else {
      localPermissions.value.push({
        module,
        actions: [...permissionActions],
      });
    }
  }
};

const areAllModulesSelectedForAction = (action: PermissionAction): boolean => {
  return permissionModules.every((module) => hasPermission(module, action));
};

const isSomeModulesSelectedForAction = (action: PermissionAction): boolean => {
  const count = permissionModules.filter((module) =>
    hasPermission(module, action)
  ).length;
  return count > 0 && count < permissionModules.length;
};

const toggleAllModulesForAction = (action: PermissionAction) => {
  const allSelected = areAllModulesSelectedForAction(action);
  permissionModules.forEach((module) => {
    const existingIndex = localPermissions.value.findIndex(
      (p) => p.module === module
    );
    if (allSelected) {
      // Remove this action from all modules
      if (existingIndex !== -1) {
        const actions = localPermissions.value[existingIndex]!.actions;
        const actionIndex = actions.indexOf(action);
        if (actionIndex !== -1) {
          actions.splice(actionIndex, 1);
          if (actions.length === 0) {
            localPermissions.value.splice(existingIndex, 1);
          }
        }
      }
    } else {
      // Add this action to all modules
      if (existingIndex !== -1) {
        if (!localPermissions.value[existingIndex]!.actions.includes(action)) {
          localPermissions.value[existingIndex]!.actions.push(action);
        }
      } else {
        localPermissions.value.push({
          module,
          actions: [action],
        });
      }
    }
  });
};

const areAllPermissionsSelected = computed(() => {
  return permissionModules.every((module) => areAllActionsSelected(module));
});

const isSomePermissionsSelected = computed(() => {
  const hasAny = localPermissions.value.length > 0;
  return hasAny && !areAllPermissionsSelected.value;
});

const toggleAllPermissions = () => {
  if (areAllPermissionsSelected.value) {
    // Deselect all
    localPermissions.value = [];
  } else {
    // Select all
    localPermissions.value = permissionModules.map((module) => ({
      module,
      actions: [...permissionActions],
    }));
  }
};

const selectedPermissionsCount = computed(() => {
  return localPermissions.value.reduce(
    (sum, perm) => sum + perm.actions.length,
    0
  );
});

const totalPossiblePermissions = computed(() => {
  return permissionModules.length * permissionActions.length;
});

const getModuleIcon = (module: PermissionModule): string => {
  const icons: Record<PermissionModule, string> = {
    users: "heroicons:users",
    roles: "heroicons:shield-check",
    employees: "heroicons:user-group",
    payroll: "heroicons:currency-dollar",
    attendance: "heroicons:clock",
    leave: "heroicons:calendar",
    recruitment: "heroicons:briefcase",
    performance: "heroicons:chart-bar",
    training: "heroicons:academic-cap",
    inventory: "heroicons:cube",
    maintenance: "heroicons:wrench",
    finance: "heroicons:banknotes",
    reports: "heroicons:document-chart-bar",
    audit: "heroicons:clipboard-document-check",
    settings: "heroicons:cog-6-tooth",
  };
  return icons[module] || "heroicons:folder";
};
</script>

<style scoped>
/* Indeterminate checkbox styling */
input[type="checkbox"]:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
  background-color: rgb(79 70 229);
  border-color: rgb(79 70 229);
}
</style>