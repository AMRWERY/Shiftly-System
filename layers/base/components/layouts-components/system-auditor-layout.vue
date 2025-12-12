<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button @click="toggleDropdown('compliance_overview')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.compliance_overview")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.compliance_overview }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.compliance_overview" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/status-summary" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.status_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/policy-violations" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.policy_violations")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('audit_logs')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.audit_logs")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.audit_logs }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.audit_logs" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/all-system-activity" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.all_system_activity")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/financial-transactions"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.financial_transactions")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/inventory-adjustments" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.inventory_adjustments")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('payroll_finance_review')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.payroll_finance_review")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.payroll_finance_review }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.payroll_finance_review" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/payroll-reports" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.payroll_reports")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/expense-claims-audit" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.expense_claims_audit")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/invoicing-verification"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.invoicing_verification")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('inventory_audit')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.inventory_audit")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.inventory_audit }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.inventory_audit" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/stock-take-discrepancies"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_take_discrepancies")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/movement-verification" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.movement_verification")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quality-control-checks"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.quality_control_checks")
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

type DropdownNames =
  | "compliance_overview"
  | "audit_logs"
  | "payroll_finance_review"
  | "inventory_audit";

const { dropdownStates } = useSidebarDropdowns({
  compliance_overview: true,
  audit_logs: false,
  payroll_finance_review: false,
  inventory_audit: false,
});

const toggleDropdown = (name: DropdownNames) => {
  dropdownStates.value[name] = !dropdownStates.value[name];
};
</script>