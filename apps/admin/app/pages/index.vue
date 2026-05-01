<template>
  <div>
    <div class="min-h-screen bg-brand-systemBg text-tx-secondary p-4">
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Top Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <stat-card label="Total Employees" value="1,248" trend="1.2%" :trendUp="true" iconBg="bg-blue-900/30"
            iconColor="text-blue-400">
            <template #icon><img src="/svg/employees.svg" class="w-5 h-5" alt="employees" /></template>
          </stat-card>

          <stat-card label="Today's Attendance" value="94.2%" trend="0.5%" :trendUp="false" iconBg="bg-emerald-900/30"
            iconColor="text-emerald-400">
            <template #icon><img src="/svg/attendance.svg" class="w-5 h-5" alt="attendance" /></template>
          </stat-card>

          <stat-card label="Monthly Payroll" value="$4.2M" trend="2.1%" :trendUp="true" iconBg="bg-indigo-900/30"
            iconColor="text-indigo-400">
            <template #icon><img src="/svg/payroll.svg" class="w-5 h-5" alt="payroll" /></template>
          </stat-card>

          <stat-card label="Inventory Value" value="$850k" trend="Stable" :trendUp="true" iconBg="bg-amber-900/30"
            iconColor="text-amber-400">
            <template #icon><img src="/svg/inventory.svg" class="w-5 h-5" alt="inventory" /></template>
          </stat-card>
        </div>

        <!-- Actions Bar -->
        <actions-bar />

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Attendance Trend (Main Chart Area) -->
          <div class="lg:col-span-2 card-bg p-6">
            <div class="flex justify-between items-center mb-12">
              <div>
                <h3 class="text-tx-primary font-bold">30-Day Attendance Trend</h3>
                <p class="text-xs text-gray-500">Tracking aggregate attendance across all departments</p>
              </div>
              <LazyVButton :variant="'ghost'" :text-color="'text-gray-400'"
                class="bg-[var(--bg-hover)] text-[10px] px-3 py-1 rounded-lg hover:bg-[var(--bg-hover-strong)]">
                Last 30 Days
              </LazyVButton>
            </div>

            <!-- Decorative SVG Wave -->
            <div class="h-64 relative">
              <svg viewBox="0 0 800 200" class="w-full h-full">
                <path d="M0,150 Q100,160 200,120 T400,110 T600,80 T800,120" fill="none" class="stroke-brand-primary"
                  stroke-width="3" />
                <path d="M0,150 Q100,160 200,120 T400,110 T600,80 T800,120 V200 H0 Z" fill="url(#grad)" opacity="0.1" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" class="stop-color-brand-primary" style="stop-opacity:1" />
                    <stop offset="100%" class="stop-color-brand-primary" style="stop-opacity:0" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-600 px-2 font-bold">
                <span>01 Oct</span><span>08 Oct</span><span>15 Oct</span><span>22 Oct</span><span>31 Oct</span>
              </div>
            </div>
          </div>

          <!-- Right Column (Donut + Health) -->
          <div class="flex flex-col gap-6">
            <department-distribution />

            <system-health />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

definePageMeta({
  layout: 'dashboard'
})
</script>