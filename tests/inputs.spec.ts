import { test, expect } from '@playwright/test';

test.describe('Input fields tests', () => {
    test('Lambda Single Input Field test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const inputField = page.locator('input#user-message');
        console.log(await inputField.getAttribute('placeholder'));
        await expect(inputField).toHaveAttribute('placeholder', 'Please enter your Message');
        await expect(inputField).toBeEmpty();
        await inputField.fill('test');
        console.log(await inputField.inputValue());
        const submitBtn = page.locator('#showInput');
        await submitBtn.click();
        const enteredMessage = page.locator('#message');
        await expect(enteredMessage).toContainText('test');
    })
    
    test('Lambda Two Input Fields test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const firstNumber = page.locator('input#sum1');
        const secondNumber = page.locator('input#sum2');
        const getSumBtn = page.locator('form#gettotal > button');
        const result = page.locator('#addmessage');
        await firstNumber.fill('2');
        await secondNumber.fill('3');
        await getSumBtn.click();
        console.log(await result.textContent());
        const sum = 2 + 3;
        await expect(result).toHaveText(`${sum}`);
    })
      
})