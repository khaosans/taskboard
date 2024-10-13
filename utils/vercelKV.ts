import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client
const vercelKVClient = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

export default vercelKVClient;
