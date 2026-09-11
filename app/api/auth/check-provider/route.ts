import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { provider } = await request.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

    if (!supabaseUrl) {
      return NextResponse.json({ 
        enabled: false, 
        reason: 'Supabase URL is not configured in environment variables.' 
      });
    }

    if (!provider || (provider !== 'google' && provider !== 'github')) {
      return NextResponse.json({ 
        enabled: false, 
        reason: `Unsupported provider: ${provider}` 
      });
    }

    // Ping the Supabase OAuth authorization URL
    const testUrl = `${supabaseUrl}/auth/v1/authorize?provider=${provider}`;
    const res = await fetch(testUrl, { 
      method: 'GET',
      redirect: 'manual' 
    });

    if (res.status === 400) {
      const body = await res.text();
      if (body.includes('provider is not enabled') || body.includes('validation_failed')) {
        return NextResponse.json({
          enabled: false,
          provider,
          reason: `The ${provider === 'google' ? 'Google' : 'GitHub'} OAuth provider is not yet enabled in your Supabase project dashboard.`
        });
      }
    }

    // 302, 303, or 200 means the provider is configured and ready to redirect
    return NextResponse.json({
      enabled: true,
      provider
    });
  } catch (err: any) {
    return NextResponse.json({
      enabled: false,
      reason: err?.message || 'Failed to check OAuth provider status.'
    });
  }
}
