<template>
  <div>
    <LazyVDialog :model-value="show" :title="dialogTitle" :show-default-footer="false" @update:model-value="closeDialog"
      @close="closeDialog">
      <template #body>
        <div class="text-center">
          <Icon :name="isBlocked
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
        <LazyVButton type="button" variant="outline" border-color="border-gray-600" text-color="text-white"
          hover-color="hover:bg-gray-700" padding-x="px-5" padding-y="py-2.5" @click="closeDialog">
          {{ cancelText }}
        </LazyVButton>
        <LazyVButton type="button" :disabled="loading"
          :hover-color="isBlocked ? 'hover:bg-green-700' : 'hover:bg-orange-700'"
          :bg-color="isBlocked ? 'bg-green-600' : 'bg-orange-600'" padding-x="px-5" padding-y="py-2.5" class="ms-4"
          @click="confirmAction">
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