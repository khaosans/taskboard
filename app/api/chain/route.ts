import { NextRequest, NextResponse } from 'next/server';

const chainData = {
  eth: {
    id: "eth",
    community_id: 1,
    name: "Ethereum",
    native_token_id: "eth",
    logo_url: "https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png",
    wrapped_token_id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    is_support_pre_exec: true
  },
  // Add more chain data as needed
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !chainData[id as keyof typeof chainData]) {
    return NextResponse.json({ error: 'Invalid chain ID' }, { status: 400 });
  }

  return NextResponse.json(chainData[id as keyof typeof chainData]);
}
