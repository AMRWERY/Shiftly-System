<template>
  <div>
    <ul class="space-y-1">
      <li v-if="hasPermission('profile', 'view')">
        <nuxt-link-locale to="/personal-info" class="sidebar-nav-link group"
          :class="isActive('/personal-info') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:person-rounded" class="sidebar-section-icon"
            :class="isActive('/personal-info') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.personal_info") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('profile', 'view')">
        <nuxt-link-locale to="/contact-details" class="sidebar-nav-link group"
          :class="isActive('/contact-details') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:contact-phone-rounded" class="sidebar-section-icon"
            :class="isActive('/contact-details') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.contact_details") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('profile', 'view')">
        <nuxt-link-locale to="/qualifications" class="sidebar-nav-link group"
          :class="isActive('/qualifications') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:school-rounded" class="sidebar-section-icon"
            :class="isActive('/qualifications') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.qualifications") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('leave', 'create')">
        <nuxt-link-locale to="/leave-request" class="sidebar-nav-link group"
          :class="isActive('/leave-request') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:beach-access-rounded" class="sidebar-section-icon"
            :class="isActive('/leave-request') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.leave_request") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'create')">
        <nuxt-link-locale to="/expense-claim" class="sidebar-nav-link group"
          :class="isActive('/expense-claim') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:receipt-long-rounded" class="sidebar-section-icon"
            :class="isActive('/expense-claim') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.expense_claim") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'create')">
        <nuxt-link-locale to="/advance-request" class="sidebar-nav-link group"
          :class="isActive('/advance-request') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:payments-rounded" class="sidebar-section-icon"
            :class="isActive('/advance-request') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.advance_request") }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale to="/request-status" class="sidebar-nav-link group"
          :class="isActive('/request-status') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:pending-actions-rounded" class="sidebar-section-icon"
            :class="isActive('/request-status') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.request_status") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/payslips" class="sidebar-nav-link group"
          :class="isActive('/payslips') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:receipt-rounded" class="sidebar-section-icon"
            :class="isActive('/payslips') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.payslips") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/tax-documents" class="sidebar-nav-link group"
          :class="isActive('/tax-documents') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:description-rounded" class="sidebar-section-icon"
            :class="isActive('/tax-documents') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.tax_documents") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('payroll', 'view')">
        <nuxt-link-locale to="/contract-handbook" class="sidebar-nav-link group"
          :class="isActive('/contract-handbook') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:menu-book-rounded" class="sidebar-section-icon"
            :class="isActive('/contract-handbook') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.contract_handbook") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('attendance', 'create')">
        <nuxt-link-locale to="/clock-in-out" class="sidebar-nav-link group"
          :class="isActive('/clock-in-out') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:fingerprint-rounded" class="sidebar-section-icon"
            :class="isActive('/clock-in-out') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.clock_in_out") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('attendance', 'view')">
        <nuxt-link-locale to="/attendance-history" class="sidebar-nav-link group"
          :class="isActive('/attendance-history') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:history-rounded" class="sidebar-section-icon"
            :class="isActive('/attendance-history') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.attendance_history") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <nuxt-link-locale to="/assigned-list" class="sidebar-nav-link group"
          :class="isActive('/assigned-list') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:devices-rounded" class="sidebar-section-icon"
            :class="isActive('/assigned-list') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.assigned_list") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('assets', 'create')">
        <nuxt-link-locale to="/maintenance-request" class="sidebar-nav-link group"
          :class="isActive('/maintenance-request') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:build-rounded" class="sidebar-section-icon"
            :class="isActive('/maintenance-request') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.maintenance_request") }}</span>
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
