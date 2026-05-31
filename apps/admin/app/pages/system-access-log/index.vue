<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div class="flex min-h-0 flex-1 flex-col p-6 gap-6">
      <!-- Header Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 class="text-2xl font-semibold text-tx-secondary">{{ t('layouts.system_access_log') }}</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ t('meta.system_access_log_description') }}</p>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <LazyVDownloadFilesMenu :all-items="filteredLogs" :columns="columns" file-name-base="system-access-log" />
          <LazyVRefreshButton @refresh="handleRefresh" :is-loading="isLoading" />
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <LazyVKpiCard :label="t('access_log.total_sessions').toUpperCase()"
          :value="stats.totalSessions.toLocaleString()" :trend="12" :subtitle="t('access_log.total_sessions_subtitle')"
          icon="material-symbols:monitor-rounded" />
        <LazyVKpiCard :label="t('access_log.active_users').toUpperCase()" :value="stats.activeUsers"
          :subtitle="t('access_log.active_users_subtitle')" icon="material-symbols:person-rounded" />
        <LazyVKpiCard :label="t('access_log.failed_logins').toUpperCase()" :value="stats.failedLogins" :trend="-5"
          :subtitle="t('access_log.failed_logins_subtitle')" icon="material-symbols:lock-open-outline-rounded" />
        <LazyVKpiCard :label="t('access_log.suspicious_activities').toUpperCase()" :value="stats.suspicious"
          :subtitle="t('access_log.suspicious_subtitle')" icon="material-symbols:warning-outline-rounded" />
      </div>

      <!-- Filters Row -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap shrink-0">
        <!-- Search -->
        <LazyVSearchInput v-model="searchTerm" :placeholder="t('access_log.search_placeholder')"
          class="w-full sm:w-[280px]" :debounce="300" @search="handleSearch" />

        <!-- Status Filter -->
        <LazyVDropdownMenu :label="activeStatusLabel" align="left">
          <template #default="{ close }">
            <button v-for="opt in statusOptions" :key="opt.value"
              class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
              :class="{ 'text-indigo-400 bg-indigo-500/10': selectedStatus === opt.value }"
              @click="selectedStatus = opt.value; close()">
              <span class="w-2 h-2 rounded-full flex-shrink-0" :class="opt.dotClass" />
              {{ opt.label }}
            </button>
          </template>
        </LazyVDropdownMenu>

        <!-- Action Type Filter -->
        <LazyVDropdownMenu :label="activeActionLabel" align="left">
          <template #default="{ close }">
            <button v-for="opt in actionOptions" :key="opt.value"
              class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
              :class="{ 'text-indigo-400 bg-indigo-500/10': selectedAction === opt.value }"
              @click="selectedAction = opt.value; close()">
              <Icon :name="opt.icon" class="w-4 h-4 flex-shrink-0 text-gray-400" />
              {{ opt.label }}
            </button>
          </template>
        </LazyVDropdownMenu>

        <!-- Date Range -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 whitespace-nowrap">{{ t('access_log.date_from') }}</span>
          <LazyVDatePicker v-model="dateFrom" class="w-[150px]" />
          <span class="text-xs text-gray-500 whitespace-nowrap">{{ t('access_log.date_to') }}</span>
          <LazyVDatePicker v-model="dateTo" class="w-[150px]" />
        </div>

        <!-- Clear Filters -->
        <button v-if="hasActiveFilters"
          class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          @click="clearFilters">
          <Icon name="material-symbols:close-rounded" class="w-4 h-4" />
          Clear filters
        </button>
      </div>

      <!-- Table / Loading / Empty -->
      <div class="flex min-h-0 flex-1 flex-col">
        <!-- Skeleton -->
        <LazyVTableSkeletonLoader v-if="isLoading" :headers="columns" />

        <!-- Empty State -->
        <LazyVEmptyState v-else-if="filteredLogs.length === 0" :title="t('access_log.no_logs')"
          :description="t('access_log.no_logs_description')" icon="material-symbols:manage-search-rounded" />

        <!-- Table -->
        <LazyVTable v-else :columns="columns" :items="paginatedLogs" :current-page="currentPage"
          :total-pages="totalPages" :total-items="filteredLogs.length" :page-size="pageSize" class="min-h-0 flex-1"
          @page-change="handlePageChange" />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '@/layers/base/types/tables'

const { t } = useI18n()

// ── State ────────────────────────────────────────────────────────────────────
const isLoading = ref(false)
const searchTerm = ref('')
const selectedStatus = ref('all')
const selectedAction = ref('all')
const dateFrom = ref<Date | null>(null)
const dateTo = ref<Date | null>(null)
const currentPage = ref(1)
const pageSize = 15

// ── Mock KPI Stats ────────────────────────────────────────────────────────────
const stats = reactive({
  totalSessions: 3842,
  activeUsers: 47,
  failedLogins: 23,
  suspicious: 4,
})

// ── Mock Data ─────────────────────────────────────────────────────────────────
const mockLogs = [
  { id: '1', fullName: 'Amr Mohamed', email: 'amr@nexux.com', avatarUrl: '', role: 'admin', action: 'login', module: 'Authentication', ipAddress: '192.168.1.10', device: 'Chrome / Windows', status: 'success', timestamp: '2026-05-31T12:04:00Z' },
  { id: '2', fullName: 'Sara Hassan', email: 'sara@nexux.com', avatarUrl: '', role: 'hr', action: 'view', module: 'Employees', ipAddress: '192.168.1.22', device: 'Firefox / macOS', status: 'success', timestamp: '2026-05-31T11:58:00Z' },
  { id: '3', fullName: 'Omar Khalil', email: 'omar@nexux.com', avatarUrl: '', role: 'employee', action: 'login', module: 'Authentication', ipAddress: '10.0.0.45', device: 'Safari / iPhone', status: 'failed', timestamp: '2026-05-31T11:55:00Z' },
  { id: '4', fullName: 'Nadia Youssef', email: 'nadia@nexux.com', avatarUrl: '', role: 'manager', action: 'update', module: 'Payroll', ipAddress: '192.168.1.88', device: 'Chrome / Windows', status: 'success', timestamp: '2026-05-31T11:40:00Z' },
  { id: '5', fullName: 'Karim Farouk', email: 'karim@nexux.com', avatarUrl: '', role: 'employee', action: 'login', module: 'Authentication', ipAddress: '172.16.5.201', device: 'Edge / Windows', status: 'failed', timestamp: '2026-05-31T11:32:00Z' },
  { id: '6', fullName: 'Amr Mohamed', email: 'amr@nexux.com', avatarUrl: '', role: 'admin', action: 'delete', module: 'Users', ipAddress: '192.168.1.10', device: 'Chrome / Windows', status: 'success', timestamp: '2026-05-31T11:20:00Z' },
  { id: '7', fullName: 'Layla Mostafa', email: 'layla@nexux.com', avatarUrl: '', role: 'accountant', action: 'export', module: 'Finance', ipAddress: '192.168.1.66', device: 'Chrome / macOS', status: 'success', timestamp: '2026-05-31T11:10:00Z' },
  { id: '8', fullName: 'Unknown', email: 'hacker@external.io', avatarUrl: '', role: '—', action: 'login', module: 'Authentication', ipAddress: '45.33.32.156', device: 'curl / Linux', status: 'warning', timestamp: '2026-05-31T10:58:00Z' },
  { id: '9', fullName: 'Sara Hassan', email: 'sara@nexux.com', avatarUrl: '', role: 'hr', action: 'create', module: 'Employees', ipAddress: '192.168.1.22', device: 'Firefox / macOS', status: 'success', timestamp: '2026-05-31T10:45:00Z' },
  { id: '10', fullName: 'Omar Khalil', email: 'omar@nexux.com', avatarUrl: '', role: 'employee', action: 'view', module: 'Payslips', ipAddress: '10.0.0.45', device: 'Safari / iPhone', status: 'success', timestamp: '2026-05-31T10:30:00Z' },
  { id: '11', fullName: 'Karim Farouk', email: 'karim@nexux.com', avatarUrl: '', role: 'employee', action: 'login', module: 'Authentication', ipAddress: '172.16.5.201', device: 'Edge / Windows', status: 'success', timestamp: '2026-05-31T10:15:00Z' },
  { id: '12', fullName: 'Nadia Youssef', email: 'nadia@nexux.com', avatarUrl: '', role: 'manager', action: 'view', module: 'Reports', ipAddress: '192.168.1.88', device: 'Chrome / Windows', status: 'success', timestamp: '2026-05-31T10:00:00Z' },
  { id: '13', fullName: 'Unknown', email: 'probe@mail.ru', avatarUrl: '', role: '—', action: 'login', module: 'Authentication', ipAddress: '91.108.4.12', device: 'Python / Linux', status: 'warning', timestamp: '2026-05-31T09:47:00Z' },
  { id: '14', fullName: 'Amr Mohamed', email: 'amr@nexux.com', avatarUrl: '', role: 'admin', action: 'logout', module: 'Authentication', ipAddress: '192.168.1.10', device: 'Chrome / Windows', status: 'success', timestamp: '2026-05-31T09:30:00Z' },
  { id: '15', fullName: 'Layla Mostafa', email: 'layla@nexux.com', avatarUrl: '', role: 'accountant', action: 'update', module: 'Invoicing', ipAddress: '192.168.1.66', device: 'Chrome / macOS', status: 'success', timestamp: '2026-05-31T09:15:00Z' },
  { id: '16', fullName: 'Sara Hassan', email: 'sara@nexux.com', avatarUrl: '', role: 'hr', action: 'delete', module: 'Roles', ipAddress: '192.168.1.22', device: 'Firefox / macOS', status: 'failed', timestamp: '2026-05-31T09:00:00Z' },
]

// ── Filter Options ────────────────────────────────────────────────────────────
const statusOptions = computed(() => [
  { value: 'all', label: t('access_log.filter_all'), dotClass: 'bg-gray-500' },
  { value: 'success', label: t('access_log.status_success'), dotClass: 'bg-emerald-500' },
  { value: 'failed', label: t('access_log.status_failed'), dotClass: 'bg-red-500' },
  { value: 'warning', label: t('access_log.status_warning'), dotClass: 'bg-amber-500' },
])

const actionOptions = computed(() => [
  { value: 'all', label: t('access_log.filter_all'), icon: 'material-symbols:apps-rounded' },
  { value: 'login', label: t('access_log.action_login'), icon: 'material-symbols:login-rounded' },
  { value: 'logout', label: t('access_log.action_logout'), icon: 'material-symbols:logout-rounded' },
  { value: 'create', label: t('access_log.action_create'), icon: 'material-symbols:add-circle-outline-rounded' },
  { value: 'update', label: t('access_log.action_update'), icon: 'material-symbols:edit-outline-rounded' },
  { value: 'delete', label: t('access_log.action_delete'), icon: 'material-symbols:delete-outline-rounded' },
  { value: 'view', label: t('access_log.action_view'), icon: 'material-symbols:visibility-outline-rounded' },
  { value: 'export', label: t('access_log.action_export'), icon: 'material-symbols:download-rounded' },
])

const activeStatusLabel = computed(() =>
  statusOptions.value.find(o => o.value === selectedStatus.value)?.label ?? t('access_log.filter_status')
)
const activeActionLabel = computed(() =>
  actionOptions.value.find(o => o.value === selectedAction.value)?.label ?? t('access_log.filter_action')
)

// ── Derived Filters ───────────────────────────────────────────────────────────
const hasActiveFilters = computed(() =>
  searchTerm.value !== '' ||
  selectedStatus.value !== 'all' ||
  selectedAction.value !== 'all' ||
  dateFrom.value !== null ||
  dateTo.value !== null
)

const filteredLogs = computed(() => {
  return mockLogs.filter(log => {
    const q = searchTerm.value.toLowerCase()
    if (q && !log.fullName.toLowerCase().includes(q) && !log.email.toLowerCase().includes(q) && !log.ipAddress.includes(q) && !log.module.toLowerCase().includes(q)) return false
    if (selectedStatus.value !== 'all' && log.status !== selectedStatus.value) return false
    if (selectedAction.value !== 'all' && log.action !== selectedAction.value) return false
    if (dateFrom.value && new Date(log.timestamp) < dateFrom.value) return false
    if (dateTo.value && new Date(log.timestamp) > dateTo.value) return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredLogs.value.length / pageSize))

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredLogs.value.slice(start, start + pageSize)
})

// ── Table Columns ─────────────────────────────────────────────────────────────
const ACTION_STYLES: Record<string, string> = {
  login: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
  logout: 'text-gray-400 bg-gray-500/10 border border-gray-600/30',
  create: 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20',
  update: 'text-sky-400 bg-sky-500/10 border border-sky-500/20',
  delete: 'text-red-400 bg-red-500/10 border border-red-500/20',
  view: 'text-purple-400 bg-purple-500/10 border border-purple-500/20',
  export: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
}

const ACTION_ICONS: Record<string, string> = {
  login: 'material-symbols:login-rounded',
  logout: 'material-symbols:logout-rounded',
  create: 'material-symbols:add-circle-outline-rounded',
  update: 'material-symbols:edit-outline-rounded',
  delete: 'material-symbols:delete-outline-rounded',
  view: 'material-symbols:visibility-outline-rounded',
  export: 'material-symbols:download-rounded',
}

const STATUS_STYLES: Record<string, string> = {
  success: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
  failed: 'text-red-400 bg-red-500/10 border border-red-500/20',
  warning: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
}

const columns = computed<Column[]>(() => [
  {
    key: 'user',
    label: t('table.users'),
    sortable: true,
  },
  {
    key: 'action',
    label: t('table.action'),
    sortable: true,
    html: true,
    format: (item: any) => {
      const cls = ACTION_STYLES[item.action] ?? 'text-gray-400 bg-gray-500/10'
      const icon = ACTION_ICONS[item.action] ?? 'material-symbols:info-outline-rounded'
      return `<span class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${cls}">
        <iconify-icon icon="${icon}" width="13" height="13"></iconify-icon>
        ${item.action}
      </span>`
    },
  },
  {
    key: 'module',
    label: t('table.module'),
    sortable: true,
    format: (item: any) => item.module,
  },
  {
    key: 'ipAddress',
    label: t('table.ip_address'),
    sortable: true,
    html: true,
    format: (item: any) =>
      `<span class="font-mono text-xs text-gray-300 bg-white/5 rounded px-2 py-0.5">${item.ipAddress}</span>`,
  },
  {
    key: 'device',
    label: t('table.device'),
    sortable: false,
    html: true,
    format: (item: any) =>
      `<span class="text-xs text-gray-400">${item.device}</span>`,
  },
  {
    key: 'status',
    label: t('table.status'),
    sortable: true,
    html: true,
    format: (item: any) => {
      const cls = STATUS_STYLES[item.status] ?? 'text-gray-400 bg-gray-500/10'
      return `<span class="inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold capitalize ${cls}">${item.status}</span>`
    },
  },
  {
    key: 'timestamp',
    label: t('table.timestamp'),
    sortable: true,
    html: true,
    format: (item: any) => {
      const d = new Date(item.timestamp)
      const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      return `<div class="flex flex-col gap-0.5">
        <span class="text-xs text-white font-medium">${date}</span>
        <span class="text-[11px] text-gray-500">${time}</span>
      </div>`
    },
  },
])

// ── Handlers ──────────────────────────────────────────────────────────────────
const handleSearch = (term: string) => {
  searchTerm.value = term
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleRefresh = async () => {
  isLoading.value = true
  await new Promise(r => setTimeout(r, 600))
  isLoading.value = false
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedStatus.value = 'all'
  selectedAction.value = 'all'
  dateFrom.value = null
  dateTo.value = null
  currentPage.value = 1
}

// ── SEO & Meta ─────────────────────────────────────────────────────────────────
useSeoPage({
  title: () => t('meta.system_access_log'),
  description: () => t('meta.system_access_log_description'),
  private: true,
})

definePageMeta({
  layout: 'dashboard',
})
</script>