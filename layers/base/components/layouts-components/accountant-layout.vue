<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button @click="toggleDropdown('payroll')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.payroll")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.payroll }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.payroll" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/monthly-process" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.monthly_process")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/salary-components" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.salary_components")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/payslips-generation" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.payslips_generation")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('expenses_advances')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.expenses_advances")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.expenses_advances }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.expenses_advances" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/expense-claims-mgt" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.expense_claims_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/deduction-schedules" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.deduction_schedules")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('invoicing')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.invoicing")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.invoicing }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.invoicing" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/sales-invoices" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.sales_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/purchase-invoices" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.purchase_invoices")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/accounts-receivable-payable"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.accounts_receivable_payable")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('financial_reports')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.financial_reports")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.financial_reports }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.financial_reports" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/p-l-basic" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.p_l_basic")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cash-flow-summary" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.cash_flow_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cost-center-analysis" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
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
const { t } = useI18n();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  payroll: true,
  expenses_advances: false,
  invoicing: false,
  financial_reports: false,
});
</script>