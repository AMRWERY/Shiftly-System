<template>
  <div>
    <!-- Stepper -->
    <LazyVStepper :steps="steps" :currentStep="currentStep" @step-change="goToStep" class="mb-8" />

    <ClientOnly>
      <!-- step 1: Name -->
      <LazyVFormWrapper class="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-5" v-if="currentStep === 0"
        @submit="nextStep">
        <div class="sm:col-span-3">
          <LazyVInput :label="t('form.first_name')" :placeholder="t('form.enter_your_first_name')" type="text"
            :name="t('form.first_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.firstName"
            prefix-icon="ph:user" label-class="auth-label" />
        </div>

        <div class="sm:col-span-3">
          <LazyVInput :label="t('form.middle_name')" :placeholder="t('form.enter_your_middle_name')" type="text"
            :name="t('form.middle_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.middleName"
            prefix-icon="ph:user" label-class="auth-label" />
        </div>

        <div class="sm:col-span-full">
          <LazyVInput :label="t('form.last_name')" :placeholder="t('form.enter_your_last_name')" type="text"
            :name="t('form.last_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.lastName"
            prefix-icon="ph:user" label-class="auth-label" />
        </div>

        <div class="sm:col-span-full">
          <button type="submit" class="auth-btn-primary">
            {{ t('btn.next') }}
          </button>
        </div>
      </LazyVFormWrapper>

      <!-- step 2: Credentials -->
      <LazyVFormWrapper class="space-y-5" v-else-if="currentStep === 1" @submit="nextStep">
        <LazyVInput :label="t('form.email')" placeholder="name@company.com" type="email" :name="t('form.email')"
          :rules="'required|email'" :required="true" v-model="form.email" prefix-icon="ph:envelope-simple"
          label-class="auth-label" />

        <LazyVInput :label="t('form.password')" placeholder="••••••••" type="password" :name="t('form.password')"
          :rules="'required|minLength:7'" :required="true" v-model="form.password" prefix-icon="ph:lock-simple"
          label-class="auth-label" />

        <LazyVInput :label="t('form.role')" type="select" :options="rolesOptions" :name="t('form.role')"
          :rules="'required'" :required="true" :placeholder="t('form.select_role')" v-model="form.role"
          prefix-icon="ph:identification-badge" label-class="auth-label" />

        <button type="submit" class="auth-btn-primary">
          {{ t('btn.next') }}
        </button>
      </LazyVFormWrapper>

      <!-- step 3: OTP Verification -->
      <LazyVFormWrapper v-else-if="currentStep === 2" @submit="handleVerifyOtp" class="space-y-8">
        <div class="text-center">
          <p class="text-sm text-gray-300 mb-1">{{ t('form.otp_instruction') }}</p>
          <p class="text-xs text-slate-500">{{ t('form.check_email_for_code_or_link') }}</p>
        </div>

        <div class="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
          <input v-for="(digit, i) in 6" :key="i" ref="otpInputs" maxlength="1" type="text"
            class="auth-otp-input w-12 h-12 text-lg" @input="handleInput($event, i)"
            @keydown.backspace="handleBackspace($event, i)" />
        </div>

        <button type="submit" :disabled="loading" class="auth-btn-primary">
          <LazyVLoadingSpinner v-if="loading" size="sm" color="text-white" text-color="text-white" :text="t('btn.verifying')" />
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

      <!-- step 4: Profile Image -->
      <LazyVFormWrapper v-else-if="currentStep === 3" @submit="handleSignup" class="space-y-8">
        <div class="flex flex-col items-center justify-center gap-4">
          <div v-if="imagePreviewUrl"
            class="relative rounded-full overflow-hidden w-32 h-32 outline outline-2 outline-offset-2 outline-indigo-500 shadow-xl">
            <img :src="imagePreviewUrl" class="object-cover w-full h-full" />
            <button type="button" @click="removeImagePreview"
              class="absolute top-1 end-1 bg-red-500 hover:bg-red-600 rounded-full p-0.5 text-white transition-colors">
              <Icon name="ph:x-bold" class="w-3 h-3" />
            </button>
          </div>

          <label v-else for="profile-img"
            class="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-white/10 hover:border-indigo-500/50 bg-[#13192a] cursor-pointer transition-all gap-2">
            <Icon name="ph:camera-plus" class="text-indigo-400 w-8 h-8" />
            <span class="text-[10px] font-bold tracking-widest text-slate-500 text-center px-2">
              {{ t('form.chose_your_img') }}
            </span>
          </label>

          <input id="profile-img" type="file" class="hidden" accept="image/*" @change="onFileChange" />
        </div>

        <button type="submit" :disabled="loading" class="auth-btn-primary">
          <LazyVLoadingSpinner v-if="loading" size="sm" color="text-white" text-color="text-white"
            :text="t('btn.creating_account')" />
          <template v-else>
            {{ t('btn.create_account_button') }}
          </template>
        </button>
      </LazyVFormWrapper>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { UserAuth } from "../../types/auth";

const { t } = useI18n();
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading: loading, startLoading } = useLoading(3000);
const steps = [
  t("stepper.name"),
  t("stepper.email_password"),
  t("stepper.otp"),
  t("stepper.choose_image"),
];
const currentStep = ref(0);
const resendCooldown = ref(0);
const { pause: stopResendTimer, resume: resumeResendTimer } = useIntervalFn(() => {
  resendCooldown.value--;
  if (resendCooldown.value <= 0) {
    stopResendTimer();
  }
}, 1000, { immediate: false });

const form = ref<UserAuth>({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  imageFile: null,
  role: null,
});

// Track email verification status
const isEmailVerified = ref(false);
const confirmationEmailSent = ref(false);
const otpInputs = ref<HTMLInputElement[]>([]);

const rolesOptions = computed(() => [
  { value: "admin", label: t("roles.admin") },
  { value: "manager", label: t("roles.manager") },
  { value: "accountant", label: t("roles.accountant") },
  { value: "hr", label: t("roles.hr") },
  { value: "employee", label: t("roles.employee") },
  { value: "inventory_manager", label: t("roles.inventory_manager") },
  { value: "maintenance_technician", label: t("roles.maintenance_technician") },
  { value: "system_auditor", label: t("roles.system_auditor") },
  { value: "td_officer", label: t("roles.td_officer") },
]);

// Set up auth state listener to detect email verification
const supabase = useSupabaseClient();
let verificationCheckInterval: any = null;
const { pause: stopVerificationCheck, resume: resumeVerificationCheck } = useIntervalFn(() => {
  if (currentStep.value === 1 && confirmationEmailSent.value) {
    checkEmailVerification();
  }
}, 3000, { immediate: false });

// Check email verification status
const checkEmailVerification = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email === form.value.email && user.email_confirmed_at) {
      isEmailVerified.value = true;
    }
  } catch (error) {
    console.error('Error checking email verification:', error);
  }
};

onMounted(() => {
  resumeVerificationCheck();

  // Watch auth store user changes to detect email verification
  watch(() => authStore.user, (user) => {
    if (user && user.email === form.value.email && user.email_confirmed_at && !isEmailVerified.value) {
      isEmailVerified.value = true;
      triggerToast({
        message: t("toast.email_verified_successfully"),
        type: "success",
        icon: "mdi-check-circle",
      });
    }
  });
});

const nextStep = async () => {
  if (currentStep.value < steps.length - 1) {
    // When moving from step 1 to step 2, just advance
    if (currentStep.value === 0) {
      currentStep.value++;
      return;
    }
    // When clicking Next on step 2 (email & password), send OTP
    if (currentStep.value === 1) {
      // Validate required fields
      if (!form.value.email || !form.value.password || !form.value.role) {
        triggerToast({
          message: t("toast.please_fill_all_fields"),
          type: "error",
          icon: "material-symbols:error-outline-rounded",
        });
        return;
      }
      // Send OTP to email for sign-up verification
      startLoading();
      const result = await authStore.sendSignUpOtp(form.value.email);
      if (result.success) {
        triggerToast({
          message: t("toast.otp_sent_successfully"),
          type: "success",
          icon: "mdi-check-circle",
        });
        // Start cooldown timer for resend
        resendCooldown.value = 60;
        resumeResendTimer();
        currentStep.value++;
      } else {
        triggerToast({
          message: result.error || t("toast.failed_to_send_otp"),
          type: "error",
          icon: "material-symbols:error-outline-rounded",
        });
        return; // Don't proceed if OTP sending failed
      }
    }
  }
};

const goToStep = (index: number) => {
  // Disable manual step navigation - users must use Next buttons
  return;
};

const handleVerifyOtp = async () => {
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
    // Mark email as verified
    isEmailVerified.value = true;
    // Move to next step (image selection)
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
};

const resendOtp = async () => {
  if (resendCooldown.value > 0) return;
  startLoading();
  const result = await authStore.sendSignUpOtp(form.value.email);
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
};

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

const imagePreviewUrl = ref<string | null>(null);

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    // Validate file size (max 3MB)
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxSize) {
      triggerToast({
        message: t("toast.image_size_too_large"),
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      target.value = ""; // Reset input
      return;
    }
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      triggerToast({
        message: t("toast.invalid_image_type"),
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
      target.value = ""; // Reset input
      return;
    }
    form.value.imageFile = file;
    imagePreviewUrl.value = URL.createObjectURL(file); // ✅ show preview
  }
};

const removeImagePreview = () => {
  form.value.imageFile = null;
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value); // ✅ cleanup memory
  }
  imagePreviewUrl.value = null;
};

const handleSignup = async () => {
  if (
    !form.value.email ||
    !form.value.password ||
    !form.value.firstName ||
    !form.value.middleName ||
    !form.value.lastName ||
    !form.value.role
  ) {
    triggerToast({
      message: t("toast.please_fill_all_fields"),
      type: "error",
      icon: "material-symbols:error-outline-rounded",
    });
    return;
  }

  // Check if user is already authenticated via OTP
  if (!authStore.isAuthenticated || !isEmailVerified.value) {
    triggerToast({
      message: t("toast.must_verify_email_first"),
      type: "error",
      icon: "material-symbols:error-outline-rounded",
    });
    return;
  }

  startLoading();
  const result = await authStore.signup({
    email: form.value.email,
    password: form.value.password,
    firstName: form.value.firstName,
    middleName: form.value.middleName,
    lastName: form.value.lastName,
    role: form.value.role,
    imageFile: form.value.imageFile,
  });
  if (result.success) {
    triggerToast({
      message: t("toast.new_account_registration_successful"),
      type: "success",
      icon: "mdi-check-circle",
    });
    const { start: startFinalNavigateTimer } = useTimeoutFn(() => {
      navigateTo("/");
    }, 3000, { immediate: false });
    startFinalNavigateTimer();
  } else {
    triggerToast({
      message: t("toast.failed_to_register_new_account"),
      type: "error",
      icon: "material-symbols:error-outline-rounded",
    });
  }
};

// Cleanup on unmount
onUnmounted(() => {
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
});
</script>