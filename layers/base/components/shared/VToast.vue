<template>
  <div>
    <transition name="toast-slide" mode="out-in">
      <div
        v-if="visible"
        class="relative flex items-center gap-3 w-full rounded-lg overflow-hidden shadow-xl border border-white/5 border-s-4 px-4 py-3"
        :class="[bgTintClass, accentBorderClass]"
        role="alert"
      >
        <!-- Icon -->
        <Icon
          :name="toastIconName"
          class="w-5 h-5 shrink-0"
          :class="iconColorClass"
        />

        <!-- Message -->
        <p class="text-sm text-slate-200 flex-1 leading-snug">{{ message }}</p>

        <!-- Close button -->
        <button
          type="button"
          aria-label="close"
          class="text-slate-500 hover:text-slate-300 transition-colors shrink-0 active:scale-90"
          @click="closeToast"
        >
          <Icon name="ph:x" class="w-4 h-4" />
        </button>

        <!-- Progress bar -->
        <div class="absolute bottom-0 start-0 w-full h-0.5 bg-white/5">
          <div
            class="h-full transition-all ease-linear"
            :class="progressBarColorClass"
            :style="progressBarStyle"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  toastType: {
    type: String,
    default: "info",
  },
  duration: {
    type: Number,
    default: 5000,
  },
});

const visible = ref(true);
const progressWidth = ref(100);
const emit = defineEmits(["toastClosed"]);

const bgTintClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "bg-emerald-950/60";
    case "error":
      return "bg-red-950/60";
    case "warning":
      return "bg-amber-950/60";
    default:
      return "bg-indigo-950/60";
  }
});

const accentBorderClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "border-s-emerald-500";
    case "error":
      return "border-s-red-500";
    case "warning":
      return "border-s-amber-500";
    default:
      return "border-s-indigo-500";
  }
});

const iconColorClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "text-emerald-400";
    case "error":
      return "text-red-400";
    case "warning":
      return "text-amber-400";
    default:
      return "text-indigo-400";
  }
});

const progressBarColorClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "bg-emerald-500";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-amber-500";
    default:
      return "bg-indigo-500";
  }
});

const toastIconName = computed(() => {
  switch (props.toastType) {
    case "success":
      return "ph:check-circle";
    case "error":
      return "ph:warning-circle";
    case "warning":
      return "ph:warning";
    default:
      return "ph:info";
  }
});

const progressBarStyle = computed(() => ({
  width: `${progressWidth.value}%`,
  transitionDuration: `${props.duration}ms`,
}));

const closeToast = () => {
  visible.value = false;
  emit("toastClosed");
};

const { start: startProgressTimer } = useTimeoutFn(
  () => {
    progressWidth.value = 0;
  },
  50,
  { immediate: false },
);

const { start: startCloseTimer } = useTimeoutFn(
  () => {
    closeToast();
  },
  props.duration,
  { immediate: false },
);

onMounted(() => {
  startProgressTimer();
  startCloseTimer();
});
</script>