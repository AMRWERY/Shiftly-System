<template>
  <div>
    <!-- Overlay Component -->
    <overlay :visible="localeStore.isOverlayVisible" />

    <div :class="{ rtl: localeStore.isRTL }">
      <div class="flex h-screen">
        <!-- Overlay for small screens -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>

        <!-- Sidebar -->
        <aside
          class="fixed inset-y-0 w-[260px] text-white flex-shrink-0 z-40 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col bg-brand-layoutBg border-e border-white/5"
          :class="{
            'left-0': !localeStore.isRTL,
            'right-0': localeStore.isRTL,
            '-translate-x-full': !localeStore.isRTL && !isSidebarOpen,
            'translate-x-full': localeStore.isRTL && !isSidebarOpen,
            'translate-x-0': isSidebarOpen,
            'hidden lg:flex': !isSidebarOpen,
          }">
          <div class="p-6 text-2xl font-bold flex items-center space-s-3">
            <div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <icon name="material-symbols:shield" class="text-white w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <span class="text-lg leading-tight">Enterprise Admin</span>
              <span class="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Global Operations</span>
            </div>
          </div>
          <nav class="mt-4 flex-1 mb-4 mx-4 space-y-3 overflow-y-auto hide-scrollbar">
            <template v-if="authStore.isAuthenticated">
              <!-- admin-layout component -->
              <admin-layout v-if="isAdmin" />

              <!-- accountant-layout component -->
              <accountant-layout v-if="isAccountant" />

              <!-- employee-layout component -->
              <employee-layout v-if="isEmployee" />

              <!-- hr-layout component -->
              <hr-layout v-if="isHr" />

              <!-- manager-layout component -->
              <manager-layout v-if="isManager" />

              <!-- system-auditor-layout component -->
              <system-auditor-layout v-if="isSystemAuditor" />

              <!-- inventory-manager-layout component -->
              <inventory-manager-layout v-if="isInventoryManager" />

              <!-- td-officer-layout component -->
              <td-officer-layout v-if="isTdOfficer" />

              <!-- maintenance-technician-layout component -->
              <maintenance-technician-layout v-if="isMaintenanceTechnician" />

              <manager-layout v-if="isMaintenanceTechnician" />

              <!-- <li>
                <nuxt-link-locale to="/holiday-dates" class="flex items-center p-2 text-white rounded-lg group"
                  active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
                  <icon name="heroicons-solid:calendar-days"
                    class="w-5 h-5 transition duration-75 group-hover:text-white"
                    :class="{ 'text-white': route.path === '/holiday-dates', 'text-gray-400': route.path !== '/holiday-dates' }" />
                  <span class="flex-1 ms-3 whitespace-nowrap">{{ t('layouts.holiday_dates') }}</span>
                </nuxt-link-locale>
              </li>

              <li>
                <nuxt-link-locale to="" class="flex items-center p-2 text-white rounded-lg group"
                  active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
                  <icon name="fluent:tasks-app-28-filled" class="w-5 h-5 transition duration-75 group-hover:text-white"
                    :class="{ 'text-white': route.path === '', 'text-gray-400': route.path !== '' }" />
                  <span class="flex-1 ms-3 whitespace-nowrap">{{ t('layouts.task_management')
                  }}</span>
                </nuxt-link-locale>
              </li> -->
            </template>
          </nav>

          <!-- Logout Button -->
          <div class="p-4 border-t border-white/5">
            <base-button :variant="'solid'" :block="true" :route="true" :to="'/auth'" @click="handleLogout"
              padding-x="px-6" padding-y="py-2.5">
              {{ t("btn.logout") }}
            </base-button>
          </div>
        </aside>

        <!-- Main content area -->
        <div class="flex-1 flex flex-col overflow-hidden lg:ms-0 bg-brand-systemBg">
          <!-- Navbar (Top Bar) -->
          <header
            class="p-4 flex justify-between items-center z-20 bg-brand-systemBg/80 backdrop-blur-md border-b border-white/5">
            <!-- Hamburger menu for small screens -->
            <base-button :variant="'ghost'" :text-color="'text-gray-400'" @click="isSidebarOpen = !isSidebarOpen"
              class="lg:hidden bg-white/5 hover:bg-white/10 p-1.5 rounded-xl transition-all border border-white/10 flex items-center justify-center">
              <icon name="material-symbols:menu" class="h-6 w-6" />
            </base-button>

            <div class="flex items-center justify-end ms-auto space-s-4">
              <!-- Search Input Component -->
              <search-input v-model="searchQuery" :placeholder="'Search system resources...'"
                class="hidden md:block w-72" />

              <!-- Profile Image -->
              <div
                class="relative cursor-pointer flex items-center space-s-3 bg-white/5 hover:bg-white/10 p-1.5 rounded-xl transition-all border border-white/10"
                @click="navigateTo(localePath('/profile'))">
                <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'"
                  alt="User Profile" class="w-8 h-8 rounded-lg object-cover" />
                <div class="hidden lg:block text-start">
                  <p class="text-[13px] font-semibold text-white leading-none">Alex Sterling</p>
                  <p class="text-[11px] text-gray-500 mt-0.5">System Administrator</p>
                </div>
              </div>

              <!-- RTL Toggle -->
              <base-button :variant="'ghost'" :text-color="'text-gray-100'" :type="'button'"
                class="relative cursor-pointer flex items-center space-s-3 bg-white/5 hover:bg-white/10 p-1.5 rounded-xl transition-all border border-white/10 me-1"
                padding-x="px-2" padding-y="py-1.5" @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center">
                  <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                  En
                </span>
                <span v-else class="flex items-center">
                  <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                  العربية
                </span>
              </base-button>

              <!-- notifications-menu component -->
              <notifications-menu :is-open="isNotificationsMenuOpen" @toggle="toggleNotificationsMenu" />
            </div>
          </header>

          <div class="px-1 sm:px-3 md:px-6 flex-1 overflow-y-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { setLocale, setLocaleMessage, t } = useI18n();
const localePath = useLocalePath();
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const {
  isAdmin,
  isAccountant,
  isEmployee,
  isHr,
  isManager,
  isInventoryManager,
  isMaintenanceTechnician,
  isSystemAuditor,
  isTdOfficer,
  currentRole,
} = useRole();
const searchQuery = ref('');
const isSidebarOpen = ref(false);

watch(
  () => localeStore.isRTL,
  (isRTL) => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  },
  { immediate: true }
);

const switchLocale = async (value: SupportedLocale) => {
  isSidebarOpen.value = false;
  localeStore.updateLocale(value);
  // Get i18n instance and ensure messages are loaded
  if (value === "ar") {
    const arMessages = await import("../../i18n/locales/ar.json");
    setLocaleMessage("ar", arMessages.default || arMessages);
  } else {
    const enMessages = await import("../../i18n/locales/en.json");
    setLocaleMessage("en", enMessages.default || enMessages);
  }
  // Now set the locale
  setLocale(value);
};

// Initialize direction on component mount
onMounted(async () => {
  document.documentElement.dir = localeStore.isRTL ? "rtl" : "ltr";
  if (!authStore.isAuthReady) {
    // await authStore.initAuth();
  }
});

const handleLogout = async () => {
  const result = await authStore.logout();
  if (result.success) {
    // Navigate first
    await navigateTo("/auth", { replace: true });
    // ✅ Clear localStorage AFTER navigation
    if (process.client) {
      // Small delay to ensure navigation is complete
      setTimeout(() => {
        localStorage.clear();
      }, 100);
    }
  } else {
    console.error("Logout failed:", result.error);
  }
};

watch(
  () => route.path,
  () => {
    if (isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  }
);

watch(currentRole, (newRole) => {
  console.log("Current user role changed to:", newRole);
});

const isNotificationsMenuOpen = ref(false);

const toggleNotificationsMenu = () => {
  isNotificationsMenuOpen.value = !isNotificationsMenuOpen.value;
};
</script>