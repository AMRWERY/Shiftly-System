// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="./.nuxt/nuxt.d.ts" />
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // Extend the base layer for shared functionality
  extends: ["../../layers/base"],

  app: {
    head: {
      titleTemplate: "%s - Shiftly Inventory Manager",
    },
  },
});
