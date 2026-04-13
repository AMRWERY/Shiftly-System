<template>
  <div>
    <ul class="space-y-3">
      <li>
        <nuxt-link-locale to="/" class="sidebar-nav-link group"
          :class="isActive('/') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'" :exact="true">
          <Icon name="mdi:desktop-mac-dashboard" class="sidebar-section-icon"
            :class="isActive('/') ? 'text-white' : 'text-gray-300'" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.overview")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
        <LazyVButton @click="toggleDropdown('user_roles_mgt')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.user_roles_mgt")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.user_roles_mgt }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.user_roles_mgt" class="sidebar-section-list">
          <li v-if="hasPermission('users', 'view')">
            <nuxt-link-locale to="/users" class="sidebar-nav-child-link group"
              :class="isActive('/users') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.users")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('roles', 'view')">
            <nuxt-link-locale to="/roles" class="sidebar-nav-child-link group"
              :class="isActive('/roles') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.roles")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/permissions" class="sidebar-nav-child-link group"
              :class="isActive('/permissions') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.permissions")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('audit', 'view')">
            <nuxt-link-locale to="/system-access-log"
              class="sidebar-nav-child-link group"
              :class="isActive('/system-access-log') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.system_access_log")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <LazyVButton @click="toggleDropdown('system_settings')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="clarity:employee-group-solid"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.system_settings")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.system_settings }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.system_settings" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/company-structure"
              class="sidebar-nav-child-link group"
              :class="isActive('/company-structure') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.company_structure")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/global-config" class="sidebar-nav-child-link group"
              :class="isActive('/global-config') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.global_config")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/email-templates"
              class="sidebar-nav-child-link group"
              :class="isActive('/email-templates') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="sidebar-nav-label">{{
                t("layouts.email_templates")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <ul v-if="!collapsed && dropdownStates.audit_security" class="sidebar-section-list">
        <li>
          <nuxt-link-locale to="/audit-log" class="sidebar-nav-child-link group"
            :class="isActive('/audit-log') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.audit_log")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/policies-review" class="sidebar-nav-child-link group"
            :class="isActive('/policies-review') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.policies_review")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/activity-monitoring"
            class="sidebar-nav-child-link group"
            :class="isActive('/activity-monitoring') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.activity_monitoring")
            }}</span>
          </nuxt-link-locale>
        </li>
      </ul>

      <ul v-if="!collapsed && dropdownStates.advanced_reports" class="sidebar-section-list">
        <li>
          <nuxt-link-locale to="/unified-reports" class="sidebar-nav-child-link group"
            :class="isActive('/unified-reports') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.unified_reports")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/custom-report-builder"
            class="sidebar-nav-child-link group"
            :class="isActive('/custom-report-builder') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.custom_report_builder")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/financial-dashboards"
            class="sidebar-nav-child-link group"
            :class="isActive('/financial-dashboards') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="sidebar-nav-label">{{
              t("layouts.financial_dashboards")
            }}</span>
          </nuxt-link-locale>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ collapsed?: boolean }>()
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = useAppPermissions();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  user_roles_mgt: true,
  system_settings: false,
  audit_security: false,
  advanced_reports: false,
});
</script>