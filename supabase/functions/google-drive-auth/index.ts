import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'

serve(async (req) => {
  const { user } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const params = new URLSearchParams({
    client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
    redirect_uri: `${Deno.env.get('NEXT_PUBLIC_APP_URL')}/api/auth/callback`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state: user.id,
  })

  const url = `${GOOGLE_AUTH_URL}?${params.toString()}`

  return new Response(
    JSON.stringify({ url }),
    { headers: { "Content-Type": "application/json" } },
  )
})
