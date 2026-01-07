/**
 * Session Management Plugin
 * 
 * This plugin ensures that Supabase sessions are cleared when the browser is closed.
 * It uses a timestamp in sessionStorage to detect if the browser was fully closed.
 * 
 * Priority: -1 (runs early, before other plugins and middleware)
 */

export default defineNuxtPlugin({
  name: 'clear-session',
  parallel: false,
  async setup() {
    if (process.client) {
      const supabase = useSupabaseClient();
      const SESSION_TIMESTAMP_KEY = 'sb-session-timestamp';
      
      // Get the current timestamp from sessionStorage
      const lastSessionTimestamp = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);
      
      // If there's no timestamp in sessionStorage, it means the browser was closed
      // So we need to clear all auth data from localStorage
      if (!lastSessionTimestamp) {
        console.log('No active session detected - clearing all Supabase data');
        
        // Clear all Supabase-related data from localStorage
        const localStorageKeys = Object.keys(localStorage);
        for (const key of localStorageKeys) {
          if (key.includes('supabase') || key.startsWith('sb-')) {
            console.log('Removing key:', key);
            localStorage.removeItem(key);
          }
        }
        
        // Force sign out
        try {
          await supabase.auth.signOut({ scope: 'local' });
        } catch (error) {
          console.error('Error signing out:', error);
        }
      } else {
        console.log('Active session detected - session age:', Date.now() - parseInt(lastSessionTimestamp), 'ms');
      }
      
      // Update the timestamp to mark this session as active
      sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      
      // Update timestamp periodically to keep session "alive"
      setInterval(() => {
        sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      }, 30000); // Update every 30 seconds
    }
  }
});

