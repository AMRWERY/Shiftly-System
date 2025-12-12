export function useRole() {
    const authStore = useAuthStore();

    // Get current role from auth store
    const currentRole = computed(() => {
        return authStore.currentUserRole || null;
    });

    // Role checkers
    const isAdmin = computed(() => {
        return currentRole.value === 'admin';
    });

    const isAccountant = computed(() => {
        return currentRole.value === 'accountant';
    });

    const isEmployee = computed(() => {
        return currentRole.value === 'employee';
    });

    const isHr = computed(() => {
        return currentRole.value === 'hr';
    });

    const isManager = computed(() => {
        return currentRole.value === 'manager';
    });

    const isInventoryManager = computed(() => {
        return currentRole.value === 'inventory_manager';
    });

    const isMaintenanceTechnician = computed(() => {
        return currentRole.value === 'maintenance_technician';
    });

    const isSystemAuditor = computed(() => {
        return currentRole.value === 'system_auditor';
    });

    const isTdOfficer = computed(() => {
        return currentRole.value === 'td_officer';
    });

    return {
        currentRole,
        isAdmin,
        isAccountant,
        isEmployee,
        isHr,
        isManager,
        isInventoryManager,
        isMaintenanceTechnician,
        isSystemAuditor,
        isTdOfficer,
    };
}