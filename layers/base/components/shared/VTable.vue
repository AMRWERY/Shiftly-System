<template>
  <div ref="tableRef" class="relative flex h-full min-h-0 w-full flex-1 flex-col">
    <div
      class="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-800/40 bg-[#0B0E14] text-gray-300">
      <div v-if="showDownloadMenu" class="flex shrink-0 items-center justify-end border-b border-white/5 px-6 py-3">
        <LazyVDownloadFilesMenu :all-items="exportSourceItems" :columns="columns" :file-name-base="exportFileName" />
      </div>

      <!-- Table Container: grows so pagination stays at bottom -->
      <div class="flex-1 min-h-0 relative overflow-hidden flex flex-col border border-white/5 rounded-xl">
        <div class="scroll-container min-h-0 flex-1 overflow-x-auto overflow-y-auto smooth-scroll"
          @scroll="handleScroll">
          <table class="w-full text-sm text-start whitespace-nowrap bg-transparent table-auto min-w-[1000px]">
            <thead class="sticky top-0 z-20 bg-[#0B0E14]/95 backdrop-blur-md">
              <tr class="border-b border-gray-800/60">
                <!-- Selection Checkbox Header -->
                <th scope="col" class="px-6 py-5 w-12">
                  <div class="flex items-center">
                    <LazyVCheckboxInput :checked="isAllSelected" :color="'#00E0BA'"
                      class="border-gray-700 bg-transparent focus:ring-red-500/30"
                      @change="toggleSelectAll" />
                  </div>
                </th>

                <!-- Dynamic Columns -->
                <th v-for="(column, index) in columns" :key="index" scope="col"
                  class="px-6 py-5 text-start font-bold text-[10px] tracking-widest text-gray-500 select-none transition-colors hover:text-gray-300"
                  :class="[column.key === 'avatar' || column.key === 'user' ? '' : 'cursor-pointer']"
                  @click="column.key !== 'avatar' && column.key !== 'user' ? sortByColumn(column.key) : null">
                  <div class="flex items-center gap-1.5">
                    {{ column.label }}
                    <span v-if="!['avatar', 'user'].includes(column.key)" class="transition-colors"
                      :class="sortColumn === column.key ? 'text-indigo-400' : 'text-gray-700'">
                      <Icon
                        :name="sortColumn === column.key && sortDirection === 'desc' ? 'heroicons:arrow-small-down' : 'heroicons:arrow-small-up'"
                        class="w-3.5 h-3.5" />
                    </span>
                  </div>
                </th>

                <!-- Actions Header -->
                <th v-if="hasAnyAction" scope="col"
                  class="px-6 py-5 text-end font-bold text-[10px] tracking-widest text-gray-500 pe-10">
                  {{ actionsLabel || 'ACT' }}
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-800/20">
              <tr v-for="(item, index) in sortedItems" :key="item.id || index"
                class="group transition-all duration-150 hover:bg-white/[0.02]"
                :class="{ 'bg-indigo-500/[0.04] hover:bg-indigo-500/[0.06]': isSelected(item) }">
                <!-- Selection Checkbox Cell -->
                <td class="px-6 py-4">
                  <LazyVCheckboxInput :checked="isSelected(item)" :color="'#00E0BA'"
                    class="border-gray-700 bg-transparent focus:ring-indigo-500/30"
                    @change="toggleSelectItem(item)" />
                </td>

                <!-- Dynamic Data Cells -->
                <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4">
                  <!-- User Profile Cell -->
                  <div v-if="column.key === 'user' || (column.key === 'avatar' && (item.fullName || item.name))"
                    class="flex items-center gap-3">
                    <div class="relative flex-shrink-0 w-10 h-10">
                      <img :src="item.avatarUrl || '/img/dummy-profile-img.jpg'"
                        class="w-10 h-10 rounded-full object-cover border-2 border-gray-800/80 group-hover:border-indigo-500/30 transition-colors" />
                      <div
                        class="absolute bottom-0 end-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B0E14]" />
                    </div>
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-semibold text-white leading-tight group-hover:text-indigo-100 transition-colors">
                        {{ item.fullName || item.name }}
                      </span>
                      <span class="text-[11px] text-gray-600 mt-0.5">{{ item.email }}</span>
                    </div>
                  </div>

                  <!-- Role Tag Cell -->
                  <div v-else-if="column.key === 'role'" class="flex">
                    <span :class="getRoleClass(item.role)"
                      class="px-2.5 py-0.5 text-[10px] font-bold tracking-widest rounded-full border">
                      {{ formatRole(item.role) }}
                    </span>
                  </div>

                  <!-- Status Toggle Cell -->
                  <div v-else-if="column.key === 'status'" class="flex items-center">
                    <LazyVToggleButton
                      :checked="item.status === 'active' || item.status === 'approved'"
                      color="#00E0BA"
                      @click.stop="$emit('statusToggle', item)"
                    />
                  </div>

                  <!-- Default Content -->
                  <div v-else class="text-sm transition-colors"
                    :class="['fullName', 'name'].includes(column.key) ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-300'">
                    <template v-if="column.format">
                      <span v-html="column.format(item, index)" />
                    </template>
                    <template v-else>
                      {{ getValue(item, column.key) }}
                    </template>
                  </div>
                </td>

                <!-- Actions Cell -->
                <td v-if="hasAnyAction" class="px-6 py-4 text-end pe-8 relative overflow-visible">
                  <div class="flex items-center justify-end gap-1">
                    <LazyVTooltip v-if="hasView && normalizedActionConditions.view(item)" :text="t('btn.view')">
                      <LazyVButton type="button" variant="ghost" text-color="text-gray-500"
                        hover-color="hover:bg-gray-800/80" padding-x="px-2" padding-y="py-2"
                        class="rounded-lg hover:text-white" @click.stop="$emit('view', item)">
                        <Icon name="heroicons-outline:eye" class="w-4 h-4" />
                      </LazyVButton>
                    </LazyVTooltip>

                    <LazyVTooltip v-if="hasEdit && normalizedActionConditions.edit(item)" :text="t('btn.edit')">
                      <LazyVButton type="button" variant="ghost" text-color="text-gray-500"
                        hover-color="hover:bg-gray-800/80" padding-x="px-2" padding-y="py-2"
                        class="rounded-lg hover:text-white" @click.stop="$emit('edit', item)">
                        <Icon name="heroicons-outline:pencil" class="w-4 h-4" />
                      </LazyVButton>
                    </LazyVTooltip>

                    <!-- Dropdown -->
                    <div v-if="hasDropdownActions(item)" :id="`dropdown-${item.id || index}`"
                      class="relative dropdown-container">
                      <LazyVTooltip :text="t('btn.more_actions')">
                        <LazyVButton type="button" variant="ghost" text-color="text-gray-500"
                          hover-color="hover:bg-gray-800/80" padding-x="px-2" padding-y="py-2"
                          :class="['rounded-lg hover:text-white', { 'bg-gray-800 text-white': activeDropdownId === (item.id || index) }]"
                          @click.stop="toggleDropdown(item.id || index)">
                          <Icon name="heroicons-outline:dots-vertical" class="w-4 h-4" />
                        </LazyVButton>
                      </LazyVTooltip>

                      <div v-if="activeDropdownId === (item.id || index)"
                        class="absolute end-0 w-44 bg-[#161c2b] border border-gray-700/60 rounded-xl shadow-2xl z-[1000] overflow-hidden"
                        :class="index >= sortedItems.length - 2 ? 'bottom-full mb-2' : 'top-full mt-2'">
                        <div class="py-1.5">
                          <LazyVButton v-if="hasDeactivate && normalizedActionConditions.deactivate(item)" type="button"
                            variant="ghost" :block="true" text-color="text-gray-300" hover-color="hover:bg-white/[0.05]"
                            padding-x="px-4" padding-y="py-2" class="text-start hover:text-rose-400 gap-2 text-xs"
                            @click.stop="executeAction('deactivate', item)">
                            <Icon name="material-symbols:person-off" class="w-3.5 h-3.5" />
                            {{ t('btn.deactivate') }}
                          </LazyVButton>

                          <LazyVButton v-if="hasMarkPaid && normalizedActionConditions.markPaid(item)" type="button"
                            variant="ghost" :block="true" text-color="text-gray-300" hover-color="hover:bg-white/[0.05]"
                            padding-x="px-4" padding-y="py-2" class="text-start hover:text-emerald-400 gap-2 text-xs"
                            @click.stop="executeAction('markPaid', item)">
                            <Icon name="heroicons-outline:check-circle" class="w-3.5 h-3.5" />
                            {{ t('btn.mark_paid') }}
                          </LazyVButton>

                          <div v-if="
                            hasDelete && normalizedActionConditions.delete(item) &&
                            ((hasDeactivate && normalizedActionConditions.deactivate(item)) ||
                              (hasMarkPaid && normalizedActionConditions.markPaid(item)))
                          " class="h-px bg-gray-700/30 my-1" />

                          <LazyVButton v-if="hasDelete && normalizedActionConditions.delete(item)" type="button"
                            variant="ghost" :block="true" text-color="text-rose-500" hover-color="hover:bg-rose-500/10"
                            padding-x="px-4" padding-y="py-2" class="text-start gap-2 text-xs"
                            @click.stop="executeAction('delete', item)">
                            <Icon name="material-symbols:delete-outline-sharp" class="w-3.5 h-3.5" />
                            {{ t('btn.delete') }}
                          </LazyVButton>
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

      <!-- Footer Pagination -->
      <div class="shrink-0 px-8 py-4 border-t border-gray-800/40 bg-[#0D1017] mt-auto">
        <LazyVPagination :current-page="effectiveCurrentPage" :total-pages="effectiveTotalPages"
          :total-items="effectiveTotalItems" :start-index="displayStartIndex + 1" :end-index="displayEndIndex"
          @page-change="goToPage" />
      </div>
    </div>

    <!-- Floating Selection Toolbar -->
    <Transition name="toolbar-slide">
      <div v-if="selectionCount > 0" class="absolute bottom-[72px] start-1/2 -translate-x-1/2 z-50
          flex items-center gap-3 px-4 py-2.5 rounded-2xl min-w-max pointer-events-auto
          bg-[#131929]/95 backdrop-blur-xl border border-indigo-500/20 shadow-2xl">
        <div class="flex items-center gap-2">
          <Icon name="heroicons:squares-2x2" class="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span class="text-sm text-gray-300 font-medium whitespace-nowrap">
            {{ selectionCount }} Resources Selected
          </span>
        </div>
        <div class="h-4 w-px bg-gray-700/60 mx-0.5" />
        <div class="flex items-center gap-0.5">
          <button v-if="hasEdit"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
            @click="handleBulkEdit">
            <Icon name="heroicons-outline:pencil" class="w-3.5 h-3.5" />
            Edit
          </button>
          <button v-if="hasDelete"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
            @click="handleBulkDelete">
            <Icon name="heroicons-outline:trash" class="w-3.5 h-3.5" />
            Delete
          </button>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
            @click="handleBulkExport">
            <Icon name="heroicons:arrow-up-tray" class="w-3.5 h-3.5" />
            Export
          </button>
          <button
            class="ms-1 p-1.5 text-gray-600 hover:text-gray-300 hover:bg-white/[0.06] rounded-lg transition-colors"
            @click="clearSelection">
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { Column, TableItem } from "../../types/tables";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    items: readonly any[];
    columns: Column[];
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    /** Rows per page when using external pagination (required for correct “Showing X–Y” with totalItems). */
    pageSize?: number;
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
    showDownloadMenu?: boolean;
    downloadItems?: readonly any[];
    exportFileName?: string;
  }>(),
  { showDownloadMenu: false }
);

/** Rows passed to VDownloadFilesMenu (full list when paginated — set downloadItems) */
const exportSourceItems = computed(() => [...(props.downloadItems ?? props.items)]);

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
  (event: "bulkEdit", items: any[]): void;
  (event: "bulkDelete", items: any[]): void;
  (event: "bulkExport", items: any[]): void;
}>();

// --- Dropdown Logic ---
const activeDropdownId = ref<string | number | null>(null);

const toggleDropdown = (id: string | number) => {
  activeDropdownId.value = activeDropdownId.value === id ? null : id;
};

const executeAction = (action: string, item: any) => {
  emit(action as any, item);
  activeDropdownId.value = null;
};

const tableRef = ref(null);
onClickOutside(tableRef, () => {
  activeDropdownId.value = null;
});

// --- Selection Logic ---
const selectedItems = ref<Set<any>>(new Set());
const selectionCount = ref(0);

const isSelected = (item: any) => selectedItems.value.has(item);
const isAllSelected = computed(
  () => props.items.length > 0 && selectedItems.value.size === props.items.length
);

const toggleSelectItem = (item: any) => {
  if (selectedItems.value.has(item)) {
    selectedItems.value.delete(item);
    selectionCount.value--;
  } else {
    selectedItems.value.add(item);
    selectionCount.value++;
  }
  emit("selectionChange", Array.from(selectedItems.value));
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value.clear();
    selectionCount.value = 0;
  } else {
    props.items.forEach((item) => selectedItems.value.add(item));
    selectionCount.value = props.items.length;
  }
  emit("selectionChange", Array.from(selectedItems.value));
};

const clearSelection = () => {
  selectedItems.value.clear();
  selectionCount.value = 0;
  emit("selectionChange", []);
};

// --- Bulk Actions ---
const handleBulkEdit = () => emit("bulkEdit", Array.from(selectedItems.value));
const handleBulkDelete = () => emit("bulkDelete", Array.from(selectedItems.value));
const handleBulkExport = () => emit("bulkExport", Array.from(selectedItems.value));

// --- Actions Helpers ---
const hasAnyAction = computed(
  () => props.hasView || props.hasBlock || props.hasDelete || props.hasEdit || props.hasMarkPaid || props.hasDeactivate
);

const hasDropdownActions = (item: any) =>
  (props.hasDeactivate && normalizedActionConditions.value.deactivate(item)) ||
  (props.hasMarkPaid && normalizedActionConditions.value.markPaid(item)) ||
  (props.hasDelete && normalizedActionConditions.value.delete(item));

const normalizedActionConditions = computed(() => ({
  view: (item: any) => props.actionConditions?.view ? props.actionConditions.view(item) : true,
  block: (item: any) => props.actionConditions?.block ? props.actionConditions.block(item) : true,
  edit: (item: any) => props.actionConditions?.edit ? props.actionConditions.edit(item) : true,
  delete: (item: any) => props.actionConditions?.delete ? props.actionConditions.delete(item) : true,
  markPaid: (item: any) => props.actionConditions?.markPaid ? props.actionConditions.markPaid(item) : true,
  deactivate: (item: any) => props.actionConditions?.deactivate ? props.actionConditions.deactivate(item) : true,
}));

// --- Sorting ---
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
  return [...props.items].sort((a, b) => {
    const aValue = getValue(a, sortColumn.value!);
    const bValue = getValue(b, sortColumn.value!);
    if (aValue == null) return sortDirection.value === "asc" ? 1 : -1;
    if (bValue == null) return sortDirection.value === "asc" ? -1 : 1;
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection.value === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    const cmp = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortDirection.value === "asc" ? cmp : -cmp;
  });
});

// --- Role Styling ---
const getRoleClass = (role: string) => {
  if (!role) return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (r.includes("MANAGER")) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
  if (r.includes("HR") || r.includes("PERSONNEL")) return "bg-purple-500/10 text-purple-400 border-purple-500/30";
  if (r.includes("AUDITOR")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
  if (r.includes("TECHNICIAN") || r.includes("ENGINEER")) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  if (r.includes("SECURITY")) return "bg-rose-500/10 text-rose-400 border-rose-500/30";
  if (r.includes("OPERATIONS")) return "bg-teal-500/10 text-teal-400 border-teal-500/30";
  return "bg-gray-500/10 text-gray-400 border-gray-500/20";
};

const formatRole = (role: string) => {
  if (!role) return "";
  return role
    .split(/[_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

// --- Pagination ---
const internalCurrentPage = ref(1);
const internalPageSize = ref(10);

const effectiveCurrentPage = computed(() => props.currentPage || internalCurrentPage.value);
const effectiveTotalItems = computed(() =>
  props.totalItems !== undefined ? props.totalItems : props.items.length
);
const effectiveTotalPages = computed(() =>
  props.totalPages !== undefined
    ? props.totalPages
    : Math.ceil(effectiveTotalItems.value / internalPageSize.value)
);

const effectivePageSize = computed(() => {
  if (props.pageSize != null && props.pageSize > 0) return props.pageSize;
  if (props.totalItems === undefined) return internalPageSize.value;
  return Math.max(props.items.length, 1);
});

const displayStartIndex = computed(() => {
  const size = effectivePageSize.value;
  return (effectiveCurrentPage.value - 1) * size;
});
const displayEndIndex = computed(() =>
  Math.min(displayStartIndex.value + props.items.length, effectiveTotalItems.value)
);

const goToPage = (page: number) => {
  if (props.currentPage !== undefined) {
    emit("pageChange", page);
  } else {
    internalCurrentPage.value = page;
  }
};

const handleScroll = (_event: Event) => { };
</script>

<style scoped>
.scroll-container::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #374151;
}

.smooth-scroll {
  scroll-behavior: smooth;
}
</style>