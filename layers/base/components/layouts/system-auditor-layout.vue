<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('compliance_overview')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.compliance_overview")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.compliance_overview }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.compliance_overview" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/status-summary" class="sidebar-nav-child-link group"
              :class="isActive('/status-summary') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.status_summary")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/policy-violations" class="sidebar-nav-child-link group"
              :class="isActive('/policy-violations') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
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
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.audit_logs")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.audit_logs }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.audit_logs" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/all-system-activity" class="sidebar-nav-child-link group"
              :class="isActive('/all-system-activity') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.all_system_activity")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/financial-transactions" class="sidebar-nav-child-link group"
              :class="isActive('/financial-transactions') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.financial_transactions")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/inventory-adjustments" class="sidebar-nav-child-link group"
              :class="isActive('/inventory-adjustments') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
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
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.payroll_finance_review")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.payroll_finance_review }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.payroll_finance_review" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/payroll-reports" class="sidebar-nav-child-link group"
              :class="isActive('/payroll-reports') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.payroll_reports")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/expense-claims-audit" class="sidebar-nav-child-link group"
              :class="isActive('/expense-claims-audit') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.expense_claims_audit")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/invoicing-verification" class="sidebar-nav-child-link group"
              :class="isActive('/invoicing-verification') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
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
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.inventory_audit")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.inventory_audit }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.inventory_audit" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/stock-take-discrepancies" class="sidebar-nav-child-link group"
              :class="isActive('/stock-take-discrepancies') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.stock_take_discrepancies")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/movement-verification" class="sidebar-nav-child-link group"
              :class="isActive('/movement-verification') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.movement_verification")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quality-control-checks" class="sidebar-nav-child-link group"
              :class="isActive('/quality-control-checks') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
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