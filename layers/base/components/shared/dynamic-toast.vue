<template>
  <div>
    <transition name="bounce" mode="out-in">
      <div
        v-if="visible"
        :class="`relative flex items-center justify-between w-full shadow bg-white h-[50px] rounded-lg overflow-hidden ${textColorClass}`"
        role="alert"
      >
        <!-- Left color bar -->
        <div class="h-full w-1.5" :class="borderColorClass"></div>

        <!-- Content -->
        <div class="flex items-center flex-1 px-3">
          <!-- Icon -->
          <icon :name="toastIconName" class="w-5 h-5 shrink-0" />

          <!-- Message -->
          <p class="text-sm ms-2 flex-1">{{ message }}</p>
        </div>

        <!-- Close button -->
        <button
          type="button"
          aria-label="close"
          class="active:scale-90 transition-all me-3 shrink-0"
          @click="closeToast"
        >
          <icon name="material-symbols:close-small-outline-rounded" />
        </button>

        <!-- Progress bar -->
        <div class="absolute bottom-0 w-full h-1 bg-gray-200 start-0">
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

const textColorClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "text-green-600";
    case "error":
      return "text-red-600";
    case "warning":
      return "text-yellow-600";
    default:
      return "text-blue-600";
  }
});

const borderColorClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "bg-green-600";
    case "error":
      return "bg-red-600";
    case "warning":
      return "bg-yellow-600";
    default:
      return "bg-blue-600";
  }
});

const progressBarColorClass = computed(() => {
  switch (props.toastType) {
    case "success":
      return "bg-green-600";
    case "error":
      return "bg-red-600";
    case "warning":
      return "bg-yellow-600";
    default:
      return "bg-blue-600";
  }
});

const toastIconName = computed(() => {
  switch (props.toastType) {
    case "success":
      return "heroicons:check-circle";
    case "error":
      return "heroicons:x-circle";
    case "warning":
      return "heroicons:exclamation-triangle";
    default:
      return "heroicons:information-circle";
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

onMounted(() => {
  setTimeout(() => {
    progressWidth.value = 0;
  }, 50);

  setTimeout(() => {
    closeToast();
  }, props.duration);
});
</script>

<style scoped>
.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
</style>
