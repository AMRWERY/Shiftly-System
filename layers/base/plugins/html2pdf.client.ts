import { defineNuxtPlugin } from 'nuxt/app'
import html2pdf from 'html2pdf.js'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      html2pdf
    }
  }
}) 