const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_API_URL = `https://api.helius.xyz/v0`;

async function fetchHeliusAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${HELIUS_API_URL}/${endpoint}`);
  url.searchParams.append('api-key', HELIUS_API_KEY!);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Helius API error: ${response.statusText}`);
  }
  return await response.json();
}

export async function getWalletTokenBalances(walletAddress: string) {
  return fetchHeliusAPI('token-balances', { address: walletAddress });
}

export async function getEnrichedTransactions(walletAddress: string, limit: number = 10) {
  return fetchHeliusAPI('addresses/' + walletAddress + '/transactions', {
    limit: limit.toString(),
    commitment: 'confirmed',
    encoding: 'jsonParsed'
  });
}

export async function getWalletNFTs(walletAddress: string) {
  return fetchHeliusAPI('nft-events', { wallet: walletAddress });
}

export async function getTokenMetadata(mintAddresses: string[]) {
  return fetchHeliusAPI('token-metadata', { mintAccounts: mintAddresses.join(',') });
}

export async function getDeFiTransactions(walletAddress: string, limit: number = 10) {
  return fetchHeliusAPI('addresses/' + walletAddress + '/transactions', {
    limit: limit.toString(),
    commitment: 'confirmed',
    encoding: 'jsonParsed',
    type: 'SWAP'
  });
}

export async function getNameServiceDomains(walletAddress: string) {
  return fetchHeliusAPI('addresses/' + walletAddress + '/names');
}

export async function getTokenTransfers(walletAddress: string, limit: number = 10) {
  return fetchHeliusAPI('addresses/' + walletAddress + '/transfers', { limit: limit.toString() });
}

export async function getNFTEvents(mintAddress: string) {
  return fetchHeliusAPI('nft-events', { mint: mintAddress });
}
