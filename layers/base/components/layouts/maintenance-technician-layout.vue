<template>
  <div>
    <ul class="space-y-1">
      <li v-if="hasPermission('tasks', 'view')">
        <nuxt-link-locale to="/pending-tasks" class="sidebar-nav-link group"
          :class="isActive('/pending-tasks') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:pending-actions-rounded" class="sidebar-section-icon"
            :class="isActive('/pending-tasks') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.pending_tasks") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('tasks', 'view')">
        <nuxt-link-locale to="/completed-history" class="sidebar-nav-link group"
          :class="isActive('/completed-history') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:task-alt-rounded" class="sidebar-section-icon"
            :class="isActive('/completed-history') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.completed_history") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('tasks', 'view')">
        <nuxt-link-locale to="/priority-queue" class="sidebar-nav-link group"
          :class="isActive('/priority-queue') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:low-priority-rounded" class="sidebar-section-icon"
            :class="isActive('/priority-queue') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.priority_queue") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('maintenance', 'view')">
        <nuxt-link-locale to="/scheduled-tasks" class="sidebar-nav-link group"
          :class="isActive('/scheduled-tasks') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:event-repeat-rounded" class="sidebar-section-icon"
            :class="isActive('/scheduled-tasks') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.scheduled_tasks") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('maintenance', 'view')">
        <nuxt-link-locale to="/maintenance-calendar" class="sidebar-nav-link group"
          :class="isActive('/maintenance-calendar') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:calendar-today-rounded" class="sidebar-section-icon"
            :class="isActive('/maintenance-calendar') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.maintenance_calendar") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <nuxt-link-locale to="/asset-list" class="sidebar-nav-link group"
          :class="isActive('/asset-list') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:computer-rounded" class="sidebar-section-icon"
            :class="isActive('/asset-list') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.asset_list") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <nuxt-link-locale to="/repair-history" class="sidebar-nav-link group"
          :class="isActive('/repair-history') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:handyman-rounded" class="sidebar-section-icon"
            :class="isActive('/repair-history') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.repair_history") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <nuxt-link-locale to="/cost-tracking" class="sidebar-nav-link group"
          :class="isActive('/cost-tracking') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:analytics-rounded" class="sidebar-section-icon"
            :class="isActive('/cost-tracking') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.cost_tracking") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/parts-usage" class="sidebar-nav-link group"
          :class="isActive('/parts-usage') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:settings-rounded" class="sidebar-section-icon"
            :class="isActive('/parts-usage') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.parts_usage") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/stock-request-from-inventory" class="sidebar-nav-link group"
          :class="isActive('/stock-request-from-inventory') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:inventory-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-request-from-inventory') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.stock_request_from_inventory") }}</span>
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
