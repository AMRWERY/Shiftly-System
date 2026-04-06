export type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: 'system' as Theme,
  }),

  actions: {
    set(theme: Theme) {
      this.current = theme
      this.apply()
    },

    apply() {
      if (!import.meta.client) return
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const resolved = this.current === 'system' ? (prefersDark ? 'dark' : 'light') : this.current
      document.documentElement.dataset.theme = resolved
      document.documentElement.classList.toggle('dark', resolved === 'dark')
    },

    init() {
      const saved = useCookie<Theme>('theme')
      if (saved.value) this.current = saved.value
      this.apply()
    },
  },

  getters: {
    isDark: (state) => {
      if (state.current === 'dark') return true
      if (state.current === 'light') return false
      if (import.meta.client) return window.matchMedia('(prefers-color-scheme: dark)').matches
      return false
    },
  },
})
