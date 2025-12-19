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
                            <p class="text-start text-gray-600 text-lg font-medium mt-1 capitalize">
                                {{ authStore.currentUserRole }}
                            </p>
                        </div>

                        <!-- Edit Button -->
                        <base-button v-if="!isEditMode" @click="handleEdit" :text-color="'text-blue-600'"
                            :padding-x="'px-4'" :padding-y="'py-2'" :bg-hover-color="'hover:bg-blue-50'"
                            :append-icon="'heroicons:pencil-square'"
                            class="flex items-center gap-2 rounded-lg transition-colors hover:text-blue-700">
                            <span class="hidden sm:inline">Edit</span>
                        </base-button>
                    </div>
                </div>

                <div
                    class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
                    <!-- Detail -->
                    <div
                        class="w-full my-auto py-6 flex flex-col justify-center gap-2 border border-gray-100 bg-gray-50 p-5 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <dynamic-inputs v-model="formData.firstName" type="text" name="First Name"
                                label="First Name" :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.middleName" type="text" name="Middle Name"
                                label="Middle Name" :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.lastName" type="text" name="Last Name" label="Last Name"
                                :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.dateOfBirth" type="text" name="Date Of Birth"
                                label="Date Of Birth" :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.gender" type="text" name="Gender" label="Gender"
                                :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.location" type="text" name="Location" label="Location"
                                :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.phoneNumber" type="text" name="Phone Number"
                                label="Phone Number" :readonly="!isEditMode" />

                            <dynamic-inputs v-model="formData.email" type="email" name="Email" label="Email"
                                :readonly="!isEditMode" />
                        </div>

                        <!-- Update and Cancel Buttons -->
                        <div v-if="isEditMode" class="flex gap-3 justify-end mt-6">
                            <base-button @click="handleCancel" :disabled="isLoading" :variant="'outline'"
                                :border-color="'border-gray-300'" :text-color="'text-gray-700'"
                                :bg-hover-color="'hover:bg-gray-50'" :padding-x="'px-6'" :padding-y="'py-2'"
                                class="transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Cancel
                            </base-button>

                            <base-button @click="handleUpdate" :disabled="isLoading" :bg-color="'bg-blue-600'"
                                :text-color="'text-white'" :bg-hover-color="'hover:bg-blue-700'" :padding-x="'px-6'"
                                :padding-y="'py-2'"
                                class="transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <span v-if="isLoading">Updating...</span>
                                <span v-else>Update</span>
                            </base-button>
                        </div>

                        <!-- Location -->
                        <!-- <div class="my-10 lg:w-[70%] md:h-[14rem] w-full h-[10rem]">
                            <h1
                                class="w-fit font-serif my-4 pb-1 pe-2 rounded-b-md border-b-4 border-blue-600 lg:text-4xl md:text-3xl text-xl">
                                My Location</h1>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328040215286!3d8.963479542403238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710567234587!5m2!1sen!2set"
                                class="rounded-lg w-full h-full" style="border:0" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div> -->
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
const isEditMode = ref(false);

// Form data for editing
const formData = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    phoneNumber: '',
    email: '',
});

// Initialize form data from auth store
const initializeFormData = () => {
    formData.value = {
        firstName: authStore.currentUser?.user_metadata?.firstName || '',
        middleName: authStore.currentUser?.user_metadata?.middleName || '',
        lastName: authStore.currentUser?.user_metadata?.lastName || '',
        dateOfBirth: authStore.currentUser?.user_metadata?.dateOfBirth || '14/05/1977',
        gender: authStore.currentUser?.user_metadata?.gender || 'Male',
        location: authStore.currentUser?.user_metadata?.location || 'Ethiopia, Addis Ababa',
        phoneNumber: authStore.currentUser?.user_metadata?.phoneNumber || '+251913****30',
        email: authStore.currentUser?.user_metadata?.email || authStore.userEmail || '',
    };
};

// Enter edit mode
const handleEdit = () => {
    initializeFormData();
    isEditMode.value = true;
};

// Cancel editing
const handleCancel = () => {
    isEditMode.value = false;
    initializeFormData();
};

// Update profile
const handleUpdate = async () => {
    startLoading();
    try {
        const result = await authStore.updateProfile({
            firstName: formData.value.firstName,
            middleName: formData.value.middleName,
            lastName: formData.value.lastName,
            fullName: `${formData.value.firstName} ${formData.value.middleName} ${formData.value.lastName}`,
            dateOfBirth: formData.value.dateOfBirth,
            gender: formData.value.gender,
            location: formData.value.location,
            phoneNumber: formData.value.phoneNumber,
            email: formData.value.email,
        });
        if (result.success) {
            isEditMode.value = false;
            triggerToast({
                message: t('toast.profile_updated_successfully'),
                type: 'success',
                icon: 'mdi-check-circle',
            });
        } else {
            console.error(result.error);
            triggerToast({
                message: t('toast.faild_to_update_profile'),
                type: 'error',
                icon: 'material-symbols:error-outline-rounded',
            });
        }
    } finally {
        isLoading.value = false;
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

// Initialize on mount
onMounted(() => {
    initializeFormData();
});

definePageMeta({
    layout: 'dashboard',
});

useHead({
    titleTemplate: () => t('head.my_profile'),
});
</script>