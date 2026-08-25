<template>
  <div>
    <div class="relative w-max mx-auto" ref="dropdownContainer">
      <LazyVButton
        type="button"
        variant="outline"
        border-color="border-gray-700"
        text-color="text-white"
        hover-color="hover:bg-white/10"
        padding-x="px-5"
        padding-y="py-2.5"
        class="font-semibold !justify-start"
        @click="isOpen = !isOpen"
      >
        {{ t("menu.download") }}
        <Icon
          name="ic:sharp-keyboard-arrow-down"
          class="h-5 w-5 shrink-0 ms-3 text-gray-400 transition-transform duration-200 ease-out"
          :class="{ 'rotate-180': isOpen }"
        />
      </LazyVButton>

      <ul
        v-show="isOpen"
        class="absolute block shadow-2xl bg-brand-cardBg border border-gray-700 py-2 px-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto mt-2"
      >
        <li
          @click="downloadData('pdf')"
          class="dropdown-item py-2.5 px-4 hover:bg-white/5 text-gray-200 rounded-md text-sm font-medium cursor-pointer transition-colors"
        >
          <div class="flex items-center">
            <div class="flex items-center gap-3">
              <Icon name="vscode-icons:file-type-pdf2" />
              {{ t("menu.download_as_pdf") }}
            </div>
          </div>
        </li>
        <li
          @click="downloadData('excel')"
          class="dropdown-item py-2.5 px-4 hover:bg-white/5 text-gray-200 rounded-md text-sm font-medium cursor-pointer transition-colors"
        >
          <div class="flex items-center">
            <div class="flex items-center gap-3">
              <Icon name="vscode-icons:file-type-excel" />
              {{ t("menu.download_as_excel") }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from "@/types/tables";

const props = withDefaults(
  defineProps<{
    allItems?: Array<any>;
    items?: Array<any>;
    columns?: Column<any>[];
    fileNameBase?: string;
  }>(),
  {
    allItems: () => [],
    items: () => [],
    columns: () => [],
    fileNameBase: "exported_data",
  }
);

const { t } = useI18n();
const { triggerToast } = useToast();
const { $xlsx, $jsPDF, $jsPdfAutoTable } = useNuxtApp();
const xlsx = $xlsx as typeof import("xlsx");
const JsPDF = $jsPDF as typeof import("jspdf").default;
const autoTable = $jsPdfAutoTable as typeof import("jspdf-autotable").default;

const isOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

const allItemsToExport = computed(() => props.allItems?.length ? props.allItems : (props.items || []));
const fileNameToUse = computed(() => {
  const base = props.fileNameBase || "exported_data";
  return `${base}_${new Date().toISOString().split("T")[0]}`;
});

const exportableColumns = computed(() => {
  return (props.columns || []).filter((col) => col.key && col.key !== "actions");
});

const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const getFormattedCellValue = (
  item: any,
  column: Column<any>,
  index: number,
): string => {
  if (column.format) {
    try {
      const formatted = column.format(item, index);
      return String(formatted ?? "");
    } catch {
      if (typeof column.key === "string" && column.key.includes(".")) {
        const keys = column.key.split(".");
        let value = item;
        for (const k of keys) {
          if (value && typeof value === "object" && k in value)
            value = value[k];
          else return "";
        }
        return String(value ?? "");
      }
      return String(item[column.key as keyof typeof item] ?? "");
    }
  }
  if (typeof column.key !== "string") {
    return item && column.key in item
      ? String(item[column.key as keyof typeof item] ?? "")
      : "";
  }
  const keys = column.key.split(".");
  let value = item;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) value = value[k];
    else return "";
  }
  return String(value ?? "");
};

/** Pure-data PDF using jsPDF + AutoTable — no html2canvas, no DOM side-effects */
const exportToPdf = (
  headers: string[],
  dataRows: string[][],
  fileName: string,
): boolean => {
  if (!JsPDF || !autoTable) return false;
  try {
    const doc = new JsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    autoTable(doc, {
      head: [headers],
      body: dataRows,
      styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak" },
      headStyles: {
        fillColor: [242, 242, 242],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      margin: { top: 36, right: 28, bottom: 36, left: 28 },
    });

    doc.save(`${fileName}.pdf`);
    return true;
  } catch {
    return false;
  }
};

const exportToExcel = (
  headers: string[],
  dataRows: string[][],
  fileName: string,
): boolean => {
  if (!xlsx) return false;
  try {
    const wsData = [headers, ...dataRows];
    const ws = xlsx.utils.aoa_to_sheet(wsData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, `${fileName}.xlsx`);
    return true;
  } catch {
    return false;
  }
};

const downloadData = (format: "pdf" | "excel") => {
  isOpen.value = false;
  if (!allItemsToExport.value || allItemsToExport.value.length === 0) {
    triggerToast({
      message: t("toast.no_data_to_export"),
      type: "warning",
      icon: "ic:baseline-warning",
    });
    return;
  }

  const columnsToExport = exportableColumns.value.filter((col) => {
    if (col.key === "avatar") return false;
    return true;
  });

  const headers = columnsToExport.map((col) => col.label || String(col.key));

  const dataRows = allItemsToExport.value.map((item, index) =>
    columnsToExport.map((col) =>
      stripHtml(getFormattedCellValue(item, col, index)),
    ),
  );

  const fileName = fileNameToUse.value;
  let success = false;
  try {
    if (format === "pdf") success = exportToPdf(headers, dataRows, fileName);
    else if (format === "excel")
      success = exportToExcel(headers, dataRows, fileName);

    if (success) {
      const extension = format === "pdf" ? "pdf" : "xlsx";
      triggerToast({
        message: t("toast.download_successful", {
          file: `${fileName}.${extension}`,
        }),
        type: "success",
        icon: "mdi:check-circle-outline",
      });
    } else {
      triggerToast({
        message: t("toast.download_error"),
        type: "error",
        icon: "material-symbols:error-outline-rounded",
      });
    }
  } catch {
    triggerToast({
      message: t("toast.download_error"),
      type: "error",
      icon: "material-symbols:error-outline-rounded",
    });
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));

onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);
</script>
