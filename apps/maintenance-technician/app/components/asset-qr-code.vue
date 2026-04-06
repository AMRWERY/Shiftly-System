<template>
  <div class="asset-qr-code">
    <!-- QR code for asset identification — render with a QR library -->
    <p class="asset-qr-code-id">{{ assetId }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  assetId?: string
  size?: number
}>()
</script>
