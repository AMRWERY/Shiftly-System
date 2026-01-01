export const useIsActive = () => {
  const route = useRoute();

  const isActive = (path: string) => {
    const currentRouteName = route.name?.toString();
    if (!currentRouteName) return false;

    // Exact match for root (index)
    if (path === "/") {
      return /^index($|___)/.test(currentRouteName);
    }

    // Extract key from path (e.g., /users -> users)
    const key = path.replace(/^\//, "");

    // Check if current route name starts with the key (handles nested routes like users-id)
    return currentRouteName.startsWith(key);
  };

  return {
    isActive,
  };
};
