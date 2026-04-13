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
