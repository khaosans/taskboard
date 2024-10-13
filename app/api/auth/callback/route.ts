import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'; // Adjust this import based on the latest Clerk version
import logger from '@/lib/logger';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import googleDriveClient from '@/lib/googleDriveClient';
import { insertToken, getTokens } from '@/lib/supabaseClient'; // Adjust the import path

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const action = searchParams.get('action');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });

    switch (action) {
      case 'google-drive-login': {
        const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`;
        const authUrl = googleDriveClient.getAuthUrl(redirectUri);
        return NextResponse.json({ url: authUrl });
      }

      case 'google-drive-callback': {
        if (!code) {
          return NextResponse.json({ error: 'No code provided' }, { status: 400 });
        }
        const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`;
        const tokens = await googleDriveClient.getTokens(code, redirectUri);
        await insertToken(userId, tokens); // Use the insert function
        return NextResponse.redirect(request.nextUrl.origin + '/drive');
      }

      case 'google-drive-tokens': {
        const { data, error } = await supabase
          .from('google_drive_tokens')
          .select('tokens')
          .eq('user_id', userId)
          .single();

        if (error || !data || !data.tokens) {
          return NextResponse.json({ error: 'No tokens found' }, { status: 404 });
        }

        googleDriveClient.setCredentials(data.tokens);
        const files = await googleDriveClient.listFiles();
        return NextResponse.json({ files });
      }

      default:
        logger.info(`User ${userId} authenticated successfully`);
        return NextResponse.redirect(request.nextUrl.origin + '/dashboard');
    }
  } catch (error) {
    logger.error(`Error in auth callback: ${error}`);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
