<template>
  <div>
    <div class="p-6">
      <!-- Loading State -->
      <table-skeleton-loader v-if="pending" :headers="columns" />
      <template v-else>
        <!-- Header + Controls Row -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
          <h1 class="text-2xl font-semibold text-gray-200">{{ t('layouts.users') }}</h1>

          <!-- Controls: Search + Refresh + Add Button -->
          <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <!-- search-input component -->
            <search-input v-model="localSearchTerm" @search="handleSearch"
              :placeholder="t('form.search_by_email_or_name')" class="w-full sm:w-[300px]" :debounce="300" />

            <!-- refresh-data-btn component -->
            <refresh-data-btn @refresh="refreshUsers" :is-loading="pending" />

            <!-- Add New User Button -->
            <base-button type="button" padding-x="px-6" padding-y="py-2.5" class="transition-colors whitespace-nowrap"
              @click="isInviteDialogOpen = true">
              {{ t('btn.add_new_user') }}
            </base-button>
          </div>
        </div>

        <custom-error-message v-if="error" :error-message="t('toast.failed_to_load_users')" />

        <!-- Users Table -->
        <dynamic-table v-else :columns="columns" :items="paginatedUsers" :current-page="currentPage"
          :total-pages="totalPages" :total-items="usersStore.filteredUsers.length" :has-view="true" :has-block="true"
          :has-delete="true" :has-deactivate="true" :has-edit="true" :action-conditions="actionConditions"
          @view="handleViewUser" @block="handleBlockUser" @delete="handleDeleteUser" @deactivate="handleDeactivateUser"
          @edit="handleEditUser" @page-change="handlePageChange" @status-toggle="handleBlockUser" />
      </template>

      <!-- Invite User Dialog -->
      <invite-user-dialog :is-open="isInviteDialogOpen" @close="isInviteDialogOpen = false" @success="refreshUsers" />

      <!-- Edit User Dialog -->
      <edit-user-dialog :is-open="isEditDialogOpen" :user="userToEdit" @close="closeEditDialog"
        @success="refreshUsers" />

      <!-- Delete Confirmation Dialog -->
      <delete-dialog :show="isDeleteDialogOpen" :title="t('dialog.delete_user_title')" :message="deleteDialogMessage"
        :loading="isDeleting" :confirm-text="'Yes Delete'" :cancel-text="'Cancel'" @close="closeDeleteDialog"
        @confirm="confirmDeleteUser" />

      <!-- Block/Unblock Confirmation Dialog -->
      <block-user-dialog :show="isBlockDialogOpen" :user="userToBlock" :loading="isBlocking" @close="closeBlockDialog"
        @confirm="confirmBlockUser" />

      <!-- Deactivate Confirmation Dialog -->
      <deactivate-user-dialog :show="isDeactivateDialogOpen" :user="userToDeactivate" :loading="isDeactivating"
        @close="closeDeactivateDialog" @confirm="confirmDeactivateUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '../../../../../layers/base/types/tables'
import type { UserListItem } from '../../../../../layers/base/types'
import EditUserDialog from '../../components/dialogs/edit-user-dialog.vue'

const { t, n } = useI18n()
const { triggerToast } = useToast()
const usersStore = useUsersStore()
const isInviteDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isBlockDialogOpen = ref(false)
const isDeactivateDialogOpen = ref(false)
const isDeleting = ref(false)
const isBlocking = ref(false)
const isDeactivating = ref(false)
const userToDelete = ref<UserListItem | null>(null)
const userToBlock = ref<UserListItem | null>(null)
const userToDeactivate = ref<UserListItem | null>(null)
const userToEdit = ref<UserListItem | null>(null)
const localSearchTerm = ref('')

// Fetch users on mount
onMounted(async () => {
  await usersStore.fetchUsers()
})

// Define table columns
const columns = computed<Column[]>(() => [
  {
    key: 'user',
    label: t('table.users') || 'User',
    sortable: true
  },
  {
    key: 'employeeId',
    label: t('table.employee_id'),
    sortable: true
  },
  {
    key: 'role',
    label: t('table.role'),
    sortable: true,
    html: true,
    format: (item: any) => `<span class="text-indigo-400 font-medium">${t(`roles.${item.role}`)}</span>`
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
    html: true,
    format: (item: any) => {
      const val = Number(item.baseSalary)
      return !isNaN(val) ? `<span class="text-emerald-400 font-medium">${val.toLocaleString()} EGP</span>` : '0 EGP'
    }
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

// Get data from store
const paginatedUsers = computed(() => usersStore.paginatedUsers)
const totalPages = computed(() => usersStore.totalPages)
const currentPage = computed(() => usersStore.currentPage)
const pending = computed(() => usersStore.loading)
const error = computed(() => usersStore.error)

const refreshUsers = async () => {
  await usersStore.fetchUsers()
}

const handleSearch = (term: string) => {
  usersStore.setSearchTerm(term)
}

const handlePageChange = (page: number) => {
  usersStore.setCurrentPage(page)
}

// Delete dialog message
const deleteDialogMessage = computed(() => {
  if (!userToDelete.value) return ''
  const userName = userToDelete.value.fullName || userToDelete.value.email
  return t('dialog.delete_user_message').replace('{name}', userName)
})

// Action conditions based on user status
const actionConditions = computed(() => ({
  view: (user: UserListItem) => user.status !== 'pending', // Allow view for active, blocked, deactivated
  block: (user: UserListItem) => user.status !== 'pending' && user.status !== 'deactivated',
  deactivate: (user: UserListItem) => user.status !== 'pending' && user.status !== 'deactivated',
  delete: () => true // Always show delete
}))

// Action handlers
const handleViewUser = (user: UserListItem) => {
  // Navigate to user details
  navigateTo(`/users/${user.id}`)
}

const handleEditUser = (user: UserListItem) => {
  userToEdit.value = user
  isEditDialogOpen.value = true
}

const closeEditDialog = () => {
  isEditDialogOpen.value = false
  userToEdit.value = null
}

const handleBlockUser = async (user: UserListItem) => {
  userToBlock.value = user
  isBlockDialogOpen.value = true
}

const closeBlockDialog = () => {
  isBlockDialogOpen.value = false
  userToBlock.value = null
}

const confirmBlockUser = async () => {
  if (!userToBlock.value) return

  isBlocking.value = true
  try {
    const isCurrentlyBlocked = userToBlock.value.status === 'blocked'

    if (isCurrentlyBlocked) {
      await usersStore.unblockUser(userToBlock.value.id)
      triggerToast({
        message: t('toast.user_unblocked_successfully'),
        type: 'success',
        icon: 'mdi-check-circle',
      })
    } else {
      await usersStore.blockUser(userToBlock.value.id)
      triggerToast({
        message: t('toast.user_blocked_successfully'),
        type: 'success',
        icon: 'mdi-check-circle',
      })
    }

    closeBlockDialog()
  } catch (err: any) {
    console.error('Block/Unblock error:', err)
    triggerToast({
      message: err.message || t('toast.failed_to_update_user_status'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    })
  } finally {
    isBlocking.value = false
  }
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
    await usersStore.deleteUser(userToDelete.value.id)
    triggerToast({
      message: t('toast.user_deleted_successfully'),
      type: 'success',
      icon: 'mdi-check-circle',
    })
    closeDeleteDialog()
  } catch (err: any) {
    console.error('Delete user error:', err)
    triggerToast({
      message: err.message || t('toast.failed_to_delete_user'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    })
  } finally {
    isDeleting.value = false
  }
}

// Deactivate user handlers
const handleDeactivateUser = async (user: UserListItem) => {
  userToDeactivate.value = user
  isDeactivateDialogOpen.value = true
}

const closeDeactivateDialog = () => {
  isDeactivateDialogOpen.value = false
  userToDeactivate.value = null
}

const confirmDeactivateUser = async () => {
  if (!userToDeactivate.value) return
  isDeactivating.value = true
  try {
    await usersStore.deactivateUser(userToDeactivate.value.id)
    triggerToast({
      message: t('toast.user_deactivated_successfully'),
      type: 'success',
      icon: 'mdi-check-circle',
    })
    closeDeactivateDialog()
  } catch (err: any) {
    console.error('Deactivate user error:', err)
    triggerToast({
      message: err.message || t('toast.failed_to_deactivate_user'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded',
    })
  } finally {
    isDeactivating.value = false
  }
}

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t('meta.users'),
});
</script>