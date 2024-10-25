import { test, expect } from '@playwright/test';

test.describe('Clerk Authentication', () => {
  test('should navigate to sign-in page', async ({ page }) => {
    await page.goto('/');
    
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
    await page.goto('/sign-in');

    await page.waitForLoadState('networkidle');

    const username = process.env.E2E_CLERK_USER_USERNAME;
    const password = process.env.E2E_CLERK_USER_PASSWORD;

    if (!username || !password) {
      throw new Error('E2E_CLERK_USER_USERNAME or E2E_CLERK_USER_PASSWORD is not set');
    }

    // Fill in the sign-in form
    await page.fill('input[name="identifier"]', username);
    await page.fill('input[name="password"]', password);

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
