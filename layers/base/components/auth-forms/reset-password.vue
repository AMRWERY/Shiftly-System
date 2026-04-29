<template>
    <div class="space-y-6">

        <!-- Step 1: Email -->
        <LazyVFormWrapper v-if="currentStep === 0" @submit="nextStep" class="space-y-6">
            <!-- Icon + heading -->
            <div>
                <div
                    class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                    <Icon name="ph:envelope-simple" class="text-indigo-400 text-2xl" />
                </div>
                <h2 class="text-2xl font-bold text-white mb-1">{{ t('form.forgot_your_password_title') }}</h2>
                <p class="text-slate-500 text-sm">{{ t('form.forgot_your_password_desc') }}</p>
            </div>

            <!-- Email field -->
            <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-slate-500">
                    {{ t('form.email') }}
                </label>
                <div class="relative">
                    <input v-model="form.email" type="email" :name="t('form.email')"
                        placeholder="operator@nexus-erp.com"
                        class="w-full bg-[#13192a] border border-white/5 rounded-lg py-3 ps-4 pe-11 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm placeholder:text-slate-600 text-white" />
                    <div class="absolute inset-y-0 end-0 flex items-center pe-4 text-slate-500 pointer-events-none">
                        <Icon name="ph:at" />
                    </div>
                </div>
            </div>

            <!-- Submit -->
            <button type="submit" :disabled="loading" class="auth-btn-primary">
                <Icon v-if="loading" name="svg-spinners:ring-resize" />
                <template v-else>
                    {{ t('form.send_reset_link') }}
                    <Icon name="ph:arrow-right" class="opacity-80" />
                </template>
            </button>
        </LazyVFormWrapper>

        <!-- Step 2: OTP -->
        <LazyVFormWrapper v-else-if="currentStep === 1" @submit="handleSubmitOtp" class="space-y-6">
            <div>
                <div
                    class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                    <Icon name="ph:device-mobile" class="text-indigo-400 text-2xl" />
                </div>
                <h2 class="text-2xl font-bold text-white mb-1">{{ t('form.enter_otp') }}</h2>
                <p class="text-slate-500 text-sm">{{ t('form.otp_instruction') }}</p>
            </div>

            <div class="flex items-center justify-center gap-3">
                <input v-for="(digit, i) in 6" :key="i" ref="otpInputs" maxlength="1" type="text"
                    class="auth-otp-input w-11 h-11 text-base" @input="handleInput($event, i)"
                    @keydown.backspace="handleBackspace($event, i)" />
            </div>

            <button type="submit" :disabled="loading" class="auth-btn-primary">
                <Icon v-if="loading" name="svg-spinners:ring-resize" />
                <template v-else>
                    <Icon name="ph:check-circle" class="opacity-80" />
                    {{ t('btn.verify_account') }}
                </template>
            </button>

            <p class="text-center text-xs text-slate-500">
                {{ t('form.didnt_recieve_code') }}
                <button type="button" :disabled="resendCooldown > 0" @click="resendOtp" class="auth-resend-btn">
                    {{ resendCooldown > 0 ? `${t('btn.resend')} (${resendCooldown}s)` : t('btn.resend') }}
                </button>
            </p>
        </LazyVFormWrapper>

        <!-- Step 3: New Password -->
        <LazyVFormWrapper v-else-if="currentStep === 2" @submit="handleResetPassword" class="space-y-5">
            <div>
                <div
                    class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                    <Icon name="ph:lock-key" class="text-indigo-400 text-2xl" />
                </div>
                <h2 class="text-2xl font-bold text-white mb-1">{{ t('btn.reset_password') }}</h2>
                <p class="text-slate-500 text-sm">{{ t('form.forgot_your_password_desc') }}</p>
            </div>

            <LazyVInput :label="t('form.password')" placeholder="••••••••" type="password"
                :name="t('form.new_password')" :rules="'required|minLength:7'" :required="true"
                v-model="form.newPassword" prefix-icon="ph:lock-simple" label-class="auth-label" />

            <LazyVInput :label="t('form.confirm_password')" placeholder="••••••••" type="password"
                :name="t('form.confirm_password')" :rules="'required|confirmed:@new_password'" :required="true"
                v-model="form.confirmPassword" prefix-icon="ph:lock-simple" label-class="auth-label" />

            <button type="submit" :disabled="loading" class="auth-btn-primary">
                <Icon v-if="loading" name="svg-spinners:ring-resize" />
                <template v-else>
                    <Icon name="ph:lock-key-open" class="opacity-80" />
                    {{ t('btn.reset_password') }}
                </template>
            </button>
        </LazyVFormWrapper>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading: loading, startLoading } = useLoading(3000)
const steps = [t('stepper.email'), t('stepper.otp'), t('stepper.new_password')]
const currentStep = ref(0)
const resendCooldown = ref(0)
const { pause: stopResendTimer, resume: resumeResendTimer } = useIntervalFn(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
        stopResendTimer();
    }
}, 1000, { immediate: false });

const form = ref({
    email: "",
    newPassword: "",
    confirmPassword: "",
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
    const result = await authStore.sendPasswordResetOtp(form.value.email);
    if (result.success) {
        triggerToast({
            message: t('toast.otp_sent_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Start cooldown timer for resend
        resendCooldown.value = 60;
        resumeResendTimer();
        if (currentStep.value < steps.length - 1) currentStep.value++;
    } else {
        triggerToast({
            message: result.error || t('toast.failed_to_send_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
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
    // Verify OTP - this authenticates the user via passwordless login
    // After verification, user is signed in temporarily so we can update their password
    const result = await authStore.verifyOtp(form.value.email, otpValue);
    if (result.success) {
        triggerToast({
            message: t('toast.otp_verified_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Clear resend timer
        stopResendTimer();
        resendCooldown.value = 0;
        // Move to step 3 to set new password
        if (currentStep.value < steps.length - 1) {
            currentStep.value++;
        }
    } else {
        triggerToast({
            message: result.error || t('toast.invalid_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
}

const resendOtp = async () => {
    if (resendCooldown.value > 0) return;
    startLoading();
    const result = await authStore.sendPasswordResetOtp(form.value.email);
    if (result.success) {
        triggerToast({
            message: t('toast.otp_sent_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Start cooldown timer (60 seconds)
        resendCooldown.value = 60;
        resumeResendTimer();
    } else {
        triggerToast({
            message: result.error || t('toast.failed_to_send_otp'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    }
}

const handleResetPassword = async () => {
    if (!form.value.newPassword || !form.value.confirmPassword) {
        triggerToast({
            message: t('toast.please_fill_all_fields'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }
    if (form.value.newPassword !== form.value.confirmPassword) {
        triggerToast({
            message: t('toast.passwords_do_not_match'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }
    startLoading();
    // Update password using the authenticated session from OTP verification
    const result = await authStore.updatePassword(form.value.newPassword);
    if (result.success) {
        triggerToast({
            message: t('toast.password_reset_successfully'),
            type: 'success',
            icon: 'mdi-check-circle',
        });
        // Sign out and redirect to login
        await authStore.logout();
        const { start: startRedirectTimer } = useTimeoutFn(() => {
            navigateTo('/auth');
        }, 2000, { immediate: false });
        startRedirectTimer();
    } else {
        triggerToast({
            message: result.error || t('toast.failed_to_reset_password'),
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