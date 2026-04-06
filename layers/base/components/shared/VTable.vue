<template>
  <div>
    <div ref="tableRef">
      <div class="flex flex-col h-full bg-[#0B0E14] text-gray-300 rounded-xl overflow-hidden border border-gray-800/40">
        <!-- Table Container -->
        <div class="flex-1 relative overflow-hidden flex flex-col">
          <div class="scroll-container overflow-x-auto flex-1 smooth-scroll" @scroll="handleScroll">
            <table class="w-full text-sm text-start whitespace-nowrap bg-transparent table-auto min-w-[1000px]">
              <thead class="sticky top-0 z-20 bg-[#0B0E14]/95 backdrop-blur-md">
                <tr class="border-b border-gray-800/60">
                  <!-- Selection Checkbox Header -->
                  <th scope="col" class="px-6 py-5 w-12">
                    <div class="flex items-center">
                      <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                        class="w-5 h-5 rounded border-gray-700 bg-transparent text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer accent-indigo-600" />
                    </div>
                  </th>

                  <!-- Dynamic Columns -->
                  <th v-for="(column, index) in columns" :key="index" scope="col"
                    class="px-6 py-5 text-start font-bold text-[11px] tracking-widest text-gray-400 select-none transition-colors hover:text-gray-200"
                    :class="[column.key === 'avatar' || column.key === 'user' ? '' : 'cursor-pointer']"
                    @click="column.key !== 'avatar' && column.key !== 'user' ? sortByColumn(column.key) : null">
                    <div class="flex items-center gap-2">
                      {{ column.label }}
                      <span v-if="sortColumn === column.key && !['avatar', 'user'].includes(column.key)"
                        class="text-indigo-500">
                        <icon
                          :name="sortDirection === 'asc' ? 'heroicons:arrow-small-up' : 'heroicons:arrow-small-down'"
                          class="w-4 h-4" />
                      </span>
                    </div>
                  </th>

                  <!-- Actions Header -->
                  <th scope="col" class="px-6 py-5 text-end font-bold text-[11px] tracking-widest text-gray-400 pe-10"
                    v-if="hasAnyAction">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-800/20">
                <tr v-for="(item, index) in sortedItems" :key="item.id || index"
                  class="group transition-all hover:bg-white/[0.02]" :class="{ 'bg-indigo-500/5': isSelected(item) }">

                  <!-- Selection Checkbox Cell -->
                  <td class="px-6 py-5">
                    <input type="checkbox" :checked="isSelected(item)" @change="toggleSelectItem(item)"
                      class="w-5 h-5 rounded border-gray-700 bg-transparent text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer accent-indigo-600" />
                  </td>

                  <!-- Dynamic Data Cells -->
                  <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-5">
                    <!-- User Profile Cell: Avatar + Name + Email (Combined) -->
                    <div v-if="column.key === 'user' || (column.key === 'avatar' && (item.fullName || item.name))"
                      class="flex items-center gap-4">
                      <div class="relative flex-shrink-0 w-11 h-11">
                        <img :src="item.avatarUrl || '/img/dummy-profile-img.jpg'"
                          class="w-11 h-11 rounded-full object-cover border-2 border-gray-800 group-hover:border-indigo-500/50 transition-colors flex-shrink-0" />
                        <!-- Activity indicator -->
                        <div
                          class="absolute bottom-0 end-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0E14]">
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <span
                          class="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-indigo-100 transition-colors">
                          {{ item.fullName || item.name }}
                        </span>
                        <span class="text-xs text-gray-500 mt-0.5">{{ item.email }}</span>
                      </div>
                    </div>

                    <!-- Role Tag Cell -->
                    <div v-else-if="column.key === 'role'" class="flex">
                      <span :class="getRoleClass(item.role)"
                        class="px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm">
                        {{ formatRole(item.role) }}
                      </span>
                    </div>

                    <!-- Status Toggle Cell -->
                    <div v-else-if="column.key === 'status'" class="flex items-center">
                      <VButton
                        type="button"
                        variant="ghost"
                        padding-x="px-0"
                        padding-y="py-0"
                        :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ring-offset-2 ring-offset-[#0B0E14] focus:ring-2 focus:ring-indigo-500/50', item.status === 'active' || item.status === 'approved' ? 'bg-indigo-600' : 'bg-gray-700']"
                        @click.stop="$emit('statusToggle', item)"
                      >
                        <span
                          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-lg"
                          :class="item.status === 'active' || item.status === 'approved' ? 'translate-x-6' : 'translate-x-1'"
                        />
                      </VButton>
                    </div>

                    <!-- Default Content Mapping -->
                    <div v-else class="text-sm font-medium transition-colors" :class="[
                      ['fullName', 'name'].includes(column.key) ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-300'
                    ]">
                      <template v-if="column.format">
                        <span v-html="column.format(item, index)"></span>
                      </template>
                      <template v-else>
                        {{ getValue(item, column.key) }}
                      </template>
                    </div>
                  </td>

                  <!-- Actions Cell -->
                  <td v-if="hasAnyAction" class="px-6 py-5 text-end pe-8 relative overflow-visible">
                    <div class="flex items-center justify-end gap-2 transition-all">
                      <!-- Primary Actions (Icons) -->
                      <VTooltip v-if="hasView && normalizedActionConditions.view(item)" :text="t('btn.view')">
                        <VButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-gray-800" padding-x="px-2" padding-y="py-2" class="rounded-lg hover:text-white" @click.stop="$emit('view', item)">
                          <icon name="heroicons-outline:eye" class="w-5 h-5" />
                        </VButton>
                      </VTooltip>

                      <VTooltip v-if="hasEdit && normalizedActionConditions.edit(item)" :text="t('btn.edit')">
                        <VButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-gray-800" padding-x="px-2" padding-y="py-2" class="rounded-lg hover:text-white" @click.stop="$emit('edit', item)">
                          <icon name="heroicons-outline:pencil" class="w-5 h-5" />
                        </VButton>
                      </VTooltip>

                      <!-- Secondary Actions (Dropdown) -->
                      <div v-if="hasDropdownActions(item)" class="relative dropdown-container"
                        :id="`dropdown-${item.id || index}`">
                        <VTooltip :text="t('btn.more_actions')">
                          <VButton type="button" variant="ghost" text-color="text-gray-400" hover-color="hover:bg-gray-800" padding-x="px-2" padding-y="py-2"
                            :class="['rounded-lg hover:text-white', { 'bg-gray-800 text-white': activeDropdownId === (item.id || index) }]"
                            @click.stop="toggleDropdown(item.id || index)">
                            <icon name="heroicons-outline:dots-vertical" class="w-5 h-5" />
                          </VButton>
                        </VTooltip>

                        <!-- Dropdown Menu -->
                        <div v-if="activeDropdownId === (item.id || index)"
                          class="absolute end-0 w-48 bg-[#1F2937] border border-gray-700 rounded-xl shadow-2xl z-[1000] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200"
                          :class="index >= sortedItems.length - 2 ? 'bottom-full mb-2 origin-bottom-right' : 'top-full mt-2 origin-top-right'">
                          <div class="py-2">

                            <VButton v-if="hasDeactivate && normalizedActionConditions.deactivate(item)"
                              type="button" variant="ghost" :block="true" text-color="text-gray-300"
                              hover-color="hover:bg-white/[0.05]" padding-x="px-4" padding-y="py-2.5"
                              class="text-start hover:text-rose-400 gap-3"
                              @click.stop="executeAction('deactivate', item)">
                              <icon name="material-symbols:person-off" class="w-4 h-4" />
                              {{ t('btn.deactivate') }}
                            </VButton>

                            <VButton v-if="hasMarkPaid && normalizedActionConditions.markPaid(item)"
                              type="button" variant="ghost" :block="true" text-color="text-gray-300"
                              hover-color="hover:bg-white/[0.05]" padding-x="px-4" padding-y="py-2.5"
                              class="text-start hover:text-emerald-400 gap-3"
                              @click.stop="executeAction('markPaid', item)">
                              <icon name="heroicons-outline:check-circle" class="w-4 h-4" />
                              {{ t('btn.mark_paid') }}
                            </VButton>

                            <div
                              v-if="hasDelete && normalizedActionConditions.delete(item) && ((hasDeactivate && normalizedActionConditions.deactivate(item)) || (hasMarkPaid && normalizedActionConditions.markPaid(item)))"
                              class="h-px bg-gray-700/50 my-1"></div>

                            <VButton v-if="hasDelete && normalizedActionConditions.delete(item)"
                              type="button" variant="ghost" :block="true" text-color="text-rose-500"
                              hover-color="hover:bg-rose-500/10" padding-x="px-4" padding-y="py-2.5"
                              class="text-start gap-3"
                              @click.stop="executeAction('delete', item)">
                              <icon name="material-symbols:delete-outline-sharp" class="w-4 h-4" />
                              {{ t('btn.delete') }}
                            </VButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- VPagination Footer -->
        <div
          class="px-8 py-5 border-t border-gray-800/40 flex flex-col sm:flex-row items-center justify-between bg-[#0D1017]">
          <div class="text-sm text-gray-400 font-medium mb-4 sm:mb-0">
            Showing <span class="text-white font-bold">{{ displayStartIndex + 1 }}</span> to <span
              class="text-white font-bold">{{
                displayEndIndex }}</span>
            of
            <span class="text-white font-bold">{{ effectiveTotalItems }}</span> entries
          </div>

          <div class="flex items-center">
            <VPagination :current-page="effectiveCurrentPage" :total-pages="effectiveTotalPages"
              @page-change="goToPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import type { Column, TableItem } from "../../types/tables";

const { t } = useI18n();

const props = defineProps<{
  items: readonly any[];
  columns: Column[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  hasView?: boolean;
  hasDelete?: boolean;
  hasBlock?: boolean;
  hasEdit?: boolean;
  hasMarkPaid?: boolean;
  hasDeactivate?: boolean;
  actionsLabel?: string;
  actionConditions?: {
    view?: (item: any) => boolean;
    block?: (item: any) => boolean;
    edit?: (item: any) => boolean;
    delete?: (item: any) => boolean;
    markPaid?: (item: any) => boolean;
    deactivate?: (item: any) => boolean;
  };
}>();

const emit = defineEmits<{
  (event: "view", item: any): void;
  (event: "delete", item: any): void;
  (event: "block", item: any): void;
  (event: "edit", item: any): void;
  (event: "markPaid", item: any): void;
  (event: "deactivate", item: any): void;
  (event: "statusToggle", item: any): void;
  (event: "selectionChange", items: any[]): void;
  (event: "pageChange", page: number): void;
}>();

// --- Action Logic ---
const activeDropdownId = ref<string | number | null>(null);

const toggleDropdown = (id: string | number) => {
  if (activeDropdownId.value === id) {
    activeDropdownId.value = null;
  } else {
    activeDropdownId.value = id;
  }
};

const executeAction = (action: string, item: any) => {
  emit(action as any, item);
  activeDropdownId.value = null;
};

// Close dropdown on click outside
const tableRef = ref(null);
onClickOutside(tableRef, () => {
  activeDropdownId.value = null;
});

// Selection Logic
const selectedItems = ref<Set<any>>(new Set());
const isSelected = (item: any) => selectedItems.value.has(item);
const isAllSelected = computed(() => props.items.length > 0 && selectedItems.value.size === props.items.length);

const toggleSelectItem = (item: any) => {
  if (selectedItems.value.has(item)) {
    selectedItems.value.delete(item);
  } else {
    selectedItems.value.add(item);
  }
  emit('selectionChange', Array.from(selectedItems.value));
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value.clear();
  } else {
    props.items.forEach(item => selectedItems.value.add(item));
  }
  emit('selectionChange', Array.from(selectedItems.value));
};

// Actions Helper
const hasAnyAction = computed(() =>
  props.hasView || props.hasBlock || props.hasDelete || props.hasEdit || props.hasMarkPaid || props.hasDeactivate
);

const hasDropdownActions = (item: any) => {
  return (
    (props.hasDeactivate && normalizedActionConditions.value.deactivate(item)) ||
    (props.hasMarkPaid && normalizedActionConditions.value.markPaid(item)) ||
    (props.hasDelete && normalizedActionConditions.value.delete(item))
  );
};

const normalizedActionConditions = computed(() => {
  if (!props.actionConditions) {
    return {
      view: () => true,
      block: () => true,
      edit: () => true,
      delete: () => true,
      markPaid: () => true,
      deactivate: () => true,
    };
  }
  return {
    view: (item: any) => props.actionConditions?.view ? props.actionConditions.view(item) : true,
    block: (item: any) => props.actionConditions?.block ? props.actionConditions.block(item) : true,
    edit: (item: any) => props.actionConditions?.edit ? props.actionConditions.edit(item) : true,
    delete: (item: any) => props.actionConditions?.delete ? props.actionConditions.delete(item) : true,
    markPaid: (item: any) => props.actionConditions?.markPaid ? props.actionConditions.markPaid(item) : true,
    deactivate: (item: any) => props.actionConditions?.deactivate ? props.actionConditions.deactivate(item) : true,
  };
});

// Sorting Logic
const sortColumn = ref<string | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const sortByColumn = (key: string) => {
  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = key;
    sortDirection.value = "asc";
  }
};

const getValue = (item: TableItem, key: string | number | symbol): any => {
  if (typeof key === "string") return item[key];
  return "";
};

const sortedItems = computed(() => {
  if (!sortColumn.value || !props.items) return props.items;
  const itemsToSort = [...props.items];
  return itemsToSort.sort((a, b) => {
    const aValue = getValue(a, sortColumn.value!);
    const bValue = getValue(b, sortColumn.value!);
    if (aValue === null || aValue === undefined) return sortDirection.value === "asc" ? 1 : -1;
    if (bValue === null || bValue === undefined) return sortDirection.value === "asc" ? -1 : 1;
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection.value === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortDirection.value === "asc" ? comparison : -comparison;
  });
});

// Role Tag Styling
const getRoleClass = (role: string) => {
  if (!role) return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  const r = role.toUpperCase();
  if (r.includes('ADMIN')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  if (r.includes('MANAGER')) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
  if (r.includes('HR') || r.includes('PERSONNEL')) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  if (r.includes('AUDITOR')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
  if (r.includes('TECHNICIAN') || r.includes('ENGINEER')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
};

// Role Formatting Helper
const formatRole = (role: string) => {
  if (!role) return '';
  // Convert snake_case or kebab-case to Title Case (e.g., td_officer -> Td Officer)
  return role
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// VPagination Logic
const internalCurrentPage = ref(1);
const internalPageSize = ref(10);

const effectiveCurrentPage = computed(() => props.currentPage || internalCurrentPage.value);
const effectiveTotalItems = computed(() => props.totalItems !== undefined ? props.totalItems : props.items.length);
const effectiveTotalPages = computed(() => props.totalPages !== undefined ? props.totalPages : Math.ceil(effectiveTotalItems.value / internalPageSize.value));

// When using server-side VPagination (props.totalPages exists), the items are already a slice, so startIndex is managed externally
const displayStartIndex = computed(() => (effectiveCurrentPage.value - 1) * (props.totalItems ? (props.items.length || 0) : internalPageSize.value));
const displayEndIndex = computed(() => Math.min(displayStartIndex.value + props.items.length, effectiveTotalItems.value));

const goToPage = (page: number) => {
  if (props.currentPage !== undefined) {
    emit('pageChange', page);
  } else {
    internalCurrentPage.value = page;
  }
};

// Shadow/Scroll Logic
const handleScroll = (event: Event) => { };
</script>

<style scoped>
.scroll-container::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #1F2937;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #374151;
}

.smooth-scroll {
  scroll-behavior: smooth;
}

button:active {
  transform: scale(0.96);
}

.animate-in {
  animation: animate-in 0.2s ease-out;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>