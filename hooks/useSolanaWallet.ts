import { useConnection } from '@solana/wallet-adapter-react'

export const useSolanaWallet = () => {
  const { connection } = useConnection()
  // Add your wallet logic here
  return { connection }
}
