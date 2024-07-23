import { test, expect } from '@playwright/test';

test.describe('Alerts tests', () => {
    test('Alerts', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        })
        await page.locator('button:has-text("Click Me")').nth(0).click();
    })
    
    test('Confirm box', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss();
        });
        await page.locator('button:has-text("Click Me")').nth(1).click();
        await expect(page.locator("id=confirm-demo")).toContainText('Cancel!');
    })
    
    test('Prompt', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept('This is the input text');
        });
        await page.locator('button:has-text("Click Me")').nth(2).click();
        await expect(page.locator('#prompt-demo')).toContainText("This is the input text");
    })
})