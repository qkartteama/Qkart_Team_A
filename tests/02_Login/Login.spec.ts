import {test ,expect} from '@playwright/test';
import {locators} from '../../Data/Locators';
import data from '../../Data/Data.json';
import {LoginPage} from '../../Pages/login';

test.describe('Login Functionality', () => {
    test ('login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(data.Email, data.Password);
        await expect(loginPage.isLoginSuccessful()).resolves.toBe(true);
    });
});