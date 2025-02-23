import { test, expect } from '@playwright/test';

const credentials = {
    "username": "pythonista",
    "password": "I<3testing"
}

test('login', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Enter username').fill(credentials.username);
    await page.getByPlaceholder('Enter password').fill(credentials.password);
    await page.getByTestId('login-button').click();

    await expect(page).toHaveTitle('Reminders | Bulldoggy reminders app');
    await expect(page).toHaveURL('/reminders');
});