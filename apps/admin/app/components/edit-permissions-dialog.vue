<template>
  <dynamic-dialog :model-value="isOpen" :title="t('permissions.edit_permissions')" :show-default-footer="false"
    @update:model-value="closeModal" @close="closeModal" max-width="max-w-4xl">
    <template #body>
      <div class="mt-2">
        <!-- User Info -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-4">
            <img :src="user?.avatarUrl || user?.avatar_url || '/img/dummy-profile-img.jpg'" :alt="user?.fullName"
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ user?.fullName }}</h3>
              <p class="text-sm text-gray-600">{{ user?.email }}</p>
              <span class="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {{ t(`roles.${user?.role}`) }}
              </span>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          {{ t('permissions.select_permissions') }}
        </p>

        <!-- Permissions Grid -->
        <div class="space-y-4 max-h-[450px] overflow-y-auto pr-2">
          <div v-for="module in permissionModules" :key="module" class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-medium text-gray-900">
                {{ t(`permissions.modules.${module}`) }}
              </label>
              <button type="button" @click="toggleAllActions(module)"
                class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                {{ areAllActionsSelected(module) ? 'Deselect All' : 'Select All' }}
              </button>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <label v-for="action in permissionActions" :key="action"
                class="inline-flex items-center cursor-pointer group">
                <input type="checkbox" :checked="hasPermission(module, action)"
                  @change="togglePermission(module, action)"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span class="ms-2 text-sm text-gray-700 group-hover:text-gray-900">
                  {{ t(`permissions.actions.${action}`) }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="mt-6 flex justify-end gap-3 pt-4 border-t">
          <base-button type="button" variant="outline" bg-color="bg-gray-100" hover-color="hover:bg-gray-200"
            text-color="text-gray-700" padding-x="px-4" padding-y="py-2" @click="closeModal">
            {{ t('btn.cancel') }}
          </base-button>
          <base-button type="button" :disabled="loading" hover-color="hover:bg-blue-700" padding-x="px-4"
            padding-y="py-2"
            class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="savePermissions">
            <span v-if="loading" class="flex items-center gap-2">
              <icon name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
              Saving...
            </span>
            <span v-else>{{ t('permissions.save_permissions') }}</span>
          </base-button>
        </div>
      </div>
    </template>
  </dynamic-dialog>
</template>

<script setup lang="ts">
import type { UserListItem, Permission, PermissionModule, PermissionAction } from '../../../../../layers/base/types'

const props = defineProps<{
  isOpen: boolean
  user: UserListItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const { t } = useI18n()
const { triggerToast } = useToast()
const loading = ref(false)

// All available permission modules and actions
const permissionModules: PermissionModule[] = [
  'users', 'roles', 'employees', 'payroll', 'attendance', 
  'leave', 'recruitment', 'performance', 'training', 
  'inventory', 'maintenance', 'finance', 'reports', 'audit', 'settings'
]

const permissionActions: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve']

// Local state for permissions
const localPermissions = ref<Permission[]>([])

// Load user permissions when dialog opens
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen && props.user) {
    await loadUserPermissions()
  }
})

const loadUserPermissions = async () => {
  if (!props.user) return
  
  loading.value = true
  try {
    const data = await $fetch<{ permissions: Permission[] }>(`/api/admin/permissions/${props.user.id}`)
    localPermissions.value = data.permissions || []
  } catch (error: any) {
    console.error('Error loading permissions:', error)
    localPermissions.value = []
  } finally {
    loading.value = false
  }
}

// Check if user has specific permission
const hasPermission = (module: PermissionModule, action: PermissionAction): boolean => {
  const modulePermission = localPermissions.value.find(p => p.module === module)
  return modulePermission?.actions.includes(action) || false
}

// Check if all actions are selected for a module
const areAllActionsSelected = (module: PermissionModule): boolean => {
  const modulePermission = localPermissions.value.find(p => p.module === module)
  if (!modulePermission) return false
  return permissionActions.every(action => modulePermission.actions.includes(action))
}

// Toggle a single permission
const togglePermission = (module: PermissionModule, action: PermissionAction) => {
  const existingIndex = localPermissions.value.findIndex(p => p.module === module)
  
  if (existingIndex !== -1) {
    const actions = localPermissions.value[existingIndex].actions
    const actionIndex = actions.indexOf(action)
    
    if (actionIndex !== -1) {
      // Remove action
      actions.splice(actionIndex, 1)
      // If no actions left, remove the module
      if (actions.length === 0) {
        localPermissions.value.splice(existingIndex, 1)
      }
    } else {
      // Add action
      actions.push(action)
    }
  } else {
    // Add new module with action
    localPermissions.value.push({
      module,
      actions: [action]
    })
  }
}

// Toggle all actions for a module
const toggleAllActions = (module: PermissionModule) => {
  const allSelected = areAllActionsSelected(module)
  const existingIndex = localPermissions.value.findIndex(p => p.module === module)
  
  if (allSelected) {
    // Deselect all - remove module
    if (existingIndex !== -1) {
      localPermissions.value.splice(existingIndex, 1)
    }
  } else {
    // Select all actions
    if (existingIndex !== -1) {
      localPermissions.value[existingIndex].actions = [...permissionActions]
    } else {
      localPermissions.value.push({
        module,
        actions: [...permissionActions]
      })
    }
  }
}

const savePermissions = async () => {
  if (!props.user) return
  
  loading.value = true
  try {
    await $fetch(`/api/admin/permissions/${props.user.id}`, {
      method: 'PUT',
      body: {
        permissions: localPermissions.value
      }
    })
    
    triggerToast({
      message: t('permissions.permissions_updated'),
      type: 'success',
      icon: 'mdi-check-circle'
    })
    
    emit('success')
    closeModal()
  } catch (error: any) {
    console.error('Error saving permissions:', error)
    triggerToast({
      message: error.statusMessage || t('permissions.failed_to_update_permissions'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded'
    })
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  localPermissions.value = []
  emit('close')
}
</script>

