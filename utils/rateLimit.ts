import { Connection, ConnectionConfig } from '@solana/web3.js';

class RateLimitedConnection extends Connection {
  private lastRequestTime = 0;
  private requestsInLastSecond = 0;
  private readonly maxRequestsPerSecond = 50; // Adjust this value based on Helius' rate limit

  constructor(endpoint: string, config?: ConnectionConfig) {
    super(endpoint, config);
  }

  async sendRequest(method: string, params: any[]): Promise<any> {
    await this.waitForRateLimit();
    return (this as any)._rpcRequest(method, params);
  }

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    if (now - this.lastRequestTime >= 1000) {
      this.requestsInLastSecond = 0;
      this.lastRequestTime = now;
    }

    if (this.requestsInLastSecond >= this.maxRequestsPerSecond) {
      const waitTime = 1000 - (now - this.lastRequestTime);
      await new Promise(resolve => globalThis.setTimeout(resolve, waitTime));
      return this.waitForRateLimit();
    }

    this.requestsInLastSecond++;
  }
}

export function createRateLimitedConnection(endpoint: string, config?: ConnectionConfig): RateLimitedConnection {
  return new RateLimitedConnection(endpoint, config);
}
