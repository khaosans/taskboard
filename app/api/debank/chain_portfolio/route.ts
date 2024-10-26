import { NextRequest, NextResponse } from 'next/server';
import vercelKVClient from '@/utils/vercelKV';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const chainId = searchParams.get('chain_id');

  if (!address || !chainId) {
    return NextResponse.json({ error: 'Missing address or chain_id parameter' }, { status: 400 });
  }

  const apiKey = process.env.DEBANK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const cacheKey = `chain_portfolio:${address}:${chainId}`;
  const cacheTTL = 300; // Cache for 5 minutes (300 seconds)

  // Try to get data from cache
  const cachedData = await vercelKVClient.get(cacheKey);
  
  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData as string));
  }

  // If not in cache, fetch from DeBank API
  const chainBalanceUrl = `https://pro-openapi.debank.com/v1/user/chain_balance?id=${address}&chain_id=${chainId}`;
  const tokenListUrl = `https://pro-openapi.debank.com/v1/user/token_list?id=${address}&chain_id=${chainId}`;

  const [chainBalanceResponse, tokenListResponse] = await Promise.all([
    fetch(chainBalanceUrl, { headers: { 'AccessKey': apiKey } }),
    fetch(tokenListUrl, { headers: { 'AccessKey': apiKey } })
  ]);

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
}
