import { expect } from '@playwright/test';
import { test } from '../src/fixtueres/index'

test.describe('Тесты статей @ui', () => {
    
    test('Пользователь создает статью @ui', async ({ app, testDataUi }) => {
        const { user, article } = testDataUi;

        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.article.create(article);
        await app.page.waitForTimeout(1000); 
        
        await expect(app.article.checkArticleTitleInput).toContainText(article.articleName);
    });

    test('Пользователь редактирует статью @ui', async ({ app, testDataUi }) => {
        const { user, article, editarticle } = testDataUi;
        
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.article.create(article);
        await app.article.edit(editarticle);
        
        await expect(app.article.checkArticleTitleInput).toContainText(editarticle.articleName);
        await expect(app.article.checkArticleInput).toContainText(editarticle.description);  
    });

    test('Пользователь лайкает статью @ui', async ({ app, testDataUi }) => {
        const { user } = testDataUi;
        
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.like.gotoLike();
        
        await expect(app.like.checkLike).toBeVisible();
    });
});