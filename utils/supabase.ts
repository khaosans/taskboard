import { createClient } from '@supabase/supabase-js';
import { WalletData, HistoricalBalance, TransactionMetrics } from './dataSchema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function storeWalletData(walletData: WalletData) {
  const { data, error } = await supabase
    .from('wallet_data')
    .upsert(walletData, {
      onConflict: 'userId,walletAddress',
    });

  if (error) {
    console.error('Error storing wallet data:', error);
    throw error;
  }

  // Store historical balance snapshot
  const historicalBalance: HistoricalBalance = {
    userId: walletData.userId,
    walletAddress: walletData.walletAddress,
    nativeBalance: walletData.nativeBalance,
    tokenBalances: walletData.tokenBalances,
    timestamp: walletData.lastUpdated,
  };
  await supabase.from('historical_balances').insert(historicalBalance);

  // Update transaction metrics
  const txVolume = walletData.recentTransactions.reduce((sum, tx) => sum + (tx.tokenTransfers.reduce((s, t) => s + t.usdValue, 0)), 0);
  const transactionMetrics: TransactionMetrics = {
    userId: walletData.userId,
    walletAddress: walletData.walletAddress,
    totalVolume: txVolume,
    transactionCount: walletData.recentTransactions.length,
    lastTransactionDate: walletData.recentTransactions[0]?.timestamp.toString() || walletData.lastUpdated,
  };
  await supabase.from('transaction_metrics').upsert(transactionMetrics, {
    onConflict: 'userId,walletAddress',
  });

  return data;
}

export async function getWalletData(userId: string, walletAddress: string): Promise<WalletData | null> {
  const { data, error } = await supabase
    .from('wallet_data')
    .select('*')
    .eq('userId', userId)
    .eq('walletAddress', walletAddress)
    .single();

  if (error) {
    console.error('Error fetching wallet data:', error);
    return null;
  }

  return data;
}

export async function getHistoricalBalances(userId: string, walletAddress: string, limit: number = 30): Promise<HistoricalBalance[]> {
  const { data, error } = await supabase
    .from('historical_balances')
    .select('*')
    .eq('userId', userId)
    .eq('walletAddress', walletAddress)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching historical balances:', error);
    return [];
  }

  return data;
}

export async function getTransactionMetrics(userId: string, walletAddress: string): Promise<TransactionMetrics | null> {
  const { data, error } = await supabase
    .from('transaction_metrics')
    .select('*')
    .eq('userId', userId)
    .eq('walletAddress', walletAddress)
    .single();

  if (error) {
    console.error('Error fetching transaction metrics:', error);
    return null;
  }

  return data;
}

export async function getNFTHoldings(walletAddress: string) {
  // Implement NFT fetching logic here
  return [];
}

export async function getDeFiInteractions(walletAddress: string) {
  // Implement DeFi interaction fetching logic here
  return [];
}
