# Nexux Design System & Style Guide

This document serves as a reference for the "Enterprise Admin" premium dark theme. Use these tokens and patterns when creating new components to ensure visual consistency.

## 🎨 Color Palette

We use a custom `brand` palette defined in `tailwind.config.ts`.

| Token             | Value                   | Usage                                   |
| :---------------- | :---------------------- | :-------------------------------------- |
| `brand-systemBg`  | `#060818`               | Main page background                    |
| `brand-layoutBg`  | `#0B0F19`               | Sidebar and layout containers           |
| `brand-cardBg`    | `rgba(17, 24, 39, 0.7)` | Translucent card/modal backgrounds      |
| `brand-primary`   | `#3b82f6`               | Primary buttons, active states, accents |
| `brand-secondary` | `#1d4ed8`               | Hover states for primary elements       |
| `brand-accent`    | `#10b981`               | Success states, positive trends         |
| `brand-danger`    | `#ef4444`               | Errors, negative trends, deletions      |

## ✨ CSS Utilities

Custom utilities are defined in `assets/css/tailwind.css`.

### Cards & Containers

- `.card-bg`: Applies the glassmorphism effect (translucent background + blur + subtle border).
  ```html
  <div class="card-bg p-6">...</div>
  ```

### Sidebar Links

- `.sidebar-link-active`: Rounded vibrant blue background with a subtle glow.
- `.sidebar-link-hover`: Subtle white highlight on hover.

### Effects

- `.glow-blue`: Adds a soft blue outer glow.

## 📐 Component Guidelines

### Buttons

- **Solid**: Use `bg-brand-primary text-white shadow-lg shadow-blue-500/10 transition-all`.
- **Outline**: Use `border border-brand-primary/30 text-brand-primary bg-transparent hover:bg-brand-primary/10 transition-all`.
- **Radius**: Always use `rounded-xl` for standard buttons and `rounded-full` for icon/circular buttons.

### Cards

- Use `rounded-2xl` for all main content cards.
- Combine with `.card-bg` for the glassmorphism look.

### Typography

- Use `text-white` for primary headings.
- Use `text-gray-400` for secondary/muted labels.

---

## 🚀 Creating New Components

When building a new component, follow this structure:

```vue
<template>
  <div class="card-bg p-6 rounded-2xl">
    <h3 class="text-lg font-bold text-white mb-2">Component Title</h3>
    <p class="text-sm text-gray-400">Description text goes here.</p>

    <div class="mt-4">
      <button
        class="bg-brand-primary text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20"
      >
        Done
      </button>
    </div>
  </div>
</template>
```
