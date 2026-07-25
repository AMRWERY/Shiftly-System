<template>
  <div>
    <div class="w-full text-slate-200 space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-tx-primary">{{ t('form.welcome_back') }}</h2>
        <p class="text-tx-secondary mt-1 text-sm">{{ t('form.sign_in_to_workspace') }}</p>
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
        <LazyVInput type="email" name="email" v-model="email" :label="t('form.email')" label-class="auth-label"
          placeholder="name@company.com" prefix-icon="ph:envelope-simple" :rules="'required|email'" />

        <!-- Password -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <span class="auth-label">{{ t('form.password') }}</span>
            <nuxt-link-locale to="/auth/reset-password"
              class="text-[10px] text-slate-500 hover:text-indigo-400 transition-colors">
              {{ t('form.forgot_your_password') }}
            </nuxt-link-locale>
          </div>
          <LazyVInput type="password" name="password" v-model="password" label="" label-class="hidden"
            prefix-icon="ph:lock-simple" :rules="'required'" />
        </div>

        <!-- Slide to Login Lock Button -->
        <div class="relative w-full select-none pt-2">
          <div ref="containerRef"
            class="relative h-14 w-full rounded-xl bg-bg-elevated border border-[var(--border-default)] overflow-hidden flex items-center p-1 transition-colors"
            @mousedown="startDrag" @touchstart="startDrag">
            <!-- Progress Fill -->
            <div
              class="absolute start-0 top-0 bottom-0 bg-gradient-to-r from-indigo-600/20 via-indigo-600/40 to-indigo-600 rounded-xl"
              :class="{ 'transition-all duration-300': !isDragging }" :style="{ width: `${dragPercentage}%` }" />

            <!-- Text Label in background -->
            <div
              class="absolute inset-0 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-tx-secondary pointer-events-none transition-opacity duration-200"
              :style="{ opacity: Math.max(0, 1 - dragPercentage / 50) }">
              <span>{{ t('btn.slide_to_login') }}</span>
              <Icon name="ph:caret-double-right-bold" class="w-4 h-4 text-indigo-400 animate-pulse" />
            </div>

            <!-- Draggable Lock Handle -->
            <div
              class="relative h-12 w-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg transition-transform"
              :class="{ 'transition-all duration-300': !isDragging, 'cursor-grab active:cursor-grabbing': !loading }"
              :style="{ transform: `translateX(${translateX}px)` }">
              <LazyVLoadingSpinner v-if="loading" size="sm" color="text-white" text-color="text-white" />
              <Icon v-else-if="isUnlocked || dragPercentage >= 85" name="ph:lock-key-open-fill"
                class="w-6 h-6 text-white" />
              <Icon v-else name="ph:lock-key-fill" class="w-6 h-6 text-white transition-transform duration-200"
                :class="{ 'scale-110': isDragging }" />
            </div>
          </div>

          <!-- Hidden Submit Button for Form Validation -->
          <button ref="submitBtnRef" type="submit" class="hidden" />
        </div>
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
          <span>{{ t('form.protected_by_supabase') }}</span>
        </div>
        <div class="flex justify-center gap-5 text-[11px] text-slate-500">
          <nuxt-link-locale to="/privacy-policy" class="hover:text-slate-300 transition-colors">{{
            t('meta.privacy_policy')
          }}</nuxt-link-locale>
          <nuxt-link-locale to="/terms-of-service" class="hover:text-slate-300 transition-colors">{{
            t('meta.terms_of_service') }}</nuxt-link-locale>
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

const containerRef = ref<HTMLElement | null>(null)
const submitBtnRef = ref<HTMLButtonElement | null>(null)
const isDragging = ref(false)
const dragPercentage = ref(0)
const isUnlocked = ref(false)

const handleWidth = 48

const translateX = computed(() => {
  if (!containerRef.value) return 0
  const maxDrag = containerRef.value.clientWidth - handleWidth - 8
  return (dragPercentage.value / 100) * maxDrag
})

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (loading.value) return
  isDragging.value = true
  updateDragPosition(e)
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragMove, { passive: false })
  window.addEventListener('touchend', onDragEnd)
}

const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  if (e.type === 'touchmove') e.preventDefault()
  updateDragPosition(e)
}

const updateDragPosition = (e: MouseEvent | TouchEvent) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  const maxDrag = rect.width - handleWidth - 8
  const relativeX = clientX - rect.left - handleWidth / 2 - 4
  const clampedX = Math.max(0, Math.min(relativeX, maxDrag))

  dragPercentage.value = (clampedX / maxDrag) * 100
}

const onDragEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onDragMove)
  window.removeEventListener('touchend', onDragEnd)
  if (dragPercentage.value >= 85) {
    dragPercentage.value = 100
    isUnlocked.value = true
    nextTick(() => {
      submitBtnRef.value?.click()
    })
  } else {
    resetSlider()
  }
}

const resetSlider = () => {
  dragPercentage.value = 0
  isUnlocked.value = false
}

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
    resetSlider()
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