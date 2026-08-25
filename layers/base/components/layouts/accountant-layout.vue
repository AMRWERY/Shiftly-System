<template>
  <div>
    <ul class="space-y-1">
      <li>
        <nuxt-link-locale
          to="/monthly-process"
          class="sidebar-nav-link group"
          :class="
            isActive('/monthly-process')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:calendar-clock-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/monthly-process')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.monthly_process")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/salary-components"
          class="sidebar-nav-link group"
          :class="
            isActive('/salary-components')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:account-balance-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/salary-components')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.salary_components")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/payslips-generation"
          class="sidebar-nav-link group"
          :class="
            isActive('/payslips-generation')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:receipt-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/payslips-generation')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.payslips_generation")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/expense-claims-mgt"
          class="sidebar-nav-link group"
          :class="
            isActive('/expense-claims-mgt')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:receipt-long-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/expense-claims-mgt')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.expense_claims_mgt")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/deduction-schedules"
          class="sidebar-nav-link group"
          :class="
            isActive('/deduction-schedules')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:remove-circle-outline-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/deduction-schedules')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.deduction_schedules")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/sales-invoices"
          class="sidebar-nav-link group"
          :class="
            isActive('/sales-invoices')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:point-of-sale-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/sales-invoices')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.sales_invoices")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/purchase-invoices"
          class="sidebar-nav-link group"
          :class="
            isActive('/purchase-invoices')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:shopping-cart-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/purchase-invoices')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.purchase_invoices")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/accounts-receivable-payable"
          class="sidebar-nav-link group"
          :class="
            isActive('/accounts-receivable-payable')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:account-balance-wallet-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/accounts-receivable-payable')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.accounts_receivable_payable")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/p-l-basic"
          class="sidebar-nav-link group"
          :class="
            isActive('/p-l-basic')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:bar-chart-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/p-l-basic')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.p_l_basic")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/cash-flow-summary"
          class="sidebar-nav-link group"
          :class="
            isActive('/cash-flow-summary')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:trending-up-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/cash-flow-summary')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.cash_flow_summary")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/cost-center-analysis"
          class="sidebar-nav-link group"
          :class="
            isActive('/cost-center-analysis')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:analytics-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/cost-center-analysis')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.cost_center_analysis")
          }}</span>
        </nuxt-link-locale>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = useAppPermissions();

defineProps<{ collapsed?: boolean }>();
</script>