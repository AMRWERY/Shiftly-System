// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="../../apps/maintenance-technician/.nuxt/nuxt.d.ts" />

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDir, "../..");

// Load environment variables from root .env file
config({ path: join(rootDir, ".env") });

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  modules: [
    "@pinia/nuxt", // Load Pinia first to ensure proper initialization
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {
        config: join(currentDir, "./tailwind.config.ts"),
      },
      autoprefixer: {},
    },
  },
  // Pinia configuration
  pinia: {
    storesDirs: ["./stores/**"],
  },
  // VeeValidate configuration
  veeValidate: {
    autoImports: true,
  },
  // I18n configuration
  // https://i18n.nuxtjs.org/
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      {
        code: "ar",
        iso: "ar-EG",
        file: "ar.json",
        name: "العربية",
        dir: "rtl",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
      redirectOn: "root",
    },
  },
  // Supabase configuration
  // https://supabase.nuxtjs.org/getting-started/introduction
  supabase: {
    redirect: false,
    types: false,
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  // Vite configuration to fix dependency resolution issues
  vite: {
    optimizeDeps: {
      exclude: ["cookie"],
      include: ["@supabase/supabase-js", "@supabase/postgrest-js"],
    },
  },
  // Nitro configuration
  nitro: {
    esbuild: {
      options: {
        target: "node20",
      },
    },
  },
  css: [
    join(currentDir, "./assets/css/tailwind.css"),
    join(currentDir, "./assets/css/main.css"),
  ],
  alias: {
    "@types": join(currentDir, "types"),
    "@locales": join(currentDir, "locales"),
    "@assets": join(currentDir, "assets"),
    "@public": join(currentDir, "public"),
  },
  components: [
    {
      path: join(currentDir, "components"),
    },
    {
      path: join(currentDir, "components/shared"),
    },
    {
      path: join(currentDir, "components/layouts-components"),
    },
    {
      path: join(currentDir, "components/auth-forms"),
    },
    // {
    //   path: join(currentDir, "components/dialogs"),
    // },
  ],
  app: {
    head: {
      title: "Shiftly",
      script: [{}],
      noscript: [],
      link: [{}],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
