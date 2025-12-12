export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  // Initialize auth state on app startup
  await authStore.initAuth();
});
