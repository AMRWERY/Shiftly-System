<template>
  <div>
    <div class="relative overflow-x-auto shadow-2xl sm:rounded-lg border">
      <table class="w-full text-sm text-start text-gray-500 whitespace-nowrap bg-white table-auto">
        <thead class="text-sm table-header-bg text-white sticky top-0 z-10 bg-gray-100 border-b">
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th v-for="(column, index) in columns" :key="index" scope="col"
              :class="['px-6 py-3', column.key === 'avatar' ? '' : 'cursor-pointer select-none']"
              @click="column.key !== 'avatar' ? sortByColumn(column.key) : null">
              <div class="flex items-center">
                {{ column.label }}
                <span v-if="sortColumn === column.key && column.key !== 'avatar'" class="ms-1 mt-1.5">
                  <icon
                    :name="sortDirection === 'asc' ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'"
                    class="w-5 h-5 text-white" />
                </span>
              </div>
            </th>
            <!-- Changed: Add visible label for actions column -->
            <th scope="col" class="px-6 py-3 text-center"
              v-if="hasView || hasDelete || hasBlock || hasEdit || hasMarkPaid || hasMarkFailed"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sortedItems" :key="index" :class="[
            'border-b',
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100',
            'hover:bg-gray-50 transition-colors'
          ]">
            <td class="px-6 py-4 font-medium text-gray-700">{{ index + 1 }}</td>
            <td v-for="(column, colIndex) in columns" :key="colIndex"
              :class="['px-6 py-4', column.key === 'avatar' ? 'w-16' : '']">
              <template v-if="column.key === 'status' || column.key === 'employeeRate'">
                <span v-if="item.status"
                  :class="['px-2.5 py-1 rounded-full text-sm font-medium', getStatusClass(item.status)]">
                  <template v-if="column.format">
                    {{ column.format(item) }}
                  </template>
                  <template v-else>
                    {{ item.status }}
                  </template>
                </span>
                <span v-else-if="item.employeeRate"
                  :class="['px-2.5 py-1 rounded-full text-sm font-medium', getStatusClass(item.employeeRate)]">
                  {{ t(`status.${item.employeeRate}`) }}
                  <template v-if="column.format">
                    {{ column.format(item) }}
                  </template>
                  <template v-else>
                    {{ item.employeeRate }}
                  </template>
                </span>
                <template v-else>
                  <template v-if="column.format">
                    {{ column.format(item) }}
                  </template>
                  <template v-else>
                    {{ getValue(item, column.key) }}
                  </template>
                </template>
              </template>
              <template v-else-if="column.key === 'avatar' && column.format">
                <div class="flex items-center">
                  <span v-html="column.format(item, index)"></span>
                </div>
              </template>
              <template v-else-if="column.html && column.format">
                <div class="flex items-center">
                  <span v-html="column.format(item, index)"></span>
                </div>
              </template>
              <template v-else-if="column.format && column.key === 'dates'">
                <span v-html="column.format(item, index)"></span>
              </template>
              <template v-else-if="column.format && column.key !== 'dates' && column.key !== 'avatar'">
                {{ column.format(item, index) }}
              </template>
              <template v-else>
                {{ getValue(item, column.key) }}
              </template>
            </td>
            <td v-if="hasView || hasBlock || hasDelete || hasEdit || hasMarkPaid || hasMarkFailed"
              class="px-6 py-4 text-end">
              <div class="flex items-center gap-3.5 justify-end">
                <button v-if="hasView" class="rounded-full text-blue-500 hover:text-blue-700 transition"
                  @click="$emit('view', item)">
                  <icon name="tabler:eye" class="w-7 h-7 text-blue-500 hover:text-blue-700" />
                </button>
                <button v-if="hasBlock" class="rounded-full text-green-500 hover:text-green-700 transition"
                  @click="$emit('block', item)">
                  <icon name="material-symbols:block" class="w-6 h-6"
                    :class="[item.status === 'blocked' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700']" />
                </button>
                <button v-if="hasDelete && actionConditions?.delete && actionConditions.delete(item)"
                  class="rounded-full text-red-500 hover:text-red-700 transition" @click="$emit('delete', item)">
                  <icon name="material-symbols:delete-sharp" class="w-6 h-6 text-red-500 hover:text-red-700" />
                </button>
                <button v-if="hasEdit && actionConditions?.edit && actionConditions.edit(item)"
                  class="rounded-full text-indigo-500 hover:text-indigo-700 transition" @click="$emit('edit', item)">
                  <icon name="heroicons-outline:pencil-alt"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 hover:text-indigo-800" />
                </button>
                <button v-if="hasMarkPaid && actionConditions?.markPaid && actionConditions.markPaid(item)"
                  class="rounded-full text-green-500 hover:text-green-700 transition" @click="$emit('markPaid', item)">
                  <icon name="heroicons-outline:check-circle"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 hover:text-green-800" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column, TableItem, StatusType } from '../../types/tables'

const { t } = useI18n()

const props = defineProps<{
  items: readonly any[];
  columns: Column[];
  hasView?: boolean;
  hasDelete?: boolean;
  hasBlock?: boolean;
  hasEdit?: boolean;
  hasMarkPaid?: boolean;
  hasMarkFailed?: boolean;
  actionsLabel?: string;
  actionConditions?: {
    edit?: (item: any) => boolean;
    delete?: (item: any) => boolean;
    markPaid?: (item: any) => boolean;
    markFailed?: (item: any) => boolean;
  };
}>()

const actionConditions = props.actionConditions || {
  edit: () => true,
  delete: () => true,
  markPaid: () => true,
  markFailed: () => true
};

const emit = defineEmits<{
  <T = any>(event: 'view', item: T): void;
  <T = any>(event: 'delete', item: T): void;
  <T = any>(event: 'block', item: T): void;
  <T = any>(event: 'edit', item: T): void;
  <T = any>(event: 'markPaid', item: T): void;
}>()

const statusClasses: Record<StatusType, string> = {
  pending: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200 capitalize',
  approved: 'text-green-600 bg-green-100 hover:bg-green-200 capitalize',
  rejected: 'text-red-600 bg-red-100 hover:bg-red-200 capitalize',
  cancelled: 'text-gray-600 bg-gray-100 hover:bg-gray-200 capitalize',
  blocked: 'bg-red-100 text-red-800 hover:bg-red-200 capitalize',
  active: 'bg-green-100 text-green-800 hover:bg-green-200 capitalize',
  paid: 'text-green-700 bg-green-200 hover:bg-green-200 capitalize',
  failed: 'text-orange-700 bg-orange-200 hover:bg-orange-200 capitalize',
  weak: 'text-red-700 bg-red-200 hover:bg-red-200 capitalize',
  medium: 'text-yellow-700 bg-yellow-200 hover:bg-gray-200 capitalize',
  strong: 'text-green-700 bg-green-200 hover:bg-green-200 capitalize',
}

const getStatusClass = (status: string | undefined): string => {
  if (!status) return '';
  return status in statusClasses ? statusClasses[status as StatusType] : '';
}

const getValue = (item: TableItem, key: string | number | symbol): any => {
  if (typeof key === 'string') {
    return item[key];
  }
  return '';
}

const sortColumn = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const sortByColumn = (key: string) => {
  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = key;
    sortDirection.value = 'asc';
  }
};

const sortedItems = computed(() => {
  if (!sortColumn.value || !props.items) {
    return props.items;
  }
  const itemsToSort = [...props.items];
  return itemsToSort.sort((a, b) => {
    const aValue = getValue(a, sortColumn.value!);
    const bValue = getValue(b, sortColumn.value!);
    if (aValue === null || aValue === undefined) return sortDirection.value === 'asc' ? 1 : -1;
    if (bValue === null || bValue === undefined) return sortDirection.value === 'asc' ? -1 : 1;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDirection.value === 'asc' ? comparison : -comparison;
    }
  });
});
</script>