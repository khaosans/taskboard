/* eslint-disable no-undef */
import { useState, useCallback } from 'react';

interface SolanaData {
  accountInfo: any | null;
  balance: number | null;
  recentBlockhash: string | null;
}

export function useSolana() {
  const [data, setData] = useState<SolanaData>({
    accountInfo: null,
    balance: null,
    recentBlockhash: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSolanaData = useCallback(async (action: string, publicKey?: string) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({ action });
      if (publicKey) {
        queryParams.append('publicKey', publicKey);
      }
      const response = await fetch(`/api/solana?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch Solana data');
      }
      const { result } = await response.json();
      setData(prevData => ({ ...prevData, [action]: result }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAccountInfo = useCallback((publicKey: string) => {
    fetchSolanaData('getAccountInfo', publicKey);
  }, [fetchSolanaData]);

  const getBalance = useCallback((publicKey: string) => {
    fetchSolanaData('getBalance', publicKey);
  }, [fetchSolanaData]);

  const getRecentBlockhash = useCallback(() => {
    fetchSolanaData('getRecentBlockhash');
  }, [fetchSolanaData]);

  return {
    data,
    loading,
    error,
    getAccountInfo,
    getBalance,
    getRecentBlockhash,
  };
}
