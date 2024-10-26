import { NextResponse, NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  const { userId } = await getAuth(request)

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Generate the Google OAuth URL
  const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state: userId,
  })

  const url = `${GOOGLE_AUTH_URL}?${params.toString()}`

  return NextResponse.json({ url })
}
