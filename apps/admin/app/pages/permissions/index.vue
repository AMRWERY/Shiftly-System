<template>
  <div>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">{{ t('permissions.title') }}</h1>
        </div>

        <!-- Search and Refresh -->
        <div class="flex items-center gap-4">
          <search-input v-model="localSearchTerm" @search="handleSearch"
            :placeholder="t('form.search_by_email_or_name')" class="w-full sm:w-[300px]" :debounce="300" />
          <refresh-data-btn @refresh="refreshUsers" :is-loading="pending" />
        </div>
      </div>

      <!-- Error State -->
      <custom-error-message v-if="error" :error-message="t('users.failed_to_load_users')" />

      <!-- Loading State -->
      <table-skeleton-loader v-if="pending" :headers="columns" />

      <!-- Users Table -->
      <dynamic-table v-else :columns="columns" :items="paginatedList" :has-view="false" :has-block="false"
        :has-delete="false" :has-edit="true" :action-conditions="{ edit: () => true }" @edit="handleEditPermissions" />

      <!-- Pagination -->
      <pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
        @page-change="handlePageChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '../../../../../layers/base/types/tables'
import type { UserListItem } from '../../../../../layers/base/types'

const { t } = useI18n()
const usersStore = useUsersStore()
const localSearchTerm = ref('')

// Fetch users on mount
onMounted(async () => {
  await usersStore.fetchUsers()
})

// Get data from store
const paginatedList = computed(() => usersStore.paginatedUsers)
const totalPages = computed(() => usersStore.totalPages)
const currentPage = computed(() => usersStore.currentPage)
const pending = computed(() => usersStore.loading)
const error = computed(() => usersStore.error)

// Define table columns
const columns = computed<Column[]>(() => [
  {
    key: 'avatar',
    label: t('table.avatar'),
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
    format: (item: any) => `<span class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">${t(`roles.${item.role}`)}</span>`
  },
  {
    key: 'status',
    label: t('table.status'),
    sortable: true
  }
])

const refreshUsers = async () => {
  await usersStore.fetchUsers()
}

const handleSearch = (term: string) => {
  usersStore.setSearchTerm(term)
}

const handlePageChange = (page: number) => {
  usersStore.setCurrentPage(page)
}

// Edit permissions handler - navigate to page
const handleEditPermissions = (user: UserListItem) => {
  navigateTo(`/permissions/${user.id}`)
}

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: t('permissions.title')
})
</script>