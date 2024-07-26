import { test, expect } from '@playwright/test';

test.describe('Checkboxes tests', () => {
    test('Lambda Single Checkbox test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
        const singleCheckbox = page.locator('#isAgeSelected');
        await singleCheckbox.check();
        await expect(singleCheckbox).toBeChecked();
    })
    
    test('Lambda Disabled Checkbox test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
        const checkbox3 = page.locator('div.pb-10 > div:nth-of-type(3)>input[type="checkbox"]');
        const checkbox4 = page.locator('div.pb-10 > div:nth-of-type(4)>input[type="checkbox"]');
        await expect(checkbox3).toBeDisabled();
        await expect(checkbox4).toBeDisabled();
    })
    
    test('Lambda Multiple Checkbox test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
        const checkAllBtn = page.locator('input#box');
        const checkboxes = page.locator('div.input-body input[type="checkbox"]');
        // const checkboxes = await page.locator('div.input-body input[type="checkbox"]').all(); - .all() - returns array. 
        // await doesn't work for 'for each' for(let checkbox in checkboxes) {
        //     await expect(checkbox).not.toBeChecked();
        // }
        for(let i = 0; i < await checkboxes.count(); i++) {
            await expect(checkboxes.nth(i)).not.toBeChecked();
        }
        
        await checkAllBtn.click();
        for(let i = 0; i < await checkboxes.count(); i++) {
            await expect(checkboxes.nth(i)).toBeChecked();
        }
    })
})