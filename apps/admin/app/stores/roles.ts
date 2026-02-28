import type {
  RoleWithPermissions,
  Permission
} from "../../../../layers/base/types";

export const useRolesStore = defineStore("roles", () => {
  const { t } = useI18n();
  const { triggerToast } = useToast();

  // State
  const roles = ref<RoleWithPermissions[]>([]);
  const currentRole = ref<RoleWithPermissions | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const saving = ref(false);

  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(8);
  const searchTerm = ref("");

  // Getters
  const filteredRoles = computed(() => {
    if (!searchTerm.value) return roles.value;
    const term = searchTerm.value.toLowerCase();
    return roles.value.filter(
      (role) =>
        role.displayName.toLowerCase().includes(term) ||
        role.name.toLowerCase().includes(term) ||
        role.description.toLowerCase().includes(term),
    );
  });

  const totalPages = computed(() =>
    Math.ceil(filteredRoles.value.length / itemsPerPage.value),
  );

  const paginatedRoles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredRoles.value.slice(start, end);
  });

  const getRoleById = (id: string) => {
    return roles.value.find((role) => role.id === id);
  };

  // Actions
  async function fetchRoles() {
    loading.value = true;
    error.value = null;
    try {
      const data = await $fetch<{ roles: RoleWithPermissions[] }>(
        "/api/admin/roles",
      );
      roles.value = data.roles || [];
    } catch (err: any) {
      console.error("Error fetching roles:", err);
      error.value = err.statusMessage || err.message || "Failed to load roles";
      triggerToast({
        message: t("toast.failed_to_load_roles"),
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
    } finally {
      loading.value = false;
    }
  }

  async function fetchRole(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{ role: RoleWithPermissions }>(
        `/api/admin/roles/${id}`,
      );
      currentRole.value = data.role;
      return data.role;
    } catch (err: any) {
      console.error("Error fetching role:", err);
      error.value = err.statusMessage || err.message || "Failed to load role";
      triggerToast({
        message: t("toast.failed_to_load_role"),
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createRole(roleData: {
    name: string;
    displayName: string;
    description: string;
    permissions: Permission[];
  }) {
    saving.value = true;
    error.value = null;
    try {
      const data = await $fetch<{ role: RoleWithPermissions }>(
        "/api/admin/roles",
        {
          method: "POST",
          body: roleData,
        },
      );
      roles.value.push(data.role);
      triggerToast({
        message: t("toast.role_created_successfully"),
        type: "success",
        icon: "mdi-check-circle",
      });
      return data.role;
    } catch (err: any) {
      console.error("Error creating role:", err);
      error.value = err.statusMessage || err.message || "Failed to create role";
      triggerToast({
        message: error.value,
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      throw err;
    } finally {
      saving.value = false;
    }
  }

  async function updateRole(
    id: string,
    roleData: {
      displayName?: string;
      description?: string;
      permissions?: Permission[];
    },
  ) {
    saving.value = true;
    error.value = null;
    try {
      const data = await $fetch<{ role: RoleWithPermissions }>(
        `/api/admin/roles/${id}`,
        {
          method: "PUT",
          body: roleData,
        },
      );
      const index = roles.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        roles.value[index] = data.role;
      }
      currentRole.value = data.role;
      triggerToast({
        message: t("toast.role_updated_successfully"),
        type: "success",
        icon: "mdi-check-circle",
      });
      return data.role;
    } catch (err: any) {
      console.error("Error updating role:", err);
      error.value = err.statusMessage || err.message || "Failed to update role";
      triggerToast({
        message: error.value,
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      throw err;
    } finally {
      saving.value = false;
    }
  }

  async function deleteRole(id: string) {
    saving.value = true;
    error.value = null;
    try {
      await $fetch(`/api/admin/roles/${id}`, {
        method: "DELETE",
      });
      const index = roles.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        roles.value.splice(index, 1);
      }
      triggerToast({
        message: t("toast.role_deleted_successfully"),
        type: "success",
        icon: "mdi-check-circle",
      });
    } catch (err: any) {
      console.error("Error deleting role:", err);
      error.value = err.statusMessage || err.message || "Failed to delete role";
      triggerToast({
        message: error.value,
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      throw err;
    } finally {
      saving.value = false;
    }
  }

  function setSearchTerm(term: string) {
    searchTerm.value = term;
    currentPage.value = 1; // Reset to first page on search
  }

  function setCurrentPage(page: number) {
    currentPage.value = page;
  }

  function resetState() {
    currentRole.value = null;
    error.value = null;
    loading.value = false;
  }

  return {
    // State
    roles,
    currentRole,
    loading,
    error,
    saving,
    currentPage,
    searchTerm,

    // Getters
    filteredRoles,
    totalPages,
    paginatedRoles,
    getRoleById,

    // Actions
    fetchRoles,
    fetchRole,
    createRole,
    updateRole,
    deleteRole,
    setSearchTerm,
    setCurrentPage,
    resetState,
  };
});
