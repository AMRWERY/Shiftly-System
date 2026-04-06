<template>
  <button class="app-theme-toggle" type="button" @click="toggleTheme">
    <!-- Dark/light switch -->
    <slot />
  </button>
</template>

<script setup lang="ts">
function toggleTheme() {}
</script>
