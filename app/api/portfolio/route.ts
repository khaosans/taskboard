import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    // Your portfolio data here
  };
  return NextResponse.json(data);
}
