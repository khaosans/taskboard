import { test, expect } from '@playwright/test';

test.describe('Clerk Authentication', () => {
  test('should navigate to sign-in page', async ({ page }) => {
    // Use the baseURL from the configuration instead of hardcoding it
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Look for a sign-in link or button and click it
    await page.click('text=Sign In', { timeout: 5000 });

    // Wait for navigation to complete
    await page.waitForURL('**/sign-in**');
    
    // Check if we're on the sign-in page
    expect(page.url()).toContain('/sign-in');

    // Verify that the sign-in form elements are visible
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should sign in successfully', async ({ page }) => {
    // Navigate to the sign-in page
    await page.goto('/sign-in');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Fill in the sign-in form
    await page.fill('input[name="identifier"]', process.env.E2E_CLERK_USER_USERNAME || '');
    await page.fill('input[name="password"]', process.env.E2E_CLERK_USER_PASSWORD || '');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation to complete (adjust the URL as needed)
    await page.waitForURL('**/dashboard**');

    // Verify that we're on the dashboard or a protected page
    expect(page.url()).toContain('/dashboard');

    // Add additional checks to verify the user is signed in
    // For example, check for a welcome message or user-specific element
    await expect(page.locator('text=Welcome')).toBeVisible();
  });
});
