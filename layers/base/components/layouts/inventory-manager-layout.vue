<template>
  <div>
    <ul class="space-y-3">
      <li v-if="hasPermission('stock', 'view')">
        <LazyVButton @click="toggleDropdown('inventory_overview')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.inventory_overview")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.inventory_overview }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.inventory_overview" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/stock-levels" class="sidebar-nav-child-link group"
              :class="isActive('/stock-levels') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.stock_levels")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/critical-alerts" class="sidebar-nav-child-link group"
              :class="isActive('/critical-alerts') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.critical_alerts")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-value" class="sidebar-nav-child-link group"
              :class="isActive('/stock-value') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.stock_value")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('items', 'view')">
        <LazyVButton @click="toggleDropdown('item_master_data')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.item_master_data")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.item_master_data }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.item_master_data" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/product-list" class="sidebar-nav-child-link group"
              :class="isActive('/product-list') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.product_list")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/categories-units" class="sidebar-nav-child-link group"
              :class="isActive('/categories-units') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.categories_units")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/reorder-settings" class="sidebar-nav-child-link group"
              :class="isActive('/reorder-settings') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.reorder_settings")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'move')">
        <LazyVButton @click="toggleDropdown('stock_movement')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.stock_movement")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.stock_movement }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.stock_movement" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/goods-receipt-in" class="sidebar-nav-child-link group"
              :class="isActive('/goods-receipt-in') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.goods_receipt_in")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/goods-issue-out" class="sidebar-nav-child-link group"
              :class="isActive('/goods-issue-out') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.goods_issue_out")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/batch-expiry-tracking" class="sidebar-nav-child-link group"
              :class="isActive('/batch-expiry-tracking') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.batch_expiry_tracking")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('stock', 'adjust')">
        <LazyVButton @click="toggleDropdown('stock_take_qc')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.stock_take_qc")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.stock_take_qc }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.stock_take_qc" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/physical-count-records" class="sidebar-nav-child-link group"
              :class="isActive('/physical-count-records') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.physical_count_records")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/stock-adjustment" class="sidebar-nav-child-link group"
              :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.stock_adjustment")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/quality-control-logs" class="sidebar-nav-child-link group"
              :class="isActive('/quality-control-logs') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.quality_control_logs")
              }}</span>
            </nuxt-link-locale>
          </li>
        </ul>
      </li>

      <li v-if="hasPermission('procurements', 'view')">
        <LazyVButton @click="toggleDropdown('procurement_mgt')" type="button" variant="ghost" :block="true"
          text-color="text-white" padding-x="px-2" padding-y="py-2" class="group">
          <Icon name="eos-icons:cluster-management"
            class="sidebar-section-icon text-gray-400" aria-hidden="true" />
          <span v-if="!collapsed" class="sidebar-section-label">{{
            t("layouts.procurement_mgt")
          }}</span>
          <Icon v-if="!collapsed" name="material-symbols:keyboard-arrow-down-rounded" class="sidebar-chevron"
            :class="{ 'rotate-180': dropdownStates.procurement_mgt }" aria-hidden="true" />
        </LazyVButton>
        <ul v-if="!collapsed && dropdownStates.procurement_mgt" class="sidebar-section-list">
          <li>
            <nuxt-link-locale to="/purchase-requests-pr" class="sidebar-nav-child-link group"
              :class="isActive('/purchase-requests-pr') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.purchase_requests_pr")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/purchase-orders-po" class="sidebar-nav-child-link group"
              :class="isActive('/purchase-orders-po') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
                t("layouts.purchase_orders_po")
              }}</span>
            </nuxt-link-locale>
          </li>
          <li>
            <nuxt-link-locale to="/suppliers-master" class="sidebar-nav-child-link group"
              :class="isActive('/suppliers-master') ? 'sidebar-link-active' : 'text-gray-300 sidebar-link-hover'">
              <span class="sidebar-nav-label">{{
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