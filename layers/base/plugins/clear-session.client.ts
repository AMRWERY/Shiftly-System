/**
 * Session Management Plugin
 *
 * This plugin ensures that Supabase sessions are cleared when the browser is closed.
 * It uses a timestamp in sessionStorage to detect if the browser was fully closed.
 *
 * Priority: -1 (runs early, before other plugins and middleware)
 */

export default defineNuxtPlugin({
  name: "clear-session",
  parallel: false,
  async setup() {
    if (process.client) {
      const supabase = useSupabaseClient();
      const SESSION_TIMESTAMP_KEY = "sb-session-timestamp";

      const sessionTimestamp = useSessionStorage<string | null>(
        SESSION_TIMESTAMP_KEY,
        null,
      );

      // If there's no timestamp in sessionStorage, it means the browser was closed
      // So we need to clear all auth data from localStorage
      if (!sessionTimestamp.value) {
        console.log("No active session detected - clearing all Supabase data");
        // Clear all Supabase-related data from localStorage
        for (const key of Object.keys(localStorage)) {
          if (key.includes("supabase") || key.startsWith("sb-")) {
            console.log("Removing key:", key);
            useLocalStorage(key, null).value = null;
          }
        }
        // Force sign out
        try {
          await supabase.auth.signOut({ scope: "local" });
        } catch (error) {
          console.error("Error signing out:", error);
        }
      } else {
        console.log(
          "Active session detected - session age:",
          Date.now() - parseInt(sessionTimestamp.value),
          "ms",
        );
      }
      // Update the timestamp to mark this session as active
      sessionTimestamp.value = Date.now().toString();
      // Update timestamp periodically to keep session "alive"
      useIntervalFn(() => {
        sessionTimestamp.value = Date.now().toString();
      }, 30000); // Update every 30 seconds
    }
  },
});
