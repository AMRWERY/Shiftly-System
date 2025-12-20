<template>
  <div>
    <div class="flex items-center justify-end ms-auto p-10">
      <!-- RTL Toggle -->
      <button class="text-gray-600 hover:text-gray-800 me-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
        <span v-if="localeStore.isRTL" class="flex items-center">
          <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
          En
        </span>
        <span v-else class="flex items-center">
          <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
          العربية
        </span>
      </button>
    </div>

    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="flex w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        <!-- Left Side - Dark Background with Information -->
        <div
          class="hidden md:flex md:w-4/12 bg-gradient-to-l from-gray-900 to-gray-600 text-white p-10 flex-col justify-center">
          <div class="max-w-md mx-auto">
            <h1 class="text-3xl font-bold mb-4">{{ t('form.welcome') }}</h1>
            <p class="text-gray-300 mb-10">
              {{ t('form.activating_account') }}
            </p>
          </div>
        </div>

        <!-- Right Side - Content -->
        <div class="w-full md:w-8/12 p-4 flex items-center justify-center bg-white">
          <div class="w-full max-w-lg text-center">
            <div v-if="loading" class="space-y-4">
              <icon name="svg-spinners:180-ring-with-bg" class="w-12 h-12 mx-auto text-blue-600" />
              <p class="text-gray-600">{{ t('form.setting_up_account') }}</p>
            </div>

            <div v-else-if="error" class="space-y-4">
              <icon name="material-symbols:error-outline-rounded" class="w-12 h-12 mx-auto text-red-600" />
              <h2 class="text-xl font-semibold text-gray-800">{{ t('form.activation_failed') }}</h2>
              <p class="text-gray-600">{{ errorMessage }}</p>
              <base-button @click="retry" variant="outline" class="mt-4 flex items-center justify-center" :padding-x="'px-3'" :padding-y="'py-2'">
                {{ t('btn.retry') }}
              </base-button>
            </div>

            <div v-else-if="success" class="space-y-4">
              <icon name="mdi-check-circle" class="w-12 h-12 mx-auto text-green-600" />
              <h2 class="text-xl font-semibold text-gray-800">{{ t('form.account_activated') }}</h2>
              <p class="text-gray-600">{{ t('form.default_password_set') }}</p>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p class="text-sm text-blue-800">
                  <strong>{{ t('form.default_password') }}:</strong> 1234567
                </p>
                <p class="text-xs text-blue-600 mt-2">{{ t('form.change_password_later') }}</p>
              </div>
              <base-button @click="goToLogin" class="mt-4 flex items-center justify-center" :padding-x="'px-3'"
                :padding-y="'py-2'">
                {{ t('btn.go_to_login') }}
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { setLocale, setLocaleMessage, t } = useI18n();
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const { triggerToast } = useToast();
const supabase = useSupabaseClient();

const loading = ref(true);
const success = ref(false);
const error = ref(false);
const errorMessage = ref('');

watch(() => localeStore.isRTL, (isRTL) => {
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}, { immediate: true });

const switchLocale = async (value: any) => {
  localeStore.updateLocale(value);
  if (value === 'ar') {
    const arMessages = await import('../../i18n/locales/ar.json');
    setLocaleMessage('ar', arMessages.default || arMessages);
  } else {
    const enMessages = await import('../../i18n/locales/en.json');
    setLocaleMessage('en', enMessages.default || enMessages);
  }
  setLocale(value);
};

const setDefaultPassword = async (userId: string) => {
  try {
    const { error: apiError } = await useFetch('/api/auth/set-default-password', {
      method: 'POST',
      body: { userId }
    });

    if (apiError.value) {
      throw apiError.value;
    }

    return { success: true };
  } catch (err: any) {
    console.error('Set default password error:', err);
    return {
      success: false,
      error: err.statusMessage || err.message || 'Failed to set default password'
    };
  }
};

const handleInviteConfirmation = async () => {
  loading.value = true;
  error.value = false;
  success.value = false;

  try {
    // Log the full URL for debugging
    console.log('Full URL:', window.location.href);
    console.log('Hash:', window.location.hash);
    console.log('Search:', window.location.search);

    // Check for hash parameters first (invite link contains access_token in hash)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hashAccessToken = hashParams.get('access_token');
    const hashRefreshToken = hashParams.get('refresh_token');
    const hashType = hashParams.get('type');
    const hashError = hashParams.get('error');
    const hashErrorCode = hashParams.get('error_code');
    const hashErrorDescription = hashParams.get('error_description');

    // Also check query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const queryToken = queryParams.get('token');
    const queryType = queryParams.get('type');
    const queryAccessToken = queryParams.get('access_token');
    const queryRefreshToken = queryParams.get('refresh_token');
    const queryError = queryParams.get('error');
    const queryErrorDescription = queryParams.get('error_description');

    console.log('Hash params:', {
      accessToken: hashAccessToken ? `${hashAccessToken.substring(0, 20)}...` : null,
      refreshToken: !!hashRefreshToken,
      type: hashType,
      error: hashError,
      errorCode: hashErrorCode,
      errorDescription: hashErrorDescription
    });
    console.log('Query params:', {
      token: queryToken ? `${queryToken.substring(0, 20)}...` : null,
      type: queryType,
      accessToken: !!queryAccessToken,
      refreshToken: !!queryRefreshToken,
      error: queryError,
      errorDescription: queryErrorDescription
    });

    // Check for errors in the URL (expired link, access denied, etc.)
    if (hashError || queryError) {
      const errorCode = hashErrorCode || hashError || queryError;
      const errorDesc = hashErrorDescription || queryErrorDescription || '';
      
      console.error('Invite link error:', { errorCode, errorDesc });
      
      // Provide user-friendly error messages
      if (errorCode === 'otp_expired' || errorDesc.includes('expired')) {
        throw new Error('The invite link has expired. Please contact your administrator to send you a new invitation.');
      } else if (errorCode === 'access_denied') {
        throw new Error('Access denied. The invite link may have already been used or is invalid. Please contact your administrator.');
      } else {
        throw new Error(decodeURIComponent(errorDesc) || 'Invalid invite link. Please contact your administrator.');
      }
    }

    // If we have a token in query params, exchange it for a session
    if (queryToken) {
      console.log('Verifying token from query params...');

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: queryToken,
        type: 'invite'
      });

      if (verifyError) {
        console.error('Token verification error:', verifyError);
        throw verifyError;
      }

      if (data.session && data.user) {
        console.log('Session created from token, user:', data.user.id);

        // Set the default password
        const result = await setDefaultPassword(data.user.id);

        if (result.success) {
          success.value = true;
          authStore.session = data.session;
          authStore.user = data.user;

          triggerToast({
            message: t('toast.account_activated_successfully'),
            type: 'success',
            icon: 'mdi-check-circle'
          });
          return;
        } else {
          throw new Error(result.error || 'Failed to set default password');
        }
      }
    }

    // If we have tokens in hash or query
    const accessToken = hashAccessToken || queryAccessToken;
    const refreshToken = hashRefreshToken || queryRefreshToken;

    if (accessToken) {
      console.log('Setting session from tokens...');

      const { data, error: setSessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || ''
      });

      if (setSessionError) {
        console.error('Set session error:', setSessionError);
        throw setSessionError;
      }

      if (data.session && data.user) {
        console.log('Session set successfully, user:', data.user.id);

        // Set the default password
        const result = await setDefaultPassword(data.user.id);

        if (result.success) {
          success.value = true;
          authStore.session = data.session;
          authStore.user = data.user;

          triggerToast({
            message: t('toast.account_activated_successfully'),
            type: 'success',
            icon: 'mdi-check-circle'
          });
          return;
        } else {
          throw new Error(result.error || 'Failed to set default password');
        }
      }
    }

    // Fallback: Try to get existing session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }
    if (session && session.user) {
      console.log('Found existing session, user:', session.user.id);
      const result = await setDefaultPassword(session.user.id);
      if (result.success) {
        success.value = true;
        authStore.session = session;
        authStore.user = session.user;
        triggerToast({
          message: t('toast.account_activated_successfully'),
          type: 'success',
          icon: 'mdi-check-circle'
        });
        return;
      } else {
        throw new Error(result.error || 'Failed to set default password');
      }
    }
    // No session found
    console.error('No tokens or session found');
    throw new Error('No session found. Please check your invite link or try clicking it again. The link may have expired.');
  } catch (err: any) {
    console.error('Invite confirmation error:', err);
    error.value = true;
    errorMessage.value = err.message || err.statusMessage || t('form.activation_error');
    triggerToast({
      message: errorMessage.value,
      type: 'error',
      icon: 'material-symbols:error-outline-rounded'
    });
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  handleInviteConfirmation();
};

const goToLogin = async () => {
  try {
    // Clear the session and store completely
    authStore.session = null;
    authStore.user = null;
    
    // Also sign out from Supabase
    await supabase.auth.signOut();
    
    // Clear local storage to be extra safe
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sb-' + process.env.SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token');
    }
    
    // Small delay to ensure everything is cleared
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Force full page reload to login with a query param to bypass middleware check
    window.location.replace('/auth?from=invite');
  } catch (err) {
    console.error('Error during navigation:', err);
    // Fallback: just navigate
    window.location.replace('/auth?from=invite');
  }
};

// Initialize on mount
onMounted(() => {
  document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr';
  handleInviteConfirmation();
});

definePageMeta({
  layout: 'auth'
});

useHead({
  titleTemplate: () => t('head.confirm_invite'),
});
</script>