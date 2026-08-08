<template>
  <div>
    <div class="date-picker">
      <div ref="anchorRef" class="relative">
        <!-- Input field -->
        <div class="relative">
          <input type="text" :value="formattedDate" readonly @click="toggleCalendar"
            :placeholder="t('form.select_date')"
            class="w-full px-3 py-2 pe-9 transition duration-300 border border-[var(--border-default)] bg-brand-systemBg rounded-md shadow-sm placeholder:text-gray-500 text-tx-primary focus:outline-none focus:border-indigo-500 hover:border-gray-600 focus:shadow" />
          <div class="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-3">
            <Icon name="material-symbols:calendar-month" class="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <!-- Calendar dropdown — teleported so card backdrop-filters can't trap or clip it -->
        <Teleport to="body">
        <div v-if="showCalendar" ref="panelRef" :style="panelStyle"
          class="date-picker-panel fixed z-[1000] w-[303px] bg-bg-elevated border border-[var(--border-default)] rounded-xl shadow-2xl">
          <!-- Calendar header -->
          <div class="flex items-center justify-between p-2 border-b border-[var(--border-default)]">
            <LazyVButton type="button" variant="ghost" padding-x="px-1" padding-y="py-1" hover-color="hover:bg-white/5"
              class="rounded-full" @click="previousMonth">
              <Icon name="material-symbols:chevron-left" class="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </LazyVButton>
            <span class="font-semibold text-tx-primary">{{ currentMonthYear }}</span>
            <LazyVButton type="button" variant="ghost" padding-x="px-1" padding-y="py-1" hover-color="hover:bg-white/5"
              class="rounded-full" @click="nextMonth">
              <Icon name="material-symbols:chevron-right" class="w-5 h-5 text-gray-400 rtl:rotate-180" />
            </LazyVButton>
          </div>

          <!-- Days of week -->
          <div class="grid grid-cols-7 gap-1 p-2 text-center border-b border-[var(--border-default)]">
            <span v-for="day in daysOfWeek" :key="day" class="text-xs font-medium text-gray-400">
              {{ day }}
            </span>
          </div>

          <!-- Calendar days -->
          <div class="grid grid-cols-7 gap-1 p-2">
            <LazyVButton v-for="{ date, isCurrentMonth, isToday } in calendarDays" :key="date.toISOString()"
              type="button" variant="ghost" padding-x="px-0" padding-y="py-0" class="flex items-center justify-center"
              :disabled="isDateDisabled(date)"
              :hover-color="isSelected(date) ? 'hover:bg-indigo-700' : 'hover:bg-white/5'" :class="[
                'w-8 h-8 text-sm rounded-full',
                isCurrentMonth ? 'text-gray-200' : 'text-gray-500',
                isToday ? 'bg-indigo-500/20 text-indigo-400' : '',
                isSelected(date) ? 'bg-indigo-600 text-white' : '',
              ]" @click="selectDate(date)">
              {{ date.getDate() }}
            </LazyVButton>
          </div>
        </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { isRTL } = storeToRefs(useLocaleStore())

const props = defineProps({
  modelValue: {
    type: [Date, String] as PropType<Date | string | null>,
    // type: Date as PropType<Date | null>,
    default: null,
  },
  // Opt-in: only forward-looking pickers (e.g. leave requests) should block past dates
  disablePast: {
    type: Boolean,
    default: false,
  },
  // 'date' emits a Date object; 'string' emits "YYYY-MM-DD" for string-typed models
  valueFormat: {
    type: String as PropType<'date' | 'string'>,
    default: 'date',
  },
});

const emit = defineEmits(['update:modelValue']);

const showCalendar = ref(false);
const currentDate = ref(props.modelValue || new Date());
const anchorRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const panelStyle = ref<Record<string, string>>({});

const PANEL_WIDTH = 303;
const VIEWPORT_GAP = 8;

/** Local-time "YYYY-MM-DD" — never via toISOString(), which shifts the day by the UTC offset */
const toISODate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** Parse a model value; bare "YYYY-MM-DD" is read as local midnight, not UTC midnight */
const toDate = (value: Date | string) => {
  if (typeof value !== 'string') return value;
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!dateOnly) return new Date(value);
  return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
};

// Days of week
const daysOfWeek = [t('global_config.days.sunday'), t('global_config.days.monday'), t('global_config.days.tuesday'), t('global_config.days.wednesday'), t('global_config.days.thursday'), t('global_config.days.friday'), t('global_config.days.saturday')];

// Format date for display
const dateValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Format date for display
const formattedDate = computed(() => {
  if (!dateValue.value) return '';
  return toISODate(toDate(dateValue.value));
});

// Handle date selection
const selectDate = (date: Date) => {
  // Built from local getters, so "YYYY-MM-DD" never shifts a day via UTC conversion
  emit('update:modelValue', props.valueFormat === 'string' ? toISODate(date) : new Date(date));
  showCalendar.value = false;
};

// Current month and year display
const currentMonthYear = computed(() => {
  const date = toDate(currentDate.value);
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
  const date = toDate(currentDate.value);
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
  return props.modelValue && isSameDate(date, toDate(props.modelValue));
};

// The panel is teleported to <body> and fixed-positioned, so it has to be
// placed against the input manually — recomputed on open, scroll and resize.
const updatePanelPosition = () => {
  const anchor = anchorRef.value;
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  const panelHeight = panelRef.value?.offsetHeight ?? 340;

  // Flip above the input when there isn't room below
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUpwards = spaceBelow < panelHeight + VIEWPORT_GAP && rect.top > spaceBelow;
  const top = openUpwards
    ? Math.max(VIEWPORT_GAP, rect.top - panelHeight - VIEWPORT_GAP)
    : rect.bottom + VIEWPORT_GAP;

  // Align to the input's start edge, then pull back inside the viewport
  const preferredLeft = isRTL.value ? rect.right - PANEL_WIDTH : rect.left;
  const left = Math.min(
    Math.max(VIEWPORT_GAP, preferredLeft),
    window.innerWidth - PANEL_WIDTH - VIEWPORT_GAP,
  );

  panelStyle.value = { top: `${top}px`, left: `${left}px` };
};

// Actions
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
  if (!showCalendar.value) return;
  // Place it once against the pre-render estimate, then again once measurable
  updatePanelPosition();
  nextTick(updatePanelPosition);
};

// const selectDate = (date: Date) => {
//   emit('update:modelValue', date);
//   showCalendar.value = false;
// };

const shiftMonth = (offset: number) => {
  const date = toDate(currentDate.value);
  currentDate.value = new Date(date.getFullYear(), date.getMonth() + offset, 1);
};

const previousMonth = () => shiftMonth(-1);

const nextMonth = () => shiftMonth(1);

// Close calendar when clicking outside — the panel is teleported, so it is not inside .date-picker
const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.date-picker, .date-picker-panel')) {
    showCalendar.value = false
  }
};

// `true` captures scrolls on any ancestor container, not just the window
const handleReposition = () => {
  if (showCalendar.value) updatePanelPosition();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleReposition, true);
  window.addEventListener('resize', handleReposition);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleReposition, true);
  window.removeEventListener('resize', handleReposition);
});

const isDateDisabled = (date: Date): boolean => {
  if (!props.disablePast) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day
  return date < today;
};
</script>