import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import logger from '@/lib/logger';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const chain = searchParams.get('chain');

  if (!address || !chain) {
    return NextResponse.json({ error: 'Missing address or chain parameter' }, { status: 400 });
  }

  const cacheKey = `portfolio:${address}:${chain}`;

  try {
    // Try to get data from Redis cache
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      logger.info(`Cache hit for ${cacheKey}`);
      return NextResponse.json(JSON.parse(cachedData as string));
    }

    // If not in cache, fetch from DeBank API
    logger.info(`Cache miss for ${cacheKey}, fetching from DeBank API`);
    const response = await fetch(`https://pro-openapi.debank.com/v1/user/total_balance?id=${address}&chain_id=${chain}`, {
      headers: {
        'AccessKey': process.env.DEBANK_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`DeBank API response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the data in Redis for 5 minutes
    await redis.set(cacheKey, JSON.stringify(data), { ex: 300 });

    return NextResponse.json(data);
  } catch (error) {
    logger.error(`Error fetching portfolio data: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
