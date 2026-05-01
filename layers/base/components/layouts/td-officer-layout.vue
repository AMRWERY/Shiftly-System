<template>
  <div>
    <ul class="space-y-1">
      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/course-creation" class="sidebar-nav-link group"
          :class="isActive('/course-creation') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:add-circle-outline-rounded" class="sidebar-section-icon"
            :class="isActive('/course-creation') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.course_creation") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/scheduling" class="sidebar-nav-link group"
          :class="isActive('/scheduling') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:event-rounded" class="sidebar-section-icon"
            :class="isActive('/scheduling') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.scheduling") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/resource-mgt" class="sidebar-nav-link group"
          :class="isActive('/resource-mgt') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:folder-open-rounded" class="sidebar-section-icon"
            :class="isActive('/resource-mgt') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.resource_mgt") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/training-records" class="sidebar-nav-link group"
          :class="isActive('/training-records') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:school-rounded" class="sidebar-section-icon"
            :class="isActive('/training-records') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.training_records") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/certifications" class="sidebar-nav-link group"
          :class="isActive('/certifications') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:military-tech-rounded" class="sidebar-section-icon"
            :class="isActive('/certifications') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.certifications") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <nuxt-link-locale to="/career-path-mapping" class="sidebar-nav-link group"
          :class="isActive('/career-path-mapping') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:trending-up-rounded" class="sidebar-section-icon"
            :class="isActive('/career-path-mapping') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.career_path_mapping") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'approve')">
        <nuxt-link-locale to="/enrollment-requests" class="sidebar-nav-link group"
          :class="isActive('/enrollment-requests') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:how-to-reg-rounded" class="sidebar-section-icon"
            :class="isActive('/enrollment-requests') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.enrollment_requests") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('training', 'approve')">
        <nuxt-link-locale to="/budget-approvals" class="sidebar-nav-link group"
          :class="isActive('/budget-approvals') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:account-balance-wallet-rounded" class="sidebar-section-icon"
            :class="isActive('/budget-approvals') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.budget_approvals") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/skill-matrix" class="sidebar-nav-link group"
          :class="isActive('/skill-matrix') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:grid-view-rounded" class="sidebar-section-icon"
            :class="isActive('/skill-matrix') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.skill_matrix") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <nuxt-link-locale to="/stock-adjustment" class="sidebar-nav-link group"
          :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'sidebar-link-hover text-white'">
          <Icon name="material-symbols:analytics-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-adjustment') ? 'text-white' : 'text-gray-400'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.required_training_analysis") }}</span>
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
