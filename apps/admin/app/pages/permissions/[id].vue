<template>
    <div>
        <div class="p-6">
            <LazyVBackButton />

            <!-- Loading State -->
            <div v-if="loading && !user" class="flex justify-center items-center h-[60vh]">
                <LazyVLoadingSpinner />
            </div>

            <!-- Error State -->
            <div v-else-if="error && !user" class="flex flex-col justify-center items-center h-[60vh] animate-fade-in">
                <div class="text-center p-8 bg-white max-w-md rounded-2xl shadow-xl border border-gray-100">
                    <LazyVErrorMessage :error-message="error" />
                    <LazyVButton @click="loadUserData" class="mt-4">
                        {{ t('btn.retry') }}
                    </LazyVButton>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else-if="user" class="max-w-6xl mx-auto animate-fade-in">
                <!-- User Info Header -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6">
                    <div class="flex items-center gap-6">
                        <img :src="user.avatarUrl || '/img/dummy-profile-img.jpg'" :alt="user.fullName"
                            class="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-md" />
                        <div class="flex-1">
                            <h1 class="text-2xl font-bold text-gray-400 mb-1">
                                {{ t('permissions.edit_permissions_for') }}: {{ user.fullName }}
                            </h1>
                            <p class="text-sm text-tx-secondary mb-2">{{ user.email }}</p>
                            <div class="flex gap-2">
                                <span
                                    class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                                    {{ t(`roles.${user.role}`) }}
                                </span>
                                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                                    :class="getStatusBadgeClass(user.status)">
                                    {{ t(`status.${user.status}`) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Permissions Section -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-400 mb-2">
                            {{ t('permissions.manage_permissions') }}
                        </h2>
                        <p class="text-sm text-tx-secondary">
                            {{ t('permissions.select_permissions_description') }}
                        </p>
                    </div>

                    <!-- Loading Permissions -->
                    <div v-if="permissionsStore.loading" class="flex justify-center py-12">
                        <LazyVLoadingSpinner />
                    </div>

                    <!-- Permissions Error -->
                    <div v-else-if="permissionsStore.error" class="py-8 text-center">
                        <LazyVErrorMessage :error-message="permissionsStore.error" />
                        <LazyVButton @click="permissionsStore.fetchUserPermissions(userId)" class="mt-4">
                            {{ t('btn.retry') }}
                        </LazyVButton>
                    </div>

                    <!-- Permissions Grid -->
                    <div v-else class="space-y-4 max-h-[500px] overflow-y-auto pe-2">
                        <div v-for="module in permissionsStore.permissionModules" :key="module"
                            class="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                            <div class="flex items-center justify-between mb-4">
                                <label class="text-base font-semibold text-gray-400 flex items-center gap-2">
                                    <Icon :name="getModuleIcon(module)" class="w-5 h-5 text-blue-400" />
                                    {{ t(`permissions.modules.${module}`) }}
                                </label>
                                <LazyVButton type="button" variant="ghost" text-color="text-blue-400"
                                    hover-color="hover:bg-blue-50/10" padding-x="px-3" padding-y="py-1.5"
                                    class="rounded-md" @click="permissionsStore.toggleAllModuleActions(module)">
                                    {{ permissionsStore.areAllActionsSelected(module) ? t('permissions.deselect_all') :
                                        t('permissions.select_all') }}
                                </LazyVButton>
                            </div>

                            <div class="flex flex-wrap gap-3">
                                <label v-for="action in permissionsStore.permissionActions" :key="action"
                                    class="inline-flex items-center cursor-pointer group px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                    <input type="checkbox" :checked="permissionsStore.hasPermission(module, action)"
                                        @change="permissionsStore.togglePermission(module, action)"
                                        :disabled="permissionsStore.saving"
                                        class="w-4 h-4 text-blue-400 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" />
                                    <span class="ms-2 text-sm text-tx-secondary group-hover:text-gray-400 font-medium">
                                        {{ t(`permissions.actions.${action}`) }}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <LazyVButton type="button" variant="outline" bg-color="bg-gray-100"
                            hover-color="hover:bg-gray-200" text-color="text-tx-secondary" padding-x="px-6"
                            padding-y="py-2.5" @click="navigateBack" :disabled="permissionsStore.saving">
                            {{ t('btn.cancel') }}
                        </LazyVButton>
                        <LazyVButton type="button" :disabled="permissionsStore.saving || permissionsStore.loading"
                            hover-color="hover:bg-blue-700" padding-x="px-6" padding-y="py-2.5"
                            class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="handleSave">
                            <span v-if="permissionsStore.saving" class="flex items-center gap-2">
                                <Icon name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
                                {{ t('permissions.saving') }}
                            </span>
                            <span v-else class="flex items-center gap-2">
                                {{ t('permissions.save_permissions') }}
                            </span>
                        </LazyVButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserListItem } from '@/layers/base/types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { triggerToast } = useToast()
const usersStore = useUsersStore()
const permissionsStore = usePermissionsStore()

// Route params
const userId = computed(() => route.params.id as string)

// State
const user = ref<UserListItem | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Load user data on mount
onMounted(async () => {
    await loadUserData()
    if (user.value) {
        // Reset store state before fetching
        permissionsStore.resetState()
        await permissionsStore.fetchUserPermissions(userId.value)
    }
})

// Load user data
const loadUserData = async () => {
    loading.value = true
    error.value = null

    try {
        // Try to get from store first
        const storeUser = usersStore.getUserById(userId.value)
        if (storeUser) {
            user.value = storeUser
        } else {
            // Fetch from API
            const data = await usersStore.fetchUser(userId.value)
            user.value = data
        }
    } catch (err: any) {
        console.error('Error loading user:', err)
        error.value = err.statusMessage || err.message || t('permissions.failed_to_load_user')
    } finally {
        loading.value = false
    }
}

// Save permissions
const handleSave = async () => {
    if (!user.value) return

    const success = await permissionsStore.saveUserPermissions(userId.value)

    if (success) {
        triggerToast({
            message: t('permissions.permissions_updated_successfully'),
            type: 'success',
            icon: 'mdi:check-circle'
        })

        // Navigate back after short delay
        const { start: startBackTimer } = useTimeoutFn(() => {
            navigateBack()
        }, 1000, { immediate: false });
        startBackTimer();
    } else {
        triggerToast({
            message: permissionsStore.error || t('permissions.failed_to_update_permissions'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded'
        })
    }
}

// Navigate back to permissions list
const navigateBack = () => {
    router.push('/permissions')
}

// Get status badge class
const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'blocked':
            return 'bg-red-100 text-red-500 border-red-200'
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-500 border-gray-200'
    }
}

// Get module icon
const getModuleIcon = (module: string): string => {
    const icons: Record<string, string> = {
        users: 'heroicons:users',
        roles: 'heroicons:shield-check',
        employees: 'heroicons:user-group',
        payroll: 'heroicons:currency-dollar',
        attendance: 'heroicons:calendar-days',
        leave: 'heroicons:calendar-days',
        recruitment: 'heroicons:user-plus',
        performance: 'heroicons:chart-bar',
        training: 'heroicons:academic-cap',
        inventory: 'heroicons:cube',
        maintenance: 'heroicons:wrench-screwdriver',
        finance: 'heroicons:banknotes',
        reports: 'heroicons:document-chart-bar',
        audit: 'heroicons:clipboard-document-check',
        settings: 'heroicons:cog-6-tooth'
    }
    return icons[module] || 'heroicons:document'
}

useSeoPage({
    title: computed(() =>
        user.value
            ? `${t('permissions.edit_permissions')} - ${user.value.fullName}`
            : t('permissions.edit_permissions')
    ),
    private: true,
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
