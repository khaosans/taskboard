import React from 'react';
import { render, screen } from '@testing-library/react';
import { useUser } from '@clerk/nextjs';
import { useWallet } from '@/contexts/WalletContext';
import WalletDataPage from './page';

jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

jest.mock('@/contexts/WalletContext', () => ({
  useWallet: jest.fn(),
}));

jest.mock('ethers', () => ({
  ethers: {
    providers: {
      InfuraProvider: jest.fn(),
    },
    utils: {
      formatEther: jest.fn().mockReturnValue('1.0'),
    },
  },
}));

describe('WalletDataPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: false });
    render(<WalletDataPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('prompts user to sign in when not signed in', () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: true, isSignedIn: false });
    render(<WalletDataPage />);
    expect(screen.getByText('Please sign in to view your wallet data')).toBeInTheDocument();
  });

  it('displays wallet data when signed in and wallet connected', async () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: true, isSignedIn: true });
    (useWallet as jest.Mock).mockReturnValue({ wallet: { address: '0x123' } });
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ethereum: { usd: 2000 } }),
    });

    render(<WalletDataPage />);
    
    expect(await screen.findByText('Wallet Data (Optimism)')).toBeInTheDocument();
    expect(await screen.findByText('1.0000 ETH')).toBeInTheDocument();
    expect(await screen.findByText('Value: $2000.00')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: true, isSignedIn: true });
    (useWallet as jest.Mock).mockReturnValue({ wallet: { address: '0x123' } });
    
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch failed'));

    render(<WalletDataPage />);
    
    expect(await screen.findByText('Error: Error fetching balance: Fetch failed')).toBeInTheDocument();
  });
});
