<template>
  <div>
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight text-tx-primary">
          {{ t("global_config.title") }}
        </h1>
        <LazyVButton type="button" :padding-x="'px-4'" :padding-y="'py-2'" :no-border="true"
          class="rounded-lg transition-colors" @click="save" :disabled="loading">
          {{ t("global_config.save_settings") }}
        </LazyVButton>
      </div>

      <!-- Alert Error -->
      <!-- Alert Error -->
      <div v-if="error" class="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Icon name="material-symbols:error-outline-rounded" class="h-5 w-5 text-red-400" />
          </div>
          <div class="ms-3">
            <h3 class="text-sm font-medium text-red-300">{{ error }}</h3>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Work Days Section -->
        <div class="card-bg p-6 rounded-lg">
          <h2 class="text-lg font-medium leading-6 text-tx-primary mb-4">
            {{ t("global_config.work_days") }}
          </h2>
          <p class="text-sm text-gray-400 mb-4">
            {{ t("global_config.select_work_days") }}
          </p>
          <div class="space-y-4">
            <!-- Days Checkboxes -->
            <div class="grid grid-cols-2 gap-2">
              <div v-for="day in weekDays" :key="day.value" class="flex items-center">
                <LazyVCheckboxInput :id="`day-${day.value}`" :value="day.value" v-model="form.workDays" :color="'#00E0BA'"
                  class="border-[var(--border-default)] bg-brand-systemBg focus:ring-indigo-600" />
                <label :for="`day-${day.value}`" class="ms-3 text-sm leading-6 text-tx-primary font-medium">
                  {{ day.label }}
                </label>
              </div>
            </div>

            <!-- Work Hours -->
            <div class="grid grid-cols-2 gap-4 border-t border-[var(--border-default)] pt-4 mt-4">
              <div>
                <label class="block text-sm font-medium leading-6 text-tx-primary">
                  {{ t("global_config.start_time") }}
                </label>
                <input type="time" v-model="form.workHours.start"
                  class="mt-1 block w-full rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label class="block text-sm font-medium leading-6 text-tx-primary">
                  {{ t("global_config.end_time") }}
                </label>
                <input type="time" v-model="form.workHours.end"
                  class="mt-1 block w-full rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>

        <!-- Currency Section -->
        <div class="card-bg p-6 rounded-lg h-fit">
          <h2 class="text-lg font-medium leading-6 text-tx-primary mb-4">
            {{ t("global_config.currency") }}
          </h2>
          <div>
            <label for="currency" class="block text-sm font-medium leading-6 text-tx-primary">
              {{ t("global_config.currency") }}
            </label>
            <div class="mt-2 text-tx-primary">
              <select id="currency" v-model="form.currency"
                class="block w-full rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 hide-scrollbar">
                <option v-for="(name, code) in supportedCurrencies" :key="code" :value="code">
                  {{ code }} - {{ name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Holidays Section -->
      <div class="card-bg p-6 rounded-lg">
        <h2 class="text-lg font-medium leading-6 text-tx-primary mb-4">
          {{ t("global_config.official_holidays") }}
        </h2>

        <!-- Country Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium leading-6 text-tx-primary mb-1">
            {{ t("global_config.select_country") }}
          </label>
          <select v-model="form.holidayCountryCode"
            class="hide-scrollbar block w-full max-w-xs rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option v-for="country in arabHolidays" :key="country.country_code" :value="country.country_code">
              {{
                $i18n.locale === "ar"
                  ? country.country_name_ar
                  : country.country_name_en
              }}
            </option>
          </select>
          <p class="mt-2 text-sm text-gray-400">
            {{ t("global_config.country_holidays_description") }}
          </p>
        </div>

        <!-- Custom Holidays Divider -->
        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-[var(--border-default)]"></div>
          </div>
          <div class="relative flex justify-start">
            <span class="bg-brand-cardBg pe-2 text-sm text-gray-400">{{
              t("global_config.custom_holidays")
            }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-medium leading-6 text-tx-primary">
            {{ t("global_config.additional_holidays") }}
          </h3>
          <LazyVButton type="button" :padding-x="'px-4'" :padding-y="'py-2'" :no-border="true"
            class="rounded-lg transition-colors" @click="addHoliday">
            {{ t("global_config.add_holiday") }}
          </LazyVButton>
        </div>

        <div v-if="form.customHolidays.length === 0" class="text-center py-6 text-gray-400 text-sm">
          {{ t("global_config.no_custom_holidays") }}
        </div>

        <div v-else class="space-y-4">
          <div v-for="(holiday, index) in form.customHolidays" :key="index"
            class="flex gap-4 items-end border-b border-[var(--border-default)] pb-4 last:border-0 last:pb-0">
            <div class="flex-1">
              <label class="block text-sm font-medium leading-6 text-tx-primary">
                {{ t("global_config.holiday_name") }}
              </label>
              <input type="text" v-model="holiday.name"
                class="mt-1 block w-full rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium leading-6 text-tx-primary">
                {{ t("global_config.holiday_date") }}
              </label>
              <input type="date" v-model="holiday.date"
                class="mt-1 block w-full rounded-md border border-[var(--border-default)] py-1.5 text-tx-primary bg-brand-systemBg shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <LazyVButton type="button" variant="ghost" text-color="text-red-500" hover-color="hover:bg-red-500/20"
              padding-x="px-2" padding-y="py-2" class="rounded bg-red-500/10" @click="removeHoliday(index)">
              <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
            </LazyVButton>
          </div>
        </div>
      </div>

      <!-- Holiday Calendar Preview -->
      <div class="card-bg rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-[var(--border-default)]">
          <h2 class="text-lg font-medium leading-6 text-tx-primary">
            {{ t("global_config.holiday_calendar") }}
          </h2>
          <p class="mt-1 text-sm text-gray-400">
            {{ t("global_config.preview_holidays_for_country") }}
          </p>
        </div>

        <div class="p-6">
          <div class="card-bg shadow-lg rounded-lg overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 bg-brand-systemBg text-tx-primary rounded-t-lg">
              <LazyVButton type="button" variant="ghost" padding-x="px-2" padding-y="py-2"
                hover-color="hover:bg-[var(--bg-hover)]" class="rounded-full" @click="prevMonth">
                <Icon name="material-symbols:chevron-left" class="w-6 h-6 rtl:rotate-180" />
              </LazyVButton>
              <h2 class="text-xl font-semibold">
                {{ monthName }} {{ currentYear }}
              </h2>
              <LazyVButton type="button" variant="ghost" padding-x="px-2" padding-y="py-2"
                hover-color="hover:bg-[var(--bg-hover)]" class="rounded-full" @click="nextMonth">
                <Icon name="material-symbols:chevron-right" class="w-6 h-6 rtl:rotate-180" />
              </LazyVButton>
            </div>

            <div class="grid grid-cols-7 gap-px bg-gray-700">
              <div v-for="day in dayHeaders" :key="day"
                class="text-center py-3 bg-brand-systemBg text-tx-secondary font-medium text-sm">
                {{ day }}
              </div>

              <div v-for="blank in blankDays" :key="'blank-' + blank" class="bg-brand-layoutBg/50 p-2 h-24 sm:h-32">
              </div>

              <div v-for="day in daysInMonth" :key="day.date" :class="[
                'p-2 text-center relative h-24 sm:h-32 overflow-hidden cursor-pointer transition-colors',
                isToday(day.date)
                  ? 'bg-indigo-500/20 border-2 border-indigo-500'
                  : 'bg-brand-layoutBg hover:bg-[var(--bg-hover)]',
                day.isHoliday ? 'bg-green-500/20 border border-green-500' : '',
              ]">
                <span :class="[
                  'text-sm sm:text-base font-medium',
                  isToday(day.date)
                    ? 'text-indigo-400 font-bold'
                    : 'text-tx-secondary',
                  day.isHoliday ? 'text-green-400 font-bold' : '',
                ]">
                  {{ day.dayNumber }}
                </span>
                <div v-if="day.isHoliday && day.holidayName"
                  class="mt-1 text-xs text-green-400 break-words leading-tight px-1">
                  <p class="font-semibold mt-2">
                    {{ localizedHolidayName(day) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import arabHolidays from "@/layers/base/assets/arab-holidays.json";
import { supportedCurrencies } from "@/layers/base/config/i18n.config";
import type { DayInfo } from "@/layers/base/types/tables";

const { t } = useI18n();
const settingsStore = useSettingsStore();
const { loading, error } = storeToRefs(settingsStore);
const { triggerToast } = useToast();
const { locale } = useI18n();

const form = ref({
  workDays: [] as number[],
  workHours: { start: "09:00", end: "17:00" },
  holidayCountryCode: "EG",
  customHolidays: [] as { name: string; date: string }[],
  currency: "EGP",
});

// Calendar state
const currentDate = ref(new Date());

// Calendar computed properties
const dayHeaders = computed(() => [
  t("global_config.days.sunday"),
  t("global_config.days.monday"),
  t("global_config.days.tuesday"),
  t("global_config.days.wednesday"),
  t("global_config.days.thursday"),
  t("global_config.days.friday"),
  t("global_config.days.saturday"),
]);

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const monthName = computed(() => {
  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];
  return months[currentMonth.value];
});

// Get holidays for the selected country
const selectedCountryHolidays = computed(() => {
  if (!arabHolidays || arabHolidays.length === 0) return [];
  const countryData = arabHolidays.find(
    (country: any) => country.country_code === form.value.holidayCountryCode
  );
  return countryData ? countryData.holidays : [];
});

// Check if a specific date is a holiday
const isHolidayDate = (dateString: string) => {
  return selectedCountryHolidays.value.find(
    (holiday: any) => holiday.date === dateString
  );
}

const localizedHolidayName = (day: any) => {
  if (!day.holidayName) return "";
  const loc = locale.value || "en";
  return loc.startsWith("ar") ? day.holidayName.ar : day.holidayName.en;
};

// Get the number of days in the current month
const numDaysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  return new Date(year, month + 1, 0).getDate();
});

// Get the first day of the month (0 for Sunday, 1 for Monday, etc.)
const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  return new Date(year, month, 1).getDay();
});

// Generate blank days to align the start of the month
const blankDays = computed(() => {
  return Array(firstDayOfMonth.value).fill(null);
});

// Generate the actual days for the calendar grid
const daysInMonth = computed<DayInfo[]>(() => {
  const days: DayInfo[] = [];
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  for (let i = 1; i <= numDaysInMonth.value; i++) {
    // Create date string without timezone conversion
    const dateString: string = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(i).padStart(2, "0")}`;
    const holidayInfo: any = isHolidayDate(dateString);
    days.push({
      date: dateString,
      dayNumber: i,
      isHoliday: !!holidayInfo,
      holidayName: holidayInfo
        ? { en: holidayInfo.name_en || "", ar: holidayInfo.name_ar || "" }
        : null,
    });
  }
  return days;
});

// Calendar navigation
const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

// Helper to check if a date is today
const isToday = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse the date string and create a local date (not UTC)
  const [year, month, day] = dateString.split("-").map(Number);
  const compareDate = new Date(year, month - 1, day);
  compareDate.setHours(0, 0, 0, 0);

  return today.getTime() === compareDate.getTime();
}

const weekDays = computed(() => [
  { value: 0, label: t("global_config.days.sunday") },
  { value: 1, label: t("global_config.days.monday") },
  { value: 2, label: t("global_config.days.tuesday") },
  { value: 3, label: t("global_config.days.wednesday") },
  { value: 4, label: t("global_config.days.thursday") },
  { value: 5, label: t("global_config.days.friday") },
  { value: 6, label: t("global_config.days.saturday") },
]);

onMounted(async () => {
  await settingsStore.fetchSettings();
  form.value = JSON.parse(JSON.stringify(settingsStore.settings)); // Deep copy
  // Ensure defaults if fields missing from DB
  if (!form.value.workHours)
    form.value.workHours = { start: "09:00", end: "17:00" };
  if (!form.value.holidayCountryCode) form.value.holidayCountryCode = "EG";
  if (!form.value.customHolidays) form.value.customHolidays = [];
});

const addHoliday = () => {
  form.value.customHolidays.push({
    name: "",
    date: "",
  });
}

const removeHoliday = (index: number) => {
  form.value.customHolidays.splice(index, 1);
}

const save = async () => {
  const result = await settingsStore.updateSettings(form.value);
  if (result.success) {
    triggerToast({
      message: t("toast.settings_saved"),
      type: "success",
      icon: "mdi-check-circle",
    });
  } else {
    triggerToast({
      message: result.error || t("toast.failed_to_save_settings"),
      type: "error",
      icon: "material-symbols:error-outline-rounded",
    });
  }
}

useSeoPage({
  title: () => t("meta.global_config"),
  description: () => t("meta.global_config_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});

</script>