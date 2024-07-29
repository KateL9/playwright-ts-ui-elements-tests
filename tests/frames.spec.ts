import { test, expect } from '@playwright/test';

test.describe('Frames test', () => {
    test('Interact with iframe', async ({ page }) => {
        await page.goto('https://letcode.in/frame');
        const frame = page.frameLocator('iframe#firstFr');
        if (frame) {
            await frame.locator('input[name="fname"]').fill('John');
            await frame.locator('input[name="lname"]').fill('Smith');
            const result = await frame.locator('p.has-text-info').innerText();
            expect(result).toContain('John Smith');
        } else {
            throw new Error('Frame not found')
        }
    })

    test('Nested frame test', async ({ page }) => {
        await page.goto('https://letcode.in/frame');
        const frame = page.frameLocator('iframe#firstFr');
        const innerFrame = frame.frameLocator('iframe[src="innerFrame"]');
        if (innerFrame) {
           const emailInput = innerFrame.locator('input[name="email"]');
           await emailInput.fill('test@email.com');
            // Assert that the input field contains the expected value
            await expect(emailInput).toHaveValue('test@email.com');
        } else {
            throw new Error('Frame not found');
        }
    })
})

