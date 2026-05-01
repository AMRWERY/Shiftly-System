<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="show"
          class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
          <div class="w-full max-w-lg card-bg shadow-lg rounded-lg p-3 relative modal-card">
            <LazyVButton type="button" variant="ghost" class="absolute top-4 end-4" padding-x="px-1" padding-y="py-1"
              @click="closeModal">
              <Icon name="material-symbols:close-small-rounded" class="w-6 h-6 close-btn" />
            </LazyVButton>

            <div class="my-6 text-center">
              <Icon name="mdi:delete-outline" class="w-20 h-20 text-red-300 mx-auto" />
              <h4 class="text-white text-base font-medium mt-4">{{ title }}</h4>
              <p class="text-gray-300 mt-2" v-if="message">{{ message }}</p>

              <div class="text-center mt-10 flex items-center justify-center gap-3">
                <LazyVButton type="button" variant="outline" border-color="border-gray-600" text-color="text-white"
                  hover-color="hover:bg-gray-700" padding-x="px-5" padding-y="py-2.5" @click="closeModal">
                  {{ cancelText }}
                </LazyVButton>
                <LazyVButton type="button" bg-color="bg-red-500" hover-color="hover:bg-red-600" :disabled="loading"
                  padding-x="px-5" padding-y="py-2.5" @click="confirmDelete">
                  <Icon v-if="loading" name="svg-spinners:270-ring" class="w-5 h-5" />
                  <span v-else>{{ confirmText }}</span>
                </LazyVButton>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const closeModal = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('confirm')
}
</script>
