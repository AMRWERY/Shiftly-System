<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('training', 'view')">
        <LazyVButton @click="toggleDropdown('training_catalog')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.training_catalog")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.training_catalog }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.training_catalog" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/course-creation" class="sidebar-nav-child-link group"
              :class="isActive('/course-creation') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.course_creation")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/scheduling" class="sidebar-nav-child-link group"
              :class="isActive('/scheduling') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.scheduling")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/resource-mgt" class="sidebar-nav-child-link group"
              :class="isActive('/resource-mgt') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.resource_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <LazyVButton @click="toggleDropdown('employee_development')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.employee_development")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.employee_development }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.employee_development" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/training-records" class="sidebar-nav-child-link group"
              :class="isActive('/training-records') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.training_records")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/certifications" class="sidebar-nav-child-link group"
              :class="isActive('/certifications') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.certifications")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/career-path-mapping" class="sidebar-nav-child-link group"
              :class="isActive('/career-path-mapping') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.career_path_mapping")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('training', 'approve')">
        <LazyVButton @click="toggleDropdown('request_approval')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.request_approval")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.request_approval }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.request_approval" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/enrollment-requests" class="sidebar-nav-child-link group"
              :class="isActive('/enrollment-requests') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.enrollment_requests")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/budget-approvals" class="sidebar-nav-child-link group"
              :class="isActive('/budget-approvals') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.budget_approvals")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <LazyVButton @click="toggleDropdown('skills_gaps_report')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.skills_gaps_report")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.skills_gaps_report }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.skills_gaps_report" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/skill-matrix" class="sidebar-nav-child-link group"
              :class="isActive('/skill-matrix') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.skill_matrix")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-adjustment" class="sidebar-nav-child-link group"
              :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.required_training_analysis")
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
  training_catalog: true,
  employee_development: false,
  request_approval: false,
  skills_gaps_report: false,
});
</script>