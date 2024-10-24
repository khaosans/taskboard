const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_API_URL = `https://api.helius.xyz/v0`;

export async function getWalletTokenBalances(walletAddress: string) {
  const response = await fetch(`${HELIUS_API_URL}/addresses/${walletAddress}/balances?api-key=${HELIUS_API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch wallet balances');
  }
  return await response.json();
}

export async function getWalletTransactions(walletAddress: string, limit: number = 10) {
  const response = await fetch(`${HELIUS_API_URL}/addresses/${walletAddress}/transactions?api-key=${HELIUS_API_KEY}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch wallet transactions');
  }
  return await response.json();
}

export async function getNFTEvents(mintAddress: string) {
  return fetchHeliusAPI('nft-events', { mint: mintAddress });
}
