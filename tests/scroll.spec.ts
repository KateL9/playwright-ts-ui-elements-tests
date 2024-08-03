import { test, expect } from '@playwright/test';

test.describe('Testing scrolling', () => {
    test('Scroll to Contact Us', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/');
        const contactUs = page.locator('a[href="/contact-us"]');
        await contactUs.scrollIntoViewIfNeeded();
        expect(contactUs).toBeVisible();
    })

    test('Verify lazy-loaded items render correctly upon scrolling', async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io');
        await page.getByRole("button", { name: "Shop by Category" }).click();
        await page.getByRole("link", { name: " Software" }).click();
        await page.mouse.wheel(0, 10000);
        const lastElement = await page.locator('div.product-layout').last();
        await expect(lastElement).toBeVisible();
    })

    test('Horizontal scrolling test', async ({ page }) => {
        await page.goto('https://codepen.io/ReGGae/full/QZxdVX/');
        const iFrame = page.frameLocator('iframe#result');
        for (let i = 1; i <= 10; i++) {
            const randomIndex = Math.floor(Math.random() * 5) + 1;
            const randomImage = iFrame.locator(`div:nth-child(3) > article:nth-child(${randomIndex}) > .slide__inner > .slide__img`);
            randomImage.scrollIntoViewIfNeeded();
            await expect(randomImage).toBeVisible();
        }
    })
})
