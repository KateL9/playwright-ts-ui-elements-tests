import {test, expect} from '@playwright/test'

test.describe('Interact with window', () => {
    test('Window test', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('a[title="Follow @Lambdatesting on Twitter"]')
        ]);
        // Wait for the new page to load
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://x.com/Lambdatesting');
        await newPage.close();
    })

    test('Handle multiple windows', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
        const followTwitterFacebookButton = page.locator('#followboth');
        async function handlePopup(popupPromise: Promise<Page>, expectedUrls: string []): Promise<void> {
            const popup = await popupPromise;
            await popup.waitForLoadState(); 
            const url = popup.url();
            const isExpectedURL = expectedUrls.some(expectedUrl => url.includes(expectedUrl))
            expect(isExpectedURL).toBeTruthy();
            await popup.close();
        }
        // Wait for two popups to open after clicking the button
        const [popupPromise1, popupPromise2] = [
            page.waitForEvent('popup'),
            page.waitForEvent('popup')
        ];
        await followTwitterFacebookButton.click();
        await Promise.all([
            handlePopup(popupPromise1, ['https://www.facebook.com/lambdatest/', 'https://x.com/intent']),
            handlePopup(popupPromise2, ['https://www.facebook.com/lambdatest/', 'https://x.com/intent'])
        ])
    })
    
})
