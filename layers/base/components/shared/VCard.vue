<template>
  <div class="v-card" :class="{ 'ui-card--padded': padded }">
    <!-- flat mode: render slot directly as flex children (no body wrapper) -->
    <template v-if="flat">
      <slot />
    </template>

    <!-- normal mode -->
    <template v-else>
      <div v-if="$slots.header || title" class="v-card-header">
        <slot name="header">
          <h3 class="v-card-title">{{ title }}</h3>
        </slot>
      </div>
      <div class="v-card-body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="v-card-footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  padded?: boolean
  flat?: boolean
}>()
</script>