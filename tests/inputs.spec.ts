import { test, expect } from '@playwright/test';

test.describe('Input fields tests', () => {
    test('Lambda single input field test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const inputField = page.locator('input#user-message');
        console.log(await inputField.getAttribute('placeholder'));
        await expect(inputField).toHaveAttribute('placeholder', 'Please enter your Message');
        await expect(inputField).toBeEmpty();
        await inputField.fill('test');
        //console.log(await inputField.inputValue());
        const submitBtn = page.locator('#showInput');
        await submitBtn.click();
        const enteredMessage = page.locator('#message');
        await expect(enteredMessage).toContainText('test');
    })
    
    test('Lambda two input fields test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const firstNumberInput = page.locator('input#sum1');
        const secondNumberInput = page.locator('input#sum2');
        const getSumBtn = page.locator('form#gettotal > button');
        const result = page.locator('#addmessage');
        async function fillInputs(firstNumber: number, secondNumber: number) {
            await firstNumberInput.fill(String(firstNumber));
            await secondNumberInput.fill(String(secondNumber));
            await getSumBtn.click();
        }
        async function getSum(firstNumber: number, secondNumber: number) {
            return String(firstNumber + secondNumber)
        }
        await fillInputs(2, 3);
        await expect(result).toHaveText(await getSum(2, 3));
    })
      
})
