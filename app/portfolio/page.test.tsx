import React from 'react';
import { render, screen } from '@testing-library/react';
import { useUser } from '@clerk/nextjs';
import { useWallet } from '@/contexts/WalletContext';
import PortfolioPage from './page';

// Mock the clerk hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

// Mock the wallet context
jest.mock('@/contexts/WalletContext', () => ({
  useWallet: jest.fn(),
}));

describe('PortfolioPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: false });
    render(<PortfolioPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('prompts user to sign in when not signed in', () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: true, isSignedIn: false });
    render(<PortfolioPage />);
    expect(screen.getByText('Please sign in to view your portfolio')).toBeInTheDocument();
  });

  it('prompts user to connect wallet when no wallet is connected', () => {
    (useUser as jest.Mock).mockReturnValue({ isLoaded: true, isSignedIn: true });
    (useWallet as jest.Mock).mockReturnValue({ wallet: null });
    render(<PortfolioPage />);
    expect(screen.getByText('No wallet connected')).toBeInTheDocument();
  });

  it('displays user info and wallet address when signed in and wallet connected', () => {
    (useUser as jest.Mock).mockReturnValue({ 
      isLoaded: true, 
      isSignedIn: true, 
      user: { imageUrl: 'test.jpg', username: 'TestUser' } 
    });
    (useWallet as jest.Mock).mockReturnValue({ wallet: { address: '0x123' } });
    render(<PortfolioPage />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Connected Wallet: 0x123')).toBeInTheDocument();
  });
});
