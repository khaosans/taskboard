import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('id');
    const chain = searchParams.get('chain_id');

    if (!address || !chain) {
      return NextResponse.json({ error: 'Missing address or chain parameter' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const cacheKey = `token_list:${address}:${chain}`;
    const cacheTTL = 300; // Cache for 5 minutes

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData as string));
    }

    const response = await fetch(`https://pro-openapi.debank.com/v1/user/token_list?id=${address}&chain_id=${chain}`, {
      headers: {
        'AccessKey': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`DeBank API response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    await redis.set(cacheKey, JSON.stringify(data), { ex: cacheTTL });

    return NextResponse.json(data);
  } catch (error) {
    logger.error(`Error fetching token list: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch token list' }, { status: 500 });
  }
}
