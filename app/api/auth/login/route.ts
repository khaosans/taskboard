import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Handle login logic here

  return NextResponse.json({ success: true })
}
