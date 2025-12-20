<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button
          @click="toggleDropdown('employees_records')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.employees_records")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.employees_records }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.employees_records" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/employee_list"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.employee_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/document-management"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.document_management")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/onboarding-offboarding"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.onboarding_offboarding")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('time_attendance')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.time_attendance")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.time_attendance }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.time_attendance" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/daily-logs"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.daily_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/overtime-penalties"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.overtime_penalties")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/shift-management"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.shift_management")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('leave_mgt')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.leave_mgt")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.leave_mgt }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.leave_mgt" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/leave-requests"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.leave_requests")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/leave-balances"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.leave_balances")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/holiday-calendar"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.holiday_calendar")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('performance')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.performance")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.performance }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.performance" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/evaluation-cycles"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.evaluation_cycles")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/goals-setting-kpis"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.goals_setting_kpis")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/360-feedback"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.360_feedback")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('asset_assignment')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.asset_assignment")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.asset_assignment }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.asset_assignment" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/employee-assets-list"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.employee_assets_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/handover-return-process"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.handover_return_process")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('recruitment')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.recruitment")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.recruitment }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.recruitment" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/candidate-pipeline"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.candidate_pipeline")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/job-openings"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.job_openings")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/interview-scheduling"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
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
const { t } = useI18n();

const { dropdownStates, toggleDropdown } = useSidebarDropdowns({
  employees_records: true,
  time_attendance: false,
  leave_mgt: false,
  performance: false,
  asset_assignment: false,
  recruitment: false,
});
</script>