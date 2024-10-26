import { useEffect, useState } from "react";

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress) {
      setWalletAddress(walletAddress);
    }
  }, [walletAddress]);

  return { walletAddress, setWalletAddress };
};

export default useWallet;
