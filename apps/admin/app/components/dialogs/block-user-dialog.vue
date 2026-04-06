<template>
  <div>
    <VDialog :model-value="show" :title="dialogTitle" :show-default-footer="false"
      @update:model-value="closeDialog" @close="closeDialog">
      <template #body>
        <div class="text-center">
          <icon :name="isBlocked
              ? 'mdi:account-check-outline'
              : 'mdi:account-cancel-outline'
            " :class="[
              'w-20 h-20 mx-auto',
              isBlocked ? 'text-green-500' : 'text-orange-500',
            ]" />
          <p class="text-gray-300 mt-4">{{ dialogMessage }}</p>
        </div>
      </template>
      <template #footer>
        <button @click="closeDialog" type="button"
          class="px-5 py-2.5 rounded-lg text-white text-sm font-medium bg-gray-700 hover:bg-gray-600 active:bg-gray-700 transition-colors">
          {{ cancelText }}
        </button>
        <button @click="confirmAction" type="button" :class="[
          'px-5 py-2.5 rounded-lg text-white text-sm font-medium ms-4',
          loading
            ? isBlocked
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-orange-400 cursor-not-allowed'
            : isBlocked
              ? 'bg-green-600 hover:bg-green-700 active:bg-green-600'
              : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-600',
        ]" :disabled="loading">
          <icon v-if="loading" name="svg-spinners:270-ring" class="w-5 h-5 inline" />
          <span v-else>{{ confirmText }}</span>
        </button>
      </template>
    </VDialog>
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

const isBlocked = ref(false);

watch(
  () => props.show,
  (newValue) => {
    if (newValue && props.user) {
      isBlocked.value = props.user.status === "blocked";
    }
  },
  { immediate: true }
);

const dialogTitle = computed(() => {
  return isBlocked.value
    ? t("dialog.unblock_user_title")
    : t("dialog.block_user_title");
});

const dialogMessage = computed(() => {
  if (!props.user) return "";
  const userName = props.user.fullName || props.user.email;
  const messageKey = isBlocked.value
    ? "dialog.unblock_user_message"
    : "dialog.block_user_message";
  return t(messageKey).replace("{name}", userName);
});

const confirmText = computed(() => {
  return isBlocked.value ? t("btn.unblock") : t("btn.block");
});

const cancelText = computed(() => t("btn.cancel"));

const closeDialog = () => {
  emit("close");
};

const confirmAction = () => {
  emit("confirm");
};
</script>