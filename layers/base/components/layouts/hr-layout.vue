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

      <li>
        <nuxt-link-locale
          to="/employee_list"
          class="sidebar-nav-link group"
          :class="
            isActive('/employee_list')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:badge-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/employee_list')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.employee_list")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/document-management"
          class="sidebar-nav-link group"
          :class="
            isActive('/document-management')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:folder-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/document-management')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.document_management")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/onboarding-offboarding"
          class="sidebar-nav-link group"
          :class="
            isActive('/onboarding-offboarding')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:transfer-within-a-station-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/onboarding-offboarding')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.onboarding_offboarding")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/daily-logs"
          class="sidebar-nav-link group"
          :class="
            isActive('/daily-logs')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:schedule-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/daily-logs')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.daily_logs")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/overtime-penalties"
          class="sidebar-nav-link group"
          :class="
            isActive('/overtime-penalties')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:timer-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/overtime-penalties')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.overtime_penalties")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/shift-management"
          class="sidebar-nav-link group"
          :class="
            isActive('/shift-management')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:work-history-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/shift-management')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.shift_management")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/leave-requests"
          class="sidebar-nav-link group"
          :class="
            isActive('/leave-requests')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:beach-access-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/leave-requests')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.leave_requests")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/leave-balances"
          class="sidebar-nav-link group"
          :class="
            isActive('/leave-balances')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:event-available-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/leave-balances')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.leave_balances")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/holiday-calendar"
          class="sidebar-nav-link group"
          :class="
            isActive('/holiday-calendar')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:calendar-month-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/holiday-calendar')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.holiday_calendar")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/evaluation-cycles"
          class="sidebar-nav-link group"
          :class="
            isActive('/evaluation-cycles')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:star-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/evaluation-cycles')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.evaluation_cycles")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/goals-setting-kpis"
          class="sidebar-nav-link group"
          :class="
            isActive('/goals-setting-kpis')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:flag-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/goals-setting-kpis')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.goals_setting_kpis")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/360-feedback"
          class="sidebar-nav-link group"
          :class="
            isActive('/360-feedback')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:rate-review-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/360-feedback')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.360_feedback")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/employee-assets-list"
          class="sidebar-nav-link group"
          :class="
            isActive('/employee-assets-list')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:devices-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/employee-assets-list')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.employee_assets_list")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/handover-return-process"
          class="sidebar-nav-link group"
          :class="
            isActive('/handover-return-process')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:swap-horiz-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/handover-return-process')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.handover_return_process")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/candidate-pipeline"
          class="sidebar-nav-link group"
          :class="
            isActive('/candidate-pipeline')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:person-search-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/candidate-pipeline')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.candidate_pipeline")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/job-openings"
          class="sidebar-nav-link group"
          :class="
            isActive('/job-openings')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:business-center-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/job-openings')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.job_openings")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/interview-scheduling"
          class="sidebar-nav-link group"
          :class="
            isActive('/interview-scheduling')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:event-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/interview-scheduling')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.interview_scheduling")
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