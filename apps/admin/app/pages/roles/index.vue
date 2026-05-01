<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div class="flex min-h-0 flex-1 flex-col p-6">
      <!-- Loading State -->
      <LazyVTableSkeletonLoader v-if="pending" :headers="columns" />

      <template v-else>
        <div class="flex flex-1 min-h-0 flex-col">
          <!-- Header + Controls Row -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6 shrink-0">
            <h1 class="text-2xl font-semibold text-gray-400">
              {{ t("layouts.roles") }}
            </h1>

            <!-- Controls: Search + Refresh + Add Button -->
            <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <!-- LazyVSearchInput component -->
              <LazyVSearchInput v-model="localSearchTerm" @search="handleSearch" :placeholder="t('form.search_roles')"
                class="w-full sm:w-[300px]" :debounce="300" />

              <!-- LazyVRefreshButton component -->
              <LazyVRefreshButton @refresh="refreshRoles" :is-loading="pending" />

              <!-- Add New Role Button -->
              <LazyVButton type="button" padding-x="px-6" padding-y="py-2.5" class="transition-colors whitespace-nowrap"
                @click="openCreateDialog">
                {{ t("btn.add_new_role") }}
              </LazyVButton>
            </div>
          </div>

          <LazyVErrorMessage v-if="error" :error-message="t('toast.failed_to_load_roles')" />

          <!-- Roles Table -->
          <LazyVTable v-else :columns="columns" :items="paginatedRoles" :current-page="currentPage"
            :total-pages="totalPages" :total-items="rolesStore.filteredRoles.length"
            :page-size="rolesStore.itemsPerPage" show-download-menu :download-items="rolesStore.filteredRoles"
            export-file-name="roles" :has-view="true" :has-edit="false" :has-delete="false"
            :action-conditions="actionConditions" class="min-h-0 flex-1" @view="handleViewRole"
            @page-change="handlePageChange" />
        </div>
      </template>

      <!-- Create Role Dialog -->
      <create-update-role-dialog :is-open="isCreateDialogOpen" @close="closeCreateDialog"
        @success="handleRoleCreated" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from "@/layers/base/types/tables";
import type { RoleWithPermissions } from "@/layers/base/types";

const { t } = useI18n();
const rolesStore = useRolesStore();

const isCreateDialogOpen = ref(false);
const localSearchTerm = ref("");

// Fetch roles on mount
onMounted(async () => {
  await rolesStore.fetchRoles();
});

// Format role name helper
const formatRoleName = (name: string) => {
  return name?.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ') || name
}

// Define table columns
const columns = computed<Column[]>(() => [
  {
    key: "displayName",
    label: t("table.role_name") || "Role Name",
    sortable: true,
    html: true,
    format: (item: any) => {
      const badge = item.isSystemRole
        ? '<span class="ms-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">System</span>'
        : "";
      return `<span class="font-semibold text-gray-400">${item.displayName}</span>${badge}`;
    },
  },
  {
    key: "name",
    label: t("table.role"),
    sortable: true,
    html: true,
    format: (item: any) =>
      `<code class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">${formatRoleName(item.name)}</code>`,
  },
  {
    key: "description",
    label: t("table.description"),
    sortable: false,
    format: (item: any) => item.description || "-",
  },
  {
    key: "userCount",
    label: t("table.users"),
    sortable: true,
    html: true,
    format: (item: any) =>
      `<span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">${item.userCount || 0
      }</span>`,
  },
  {
    key: "createdAt",
    label: t("table.created_at"),
    sortable: true,
    format: (item: any) => new Date(item.createdAt).toLocaleDateString(),
  },
]);

// Get data from store
const paginatedRoles = computed(() => rolesStore.paginatedRoles);
const totalPages = computed(() => rolesStore.totalPages);
const currentPage = computed(() => rolesStore.currentPage);
const pending = computed(() => rolesStore.loading);
const error = computed(() => rolesStore.error);

const refreshRoles = async () => {
  await rolesStore.fetchRoles();
};

const handleSearch = (term: string) => {
  rolesStore.setSearchTerm(term);
};

const handlePageChange = (page: number) => {
  rolesStore.setCurrentPage(page);
};

// Action conditions based on role type
const actionConditions = computed(() => ({
  view: () => true,
}));

// Action handlers
const openCreateDialog = () => {
  isCreateDialogOpen.value = true;
};

const closeCreateDialog = () => {
  isCreateDialogOpen.value = false;
};

const handleRoleCreated = () => {
  closeCreateDialog();
  refreshRoles();
};

const handleViewRole = (role: RoleWithPermissions) => {
  navigateTo(`/roles/${role.id}`);
};

useSeoPage({
  title: () => t("meta.roles"),
  description: () => t("meta.roles_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>