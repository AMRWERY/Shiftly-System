<template>
    <div>
        <ClientOnly>
            <form @submit.prevent="handleLogin" class="grid col-span-1 sm:grid-cols-6 gap-x-6 gap-y-4">
                <div class="col-span-full">
                    <dynamic-inputs :label="t('form.email')" placeholder="example@test.com" type="email"
                        :name="t('form.email')" :rules="'required|email'" :required="true" v-model="email" />
                </div>

                <div class="col-span-full">
                    <dynamic-inputs :label="t('form.password')" placeholder="••••••••" type="password"
                        :name="t('form.password')" :rules="'required'" :required="true" v-model="password" />
                </div>

                <div class="col-span-full flex flex-wrap items-center justify-between gap-4">
                    <div class="text-sm ms-auto">
                        <nuxt-link-locale to="/auth/reset-password"
                            class="text-blue-600 hover:text-blue-500 font-medium">
                            {{ t('form.forgot_your_password') }}
                        </nuxt-link-locale>
                    </div>
                </div>

                <div class="col-span-full">
                    <base-button :block="true" :type="'submit'" :no-border="true"
                        :padding-x="'px-4'" :padding-y="'py-2.5'"
                        class="flex items-center justify-center rounded-lg border-2 transition-colors group"
                        :disabled="loading">
                        <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
                        <span v-else>{{ t('btn.log_in') }}</span>
                    </base-button>
                </div>
            </form>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading: loading, startLoading } = useLoading(3000)

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    if (!email.value || !password.value) {
        triggerToast({
            message: t('toast.please_fill_all_fields'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }
    startLoading()
    const result = await authStore.login({ email: email.value, password: password.value });
    if (result.success) {
        triggerToast({
            message: t('toast.login_successful'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Navigate based on user role (all roles use same app with different layouts)
        setTimeout(() => {
            navigateTo('/');
        }, 3000);
    } else {
        triggerToast({
            message: result.error || t('toast.failed_to_login'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
};
</script>