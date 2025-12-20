<template>
  <div>
    <dynamic-dialog :model-value="isOpen" :title="t('dialog.invite_user_title')" :show-default-footer="false"
      @update:model-value="closeModal" @close="closeModal">
      <template #body>
        <div class="mt-2">
          <p class="text-sm text-gray-500 mb-4">
            {{ t('dialog.invite_user_message') }}
          </p>

          <form @submit.prevent="inviteUser">
            <div class="space-y-4 overflow-y-auto max-h-[350px] hide-scrollbar">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <dynamic-inputs :label="t('form.first_name')" :name="t('form.first_name')" type="text"
                    rules="required" :required="true" v-model="form.firstName" />
                </div>

                <div>
                  <dynamic-inputs :label="t('form.middle_name')" :name="t('form.middle_name')" type="text"
                    v-model="form.middleName" />
                </div>

                <div>
                  <dynamic-inputs :label="t('form.last_name')" :name="t('form.last_name')" type="text" :required="true"
                    rules="required" v-model="form.lastName" />
                </div>

                <!-- Email -->
                <div>
                  <dynamic-inputs :label="t('form.email')" :name="t('form.email')" type="email" :required="true"
                    rules="required|email" v-model="form.email" />
                </div>

                <!-- Phone Number -->
                <div>
                  <dynamic-inputs :label="t('form.phone_number')" :name="t('form.phone_number')" type="tel"
                    v-model="form.phoneNumber" />
                </div>

                <!-- Role -->
                <div>
                  <dynamic-inputs :label="t('form.role')" :name="t('form.role')" type="select" :required="true"
                    rules="required" :placeholder="t('form.select_role')" :options="roles" v-model="form.role" />
                </div>

                <!-- Base Salary -->
                <div>
                  <dynamic-inputs :label="t('form.base_salary')" :name="t('form.base_salary')" type="number"
                    v-model="form.baseSalary" />
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <base-button type="button" variant="outline" bg-color="bg-gray-100" hover-color="hover:bg-gray-200"
                text-color="text-gray-700" padding-x="px-4" padding-y="py-2" @click="closeModal">
                {{ t('btn.cancel') }}
              </base-button>
              <base-button type="submit" :disabled="loading" hover-color="hover:bg-blue-700" padding-x="px-4"
                padding-y="py-2"
                class="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span v-if="loading" class="flex items-center gap-2">
                  <icon name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
                  Processing...
                </span>
                <span v-else>{{ t('btn.invite_user') }}</span>
              </base-button>
            </div>
          </form>
        </div>
      </template>
    </dynamic-dialog>
  </div>
</template>

<script setup lang="ts">
import type { InviteUserData } from '../../../../layers/base/types'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const { t } = useI18n()
const { triggerToast } = useToast()
const loading = ref(false)

const form = ref<InviteUserData>({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: '',
  baseSalary: 0
})

const roles = computed(() => [
  { value: 'hr', label: t('roles.hr') },
  { value: 'manager', label: t('roles.manager') },
  { value: 'accountant', label: t('roles.accountant') },
  { value: 'system_auditor', label: t('roles.system_auditor') },
  { value: 'inventory_manager', label: t('roles.inventory_manager') },
  { value: 'maintenance_technician', label: t('roles.maintenance_technician') },
  { value: 'td_officer', label: t('roles.td_officer') },
  { value: 'employee', label: t('roles.employee') },
])

const closeModal = () => {
  emit('close')
}

const inviteUser = async () => {
  loading.value = true
  try {
    const { error } = await useFetch('/api/admin/users/invite', {
      method: 'POST',
      body: form.value
    })
    if (error.value) throw error.value
    triggerToast({
      message: t('toast.user_invited_successfully'),
      type: 'success',
      icon: 'mdi-check-circle'
    })
    // Reset form
    form.value = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: 'employee',
      baseSalary: 0
    }
    emit('success')
    closeModal()
  } catch (error: any) {
    console.error('Invite error:', error)
    triggerToast({
      message: error.statusMessage || t('toast.failed_to_invite_user'),
      type: 'error',
      icon: 'material-symbols:error-outline-rounded'
    })
  } finally {
    loading.value = false
  }
}
</script>