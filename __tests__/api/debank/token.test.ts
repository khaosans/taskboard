import { GET } from '@/app/api/debank/token/route';
import { test, expect } from '@jest/globals';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('GET /api/debank/token', () => {
  test('should return 400 if chain_id or id is missing', async () => {
    const req = { url: 'http://localhost/api/debank/token?chain_id=&id=' };

    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  test('should return 200 if chain_id and id are provided', async () => {
    const req = { url: 'http://localhost/api/debank/token?chain_id=1&id=1' };
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  test('should return error if DeBank API request fails', async () => {
    const req = { url: 'http://localhost/api/debank/token?chain_id=1&id=1' };
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('DeBank API request failed'));
    const res = await GET(req);
    expect(res.status).toBe(500);
  });
});
