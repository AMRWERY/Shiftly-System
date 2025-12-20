<template>
  <div>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">{{ t('layouts.users') }}</h1>
        <base-button type="button" padding-x="px-4" padding-y="py-2" class="transition-colors"
          @click="isInviteDialogOpen = true">
          {{ t('btn.add_new_user') }}
        </base-button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
        {{ t('toast.failed_to_load_users') }}
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center p-12">
        <icon name="svg-spinners:180-ring-with-bg" class="w-10 h-10 text-blue-600" />
      </div>

      <!-- Users Table -->
      <dynamic-table v-else :columns="columns" :items="filteredUsers" :has-view="true" :has-block="true"
        :has-delete="true" @view="handleViewUser" @block="handleBlockUser" @delete="handleDeleteUser" />

      <!-- Invite User Dialog -->
      <invite-user-dialog :is-open="isInviteDialogOpen" @close="isInviteDialogOpen = false" @success="refreshUsers" />

      <!-- Delete Confirmation Dialog -->
      <delete-dialog :show="isDeleteDialogOpen" :title="t('dialog.delete_user_title')" :message="deleteDialogMessage"
        :loading="isDeleting" :confirm-text="'Yes Delete'" :cancel-text="'Cancel'" @close="closeDeleteDialog"
        @confirm="confirmDeleteUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '../../../../../layers/base/types/tables'
import type { UserListItem, UserRole } from '../../../../../layers/base/types'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useI18n()
const { triggerToast } = useToast()
const isInviteDialogOpen = ref(false)
const selectedRole = ref<UserRole | 'all'>('all')
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)
const userToDelete = ref<UserListItem | null>(null)

// Define table columns
const columns = computed<Column[]>(() => [
  {
    key: 'avatar',
    label: '',
    sortable: true,
    format: (item: any) => {
      const avatarUrl = item.avatar_url || '/img/dummy-profile-img.jpg'
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
    key: 'phoneNumber',
    label: t('table.phone'),
    sortable: true,
  },
  {
    key: 'baseSalary',
    label: t('table.base_salary'),
    sortable: true,
    format: (item: any) => item.baseSalary?.toLocaleString()
  },
  {
    key: 'createdAt',
    label: t('table.created_at'),
    sortable: true,
    format: (item: any) => new Date(item.createdAt).toLocaleDateString()
  },
  {
    key: 'status',
    label: t('table.status'),
    sortable: true
  }
])

// Fetch users
const { data: usersData, pending, error, refresh } = useFetch<UserListItem[]>('/api/admin/users')

// Filter out admin users and filter by selected role
const filteredUsers = computed(() => {
  if (!usersData.value) return []
  // Filter out admin users
  let filtered = usersData.value.filter(user => user.role !== 'admin')
  // Filter by selected role
  if (selectedRole.value !== 'all') {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }
  return filtered
})

const refreshUsers = () => {
  refresh()
}

// Delete dialog message
const deleteDialogMessage = computed(() => {
  if (!userToDelete.value) return ''
  const userName = userToDelete.value.fullName || userToDelete.value.email
  return t('dialog.delete_user_message').replace('{name}', userName)
})

// Action handlers
const handleViewUser = (user: UserListItem) => {
  // Navigate to user details or open a view modal
  // navigateTo(`/users/${user.id}`)
}

const handleBlockUser = async (user: UserListItem) => {
  // Implement block/unblock logic
  triggerToast({
    message: 'Block functionality not implemented yet',
    type: 'info'
  })
}

const handleDeleteUser = async (user: UserListItem) => {
  userToDelete.value = user
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  userToDelete.value = null
}

const confirmDeleteUser = async () => {
  if (!userToDelete.value) return
  isDeleting.value = true
  try {
    const { error: deleteError } = await useFetch(`/api/admin/users/${userToDelete.value.id}`, {
      method: 'DELETE'
    })

    if (deleteError.value) {
      throw deleteError.value
    }
    triggerToast({
      message: t('toast.user_deleted_successfully'),
      type: 'success',
      icon: 'mdi-check-circle'
    })
    closeDeleteDialog()
    refreshUsers()
  } catch (err: any) {
    console.error('Delete user error:', err)
    triggerToast({
      message: err.statusMessage || t('toast.failed_to_delete_user'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded'
    })
  } finally {
    isDeleting.value = false
  }
}
</script>