import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { WalletProvider } from '@/components/context/WalletContext';

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </Web3ReactProvider>
    </ThemeProvider>
  );
}

export default MyApp;