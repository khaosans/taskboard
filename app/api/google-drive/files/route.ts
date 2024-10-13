import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const user = await clerkClient.users.getUser(userId)
    const tokens = user.privateMetadata.googleDriveTokens as any

    if (!tokens) {
      return new NextResponse('Google Drive not connected', { status: 400 })
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-drive-callback`
    )

    oauth2Client.setCredentials(tokens)

    const drive = google.drive({ version: 'v3', auth: oauth2Client })

    const response = await drive.files.list({
      fields: 'files(id, name, mimeType)',
      pageSize: 10,
    })

    const files = response.data.files

    return NextResponse.json({ files })
  } catch (error) {
    console.error('Error fetching Google Drive files:', error)
    return new NextResponse('Failed to fetch files', { status: 500 })
  }
}
