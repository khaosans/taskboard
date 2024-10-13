import { Redis } from '@upstash/redis';

const kvClient = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL || '',
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_TOKEN || ''
});

export default kvClient;
