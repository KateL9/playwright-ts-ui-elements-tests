import { test, expect } from '@playwright/test';

test.describe('Modal window test', () => {
    test('Single modal window', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
        const launchModalBtn = page.locator('button[data-target="#myModal"]');
        await launchModalBtn.click();
        const modalDialog = page.locator('div #myModal');
        const saveChangesBtn = page.locator('button:has-text("Save Changes")').nth(0);
        await saveChangesBtn.click();
        await expect(modalDialog).not.toBeVisible();
    })
})