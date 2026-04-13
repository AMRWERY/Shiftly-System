<template>
  <div>
    <!-- OPEN BUTTON -->
    <LazyVButton type="button" variant="ghost" text-color="text-gray-400"
      class="relative rounded-xl border border-white/10 bg-white/5 p-1.5 transition-all hover:bg-white/10"
      @click.stop="isOpen = !isOpen">
      <Icon name="material-symbols:notifications-outline-rounded"
        class="h-7 w-7 rounded-full bg-gray-200 p-0.5 hover:bg-gray-400" />
      <span
        class="absolute -end-0.5 -top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300 animate-ping" />
      <span
        class="absolute -end-0.5 -top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300" />
    </LazyVButton>

    <!-- DROPDOWN DIALOG -->
    <Transition name="fade">
      <div v-if="isOpen" ref="dropdownRef" class="fixed inset-0 z-[1000] flex justify-end font-sans">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-black/50" @click="closeDialog" />

        <!-- SIDEPANEL -->
        <div class="relative z-[1001] h-screen w-full max-w-md border-s border-white/5 bg-brand-layoutBg shadow-2xl">
          <div class="hide-scrollbar h-full overflow-auto p-6">
            <!-- HEADER -->
            <div class="flex items-center gap-4 border-b border-gray-700 pb-6 text-white">
              <h3 class="flex-1 text-sm font-medium">
                {{ t('notifications.title') }}
              </h3>
              <LazyVButton type="button" variant="ghost" text-color="text-gray-400" class="ms-2 hover:text-white"
                @click="closeDialog">
                {{ t('btn.close') }}
              </LazyVButton>
            </div>

            <!-- OPTIONS -->
            <div class="mt-6">
              <ul class="space-y-6">
                <li v-for="i in 20" :key="i"
                  class="flex cursor-pointer items-center rounded-md px-1 py-3 transition hover:bg-white/5">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                    <img src="/img/dummy-profile-img.jpg" alt="" class="h-full w-full rounded-full object-cover" />
                  </div>
                  <div class="ms-4 flex-grow">
                    <div class="text-sm font-medium text-white">
                      {{ t('notifications.sample_title') }}
                    </div>
                    <div class="text-xs font-normal text-gray-400">
                      {{ t('notifications.sample_body') }}
                    </div>
                  </div>
                  <div class="flex items-center space-s-2">
                    <span class="text-xs font-medium text-green-400">
                      10:07 AM
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const closeDialog = () => {
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDialog()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))

onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>