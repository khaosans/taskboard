import { Card, CardContent } from "@/components/ui/card";
import CustomButton from '@/components/CustomButton';
import { Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ConnectPromptProps {
  loading: boolean;
  connectWallet: (connectorId: string) => Promise<void>;
}

export const ConnectPrompt: React.FC<ConnectPromptProps> = ({ loading, connectWallet }) => {
  return (
    <Card className="bg-gray-800 text-white">
      <CardContent className="flex flex-col items-center justify-center h-[60vh]">
        <Wallet className="w-16 h-16 mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-4">Connect your wallet to view your DeFi portfolio</p>
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton auto onClick={() => {}} disabled={loading} placeholder="Connect Wallet">
              <Wallet className="mr-2 h-4 w-4" /> {loading ? 'Connecting...' : 'Connect Wallet'}
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Choose a wallet to connect to this dapp:
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CustomButton
                onClick={() => connectWallet('injected')}
                className="justify-start bg-gray-700 hover:bg-gray-600"
                disabled={loading}
                placeholder="Connect with Rabby"
              >
                Rabby Wallet
              </CustomButton>
              <CustomButton
                onClick={() => connectWallet('walletconnect')}
                className="justify-start bg-gray-700 hover:bg-gray-600"
                disabled={loading}
                placeholder="Connect with WalletConnect"
              >
                WalletConnect
              </CustomButton>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};