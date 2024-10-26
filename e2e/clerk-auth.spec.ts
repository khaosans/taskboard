import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Clerk Authentication', () => {
  test('should navigate to sign-in page', async ({ page }) => {
    test.setTimeout(5000000);

    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);
    await page.click('text=Sign In');
    await page.waitForURL('**/sign-in**');
    
    expect(page.url()).toContain('/sign-in');
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
