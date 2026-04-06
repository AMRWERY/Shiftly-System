<template>
    <div class="p-8 text-white">
        <h1 class="text-2xl font-bold mb-4">Permissions Debugger</h1>

        <div class="grid grid-cols-2 gap-8">
            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-xl font-bold mb-2">User Metadata</h2>
                <pre class="bg-gray-900 p-2 rounded overflow-auto">{{ user?.user_metadata }}</pre>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-xl font-bold mb-2">User Permissions (Store)</h2>
                <pre class="bg-gray-900 p-2 rounded overflow-auto">{{ userPermissions }}</pre>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg col-span-2">
                <h2 class="text-xl font-bold mb-2">Permission Check Test</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="mod in ['employees', 'leave', 'payroll', 'reports']" :key="mod">
                        <h3 class="font-bold capitalize">{{ mod }}</h3>
                        <div class="flex gap-2">
                            <span v-for="action in ['view', 'create', 'edit', 'approve']" :key="action"
                                class="px-2 py-1 rounded text-xs"
                                :class="hasPermission(mod, action) ? 'bg-green-600' : 'bg-red-600'">
                                {{ action }}: {{ hasPermission(mod, action) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2">
                <VButton
                    type="button"
                    bg-color="bg-blue-600"
                    hover-color="hover:bg-blue-700"
                    padding-x="px-4"
                    padding-y="py-2"
                    @click="authStore.fetchUserPermissions()"
                >
                    Force Refresh Permissions
                </VButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { user, userPermissions } = storeToRefs(authStore);
const { hasPermission } = useAppPermissions();
</script>
