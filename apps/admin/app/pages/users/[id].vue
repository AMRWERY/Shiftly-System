<template>
  <div>
    <div class="p-6">
      <div class="mb-6">
        <base-button
          variant="outline"
          :padding-x="'px-1'"
          :padding-y="'py-2'"
          class="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          @click="router.back()"
        >
          <icon name="heroicons:arrow-left" class="w-4 h-4 me-1" />
          {{ t("btn.back") }}
        </base-button>
      </div>

      <div v-if="user" class="max-w-4xl mx-auto animate-fade-in">
        <!-- Header with Avatar and Basic Info -->
        <div
          class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6"
        >
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="relative">
              <img
                :src="user.avatarUrl || '/img/dummy-profile-img.jpg'"
                :alt="user.fullName"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md transform hover:scale-105 transition-transform duration-300"
              />
              <div
                :class="getStatusColor(user.status)"
                class="absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white shadow-sm"
                :title="user.status"
              ></div>
            </div>

            <div class="text-center md:text-left flex-1">
              <div
                class="flex flex-col md:flex-row md:justify-between items-center gap-4"
              >
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ user.fullName }}
                </h1>
                <div v-if="user.createdAt" class="text-sm text-gray-500">
                  {{ t("label.member_since") }}
                  {{ new Date(user.createdAt).toLocaleDateString() }}
                </div>
              </div>

              <div
                class="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 mb-6"
              >
                <div
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg"
                >
                  <icon
                    name="heroicons:envelope"
                    class="w-4 h-4 text-gray-400"
                  />
                  <span class="text-sm">{{ user.email }}</span>
                </div>
                <div
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg"
                  v-if="user.phoneNumber"
                >
                  <icon name="heroicons:phone" class="w-4 h-4 text-gray-400" />
                  <span class="text-sm">{{ user.phoneNumber }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                >
                  {{ t(`roles.${user.role}`) }}
                </span>
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium border"
                  :class="getStatusBadgeClass(user.status)"
                >
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
            class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2
              class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2 pb-2 border-b border-gray-50"
            >
              <div class="p-2 bg-blue-50 rounded-lg">
                <icon
                  name="heroicons:briefcase"
                  class="w-5 h-5 text-blue-500"
                />
              </div>
              {{ t("headers.employment_details") }}
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.employee_id") }}</span
                >
                <span
                  class="font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded"
                  >{{ user.employeeId }}</span
                >
              </div>
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.base_salary") }}</span
                >
                <span class="text-emerald-600 font-medium">{{
                  !isNaN(Number(user.baseSalary))
                    ? `${Number(user.baseSalary).toLocaleString()} EGP`
                    : "0 EGP"
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.role") }}</span
                >
                <span class="text-indigo-600 font-medium">{{
                  t(`roles.${user.role}`)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Personal Info -->
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2
              class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2 pb-2 border-b border-gray-50"
            >
              <div class="p-2 bg-purple-50 rounded-lg">
                <icon
                  name="heroicons:user-circle"
                  class="w-5 h-5 text-purple-500"
                />
              </div>
              {{ t("headers.personal_info") }}
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.first_name") }}</span
                >
                <span class="font-medium text-gray-900">{{
                  user.firstName
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.middle_name") }}</span
                >
                <span class="font-medium text-gray-900">{{
                  user.middleName
                }}</span>
              </div>
              <div class="flex justify-between items-center group">
                <span
                  class="text-gray-500 group-hover:text-gray-700 transition-colors"
                  >{{ t("label.last_name") }}</span
                >
                <span class="font-medium text-gray-900">{{
                  user.lastName
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading/Error State -->
      <div
        v-else
        class="flex flex-col justify-center items-center h-[60vh] animate-fade-in"
      >
        <user-profile-skeleton-loader v-if="loading" />

        <div
          v-else
          class="text-center p-8 bg-white max-w-md rounded-2xl shadow-xl border border-gray-100"
        >
          <div
            class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <icon
              name="heroicons:exclamation-triangle"
              class="w-8 h-8 text-red-500"
            />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ t("messages.user_not_found") }}
          </h3>
          <p class="text-gray-500 mb-6">
            {{ t("messages.user_not_found_desc") }}
          </p>
          <base-button @click="router.push('/users')">{{
            t("btn.back_to_users")
          }}</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const usersStore = useUsersStore();

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "blocked":
      return "bg-red-500";
    case "pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "blocked":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>