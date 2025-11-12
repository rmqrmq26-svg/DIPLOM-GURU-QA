import { test } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async open() {
        return test.step(`Переход на страницу`, async (step) => {
            await this.page.goto(`/`);
        });
    }
}