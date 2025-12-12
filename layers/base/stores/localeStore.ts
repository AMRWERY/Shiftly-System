export type SupportedLocale = "en" | "ar";

type LocaleState = {
  locale: SupportedLocale;
  isOverlayVisible: boolean;
};

export const useLocaleStore = defineStore("locales", {
  state: (): LocaleState => ({
    locale: "en",
    isOverlayVisible: false,
  }),

  actions: {
    async updateLocale(newLocale: SupportedLocale) {
      if (!import.meta.client) return;

      this.isOverlayVisible = true;
      const nuxtApp = useNuxtApp();
      
      // Safely access i18n
      if (nuxtApp.$i18n) {
        const i18n = nuxtApp.$i18n as any;
        if (i18n.setLocale) {
          await i18n.setLocale(newLocale);
        }
      }

      // Update state
      this.locale = newLocale;

      if (typeof document !== "undefined") {
        document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLocale;
        try {
          localStorage.setItem("locale", newLocale);
        } catch (e) {
          // localStorage may not be available
        }
      }

      if (import.meta.client) {
        setTimeout(() => {
          this.isOverlayVisible = false;
        }, 500);
      }
    },

    loadLocale(): void {
      if (!import.meta.client) return;

      try {
        const savedLocale = localStorage.getItem("locale");
        if (savedLocale === "en" || savedLocale === "ar") {
          this.locale = savedLocale as SupportedLocale;
        }
      } catch (e) {
        // localStorage may not be available
      }
    },
  },

  getters: {
    isRTL(): boolean {
      return this.locale === "ar";
    },
  },
});
