<template>
  <div>
    <div class="relative sm:rounded-lg border overflow-hidden">
      <div class="scroll-container overflow-x-auto smooth-scroll" @scroll="handleScroll">
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
                v-if="hasView || hasDelete || hasBlock || hasEdit || hasMarkPaid || hasMarkFailed || hasDeactivate">
              </th>
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
              <td v-if="hasView || hasBlock || hasDelete || hasEdit || hasMarkPaid || hasMarkFailed || hasDeactivate"
                class="px-6 py-4 text-end">
                <div class="flex items-center gap-3.5 justify-end">
                  <button v-if="hasView && normalizedActionConditions.view(item)"
                    class="rounded-full text-blue-500 hover:text-blue-700 transition" @click="$emit('view', item)">
                    <icon name="tabler:eye" class="w-7 h-7 text-blue-500 hover:text-blue-700" />
                  </button>
                  <button v-if="hasBlock && normalizedActionConditions.block(item)"
                    class="rounded-full text-green-500 hover:text-green-700 transition" @click="$emit('block', item)">
                    <icon name="material-symbols:block" class="w-6 h-6"
                      :class="[item.status === 'blocked' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700']" />
                  </button>
                  <button v-if="hasDelete && normalizedActionConditions.delete(item)"
                    class="rounded-full text-red-500 hover:text-red-700 transition" @click="$emit('delete', item)">
                    <icon name="material-symbols:delete-sharp" class="w-6 h-6 text-red-500 hover:text-red-700" />
                  </button>
                  <button v-if="hasEdit && normalizedActionConditions.edit(item)"
                    class="rounded-full text-indigo-500 hover:text-indigo-700 transition" @click="$emit('edit', item)">
                    <icon name="heroicons-outline:pencil-alt"
                      class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 hover:text-indigo-800" />
                  </button>
                  <button v-if="hasMarkPaid && normalizedActionConditions.markPaid(item)"
                    class="rounded-full text-green-500 hover:text-green-700 transition"
                    @click="$emit('markPaid', item)">
                    <icon name="heroicons-outline:check-circle"
                      class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 hover:text-green-800" />
                  </button>
                  <button v-if="hasDeactivate && normalizedActionConditions.deactivate(item)"
                    class="rounded-full text-gray-500 hover:text-gray-700 transition"
                    @click="$emit('deactivate', item)">
                    <icon name="material-symbols:person-off" class="w-6 h-6 text-gray-600 hover:text-gray-800" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="showLeftShadow" class="scroll-shadow scroll-shadow-left"></div>
      <div v-if="showRightShadow" class="scroll-shadow scroll-shadow-right"></div>
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
  hasDeactivate?: boolean;
  actionsLabel?: string;
  actionConditions?: {
    view?: (item: any) => boolean;
    block?: (item: any) => boolean;
    edit?: (item: any) => boolean;
    delete?: (item: any) => boolean;
    markPaid?: (item: any) => boolean;
    markFailed?: (item: any) => boolean;
    deactivate?: (item: any) => boolean;
  };
}>()

const normalizedActionConditions = computed(() => {
  if (!props.actionConditions) {
    return {
      view: () => true,
      block: () => true,
      edit: () => true,
      delete: () => true,
      markPaid: () => true,
      markFailed: () => true,
      deactivate: () => true
    }
  }
  return {
    view: (item: any) => props.actionConditions?.view ? props.actionConditions.view(item) : true,
    block: (item: any) => props.actionConditions?.block ? props.actionConditions.block(item) : true,
    edit: (item: any) => props.actionConditions?.edit ? props.actionConditions.edit(item) : false,
    delete: (item: any) => props.actionConditions?.delete ? props.actionConditions.delete(item) : false,
    markPaid: (item: any) => props.actionConditions?.markPaid ? props.actionConditions.markPaid(item) : false,
    markFailed: (item: any) => props.actionConditions?.markFailed ? props.actionConditions.markFailed(item) : false,
    deactivate: (item: any) => props.actionConditions?.deactivate ? props.actionConditions.deactivate(item) : false
  }
})

const emit = defineEmits<{
  <T = any>(event: 'view', item: T): void;
  <T = any>(event: 'delete', item: T): void;
  <T = any>(event: 'block', item: T): void;
  <T = any>(event: 'edit', item: T): void;
  <T = any>(event: 'markPaid', item: T): void;
  <T = any>(event: 'deactivate', item: T): void;
}>()

const { getStatusClass } = useStatusClasses()

const getValue = (item: TableItem, key: string | number | symbol): any => {
  if (typeof key === 'string') {
    return item[key];
  }
  return '';
}

const sortColumn = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');
const showLeftShadow = ref(false);
const showRightShadow = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollLeft, scrollWidth, clientWidth } = target;
  // Show left shadow if scrolled from the start
  showLeftShadow.value = scrollLeft > 0;
  // Show right shadow if not scrolled to the end
  showRightShadow.value = scrollLeft < scrollWidth - clientWidth - 10;
};

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

<style scoped>
/* Custom scrollbar styling */
.scroll-container {
  scroll-behavior: smooth;
}

/* Webkit browsers (Chrome, Safari, Edge) */
.scroll-container::-webkit-scrollbar {
  height: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 0 6px rgba(102, 126, 234, 0.4);
}

/* Firefox */
.scroll-container {
  scrollbar-color: #667eea #f1f5f9;
  scrollbar-width: thin;
}

/* Scroll shadows for better visual feedback */
.scroll-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 20;
  transition: opacity 0.3s ease;
}

.scroll-shadow-left {
  left: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.08), transparent);
}

.scroll-shadow-right {
  right: 0;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.08), transparent);
}

/* Smooth scroll behavior */
.smooth-scroll {
  scroll-behavior: smooth;
}

/* Optional: Add a subtle border effect */
.scroll-container {
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>