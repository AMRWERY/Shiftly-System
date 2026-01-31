<template>
  <div>
    <div class="p-6">
      <back-button />

      <div v-if="role" class="max-w-6xl mx-auto">
        <!-- Header with Role Info -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl font-bold text-gray-400">
                  {{ role.displayName }}
                </h1>
                <span v-if="role.isSystemRole"
                  class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {{ t("roles.system_role") }}
                </span>
              </div>
              <code class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-sm">{{ formatRoleName(role.name) }}</code>
              <p v-if="role.description" class="mt-4 text-gray-300">
                {{ role.description }}
              </p>
            </div>

            <div class="flex gap-3">
              <base-button type="button" variant="outline" @click="openEditDialog" :padding-x="'px-2'"
                :padding-y="'py-1'" :no-border="true">
                <icon name="heroicons:pencil" class="w-4 h-4" />
              </base-button>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <div class="p-3 bg-indigo-100 rounded-lg flex items-center justify-center">
                <icon name="heroicons:users" class="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p class="text-sm text-gray-300">
                  {{ t("roles.total_users") }}
                </p>
                <p class="text-2xl font-bold text-gray-400">
                  {{ role.userCount || 0 }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div class="p-3 bg-green-100 rounded-lg">
                <icon name="heroicons:shield-check" class="w-6 h-6 text-green-600 flex items-center justify-center" />
              </div>
              <div>
                <p class="text-sm text-gray-300">
                  {{ t("roles.permissions_granted") }}
                </p>
                <p class="text-2xl font-bold text-gray-400">
                  {{ permissionsCount }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <div class="p-3 bg-purple-100 rounded-lg">
                <icon name="heroicons:calendar" class="w-6 h-6 text-purple-600 flex items-center justify-center" />
              </div>
              <div>
                <p class="text-sm text-gray-300">{{ t("roles.created_on") }}</p>
                <p class="text-lg font-semibold text-gray-400">
                  {{ formatDate(role.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Matrix (Read-only) -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-400 mb-6">
            {{ t("roles.role_permissions") }}
          </h2>
          <role-permission-matrix v-model="rolePermissions" :show-stats="true" />
        </div>

        <!-- Users with this Role -->
        <div v-if="users && users.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 class="text-xl font-semibold text-gray-400 mb-6">
            {{ t("roles.users_with_role") }} ({{ users.length }})
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="user in users" :key="user.id"
              class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
              @click="navigateTo(`/users/${user.id}`)">
              <div
                class="w-10 h-10 bg-indigo-100 text-indigo-400 rounded-full flex items-center justify-center font-semibold">
                {{ getInitials(user.first_name, user.last_name) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-400 truncate">
                  {{ user.first_name }} {{ user.last_name }}
                </p>
                <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
              </div>
              <span :class="getStatusClass(user.status)" class="px-2 py-1 text-xs rounded-full">
                {{ user.status }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <icon name="heroicons:users" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">{{ t("roles.no_users_assigned") }}</p>
        </div>
      </div>

      <role-details-skeleton-loader v-if="loading" />

      <div v-else class="text-center p-8 bg-white max-w-md rounded-2xl shadow-xl border border-gray-100">
        <custom-error-message :error-message="t('roles.role_not_found')" />

        <no-data-message :message="t('roles.role_not_found')" :icon="'material-symbols:shield-alert-outline-rounded'" />
      </div>

      <!-- Edit Role Dialog -->
      <create-update-role-dialog :is-open="isEditDialogOpen" :role-id="roleId" @close="closeEditDialog"
        @success="handleRoleUpdated" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RoleWithPermissions,
  Permission,
} from "../../../../../layers/base/types";

const { t } = useI18n();
const route = useRoute();
const rolesStore = useRolesStore();
const { getStatusClass } = useStatusClasses();

const roleId = computed(() => route.params.id as string);
const role = ref<RoleWithPermissions | null>(null);
const users = ref<any[]>([]);
const loading = ref(false);
const isEditDialogOpen = ref(false);

const rolePermissions = ref<Permission[]>([]);

onMounted(async () => {
  loading.value = true;
  try {
    const data = await rolesStore.fetchRole(roleId.value);
    role.value = data;
    rolePermissions.value = [...data.permissions];
    // Fetch users with this role
    const response = await $fetch<{ users: any[] }>(
      `/api/admin/roles/${roleId.value}`
    );
    users.value = response.users || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const permissionsCount = computed(() => {
  if (!role.value) return 0;
  return role.value.permissions.reduce(
    (sum, perm) => sum + perm.actions.length,
    0
  );
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""
    }`.toUpperCase();
};

const formatRoleName = (name: string) => {
  return (
    name
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ") || name
  );
};

const openEditDialog = () => {
  isEditDialogOpen.value = true;
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
};

const handleRoleUpdated = async () => {
  closeEditDialog();
  // Reload role data
  loading.value = true;
  try {
    const data = await rolesStore.fetchRole(roleId.value);
    role.value = data;
    rolePermissions.value = [...data.permissions];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

useHead({
  title: computed(() =>
    role.value
      ? `${role.value.displayName} | ${t("meta.role_details")}`
      : t("meta.roles")
  ),
});

definePageMeta({
  layout: "dashboard",
});
</script>