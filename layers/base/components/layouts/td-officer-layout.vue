<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('training', 'view')">
        <VButton @click="toggleDropdown('training_catalog')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.training_catalog")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.training_catalog }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.training_catalog" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/course-creation" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/course-creation') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.course_creation")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/scheduling" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/scheduling') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.scheduling")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/resource-mgt" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/resource-mgt') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.resource_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('training', 'view')">
        <VButton @click="toggleDropdown('employee_development')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.employee_development")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.employee_development }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.employee_development" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/training-records" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/training-records') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.training_records")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/certifications" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/certifications') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.certifications")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/career-path-mapping" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/career-path-mapping') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.career_path_mapping")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('training', 'approve')">
        <VButton @click="toggleDropdown('request_approval')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.request_approval")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.request_approval }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.request_approval" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/enrollment-requests" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/enrollment-requests') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.enrollment_requests")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/budget-approvals" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/budget-approvals') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.budget_approvals")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('reports', 'view')">
        <VButton @click="toggleDropdown('skills_gaps_report')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.skills_gaps_report")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.skills_gaps_report }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.skills_gaps_report" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/skill-matrix" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/skill-matrix') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.skill_matrix")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-adjustment" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
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