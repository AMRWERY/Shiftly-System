<template>
  <div class="p-10 space-y-6">
    <LazyVTable :items="employees" :columns="columns" :total-items="employees.length" has-view has-edit has-delete>
      <template #table-header>
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Data
        </span>
        <span
          class="rounded-full border border-gray-700/60 bg-gray-800/50 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
          {{ employees.length }} records
        </span>
      </template>
    </LazyVTable>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '@/layers/base/types/tables'

definePageMeta({ layout: 'dashboard' })

const columns: Column[] = [
  { key: 'user', label: 'Employee' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'salary', label: 'Salary', format: (row) => `$${row.salary.toLocaleString()}` },
  { key: 'joinDate', label: 'Join Date' },
  { key: 'status', label: 'Status' },
]

const employees = [
  { id: 1, fullName: 'Elena Petrov', email: 'e.petrov@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=47', role: 'LEAD_ARCHITECT', department: 'Industrial Core', salary: 162409, joinDate: '2021-11-04', status: 'active' },
  { id: 2, fullName: 'Marcus Thorne', email: 'm.thorne@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=12', role: 'OPERATIONS', department: 'Supply Chain', salary: 139069, joinDate: '2021-03-14', status: 'active' },
  { id: 3, fullName: 'Sarah Lin', email: 's.lin@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=32', role: 'SECURITY', department: 'Information Assurance', salary: 145988, joinDate: '2020-08-23', status: 'active' },
  { id: 4, fullName: 'Jackson Vane', email: 'j.vane@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=53', role: 'HR', department: 'People Ops', salary: 98400, joinDate: '2022-05-17', status: 'deactivated' },
  { id: 5, fullName: 'Priya Nair', email: 'p.nair@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=21', role: 'MANAGER', department: 'Product', salary: 175000, joinDate: '2019-09-01', status: 'active' },
  { id: 6, fullName: 'Omar Khalil', email: 'o.khalil@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=60', role: 'ENGINEER', department: 'Platform', salary: 152300, joinDate: '2020-12-11', status: 'active' },
  { id: 7, fullName: 'Yuki Tanaka', email: 'y.tanaka@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=8', role: 'AUDITOR', department: 'Compliance', salary: 118750, joinDate: '2023-01-30', status: 'active' },
  { id: 8, fullName: 'Chloe Mercier', email: 'c.mercier@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=44', role: 'ADMIN', department: 'Executive Office', salary: 210000, joinDate: '2018-06-22', status: 'active' },
  { id: 9, fullName: 'Rajan Patel', email: 'r.patel@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=15', role: 'TECHNICIAN', department: 'Field Services', salary: 87600, joinDate: '2022-11-05', status: 'active' },
  { id: 10, fullName: 'Aisha Oduya', email: 'a.oduya@nexux.io', avatarUrl: 'https://i.pravatar.cc/80?img=39', role: 'OPERATIONS', department: 'Logistics', salary: 104200, joinDate: '2021-07-19', status: 'deactivated' },
]
</script>