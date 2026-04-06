<template>
  <div class="financial-statement-table">
    <h3 v-if="title" class="financial-statement-table-title">{{ title }}</h3>
    <table class="financial-statement-table-inner">
      <thead>
        <tr>
          <th>Account</th>
          <th>Current Period</th>
          <th>Prior Period</th>
          <th>Variance</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
