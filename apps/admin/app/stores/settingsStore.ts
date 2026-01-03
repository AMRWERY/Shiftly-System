import type { SystemSettings, AppSettings } from "../types/settings";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: {
      workDays: [0, 1, 2, 3, 4], // Default: Sunday to Thursday
      workHours: { start: "09:00", end: "17:00" },
      holidayCountryCode: "EG",
      customHolidays: [],
      currency: "EGP",
    } as SystemSettings,
    loading: false,
    error: null as string | null,
    initialized: false,
  }),

  actions: {
    /**
     * Fetch system settings from DB
     */
    async fetchSettings() {
      if (this.initialized) return;
      const supabase = useSupabaseClient();
      this.loading = true;
      this.error = null;
      try {
        // Fetch the first row from app_settings
        const { data, error } = await supabase
          .from("app_settings")
          .select("system_settings")
          .single();
        if (error) {
          // If table doesn't exist or empty, we might want to handle it gracefully
          // keeping default values
          if (error.code !== "PGRST116") {
            // PGRST116 is JSON object null or no rows
            console.error("Error fetching settings:", error);
          }
        }
        if (data?.system_settings) {
          this.settings = { ...this.settings, ...data.system_settings };
        }
        this.initialized = true;
      } catch (err: any) {
        console.error("Settings fetch error:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update system settings
     */
    async updateSettings(newSettings: Partial<SystemSettings>) {
      const supabase = useSupabaseClient();
      this.loading = true;
      this.error = null;
      try {
        const updatedSettings = { ...this.settings, ...newSettings };
        // Upsert logic. Since we might not have an ID, we assume there's only one row
        // or we need to know the ID.
        // For simplicity, we'll try to update if exists, or insert if empty.
        // First check if a row exists
        const { data: existing } = await supabase
          .from("app_settings")
          .select("id")
          .single();
        let error;
        if (existing) {
          const result = await supabase
            .from("app_settings")
            .update({
              system_settings: updatedSettings,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);
          error = result.error;
        } else {
          // Insert new row
          const result = await supabase.from("app_settings").insert({
            system_settings: updatedSettings,
          });
          error = result.error;
        }
        if (error) throw error;
        this.settings = updatedSettings;
        return { success: true };
      } catch (err: any) {
        console.error("Settings update error:", err);
        return { success: false, error: err.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Reset to defaults
     */
    resetSettings() {
      this.settings = {
        workDays: [0, 1, 2, 3, 4],
        workHours: { start: "09:00", end: "17:00" },
        holidayCountryCode: "EG",
        customHolidays: [],
        currency: "EGP",
      };
    },
  },

  getters: {
    getWorkDays: (state) => state.settings.workDays,

    getWorkHours: (state) => state.settings.workHours,

    getHolidayCountryCode: (state) => state.settings.holidayCountryCode,

    getCustomHolidays: (state) => state.settings.customHolidays,

    getCurrency: (state) => state.settings.currency,
  },
});
