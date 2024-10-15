import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sellToken = searchParams.get('sellToken');
    const buyToken = searchParams.get('buyToken');
    const amount = searchParams.get('amount');

    // Call the 0x API to get the price
    const response = await fetch(`https://api.0x.org/swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&amount=${amount}`);
    const data = await response.json();

    return NextResponse.json(data);
}
