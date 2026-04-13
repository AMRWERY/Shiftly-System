<template>
  <LazyVButton class="app-theme-toggle" type="button" variant="ghost" padding-x="px-2" padding-y="py-2"
    @click="toggleTheme">
    <slot />
  </LazyVButton>
</template>

<script lang="ts" setup>
function toggleTheme() { }
</script>
