<template>
  <div class="h-full flex flex-col">
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-400">{{ t('permissions.title') }}</h1>
      </div>

      <!-- Error State -->
      <div v-if="error" class="p-4 mb-4 text-red-400 bg-red-100 rounded-lg">
        {{ t('users.failed_to_load_users') }}
      </div>

      <!-- Loading State -->
      <LazyVTableSkeleton v-if="pending" :headers="columns" />

      <!-- Users Table -->
      <LazyVTable v-else :columns="columns" :items="nonAdminUsers" :current-page="1" :total-pages="1"
        :total-items="nonAdminUsers.length" :has-view="false" :has-block="false" :has-edit="true"
        :action-conditions="{ edit: () => true }" class="flex-1" @edit="handleEditPermissions"
        @status-toggle="handleBlockUser" />

      <!-- Edit Permissions Dialog -->
      <edit-permissions-dialog :is-open="isEditDialogOpen" :user="selectedUser" @close="closeEditDialog"
        @success="refreshData" />

      <!-- Block/Unblock Confirmation Dialog -->
      <block-user-dialog :show="isBlockDialogOpen" :user="userToBlock" :loading="isBlocking" @close="closeBlockDialog"
        @confirm="confirmBlockUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '@/layers/base/types/tables'
import type { UserListItem } from '@/layers/base/types'

const { t } = useI18n()
const usersStore = useUsersStore()
const isEditDialogOpen = ref(false)
const selectedUser = ref<UserListItem | null>(null)

const isBlockDialogOpen = ref(false)
const userToBlock = ref<UserListItem | null>(null)
const isBlocking = ref(false)
const { triggerToast } = useToast()

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

// Block/Unblock handlers
const handleBlockUser = (user: UserListItem) => {
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

useSeoPage({
  title: () => t("meta.permissions"),
  description: () => t("meta.permissions_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>