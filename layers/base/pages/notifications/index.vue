<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <!-- MAIN CARD -->
    <div
      class="rounded-2xl border border-white/5 bg-brand-layoutBg shadow-xl overflow-hidden"
    >
      <!-- TABS -->
      <div
        class="flex items-center gap-8 px-6 border-b border-white/5 bg-black/10"
      >
        <button
          class="py-4 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500 relative -mb-[1px]"
        >
          All
        </button>
        <button
          class="py-4 text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center gap-2 relative -mb-[1px]"
        >
          Unread
          <span
            class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400"
            >2</span
          >
        </button>
        <button
          class="py-4 text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center gap-2 relative -mb-[1px]"
        >
          Approvals
          <span
            class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] text-indigo-400"
            >1</span
          >
        </button>
      </div>

      <!-- LIST -->
      <div class="flex-1">
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in mockNotifications"
            :key="index"
            class="relative flex items-start gap-4 p-5 md:p-6 hover:bg-white/[0.04] transition-colors border-t border-white/5 first:border-t-0"
            :class="
              item.unread
                ? 'border-s-[3px] border-s-indigo-500 bg-white/[0.02]'
                : 'border-s-[3px] border-s-transparent bg-transparent'
            "
          >
            <div
              class="flex-shrink-0 mt-0.5 flex h-12 w-12 items-center justify-center rounded-xl"
              :class="item.iconBg"
            >
              <Icon :name="item.icon" class="w-6 h-6" :class="item.iconColor" />
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-base font-medium text-gray-200">
                  {{ item.title }}
                </p>
                <span
                  class="text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >{{ item.time }}</span
                >
              </div>
              <p class="text-sm text-gray-400 leading-snug">
                {{ item.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const mockNotifications = [
  {
    title: "Expense Approval Pending",
    time: "2 MIN AGO",
    description: "Project Alpha travel expenses require review",
    unread: true,
    icon: "material-symbols:pie-chart-outline",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "Leave Request Approved",
    time: "1 HOUR AGO",
    description: "Your leave for Dec 20-24 has been approved.",
    unread: false,
    icon: "material-symbols:check-circle-outline-rounded",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "System Access Rejected",
    time: "3 HOURS AGO",
    description: "Access request for Vault 04 was denied.",
    unread: true,
    icon: "material-symbols:cancel-outline-rounded",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
  },
  {
    title: "Shift Reminder",
    time: "2 HOURS AGO",
    description: "Your morning shift starts in 2 hours.",
    unread: false,
    icon: "material-symbols:info-outline-rounded",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
];

definePageMeta({
  layout: "dashboard",
});

useSeoPage({
  title: () => t("meta.notifications"),
  description: () => t("meta.notifications_description"),
  private: true,
});
</script>
