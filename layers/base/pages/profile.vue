<template>
    <div>
        <section class="w-full">
            <div class="flex flex-col">
                <!-- Cover Image -->
                <img src="/img/profile-bg.jpg" alt="profile-bg"
                    class="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]" />

                <!-- Profile Image -->
                <div class="sm:w-[80%] w-[90%] mx-auto flex">
                    <div class="relative cursor-pointer group" @click="handleImageClick">
                        <img :src="authStore.currentUser?.user_metadata?.avatarUrl || '/img/dummy-profile-img.jpg'"
                            alt="User Profile"
                            class="object-cover rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem] transition-opacity group-hover:opacity-80" />

                        <!-- Hover Overlay Icon -->
                        <div
                            class="absolute inset-0 flex items-center justify-center lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem] opacity-0 group-hover:opacity-100 transition-opacity">
                            <icon name="heroicons:camera" class="w-8 h-8 text-white drop-shadow-lg" />
                        </div>

                        <input type="file" ref="fileInput" class="hidden"
                            accept="image/jpeg,image/png,image/webp,image/gif" @change="handleImageUpload" />
                    </div>

                    <!-- Name and Role Wrapper -->
                    <div class="flex justify-between items-start my-4 sm:mx-4 ps-4 w-full">
                        <div class="flex flex-col justify-center">
                            <!-- FullName -->
                            <h1 class="text-start text-gray-800 lg:text-4xl md:text-3xl sm:text-3xl text-xl font-bold">
                                {{ authStore.currentUser?.user_metadata?.fullName }}
                            </h1>
                            <!-- Role -->
                            <div class="flex items-center gap-3 mt-2">
                                <p class="text-start text-gray-600 text-lg font-medium capitalize">
                                    {{ authStore.currentUserRole }}
                                </p>
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <p class="text-lg font-medium capitalize cursor-pointer" :class="{
                                    'text-green-600': formData.status === 'active',
                                    'text-yellow-600': formData.status === 'pending'
                                }">
                                    <span class="py-1 px-2 rounded-full" :class="{
                                        'bg-green-200': formData.status === 'active',
                                        'bg-yellow-200': formData.status === 'pending'
                                    }">
                                        {{ formData.status }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-6 items-center relative lg:-top-8 md:-top-6 -top-4">
                    <!-- Personal Information Section -->
                    <div class="w-full max-w-3xl mx-auto space-y-6 bg-white rounded-lg shadow-md p-6">
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-gray-800 mb-7">Personal Information</h2>
                            <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.firstName" type="text" name="First Name"
                                        label="First Name" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.middleName" type="text" name="Middle Name"
                                        label="Middle Name" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.lastName" type="text" name="Last Name"
                                        label="Last Name" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.email" type="email" name="Email" label="Email" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.phoneNumber" type="tel" name="Phone Number"
                                        label="Phone Number" placeholder="+1234567890" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.employeeId" type="text" name="Employee ID"
                                        label="Employee ID" :readonly="true" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.baseSalary" type="text" name="Base Salary"
                                        label="Base Salary" />
                                </div>

                                <div class="sm:col-span-3">
                                    <dynamic-inputs v-model="formData.createdAt" type="text" name="Created At"
                                        label="Created At" :readonly="true" />
                                </div>
                            </div>

                            <div class="pt-4">
                                <base-button :block="true" type="submit" @click="updatePersonalInfo"
                                    :class="{ 'opacity-50 cursor-not-allowed': isUpdatingPersonalInfo }"
                                    :padding-y="'py-2.5'">
                                    <icon name="svg-spinners:90-ring-with-bg" v-if="isUpdatingPersonalInfo" />
                                    <span v-else>Update Personal Information</span>
                                </base-button>
                            </div>
                        </div>
                    </div>

                    <!-- Password Update Section -->
                    <div class="w-full max-w-3xl mx-auto space-y-6 bg-white rounded-lg shadow-md p-6">
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-gray-800 mb-7">Change Password</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <dynamic-inputs label="New Password" placeholder="••••••••" type="password"
                                    name="New Password" :rules="'required|minLength:7'" :required="true"
                                    v-model="passwordForm.newPassword" />

                                <dynamic-inputs label="Confirm Password" placeholder="••••••••" type="password"
                                    name="Confirm Password" :rules="'required|minLength:7'" :required="true"
                                    v-model="passwordForm.confirmPassword" />
                            </div>

                            <div class="pt-4">
                                <base-button :block="true" type="submit" @click="updatePassword"
                                    :class="{ 'opacity-50 cursor-not-allowed': isUpdatingPassword }"
                                    :padding-y="'py-2.5'">
                                    <icon name="svg-spinners:90-ring-with-bg" v-if="isUpdatingPassword" />
                                    <span v-else>Update Password</span>
                                </base-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const authStore = useAuthStore();
const { triggerToast } = useToast();
const { isLoading, startLoading } = useLoading(3000)

const fileInput = ref<HTMLInputElement | null>(null);

// Form data for editing
const formData = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    employeeId: '',
    baseSalary: '',
    createdAt: '',
    status: '',
});

// Password form data
const passwordForm = ref({
    newPassword: '',
    confirmPassword: '',
});

const isUpdatingPassword = ref(false);
const isUpdatingPersonalInfo = ref(false);

// Format date helper function
const formatDate = (dateString: string): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        // Format as "Dec 19, 2025"
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
};

// Initialize form data from auth store
const initializeFormData = () => {
    const rawCreatedAt = authStore.currentUser?.user_metadata?.createdAt || '';
    formData.value = {
        firstName: authStore.currentUser?.user_metadata?.firstName || '',
        middleName: authStore.currentUser?.user_metadata?.middleName || '',
        lastName: authStore.currentUser?.user_metadata?.lastName || '',
        email: authStore.currentUser?.user_metadata?.email || authStore.userEmail || '',
        phoneNumber: authStore.currentUser?.user_metadata?.phoneNumber || '',
        employeeId: authStore.currentUser?.user_metadata?.employeeId || '',
        baseSalary: authStore.currentUser?.user_metadata?.base_salary?.toString() || '0',
        createdAt: formatDate(rawCreatedAt),
        status: authStore.currentUser?.user_metadata?.status || 'active',
    };
};

// Migrate existing users to add missing fields
const migrateUserMetadata = async () => {
    const metadata = authStore.currentUser?.user_metadata;
    if (!metadata) return;
    // Check if employeeId or createdAt is missing
    const needsMigration = !metadata.employeeId || !metadata.createdAt;
    if (needsMigration) {
        const updates: Record<string, any> = {};
        if (!metadata.employeeId) {
            updates.employeeId = authStore.generateEmployeeId();
        }
        if (!metadata.createdAt) {
            // Use account creation date if available, otherwise use current date
            updates.createdAt = authStore.currentUser?.created_at || new Date().toISOString();
        }
        // Update the user metadata
        await authStore.updateProfile(updates);
        // Refresh form data to show new values
        initializeFormData();
    }
};

const handleImageClick = () => {
    fileInput.value?.click();
};

const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        startLoading();
        try {
            const result = await authStore.updateProfileImage(target.files[0]);
            if (!result.success) {
                console.error(result.error);
                triggerToast({
                    message: t('toast.faild_to_uplaod_img'),
                    type: 'error',
                    icon: 'material-symbols:error-outline-rounded',
                });
            } else {
                triggerToast({
                    message: t('toast.img_uploaded_successfully'),
                    type: 'success',
                    icon: 'mdi-check-circle',
                });
            }
        } finally {
            isLoading.value = false;
            if (fileInput.value) {
                fileInput.value.value = '';
            }
        }
    }
};

// Update personal information (phone number)
const updatePersonalInfo = async () => {
    isUpdatingPersonalInfo.value = true;
    try {
        const result = await authStore.updateProfile({
            firstName: formData.value.firstName,
            middleName: formData.value.middleName,
            lastName: formData.value.lastName,
            fullName: `${formData.value.firstName} ${formData.value.middleName} ${formData.value.lastName}`,
            email: formData.value.email,
            phoneNumber: formData.value.phoneNumber,
            base_salary: parseFloat(formData.value.baseSalary) || 0,
            status: formData.value.status,
        });

        if (result.success) {
            triggerToast({
                message: t('toast.personal_info_updated_successfully'),
                type: 'success',
                icon: 'mdi-check-circle',
            });
        } else {
            triggerToast({
                message: t('toast.failed_to_update_personal_info'),
                type: 'error',
                icon: 'material-symbols:error-outline-rounded',
            });
        }
    } catch (error) {
        console.error('Personal info update error:', error);
        triggerToast({
            message: t('toast.failed_to_update_personal_info'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    } finally {
        isUpdatingPersonalInfo.value = false;
    }
};

// Update password
const updatePassword = async () => {
    // Validate passwords match
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        triggerToast({
            message: t('toast.passwords_do_not_match'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }
    // Validate password length
    if (passwordForm.value.newPassword.length < 7) {
        triggerToast({
            message: t('toast.password_too_short'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
        return;
    }
    isUpdatingPassword.value = true;
    try {
        const result = await authStore.updatePassword(passwordForm.value.newPassword);
        if (result.success) {
            triggerToast({
                message: t('toast.password_updated_successfully'),
                type: 'success',
                icon: 'mdi-check-circle',
            });
            // Reset form
            passwordForm.value.newPassword = '';
            passwordForm.value.confirmPassword = '';
        } else {
            triggerToast({
                message: t('toast.failed_to_update_password'),
                type: 'error',
                icon: 'material-symbols:error-outline-rounded',
            });
        }
    } catch (error) {
        console.error('Password update error:', error);
        triggerToast({
            message: t('toast.failed_to_update_password'),
            type: 'error',
            icon: 'material-symbols:error-outline-rounded',
        });
    } finally {
        isUpdatingPassword.value = false;
    }
};

// Initialize on mount
onMounted(async () => {
    initializeFormData();
    // Migrate existing users to add missing employeeId and createdAt
    await migrateUserMetadata();
});

definePageMeta({
    layout: 'dashboard',
});

useHead({
    titleTemplate: () => t('head.my_profile'),
});
</script>