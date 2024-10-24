export async function getNFTEvents(mintAddress: string) {
  return fetchHeliusAPI('nft-events', { mint: mintAddress });
}
