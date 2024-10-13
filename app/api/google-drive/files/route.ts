import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Function to get tokens from local storage (client-side only)
const getTokensFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem('googleDriveTokens')
    return tokens ? JSON.parse(tokens) : null
  }
  return null
}

export async function GET(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { data: userTokens, error } = await supabase
      .from('user_google_tokens')
      .select('tokens')
      .eq('user_id', session.user.id)
      .single()

    if (error || !userTokens) {
      return new NextResponse('Google Drive not connected', { status: 400 })
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-drive-callback`
    )

    oauth2Client.setCredentials(userTokens.tokens)

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
