import {test, expect, type Locator, type Page} from '@playwright/test';

const user1 = {
    "username": "pythonista",
    "password": "I<3testing"
}

const user2 = {
    "username": "engineer",
    "password": "Muh5devices"
}

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('successful login', async ({page}) => {
    await login(page, user1);

    await expect(page).toHaveTitle('Reminders | Bulldoggy reminders app');
    await expect(page).toHaveURL('/reminders');
    await expect(page.locator('id=bulldoggy-logo')).toBeVisible();
    await expect(page.locator('id=bulldoggy-title')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
});

test('add list', async ({page}) => {
    await login(page, user1);
    let testId: string = uniqueString(6);

    await createList(page, `This is a new list ${testId}`);

    await expect(page.locator('div.reminders-list-list').getByText(`This is a new list ${testId}`)).toHaveCount(1);
});

test('delete list', async ({page}) => {
    await login(page, user2);
    let testId: string = uniqueString(6);

    await createList(page, `This list should be deleted ${testId}`);
    await deleteList(page, `This list should be deleted ${testId}`);

    await expect(page.getByText(`This list should be deleted ${testId}`)).toHaveCount(0);
});

test('add reminder', async ({page}) => {
    await login(page, user1);

    let testId: string = uniqueString(6);
    await createList(page, `List to add reminder ${testId}`);
    await page.locator('.reminders-list-list').getByText(`List to add reminder ${testId}`).click();
    await addReminderToList(page, `List to add reminder ${testId}`, `Remember to add reminder ${testId}`);

    await expect(page.getByText(`Remember to add reminder ${testId}`)).toHaveCount(1);
});

test('complete reminder', async ({page}) => {
    await login(page, user2);
    let testId: string = uniqueString(6);

    await createList(page, `List to complete reminder ${testId}`);
    await addReminderToList(page, `List to complete reminder ${testId}`, `Remember to complete reminder ${testId}`);
    await page.locator('div.reminders-list-list').getByText(`List to complete reminder ${testId}`).click();
    await page.locator('.reminders-item-list').getByText(`Remember to complete reminder ${testId}`).click();

    await expect(page.getByText(`Remember to complete reminder ${testId}`).locator('..')).toHaveClass('reminder-row completed');
});

async function login(page: Page, user: {  username: string, password: string }) {
    await page.getByPlaceholder('Enter username').fill(user.username);
    await page.getByPlaceholder('Enter password').fill(user.password);
    await page.getByTestId('login-button').click();
}

async function createList(page: Page, name: string) {
    await page.locator('//div[@data-id="new-reminder-row"]').click();
    await page.getByPlaceholder('New list').fill(name);
    await page.locator('.reminder-row-with-input > img').first().click();
}

async function deleteList(page: Page, name: string) {
    let listLabel: Locator = page.getByText(name);
    await page.locator('div.reminder-row').filter({ has: listLabel}).locator('img').last().click();
}

async function addReminderToList(page: Page, list: string, name: string) {
    await page.locator('div.reminders-list-list').getByText(list).click();
    await page.locator('//div[@data-id="new-reminder-item-row"]').click();
    await page.getByPlaceholder('New reminder').fill(name);
    await page.locator('.reminder-row-with-input > img').first().click();
}

function uniqueString(length: number): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}