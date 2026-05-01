import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: ["class", '[data-theme="dark"]'], // Supports both `class="dark"` and `data-theme="dark"`
  theme: {
    extend: {
      colors: {
        brand: {
          systemBg: "rgb(var(--bg-base-rgb) / <alpha-value>)",
          layoutBg: "rgb(var(--bg-primary-rgb) / <alpha-value>)",
          cardBg: "rgb(var(--bg-elevated-rgb) / 0.7)",
          primary: "rgb(var(--brand-rgb) / <alpha-value>)",
          secondary: "rgb(var(--brand-secondary-rgb) / <alpha-value>)",
          accent: "rgb(var(--success-rgb) / <alpha-value>)",
          danger: "rgb(var(--danger-rgb) / <alpha-value>)",
          warning: "rgb(var(--warning-rgb) / <alpha-value>)",
        },
        // Semantic background tokens
        bg: {
          base: "rgb(var(--bg-base-rgb) / <alpha-value>)",
          primary: "rgb(var(--bg-primary-rgb) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          overlay: "rgb(var(--bg-overlay-rgb) / <alpha-value>)",
        },
        // Semantic text tokens
        tx: {
          primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
          muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        },
        // Light grays for backgrounds or cards
        lightsmoke: "#F5F5F5",
        gainsboro: "#DCDCDC",
        cultured: "#F3F4F6", // softer gray
        silversand: "#C4C4C4",
        // Legacy text colors kept for backwards compat
        lightText: {
          primary: "#1a1a1a",
          secondary: "#4b4b4b",
          muted: "#757575",
        },
        darkText: {
          primary: "#f8f8f2",
          secondary: "#d6d6d6",
          muted: "#999999",
        },
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      screens: {
        xs: "414px", // iPhone Plus
        sm: "576px", // Small tablets
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false, // we use plugin version
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-rtl"),
  ],
} satisfies Config;
