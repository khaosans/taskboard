import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Your App Title/);
});

test('login works correctly', async ({ page }) => {
  await page.goto('/login');
  // Add your login test logic here
});

// Add more tests as needed
