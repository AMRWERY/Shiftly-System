<template>
  <div>
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">
          {{ t("global_config.title") }}
        </h1>
        <base-button
          type="button"
          :padding-x="'px-4'"
          :padding-y="'py-2'"
          @click="save"
          :disabled="loading"
        >
          {{ t("global_config.save_settings") }}
        </base-button>
      </div>

      <!-- Alert Error -->
      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ms-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Work Days Section -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            {{ t("global_config.work_days") }}
          </h2>
          <p class="text-sm text-gray-500 mb-4">
            {{ t("global_config.select_work_days") }}
          </p>

          <div class="space-y-4">
            <!-- Days Checkboxes -->
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="day in weekDays"
                :key="day.value"
                class="flex items-center"
              >
                <input
                  :id="`day-${day.value}`"
                  type="checkbox"
                  :value="day.value"
                  v-model="form.workDays"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label
                  :for="`day-${day.value}`"
                  class="ms-3 text-sm leading-6 text-gray-900 font-medium"
                >
                  {{ day.label }}
                </label>
              </div>
            </div>

            <!-- Work Hours -->
            <div
              class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-4"
            >
              <div>
                <label
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  {{ t("global_config.start_time") }}
                </label>
                <input
                  type="time"
                  v-model="form.workHours.start"
                  class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  {{ t("global_config.end_time") }}
                </label>
                <input
                  type="time"
                  v-model="form.workHours.end"
                  class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Currency Section -->
        <div class="bg-white shadow rounded-lg p-6 h-fit">
          <h2 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            {{ t("global_config.currency") }}
          </h2>
          <div>
            <label
              for="currency"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {{ t("global_config.currency") }}
            </label>
            <div class="mt-2">
              <select
                id="currency"
                v-model="form.currency"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 hide-scrollbar"
              >
                <option
                  v-for="(name, code) in supportedCurrencies"
                  :key="code"
                  :value="code"
                >
                  {{ code }} - {{ name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Holidays Section -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium leading-6 text-gray-900 mb-4">
          {{ t("global_config.official_holidays") }}
        </h2>

        <!-- Country Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-1">
            {{ t("global_config.select_country") }}
          </label>
          <select
            v-model="form.holidayCountryCode"
            class="hide-scrollbar block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option
              v-for="country in arabHolidays"
              :key="country.country_code"
              :value="country.country_code"
            >
              {{
                $i18n.locale === "ar"
                  ? country.country_name_ar
                  : country.country_name_en
              }}
            </option>
          </select>
          <p class="mt-1 text-sm text-gray-500">
            {{ t("global_config.country_holidays_description") }}
          </p>
        </div>

        <!-- Custom Holidays Divider -->
        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-start">
            <span class="bg-white pe-2 text-sm text-gray-500">{{
              t("global_config.custom_holidays")
            }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-medium leading-6 text-gray-900">
            {{ t("global_config.additional_holidays") }}
          </h3>
          <base-button
            type="button"
            :padding-x="'px-4'"
            :padding-y="'py-2'"
            @click="addHoliday"
          >
            {{ t("global_config.add_holiday") }}
          </base-button>
        </div>

        <div
          v-if="form.customHolidays.length === 0"
          class="text-center py-6 text-gray-500 text-sm"
        >
          {{ t("global_config.no_custom_holidays") }}
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(holiday, index) in form.customHolidays"
            :key="index"
            class="flex gap-4 items-end border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div class="flex-1">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                {{ t("global_config.holiday_name") }}
              </label>
              <input
                type="text"
                v-model="holiday.name"
                class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                {{ t("global_config.holiday_date") }}
              </label>
              <input
                type="date"
                v-model="holiday.date"
                class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="button"
              @click="removeHoliday(index)"
              class="rounded bg-red-50 p-2 text-red-600 hover:bg-red-100"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Holiday Calendar Preview -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium leading-6 text-gray-900">
            {{ t("global_config.holiday_calendar") }}
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            {{ t("global_config.preview_holidays_for_country") }}
          </p>
        </div>

        <div class="p-6">
          <div
            class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
          >
            <div
              class="flex items-center justify-between px-6 py-4 bg-gray-800 text-white rounded-t-lg"
            >
              <button
                @click="prevMonth"
                class="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <icon
                  name="material-symbols:chevron-left"
                  class="w-6 h-6 rtl:rotate-180"
                />
              </button>
              <h2 class="text-xl font-semibold">
                {{ monthName }} {{ currentYear }}
              </h2>
              <button
                @click="nextMonth"
                class="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <icon
                  name="material-symbols:chevron-right"
                  class="w-6 h-6 rtl:rotate-180"
                />
              </button>
            </div>

            <div class="grid grid-cols-7 gap-px bg-gray-200">
              <div
                v-for="day in dayHeaders"
                :key="day"
                class="text-center py-3 bg-gray-100 text-gray-700 font-medium text-sm"
              >
                {{ day }}
              </div>

              <div
                v-for="blank in blankDays"
                :key="'blank-' + blank"
                class="bg-gray-50 p-2 h-24 sm:h-32"
              ></div>

              <div
                v-for="day in daysInMonth"
                :key="day.date"
                :class="[
                  'p-2 text-center relative h-24 sm:h-32 overflow-hidden cursor-pointer transition-colors',
                  isToday(day.date)
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white hover:bg-gray-50',
                  day.isHoliday ? 'bg-green-100 border border-green-400' : '',
                ]"
              >
                <span
                  :class="[
                    'text-sm sm:text-base font-medium',
                    isToday(day.date)
                      ? 'text-blue-700 font-bold'
                      : 'text-gray-800',
                    day.isHoliday ? 'text-green-700 font-bold' : '',
                  ]"
                >
                  {{ day.dayNumber }}
                </span>
                <div
                  v-if="day.isHoliday && day.holidayName"
                  class="mt-1 text-xs text-green-600 break-words leading-tight px-1"
                >
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
import { storeToRefs } from "pinia";
// @ts-ignore
import arabHolidays from "../../../../layers/base/assets/arab-holidays.json";
// @ts-ignore
import { supportedCurrencies } from "../../../../layers/base/config/i18n.config";

interface DayInfo {
  date: string;
  dayNumber: number;
  isHoliday: boolean;
  holidayName: { en: string; ar: string } | null;
}

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
function isHolidayDate(dateString: string) {
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
function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

// Helper to check if a date is today
function isToday(dateString: string) {
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

function addHoliday() {
  form.value.customHolidays.push({
    name: "",
    date: "",
  });
}

function removeHoliday(index: number) {
  form.value.customHolidays.splice(index, 1);
}

async function save() {
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

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: t("meta.global_config"),
});
</script>