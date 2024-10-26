import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const chainId = url.searchParams.get('chain_id');

    if (!id) {
      logger.info('Missing protocol id in request');
      return NextResponse.json({ error: 'Missing protocol id parameter' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      logger.error('DEBANK_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    let apiUrl = `https://pro-openapi.debank.com/v1/protocol?id=${id}`;
    if (chainId) {
      apiUrl += `&chain_id=${chainId}`;
    }

    const response = await fetch(apiUrl, {
      headers: { 'AccessKey': apiKey }
    });

    if (!response.ok) {
      throw new Error(`DeBank API response was not ok: ${response.statusText}`);
    }

    const protocolData = await response.json();
    return NextResponse.json(protocolData);
  } catch (error) {
    logger.error('Error fetching protocol data', { error: (error as Error).message });
    return NextResponse.json({ error: 'Failed to fetch protocol data' }, { status: 500 });
  }
}
