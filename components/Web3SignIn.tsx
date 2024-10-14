'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { truncateAddress } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface Web3SignInProps {
  onWalletChange: (wallet: { address: string; type: string } | null) => void;
}

const Web3SignIn: React.FC<Web3SignInProps> = ({ onWalletChange }) => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const network = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      onWalletChange({ address, type: 'RainbowKit' });
    } else {
      onWalletChange(null);
    }
  }, [isConnected, address, onWalletChange]);

  if (!isConnected) {
    return (
      <Button onClick={openConnectModal} variant="outline" size="sm">
        Connect Wallet
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
        {address ? truncateAddress(address) : 'Address Unavailable'}
      </Button>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96">
            <Dialog.Title className="text-xl font-bold mb-4">Wallet Settings</Dialog.Title>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Connected Account</h3>
                <p className="text-sm">{address}</p>
                <Button onClick={openAccountModal} variant="outline" size="sm" className="mt-2">
                  Manage Account
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Current Network</h3>
                <p className="text-sm">{network.chain?.name || 'Unknown'}</p>
                <Button onClick={openChainModal} variant="outline" size="sm" className="mt-2">
                  Change Network
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Available Networks</h3>
                <div className="grid grid-cols-2 gap-2">
                  {chains.map((availableChain) => (
                    <Button
                      key={availableChain.id}
                      onClick={() => switchNetwork?.(availableChain.id)}
                      variant="outline"
                      size="sm"
                      disabled={availableChain.id === network.chain?.id}
                    >
                      {availableChain.name}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={() => disconnect()} variant="destructive" size="sm" className="w-full">
                Disconnect
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-2 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Web3SignIn;
