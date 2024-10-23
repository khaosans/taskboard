import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello from the API!' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process the body data here
  return NextResponse.json({ message: 'Data received', data: body });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  // Update data based on the body
  return NextResponse.json({ message: 'Data updated', data: body });
}

export async function DELETE(request: NextRequest) {
  // Delete data based on the request
  return NextResponse.json({ message: 'Data deleted' });
}
