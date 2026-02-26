---
description: How to create new components following the Premium Dark Theme
---

When creating a new UI component for the Shiftly System, follow these steps to maintain visual consistency:

1. **Check the Style Guide**: Read [STYLE_GUIDE.md](file:///d:/Studying/Not%20Done%20Projects/Shiftly%20System/shiftly/docs/STYLE_GUIDE.md) for the latest tokens.
2. **Use Design Tokens**: Never use hardcoded hex values. Always use Tailwind classes like `bg-brand-systemBg` or `text-brand-primary`.
3. **Apply Component Clases**:
   - For containers/cards, always add the `.card-bg` class and `rounded-2xl`.
   - For buttons, use the established patterns (Solid with `brand-primary` or Outline with `border-brand-primary/30`).
4. **Use Base Components**: Whenever possible, extend or use components from `layers/base/components/shared/` like `base-button.vue`.
5. **Add Glassmorphism**: For any floating element, header, or card, ensure `backdrop-blur-md` is applied via the `.card-bg` utility.

### Example Template

```vue
<template>
  <div class="card-bg p-6 rounded-2xl shadow-xl">
    <!-- Content here -->
  </div>
</template>
```
