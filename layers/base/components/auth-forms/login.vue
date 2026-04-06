<template>
    <div>
        <Form @submit="handleLogin" v-slot="{ meta }">
            <div class="grid col-span-1 sm:grid-cols-6 gap-x-6 gap-y-4">
                <div class="col-span-full">
                    <VInput :label="t('form.email')" placeholder="example@test.com" type="email" name="email"
                        :rules="'required|email'" :required="true" v-model="email" />
                </div>

                <div class="col-span-full">
                    <VInput :label="t('form.password')" placeholder="••••••••" type="password" name="password"
                        :rules="'required'" :required="true" v-model="password" />
                </div>

                <div class="col-span-full flex flex-wrap items-center justify-between gap-4">
                    <div class="text-sm ms-auto">
                        <nuxt-link-locale to="/auth/reset-password"
                            class="text-indigo-400 hover:text-indigo-300 font-medium">
                            {{ t('form.forgot_your_password') }}
                        </nuxt-link-locale>
                    </div>
                </div>

                <div class="col-span-full">
                    <VButton :block="true" :type="'submit'" :no-border="true" :padding-x="'px-4'"
                        :padding-y="'py-2.5'"
                        class="flex items-center justify-center rounded-lg border-2 transition-colors group"
                        :disabled="loading || !meta.valid">
                        <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
                        <span v-else>{{ t('btn.log_in') }}</span>
                    </VButton>
                </div>
            </div>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'

const { t } = useI18n()
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading: loading, startLoading } = useLoading(3000)

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    startLoading()
    const result = await authStore.login({ email: email.value, password: password.value });
    if (result.success) {
        triggerToast({
            message: t('toast.login_successful'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Get user role and redirect to appropriate app
        const userRole = authStore.currentUserRole;
        if (userRole) {
            const { getAppUrlForRole } = await import('../../config/roleAppMapping');
            const targetAppUrl = getAppUrlForRole(userRole as any);
            const currentUrl = window.location.origin;
            // If user is in the wrong app, redirect to their role-specific app
            if (currentUrl !== targetAppUrl) {
                const { start: startRedirectTimer } = useTimeoutFn(() => {
                    window.location.href = targetAppUrl;
                }, 2000, { immediate: false });
                startRedirectTimer();
            } else {
                // User is already in the correct app, just navigate to home
                const { start: startNavigateTimer } = useTimeoutFn(() => {
                    navigateTo('/');
                }, 2000, { immediate: false });
                startNavigateTimer();
            }
        } else {
            // Fallback to home if role is not found
            const { start: startFallbackTimer } = useTimeoutFn(() => {
                navigateTo('/');
            }, 2000, { immediate: false });
            startFallbackTimer();
        }
    } else {
        // Stop loading on error to show toast properly
        loading.value = false;
        // Show specific error messages for different error types
        let errorMessage = t('toast.failed_to_login');
        if (result.error?.toLowerCase().includes('deactivated')) {
            errorMessage = t('toast.account_deactivated') || 'Your account has been deactivated.';
        } else if (result.error?.toLowerCase().includes('blocked')) {
            errorMessage = t('toast.account_blocked') || 'Your account has been blocked.';
        } else if (result.error?.toLowerCase().includes('invalid') ||
            result.error?.toLowerCase().includes('credentials') ||
            result.error?.toLowerCase().includes('password')) {
            errorMessage = t('toast.invalid_credentials');
        }
        triggerToast({
            message: errorMessage,
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
            duration: 5000, // Show error toast for 5 seconds
        });
    }
}
</script>