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
    
    test('Select single value from dropdown with search', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
        // Function to select an option
        async function selectOption(optionText: string) {
            const dropdown = page.locator('#country+span');
            await dropdown.click();
            const searchInput = page.locator('span > input.select2-search__field');
            await searchInput.fill(optionText);
            const searchedOption = page.locator('span .select2-results > ul >li.select2-results__option');
            await searchedOption.click();
        }
        const countries: string[] = ['India', 'Australia', 'United States of America'];
        // Select countries
        for (let country of countries) {
            await selectOption(country);
            const selectedCountry = page.locator('span #select2-country-container');
            await expect(selectedCountry).toHaveText(country);
        }
    })
    test('Select multiple values by search', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
        // Function to select an option
        async function selectOption(optionText: string) {
            const dropdown = page.locator('span.select2-selection--multiple');
            await dropdown.click();
            const searchInput = page.locator('input.select2-search__field');
            await searchInput.fill(optionText);
            const searchedOption = page.locator('li.select2-results__option');
            await searchedOption.click();
        }
        const states: string[] = ['Alaska', 'California', 'Texas'];
        // Select states
        for (let state of states) {
            await selectOption(state);
            const selectedState = page.locator(`.select2-selection__choice[title=${state}]`);
            await expect(selectedState).toBeVisible()
        }
        // Assert that the number of selected otions equals to the number of requested states
        const selectedStateLength = await page.locator('li.select2-selection__choice').count();
        expect(selectedStateLength).toEqual(states.length);
    })
    
    test('Delete all options from the search', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
        // Function to select an option
        async function selectOption(optionText: string) {
            const dropdown = page.locator('span.select2-selection--multiple');
            await dropdown.click();
            const searchInput = page.locator('input.select2-search__field');
            await searchInput.fill(optionText);
            const searchedOption = page.locator('li.select2-results__option');
            await searchedOption.click();
        }
        // Function to delete a selected option
        async function deleteOption(optionText:string) {
            const deleteSelectedState = page.locator(`.select2-selection__choice[title=${optionText}] > .select2-selection__choice__remove`);
            await deleteSelectedState.click();
            const selectedState = page.locator(`.select2-selection__choice[title=${optionText}]`);
            await expect(selectedState).not.toBeVisible();
        }
    
        const states: string[] = ['Alaska', 'California', 'Texas'];
        // Select all options
        for (let state of states) {
            await selectOption(state);
            const selectedState = page.locator(`.select2-selection__choice[title=${state}]`);
            await expect(selectedState).toBeVisible()
        }
        // Delete all selected options
        for (let state of states) {
            await deleteOption(state)
        }
        // Assert that all options are deleted
        const selectInput = page.locator('ul.select2-selection__rendered');
        await expect(selectInput).toBeEmpty();
    })
    
    test('Disabled dropdown options remain unselectable', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
        const dropdown = page.locator('select.js-example-disabled-results');
        const disabledOption = dropdown.locator('option:disabled').first();
        
        await expect(disabledOption).toBeDisabled();
        // Attempt to select the disabled option
        const disabledValue = await disabledOption.getAttribute('value');
        const titleOfDisabledOption = await disabledOption.textContent();
        await dropdown.selectOption({ value: `${disabledValue}` });
        const selectedValue = await page.locator('.select2-selection__rendered').nth(2).textContent();
        // Bug: it is possible to select disabled value
        // Ensure the disabled option is not selected
        expect(selectedValue).not.toBe(titleOfDisabledOption);
    })
    
})