export interface TokenBalance {
  mint: string;
  symbol: string;
  amount: number;
  decimals: number;
  usdValue: number;
  logo?: string;
}

export interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  status: 'success' | 'failed';
  fee: number;
  blockNumber: number;
  instructions: any[];
  tokenTransfers: any[];
}

export interface NFT {
  mint: string;
  name: string;
  symbol: string;
  image: string;
  collection?: string;
}

export interface DeFiInteraction {
  protocol: string;
  action: string;
  timestamp: number;
  amount: number;
  token: string;
}

export interface WalletData {
  userId: string;
  walletAddress: string;
  nativeBalance: number;
  tokenBalances: TokenBalance[];
  recentTransactions: Transaction[];
  nftHoldings: NFT[];
  defiInteractions: DeFiInteraction[];
  lastUpdated: string;
}

export interface HistoricalBalance {
  userId: string;
  walletAddress: string;
  nativeBalance: number;
  tokenBalances: TokenBalance[];
  timestamp: string;
}

export interface TransactionMetrics {
  userId: string;
  walletAddress: string;
  totalVolume: number;
  transactionCount: number;
  lastTransactionDate: string;
}
