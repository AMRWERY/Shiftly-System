<template>
  <div>
    <!-- OPEN BUTTON -->
    <button @click.stop="isOpen = !isOpen" class="relative text-gray-400 hover:text-white">
      <icon name="material-symbols:notifications-outline-rounded"
        class="w-7 h-7 bg-gray-200 hover:bg-gray-400 rounded-full p-0.5" />
      <span
        class="absolute -top-0.5 -end-0.5 w-[7px] h-[7px] bg-gradient-to-b from-indigo-300 to-blue-300 rounded-full animate-ping"></span>
      <span
        class="absolute -top-0.5 -end-0.5 w-[7px] h-[7px] bg-gradient-to-b from-indigo-300 to-blue-300 rounded-full"></span>
    </button>

    <!-- DROPDOWN DIALOG -->
    <Transition name="fade">
      <div v-if="isOpen" ref="dropdownRef" class="fixed inset-0 z-[1000] flex justify-end font-sans">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-[rgba(0,0,0,0.5)]" @click="closeDialog"></div>

        <!-- SIDEPANEL -->
        <div class="relative w-full h-screen max-w-lg bg-brand-cardBg shadow-lg z-[1001] border-s border-gray-700">
          <div class="overflow-auto p-6 h-full hide-scrollbar">
            <!-- HEADER -->
            <div class="flex items-center gap-4 pb-6 text-white border-b border-gray-700">
              <h3 class="flex-1 text-sm font-medium">
                Notifications
              </h3>
              <button class="ms-2 close-btn text-gray-400 hover:text-white" @click="closeDialog">
                Close
              </button>
            </div>

            <!-- OPTIONS -->
            <div class="mt-6">
              <ul class="space-y-6">
                <li v-for="i in 20" :key="i"
                  class="flex items-center rounded-md px-1 py-3 transition cursor-pointer hover:bg-white/5">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500/20 rounded-full">
                    <img src="/img/dummy-profile-img.jpg" alt="user-img"
                      class="rounded-full w-full h-full object-cover" />
                  </div>
                  <div class="flex-grow ms-4">
                    <div class="text-sm font-medium text-white">
                      Candidates!
                    </div>
                    <div class="text-xs text-gray-400 font-normal">
                      Amr Mohamed applied for the captain position.
                    </div>
                  </div>
                  <div class="flex items-center space-s-2">
                    <span class="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">10:07 AM</span>
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
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const closeDialog = () => {
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDialog();
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));

onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>