<template>
    <div>
        <!-- Stepper -->
        <stepper :steps="steps" :currentStep="currentStep" @step-change="goToStep" class="mb-8" />

        <!-- Step 1 -->
        <form v-if="currentStep === 0" @submit.prevent="nextStep" class="space-y-6">
            <div>
                <dynamic-inputs :label="t('form.email')" placeholder="test@example.com" type="email"
                    :name="t('form.email')" :rules="'required|email'" :required="true" />
            </div>
            <div class="mt-7 sm:col-span-6 flex justify-end">
                <base-button :default-icon="false" :type="'button'" :block="true" :hover-color="'hover:bg-gray-800'"
                    :text-color="'text-white'" :variant="'solid'" :padding-x="'px-4'" :padding-y="'py-2.5'"
                    class="flex items-center justify-center rounded-lg border-2 transition-colors group"
                    @click="nextStep">{{ t('btn.next')
                    }}</base-button>
            </div>
        </form>

        <!-- Step 2 -->
        <form v-else-if="currentStep === 1" @submit.prevent="handleSubmitOtp" class="space-y-6">
            <div class="flex flex-col space-y-16">
                <div class="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
                    <input v-for="(digit, i) in 6" :key="i" ref="otpInputs" maxlength="1" type="text"
                        class="w-16 h-16 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-2 ring-blue-700"
                        @input="handleInput($event, i)" @keydown.backspace="handleBackspace($event, i)" />
                </div>
            </div>

            <div class="mt-7">
                <base-button :default-icon="false" :block="true" :type="'submit'" :no-border="true" :padding-x="'px-4'" :padding-y="'py-2.5'"
                    class="flex items-center justify-center rounded-lg border-2 transition-colors group"
                    :disabled="loading" @click="handleSubmitOtp">
                    <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
                    <span v-else>{{ t('btn.verify_account') }}</span>
                </base-button>
            </div>

            <div class="flex items-center justify-center text-sm">
                <p>{{ t('form.didnt_recieve_code') }} <nuxt-link to="" type="button"
                        class="text-gray-600 hover:underline font-semibold"> {{ t('btn.resend') }}</nuxt-link></p>
            </div>

            <div class="flex items-center justify-center text-sm">
                <nuxt-link-locale to="/auth" class="text-gray-600 hover:underline">{{ t('form.back_to_login')
                }}</nuxt-link-locale>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading: loading, startLoading } = useLoading(3000)
const steps = [t('stepper.email'), t('stepper.otp')]
const currentStep = ref(0)

const form = ref({
    email: "",
})

const nextStep = async () => {
    if (!form.value.email) {
        triggerToast({
            message: t('toast.please_fill_all_fields'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }

    startLoading();
    
    // Send OTP to email
    const result = await authStore.sendPasswordResetOtp(form.value.email);
    
    if (result.success) {
        triggerToast({
            message: t('toast.otp_sent_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        if (currentStep.value < steps.length - 1) currentStep.value++;
    } else {
        triggerToast({
            message: result.error || t('toast.failed_to_send_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
}

const goToStep = (index: number) => {
    currentStep.value = index
}

const handleSubmitOtp = async () => {
    // Collect OTP from inputs
    const otpValue = otpInputs.value.map(input => input?.value || '').join('');
    
    if (otpValue.length !== 6) {
        triggerToast({
            message: t('toast.please_enter_valid_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }

    startLoading();
    
    // Verify OTP
    const result = await authStore.verifyOtp(form.value.email, otpValue);
    
    if (result.success) {
        triggerToast({
            message: t('toast.otp_verified_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        setTimeout(() => {
            navigateTo('/auth');
        }, 2000);
    } else {
        triggerToast({
            message: result.error || t('toast.invalid_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
}

const otpInputs = ref<HTMLInputElement[]>([]);

const handleInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement;
    if (input.value.length > 1) input.value = input.value.slice(0, 1); // only 1 char

    if (input.value && index < otpInputs.value.length - 1) {
        nextTick(() => otpInputs.value[index + 1]?.focus());
    }
};

const handleBackspace = (e: KeyboardEvent, index: number) => {
    const input = e.target as HTMLInputElement;
    if (!input.value && index > 0) {
        nextTick(() => otpInputs.value[index - 1]?.focus());
    }
};
</script>