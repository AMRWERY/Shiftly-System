<template>
  <div>
    <main-layout>
      <div class="flex min-h-0 flex-1 flex-col p-4">
        <slot />
      </div>
    </main-layout>

    <!-- Birthday dialog component -->
    <!-- <birthdate-dialog v-if="showBirthdayDialog" @close="closeBirthdayDialog" /> -->
  </div>
</template>

<script lang="ts" setup>
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const showBirthdayDialog = ref(false);
const birthdayShown = useSessionStorage("birthdayShown", false);

onMounted(async () => {
  await localeStore.loadLocale();
  // Only show birthday dialog once per session for authenticated users
  if (!birthdayShown.value && authStore.user) {
    showBirthdayDialog.value = true;
    birthdayShown.value = true;
  }
});

// const closeBirthdayDialog = () => {
//   showBirthdayDialog.value = false;
// };
</script>