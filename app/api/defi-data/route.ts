import { NextResponse } from 'next/server';

export async function GET() {
  // This is a mock implementation. Replace with actual data fetching logic.
  const mockData = {
    totalValue: 10000,
    assets: [
      { name: 'Bitcoin', value: 5000 },
      { name: 'Ethereum', value: 3000 },
      { name: 'Solana', value: 2000 },
    ],
  };

  return NextResponse.json(mockData);
}
