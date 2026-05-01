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
          class="flex-shrink-0 hidden lg:flex flex-col bg-brand-layoutBg border-e border-white/5 z-40 transition-[width] duration-200 ease-in-out text-[13px]"
          :class="isCollapsed ? 'w-16' : 'w-[260px]'">
          <!-- Logo -->
          <div class="flex items-center border-b border-white/5 h-14 px-3 flex-shrink-0 overflow-hidden"
            :class="isCollapsed ? 'justify-center' : 'gap-3'">
            <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="material-symbols:shield" class="text-white w-4 h-4" />
            </div>
            <div v-if="!isCollapsed" class="flex flex-col min-w-0 overflow-hidden">
              <span class="text-white text-[13px] font-bold leading-tight truncate">Nexux ERP</span>
              <span class="text-[10px] tracking-widest text-gray-500 font-medium truncate">
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
          <div class="border-b border-white/5 p-3 flex-shrink-0 overflow-hidden">
            <!-- User info -->
            <div v-if="!isCollapsed"
              class="mb-3 px-1 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer rounded-lg py-2 text-center">
              <p class="text-xs font-semibold text-white truncate leading-tight">
                {{ authStore.currentUser?.user_metadata?.fullName || authStore.userEmail || 'User' }}
              </p>
              <p v-if="currentRole" class="text-[10px] text-gray-500 truncate leading-tight mt-0.5">
                {{ t('roles.' + currentRole) }}
              </p>
            </div>

            <!-- Sign out -->
            <LazyVButton type="button" variant="ghost" :block="true" text-color="text-gray-400"
              hover-color="hover:bg-white/5" padding-x="px-2" :padding-y="isCollapsed ? 'py-2' : 'py-1.5'"
              class="rounded-lg hover:text-white text-xs justify-start p-2" @click="handleLogout">
              <Icon name="material-symbols:logout-rounded" class="w-4 h-4 flex-shrink-0" />
              <span v-if="!isCollapsed" class="truncate ms-2">{{ t('btn.logout') }}</span>
            </LazyVButton>
          </div>

          <!-- Collapse / expand toggle (chevron pill) -->
          <LazyVButton type="button" variant="ghost" padding-x="px-0" padding-y="py-0" :class="[
            'absolute top-[72px] z-50 w-5 h-5 rounded-full',
            'bg-brand-layoutBg border border-white/15',
            'hover:bg-white/10 hover:border-white/30',
            localeStore.isRTL ? '-left-2.5' : '-right-2.5',
          ]" @click="toggleCollapse">
            <Icon :name="(localeStore.isRTL ? !isCollapsed : isCollapsed)
              ? 'material-symbols:chevron-right-rounded'
              : 'material-symbols:chevron-left-rounded'
              " class="w-3.5 h-3.5 text-gray-400" />
          </LazyVButton>
        </aside>

        <!-- ───────────────── MOBILE SIDEBAR DRAWER ───────────────── -->
        <transition name="slide-sidebar">
          <aside v-if="isMobileSidebarOpen" :class="[
            'fixed inset-y-0 w-[260px] flex flex-col bg-brand-layoutBg border-e border-white/5 z-40 lg:hidden text-[13px]',
            localeStore.isRTL ? 'right-0' : 'left-0',
          ]">
            <div class="flex items-center gap-3 border-b border-white/5 h-14 px-4 flex-shrink-0">
              <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="material-symbols:shield" class="text-white w-4 h-4" />
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <span class="text-white text-[13px] font-bold leading-tight">Nexux ERP</span>
                <span class="text-[10px] tracking-widest text-gray-500 font-medium">
                  {{ currentRole ? t('roles.' + currentRole) : 'ERP' }}
                </span>
              </div>
              <LazyVButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-white/5"
                padding-x="px-1" padding-y="py-1" class="ms-auto rounded-lg" @click="isMobileSidebarOpen = false">
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

            <div class="border-b border-white/5 p-3 flex-shrink-0">
              <!-- Avatar -->
              <div class="mb-3 px-1">
                <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'" alt="avatar"
                  class="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10" />
              </div>

              <!-- User info -->
              <div class="mb-3 px-1 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer rounded-lg py-2">
                <p class="text-xs font-semibold text-white truncate leading-tight">
                  {{ authStore.currentUser?.user_metadata?.fullName || authStore.userEmail || 'User' }}
                </p>
                <p v-if="currentRole" class="text-[10px] text-gray-500 truncate leading-tight mt-0.5">
                  {{ t('roles.' + currentRole) }}
                </p>
              </div>

              <!-- Sign out -->
              <LazyVButton type="button" variant="ghost" :block="true" text-color="text-gray-400"
                hover-color="hover:bg-white/5" padding-x="px-2" padding-y="py-1.5"
                class="rounded-lg hover:text-white text-xs gap-2 justify-start" @click="handleLogout">
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
            class="h-14 px-4 flex items-center justify-between flex-shrink-0 border-b border-white/5 bg-brand-systemBg/80 backdrop-blur-md z-20">
            <div class="flex items-center gap-3">
              <LazyVButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-white/5"
                padding-x="px-1.5" padding-y="py-1.5" class="lg:hidden rounded-lg hover:text-white"
                @click="isMobileSidebarOpen = !isMobileSidebarOpen">
                <Icon name="material-symbols:menu-rounded" class="w-5 h-5" />
              </LazyVButton>
            </div>

            <div class="flex items-center gap-2">
              <LazyVSearchInput v-model="searchQuery" :placeholder="'Search...'" class="hidden md:block w-52" />

              <LazyVButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-white/10"
                padding-x="px-1.5" padding-y="py-1.5"
                class="rounded-lg border border-white/10 bg-white/5 hover:text-white text-[11px] font-medium gap-1"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <Icon name="heroicons:language" class="w-3.5 h-3.5" />
                {{ localeStore.isRTL ? 'EN' : 'ع' }}
              </LazyVButton>

              <LazyVAppNotifications />

              <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo(localePath('/profile'))">
                <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'" alt="avatar"
                  class="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-white/10" />
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
const route = useRoute()
const { setLocale, setLocaleMessage, t } = useI18n()
const localePath = useLocalePath()
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

// ── Toggle button ─────────────────────────────────────────
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// ── Locale ───────────────────────────────────────────────
watch(
  () => localeStore.isRTL,
  (isRTL) => { document.documentElement.dir = isRTL ? 'rtl' : 'ltr' },
  { immediate: true },
)

const switchLocale = async (value: SupportedLocale) => {
  isMobileSidebarOpen.value = false
  localeStore.updateLocale(value)
  if (value === 'ar') {
    const msgs = await import('@/layers/base/i18n/locales/ar.json')
    setLocaleMessage('ar', msgs.default || msgs)
  } else {
    const msgs = await import('@/layers/base/i18n/locales/en.json')
    setLocaleMessage('en', msgs.default || msgs)
  }
  setLocale(value)
}

onMounted(() => {
  document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr'
})

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