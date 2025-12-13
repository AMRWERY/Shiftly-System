import { defineStore } from "pinia";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authListenerInitialized: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    session: null,
    loading: true,
    authListenerInitialized: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    currentUser: (state): User | null => state.user,
    userEmail: (state): string | undefined => state.user?.email,
    userId: (state): string | undefined => state.user?.id,
    currentUserRole: (state): string | undefined => state.user?.user_metadata?.role,
  },

  actions: {
    /**
     * Initialize auth state from Supabase session
     */
    async initAuth() {
      const supabase = useSupabaseClient();
      
      // Prevent duplicate initialization
      if (this.authListenerInitialized) {
        return;
      }
      
      this.loading = true;

      try {
        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          this.session = session;
          this.user = session.user;
        }

        // Listen for auth changes (only once)
        if (!this.authListenerInitialized) {
          supabase.auth.onAuthStateChange((_event, session) => {
            this.session = session;
            this.user = session?.user ?? null;
          });
          this.authListenerInitialized = true;
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Login with email and password (wrapper for signIn)
     */
    async login(credentials: { email: string; password: string }) {
      return await this.signIn(credentials.email, credentials.password);
    },

    /**
     * Sign in with email and password
     */
    async signIn(email: string, password: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        this.session = data.session;
        this.user = data.user;

        return { success: true, data };
      } catch (error: any) {
        console.error("Sign in error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Sign up with full user data and profile image
     * If user already exists (from step 2), updates the user profile instead
     */
    async signup(userData: {
      email: string;
      password: string;
      firstName: string;
      middleName: string;
      lastName: string;
      role: string;
      imageFile: File | null;
    }) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        let avatarUrl = '';

        // Upload profile image if provided
        if (userData.imageFile) {
          // Validate file size (max 3MB)
          const maxSize = 3 * 1024 * 1024; // 3MB in bytes
          if (userData.imageFile.size > maxSize) {
            throw new Error('Image file size must be less than 3MB');
          }

          // Validate file type
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
          if (!allowedTypes.includes(userData.imageFile.type)) {
            throw new Error('Only JPEG, PNG, WebP, and GIF images are allowed');
          }

          // Generate unique filename using timestamp and UUID
          const fileExt = userData.imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
          const timestamp = Date.now();
          const uniqueId = crypto.randomUUID();
          const fileName = `${timestamp}_${uniqueId}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          // Upload to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, userData.imageFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error(`Failed to upload image: ${uploadError.message}`);
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

          avatarUrl = urlData.publicUrl;
        }

        // Check if user already exists (from step 2 confirmation email)
        // We should have a session from sendConfirmationEmail
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        // Also try to get the current user
        let existingUser = null;
        try {
          const { data: { user } } = await supabase.auth.getUser();
          existingUser = user;
        } catch (error) {
          // User might not be authenticated yet
        }
        
        // If we have a session or user from step 2, just update metadata
        // This prevents creating a duplicate session/cookies
        if (existingSession?.user?.email === userData.email || (existingUser && existingUser.email === userData.email)) {
          // User already exists from step 2, just update profile metadata
          // Reuse existing session to avoid duplicate cookies
          const { data, error } = await supabase.auth.updateUser({
            data: {
              firstName: userData.firstName,
              middleName: userData.middleName,
              lastName: userData.lastName,
              role: userData.role,
              avatarUrl: avatarUrl,
              fullName: `${userData.firstName} ${userData.middleName} ${userData.lastName}`,
            },
          });

          if (error) throw error;

          // Update store with new user data but keep existing session
          if (data.user) {
            this.user = data.user;
          }
          // Keep the existing session to avoid duplicate cookies
          if (existingSession) {
            this.session = existingSession;
          }
          
          return { success: true, data };
        } else {
          // Create new user account with metadata
          const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                firstName: userData.firstName,
                middleName: userData.middleName,
                lastName: userData.lastName,
                role: userData.role,
                avatarUrl: avatarUrl,
                fullName: `${userData.firstName} ${userData.middleName} ${userData.lastName}`,
              },
            },
          });

          if (error) throw error;

          this.session = data.session;
          this.user = data.user;

          return { success: true, data };
        }
      } catch (error: any) {
        console.error("Sign up error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Sign up with email and password (legacy method)
     */
    async signUp(email: string, password: string, metadata?: Record<string, any>) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });

        if (error) throw error;

        this.session = data.session;
        this.user = data.user;

        return { success: true, data };
      } catch (error: any) {
        console.error("Sign up error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Send confirmation email by creating a temporary user account
     * This will trigger Supabase to send a confirmation email
     * NOTE: This creates a session and saves to cookies, but we'll reuse this session in step 3
     */
    async sendConfirmationEmail(email: string, password: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        // Check if user already exists and has a session
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        if (existingSession?.user?.email === email) {
          // User already exists with a session, just resend confirmation email
          if (!existingSession.user.email_confirmed_at) {
            const { error } = await supabase.auth.resend({
              type: 'signup',
              email: email,
            });
            
            if (error) throw error;
            return { success: true };
          }
          // Email already confirmed, no need to send again
          return { success: true };
        }

        // Check if user exists but no session (unverified user)
        try {
          const { data: existingUser } = await supabase.auth.getUser();
          if (existingUser?.user?.email === email && !existingUser.user.email_confirmed_at) {
            // User exists but not verified, resend confirmation
            const { error } = await supabase.auth.resend({
              type: 'signup',
              email: email,
            });
            if (error) throw error;
            return { success: true };
          }
        } catch (error) {
          // User doesn't exist yet, continue to create
        }

        // Create user account - this will create a session and save to cookies
        // We'll reuse this session in step 3 to avoid duplicate cookies
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined,
            data: {
              temp_signup: true, // Mark as temporary signup
            },
          },
        });

        if (error) {
          // If user already exists error, try to resend confirmation
          if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            const resendError = await supabase.auth.resend({
              type: 'signup',
              email: email,
            });
            if (resendError.error) throw resendError.error;
            return { success: true };
          }
          throw error;
        }

        // Store the session temporarily - we'll update it in step 3
        // This prevents creating a new session later
        if (data.session) {
          this.session = data.session;
        }
        if (data.user) {
          this.user = data.user;
        }

        return { success: true, data };
      } catch (error: any) {
        console.error("Send confirmation email error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Resend confirmation email for existing unverified user
     */
    async resendConfirmationEmail(email: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
        });

        if (error) throw error;

        return { success: true };
      } catch (error: any) {
        console.error("Resend confirmation email error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Send OTP to email for password reset
     * Uses passwordless OTP login to authenticate user before password reset
     * Note: This uses signInWithOtp which is for passwordless authentication
     * The OTP will be sent if email template is configured to show {{ .Token }}
     */
    async sendPasswordResetOtp(email: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        // Use signInWithOtp for passwordless authentication
        // This sends an OTP code (if email template includes {{ .Token }})
        // or a magic link (if email template doesn't include the token)
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false, // Only send OTP to existing users
          },
        });

        if (error) throw error;

        return { success: true, data };
      } catch (error: any) {
        console.error("Send OTP error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Verify OTP and sign in
     */
    async verifyOtp(email: string, token: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
        });

        if (error) throw error;

        this.session = data.session;
        this.user = data.user;

        return { success: true, data };
      } catch (error: any) {
        console.error("Verify OTP error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Sign in with OTP (Magic Link)
     */
    async signInWithOtp(email: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
        });

        if (error) throw error;

        return { success: true, data };
      } catch (error: any) {
        console.error("OTP sign in error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Sign out
     */
    async signOut() {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        this.session = null;
        this.user = null;

        return { success: true };
      } catch (error: any) {
        console.error("Sign out error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Logout (alias for signOut)
     */
    async logout() {
      return await this.signOut();
    },

    /**
     * Reset password
     */
    async resetPassword(email: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) throw error;

        return { success: true, data };
      } catch (error: any) {
        console.error("Reset password error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update password
     */
    async updatePassword(newPassword: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) throw error;

        return { success: true, data };
      } catch (error: any) {
        console.error("Update password error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update user metadata
     */
    async updateProfile(metadata: Record<string, any>) {
      const supabase = useSupabaseClient();
      this.loading = true;

      try {
        const { data, error } = await supabase.auth.updateUser({
          data: metadata,
        });

        if (error) throw error;

        this.user = data.user;

        return { success: true, data };
      } catch (error: any) {
        console.error("Update profile error:", error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },
  },
});
