<template>
  <div class="relative" ref="wrapperRef">
    <!-- OPEN BUTTON -->
    <LazyVButton type="button" variant="ghost" padding-x="px-0" padding-y="py-0"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-hover)] hover:bg-[var(--bg-hover-strong)] text-tx-secondary hover:text-tx-primary transition-colors flex-shrink-0"
      @click.stop="isOpen = !isOpen">
      <Icon name="material-symbols:notifications-outline-rounded" class="h-4 w-4" />
      <span
        class="absolute end-0.5 top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300 animate-ping pointer-events-none" />
      <span
        class="absolute end-0.5 top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300 pointer-events-none" />
    </LazyVButton>

    <!-- DROPDOWN DIALOG -->
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[1000] flex justify-end font-sans">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-black/50" @click="closeDialog" />

        <!-- SIDEPANEL -->
        <div
          class="relative z-[1001] h-screen w-full max-w-md border-s border-[var(--border-subtle)] bg-bg-primary shadow-2xl flex flex-col">

          <!-- HEADER -->
          <div class="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 class="text-base font-semibold text-tx-primary">
              Notifications
            </h3>
            <div class="flex items-center gap-4">
              <button class="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Mark all as read
              </button>
              <button @click="closeDialog"
                class="text-tx-muted hover:text-tx-primary transition-colors flex items-center justify-center">
                <Icon name="material-symbols:close-rounded" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- TABS -->
          <div class="flex items-center gap-6 px-6 border-b border-[var(--border-subtle)]">
            <button class="pb-3 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500 relative -mb-[1px]">
              All
            </button>
            <button
              class="pb-3 text-sm font-medium text-tx-secondary hover:text-tx-primary flex items-center gap-1.5 relative -mb-[1px]">
              Unread <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400">2</span>
            </button>
            <button
              class="pb-3 text-sm font-medium text-tx-secondary hover:text-tx-primary flex items-center gap-1.5 relative -mb-[1px]">
              Approvals <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400">1</span>
            </button>
          </div>

          <!-- LIST -->
          <div class="flex-1 overflow-y-auto hide-scrollbar">
            <ul class="flex flex-col">
              <li v-for="(item, index) in mockNotifications" :key="index"
                class="relative flex items-start gap-4 p-5 hover:bg-[var(--bg-hover)] transition-colors border-t border-[var(--border-subtle)] first:border-t-0"
                :class="item.unread ? 'border-s-[3px] border-s-indigo-500 bg-[var(--bg-hover)]' : 'border-s-[3px] border-s-transparent'">
                <div class="flex-shrink-0 mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl"
                  :class="item.iconBg">
                  <Icon :name="item.icon" class="w-6 h-6" :class="item.iconColor" />
                </div>
                <div class="flex-grow">
                  <div class="flex items-center justify-between mb-1.5">
                    <p class="text-sm font-medium text-tx-primary">{{ item.title }}</p>
                    <span class="text-[11px] font-medium tracking-wider text-tx-muted uppercase">{{ item.time }}</span>
                  </div>
                  <p class="text-sm text-tx-secondary leading-snug">{{ item.description }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- FOOTER -->
          <div class="p-4 text-center border-t border-[var(--border-subtle)] bg-[var(--bg-hover)]">
            <NuxtLink to="/notifications"
              class="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-1.5">
              View all notifications
              <Icon name="material-symbols:arrow-forward-rounded" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const mockNotifications = [
  {
    title: 'Expense Approval Pending',
    time: '2 MIN AGO',
    description: 'Project Alpha travel expenses require review',
    unread: true,
    icon: 'material-symbols:pie-chart-outline',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500'
  },
  {
    title: 'Leave Request Approved',
    time: '1 HOUR AGO',
    description: 'Your leave for Dec 20-24 has been approved.',
    unread: false,
    icon: 'material-symbols:check-circle-outline-rounded',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500'
  },
  {
    title: 'System Access Rejected',
    time: '3 HOURS AGO',
    description: 'Access request for Vault 04 was denied.',
    unread: true,
    icon: 'material-symbols:cancel-outline-rounded',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    title: 'Shift Reminder',
    time: '2 HOURS AGO',
    description: 'Your morning shift starts in 2 hours.',
    unread: false,
    icon: 'material-symbols:info-outline-rounded',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  }
]

const closeDialog = () => {
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    closeDialog()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
