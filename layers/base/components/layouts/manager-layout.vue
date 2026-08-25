<template>
  <div>
    <ul class="space-y-1">
      <li>
        <nuxt-link-locale
          to="/team-overview"
          class="sidebar-nav-link group"
          :class="
            isActive('/team-overview')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:groups-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/team-overview')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.team_overview")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/quick-access-contacts"
          class="sidebar-nav-link group"
          :class="
            isActive('/quick-access-contacts')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:contacts-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/quick-access-contacts')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.quick_access_contacts")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
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

      <li>
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

      <li>
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

      <li>
        <nuxt-link-locale
          to="/pending-leave"
          class="sidebar-nav-link group"
          :class="
            isActive('/pending-leave')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:beach-access-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/pending-leave')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.pending_leave")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/pending-overtime"
          class="sidebar-nav-link group"
          :class="
            isActive('/pending-overtime')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:timer-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/pending-overtime')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.pending_overtime")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/pending-expenses"
          class="sidebar-nav-link group"
          :class="
            isActive('/pending-expenses')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:receipt-long-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/pending-expenses')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.pending_expenses")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/t-a-logs"
          class="sidebar-nav-link group"
          :class="
            isActive('/t-a-logs')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:schedule-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/t-a-logs')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.t_a_logs")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/performance-status"
          class="sidebar-nav-link group"
          :class="
            isActive('/performance-status')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:star-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/performance-status')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.performance_status")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/leave-tracking"
          class="sidebar-nav-link group"
          :class="
            isActive('/leave-tracking')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:event-available-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/leave-tracking')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.leave_tracking")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/goal-setting"
          class="sidebar-nav-link group"
          :class="
            isActive('/goal-setting')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:flag-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/goal-setting')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.goal_setting")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/progress-tracking"
          class="sidebar-nav-link group"
          :class="
            isActive('/progress-tracking')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:trending-up-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/progress-tracking')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.progress_tracking")
          }}</span>
        </nuxt-link-locale>
      </li>

      <li>
        <nuxt-link-locale
          to="/review-submission"
          class="sidebar-nav-link group"
          :class="
            isActive('/review-submission')
              ? 'sidebar-link-active'
              : 'sidebar-link-hover text-tx-primary'
          "
        >
          <Icon
            name="material-symbols:rate-review-rounded"
            class="sidebar-section-icon"
            :class="
              isActive('/review-submission')
                ? 'text-brand-primary dark:text-white'
                : 'text-tx-muted'
            "
          />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{
            t("layouts.review_submission")
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