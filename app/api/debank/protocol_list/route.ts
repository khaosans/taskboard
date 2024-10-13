import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import vercelKVClient from '@/utils/vercelKV';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const chainId = searchParams.get('chain_id');

    if (!id || !chainId) {
      logger.info('Missing id or chain_id in request');
      return NextResponse.json({ error: 'Missing id or chain_id parameter' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      logger.error('DEBANK_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const cacheKey = `protocol_list:${id}:${chainId}`;
    const cacheTTL = 3600; // Cache for 1 hour (3600 seconds)

    // Try to get data from cache
    const cachedData = await vercelKVClient.get(cacheKey);
    
    if (cachedData) {
      logger.info(`Cache hit for ${cacheKey}`);
      return NextResponse.json(JSON.parse(cachedData as string));
    }

    // If not in cache, fetch from DeBank API
    logger.info(`Cache miss for ${cacheKey}, fetching from DeBank API`);
    
    const url = `https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=${id}&chain_id=${chainId}`;

    const response = await fetch(url, {
      headers: { 'AccessKey': apiKey }
    });

    if (!response.ok) {
      throw new Error(`DeBank API response was not ok: ${response.statusText}`);
    }

    const protocolListData = await response.json();

    // Cache the data
    await vercelKVClient.set(cacheKey, JSON.stringify(protocolListData), { ex: cacheTTL });

    return NextResponse.json(protocolListData);
  } catch (error) {
    logger.error(`Error fetching protocol list data: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
