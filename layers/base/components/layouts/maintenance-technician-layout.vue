<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('tasks', 'view')">
        <LazyVButton @click="toggleDropdown('service_requests')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.service_requests")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.service_requests }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.service_requests" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/pending-tasks" class="sidebar-nav-child-link group"
              :class="isActive('/pending-tasks') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.pending_tasks")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/completed-history" class="sidebar-nav-child-link group"
              :class="isActive('/completed-history') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.completed_history")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/priority-queue" class="sidebar-nav-child-link group"
              :class="isActive('/priority-queue') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.priority_queue")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('maintenance', 'view')">
        <LazyVButton @click="toggleDropdown('preventive_maint')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.preventive_maint")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.preventive_maint }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.preventive_maint" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/scheduled-tasks" class="sidebar-nav-child-link group"
              :class="isActive('/scheduled-tasks') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.scheduled_tasks")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/maintenance-calendar" class="sidebar-nav-child-link group"
              :class="isActive('/maintenance-calendar') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.maintenance_calendar")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <LazyVButton @click="toggleDropdown('asset_maintenance_log')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.asset_maintenance_log")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.asset_maintenance_log }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.asset_maintenance_log" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/asset-list" class="sidebar-nav-child-link group"
              :class="isActive('/asset-list') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.asset_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/repair-history" class="sidebar-nav-child-link group"
              :class="isActive('/repair-history') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.repair_history")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cost-tracking" class="sidebar-nav-child-link group"
              :class="isActive('/cost-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.cost_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <LazyVButton @click="toggleDropdown('spare_parts')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.spare_parts")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.spare_parts }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.spare_parts" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/parts-usage" class="sidebar-nav-child-link group"
              :class="isActive('/parts-usage') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.parts_usage")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-request-from-inventory" class="sidebar-nav-child-link group"
              :class="isActive('/stock-request-from-inventory') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.stock_request_from_inventory")
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
  service_requests: true,
  preventive_maint: false,
  asset_maintenance_log: false,
  spare_parts: false,
});
</script>