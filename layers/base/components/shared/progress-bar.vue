<template>
  <div>
    <div v-show="isLoading" class="fixed top-0 z-50 w-full h-1 transition-all duration-300 bg-blue-500 start-0"
      :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script lang="ts" setup>
const progress = ref(0);
const isLoading = ref(false);
const { pause: stopInterval, resume: resumeInterval } = useIntervalFn(() => {
  if (progress.value < 95) {
    progress.value += Math.random() * 5 + 5;
  }
}, 2000, { immediate: false });

const { start: startStopTimer } = useTimeoutFn(() => {
  isLoading.value = false;
  progress.value = 0;
}, 1000, { immediate: false });

const router = useRouter();

const startProgress = (): void => {
  progress.value = 0;
  isLoading.value = true;
  resumeInterval();
};

const stopProgress = (): void => {
  stopInterval();
  progress.value = 100;
  startStopTimer();
};

onMounted(() => {
  router.beforeEach(() => {
    startProgress();
    return true;
  });
  router.afterEach(() => {
    stopProgress();
  });
});

</script>