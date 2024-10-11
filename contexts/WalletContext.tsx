<<<<<<< HEAD
import React, { createContext, useState, useContext, useEffect } from 'react';
=======
import React, { createContext, useContext, useState, ReactNode } from 'react';
>>>>>>> 9798f34 (feat: Add ConsoleSidePanel and DefiWalletPage components, update eslint.config.js and rename MoncacoEditor to MonacoEditor)

interface Wallet {
  address: string;
  type: string;
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

<<<<<<< HEAD
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

=======
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

>>>>>>> 9798f34 (feat: Add ConsoleSidePanel and DefiWalletPage components, update eslint.config.js and rename MoncacoEditor to MonacoEditor)
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

<<<<<<< HEAD
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
=======
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
>>>>>>> 9798f34 (feat: Add ConsoleSidePanel and DefiWalletPage components, update eslint.config.js and rename MoncacoEditor to MonacoEditor)
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};