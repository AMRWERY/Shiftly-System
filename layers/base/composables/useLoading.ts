export const useLoading = (duration = 3000) => {
  const isLoading = ref(false);
  const { start: startTimer } = useTimeoutFn(
    () => {
      isLoading.value = false;
    },
    duration,
    { immediate: false },
  );

  const startLoading = () => {
    isLoading.value = true;
    startTimer();
  };

  return {
    isLoading,
    startLoading,
  };
}
