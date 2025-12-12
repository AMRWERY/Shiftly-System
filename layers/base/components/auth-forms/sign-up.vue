<template>
  <div>
    <!-- Stepper -->
    <stepper
      :steps="steps"
      :currentStep="currentStep"
      @step-change="goToStep"
      class="mb-8"
    />

    <div class="space-y-4">
      <ClientOnly>
        <!-- step 1 -->
        <form
          class="grid col-span-1 sm:grid-cols-6 gap-x-6 space-y-2"
          v-if="currentStep === 0"
          @submit.prevent="nextStep"
        >
          <div class="sm:col-span-3">
            <dynamic-inputs
              :label="t('form.first_name')"
              :placeholder="t('form.enter_your_first_name')"
              type="text"
              :name="t('form.first_name')"
              :rules="'required|alpha_spaces'"
              :required="true"
              v-model="form.firstName"
            />
          </div>

          <div class="sm:col-span-3">
            <dynamic-inputs
              :label="t('form.middle_name')"
              :placeholder="t('form.enter_your_middle_name')"
              type="text"
              :name="t('form.last_name')"
              :rules="'required|alpha_spaces'"
              :required="true"
              v-model="form.middleName"
            />
          </div>

          <div class="sm:col-span-full">
            <dynamic-inputs
              :label="t('form.last_name')"
              :placeholder="t('form.enter_your_last_name')"
              type="text"
              :name="t('form.last_name')"
              :rules="'required|alpha_spaces'"
              :required="true"
              v-model="form.lastName"
            />
          </div>
          <div class="mt-7 sm:col-span-6 flex justify-end">
            <base-button
              :default-icon="false"
              :type="'button'"
              :block="true"
              :hover-color="'hover:bg-gray-800'"
              :text-color="'text-white'"
              :variant="'solid'"
              :padding-x="'px-4'"
              :padding-y="'py-2.5'"
              class="flex items-center justify-center rounded-lg border-2 transition-colors group"
              @click="nextStep"
              >{{ t("btn.next") }}</base-button
            >
          </div>
        </form>

        <!-- step 2 -->
        <form
          class="grid col-span-1 sm:grid-cols-6 gap-x-6 space-y-2"
          v-else-if="currentStep === 1"
          @submit.prevent="nextStep"
        >
          <div class="sm:col-span-full">
            <dynamic-inputs
              :label="t('form.email')"
              placeholder="example@test.com"
              type="email"
              :name="t('form.email')"
              :rules="'required|email'"
              :required="true"
              v-model="form.email"
            />
          </div>

          <div class="col-span-full">
            <dynamic-inputs
              :label="t('form.password')"
              placeholder="••••••••"
              type="password"
              :name="t('form.password')"
              :rules="'required|minLength:7'"
              :required="true"
              v-model="form.password"
            />
          </div>

          <div class="sm:col-span-full">
            <dynamic-inputs
              :label="t('form.role')"
              type="select"
              :options="rolesOptions"
              :name="t('form.role')"
              :rules="'required'"
              :required="true"
              :placeholder="t('form.select_role')"
              v-model="form.role"
            />
          </div>

          <div class="mt-7 sm:col-span-6 flex justify-end">
            <base-button
              :default-icon="false"
              :type="'button'"
              :block="true"
              :hover-color="'hover:bg-gray-800'"
              :text-color="'text-white'"
              :variant="'solid'"
              :padding-x="'px-4'"
              :padding-y="'py-2.5'"
              class="flex items-center justify-center rounded-lg border-2 transition-colors group"
              @click="nextStep"
              >{{ t("btn.next") }}</base-button
            >
          </div>
        </form>

        <!-- step 3 -->
        <form
          v-else-if="currentStep === 2"
          @submit.prevent="handleSignup"
          class="space-y-6"
        >
          <div class="flex flex-col items-center justify-center">
            <div
              v-if="imagePreviewUrl"
              class="rounded-full object-cover xl:w-[9rem] xl:h-[9rem] lg:w-[8rem] lg:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative"
            >
              <img
                :src="imagePreviewUrl"
                class="object-cover w-full h-full rounded-full"
              />
              <button
                type="button"
                v-if="imagePreviewUrl"
                @click="removeImagePreview"
                class="absolute p-0.5 text-white bg-red-500 rounded-full -top-0 -end-0 hover:bg-red-600 flex items-center"
              >
                <icon name="material-symbols:close-small-rounded"></icon>
              </button>
            </div>
            <div
              v-else
              class="p-4 border border-indigo-500 rounded-full shadow-md object-cover xl:w-[9rem] xl:h-[9rem] lg:w-[8rem] lg:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 bg-gray-50"
            >
              <label
                for="profile-img"
                class="flex flex-col items-center justify-center h-full gap-2 cursor-pointer"
              >
                <icon
                  name="material-symbols:photo"
                  class="text-indigo-600 w-12 h-12"
                ></icon>
                <p class="font-medium text-center text-gray-600">
                  {{ t("form.chose_your_img") }}
                </p>
              </label>
            </div>
            <input
              id="profile-img"
              type="file"
              class="hidden"
              accept="image/*"
              @change="onFileChange"
            />
          </div>

          <div class="mt-7">
            <base-button
              :default-icon="false"
              :block="true"
              :type="'submit'"
              :no-border="true"
              :padding-x="'px-4'"
              :padding-y="'py-2.5'"
              class="flex items-center justify-center rounded-lg border-2 transition-colors group"
              :disabled="loading"
            >
              <icon name="svg-spinners:270-ring-with-bg" v-if="loading" />
              <span v-else>{{ t("btn.create_account_button") }}</span>
            </base-button>
          </div>
        </form>
      </ClientOnly>
    </div>
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
  t("stepper.choose_image"),
];
const currentStep = ref(0);

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
    
    // When clicking Next on step 2 (email & password), send confirmation email
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

      // Send confirmation email if not already sent
      if (!confirmationEmailSent.value) {
        startLoading();
        const result = await authStore.sendConfirmationEmail(
          form.value.email,
          form.value.password
        );

        if (result.success) {
          confirmationEmailSent.value = true;
          triggerToast({
            message: t("toast.confirmation_email_sent"),
            type: "success",
            icon: "material-symbols:mail-outline",
          });
        } else {
          triggerToast({
            message: result.error || t("toast.failed_to_send_confirmation_email"),
            type: "error",
            icon: "material-symbols:error-outline-rounded",
          });
          return; // Don't proceed if email sending failed
        }
      }

      // Check if email is verified before allowing to proceed
      if (!isEmailVerified.value) {
        triggerToast({
          message: t("toast.must_confirm_email_first"),
          type: "warning",
          icon: "material-symbols:warning-outline",
        });
        return; // Prevent moving to next step
      }
    }
    
    currentStep.value++;
  }
};

const goToStep = (index: number) => {
  // Disable manual step navigation - users must use Next buttons
  return;
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
      message: result.error || t("toast.failed_to_register_new_account"),
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
});
</script>