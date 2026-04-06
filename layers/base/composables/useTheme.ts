import type { Theme } from '~/stores/theme'

export function useTheme() {
  const theme = useCookie<Theme>('theme', { default: () => 'system' })
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  const resolvedTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') return prefersDark.value ? 'dark' : 'light'
    return theme.value
  })

  function setTheme(t: Theme) {
    theme.value = t
    applyTheme(resolvedTheme.value)
  }

  function applyTheme(t: 'light' | 'dark') {
    if (import.meta.client) {
      document.documentElement.dataset.theme = t
      document.documentElement.classList.toggle('dark', t === 'dark')
    }
  }

  watch(resolvedTheme, applyTheme, { immediate: true })

  return { theme, resolvedTheme, setTheme }
}
