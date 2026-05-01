<template>
  <div>
    <ul class="space-y-1">
      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/stock-levels" class="sidebar-nav-link group"
          :class="isActive('/stock-levels') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:inventory-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-levels') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.stock_levels") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/critical-alerts" class="sidebar-nav-link group"
          :class="isActive('/critical-alerts') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:notification-important-rounded" class="sidebar-section-icon"
            :class="isActive('/critical-alerts') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.critical_alerts") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'view')">
        <nuxt-link-locale to="/stock-value" class="sidebar-nav-link group"
          :class="isActive('/stock-value') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:bar-chart-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-value') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.stock_value") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('items', 'view')">
        <nuxt-link-locale to="/product-list" class="sidebar-nav-link group"
          :class="isActive('/product-list') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:category-rounded" class="sidebar-section-icon"
            :class="isActive('/product-list') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.product_list") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('items', 'view')">
        <nuxt-link-locale to="/categories-units" class="sidebar-nav-link group"
          :class="isActive('/categories-units') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:label-rounded" class="sidebar-section-icon"
            :class="isActive('/categories-units') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.categories_units") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('items', 'view')">
        <nuxt-link-locale to="/reorder-settings" class="sidebar-nav-link group"
          :class="isActive('/reorder-settings') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:autorenew-rounded" class="sidebar-section-icon"
            :class="isActive('/reorder-settings') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.reorder_settings") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'move')">
        <nuxt-link-locale to="/goods-receipt-in" class="sidebar-nav-link group"
          :class="isActive('/goods-receipt-in') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:download-rounded" class="sidebar-section-icon"
            :class="isActive('/goods-receipt-in') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.goods_receipt_in") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'move')">
        <nuxt-link-locale to="/goods-issue-out" class="sidebar-nav-link group"
          :class="isActive('/goods-issue-out') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:upload-rounded" class="sidebar-section-icon"
            :class="isActive('/goods-issue-out') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.goods_issue_out") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'move')">
        <nuxt-link-locale to="/batch-expiry-tracking" class="sidebar-nav-link group"
          :class="isActive('/batch-expiry-tracking') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:layers-rounded" class="sidebar-section-icon"
            :class="isActive('/batch-expiry-tracking') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.batch_expiry_tracking") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'adjust')">
        <nuxt-link-locale to="/physical-count-records" class="sidebar-nav-link group"
          :class="isActive('/physical-count-records') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:fact-check-rounded" class="sidebar-section-icon"
            :class="isActive('/physical-count-records') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.physical_count_records") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'adjust')">
        <nuxt-link-locale to="/stock-adjustment" class="sidebar-nav-link group"
          :class="isActive('/stock-adjustment') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:tune-rounded" class="sidebar-section-icon"
            :class="isActive('/stock-adjustment') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.stock_adjustment") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('stock', 'adjust')">
        <nuxt-link-locale to="/quality-control-logs" class="sidebar-nav-link group"
          :class="isActive('/quality-control-logs') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:verified-rounded" class="sidebar-section-icon"
            :class="isActive('/quality-control-logs') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.quality_control_logs") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('procurements', 'view')">
        <nuxt-link-locale to="/purchase-requests-pr" class="sidebar-nav-link group"
          :class="isActive('/purchase-requests-pr') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:shopping-cart-rounded" class="sidebar-section-icon"
            :class="isActive('/purchase-requests-pr') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.purchase_requests_pr") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('procurements', 'view')">
        <nuxt-link-locale to="/purchase-orders-po" class="sidebar-nav-link group"
          :class="isActive('/purchase-orders-po') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:local-shipping-rounded" class="sidebar-section-icon"
            :class="isActive('/purchase-orders-po') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.purchase_orders_po") }}</span>
        </nuxt-link-locale>
      </li>

      <li v-if="hasPermission('procurements', 'view')">
        <nuxt-link-locale to="/suppliers-master" class="sidebar-nav-link group"
          :class="isActive('/suppliers-master') ? 'sidebar-link-active' : 'sidebar-link-hover text-tx-primary'">
          <Icon name="material-symbols:storefront-rounded" class="sidebar-section-icon"
            :class="isActive('/suppliers-master') ? 'text-brand-primary dark:text-white' : 'text-tx-muted'" />
          <span v-if="!collapsed" class="flex-1 ms-3 whitespace-nowrap">{{ t("layouts.suppliers_master") }}</span>
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
