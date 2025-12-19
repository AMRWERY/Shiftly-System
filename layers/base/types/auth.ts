import type { User, Session } from "@supabase/supabase-js";
import type { UserRole } from "./index";

export interface UserAuth {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole | null | undefined;
  imageFile: File | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  otp?: string;
  newPassword?: string;
}

export interface SignupMetadata {
  firstName: string;
  middleName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authListenerInitialized: boolean;
}
