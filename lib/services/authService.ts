import { supabase } from '@/lib/supabase/client';

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  url?: string;
}

/**
 * Initiates real Google OAuth with Supabase Auth.
 * Preflights check to ensure Google provider is enabled in Supabase.
 */
export async function signInWithGoogle(): Promise<{ data: any; error: any }> {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    // Pre-flight check whether Google provider is active in Supabase
    try {
      const checkRes = await fetch('/api/auth/check-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google' }),
      });
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (!checkData.enabled) {
          return {
            data: null,
            error: {
              message: checkData.reason || 'Google provider is not enabled in your Supabase Dashboard.',
              isProviderDisabled: true,
              provider: 'google'
            }
          };
        }
      }
    } catch (checkErr) {
      console.warn('Pre-flight check skipped or failed:', checkErr);
    }

    // Provider is enabled: initiate Supabase redirect
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Initiates real GitHub OAuth with Supabase Auth.
 * Preflights check to ensure GitHub provider is enabled in Supabase.
 */
export async function signInWithGitHub(): Promise<{ data: any; error: any }> {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    // Pre-flight check whether GitHub provider is active in Supabase
    try {
      const checkRes = await fetch('/api/auth/check-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'github' }),
      });
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (!checkData.enabled) {
          return {
            data: null,
            error: {
              message: checkData.reason || 'GitHub provider is not enabled in your Supabase Dashboard.',
              isProviderDisabled: true,
              provider: 'github'
            }
          };
        }
      }
    } catch (checkErr) {
      console.warn('Pre-flight check skipped or failed:', checkErr);
    }

    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Sends a real One-Time Password (OTP) or Magic Link to the user's email via Supabase.
 */
export async function sendEmailOtp(email: string): Promise<{ data: any; error: any }> {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Verifies the 6-digit OTP code sent to user's real email.
 */
export async function verifyEmailOtp(email: string, token: string): Promise<{ data: any; error: any }> {
  try {
    return await supabase.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: 'email',
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Signs out the current user session from Supabase.
 */
export async function signOutUser(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Supabase sign out error:', err);
  }
  try {
    localStorage.removeItem('skillbridge_auth_provider');
    localStorage.removeItem('skillbridge_auth_user');
  } catch (e) {}
}

/**
 * Retrieves the active Supabase authenticated user.
 */
export async function getActiveAuthUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (e) {
    return null;
  }
}

/**
 * Zero-Failure Demo Simulation:
 * Allows 1-click Google/GitHub demonstration during hackathons
 * even if Cloud Console OAuth Client IDs are pending configuration.
 */
export function simulateOAuthSession(provider: 'google' | 'github', customEmail?: string, customName?: string) {
  const isGoogle = provider === 'google';
  const email = customEmail || (isGoogle ? 'karthi.ece@dtu.ac.in' : 'karthi-codes@github.com');
  const name = customName || (isGoogle ? 'Karthi V.' : 'Karthi (GitHub)');
  const avatar = isGoogle 
    ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
    : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=256';

  const mockUser = {
    id: `oauth-${provider}-${Date.now()}`,
    email,
    user_metadata: {
      full_name: name,
      name,
      avatar_url: avatar,
      email,
      provider
    },
    app_metadata: {
      provider
    }
  };

  try {
    localStorage.setItem('skillbridge_auth_provider', provider);
    localStorage.setItem('skillbridge_auth_user', JSON.stringify(mockUser));
  } catch (e) {}

  return mockUser;
}
