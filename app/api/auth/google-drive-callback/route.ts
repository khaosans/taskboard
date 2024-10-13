import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code || !state) {
    return NextResponse.redirect('/drive?error=missing_params')
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-drive-callback`,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens')
    }

    const tokens = await tokenResponse.json()

    // Store tokens in Clerk's user metadata
    await clerkClient.users.updateUserMetadata(state, {
      privateMetadata: {
        googleDriveTokens: tokens,
      },
    })

    return NextResponse.redirect('/drive?success=true')
  } catch (error) {
    console.error('Error in Google Drive callback:', error)
    return NextResponse.redirect('/drive?error=auth_failed')
  }
}
