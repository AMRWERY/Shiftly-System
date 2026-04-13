<template>
  <div class="p-10 space-y-8">
    <!-- Live avatars -->
    <div class="flex items-center gap-6">
      <!-- With image -->
      <LazyVAvatar src="https://i.pravatar.cc/160?img=47" alt="Elena Petrov" size="lg" online />

      <!-- No image / no name → shows "?" -->
      <LazyVAvatar size="lg" />
    </div>

    <!-- Skeleton states -->
    <div class="flex items-center gap-6">
      <LazyVAvatarSkeleton size="lg" />

      <LazyVAvatarSkeleton size="lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'dashboard' })
</script>