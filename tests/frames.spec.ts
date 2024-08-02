import { test, expect } from '@playwright/test';

test.describe('iFrames test', () => {
    test('Interact with iFrame', async ({ page }) => {
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

    test('Nested iFrame test', async ({ page }) => {
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

    test('Interact with iFrame and verify the response', async ({ page }) => {
        await page.goto('https://codepen.io/getform/pen/jRoexL');
        const iFrame = page.frameLocator('#result');
        await iFrame.locator('input[name=email]').fill('test@email.com');
        await iFrame.locator('input[name=name]').fill('John Smith');
        await iFrame.locator('select[name=platform]').selectOption('Github');
        await iFrame.locator('button[type="submit"]').click();

        await expect(iFrame.getByText('We received your submission, thank you!')).toBeVisible()
    })
    
    test('Test search within iFrames', async ({ page }) => {
        await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe');
        const outerIframe = page.frameLocator('iframe#iframeResult');
        const iFrame = outerIframe.frameLocator('iframe[title="W3Schools Free Online Web Tutorials"]');
        await iFrame.getByPlaceholder('Search our tutorials, e.g. HTML').fill('TypeScript');
        await iFrame.locator('button#learntocode_searchbtn').click();
        await expect(iFrame.getByRole('link', {name: 'Start learning TypeScript now »'})).toBeVisible();
    })
    
})

