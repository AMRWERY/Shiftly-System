<template>
  <div>
    <div class="date-picker">
      <div class="relative">
        <!-- Input field -->
        <div class="relative">
          <input type="text" :value="formattedDate" readonly @click="toggleCalendar"
            :placeholder="t('form.select_date')"
            class="w-full px-3 py-2 transition duration-300 border border-gray-700 bg-brand-systemBg rounded-md shadow-sm placeholder:text-gray-500 text-white focus:outline-none focus:border-indigo-500 hover:border-gray-600 focus:shadow" />
          <div class="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-3">
            <icon name="material-symbols:calendar-month" class="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <!-- Calendar dropdown -->
        <div v-if="showCalendar"
          class="absolute z-10 w-[303px] mt-2 bg-brand-cardBg border border-gray-700 rounded-xl shadow-2xl">
          <!-- Calendar header -->
          <div class="flex items-center justify-between p-2 border-b border-gray-700">
            <VButton type="button" variant="ghost" padding-x="px-1" padding-y="py-1" hover-color="hover:bg-white/5" class="rounded-full" @click="previousMonth">
              <icon name="material-symbols:chevron-left" class="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </VButton>
            <span class="font-semibold text-white">{{ currentMonthYear }}</span>
            <VButton type="button" variant="ghost" padding-x="px-1" padding-y="py-1" hover-color="hover:bg-white/5" class="rounded-full" @click="nextMonth">
              <icon name="material-symbols:chevron-right" class="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </VButton>
          </div>

          <!-- Days of week -->
          <div class="grid grid-cols-7 gap-1 p-2 text-center border-b border-gray-700">
            <span v-for="day in daysOfWeek" :key="day" class="text-xs font-medium text-gray-400">
              {{ day }}
            </span>
          </div>

          <!-- Calendar days -->
          <div class="grid grid-cols-7 gap-1 p-2">
            <VButton
              v-for="{ date, isCurrentMonth, isToday } in calendarDays"
              :key="date.toISOString()"
              type="button"
              variant="ghost"
              padding-x="px-0"
              padding-y="py-0"
              :disabled="isDateDisabled(date)"
              :hover-color="isSelected(date) ? 'hover:bg-indigo-700' : 'hover:bg-white/5'"
              :class="[
                'w-8 h-8 text-sm rounded-full',
                isCurrentMonth ? 'text-gray-200' : 'text-gray-500',
                isToday ? 'bg-indigo-500/20 text-indigo-400' : '',
                isSelected(date) ? 'bg-indigo-600 text-white' : '',
              ]"
              @click="selectDate(date)"
            >
              {{ date.getDate() }}
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: [Date, String] as PropType<Date | string | null>,
    // type: Date as PropType<Date | null>,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const showCalendar = ref(false);
const currentDate = ref(props.modelValue || new Date());

// Days of week
const daysOfWeek = [t('days.sun'), t('days.mon'), t('days.tue'), t('days.wed'), t('days.thu'), t('days.fri'), t('days.sat')];

// Format date for display
const dateValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Format date for display
const formattedDate = computed(() => {
  if (!dateValue.value) return '';
  const date = typeof dateValue.value === 'string' ?
    new Date(dateValue.value) :
    dateValue.value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

// Handle date selection
const selectDate = (date: Date) => {
  emit('update:modelValue', new Date(date));
  showCalendar.value = false;
};

// Current month and year display
const currentMonthYear = computed(() => {
  const date = typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value;
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  // Map month index to translation keys
  const monthKeys = [
    'months.january',
    'months.february',
    'months.march',
    'months.april',
    'months.may',
    'months.june',
    'months.july',
    'months.august',
    'months.september',
    'months.october',
    'months.november',
    'months.december'
  ];
  const translatedMonth = t(monthKeys[monthIndex]!);
  return `${translatedMonth} ${year}`;
});

// Calendar days
const calendarDays = computed(() => {
  const date = typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value;
  const year = date.getFullYear();
  // const date = typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value;
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date()),
    });
  }

  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDate(date, new Date()),
    });
  }

  // Add days from next month
  const remainingDays = 42 - days.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date()),
    });
  }

  return days;
});

// Helper functions
const isSameDate = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

const isSelected = (date: Date) => {
  return props.modelValue && isSameDate(date, typeof props.modelValue === 'string' ? new Date(props.modelValue) : props.modelValue);
};

// Actions
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
};

// const selectDate = (date: Date) => {
//   emit('update:modelValue', date);
//   showCalendar.value = false;
// };

const previousMonth = () => {
  currentDate.value = new Date(
    (typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value).getFullYear(),
    (typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value).getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    (typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value).getFullYear(),
    (typeof currentDate.value === 'string' ? new Date(currentDate.value) : currentDate.value).getMonth() + 1,
    1
  );
};

// Close calendar when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.date-picker')) {
    showCalendar.value = false
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const isDateDisabled = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day
  return date < today;
};
</script>