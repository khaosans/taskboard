/* eslint-disable no-undef */
import { createClient } from '@vercel/kv';

const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export default redis;
