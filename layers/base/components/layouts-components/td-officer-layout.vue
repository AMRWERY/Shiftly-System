<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button
          @click="toggleDropdown('training_catalog')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.training_catalog")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.training_catalog }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.training_catalog" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/course-creation"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.course_creation")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/scheduling"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.scheduling")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/resource-mgt"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.resource_mgt")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('employee_development')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.employee_development")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.employee_development }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.employee_development" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/training-records"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.training_records")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/certifications"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.certifications")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/career-path-mapping"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.career_path_mapping")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('request_approval')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.request_approval")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.request_approval }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.request_approval" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/enrollment-requests"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.enrollment_requests")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/budget-approvals"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.budget_approvals")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button
          @click="toggleDropdown('skills_gaps_report')"
          type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group"
        >
          <icon
            name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400"
            aria-hidden="true"
          />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.skills_gaps_report")
          }}</span>
          <icon
            name="material-symbols:keyboard-arrow-down-rounded"
            class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.skills_gaps_report }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="dropdownStates.skills_gaps_report" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale
              to="/skill-matrix"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.skill_matrix")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale
              to="/stock-adjustment"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500"
              :exact="true"
            >
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
const { t } = useI18n();

type DropdownNames =
  | "training_catalog"
  | "employee_development"
  | "request_approval"
  | "skills_gaps_report";

const { dropdownStates } = useSidebarDropdowns({
  training_catalog: true,
  employee_development: false,
  request_approval: false,
  skills_gaps_report: false,
});

const toggleDropdown = (name: DropdownNames) => {
  dropdownStates.value[name] = !dropdownStates.value[name];
};
</script>