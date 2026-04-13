<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('profile', 'view')">
        <LazyVButton @click="toggleDropdown('my_profile')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.my_profile")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.my_profile }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.my_profile" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/personal-info" class="sidebar-nav-child-link group"
              :class="isActive('/personal-info') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.personal_info")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/contact-details" class="sidebar-nav-child-link group"
              :class="isActive('/contact-details') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.contact_details")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/qualifications" class="sidebar-nav-child-link group"
              :class="isActive('/qualifications') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.qualifications")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('leave', 'create') || hasPermission('payroll', 'create')">
        <LazyVButton @click="toggleDropdown('my_requests')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.my_requests")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.my_requests }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.my_requests" class="sidebar-section-list">
          <li v-if="hasPermission('leave', 'create')">
            <nuxt-link-locale to="/leave-request" class="sidebar-nav-child-link group"
              :class="isActive('/leave-request') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.leave_request")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/expense-claim" class="sidebar-nav-child-link group"
              :class="isActive('/expense-claim') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.expense_claim")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'create')">
            <nuxt-link-locale to="/advance-request" class="sidebar-nav-child-link group"
              :class="isActive('/advance-request') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.advance_request")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/request-status" class="sidebar-nav-child-link group"
              :class="isActive('/request-status') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.request_status")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <LazyVButton @click="toggleDropdown('payroll_docs')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.payroll_docs")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.payroll_docs }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.payroll_docs" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/payslips" class="sidebar-nav-child-link group"
              :class="isActive('/payslips') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.payslips")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/tax-documents" class="sidebar-nav-child-link group"
              :class="isActive('/tax-documents') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.tax_documents")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/contract-handbook" class="sidebar-nav-child-link group"
              :class="isActive('/contract-handbook') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.contract_handbook")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('attendance', 'view')">
        <LazyVButton @click="toggleDropdown('t_a_my_logs')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.t_a_my_logs")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.t_a_my_logs }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.t_a_my_logs" class="sidebar-section-list">
          <li v-if="hasPermission('attendance', 'create')">
            <nuxt-link-locale to="/clock-in-out" class="sidebar-nav-child-link group"
              :class="isActive('/clock-in-out') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.clock_in_out")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/attendance-history" class="sidebar-nav-child-link group"
              :class="isActive('/attendance-history') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.attendance_history")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <LazyVButton @click="toggleDropdown('company_assets')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.company_assets")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.company_assets }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.company_assets" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/assigned-list" class="sidebar-nav-child-link group"
              :class="isActive('/assigned-list') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.assigned_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('assets', 'create')">
            <nuxt-link-locale to="/maintenance-request" class="sidebar-nav-child-link group"
              :class="isActive('/maintenance-request') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.maintenance_request")
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
  my_profile: true,
  my_requests: false,
  t_a_my_logs: false,
  company_assets: false,
  payroll_docs: false,
});
</script>