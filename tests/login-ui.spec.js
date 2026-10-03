const { test, expect } = require('@playwright/test');

test.describe('Login UI validation', () => {
  test('TC-UI-001: login page exposes the expected controls', async ({ page }) => {
    await page.goto('#/auth/login');

    await expect(page).toHaveTitle("Let's Shop");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: /forgot password/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  });

  test('TC-UI-002: empty login shows required errors and stays unauthenticated', async ({ page }) => {
    const loginRequests = [];
    page.on('request', request => {
      const requestUrl = new URL(request.url());
      if (
        request.method() === 'POST' &&
        requestUrl.pathname.endsWith('/api/ecom/auth/login')
      ) {
        loginRequests.push(requestUrl.pathname);
      }
    });

    await page.goto('#/auth/login');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('*Email is required')).toBeVisible();
    await expect(page.getByText('*Password is required')).toBeVisible();
    await expect(page).toHaveURL(/#\/auth\/login$/);
    expect(loginRequests).toHaveLength(0);
  });

  test('TC-UI-003: missing password is rejected without a login request', async ({ page }) => {
    const loginRequests = [];
    page.on('request', request => {
      const requestUrl = new URL(request.url());
      if (request.method() === 'POST' && requestUrl.pathname.endsWith('/api/ecom/auth/login')) {
        loginRequests.push(requestUrl.pathname);
      }
    });

    await page.goto('#/auth/login');
    await page.locator('input[type="email"]').fill('qa.user@example.invalid');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('*Password is required')).toBeVisible();
    await expect(page).toHaveURL(/#\/auth\/login$/);
    expect(loginRequests).toHaveLength(0);
  });

  test('TC-UI-004: missing email is rejected without a login request', async ({ page }) => {
    const loginRequests = [];
    page.on('request', request => {
      const requestUrl = new URL(request.url());
      if (request.method() === 'POST' && requestUrl.pathname.endsWith('/api/ecom/auth/login')) {
        loginRequests.push(requestUrl.pathname);
      }
    });

    await page.goto('#/auth/login');
    await page.locator('input[type="password"]').fill('synthetic-placeholder');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('*Email is required')).toBeVisible();
    await expect(page).toHaveURL(/#\/auth\/login$/);
    expect(loginRequests).toHaveLength(0);
  });
});