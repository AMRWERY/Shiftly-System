<template>
  <div>
    <div class="space-y-6">
      <div>
        <label
          for="roleName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {{ t("roles.role_name") }} <span class="text-red-500">*</span>
        </label>
        <input
          id="roleName"
          v-model="localFormData.name"
          type="text"
          :disabled="isEditMode"
          :placeholder="t('roles.role_name_placeholder')"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">
          {{ errors.name }}
        </p>
        <p v-if="isEditMode" class="mt-1 text-xs text-gray-500">
          {{ t("roles.role_name_cannot_be_changed") }}
        </p>
      </div>

      <div>
        <label
          for="displayName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {{ t("roles.display_name") }} <span class="text-red-500">*</span>
        </label>
        <input
          id="displayName"
          v-model="localFormData.displayName"
          type="text"
          :placeholder="t('roles.display_name_placeholder')"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.displayName }"
        />
        <p v-if="errors.displayName" class="mt-1 text-sm text-red-600">
          {{ errors.displayName }}
        </p>
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {{ t("roles.description") }}
        </label>
        <textarea
          id="description"
          v-model="localFormData.description"
          rows="3"
          :placeholder="t('roles.description_placeholder')"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoleFormData } from "../../types/role-form-data";

const { t } = useI18n();

const props = defineProps<{
  modelValue: RoleFormData;
  isEditMode?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [data: RoleFormData];
}>();

const localFormData = ref<RoleFormData>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newVal) => {
    localFormData.value = { ...newVal };
  },
  { deep: true }
);

watch(
  localFormData,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

const errors = ref<Partial<Record<keyof RoleFormData, string>>>({});

const validate = (): boolean => {
  errors.value = {};
  if (!localFormData.value.name.trim()) {
    errors.value.name = t("validation.role_name_required");
  } else if (!/^[a-z_]+$/.test(localFormData.value.name)) {
    errors.value.name = t("validation.role_name_format");
  }
  if (!localFormData.value.displayName.trim()) {
    errors.value.displayName = t("validation.display_name_required");
  }
  return Object.keys(errors.value).length === 0;
};

defineExpose({
  validate,
});
</script>