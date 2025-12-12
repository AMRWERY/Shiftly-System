export function useSidebarDropdowns<T extends Record<string, boolean>>(
  initialStates: T
) {
  // Create a reactive object from the initial states
  const dropdownStates = ref<T>({ ...initialStates } as T);

  // Function to toggle a specific dropdown
  const toggleDropdown = (name: keyof T) => {
    dropdownStates.value[name] = !dropdownStates.value[name];
  };

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    Object.keys(dropdownStates.value).forEach((key) => {
      dropdownStates.value[key as keyof T] = false;
    });
  };

  // Function to open a specific dropdown and close others
  const openDropdown = (name: keyof T, closeOthers = true) => {
    if (closeOthers) {
      closeAllDropdowns();
    }
    dropdownStates.value[name] = true;
  };

  // Function to close a specific dropdown
  const closeDropdown = (name: keyof T) => {
    dropdownStates.value[name] = false;
  };

  return {
    dropdownStates,
    toggleDropdown,
    closeAllDropdowns,
    openDropdown,
    closeDropdown,
  };
}

