import { useState, useEffect, useCallback } from 'react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useConnection } from '@solana/wallet-adapter-react'

export function useSolanaWallet(publicKey: PublicKey | null) {
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | null>(null)
  const [defiValue, setDefiValue] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [wsConnected, setWsConnected] = useState(false)

  const fetchBalance = useCallback(async () => {
    if (!connection || !publicKey) return

    try {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
      setError(null)

      // Store wallet info in local storage
      localStorage.setItem('solanaWallet', JSON.stringify({
        address: publicKey.toBase58(),
        balance: balance / LAMPORTS_PER_SOL
      }))
    } catch (err) {
      setError('Failed to fetch balance. Please try again later.')
      setBalance(null)
    }
  }, [connection, publicKey])

  useEffect(() => {
    fetchBalance()

    // WebSocket setup
    const ws = new WebSocket('wss://api.mainnet-beta.solana.com')

    ws.onopen = () => {
      setWsConnected(true)
      if (publicKey) {
        const subscribeMessage = JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'accountSubscribe',
          params: [
            publicKey.toBase58(),
            {
              encoding: 'jsonParsed',
              commitment: 'confirmed'
            }
          ]
        })
        ws.send(subscribeMessage)
      }
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.method === 'accountNotification') {
        const newBalance = data.params.result.value.lamports / LAMPORTS_PER_SOL
        setBalance(newBalance)
        setDefiValue(newBalance * 1.1)

        // Update wallet info in local storage
        localStorage.setItem('solanaWallet', JSON.stringify({
          address: publicKey?.toBase58(),
          balance: newBalance
        }))
      }
    }

    ws.onerror = () => {
      setError('Failed to connect to Solana network. Please try again later.')
      setWsConnected(false)
    }

    ws.onclose = () => {
      setWsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [connection, publicKey, fetchBalance])

  // Load wallet info from local storage on component mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('solanaWallet')
    if (storedWallet) {
      const { balance } = JSON.parse(storedWallet)
      setBalance(balance)
      setDefiValue(balance * 1.1)
    }
  }, [])

  return { balance, defiValue, error, wsConnected }
}
