import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { accessToken } = await request.json()

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        googleDriveTokens: { access_token: accessToken },
      },
    })

    return new NextResponse('Token stored successfully', { status: 200 })
  } catch (error) {
    console.error('Error storing access token:', error)
    return new NextResponse('Failed to store token', { status: 500 })
  }
}
