import { test, expect } from '@playwright/test';

test.describe('UI Login test', () => {
    test('Lambda login', async ({ page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/');
        const myAccount = page.locator('li.nav-item.dropdown:has-text("My account")');
        await myAccount.hover();
    
        const dropdownMenu = page.locator('ul.mz-sub-menu-96.dropdown-menu.show');
        await dropdownMenu.waitFor({ state: 'visible' });
    
        const loginLink = page.locator('ul.mz-sub-menu-96.dropdown-menu.show a[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/login"]');
        await loginLink.click();
    
        const emailInput = page.locator('#input-email');
        const passwordInput = page.locator('#input-password');
        const loginBtn = page.locator('input[type= "submit"]');
        
        await emailInput.fill('emailTest@email.com');
        await passwordInput.fill('Password1!');
        await loginBtn.click();
        await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
    })  
})