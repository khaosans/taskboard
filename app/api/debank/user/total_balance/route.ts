import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import kvClient from '@/lib/kvClient';

// Add these lines
import 'server-only';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const walletAddress = searchParams.get('id');

    logger.info('Starting API request...');
    logger.info(`Received request for wallet ID: ${walletAddress}`);

    if (!walletAddress) {
      logger.info('Missing wallet address in request');
      return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
    }

    const apiKey = process.env.DEBANK_API_KEY;
    if (!apiKey) {
      logger.error('DEBANK_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const cacheKey = `debank-total-balance-${walletAddress}`;
    const cacheTTL = 3600; // Cache for 60 minutes (3600 seconds)
    const debankAPIUrl = `https://pro-openapi.debank.com/v1/user/total_balance?id=${walletAddress}`;

    // Try to get data from cache
    const cachedData = await kvClient.get(cacheKey);
    
    if (cachedData) {
      logger.info('Retrieved data from Redis cache');
      return NextResponse.json(cachedData);
    }

    // If not in cache, fetch data from DeBank API
    logger.info('Data not found in cache, fetching from DeBank API');

    const response = await fetch(debankAPIUrl, {
      headers: {
        'AccessKey': apiKey,
      },
    });

    logger.info(`DeBank API response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.text();
      logger.error(`DeBank API error: ${errorData}`);
      return NextResponse.json({ error: 'Failed to fetch data from DeBank API', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    logger.info(`Successfully fetched data from DeBank API: ${JSON.stringify(data)}`);

    // Sort the chain_list by usd_value in descending order
    if (data.chain_list) {
      data.chain_list.sort((a: { usd_value: number }, b: { usd_value: number }) => b.usd_value - a.usd_value);
    }

    // Store the sorted data in cache
    await kvClient.set(cacheKey, JSON.stringify(data), { ex: cacheTTL });
    logger.info('Stored sorted data in Redis cache');

    return NextResponse.json(data);
  } catch (error) {
    logger.error(`Unhandled error in DeBank API route: ${(error as Error).message}`);
    logger.error(`Stack trace: ${(error as Error).stack}`);
    return NextResponse.json({ error: 'Internal server error', details: (error as Error).message }, { status: 500 });
  }
}
