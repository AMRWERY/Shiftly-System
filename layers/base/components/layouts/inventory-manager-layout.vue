<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('stock', 'view')">
        <VButton @click="toggleDropdown('inventory_overview')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.inventory_overview")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.inventory_overview }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.inventory_overview" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/stock-levels" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/stock-levels') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_levels")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/critical-alerts" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/critical-alerts') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.critical_alerts")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-value" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/stock-value') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_value")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('items', 'view')">
        <VButton @click="toggleDropdown('item_master_data')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.item_master_data")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.item_master_data }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.item_master_data" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/product-list" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/product-list') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.product_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/categories-units" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/categories-units') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.categories_units")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/reorder-settings" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/reorder-settings') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.reorder_settings")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'move')">
        <VButton @click="toggleDropdown('stock_movement')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.stock_movement")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.stock_movement }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.stock_movement" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/goods-receipt-in" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/goods-receipt-in') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.goods_receipt_in")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/goods-issue-out" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/goods-issue-out') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.goods_issue_out")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/batch-expiry-tracking" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/batch-expiry-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.batch_expiry_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'adjust')">
        <VButton @click="toggleDropdown('stock_take_qc')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.stock_take_qc")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.stock_take_qc }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.stock_take_qc" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/physical-count-records" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/physical-count-records') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.physical_count_records")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-adjustment" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.stock_adjustment")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quality-control-logs" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/quality-control-logs') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.quality_control_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('procurements', 'view')">
        <VButton @click="toggleDropdown('procurement_mgt')" type="button"
          variant="ghost" :block="true" text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <icon name="eos-icons:cluster-management"
            class="w-5 h-5 transition duration-75 group-hover:text-white text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="flex-1 ms-3 text-start whitespace-nowrap">{{
            t("layouts.procurement_mgt")
          }}</span>
          <icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="w-5 h-5"
            :class="{ 'rotate-180': dropdownStates.procurement_mgt }" aria-hidden="true" />
        </VButton>
        <ul v-if="!collapsed && dropdownStates.procurement_mgt" class="py-2 space-y-2">
          <li>
            <nuxt-link-locale to="/purchase-requests-pr" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/purchase-requests-pr') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.purchase_requests_pr")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/purchase-orders-po" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/purchase-orders-po') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.purchase_orders_po")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/suppliers-master" class="flex items-center p-2 rounded-lg group ps-7"
              :class="isActive('/suppliers-master') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="flex-1 whitespace-nowrap">{{
                t("layouts.suppliers_master")
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
  inventory_overview: true,
  item_master_data: false,
  stock_movement: false,
  procurement_mgt: false,
  stock_take_qc: false,
});
</script>