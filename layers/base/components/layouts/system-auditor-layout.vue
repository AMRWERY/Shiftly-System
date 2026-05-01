<template>
  <div>
    <ul class="space-y-1">
      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/status-summary" class="sidebar-nav-link group"
          :class="isActive('/status-summary') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:shield-rounded" class="sidebar-section-icon"
            :class="isActive('/status-summary') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.status_summary") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/policy-violations" class="sidebar-nav-link group"
          :class="isActive('/policy-violations') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:gpp-bad-rounded" class="sidebar-section-icon"
            :class="isActive('/policy-violations') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.policy_violations") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/all-system-activity" class="sidebar-nav-link group"
          :class="isActive('/all-system-activity') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:manage-history-rounded" class="sidebar-section-icon"
            :class="isActive('/all-system-activity') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.all_system_activity") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/financial-transactions" class="sidebar-nav-link group"
          :class="isActive('/financial-transactions') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:payments-rounded" class="sidebar-section-icon"
            :class="isActive('/financial-transactions') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.financial_transactions") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/inventory-adjustments" class="sidebar-nav-link group"
          :class="isActive('/inventory-adjustments') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:tune-rounded" class="sidebar-section-icon"
            :class="isActive('/inventory-adjustments') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.inventory_adjustments") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/payroll-reports" class="sidebar-nav-link group"
          :class="isActive('/payroll-reports') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:bar-chart-rounded" class="sidebar-section-icon"
            :class="isActive('/payroll-reports') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.payroll_reports") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/expense-claims-audit" class="sidebar-nav-link group"
          :class="isActive('/expense-claims-audit') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:receipt-long-rounded" class="sidebar-section-icon"
            :class="isActive('/expense-claims-audit') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.expense_claims_audit") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/invoicing-verification" class="sidebar-nav-link group"
          :class="isActive('/invoicing-verification') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:verified-rounded" class="sidebar-section-icon"
            :class="isActive('/invoicing-verification') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.invoicing_verification") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/stock-take-discrepancies" class="sidebar-nav-link group"
          :class="isActive('/stock-take-discrepancies') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:inventory-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-take-discrepancies') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.stock_take_discrepancies") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/movement-verification" class="sidebar-nav-link group"
          :class="isActive('/movement-verification') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:swap-horiz-rounded" class="sidebar-section-icon"
            :class="isActive('/movement-verification') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.movement_verification") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/quality-control-checks" class="sidebar-nav-link group"
          :class="isActive('/quality-control-checks') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:fact-check-rounded" class="sidebar-section-icon"
            :class="isActive('/quality-control-checks') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.quality_control_checks") }}</span>
        </nuxt-link-locale>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ collapsed?: boolean }>()
const { t } = useI18n()
const { isActive } = useIsActive()
const { hasPermission } = useAppPermissions()
</script>
