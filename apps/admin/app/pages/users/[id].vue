<template>
  <div>
    <div class="p-6">
      <LazyVBackButton />

      <div v-if="user" class="max-w-4xl mx-auto animate-fade-in">
        <!-- Header with Avatar and Basic Info -->
        <div class="bg-[#0B0E14] rounded-xl shadow-lg border border-gray-800/40 p-8 mb-6">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="relative">
              <img :src="user.avatarUrl || '/img/dummy-profile-img.jpg'" :alt="user.fullName"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-md transform hover:scale-105 transition-transform duration-300" />
              <div :class="getStatusColor(user.status)"
                class="absolute bottom-2 end-2 w-6 h-6 rounded-full border-4 border-[#0B0E14] shadow-sm"
                :title="user.status"></div>
            </div>

            <div class="text-center md:text-start flex-1">
              <div class="flex flex-col md:flex-row md:justify-between items-center gap-4">
                <h1 class="text-3xl font-bold text-gray-200 mb-2">
                  {{ user.fullName }}
                </h1>
                <div v-if="user.createdAt" class="text-sm text-gray-400">
                  {{ t("users.member_since") }}:
                  <span class="font-semibold text-gray-300 underline">{{ new Date(user.createdAt).toLocaleDateString()
                  }}</span>
                </div>
              </div>

              <div class="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 mb-6">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
                  <Icon name="heroicons:envelope" class="w-4 h-4 text-gray-400" />
                  <span class="text-sm">{{ user.email }}</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg" v-if="user.phoneNumber">
                  <Icon name="heroicons:phone" class="w-4 h-4 text-gray-400" />
                  <span class="text-sm">{{ user.phoneNumber }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  {{ t(`roles.${user.role}`) }}
                </span>
                <span class="px-3 py-1 rounded-full text-sm font-medium border" :class="getStatusClass(user.status)">
                  {{ t(`status.${user.status}`) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Employment Details -->
          <div
            class="bg-[#0B0E14] rounded-xl shadow-lg border border-gray-800/40 p-6 hover:border-gray-700 transition-colors duration-300">
            <h2
              class="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2 pb-2 border-b border-gray-800/40">
              <div class="p-2 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:briefcase" class="w-5 h-5 text-blue-400" />
              </div>
              {{ t("users.employment_details") }}
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.employee_id")
                }}</span>
                <span class="font-medium text-gray-300 bg-gray-800/50 px-2 py-1 rounded">{{ user.employeeId }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.base_salary")
                }}</span>
                <span class="text-emerald-400 font-medium">{{
                  !isNaN(Number(user.baseSalary))
                    ? `${Number(user.baseSalary).toLocaleString()} EGP`
                    : "0 EGP"
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.role") }}</span>
                <span class="text-indigo-400 font-medium">{{
                  t(`roles.${user.role}`)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Personal Info -->
          <div
            class="bg-[#0B0E14] rounded-xl shadow-lg border border-gray-800/40 p-6 hover:border-gray-700 transition-colors duration-300">
            <h2
              class="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2 pb-2 border-b border-gray-800/40">
              <div class="p-2 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:user-circle" class="w-5 h-5 text-purple-400" />
              </div>
              {{ t("users.personal_info") }}
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.first_name")
                }}</span>
                <span class="font-medium text-gray-300">{{
                  user.firstName
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.middle_name")
                }}</span>
                <span class="font-medium text-gray-300">{{
                  user.middleName
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span class="text-gray-500 group-hover:text-gray-400 transition-colors">{{ t("users.last_name")
                }}</span>
                <span class="font-medium text-gray-300">{{
                  user.lastName
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading/Error State -->
      <div v-else class="flex flex-col justify-center items-center h-[60vh] animate-fade-in">
        <user-profile-skeleton-loader v-if="loading" />

        <div v-else class="text-center p-8 bg-[#0B0E14] max-w-md rounded-2xl shadow-xl border border-gray-800/40">
          <LazyVErrorMessage :error-message="t('users.user_not_found')" />

          <LazyVEmptyState :message="t('users.user_not_found')"
            :icon="'material-symbols:person-alert-outline-rounded'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const usersStore = useUsersStore();

const { getStatusClass, getStatusColor } = useStatusClasses()

const userId = computed(() => route.params.id as string);
const user = computed(() => usersStore.getUserById(userId.value));
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    await usersStore.fetchUser(userId.value);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

useHead({
  title: computed(() =>
    user.value
      ? `${user.value.fullName} | ${t("users.employment_details")}`
      : t("meta.users")
  ),
});

definePageMeta({
  layout: "dashboard",
});
</script>
