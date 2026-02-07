<template>
  <div>
    <ul class="space-y-3">
      <li>
        <nuxt-link-locale to="/" class="flex items-center p-2 rounded-lg group transition-colors"
          :class="isActive('/') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'" :exact="true">
          <icon name="mdi:desktop-mac-dashboard" class="w-5 h-5 transition duration-75 group-hover:text-white"
            :class="isActive('/') ? 'text-white' : 'text-gray-300'" aria-hidden="true" />
          <span class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.overview")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
        <button @click="toggleDropdown('user_roles_mgt')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-300" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.user_roles_mgt")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.user_roles_mgt }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.user_roles_mgt" class="py-2 space-y-2">
          <li v-if="hasPermission('users', 'view')">
            <nuxt-link-locale to="/users" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/users') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.users")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('roles', 'view')">
            <nuxt-link-locale to="/roles" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/roles') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.roles")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/permissions" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/permissions') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.permissions")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('audit', 'view')">
            <nuxt-link-locale to="/system-access-log"
              class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/system-access-log') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.system_access_log")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <button @click="toggleDropdown('system_settings')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="clarity:employee-group-solid"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.system_settings")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.system_settings }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.system_settings" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/company-structure"
              class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/company-structure') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.company_structure")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/global-config" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/global-config') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.global_config")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/email-templates"
              class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
              :class="isActive('/email-templates') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.email_templates")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <ul v-if="dropdownStates.audit_security" class="py-2 space-y-2">
        <li>
          <nuxt-link-locale to="/audit-log" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/audit-log') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.audit_log")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/policies-review" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/policies-review') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.policies_review")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/activity-monitoring"
            class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/activity-monitoring') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.activity_monitoring")
            }}</span>
          </nuxt-link-locale>
        </li>
      </ul>

      <ul v-if="dropdownStates.advanced_reports" class="py-2 space-y-2">
        <li>
          <nuxt-link-locale to="/unified-reports" class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/unified-reports') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.unified_reports")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/custom-report-builder"
            class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/custom-report-builder') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.custom_report_builder")
            }}</span>
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale to="/financial-dashboards"
            class="flex items-center p-2 rounded-lg group ps-7 transition-colors"
            :class="isActive('/financial-dashboards') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
            <span class="flex-1 whitespace-nowrap">{{
              t("layouts.financial_dashboards")
            }}</span>
          </nuxt-link-locale>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = usePermission();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  user_roles_mgt: true,
  system_settings: false,
  audit_security: false,
  advanced_reports: false,
});
</script>