import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const user = await clerkClient.users.getUser(userId)
    const tokens = user.privateMetadata.googleDriveTokens

    if (!tokens) {
      return new NextResponse('Google Drive not connected', { status: 400 })
    }

    return new NextResponse('Connected', { status: 200 })
  } catch (error) {
    console.error('Error checking Google Drive connection:', error)
    return new NextResponse('Failed to check connection', { status: 500 })
  }
}
