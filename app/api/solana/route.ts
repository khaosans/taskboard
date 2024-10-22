/* eslint-disable no-undef */
import { NextRequest, NextResponse } from 'next/server';
import * as SolanaApi from 'utils/solanaApi';

type SolanaAction = keyof typeof SolanaApi;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') as SolanaAction;
  const publicKey = searchParams.get('publicKey');

  if (!action || !(action in SolanaApi)) {
    return NextResponse.json({ error: 'Invalid or missing action' }, { status: 400 });
  }

  try {
    let result;
    if (['getAccountInfo', 'getBalance'].includes(action)) {
      if (!publicKey) {
        return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
      }
      result = await SolanaApi[action](publicKey);
    } else if (action === 'getRecentBlockhash') {
      result = await SolanaApi[action]();
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in Solana API route:', error);
    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
