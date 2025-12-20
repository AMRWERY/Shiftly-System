<template>
  <div>
    <!-- OPEN BUTTON -->
    <button @click.stop="isOpen = !isOpen" class="relative text-gray-600 hover:text-gray-900">
      <icon name="material-symbols:notifications-outline-rounded" class="w-7 h-7 bg-gray-100 hover:bg-gray-200" />
      <span
        class="absolute -top-0.5 -end-0.5 w-[7px] h-[7px] bg-gradient-to-b from-[#E88B76] to-[#bc7671] rounded-full animate-ping"></span>
      <span
        class="absolute -top-0.5 -end-0.5 w-[7px] h-[7px] bg-gradient-to-b from-[#E88B76] to-[#bc7671] rounded-full"></span>
    </button>

    <!-- DROPDOWN DIALOG -->
    <Transition name="fade">
      <div v-if="isOpen" ref="dropdownRef" class="fixed inset-0 z-[1000] flex justify-end font-sans">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-[rgba(0,0,0,0.5)]" @click="closeDialog"></div>

        <!-- SIDEPANEL -->
        <div class="relative w-full h-screen max-w-lg bg-white shadow-lg z-[1001]">
          <div class="overflow-auto p-6 h-[calc(112vh-124px)] hide-scrollbar">
            <!-- HEADER -->
            <div class="flex items-center gap-4 pb-6 text-gray-800 border-b border-gray-300">
              <h3 class="flex-1 text-sm font-medium text-color">
                Notifications
              </h3>
              <button class="ms-2 close-btn" @click="closeDialog">
                Close
              </button>
            </div>

            <!-- OPTIONS -->
            <div class="mt-6">
              <ul class="space-y-6">
                <li v-for="i in 20" :key="i"
                  class="flex items-center rounded-md px-1 py-3 transition cursor-pointer hover:bg-gradient-to-r hover:from-[rgba(16,157,210,0.1)] hover:to-[rgba(109,207,242,0.1)]">
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                    <img src="/img/dummy-profile-img.jpg" alt="user-img" />
                  </div>
                  <div class="flex-grow ms-4">
                    <div class="text-sm font-medium text-color">
                      Candidates!
                    </div>
                    <div class="text-xs text-[#61646B] font-normal">
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

<script setup lang="ts">
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