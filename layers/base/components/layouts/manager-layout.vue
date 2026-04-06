<template>
  <div>
    <ul class="space-y-3">
      <!-- User & Roles Management: show when manager has users/roles permission (e.g. from admin dashboard) -->
      <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
        <VButton @click="toggleDropdown('user_roles_mgt')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.user_roles_mgt")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.user_roles_mgt }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.user_roles_mgt" class="py-2 space-y-2">
          <li v-if="hasPermission('users', 'view')">
            <nuxt-link-locale to="/users" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/users') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{ t("layouts.users") }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('roles', 'view')">
            <nuxt-link-locale to="/roles" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/roles') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{ t("layouts.roles") }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('users', 'view') || hasPermission('roles', 'view')">
            <nuxt-link-locale to="/permissions" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/permissions') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{ t("layouts.permissions") }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('employees', 'view')">
        <VButton @click="toggleDropdown('my_team_dashboard')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.my_team_dashboard")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.my_team_dashboard }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.my_team_dashboard" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/team-overview" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/team-overview') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.team_overview")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quick-access-contacts" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/quick-access-contacts') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.quick_access_contacts")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('leave', 'approve') || hasPermission('payroll', 'approve')">
        <VButton @click="toggleDropdown('approvals_center')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.approvals_center")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.approvals_center }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.approvals_center" class="py-2 space-y-2">
          <li v-if="hasPermission('leave', 'approve')">
            <nuxt-link-locale to="/pending-leave" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-leave') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_leave")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'approve')">
            <nuxt-link-locale to="/pending-overtime" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-overtime') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_overtime")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('payroll', 'approve')">
            <nuxt-link-locale to="/pending-expenses" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-expenses') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_expenses")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <VButton @click="toggleDropdown('team_reports')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.team_reports")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.team_reports }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.team_reports" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/t-a-logs" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/t-a-logs') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.t_a_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/performance-status" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/performance-status') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.performance_status")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/leave-tracking" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/leave-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.leave_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('performance', 'view')">
        <VButton @click="toggleDropdown('team_goals')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.team_goals")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.team_goals }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.team_goals" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/goal-setting" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/goal-setting') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.goal_setting")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/progress-tracking" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/progress-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.progress_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/review-submission" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/review-submission') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
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