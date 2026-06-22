import { Page, Locator } from '@playwright/test';
import data from '../Data/Data.json';

export class HomepagePage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly searchTextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.searchTextBox = page.getByRole('textbox', { name: 'Search for items/categories' }).first();
  }

  async goto() {
    await this.page.goto(data.Url);
  }
}
