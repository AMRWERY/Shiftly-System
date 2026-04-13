<template>
  <div>
    <ul class="space-y-3">
      <!-- User & Roles Management: show when manager has users/roles permission (e.g. from admin dashboard) -->
      <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
        <LazyVButton @click="toggleDropdown('user_roles_mgt')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.user_roles_mgt")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.user_roles_mgt }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.user_roles_mgt" class="sidebar-section-list">
          <li v-if="hasPermission('users', 'view')">
            <nuxt-link-locale to="/users" class="sidebar-nav-child-link group"
              :class="isActive('/users') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{ t("layouts.users") }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('roles', 'view')">
            <nuxt-link-locale to="/roles" class="sidebar-nav-child-link group"
              :class="isActive('/roles') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{ t("layouts.roles") }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
            <nuxt-link-locale to="/permissions" class="sidebar-nav-child-link group"
              :class="isActive('/permissions') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{ t("layouts.permissions") }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('employees', 'view')">
        <LazyVButton @click="toggleDropdown('my_team_dashboard')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.my_team_dashboard")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.my_team_dashboard }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.my_team_dashboard" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/team-overview" class="sidebar-nav-child-link group"
              :class="isActive('/team-overview') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.team_overview")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quick-access-contacts" class="sidebar-nav-child-link group"
              :class="isActive('/quick-access-contacts') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.quick_access_contacts")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('leave', 'approve') || hasPermission('payroll', 'approve')">
        <LazyVButton @click="toggleDropdown('approvals_center')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.approvals_center")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.approvals_center }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.approvals_center" class="sidebar-section-list">
          <li v-if="hasPermission('leave', 'approve')">
            <nuxt-link-locale to="/pending-leave" class="sidebar-nav-child-link group"
              :class="isActive('/pending-leave') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.pending_leave")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'approve')">
            <nuxt-link-locale to="/pending-overtime" class="sidebar-nav-child-link group"
              :class="isActive('/pending-overtime') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.pending_overtime")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'approve')">
            <nuxt-link-locale to="/pending-expenses" class="sidebar-nav-child-link group"
              :class="isActive('/pending-expenses') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.pending_expenses")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('team_reports')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.team_reports")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.team_reports }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.team_reports" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/t-a-logs" class="sidebar-nav-child-link group"
              :class="isActive('/t-a-logs') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.t_a_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/performance-status" class="sidebar-nav-child-link group"
              :class="isActive('/performance-status') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.performance_status")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/leave-tracking" class="sidebar-nav-child-link group"
              :class="isActive('/leave-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.leave_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('performance', 'view')">
        <LazyVButton @click="toggleDropdown('team_goals')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.team_goals")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.team_goals }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.team_goals" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/goal-setting" class="sidebar-nav-child-link group"
              :class="isActive('/goal-setting') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.goal_setting")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/progress-tracking" class="sidebar-nav-child-link group"
              :class="isActive('/progress-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.progress_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/review-submission" class="sidebar-nav-child-link group"
              :class="isActive('/review-submission') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.review_submission")
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
  user_roles_mgt: false,
  my_team_dashboard: true,
  approvals_center: false,
  team_reports: false,
  team_goals: false,
});
</script>