import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './page';

describe('LandingPage', () => {
  test('renders welcome message', () => {
    render(<LandingPage />);
    const welcomeElement = screen.getByText(/Welcome to Our Website/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders call to action button', () => {
    render(<LandingPage />);
    const buttonElement = screen.getByRole('link', { name: /Get Started/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
