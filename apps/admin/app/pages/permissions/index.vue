<template>
  <div>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-400">{{ t('permissions.title') }}</h1>
      </div>

      <!-- Error State -->
      <div v-if="error" class="p-4 mb-4 text-red-400 bg-red-100 rounded-lg">
        {{ t('users.failed_to_load_users') }}
      </div>

      <!-- Loading State -->
      <table-skeleton-loader v-if="pending" :headers="columns" />

      <!-- Users Table -->
      <dynamic-table v-else :columns="columns" :items="nonAdminUsers" :has-view="false" :has-block="false"
        :has-edit="true" :action-conditions="{ edit: () => true }" @edit="handleEditPermissions" />

      <!-- Edit Permissions Dialog -->
      <edit-permissions-dialog :is-open="isEditDialogOpen" :user="selectedUser" @close="closeEditDialog"
        @success="refreshData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '../../../../../layers/base/types/tables'
import type { UserListItem } from '../../../../../layers/base/types'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useI18n()
const { triggerToast } = useToast()
const usersStore = useUsersStore()
const isEditDialogOpen = ref(false)
const selectedUser = ref<UserListItem | null>(null)

// Fetch users on mount
onMounted(async () => {
  await usersStore.fetchUsers()
})

// Define table columns
const columns = computed<Column[]>(() => [
  {
    key: 'avatar',
    label: t('table.avatar') || 'Avatar',
    html: true,
    sortable: false,
    format: (item: any) => {
      const avatarUrl = item.avatar_url || item.avatarUrl || '/img/dummy-profile-img.jpg'
      const altText = item.fullName || item.email || 'User'
      return `<img src="${avatarUrl}" alt="${altText}" class="w-10 h-10 rounded-full object-cover border border-gray-200" onerror="this.onerror=null; this.src='/img/dummy-profile-img.jpg';" />`
    }
  },
  {
    key: 'employeeId',
    label: t('table.employee_id'),
    sortable: true
  },
  {
    key: 'fullName',
    label: t('table.name'),
    sortable: true
  },
  {
    key: 'email',
    label: t('table.email'),
    sortable: true
  },
  {
    key: 'role',
    label: t('table.role'),
    sortable: true,
    format: (item: any) => t(`roles.${item.role}`)
  },
  {
    key: 'status',
    label: t('table.status'),
    sortable: true
  }
])

// Filter out admin users
const nonAdminUsers = computed(() => {
  return usersStore.filteredUsers.filter((user: UserListItem) => user.role !== 'admin')
})

const pending = computed(() => usersStore.loading)
const error = computed(() => usersStore.error)

const refreshData = async () => {
  await usersStore.fetchUsers()
}

// Edit permissions handler
const handleEditPermissions = (user: UserListItem) => {
  selectedUser.value = user
  isEditDialogOpen.value = true
}

const closeEditDialog = () => {
  isEditDialogOpen.value = false
  selectedUser.value = null
}

useHead({
    titleTemplate: () => t('meta.permissions'),
});
</script>