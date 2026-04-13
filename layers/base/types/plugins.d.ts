import type * as XLSX from 'xlsx';
import type jsPDF from 'jspdf';
import type autoTable from 'jspdf-autotable';

declare module '#app' {
  interface NuxtApp {
    $xlsx: typeof XLSX;
    $jsPDF: typeof jsPDF;
    $jsPdfAutoTable: typeof autoTable;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $xlsx: typeof XLSX;
    $jsPDF: typeof jsPDF;
    $jsPdfAutoTable: typeof autoTable;
  }
}

export {};
