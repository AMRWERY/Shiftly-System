<template>
  <div>
    <!-- OPEN BUTTON -->
    <LazyVButton type="button" variant="ghost" text-color="text-gray-400"
      class="relative rounded-xl border border-white/10 bg-white/5 p-1.5 transition-all hover:bg-white/10"
      @click.stop="isOpen = !isOpen">
      <Icon name="material-symbols:notifications-outline-rounded"
        class="h-7 w-7 rounded-full bg-gray-200 p-0.5 hover:bg-gray-400" />
      <span
        class="absolute -end-0.5 -top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300 animate-ping" />
      <span
        class="absolute -end-0.5 -top-0.5 h-[7px] w-[7px] rounded-full bg-gradient-to-b from-indigo-300 to-blue-300" />
    </LazyVButton>

    <!-- DROPDOWN DIALOG -->
    <Transition name="fade">
      <div v-if="isOpen" ref="dropdownRef" class="fixed inset-0 z-[1000] flex justify-end font-sans">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-black/50" @click="closeDialog" />

        <!-- SIDEPANEL -->
        <div
          class="relative z-[1001] h-screen w-full max-w-md border-s border-white/5 bg-brand-layoutBg shadow-2xl flex flex-col">

          <!-- HEADER -->
          <div class="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 class="text-base font-semibold text-gray-100">
              Notifications
            </h3>
            <div class="flex items-center gap-4">
              <button class="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Mark all as read
              </button>
              <button @click="closeDialog"
                class="text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center">
                <Icon name="material-symbols:close-rounded" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- TABS -->
          <div class="flex items-center gap-6 px-6 border-b border-white/5">
            <button class="pb-3 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500 relative -mb-[1px]">
              All
            </button>
            <button
              class="pb-3 text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center gap-1.5 relative -mb-[1px]">
              Unread <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400">2</span>
            </button>
            <button
              class="pb-3 text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center gap-1.5 relative -mb-[1px]">
              Approvals <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400">1</span>
            </button>
          </div>

          <!-- LIST -->
          <div class="flex-1 overflow-y-auto hide-scrollbar">
            <ul class="flex flex-col">
              <li v-for="(item, index) in mockNotifications" :key="index"
                class="relative flex items-start gap-4 p-5 hover:bg-white/[0.04] transition-colors border-t border-white/5 first:border-t-0"
                :class="item.unread ? 'border-s-[3px] border-s-indigo-500 bg-white/[0.02]' : 'border-s-[3px] border-s-transparent bg-transparent'">
                <div class="flex-shrink-0 mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl"
                  :class="item.iconBg">
                  <Icon :name="item.icon" class="w-6 h-6" :class="item.iconColor" />
                </div>
                <div class="flex-grow">
                  <div class="flex items-center justify-between mb-1.5">
                    <p class="text-sm font-medium text-gray-200">{{ item.title }}</p>
                    <span class="text-[11px] font-medium tracking-wider text-gray-500 uppercase">{{ item.time }}</span>
                  </div>
                  <p class="text-sm text-gray-400 leading-snug">{{ item.description }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- FOOTER -->
          <div class="p-4 text-center border-t border-white/5 bg-black/10">
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
const { t } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

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
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDialog()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>