import type * as XLSX from 'xlsx'

interface Html2PdfInstance {
  from: (element: HTMLElement) => Html2PdfInstance
  set: (options: any) => Html2PdfInstance
  save: () => Promise<void>
  output: (type: string) => any
  then: (callback: (pdf: any) => void) => Html2PdfInstance
}

declare module '#app' {
  interface NuxtApp {
    $xlsx: typeof XLSX
    $html2pdf: () => Html2PdfInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $xlsx: typeof XLSX
    $html2pdf: () => Html2PdfInstance
  }
}

export {}