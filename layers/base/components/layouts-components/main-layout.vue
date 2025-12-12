<template>
  <div>
    <!-- Overlay Component -->
    <overlay :visible="localeStore.isOverlayVisible" />

    <div :class="{ rtl: localeStore.isRTL }">
      <div class="flex h-screen bg-gray-100">
        <!-- Overlay for small screens -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
          class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"></div>

        <!-- Sidebar -->
        <aside
          class="fixed inset-y-0 w-[280px] text-white flex-shrink-0 z-40 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col layout-bg"
          :class="{
            'left-0': !localeStore.isRTL,
            'right-0': localeStore.isRTL,
            '-translate-x-full': !localeStore.isRTL && !isSidebarOpen,
            'translate-x-full': localeStore.isRTL && !isSidebarOpen,
            'translate-x-0': isSidebarOpen,
            'hidden lg:flex': !isSidebarOpen,
          }">
          <div class="p-4 text-2xl font-semibold border-b border-gray-700">
            Shiftly
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
              <system-auditor-layout v-if="isManager" />

              <!-- inventory-manager-layout component -->
              <inventory-manager-layout v-if="isManager" />

              <!-- td-officer-layout component -->
              <td-officer-layout v-if="isManager" />

              <!-- maintenance-technician-layout component -->
              <maintenance-technician-layout v-if="isManager" />

              <!-- <li>
                                <nuxt-link-locale to="/holiday-dates"
                                    class="flex items-center p-2 text-white rounded-lg group"
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
                                    <icon name="fluent:tasks-app-28-filled"
                                        class="w-5 h-5 transition duration-75 group-hover:text-white"
                                        :class="{ 'text-white': route.path === '', 'text-gray-400': route.path !== '' }" />
                                    <span class="flex-1 ms-3 whitespace-nowrap">{{ t('layouts.task_management')
                                    }}</span>
                                </nuxt-link-locale>
                            </li> -->
            </template>
          </nav>

          <!-- Logout Button -->
          <div class="p-4 border-t border-gray-700">
            <base-button :default-icon="false" :hover-color="'bg-gray-100'" :border-color="'border-gray-700'"
              :text-color="'text-white'" :variant="'outline'" :block="true" :route="true" :type="'button'"
              :no-border="true"
              class="flex items-center justify-center p-2 rounded-lg border-2 transition-colors group bg-gray-400 hover:bg-gray-500"
              @click="handleLogout" :to="'/auth'">{{ t("btn.logout") }}</base-button>
          </div>
        </aside>

        <!-- Main content area -->
        <div class="flex-1 flex flex-col overflow-hidden lg:ms-0">
          <!-- Navbar (Top Bar) -->
          <header class="bg-white shadow-md p-4 flex justify-between items-center z-20">
            <!-- Hamburger menu for small screens -->
            <button @click="isSidebarOpen = !isSidebarOpen"
              class="text-gray-600 hover:text-gray-800 focus:outline-none lg:hidden">
              <icon name="material-symbols:menu" class="h-6 w-6" />
            </button>

            <div class="flex items-center justify-end ms-auto space-x-5">
              <!-- RTL Toggle -->
              <button class="text-gray-600 hover:text-gray-800 me-1"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center">
                  <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                  En
                </span>
                <span v-else class="flex items-center">
                  <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                  العربية
                </span>
              </button>

              <!-- notifications-menu component -->
              <!-- <notifications-menu
                :is-open="isNotificationsMenuOpen"
                @toggle="toggleNotificationsMenu"
              /> -->

              <!-- user-menu component -->
              <!-- <user-menu
                :is-open="isUserMenuOpen"
                @toggle="toggleUserMenu"
                @closeMenu="isUserMenuOpen = false"
              /> -->
            </div>
          </header>

          <div class="px-1 sm:px-3 md:px-6">
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
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const { isAdmin, isAccountant, isEmployee, isHr, isManager, currentRole } =
  useRole();
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

// const isUserMenuOpen = ref(false);
// const isNotificationsMenuOpen = ref(false);

// const toggleUserMenu = () => {
//   isUserMenuOpen.value = !isUserMenuOpen.value;
//   if (isUserMenuOpen.value) isNotificationsMenuOpen.value = false;
// };

// const toggleNotificationsMenu = () => {
//   isNotificationsMenuOpen.value = !isNotificationsMenuOpen.value;
//   if (isNotificationsMenuOpen.value) isUserMenuOpen.value = false;
// };
</script>