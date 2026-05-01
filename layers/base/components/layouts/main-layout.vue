<template>
  <div>
    <LazyVOverlay :visible="localeStore.isOverlayVisible" />

    <div :class="{ rtl: localeStore.isRTL }">
      <div class="flex h-screen overflow-hidden bg-brand-systemBg select-none">
        <!-- Mobile overlay backdrop -->
        <transition name="fade">
          <div v-if="isMobileSidebarOpen" class="fixed inset-0 bg-black/60 z-30 lg:hidden"
            @click="isMobileSidebarOpen = false" />
        </transition>

        <!-- ───────────────── SIDEBAR (desktop) ───────────────── -->
        <aside
          class="flex-shrink-0 hidden lg:flex flex-col bg-brand-layoutBg border-e border-[var(--border-subtle)] z-40 transition-[width] duration-200 ease-in-out text-[13px]"
          :class="isCollapsed ? 'w-16' : 'w-[260px]'">
          <!-- Logo -->
          <div class="flex items-center border-b border-[var(--border-subtle)] h-14 px-3 flex-shrink-0 overflow-hidden"
            :class="isCollapsed ? 'justify-center' : 'gap-3'">
            <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="material-symbols:shield" class="text-white w-4 h-4" />
            </div>
            <div v-if="!isCollapsed" class="flex flex-col min-w-0 overflow-hidden">
              <span class="text-tx-primary text-[13px] font-bold leading-tight truncate">Nexux ERP</span>
              <span class="text-[10px] tracking-widest text-tx-muted font-medium truncate">
                {{ currentRole ? t('roles.' + currentRole) : 'ERP' }}
              </span>
            </div>
          </div>

          <!-- Navigation -->
          <nav
            class="sidebar-nav-container flex-1 overflow-y-auto hide-scrollbar py-3 px-0 space-y-0.5 overflow-x-hidden">
            <template v-if="authStore.isAuthenticated">
              <lazy-admin-layout v-if="isAdmin" :collapsed="isCollapsed" />

              <lazy-accountant-layout v-if="isAccountant" :collapsed="isCollapsed" />

              <lazy-employee-layout v-if="isEmployee" :collapsed="isCollapsed" />

              <lazy-hr-layout v-if="isHr" :collapsed="isCollapsed" />

              <lazy-manager-layout v-if="isManager" :collapsed="isCollapsed" />

              <lazy-system-auditor-layout v-if="isSystemAuditor" :collapsed="isCollapsed" />

              <lazy-inventory-manager-layout v-if="isInventoryManager" :collapsed="isCollapsed" />

              <lazy-td-officer-layout v-if="isTdOfficer" :collapsed="isCollapsed" />

              <lazy-maintenance-technician-layout v-if="isMaintenanceTechnician" :collapsed="isCollapsed" />
            </template>
          </nav>

          <!-- User profile + sign out -->
          <div class="border-b border-[var(--border-subtle)] p-3 flex-shrink-0 overflow-hidden">
            <!-- User info -->
            <div v-if="!isCollapsed"
              class="mb-3 px-1 bg-[var(--bg-hover)] hover:bg-[var(--bg-hover-strong)] transition-colors cursor-pointer rounded-lg py-2 text-center">
              <p class="text-xs font-semibold text-tx-primary truncate leading-tight">
                {{ authStore.currentUser?.user_metadata?.fullName || authStore.userEmail || 'User' }}
              </p>
              <p v-if="currentRole" class="text-[10px] text-tx-muted truncate leading-tight mt-0.5">
                {{ t('roles.' + currentRole) }}
              </p>
            </div>

            <!-- Sign out -->
            <LazyVButton type="button" variant="ghost" :block="true" text-color="text-tx-secondary"
              hover-color="hover:bg-[var(--bg-hover)]" padding-x="px-2" :padding-y="isCollapsed ? 'py-2' : 'py-1.5'"
              class="rounded-lg hover:text-tx-primary text-xs justify-start p-2" @click="handleLogout">
              <Icon name="material-symbols:logout-rounded" class="w-4 h-4 flex-shrink-0" />
              <span v-if="!isCollapsed" class="truncate ms-2">{{ t('btn.logout') }}</span>
            </LazyVButton>
          </div>
        </aside>

        <!-- ───────────────── MOBILE SIDEBAR DRAWER ───────────────── -->
        <transition name="slide-sidebar">
          <aside v-if="isMobileSidebarOpen" :class="[
            'fixed inset-y-0 w-[260px] flex flex-col bg-brand-layoutBg border-e border-[var(--border-subtle)] z-40 lg:hidden text-[13px]',
            localeStore.isRTL ? 'right-0' : 'left-0',
          ]">
            <div class="flex items-center gap-3 border-b border-[var(--border-subtle)] h-14 px-4 flex-shrink-0">
              <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="material-symbols:shield" class="text-white w-4 h-4" />
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <span class="text-tx-primary text-[13px] font-bold leading-tight">Nexux ERP</span>
                <span class="text-[10px] tracking-widest text-tx-muted font-medium">
                  {{ currentRole ? t('roles.' + currentRole) : 'ERP' }}
                </span>
              </div>
              <LazyVButton type="button" variant="ghost" text-color="text-tx-secondary"
                hover-color="hover:bg-[var(--bg-hover)]" padding-x="px-1" padding-y="py-1" class="ms-auto rounded-lg"
                @click="isMobileSidebarOpen = false">
                <Icon name="material-symbols:close-rounded" class="w-5 h-5" />
              </LazyVButton>
            </div>

            <nav class="flex-1 overflow-y-auto hide-scrollbar py-3 px-2 space-y-0.5">
              <template v-if="authStore.isAuthenticated">
                <lazy-admin-layout v-if="isAdmin" :collapsed="false" />

                <lazy-accountant-layout v-if="isAccountant" :collapsed="false" />

                <lazy-employee-layout v-if="isEmployee" :collapsed="false" />

                <lazy-hr-layout v-if="isHr" :collapsed="false" />

                <lazy-manager-layout v-if="isManager" :collapsed="false" />

                <lazy-system-auditor-layout v-if="isSystemAuditor" :collapsed="false" />

                <lazy-inventory-manager-layout v-if="isInventoryManager" :collapsed="false" />

                <lazy-td-officer-layout v-if="isTdOfficer" :collapsed="false" />

                <lazy-maintenance-technician-layout v-if="isMaintenanceTechnician" :collapsed="false" />
              </template>
            </nav>

            <div class="border-b border-[var(--border-subtle)] p-3 flex-shrink-0">
              <!-- User info -->
              <div
                class="mb-3 px-1 bg-[var(--bg-hover)] hover:bg-[var(--bg-hover-strong)] transition-colors cursor-pointer rounded-lg py-2 text-center">
                <p class="text-xs font-semibold text-tx-primary truncate leading-tight">
                  {{ authStore.currentUser?.user_metadata?.fullName || authStore.userEmail || 'User' }}
                </p>
                <p v-if="currentRole" class="text-[10px] text-tx-muted truncate leading-tight mt-0.5">
                  {{ t('roles.' + currentRole) }}
                </p>
              </div>

              <!-- Sign out -->
              <LazyVButton type="button" variant="ghost" :block="true" text-color="text-tx-secondary"
                hover-color="hover:bg-[var(--bg-hover)]" padding-x="px-2" padding-y="py-1.5"
                class="rounded-lg hover:text-tx-primary text-xs gap-2 justify-start" @click="handleLogout">
                <Icon name="material-symbols:logout-rounded" class="w-4 h-4 flex-shrink-0" />
                {{ t('btn.logout') }}
              </LazyVButton>
            </div>
          </aside>
        </transition>

        <!-- ───────────────── MAIN CONTENT ───────────────── -->
        <div class="flex-1 flex flex-col overflow-hidden min-w-0">
          <!-- Top header -->
          <header
            class="h-14 px-4 flex items-center justify-between flex-shrink-0 border-b border-[var(--border-subtle)] bg-brand-systemBg/80 backdrop-blur-md z-20">
            <div class="flex items-center gap-3">
              <LazyVButton type="button" variant="ghost" text-color="text-tx-secondary"
                hover-color="hover:bg-[var(--bg-hover)]" padding-x="px-1.5" padding-y="py-1.5"
                class="lg:hidden rounded-lg hover:text-tx-primary" @click="isMobileSidebarOpen = !isMobileSidebarOpen">
                <Icon name="material-symbols:menu-rounded" class="w-5 h-5" />
              </LazyVButton>
            </div>

            <div class="flex items-center gap-2">
              <LazyVSearchInput v-model="searchQuery" :placeholder="'Search...'" class="hidden md:block w-52" />

              <VToggleLocales />


              <LazyVAppNotifications />

              <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo(localePath('/profile'))">
                <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'" alt="avatar"
                  class="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-[var(--border-default)]" />
              </div>
            </div>
          </header>

          <!-- Page slot: flex-1 + min-h-0 + flex so children can grow; overflow-y-auto for long pages -->
          <div class="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-6 py-4 hide-scrollbar">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const localeStore = useLocaleStore()

const authStore = useAuthStore()
const {
  isAdmin, isAccountant, isEmployee, isHr, isManager,
  isInventoryManager, isMaintenanceTechnician, isSystemAuditor, isTdOfficer,
  currentRole,
} = useRole()

const searchQuery = ref('')
const isMobileSidebarOpen = ref(false)

const isCollapsed = useLocalStorage('sidebar-collapsed', false)

// ── Logout ────────────────────────────────────────────────
const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    await navigateTo('/auth', { replace: true })
    if (process.client) {
      const { start } = useTimeoutFn(() => {
        Object.keys(localStorage).forEach((key) => {
          useLocalStorage(key, null).value = null
        })
      }, 100, { immediate: false })
      start()
    }
  } else {
    console.error('Logout failed:', result.error)
  }
}

// Close mobile sidebar on route change
watch(() => route.path, () => {
  if (isMobileSidebarOpen.value) isMobileSidebarOpen.value = false
})

watch(currentRole, (newRole) => {
  console.log('Current user role changed to:', newRole)
})
</script>