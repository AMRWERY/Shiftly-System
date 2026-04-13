<template>
  <div>
    <div class="p-6">
      <LazyVBackButton />

      <div v-if="role" class="max-w-6xl mx-auto">
        <!-- Header + Stats -->
        <div class="card-bg rounded-xl p-8 mb-6 shadow-lg">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl font-bold text-white">
                  {{ role.displayName }}
                </h1>
                <span v-if="role.isSystemRole"
                  class="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20">
                  {{ t("roles.system_role") }}
                </span>
              </div>
              <code
                class="px-2 py-1 bg-brand-systemBg text-gray-400 rounded text-sm">{{ formatRoleName(role.name) }}</code>
              <p v-if="role.description" class="mt-4 text-gray-400">
                {{ role.description }}
              </p>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
            <div class="flex items-center gap-3 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <div class="p-3 bg-brand-systemBg rounded-lg flex items-center justify-center">
                <Icon name="heroicons:users" class="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">
                  {{ t("roles.total_users") }}
                </p>
                <p class="text-2xl font-bold text-white">
                  {{ role.userCount || 0 }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div class="p-3 bg-brand-systemBg rounded-lg">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-green-500 flex items-center justify-center" />
              </div>
              <div>
                <p class="text-sm text-gray-400">
                  {{ t("roles.permissions_granted") }}
                </p>
                <p class="text-2xl font-bold text-white">
                  {{ permissionsCount }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div class="p-3 bg-brand-systemBg rounded-lg">
                <Icon name="heroicons:calendar" class="w-6 h-6 text-purple-500 flex items-center justify-center" />
              </div>
              <div>
                <p class="text-sm text-gray-400">{{ t("roles.created_on") }}</p>
                <p class="text-lg font-semibold text-white">
                  {{ formatDate(role.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Matrix + Submit -->
        <div class="card-bg rounded-xl p-6 mb-6 shadow-lg">
          <h2 class="text-xl font-semibold text-white mb-6">
            {{ t("roles.role_permissions") }}
          </h2>
          <role-permission-matrix v-model="rolePermissions" :show-stats="true" />
          <div class="mt-6 pt-6 border-t border-gray-700 flex justify-end">
            <LazyVButton type="button" :padding-x="'px-4'" :padding-y="'py-2'" @click="submitPermissions"
              :disabled="saving">
              <span v-if="saving" class="flex items-center gap-2">
                <Icon name="svg-spinners:ring-resize" class="w-4 h-4" />
                {{ t("btn.saving") }}
              </span>
              <span v-else>{{ t("btn.save_changes") }}</span>
            </LazyVButton>
          </div>
        </div>

        <!-- Users with this Role -->
        <div v-if="users && users.length > 0" class="card-bg rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-white mb-6">
            {{ t("roles.users_with_role") }} ({{ users.length }})
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="user in users" :key="user.id"
              class="flex items-center gap-3 p-4 border border-gray-700 rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer"
              @click="navigateTo(`/users/${user.id}`)">
              <div
                class="w-10 h-10 bg-brand-systemBg text-indigo-400 rounded-full flex items-center justify-center font-semibold">
                {{ getInitials(user.first_name, user.last_name) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-white truncate">
                  {{ user.first_name }} {{ user.last_name }}
                </p>
                <p class="text-sm text-gray-400 truncate">{{ user.email }}</p>
              </div>
              <span :class="getStatusClass(user.status)" class="px-2 py-1 text-xs rounded-full">
                {{ user.status }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="card-bg rounded-xl p-12 text-center shadow-lg">
          <Icon name="heroicons:users" class="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p class="text-gray-400">{{ t("roles.no_users_assigned") }}</p>
        </div>
      </div>

      <!-- Loading / Not found -->
      <div v-if="!role && !loading" class="max-w-6xl mx-auto mt-4">
        <div class="card-bg text-center p-8 rounded-2xl shadow-xl">
          <LazyVErrorMessage :error-message="t('roles.role_not_found')" />

          <LazyVEmptyState :message="t('roles.role_not_found')"
            :icon="'material-symbols:shield-alert-outline-rounded'" />
        </div>
      </div>

      <role-details-skeleton-loader v-if="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RoleWithPermissions,
  Permission,
} from "@/layers/base/types";

const { t } = useI18n();
const route = useRoute();
const rolesStore = useRolesStore();
const { getStatusClass } = useStatusClasses();

const roleId = computed(() => route.params.id as string);
const role = ref<RoleWithPermissions | null>(null);
const users = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);

const rolePermissions = ref<Permission[]>([]);

async function loadRole() {
  loading.value = true;
  try {
    const data = await rolesStore.fetchRole(roleId.value);
    role.value = data;
    rolePermissions.value = [...data.permissions];

    const response = await $fetch<{ users: any[] }>(`/api/admin/roles/${roleId.value}`);
    users.value = response.users || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadRole();
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
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
};

const formatRoleName = (name: string) => {
  return (
    name
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ") || name
  );
};

async function submitPermissions() {
  if (!role.value || !roleId.value) return;

  saving.value = true;
  try {
    await rolesStore.updateRole(roleId.value, {
      displayName: role.value.displayName,
      description: role.value.description,
      permissions: rolePermissions.value,
    });
    await loadRole();
  } catch (e) {
    console.error("Failed to update role:", e);
  } finally {
    saving.value = false;
  }
}

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