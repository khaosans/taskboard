import { test, expect } from '@playwright/test';

// Use a constant for the base URL instead of accessing process.env directly
const BASE_URL = 'http://localhost:3000';

test.describe('Clerk Authentication', () => {
  test('should navigate to sign-in page', async ({ page }) => {
    // Set the test timeout to 5000 seconds
    test.setTimeout(5000000);

    // Use test.info().console.log instead of console.log
    test.info().console.log(`Testing against URL: ${BASE_URL}`);

    // Navigate to the home page
    await page.goto(BASE_URL);

    // Wait for client-side JS to run
    await page.waitForTimeout(1000);

    // Click on the sign-in button
    await page.click('text=Sign In');

    // Wait for the sign-in page to load
    await page.waitForURL('**/sign-in**');

    // Verify we're on the sign-in page
    expect(page.url()).toContain('/sign-in');

    // Verify the presence of email and password fields
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
