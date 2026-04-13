<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('employees', 'view')">
        <LazyVButton @click="toggleDropdown('employees_records')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.employees_records")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.employees_records }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.employees_records" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/employee_list" class="sidebar-nav-child-link group"
              :class="isActive('/employee_list') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.employee_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('documents', 'view')">
            <nuxt-link-locale to="/document-management" class="sidebar-nav-child-link group"
              :class="isActive('/document-management') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.document_management")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li v-if="hasPermission('onboarding', 'view')">
            <nuxt-link-locale to="/onboarding-offboarding" class="sidebar-nav-child-link group"
              :class="isActive('/onboarding-offboarding') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.onboarding_offboarding")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('attendance', 'view')">
        <LazyVButton @click="toggleDropdown('time_attendance')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.time_attendance")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.time_attendance }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.time_attendance" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/daily-logs" class="sidebar-nav-child-link group"
              :class="isActive('/daily-logs') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.daily_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/overtime-penalties" class="sidebar-nav-child-link group"
              :class="isActive('/overtime-penalties') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.overtime_penalties")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/shift-management" class="sidebar-nav-child-link group"
              :class="isActive('/shift-management') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.shift_management")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('leave', 'view')">
        <LazyVButton @click="toggleDropdown('leave_mgt')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.leave_mgt")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.leave_mgt }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.leave_mgt" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/leave-requests" class="sidebar-nav-child-link group"
              :class="isActive('/leave-requests') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.leave_requests")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/leave-balances" class="sidebar-nav-child-link group"
              :class="isActive('/leave-balances') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.leave_balances")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/holiday-calendar" class="sidebar-nav-child-link group"
              :class="isActive('/holiday-calendar') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.holiday_calendar")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('performance', 'view')">
        <LazyVButton @click="toggleDropdown('performance')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.performance")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.performance }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.performance" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/evaluation-cycles" class="sidebar-nav-child-link group"
              :class="isActive('/evaluation-cycles') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.evaluation_cycles")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/goals-setting-kpis" class="sidebar-nav-child-link group"
              :class="isActive('/goals-setting-kpis') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.goals_setting_kpis")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/360-feedback" class="sidebar-nav-child-link group"
              :class="isActive('/360-feedback') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.360_feedback")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('assets', 'view')">
        <LazyVButton @click="toggleDropdown('asset_assignment')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.asset_assignment")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.asset_assignment }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.asset_assignment" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/employee-assets-list" class="sidebar-nav-child-link group"
              :class="isActive('/employee-assets-list') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.employee_assets_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/handover-return-process" class="sidebar-nav-child-link group"
              :class="isActive('/handover-return-process') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.handover_return_process")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('recruitment', 'view')">
        <LazyVButton @click="toggleDropdown('recruitment')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-300" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.recruitment")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.recruitment }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.recruitment" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/candidate-pipeline" class="sidebar-nav-child-link group"
              :class="isActive('/candidate-pipeline') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.candidate_pipeline")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/job-openings" class="sidebar-nav-child-link group"
              :class="isActive('/job-openings') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.job_openings")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/interview-scheduling" class="sidebar-nav-child-link group"
              :class="isActive('/interview-scheduling') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="sidebar-nav-label">{{
                t("layouts.interview_scheduling")
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
  employees_records: true,
  time_attendance: false,
  leave_mgt: false,
  performance: false,
  asset_assignment: false,
  recruitment: false,
});
</script>