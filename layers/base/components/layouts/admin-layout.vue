<template>
  <div>
    <ul class="space-y-1">
      <li>
        <nuxt-link-locale
          to="/"
          class="sidebar-nav-link group"
          :class="
            isActive('/')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
          :exact="true"
        >
          <Icon
            name="mdi:desktop-mac-dashboard"
            class="sidebar-section-icon"
            :class="
              isActive('/')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.overview")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('users', 'view')">
        <nuxt-link-locale
          to="/users"
          class="sidebar-nav-link group"
          :class="
            isActive('/users')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:group-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/users')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.users")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('roles', 'view')">
        <nuxt-link-locale
          to="/roles"
          class="sidebar-nav-link group"
          :class="
            isActive('/roles')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:shield-person-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/roles')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.roles")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li
        v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')"
      >
        <nuxt-link-locale
          to="/permissions"
          class="sidebar-nav-link group"
          :class="
            isActive('/permissions')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:key-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/permissions')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.permissions")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('audit', 'view')">
        <nuxt-link-locale
          to="/system-access-log"
          class="sidebar-nav-link group"
          :class="
            isActive('/system-access-log')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:manage-history-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/system-access-log')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.system_access_log")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('audit', 'view')">
        <nuxt-link-locale
          to="/policies-review"
          class="sidebar-nav-link group"
          :class="
            isActive('/policies-review')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:policy-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/policies-review')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.policies_review")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('audit', 'view')">
        <nuxt-link-locale
          to="/audit-log"
          class="sidebar-nav-link group"
          :class="
            isActive('/audit-log')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:fact-check-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/audit-log')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.audit_log")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('audit', 'view')">
        <nuxt-link-locale
          to="/activity-monitoring"
          class="sidebar-nav-link group"
          :class="
            isActive('/activity-monitoring')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:monitoring-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/activity-monitoring')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.activity_monitoring")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li
        v-if="
          hasPermission('reports', 'view') || hasPermission('finance', 'view')
        "
      >
        <nuxt-link-locale
          to="/financial-dashboards"
          class="sidebar-nav-link group"
          :class="
            isActive('/financial-dashboards')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:query-stats-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/financial-dashboards')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.financial_dashboards")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale
          to="/custom-report-builder"
          class="sidebar-nav-link group"
          :class="
            isActive('/custom-report-builder')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:analytics-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/custom-report-builder')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.custom_report_builder")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale
          to="/company-structure"
          class="sidebar-nav-link group"
          :class="
            isActive('/company-structure')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:account-tree-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/company-structure')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.company_structure")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale
          to="/global-config"
          class="sidebar-nav-link group"
          :class="
            isActive('/global-config')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:settings-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/global-config')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.global_config")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale
          to="/email-templates"
          class="sidebar-nav-link group"
          :class="
            isActive('/email-templates')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:mail-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/email-templates')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.email_templates")
          }}</span>
        </nuxt-link-locale>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { isActive } = useIsActive();
const { hasPermission } = useAppPermissions();

defineProps<{ collapsed?: boolean }>();
</script>