<template>
  <div>
    <transition name="overlay-fade">
      <div v-if="visible"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0b0f1a]/95 backdrop-blur-sm">
        <div class="flex flex-col items-center justify-center space-y-6">
          <!-- Text Branding -->
          <h1 class="text-4xl md:text-6xl font-black tracking-[0.2em] text-white animate-pulse-slow">
            NEXUX <span class="text-indigo-500">ERP</span>
          </h1>
          <!-- Subtle Loading Bar -->
          <div class="w-32 h-[1px] bg-white/10 relative overflow-hidden">
            <div class="absolute inset-0 bg-indigo-500/50 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps(['visible']);
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 1s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes loading-bar {
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-loading-bar {
  animation: loading-bar 2s ease-in-out infinite;
}
</style>