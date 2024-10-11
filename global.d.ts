import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

declare module '@web3-react/injected-connector';
declare module '@geist-ui/react';
declare module 'recharts';
declare module '@supabase/auth-helpers-nextjs';
declare module 'lucide-react';
declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';