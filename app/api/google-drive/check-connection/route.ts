import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    
    return new NextResponse('Connected', { status: 200 })
  } catch (error) {
    console.error('Error checking Google Drive connection:', error)
    return new NextResponse('Failed to check connection', { status: 500 })
  }
}
