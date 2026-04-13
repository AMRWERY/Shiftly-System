<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('payroll', 'create') || hasPermission('payroll', 'view')">
        <LazyVButton @click="toggleDropdown('payroll')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.payroll")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.payroll }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.payroll" class="sidebar-section-list">
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/monthly-process" class="sidebar-nav-child-link group"
              :class="isActive('/monthly-process') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.monthly_process")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'view')">
            <nuxt-link-locale to="/salary-components" class="sidebar-nav-child-link group"
              :class="isActive('/salary-components') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.salary_components")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/payslips-generation" class="sidebar-nav-child-link group"
              :class="isActive('/payslips-generation') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.payslips_generation")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('payroll', 'approve')">
        <LazyVButton @click="toggleDropdown('expenses_advances')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.expenses_advances")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.expenses_advances }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.expenses_advances" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/expense-claims-mgt" class="sidebar-nav-child-link group"
              :class="isActive('/expense-claims-mgt') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.expense_claims_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/deduction-schedules" class="sidebar-nav-child-link group"
              :class="isActive('/deduction-schedules') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.deduction_schedules")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('invoices', 'view')">
        <LazyVButton @click="toggleDropdown('invoicing')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.invoicing")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.invoicing }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.invoicing" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/sales-invoices" class="sidebar-nav-child-link group"
              :class="isActive('/sales-invoices') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.sales_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/purchase-invoices" class="sidebar-nav-child-link group"
              :class="isActive('/purchase-invoices') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.purchase_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/accounts-receivable-payable" class="sidebar-nav-child-link group"
              :class="isActive('/accounts-receivable-payable') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.accounts_receivable_payable")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('financial_reports')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.financial_reports")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.financial_reports }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.financial_reports" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/p-l-basic" class="sidebar-nav-child-link group"
              :class="isActive('/p-l-basic') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.p_l_basic")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cash-flow-summary" class="sidebar-nav-child-link group"
              :class="isActive('/cash-flow-summary') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.cash_flow_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cost-center-analysis" class="sidebar-nav-child-link group"
              :class="isActive('/cost-center-analysis') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.cost_center_analysis")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ collapsed?: boolean }>()
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = useAppPermissions();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  payroll: true,
  expenses_advances: false,
  invoicing: false,
  financial_reports: false,
});
</script>