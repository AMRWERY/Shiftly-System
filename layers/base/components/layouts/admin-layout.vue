<template>
  <div>
    <ul class="space-y-1">
      <li>
        <nuxt-link-locale to="/" class="sidebar-nav-link group"
          :class="isActive('/') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'" :exact="true">
          <Icon name="mdi:desktop-mac-dashboard" class="sidebar-section-icon"
            :class="isActive('/') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.overview") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('users', 'view')">
        <nuxt-link-locale to="/users" class="sidebar-nav-link group"
          :class="isActive('/users') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:group-rounded" class="sidebar-section-icon"
            :class="isActive('/users') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.users") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('roles', 'view')">
        <nuxt-link-locale to="/roles" class="sidebar-nav-link group"
          :class="isActive('/roles') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:shield-person-rounded" class="sidebar-section-icon"
            :class="isActive('/roles') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.roles") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
        <nuxt-link-locale to="/permissions" class="sidebar-nav-link group"
          :class="isActive('/permissions') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:key-rounded" class="sidebar-section-icon"
            :class="isActive('/permissions') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.permissions") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('audit', 'view')">
        <nuxt-link-locale to="/system-access-log" class="sidebar-nav-link group"
          :class="isActive('/system-access-log') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:manage-history-rounded" class="sidebar-section-icon"
            :class="isActive('/system-access-log') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.system_access_log") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale to="/company-structure" class="sidebar-nav-link group"
          :class="isActive('/company-structure') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:account-tree-rounded" class="sidebar-section-icon"
            :class="isActive('/company-structure') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.company_structure") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale to="/global-config" class="sidebar-nav-link group"
          :class="isActive('/global-config') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:settings-rounded" class="sidebar-section-icon"
            :class="isActive('/global-config') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.global_config") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('settings', 'view')">
        <nuxt-link-locale to="/email-templates" class="sidebar-nav-link group"
          :class="isActive('/email-templates') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:mail-rounded" class="sidebar-section-icon"
            :class="isActive('/email-templates') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.email_templates") }}</span>
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
