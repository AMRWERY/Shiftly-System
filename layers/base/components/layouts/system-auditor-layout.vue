<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('compliance_overview')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.compliance_overview")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.compliance_overview }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.compliance_overview" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/status-summary" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/status-summary') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.status_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/policy-violations" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/policy-violations') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.policy_violations")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('audit_logs')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.audit_logs")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.audit_logs }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.audit_logs" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/all-system-activity" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/all-system-activity') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.all_system_activity")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/financial-transactions" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/financial-transactions') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.financial_transactions")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/inventory-adjustments" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/inventory-adjustments') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.inventory_adjustments")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <LazyVButton @click="toggleDropdown('payroll_finance_review')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.payroll_finance_review")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.payroll_finance_review }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.payroll_finance_review" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/payroll-reports" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/payroll-reports') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.payroll_reports")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/expense-claims-audit" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/expense-claims-audit') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.expense_claims_audit")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/invoicing-verification" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/invoicing-verification') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.invoicing_verification")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <LazyVButton @click="toggleDropdown('inventory_audit')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.inventory_audit")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.inventory_audit }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.inventory_audit" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/stock-take-discrepancies" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/stock-take-discrepancies') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_take_discrepancies")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/movement-verification" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/movement-verification') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.movement_verification")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quality-control-checks" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/quality-control-checks') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
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
defineProps<{ collapsed?: boolean }>()
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = useAppPermissions();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  compliance_overview: true,
  audit_logs: false,
  payroll_finance_review: false,
  inventory_audit: false,
});
</script>