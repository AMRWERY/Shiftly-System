<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('payroll', 'create') || hasPermission('payroll', 'view')">
        <LazyVButton @click="toggleDropdown('payroll')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.payroll")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.payroll }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.payroll" class="py-2 space-y-2">
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/monthly-process" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/monthly-process') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.monthly_process")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'view')">
            <nuxt-link-locale to="/salary-components" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/salary-components') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.salary_components")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/payslips-generation" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/payslips-generation') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
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
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.expenses_advances")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.expenses_advances }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.expenses_advances" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/expense-claims-mgt" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/expense-claims-mgt') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.expense_claims_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/deduction-schedules" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/deduction-schedules') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
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
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.invoicing")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.invoicing }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.invoicing" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/sales-invoices" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/sales-invoices') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.sales_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/purchase-invoices" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/purchase-invoices') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.purchase_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/accounts-receivable-payable" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/accounts-receivable-payable') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
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
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.financial_reports")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.financial_reports }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.financial_reports" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/p-l-basic" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/p-l-basic') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.p_l_basic")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cash-flow-summary" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/cash-flow-summary') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.cash_flow_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cost-center-analysis" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/cost-center-analysis') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
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