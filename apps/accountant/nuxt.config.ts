// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="./.nuxt/nuxt.d.ts" />
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Extend the base layer for shared functionality
  extends: ["../../layers/base"],
});
