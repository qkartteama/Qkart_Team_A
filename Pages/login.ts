import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { locators } from '../Data/Locators';
import data from '../Data/Data.json';

export class LoginPage {
    constructor(public page: Page) {
    }
    async navigateToLoginPage() {
        await this.page.goto(data.Url);
    } async login(email: string, password: string) {
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.page.getByPlaceholder('Enter Username').pressSequentially(data.Email);
        await this.page.getByPlaceholder('Enter a password').fill(data.Password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
    async isLoginSuccessful() {
        return await this.page.getByRole('link', { name: 'Log out' }).isVisible();
    }
}

