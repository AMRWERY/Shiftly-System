<template>
  <div>
    <div class="w-full text-slate-200 space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white">Welcome back</h2>
        <p class="text-slate-500 mt-1 text-sm">Sign in to your workspace</p>
      </div>

      <!-- Error Alert -->
      <Transition name="fade">
        <div v-if="showError"
          class="flex items-center gap-2 p-3 rounded-lg bg-[#2d161a] border border-red-500/30 text-red-400 text-xs">
          <Icon name="ph:x-circle-fill" class="flex-shrink-0" />
          <span>{{ loginError }}</span>
        </div>
      </Transition>

      <!-- Form -->
      <LazyVFormWrapper @submit="handleLogin" class="space-y-4">
        <!-- Email -->
        <LazyVInput type="email" name="email" v-model="email" label="Email Address"
          label-class="auth-label" placeholder="name@company.com"
          prefix-icon="ph:envelope-simple" :rules="'required|email'" />

        <!-- Password -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <span class="auth-label">Password</span>
            <nuxt-link-locale to="/auth/reset-password"
              class="text-[10px] text-slate-500 hover:text-indigo-400 transition-colors">
              Forgot password?
            </nuxt-link-locale>
          </div>
          <LazyVInput type="password" name="password" v-model="password" label="" label-class="hidden"
            prefix-icon="ph:lock-simple" :rules="'required'" />
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="loading" class="auth-btn-primary">
          <LazyVLoadingSpinner v-if="loading" size="sm" color="text-white" text-color="text-white" text="Signing in..." icon-name="svg-spinners:ring-resize" />
          <template v-else>
            <Icon name="ph:sign-in" class="opacity-80" />
            <span>Sign In</span>
          </template>
        </button>
      </LazyVFormWrapper>

      <!-- Sign-up prompt -->
      <p class="text-center text-[12px] text-slate-500">
        {{ t('form.no_account') }}
        <nuxt-link-locale to="/auth/sign-up" class="auth-link">
          {{ t('btn.sign_up') }}
        </nuxt-link-locale>
      </p>

      <!-- Footer -->
      <div class="text-center space-y-3 pt-1">
        <div class="flex items-center justify-center gap-1.5 text-[9px] text-slate-600 tracking-widest">
          <Icon name="ph:shield-check-fill" />
          <span>Protected by Supabase Auth</span>
        </div>
        <div class="flex justify-center gap-5 text-[11px] text-slate-500">
          <nuxt-link-locale to="" class="hover:text-slate-300 transition-colors">Privacy Policy</nuxt-link-locale>
          <nuxt-link-locale to="" class="hover:text-slate-300 transition-colors">Terms of Service</nuxt-link-locale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const authStore = useAuthStore()
const { triggerToast } = useToast()
const { isLoading: loading, startLoading } = useLoading(3000)

const email = ref('')
const password = ref('')
const showError = ref(false)
const loginError = ref('')

const handleLogin = async () => {
  showError.value = false
  startLoading()
  const result = await authStore.login({ email: email.value, password: password.value })
  if (result.success) {
    triggerToast({ message: t('toast.login_successful'), type: 'success', icon: 'mdi-check-circle' })
    const userRole = authStore.currentUserRole
    if (userRole) {
      const { getAppUrlForRole } = await import('../../config/roleAppMapping')
      const targetAppUrl = getAppUrlForRole(userRole as any)
      if (window.location.origin !== targetAppUrl) {
        useTimeoutFn(() => { window.location.href = targetAppUrl }, 2000, { immediate: false }).start()
      } else {
        useTimeoutFn(() => { navigateTo('/') }, 2000, { immediate: false }).start()
      }
    } else {
      useTimeoutFn(() => { navigateTo('/') }, 2000, { immediate: false }).start()
    }
  } else {
    loading.value = false
    let msg = t('toast.failed_to_login')
    const err = result.error?.toLowerCase() ?? ''
    if (err.includes('deactivated')) {
      msg = t('toast.account_deactivated') || 'Your account has been deactivated.'
    } else if (err.includes('blocked')) {
      msg = t('toast.account_blocked') || 'Your account has been blocked.'
    } else if (err.includes('invalid') || err.includes('credentials') || err.includes('password')) {
      msg = t('toast.invalid_credentials')
    }
    loginError.value = msg
    showError.value = true
  }
}
</script>
