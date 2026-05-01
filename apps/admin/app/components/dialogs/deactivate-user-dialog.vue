<template>
  <div>
    <LazyVDialog :model-value="show" :title="dialogTitle" :show-default-footer="false" @update:model-value="closeDialog"
      @close="closeDialog">
      <template #body>
        <div class="text-center">
          <Icon name="material-symbols:warning-outline" class="w-20 h-20 mx-auto text-red-300" />
          <p class="text-tx-secondary mt-4">{{ dialogMessage }}</p>
          <p class="text-red-400 font-semibold mt-3">
            {{ t("dialog.deactivate_warning") }}
          </p>
        </div>
      </template>
      <template #footer>
        <LazyVButton type="button" variant="outline" border-color="border-gray-600" text-color="text-tx-primary"
          hover-color="hover:bg-gray-700" padding-x="px-5" padding-y="py-2.5" @click="closeDialog">
          {{ cancelText }}
        </LazyVButton>
        <LazyVButton type="button" bg-color="bg-red-500" hover-color="hover:bg-red-600" :disabled="loading"
          padding-x="px-5" padding-y="py-2.5" class="ms-4" @click="confirmAction">
          <Icon v-if="loading" name="svg-spinners:270-ring" class="w-5 h-5" />
          <span v-else>{{ confirmText }}</span>
        </LazyVButton>
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { UserListItem } from "@/layers/base/types";

const { t } = useI18n();

const props = defineProps<{
  show: boolean;
  user: UserListItem | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

const dialogTitle = computed(() => t("dialog.deactivate_user_title"));

const dialogMessage = computed(() => {
  if (!props.user) return "";
  const userName = props.user.fullName || props.user.email;
  return t("dialog.deactivate_user_message").replace("{name}", userName);
});

const confirmText = computed(() => t("btn.deactivate"));

const cancelText = computed(() => t("btn.cancel"));

const closeDialog = () => {
  emit("close");
};

const confirmAction = () => {
  emit("confirm");
};
</script>