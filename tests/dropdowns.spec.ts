import { test, expect } from '@playwright/test';

test.describe('Dropdowns tests', () => {
    test('Single select dropdown', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
        const dropdown = page.locator('select#select-demo');
        await dropdown.click();
        await dropdown.selectOption({value: 'Sunday'});
        // Click outside the dropdown to close it
        await page.click('body');
        const inputValue = await dropdown.inputValue();
        expect(inputValue).toBe('Sunday');
        const selectedValue = page.locator('p.selected-value');
        await expect(selectedValue).toContainText("Sunday");
    })
    
    test('Multi-select dropdown', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
        const multiSelect = page.locator('select#multi-select');
        multiSelect.selectOption([
            {value: 'Florida'},
            {value: 'Texas'},
            {value: 'California'}
        ]);
        await expect(multiSelect).toHaveValues(['California', 'Florida', 'Texas']);
        
        // Validate the selection
        // const selectedOptions = await multiSelect.evaluate((select: HTMLSelectElement) => {
        //     let arrayOfSelects = Array.from(select.selectedOptions);
        //     return arrayOfSelects.map(option => option.value);
        // })
        // expect(selectedOptions).toEqual(['California', 'Florida', 'Texas']);
    })
    
    test('jQuery Dropdown Search', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    
        async function selectOption(optionText: string) {
            const dropdown = page.locator('#country+span');
            await dropdown.click();
            
            const searchInput = page.locator('span > input.select2-search__field');
            await searchInput.fill(optionText);
            const searchedOption = page.locator('span .select2-results > ul >li.select2-results__option');
            await searchedOption.click();
        }
        
        const countries: string[] = ['India', 'Australia', 'United States of America'];
        for (let country of countries) {
            await selectOption(country);
            const selectedCountry = page.locator('span #select2-country-container');
            await expect(selectedCountry).toHaveText(country);
        }
    })
    
})