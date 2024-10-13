import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

Deno.serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    })
  }

  const { data: { session } } = await supabaseClient.auth.getSession()
  const accessToken = session?.provider_token

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'No Google access token found' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })

  try {
    const response = await drive.files.list({
      fields: 'files(id, name)',
      pageSize: 10,
    })

    const files = response.data.files

    return new Response(JSON.stringify({ files }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching Google Drive files:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch files' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
