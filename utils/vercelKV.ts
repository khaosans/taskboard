/* eslint-disable no-undef */
import { kv } from '@vercel/kv';

const redis = kv({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export default redis;
