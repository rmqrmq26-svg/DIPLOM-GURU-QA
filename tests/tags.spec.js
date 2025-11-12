import { expect } from '@playwright/test';
import { test } from '../src/fixtueres/index';

test.describe('Тест поиска по тегам @ui', () => {

    test('Пользователь ищет статьи по тегу @ui', async ({ app, testDataUi }) => {
        const { user } = testDataUi;

        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.tags.gotoSearch();
        
        await expect(app.tags.tag).toBeVisible();
    });
});