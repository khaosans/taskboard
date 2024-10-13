import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state') // This should be the user ID

  if (!code || !state) {
    return new NextResponse('Missing authorization code or state', { status: 400 })
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-drive-callback`
    )

    const { tokens } = await oauth2Client.getToken(code)

    // Store tokens in Supabase
    const { error } = await supabase
      .from('user_google_tokens')
      .upsert({ user_id: state, tokens }, { onConflict: 'user_id' })

    if (error) {
      console.error('Error storing tokens:', error)
      return new NextResponse('Failed to store tokens', { status: 500 })
    }

    // Redirect to a success page with a script to store tokens in localStorage
    return new NextResponse(`
      <html>
        <body>
          <script>
            localStorage.setItem('googleDriveTokens', '${JSON.stringify(tokens)}');
            window.location.href = '/dashboard'; // Redirect to your dashboard or desired page
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('Error in Google Drive callback:', error)
    return new NextResponse('Authentication failed', { status: 500 })
  }
}
