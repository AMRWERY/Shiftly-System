<template>
    <div>
        <p
            class="p-6 text-3xl text-gray-300 hover:font-semibold hover:underline hover:text-white cursor-pointer transition-colors">
            {{ formattedUserRole }}</p>

        <div class="p-6 mt-16">
            <LazyVButton :type="'button'" :no-border="true" :block="false" :padding-x="'px-4'" :padding-y="'py-2.5'"
                class="flex items-center justify-center rounded-lg transition-colors group" @click="showDialog = true">
                <span>{{ t('btn.open_dialog') }}</span>
            </LazyVButton>

            <!-- Reusable Dialog -->
            <LazyVDialog v-model="showDialog" :title="t('dialog.reset_password_title')"
                :message="t('dialog.reset_password_message')" :confirm-text="t('btn.confirm')">
                <template #body>
                    <!-- dialog body will be here -->
                    <p class="text-gray-300 text-sm mb-4">
                        {{ t('dialog.otp_message') }}
                    </p>
                    <input type="text" maxlength="6"
                        class="border border-gray-600 rounded-md px-4 py-2 w-full text-center tracking-widest bg-brand-systemBg text-white"
                        :placeholder="t('form.enter_otp')" />
                </template>

                <template #footer>
                    <LazyVButton :type="'button'" :hover-color="'hover:bg-gray-800'" :text-color="'text-white'"
                        :variant="'solid'" :padding-x="'px-4'" :padding-y="'py-2.5'"
                        class="rounded-lg border-2 transition-colors group" @click="handleConfirm">
                        {{ t('btn.verify_otp') }}
                    </LazyVButton>
                </template>
            </LazyVDialog>
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
});

useSeoPage({
    title: () => t("meta.dashboard"),
    description: () => t("meta.dashboard_description"),
    private: true,
});
</script>