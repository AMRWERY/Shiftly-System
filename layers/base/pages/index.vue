<template>
    <div>
        <p class="p-6 text-3xl text-gray-600 hover:font-semibold hover:underline hover:text-gray-800 cursor-pointer">
            {{ formattedUserRole }}</p>

        <div class="p-6 mt-16">
            <base-button :default-icon="false" :type="'button'" :no-border="true" :block="false"
                :padding-x="'px-4'" :padding-y="'py-2.5'" class="flex items-center justify-center rounded-lg transition-colors group"
                @click="showDialog = true">
                <span>{{ t('btn.open_dialog') }}</span>
            </base-button>

            <!-- Reusable Dialog -->
            <dynamic-dialog v-model="showDialog" :title="t('dialog.reset_password_title')"
                :message="t('dialog.reset_password_message')" :confirm-text="t('btn.confirm')">
                <template #body>
                    <!-- dialog body will be here -->
                    <p class="text-gray-700 text-sm mb-4">
                        {{ t('dialog.otp_message') }}
                    </p>
                    <input type="text" maxlength="6"
                        class="border border-gray-300 rounded-md px-4 py-2 w-full text-center tracking-widest"
                        :placeholder="t('form.enter_otp')" />
                </template>

                <template #footer>
                    <base-button :default-icon="false" :type="'button'" :hover-color="'hover:bg-gray-800'"
                        :text-color="'text-white'" :variant="'solid'" :padding-x="'px-4'" :padding-y="'py-2.5'"
                        class="rounded-lg border-2 transition-colors group" @click="handleConfirm">
                        {{ t('btn.verify_otp') }}
                    </base-button>
                </template>
            </dynamic-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const authStore = useAuthStore();

const showDialog = ref(false);

const handleConfirm = () => {
    // console.log('OTP confirmed!');
    showDialog.value = false;
};

const formattedUserRole = computed(() => {
    const role = authStore.currentUserRole;
    if (role) {
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    }
    return '';
});

definePageMeta({
    layout: 'dashboard',
    middleware: ['role'],
    roles: ['admin', 'hr', 'accountant', 'employee', 'manager'],
});

useHead({
    titleTemplate: () => t('head.dashboard'),
});
</script>