export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true,
    isMobileOpen: false,
    activeGroup: null as string | null,
  }),

  actions: {
    open() { this.isOpen = true },
    close() { this.isOpen = false },
    toggle() { this.isOpen = !this.isOpen },

    openMobile() { this.isMobileOpen = true },
    closeMobile() { this.isMobileOpen = false },
    toggleMobile() { this.isMobileOpen = !this.isMobileOpen },

    setActiveGroup(group: string | null) {
      this.activeGroup = this.activeGroup === group ? null : group
    },
  },

  getters: {
    isCollapsed: (state) => !state.isOpen,
  },
})
