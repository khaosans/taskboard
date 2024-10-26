import { NextResponse, NextRequest } from 'next/server';
import { serialize } from 'cookie';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    access_type: 'offline',
  });

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Here you would typically check the username and password against your database
  // For this example, we'll use a hardcoded check
  if (username === 'admin' && password === 'password') {
    const token = 'your-auth-token'; // In a real app, generate a secure token

    const serialized = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Set-Cookie': serialized },
    });
  }

  return new NextResponse(JSON.stringify({ success: false }), { status: 401 });
}
