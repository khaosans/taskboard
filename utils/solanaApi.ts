/* eslint-disable no-undef */
import { Connection, PublicKey } from '@solana/web3.js';
import vercelKVClient from '@/utils/vercelKV';

const connection = new Connection('https://api.mainnet-beta.solana.com');

const CACHE_TTL = 60 * 1000; // 1 minute cache

async function rateLimitedRequest<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const lastRequestTime = await vercelKVClient.get(`ratelimit:${key}`);

  if (lastRequestTime && now - parseInt(lastRequestTime as string) < 100) {
    throw new Error('Rate limit exceeded');
  }

  await vercelKVClient.set(`ratelimit:${key}`, now.toString());
  
  const cachedResult = await vercelKVClient.get(`cache:${key}`);
  if (cachedResult) {
    return JSON.parse(cachedResult as string);
  }

  const result = await fn();
  await vercelKVClient.set(`cache:${key}`, JSON.stringify(result), { ex: CACHE_TTL });
  return result;
}

export const getAccountInfo = async (publicKey: string): Promise<any> => {
  return rateLimitedRequest(`accountInfo:${publicKey}`, async () => {
    const pubKey = new PublicKey(publicKey);
    return await connection.getAccountInfo(pubKey);
  });
};

export const getBalance = async (publicKey: string): Promise<number> => {
  return rateLimitedRequest(`balance:${publicKey}`, async () => {
    const pubKey = new PublicKey(publicKey);
    return await connection.getBalance(pubKey);
  });
};

export const getRecentBlockhash = async (): Promise<string> => {
  return rateLimitedRequest('recentBlockhash', async () => {
    const { blockhash } = await connection.getLatestBlockhash();
    return blockhash;
  });
};