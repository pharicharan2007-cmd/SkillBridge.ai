import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error('OAuth code exchange error:', error);
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url));
      }

      // Check if user has completed onboarding / profile
      const user = data?.user;
      if (user) {
        // Can inspect if user is registered in students table
        const { data: studentRecord } = await supabase
          .from('students')
          .select('id, branch, engineeringCluster')
          .eq('email', user.email)
          .single();

        if (!studentRecord) {
          // New student via OAuth: redirect to onboarding to pick engineering discipline
          return NextResponse.redirect(new URL('/onboarding', request.url));
        }
      }
    } catch (err: any) {
      console.error('Error exchanging OAuth code:', err);
    }
  }

  // Redirect to requested destination or dashboard
  return NextResponse.redirect(new URL(next, request.url));
}
