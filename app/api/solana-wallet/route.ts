import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function POST(request: NextRequest) {
  const headers = await request.headers;
  const body = await request.json();
  const { publicKey } = body;

  if (!publicKey) {
    return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.devnet.solana.com');
    const pubKey = new PublicKey(publicKey);
    const balance = await connection.getBalance(pubKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    // Here you would typically fetch the DeFi value from your backend or a DeFi protocol
    // For this example, we're just estimating it as 110% of the balance
    const defiValue = solBalance * 1.1;

    return NextResponse.json({ balance: solBalance, defiValue });
  } catch (error) {
    console.error('Error fetching Solana wallet data:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet data' }, { status: 500 });
  }
}
