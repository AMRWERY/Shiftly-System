<template>
  <div class="skills-matrix">
    <table class="skills-matrix-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th v-for="skill in skills" :key="skill">{{ skill }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in matrix" :key="row.employeeId">
          <td>{{ row.employeeName }}</td>
          <td v-for="skill in skills" :key="skill">
            <slot :employee-id="row.employeeId" :skill="skill" :level="row.levels[skill]">
              {{ row.levels[skill] ?? '-' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  skills?: string[]
  matrix?: { employeeId: string; employeeName: string; levels: Record<string, number> }[]
}>()
</script>
