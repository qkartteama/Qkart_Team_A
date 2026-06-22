import { test, expect } from '@playwright/test';
import data from '../Data/Data.json';
import { HomepagePage } from '../Pages/homepage';

test.describe('Homepage', () => {
  test('Verify Login button visibility, Register button visibility, Search textbox visibility, and Search textbox placeholder', async ({ page }) => {
    const homepage = new HomepagePage(page);
    await homepage.goto();

    await expect(homepage.loginButton).toBeVisible();
    await expect(homepage.registerButton).toBeVisible();
    await expect(homepage.searchTextBox).toBeVisible();
    await expect(homepage.searchTextBox).toHaveAttribute('placeholder', 'Search for items/categories');
  });
});
