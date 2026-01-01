<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button @click="toggleDropdown('my_team_dashboard')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.my_team_dashboard")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.my_team_dashboard }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.my_team_dashboard" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/team-overview" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/team-overview') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.team_overview")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quick-access-contacts" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/quick-access-contacts') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.quick_access_contacts")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('approvals_center')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.approvals_center")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.approvals_center }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.approvals_center" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/pending-leave" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-leave') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_leave")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/pending-overtime" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-overtime') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_overtime")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/pending-expenses" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/pending-expenses') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_expenses")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('team_reports')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.team_reports")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.team_reports }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.team_reports" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/t-a-logs" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/t-a-logs') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.t_a_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/performance-status" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/performance-status') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.performance_status")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/leave-tracking" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/leave-tracking') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.leave_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('team_goals')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.team_goals")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.team_goals }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.team_goals" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/goal-setting" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/goal-setting') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.goal_setting")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/progress-tracking" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/progress-tracking') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.progress_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/review-submission" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/review-submission') ? 'bg-gray-400 text-white hover:bg-gray-500' : 'text-white hover:bg-gray-700'">
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
const { t } = useI18n();
const { isActive } = useIsActive();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  my_team_dashboard: true,
  approvals_center: false,
  team_reports: false,
  team_goals: false,
});
</script>