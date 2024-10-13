import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import vercelKVClient from '@/utils/vercelKV';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chainId = searchParams.get('chain_id');
    const id = searchParams.get('id');

    if (!chainId || !id) {
      logger.info('Missing chain_id or id in request');
      return NextResponse.json({ error: 'Missing chain_id or id parameter' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      logger.error('DEBANK_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const cacheKey = `token:${chainId}:${id}`;
    const cacheTTL = 3600; // Cache for 1 hour (3600 seconds)

    // Try to get data from cache
    const cachedData = await vercelKVClient.get(cacheKey);
    
    if (cachedData) {
      logger.info(`Cache hit for ${cacheKey}`);
      return NextResponse.json(JSON.parse(cachedData as string));
    }

    // If not in cache, fetch from DeBank API
    logger.info(`Cache miss for ${cacheKey}, fetching from DeBank API`);
    
    const url = `https://pro-openapi.debank.com/v1/token?chain_id=${chainId}&id=${id}`;

    const response = await fetch(url, {
      headers: { 'AccessKey': apiKey }
    });

    if (!response.ok) {
      throw new Error(`DeBank API response was not ok: ${response.statusText}`);
    }

    const tokenData = await response.json();

    // Cache the data
    await vercelKVClient.set(cacheKey, JSON.stringify(tokenData), { ex: cacheTTL });

    return NextResponse.json(tokenData);
}
catch (error) {
  logger.error(`Error in DeBank API route: ${(error as Error).message}`);
  return NextResponse.json({ error: (error as Error).message }, { status: 500 });
}
}
// Compare this snippet from app/api/debank/protocol_list/route.ts: