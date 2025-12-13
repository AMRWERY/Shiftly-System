<template>
  <div>
    <!-- Stepper -->
    <stepper :steps="steps" :currentStep="currentStep" @step-change="goToStep" class="mb-8" />

    <ClientOnly>
      <!-- step 1 -->
      <form class="grid col-span-1 sm:grid-cols-6 gap-x-6 gap-y-4" v-if="currentStep === 0" @submit.prevent="nextStep">
        <div class="sm:col-span-3">
          <dynamic-inputs :label="t('form.first_name')" :placeholder="t('form.enter_your_first_name')" type="text"
            :name="t('form.first_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.firstName" />
        </div>

        <div class="sm:col-span-3">
          <dynamic-inputs :label="t('form.middle_name')" :placeholder="t('form.enter_your_middle_name')" type="text"
            :name="t('form.last_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.middleName" />
        </div>

        <div class="sm:col-span-full">
          <dynamic-inputs :label="t('form.last_name')" :placeholder="t('form.enter_your_last_name')" type="text"
            :name="t('form.last_name')" :rules="'required|alpha_spaces'" :required="true" v-model="form.lastName" />
        </div>
        <div class="mt-7 sm:col-span-6 flex justify-end">
          <base-button :default-icon="false" :type="'button'" :block="true" :hover-color="'hover:bg-gray-800'"
            :text-color="'text-white'" :variant="'solid'" :padding-x="'px-4'" :padding-y="'py-2.5'"
            class="flex items-center justify-center rounded-lg border-2 transition-colors group" @click="nextStep">{{
              t("btn.next") }}</base-button>
        </div>
      </form>

      <!-- step 2 -->
      <form class="grid col-span-1 sm:grid-cols-6 gap-x-6 gap-y-4" v-else-if="currentStep === 1"
        @submit.prevent="nextStep">
        <div class="sm:col-span-full">
          <dynamic-inputs :label="t('form.email')" placeholder="example@test.com" type="email" :name="t('form.email')"
            :rules="'required|email'" :required="true" v-model="form.email" />
        </div>

        <div class="col-span-full">
          <dynamic-inputs :label="t('form.password')" placeholder="••••••••" type="password" :name="t('form.password')"
            :rules="'required|minLength:7'" :required="true" v-model="form.password" />
        </div>

        <div class="sm:col-span-full">
          <dynamic-inputs :label="t('form.role')" type="select" :options="rolesOptions" :name="t('form.role')"
            :rules="'required'" :required="true" :placeholder="t('form.select_role')" v-model="form.role" />
        </div>

        <div class="mt-7 sm:col-span-6 flex justify-end">
          <base-button :default-icon="false" :type="'button'" :block="true" :hover-color="'hover:bg-gray-800'"
            :text-color="'text-white'" :variant="'solid'" :padding-x="'px-4'" :padding-y="'py-2.5'"
            class="flex items-center justify-center rounded-lg border-2 transition-colors group" @click="nextStep">{{
              t("btn.next") }}</base-button>
        </div>
      </form>

      <!-- step 3: OTP Verification -->
      <form v-else-if="currentStep === 2" @submit.prevent="handleVerifyOtp" class="space-y-6">
        <div class="text-center mb-4">
          <p class="text-sm text-gray-600 mb-2">{{ t('form.otp_instruction') }}</p>
          <p class="text-xs text-gray-500">{{ t('form.check_email_for_code_or_link') }}</p>
        </div>
        
        <div class="flex flex-col space-y-16">
          <div class="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
            <input v-for="(digit, i) in 6" :key="i" ref="otpInputs" maxlength="1" type="text"
              class="w-16 h-16 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-2 ring-blue-700"
              @input="handleInput($event, i)" @keydown.backspace="handleBackspace($event, i)" />
          </div>
        </div>

        <div class="mt-7">
          <base-button :default-icon="false" :block="true" :type="'submit'" :no-border="true" :padding-x="'px-4'"
            :padding-y="'py-2.5'"
            class="flex items-center justify-center rounded-lg border-2 transition-colors group"
            :disabled="loading">
            <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
            <span v-else>{{ t('btn.verify_account') }}</span>
          </base-button>
        </div>

        <div class="flex items-center justify-center text-sm">
          <p>{{ t('form.didnt_recieve_code') }} <button type="button" @click="resendOtp"
              :disabled="resendCooldown > 0"
              class="text-gray-600 hover:underline font-semibold disabled:text-gray-400 disabled:cursor-not-allowed">
              {{ resendCooldown > 0 ? `${t('btn.resend')} (${resendCooldown}s)` : t('btn.resend') }}
            </button></p>
        </div>
      </form>

      <!-- step 4: Image Selection -->
      <form v-else-if="currentStep === 3" @submit.prevent="handleSignup" class="gap-y-4">
        <div class="flex flex-col items-center justify-center">
          <div v-if="imagePreviewUrl"
            class="rounded-full object-cover xl:w-[9rem] xl:h-[9rem] lg:w-[8rem] lg:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative">
            <img :src="imagePreviewUrl" class="object-cover w-full h-full rounded-full" />
            <button type="button" v-if="imagePreviewUrl" @click="removeImagePreview"
              class="absolute p-0.5 text-white bg-red-500 rounded-full -top-0 -end-0 hover:bg-red-600 flex items-center">
              <icon name="material-symbols:close-small-rounded"></icon>
            </button>
          </div>
          <div v-else
            class="p-4 border border-indigo-500 rounded-full shadow-md object-cover xl:w-[9rem] xl:h-[9rem] lg:w-[8rem] lg:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 bg-gray-50">
            <label for="profile-img" class="flex flex-col items-center justify-center h-full gap-2 cursor-pointer">
              <icon name="material-symbols:photo" class="text-indigo-600 w-12 h-12"></icon>
              <p class="font-medium text-center text-gray-600">
                {{ t("form.chose_your_img") }}
              </p>
            </label>
          </div>
          <input id="profile-img" type="file" class="hidden" accept="image/*" @change="onFileChange" />
        </div>

        <div class="mt-7">
          <base-button :default-icon="false" :block="true" :type="'submit'" :no-border="true" :padding-x="'px-4'"
            :padding-y="'py-2.5'" class="flex items-center justify-center rounded-lg border-2 transition-colors group"
            :disabled="loading">
            <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
            <span v-else>{{ t("btn.create_account_button") }}</span>
          </base-button>
        </div>
      </form>
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
let resendTimer: any = null;

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
  // Check initial email verification status
  checkEmailVerification();
  // Use the auth store's listener instead of creating a new one
  // This prevents duplicate cookie writes
  // The auth store already has a listener set up in initAuth()
  // Also check periodically when on step 2 (in case user verifies in another tab)
  verificationCheckInterval = setInterval(() => {
    if (currentStep.value === 1 && confirmationEmailSent.value) {
      checkEmailVerification();
    }
  }, 3000); // Check every 3 seconds

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
        if (resendTimer) clearInterval(resendTimer);
        resendTimer = setInterval(() => {
          resendCooldown.value--;
          if (resendCooldown.value <= 0) {
            clearInterval(resendTimer);
            resendTimer = null;
          }
        }, 1000);
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
    if (resendTimer) {
      clearInterval(resendTimer);
      resendTimer = null;
    }
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
    if (resendTimer) clearInterval(resendTimer);
    resendTimer = setInterval(() => {
      resendCooldown.value--;
      if (resendCooldown.value <= 0) {
        clearInterval(resendTimer);
        resendTimer = null;
      }
    }, 1000);
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
    setTimeout(() => {
      navigateTo("/");
    }, 3000);
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
  // Clean up verification check interval
  if (verificationCheckInterval) {
    clearInterval(verificationCheckInterval);
  }
  // Clean up resend timer
  if (resendTimer) {
    clearInterval(resendTimer);
  }
});
</script>