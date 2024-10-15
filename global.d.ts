import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from 'ethers';

interface ExtendedProvider extends ethers.providers.ExternalProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
}

declare global {
  interface Window {
    ethereum?: ExtendedProvider;
    rabby?: ExtendedProvider;
  }
}

declare module '@web3-react/injected-connector';
declare module '@geist-ui/react';
declare module 'recharts';
declare module '@supabase/auth-helpers-nextjs';
declare module 'lucide-react';
declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';

declare module '@rainbow-me/rainbowkit' {
  export const RainbowKitProvider: React.FC<{
    chains: any[];
    children: React.ReactNode;
  }>;
  export const ConnectButton: React.FC;
  export function getDefaultWallets(config: any): { connectors: any[] };
  export function getDefaultConfig(config: any): any;
}

declare module 'wagmi' {
  export const WagmiConfig: React.FC<{ config: any; children: React.ReactNode }>;
  export function createConfig(config: any): any;
  export function useAccount(): {
    address: string | undefined;
    connector: any;
  };
  export function useConnect(): {
    connect: (config: { connector: any }) => void;
    connectors: any[];
  };
  export function useDisconnect(): {
    disconnect: () => void;
  };
  export function useNetwork(): {
    chain: any;
  };
  export function configureChains(chains: any[], providers: any[]): { chains: any[], publicClient: any };
}

declare module 'wagmi/chains' {
  export interface Chain {
    id: number;
    name: string;
  }
  export const mainnet: Chain;
  export const polygon: Chain;
  export const optimism: Chain;
  export const arbitrum: Chain;
}

declare module 'wagmi/providers/alchemy' {
  export function alchemyProvider(config: { apiKey: string }): any;
}

declare module 'wagmi/providers/public' {
  export function publicProvider(): any;
}
