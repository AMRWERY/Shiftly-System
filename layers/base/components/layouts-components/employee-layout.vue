<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button @click="toggleDropdown('my_profile')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.my_profile")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.my_profile }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.my_profile" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/personal-info" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.personal_info")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/contact-details" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.contact_details")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/qualifications" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.qualifications")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('my_requests')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.my_requests")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.my_requests }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.my_requests" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/leave-request" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.leave_request")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/expense-claim" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.expense_claim")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/advance-request" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.advance_request")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/request-status" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.request_status")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('payroll_docs')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.payroll_docs")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.payroll_docs }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.payroll_docs" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/payslips" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.payslips")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/tax-documents" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.tax_documents")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/contract-handbook" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.contract_handbook")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('t_a_my_logs')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.t_a_my_logs")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.t_a_my_logs }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.t_a_my_logs" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/clock-in-out" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.clock_in_out")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/attendance-history" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.attendance_history")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('company_assets')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.company_assets")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.company_assets }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.company_assets" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/assigned-list" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.assigned_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/maintenance-request" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.maintenance_request")
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
  my_profile: true,
  my_requests: false,
  t_a_my_logs: false,
  company_assets: false,
  payroll_docs: false,
});
</script>