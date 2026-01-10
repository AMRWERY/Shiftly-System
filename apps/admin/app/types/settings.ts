export interface Holiday {
  name: string;
  date: string; // ISO date string YYYY-MM-DD
}

export interface WorkHours {
  start: string; // "09:00"
  end: string; // "17:00"
}

export interface SystemSettings {
  workDays: number[]; // 0-6 (Sunday-Saturday)
  workHours: WorkHours;
  holidayCountryCode: string; // e.g. "EG", "SA"
  customHolidays: Holiday[];
  currency: string;
}

export interface AppSettings {
  id: string; // Singleton ID usually
  system_settings: SystemSettings;
  created_at?: string;
  updated_at?: string;
}

export interface DayInfo {
  date: string;
  dayNumber: number;
  isHoliday: boolean;
  holidayName: { en: string; ar: string } | null;
}
