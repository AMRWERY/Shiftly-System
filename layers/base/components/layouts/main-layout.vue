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

          <!-- Navigations -->
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
              <!-- Unified, premium responsive greeting, date, and animated clock widget -->
              <div class="flex items-center gap-2.5 sm:gap-3 py-1">
                <!-- Dynamic Meteocon Icon Card -->
                <div
                  :class="['flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr shadow-sm transition-all duration-300 hover:scale-105', greeting.bgClass]">
                  <Icon :name="greeting.icon" :class="['w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm', greeting.colorClass]" />
                </div>

                <!-- Typographic Stack: Greeting + Time & Date Details -->
                <div class="flex flex-col justify-center min-w-0">
                  <h1
                    class="text-xs sm:text-[13px] font-bold tracking-tight text-tx-primary leading-none flex items-baseline gap-1">
                    <span>{{ greeting.text }}</span>
                    <span v-if="authStore.currentUser?.user_metadata?.fullName"
                      class="text-tx-secondary font-normal text-[10px] sm:text-xs">
                      , {{ authStore.currentUser.user_metadata.fullName.split(' ')[0] }}
                    </span>
                  </h1>

                  <div
                    class="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] text-tx-muted mt-1 leading-none font-medium">
                    <span>{{ formattedDate }}</span>
                    <span class="text-[var(--border-subtle)] font-bold select-none">•</span>
                    <!-- Monospace Animated clock -->
                    <div class="flex items-center text-tx-secondary font-mono font-semibold tracking-wider">
                      <span v-for="(char, idx) in timeChars" :key="idx"
                        class="relative overflow-hidden inline-flex items-center justify-center h-3 sm:h-3.5"
                        :class="char === ':' ? 'w-1' : 'w-1.5 sm:w-2'">
                        <Transition name="digit-slide">
                          <span :key="char" class="absolute inset-0 flex items-center justify-center">
                            {{ char }}
                          </span>
                        </Transition>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <LazyVSearchInput v-model="searchQuery" :placeholder="'Search...'" class="hidden md:block w-52" />

              <LazyVToggleLocales />

              <LazyVToggleThemes />

              <LazyVAppNotifications />

              <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo(localePath('/profile'))">
                <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'" alt="avatar"
                  class="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-[var(--border-default)]" />
              </div>

              <LazyVButton type="button" variant="ghost" text-color="text-tx-secondary"
                hover-color="hover:bg-[var(--bg-hover)]" padding-x="px-1.5" padding-y="py-1.5"
                class="lg:hidden rounded-lg hover:text-tx-primary" @click="isMobileSidebarOpen = !isMobileSidebarOpen">
                <Icon name="material-symbols:menu-rounded" class="w-5 h-5" />
              </LazyVButton>
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

// ── Greeting, Date & Animated Clock (VueUse) ────────────────
const now = useNow()

const greeting = computed(() => {
  const hour = now.value.getHours()
  if (hour >= 5 && hour < 12) {
    return {
      text: t('greetings.morning'),
      icon: 'meteocons:time-late-morning-fill',
      colorClass: 'text-amber-500 dark:text-amber-400',
      bgClass: 'from-amber-500/5 to-amber-500/15 border-amber-500/20 dark:from-amber-500/10 dark:to-amber-500/25 dark:border-amber-500/30'
    }
  } else if (hour >= 12 && hour < 17) {
    return {
      text: t('greetings.afternoon'),
      icon: 'meteocons:time-afternoon-fill',
      colorClass: 'text-orange-500 dark:text-orange-400',
      bgClass: 'from-orange-500/5 to-orange-500/15 border-orange-500/20 dark:from-orange-500/10 dark:to-orange-500/25 dark:border-orange-500/30'
    }
  } else if (hour >= 17 && hour < 21) {
    return {
      text: t('greetings.evening'),
      icon: 'meteocons:clear-night',
      colorClass: 'text-indigo-500 dark:text-indigo-400',
      bgClass: 'from-indigo-500/5 to-indigo-500/15 border-indigo-500/20 dark:from-indigo-500/10 dark:to-indigo-500/25 dark:border-indigo-500/30'
    }
  } else {
    return {
      text: t('greetings.night'),
      icon: 'meteocons:overcast-night-fill',
      colorClass: 'text-blue-500 dark:text-blue-400',
      bgClass: 'from-blue-500/5 to-blue-500/15 border-blue-500/20 dark:from-blue-500/10 dark:to-blue-500/25 dark:border-blue-500/30'
    }
  }
})

// Current formatted date according to the active locale
const formattedDate = computed(() => {
  return new Intl.DateTimeFormat(localeStore.locale === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(now.value)
})

// Current time formatted as HH:mm:ss
const timeString = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now.value)
})

// Split characters for individual digit transitions
const timeChars = computed(() => timeString.value.split(''))

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

<style scoped>
.digit-slide-enter-active,
.digit-slide-leave-active {
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}

.digit-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.digit-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Ensure font numbers don't shift layout */
.font-mono {
  font-variant-numeric: tabular-nums;
}
</style>