import {test, expect} from '@playwright/test';

test.describe('Testing scrolling', () => {
    test('Scroll to Contact Us', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/');
        const contactUs = page.locator('a[href="/contact-us"]');
        await contactUs.scrollIntoViewIfNeeded();
        expect(contactUs).toBeVisible();
    })

    test('Verify lazy-loaded items render correctly upon scrolling', async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io');
        await page.getByRole("button", {name:"Shop by Category"}).click();
        await page.getByRole("link", {name: " Software"}).click();
        await page.mouse.wheel(0, 10000);
        const lastElement = await page.locator('div.product-layout').last();
        await expect(lastElement).toBeVisible();
    })
    
    
})
