<template>
  <div>
    <div class="p-6">
      <!-- Header + Controls Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">{{ t('layouts.users') }}</h1>

        <!-- Controls: Search + Refresh + Download + Add Button -->
        <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <!-- search-input component -->
          <search-input v-model="localSearchTerm" @search="handleGlobalSearch"
            :placeholder="t('form.search_by_email_or_name')" class="w-full sm:w-[300px]" :debounce="300" />

          <!-- refresh-data-btn component -->
          <refresh-data-btn @refresh="refreshUsers" :is-loading="pending" />

          <!-- download-files-menu component -->
          <download-files-menu :allItems="usersStore.users" :columns="columns" fileNameBase="users" />

          <!-- Add New User Button - now beside the others -->
          <base-button type="button" padding-x="px-4" padding-y="py-2" class="transition-colors whitespace-nowrap"
            @click="isInviteDialogOpen = true">
            {{ t('btn.add_new_user') }}
          </base-button>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
        {{ t('toast.failed_to_load_users') }}
      </div>

      <!-- Loading State -->
      <table-skeleton-loader v-if="pending" :headers="columns" />

      <!-- Users Table -->
      <dynamic-table v-else :columns="columns" :items="paginatedUsers" :has-view="true" :has-block="true"
        :has-delete="true" @view="handleViewUser" @block="handleBlockUser" @delete="handleDeleteUser" />

      <pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
        @page-change="handlePageChange" />

      <!-- Dialogs remain unchanged -->
      <invite-user-dialog :is-open="isInviteDialogOpen" @close="isInviteDialogOpen = false" @success="refreshUsers" />

      <delete-dialog :show="isDeleteDialogOpen" :title="t('dialog.delete_user_title')" :message="deleteDialogMessage"
        :loading="isDeleting" :confirm-text="'Yes Delete'" :cancel-text="'Cancel'" @close="closeDeleteDialog"
        @confirm="confirmDeleteUser" />

      <block-user-dialog :show="isBlockDialogOpen" :user="userToBlock" :loading="isBlocking" @close="closeBlockDialog"
        @confirm="confirmBlockUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '../../../../../layers/base/types/tables'
import type { UserListItem } from '../../../../../layers/base/types'

definePageMeta({
  layout: 'dashboard'
})

const { t, n } = useI18n()
const { triggerToast } = useToast()
const usersStore = useUsersStore()
const isInviteDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isBlockDialogOpen = ref(false)
const isDeleting = ref(false)
const isBlocking = ref(false)
const userToDelete = ref<UserListItem | null>(null)
const userToBlock = ref<UserListItem | null>(null)
const localSearchTerm = ref('')

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
    format: (item: any) => {
      const src = item.avatarUrl || '/img/dummy-profile-img.jpg';
      return `<img src="${src}" alt="${item.fullName}" class="w-10 h-10 rounded-full object-cover">`;
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
    html: true,
    format: (item: any) => `<span class="text-indigo-600 font-medium">${t(`roles.${item.role}`)}</span>`
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
      return !isNaN(val) ? `<span class="text-emerald-600 font-medium">${val.toLocaleString()} EGP</span>` : '0 EGP'
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

// Delete dialog message
const deleteDialogMessage = computed(() => {
  if (!userToDelete.value) return ''
  const userName = userToDelete.value.fullName || userToDelete.value.email
  return t('dialog.delete_user_message').replace('{name}', userName)
})

const handlePageChange = (page: number) => {
  usersStore.setCurrentPage(page)
}

const handleGlobalSearch = (term: string) => {
  usersStore.setSearchTerm(term)
}

// Action handlers
const handleViewUser = (user: UserListItem) => {
  // Navigate to user details
  navigateTo(`/users/${user.id}`)
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

useHead({
  titleTemplate: () => t('meta.users'),
});
</script>