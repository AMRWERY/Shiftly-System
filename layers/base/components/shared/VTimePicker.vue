<template>
  <div>
    <div class="time-picker">
      <div ref="anchorRef" class="relative">
        <!-- Input field -->
        <div class="relative">
          <input
            type="text"
            :value="formattedTime"
            readonly
            :disabled="disabled"
            @click="toggleDropdown"
            :placeholder="placeholder || t('form.select_time')"
            class="w-full px-3 py-2 pe-9 transition duration-300 border border-[var(--border-default)] bg-brand-systemBg rounded-md shadow-sm placeholder:text-gray-500 text-tx-primary focus:outline-none focus:border-indigo-500 hover:border-gray-600 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'cursor-pointer': !disabled }"
          />
          <div
            class="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-3"
          >
            <Icon
              name="material-symbols:schedule-outline"
              class="w-5 h-5 text-gray-500"
            />
          </div>
        </div>

        <!-- Time dropdown — teleported so card backdrop-filters can't trap or clip it -->
        <Teleport to="body">
          <div
            v-if="showDropdown"
            ref="panelRef"
            :style="panelStyle"
            class="time-picker-panel fixed z-[1000] w-[240px] bg-bg-elevated border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-3 py-2 border-b border-[var(--border-default)]"
            >
              <span class="text-xs font-medium tracking-wide text-gray-400">{{
                t("time.select_time")
              }}</span>
              <span class="font-semibold text-tx-primary tabular-nums">{{
                formattedTime || "--:--"
              }}</span>
            </div>

            <!-- Columns -->
            <div
              class="grid"
              :class="use24Hours ? 'grid-cols-2' : 'grid-cols-3'"
            >
              <!-- Hours -->
              <div class="border-e border-[var(--border-default)]">
                <p
                  class="py-1.5 text-[10px] font-medium tracking-wider text-center text-gray-500 border-b border-[var(--border-default)]"
                >
                  {{ t("time.hour") }}
                </p>
                <div
                  ref="hourColRef"
                  class="h-48 overflow-y-auto hide-scrollbar p-1.5 space-y-1"
                >
                  <LazyVButton
                    v-for="hour in hourOptions"
                    :key="`h-${hour}`"
                    type="button"
                    variant="ghost"
                    block
                    :data-selected="hour === selectedHour"
                    padding-x="px-0"
                    padding-y="py-1.5"
                    :class="[
                      'w-full text-sm rounded-lg tabular-nums transition-colors',
                      hour === selectedHour
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-white/5',
                    ]"
                    @click="selectHour(hour)"
                  >
                    {{ pad(hour) }}
                  </LazyVButton>
                </div>
              </div>

              <!-- Minutes -->
              <div
                :class="
                  use24Hours ? '' : 'border-e border-[var(--border-default)]'
                "
              >
                <p
                  class="py-1.5 text-[10px] font-medium tracking-wider text-center text-gray-500 border-b border-[var(--border-default)]"
                >
                  {{ t("time.minute") }}
                </p>
                <div
                  ref="minuteColRef"
                  class="h-48 overflow-y-auto hide-scrollbar p-1.5 space-y-1"
                >
                  <LazyVButton
                    v-for="minute in minuteOptions"
                    :key="`m-${minute}`"
                    type="button"
                    variant="ghost"
                    block
                    :data-selected="minute === selectedMinute"
                    padding-x="px-0"
                    padding-y="py-1.5"
                    :class="[
                      'w-full text-sm rounded-lg tabular-nums transition-colors',
                      minute === selectedMinute
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-white/5',
                    ]"
                    @click="selectMinute(minute)"
                  >
                    {{ pad(minute) }}
                  </LazyVButton>
                </div>
              </div>

              <!-- Meridiem -->
              <div v-if="!use24Hours">
                <p
                  class="py-1.5 text-[10px] font-medium tracking-wider text-center text-gray-500 border-b border-[var(--border-default)]"
                >
                  {{ t("time.period") }}
                </p>
                <div class="p-1.5 space-y-1">
                  <LazyVButton
                    v-for="period in ['am', 'pm'] as Meridiem[]"
                    :key="period"
                    type="button"
                    variant="ghost"
                    block
                    padding-x="px-0"
                    padding-y="py-1.5"
                    :class="[
                      'w-full text-sm rounded-lg uppercase transition-colors',
                      parsed && period === selectedMeridiem
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-white/5',
                    ]"
                    @click="selectMeridiem(period)"
                  >
                    {{ t(`time.${period}`) }}
                  </LazyVButton>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="flex items-center justify-between gap-2 px-2 py-2 border-t border-[var(--border-default)]"
            >
              <LazyVButton
                type="button"
                variant="ghost"
                padding-x="px-2"
                padding-y="py-1"
                hover-color="hover:bg-white/5"
                class="rounded-lg text-xs text-gray-400"
                @click="selectNow"
              >
                {{ t("time.now") }}
              </LazyVButton>
              <LazyVButton
                type="button"
                padding-x="px-3"
                padding-y="py-1"
                class="rounded-lg text-xs"
                @click="showDropdown = false"
              >
                {{ t("btn.done") }}
              </LazyVButton>
            </div>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Meridiem } from "@/types/VTimePicker";

const { t } = useI18n();
const { isRTL } = storeToRefs(useLocaleStore());

const props = defineProps({
  // 24-hour "HH:mm" string, so the value stays compatible with <input type="time"> and the DB
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  // Show a 24-hour clock instead of 12-hour + AM/PM
  use24Hours: {
    type: Boolean,
    default: false,
  },
  minuteStep: {
    type: Number,
    default: 5,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const hourColRef = ref<HTMLElement | null>(null);
const minuteColRef = ref<HTMLElement | null>(null);
const anchorRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const panelStyle = ref<Record<string, string>>({});

const PANEL_WIDTH = 240;
const VIEWPORT_GAP = 8;

// The panel is teleported to <body> and fixed-positioned, so it has to be
// placed against the input manually — recomputed on open, scroll and resize.
const updatePanelPosition = () => {
  const anchor = anchorRef.value;
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  const panelHeight = panelRef.value?.offsetHeight ?? 320;

  // Flip above the input when there isn't room below
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUpwards =
    spaceBelow < panelHeight + VIEWPORT_GAP && rect.top > spaceBelow;
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

const pad = (value: number) => String(value).padStart(2, "0");

// Parse the incoming "HH:mm" into 24-hour parts; null when unset or malformed
const parsed = computed(() => {
  if (!props.modelValue) return null;
  const [rawHour, rawMinute] = props.modelValue.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return { hour, minute };
});

const selectedMeridiem = computed<Meridiem>(() =>
  (parsed.value?.hour ?? 0) >= 12 ? "pm" : "am",
);

// Hour as shown in the column — 0-23 in 24h mode, 1-12 otherwise
const selectedHour = computed(() => {
  const hour = parsed.value?.hour;
  if (hour === undefined) return null;
  if (props.use24Hours) return hour;
  return hour % 12 === 0 ? 12 : hour % 12;
});

const selectedMinute = computed(() => parsed.value?.minute ?? null);

const hourOptions = computed(() =>
  props.use24Hours
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1),
);

const minuteOptions = computed(() => {
  const step = props.minuteStep > 0 ? props.minuteStep : 1;
  return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
});

const formattedTime = computed(() => {
  if (!parsed.value) return "";
  const { hour, minute } = parsed.value;
  if (props.use24Hours) return `${pad(hour)}:${pad(minute)}`;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${pad(displayHour)}:${pad(minute)} ${t(`time.${hour >= 12 ? "pm" : "am"}`)}`;
});

// Convert a column hour back to 24-hour form before emitting
const to24Hour = (hour: number, meridiem: Meridiem) => {
  if (props.use24Hours) return hour;
  if (meridiem === "pm") return hour === 12 ? 12 : hour + 12;
  return hour === 12 ? 0 : hour;
};

const emitTime = (hour: number, minute: number) => {
  emit("update:modelValue", `${pad(hour)}:${pad(minute)}`);
};

const selectHour = (hour: number) => {
  emitTime(to24Hour(hour, selectedMeridiem.value), selectedMinute.value ?? 0);
};

const selectMinute = (minute: number) => {
  const hour =
    parsed.value?.hour ??
    to24Hour(selectedHour.value ?? 12, selectedMeridiem.value);
  emitTime(hour, minute);
};

const selectMeridiem = (meridiem: Meridiem) => {
  // Already on this half of the day — only fill in a value when there wasn't one
  if (parsed.value && meridiem === selectedMeridiem.value) return;
  const hour = parsed.value?.hour ?? 0;
  emitTime(
    meridiem === "pm" ? (hour % 12) + 12 : hour % 12,
    selectedMinute.value ?? 0,
  );
};

const selectNow = () => {
  const now = new Date();
  const step = props.minuteStep > 0 ? props.minuteStep : 1;
  // Snap to the nearest selectable minute so the column can highlight it
  const minute = (Math.round(now.getMinutes() / step) * step) % 60;
  const hour =
    minute === 0 && now.getMinutes() > 30
      ? (now.getHours() + 1) % 24
      : now.getHours();
  emitTime(hour, minute);
};

// Bring the active hour/minute into view whenever the panel opens
const scrollSelectedIntoView = () => {
  nextTick(() => {
    for (const column of [hourColRef.value, minuteColRef.value]) {
      const active = column?.querySelector(
        '[data-selected="true"]',
      ) as HTMLElement | null;
      if (!active || !column) continue;
      // Measured rather than offsetTop — the button sits inside a VButton wrapper that isn't positioned
      const activeRect = active.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      column.scrollTop +=
        activeRect.top -
        columnRect.top -
        column.clientHeight / 2 +
        activeRect.height / 2;
    }
  });
};

const toggleDropdown = () => {
  if (props.disabled) return;
  showDropdown.value = !showDropdown.value;
  if (!showDropdown.value) return;
  // Place it once against the pre-render estimate, then again once measurable
  updatePanelPosition();
  nextTick(updatePanelPosition);
  scrollSelectedIntoView();
};

// Close when clicking outside — the panel is teleported, so it is not inside .time-picker
const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as Element).closest(".time-picker, .time-picker-panel")) {
    showDropdown.value = false;
  }
};

// `true` captures scrolls on any ancestor container, not just the window
const handleReposition = () => {
  if (showDropdown.value) updatePanelPosition();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleReposition, true);
  window.addEventListener("resize", handleReposition);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleReposition, true);
  window.removeEventListener("resize", handleReposition);
});
</script>
