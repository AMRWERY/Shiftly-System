<template>
  <div>
    <ul class="space-y-3">
      <li>
        <button @click="toggleDropdown('service_requests')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.service_requests")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.service_requests }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.service_requests" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/pending-tasks" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.pending_tasks")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/completed-history" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.completed_history")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/priority-queue" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.priority_queue")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('preventive_maint')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.preventive_maint")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.preventive_maint }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.preventive_maint" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/scheduled-tasks" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.scheduled_tasks")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/maintenance-calendar" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.maintenance_calendar")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('asset_maintenance_log')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.asset_maintenance_log")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.asset_maintenance_log }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.asset_maintenance_log" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/asset-list" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.asset_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/repair-history" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.repair_history")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/cost-tracking" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.cost_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li>
        <button @click="toggleDropdown('spare_parts')" type="button"
          class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.spare_parts")
          }}</span>
          <icon name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.spare_parts }" aria-hidden="true" />
        </button>
        <ul v-if="dropdownStates.spare_parts" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/parts-usage" class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.parts_usage")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-request-from-inventory"
              class="flex items-center p-2 text-white rounded-lg group ps-7"
              active-class="bg-gray-400 text-white hover:bg-gray-500" :exact="true">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_request_from_inventory")
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
  service_requests: true,
  preventive_maint: false,
  asset_maintenance_log: false,
  spare_parts: false,
});
</script>