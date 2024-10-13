import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST() {
  try {
    const { userId } = auth()

    if (!userId) {
      console.error('Unauthorized: No user ID found')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-drive-callback`,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      access_type: 'offline',
      prompt: 'consent',
      state: userId,
    })

    const url = `${GOOGLE_AUTH_URL}?${params.toString()}`
    console.log('Generated Google Auth URL:', url)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error in Google Drive login:', error)
    return new NextResponse(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}
