<template>
  <div>
    <LazyVDialog :model-value="isOpen" :title="dialogTitle" :show-default-footer="false"
      @update:model-value="handleClose" @close="handleClose">
      <!-- Loading State -->
      <template #body>
        <div v-if="loading" class="flex items-center justify-center p-12">
          <Icon name="svg-spinners:ring-resize" class="w-8 h-8 text-indigo-400" />
        </div>

        <!-- Content -->
        <div v-else class="space-y-6 overflow-y-auto max-h-[60vh] hide-scrollbar">
          <!-- Role Form -->
          <role-form ref="roleFormRef" v-model="formData" />

          <!-- Permission Matrix -->
          <role-permission-matrix v-model="permissions" :show-stats="true" />
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <div v-if="!loading" class="flex items-center justify-end gap-3">
          <LazyVButton type="button" variant="outline" :padding-x="'px-3'" :border-color="'border-gray-100'"
            :text-color="'text-tx-primary'" :padding-y="'py-2'" @click="handleClose" :disabled="saving">
            {{ t("btn.cancel") }}
          </LazyVButton>
          <LazyVButton type="button" :padding-x="'px-3'" :padding-y="'py-2'" @click="handleSubmit" :disabled="saving">
            <span v-if="saving" class="flex items-center gap-2">
              <Icon name="svg-spinners:ring-resize" class="w-4 h-4" />
              {{ savingText }}
            </span>
            <span v-else>{{ submitButtonText }}</span>
          </LazyVButton>
        </div>
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { Permission } from "@/layers/base/types";

const { t } = useI18n();
const rolesStore = useRolesStore();

const props = defineProps<{
  isOpen: boolean;
  roleId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  success: [];
}>();

const roleFormRef = ref<any>(null);
const loading = ref(false);
const saving = ref(false);

const formData = ref({
  name: "",
  displayName: "",
  description: "",
});

const permissions = ref<Permission[]>([]);

const isEditMode = computed(() => !!props.roleId);

const dialogTitle = computed(() =>
  isEditMode.value ? t("roles.edit_role") : t("roles.create_new_role")
);

const submitButtonText = computed(() =>
  isEditMode.value ? t("btn.save_changes") : t("btn.create_role")
);

const savingText = computed(() =>
  isEditMode.value ? t("btn.saving") : t("btn.creating")
);

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen && isEditMode.value && props.roleId) {
      await loadRole();
    }
  }
);

const loadRole = async () => {
  if (!props.roleId) return;

  loading.value = true;
  try {
    const role = await rolesStore.fetchRole(props.roleId);
    if (role) {
      formData.value = {
        name: role.name,
        displayName: role.displayName,
        description: role.description,
      };
      permissions.value = [...role.permissions];
    }
  } catch (err) {
    console.error("Error loading role:", err);
    emit("close");
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  if (!saving.value) {
    resetForm();
    emit("close");
  }
};

const resetForm = () => {
  formData.value = {
    name: "",
    displayName: "",
    description: "",
  };
  permissions.value = [];
};

const handleSubmit = async () => {
  // Validate form
  if (roleFormRef.value && !roleFormRef.value.validate()) {
    return;
  }

  saving.value = true;
  try {
    if (isEditMode.value && props.roleId) {
      // Edit mode
      await rolesStore.updateRole(props.roleId, {
        displayName: formData.value.displayName,
        description: formData.value.description,
        permissions: permissions.value,
      });
    } else {
      // Create mode
      await rolesStore.createRole({
        name: formData.value.name,
        displayName: formData.value.displayName,
        description: formData.value.description,
        permissions: permissions.value,
      });
    }
    emit("success");
    resetForm();
  } catch (err) {
    console.error("Error saving role:", err);
  } finally {
    saving.value = false;
  }
};
</script>
