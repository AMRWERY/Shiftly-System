import type {
  UserListItem,
  UserRole,
  InviteUserData,
} from "@/layers/base/types";

export const useUsersStore = defineStore("users", () => {
  // State
  const users = ref<UserListItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedRole = ref<UserRole | "all">("all");
  const currentPage = ref(1);
  const itemsPerPage = ref(8);
  const searchTerm = ref("");

  // Getters
  // Get filtered users (excluding admins and filtered by role/search)
  const filteredUsers = computed(() => {
    let filtered = users.value.filter(
      (user: UserListItem) => user.role !== "admin",
    );
    if (selectedRole.value !== "all") {
      filtered = filtered.filter(
        (user: UserListItem) => user.role === selectedRole.value,
      );
    }
    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (user: UserListItem) =>
          user.fullName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.employeeId?.toLowerCase().includes(term),
      );
    }
    return filtered;
  });

  // Get user by ID
  const getUserById = computed(() => (id: string): UserListItem | undefined => {
    return users.value.find((user) => user.id === id);
  });

  // Get users by status
  const getUsersByStatus = computed(
    () =>
      (status: "active" | "pending" | "blocked"): UserListItem[] => {
        return users.value.filter(
          (user: UserListItem) => user.status === status,
        );
      },
  );

  // Paginated users
  const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    // Access other computed getters directly via their .value
    return filteredUsers.value.slice(startIndex, endIndex);
  });

  // Total pages
  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
  });

  // Actions
  // Fetch all users
  async function fetchUsers() {
    loading.value = true;
    error.value = null;
    try {
      const data = await $fetch<UserListItem[]>("/api/admin/users");
      users.value = data || [];
      currentPage.value = 1;
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching users:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Block a user
  async function blockUser(userId: string) {
    try {
      // Optimistic update
      const userIndex = users.value.findIndex(
        (u: UserListItem) => u.id === userId,
      );
      if (userIndex !== -1) {
        const user = users.value[userIndex];
        if (user) {
          const previousStatus = user.status;
          user.status = "blocked";
          try {
            await $fetch(`/api/admin/users/${userId}`, {
              method: "PATCH",
            });
            return { success: true, message: "User blocked successfully" };
          } catch (err: any) {
            // Revert on error
            user.status = previousStatus;
            throw err;
          }
        }
      }
    } catch (err: any) {
      console.error("Error blocking user:", err);
      throw err;
    }
  }

  // Unblock a user
  async function unblockUser(userId: string) {
    try {
      // Optimistic update
      const userIndex = users.value.findIndex(
        (u: UserListItem) => u.id === userId,
      );
      if (userIndex !== -1) {
        const user = users.value[userIndex];
        if (user) {
          const previousStatus = user.status;
          user.status = "active";
          try {
            await $fetch(`/api/admin/users/${userId}`, {
              method: "PATCH",
            });
            return { success: true, message: "User unblocked successfully" };
          } catch (err: any) {
            // Revert on error
            user.status = previousStatus;
            throw err;
          }
        }
      }
    } catch (err: any) {
      console.error("Error unblocking user:", err);
      throw err;
    }
  }

  // Delete a user
  async function deleteUser(userId: string) {
    try {
      await $fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      // Remove from local state
      users.value = users.value.filter((u: UserListItem) => u.id !== userId);
      return { success: true, message: "User deleted successfully" };
    } catch (err: any) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }

  // Deactivate a user (permanent action)
  async function deactivateUser(userId: string) {
    try {
      // Optimistic update
      const userIndex = users.value.findIndex(
        (u: UserListItem) => u.id === userId,
      );
      if (userIndex !== -1) {
        const user = users.value[userIndex];
        if (user) {
          const previousStatus = user.status;
          user.status = "deactivated";
          try {
            await $fetch(`/api/admin/users/${userId}/deactivate`, {
              method: "PATCH",
            });
            return { success: true, message: "User deactivated successfully" };
          } catch (err: any) {
            // Revert on error
            user.status = previousStatus;
            throw err;
          }
        }
      }
    } catch (err: any) {
      console.error("Error deactivating user:", err);
      throw err;
    }
  }

  // Invite a new user
  async function inviteUser(userData: InviteUserData) {
    try {
      const data = await $fetch<UserListItem>("/api/admin/users/invite", {
        method: "POST",
        body: userData,
      });
      // Add to local state
      if (data) {
        users.value.unshift(data);
      }
      return { success: true, data, message: "User invited successfully" };
    } catch (err: any) {
      console.error("Error inviting user:", err);
      throw err;
    }
  }

  // Set selected role filter
  function setSelectedRole(role: UserRole | "all") {
    selectedRole.value = role;
    currentPage.value = 1;
  }

  // Set current page
  function setCurrentPage(page: number) {
    currentPage.value = page;
  }

  function setSearchTerm(term: string) {
    searchTerm.value = term;
    currentPage.value = 1;
  }

  // Fetch single user
  async function fetchUser(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const data = await $fetch<UserListItem>(`/api/admin/users/${id}`);
      // Update user in list if exists, otherwise add to list
      const index = users.value.findIndex((u) => u.id === id);
      if (index !== -1) {
        users.value[index] = data;
      } else {
        users.value.push(data);
      }
      return data;
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching user:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    // State
    users,
    loading,
    error,
    selectedRole,
    currentPage,
    itemsPerPage,
    searchTerm,

    // Getters (computed properties)
    filteredUsers,
    paginatedUsers,
    totalPages,
    getUserById,
    getUsersByStatus,

    // Actions
    fetchUsers,
    blockUser,
    unblockUser,
    deleteUser,
    deactivateUser,
    inviteUser,
    setSelectedRole,
    setCurrentPage,
    setSearchTerm,
    fetchUser,
  };
});
