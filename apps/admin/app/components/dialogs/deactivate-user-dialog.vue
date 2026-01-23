<template>
  <div>
    <dynamic-dialog
      :model-value="show"
      :title="dialogTitle"
      :show-default-footer="false"
      @update:model-value="closeDialog"
      @close="closeDialog"
    >
      <template #body>
        <div class="text-center">
          <icon
            name="material-symbols:warning-outline"
            class="w-20 h-20 mx-auto text-red-500"
          />
          <p class="text-gray-600 mt-4">{{ dialogMessage }}</p>
          <p class="text-red-600 font-semibold mt-3">
            {{ t("dialog.deactivate_warning") }}
          </p>
        </div>
      </template>
      <template #footer>
        <button
          @click="closeDialog"
          type="button"
          class="px-5 py-2.5 rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
        >
          {{ cancelText }}
        </button>
        <button
          @click="confirmAction"
          type="button"
          :class="[
            'px-5 py-2.5 rounded-lg text-white text-sm font-medium ms-4',
            loading
              ? 'bg-red-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 active:bg-red-600',
          ]"
          :disabled="loading"
        >
          <icon
            v-if="loading"
            name="svg-spinners:270-ring"
            class="w-5 h-5 inline"
          />
          <span v-else>{{ confirmText }}</span>
        </button>
      </template>
    </dynamic-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { UserListItem } from "../../../../../layers/base/types";

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