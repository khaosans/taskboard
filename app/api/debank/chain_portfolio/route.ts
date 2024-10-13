import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import vercelKVClient from '@/utils/vercelKV';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const chainId = searchParams.get('chain_id');

    if (!address || !chainId) {
      logger.info('Missing address or chain_id in request');
      return NextResponse.json({ error: 'Missing address or chain_id parameter' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      logger.error('DEBANK_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const cacheKey = `chain_portfolio:${address}:${chainId}`;
    const cacheTTL = 300; // Cache for 5 minutes (300 seconds)

    // Try to get data from cache
    const cachedData = await vercelKVClient.get(cacheKey);
    
    if (cachedData) {
      logger.info(`Cache hit for ${cacheKey}`);
      return NextResponse.json(JSON.parse(cachedData as string));
    }

    // If not in cache, fetch from DeBank API
    logger.info(`Cache miss for ${cacheKey}, fetching from DeBank API`);
    
    const chainBalanceUrl = `https://pro-openapi.debank.com/v1/user/chain_balance?id=${address}&chain_id=${chainId}`;
    const tokenListUrl = `https://pro-openapi.debank.com/v1/user/token_list?id=${address}&chain_id=${chainId}`;

    const [chainBalanceResponse, tokenListResponse] = await Promise.all([
      fetch(chainBalanceUrl, { headers: { 'AccessKey': apiKey } }),
      fetch(tokenListUrl, { headers: { 'AccessKey': apiKey } })
    ]);

    if (!chainBalanceResponse.ok || !tokenListResponse.ok) {
      throw new Error(`DeBank API response was not ok: ${chainBalanceResponse.statusText}, ${tokenListResponse.statusText}`);
    }

    const [chainData, tokenList] = await Promise.all([
      chainBalanceResponse.json(),
      tokenListResponse.json()
    ]);

    const combinedData = {
      ...chainData,
      token_list: tokenList,
    };

    // Cache the data
    await vercelKVClient.set(cacheKey, JSON.stringify(combinedData), { ex: cacheTTL });

    return NextResponse.json(combinedData);
  } catch (error) {
    logger.error(`Error fetching chain portfolio: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch chain portfolio' }, { status: 500 });
  }
}
