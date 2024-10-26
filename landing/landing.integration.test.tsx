import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './page';

describe('LandingPage Integration Test', () => {
  test('renders landing page with correct content', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Welcome to Our Website/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover Our Services/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Get Started/i })).toBeInTheDocument();
  });
});
